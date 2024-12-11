import { REGISTRY_ABI } from './abi';
import {
  AuthorizationRequestMessage,
  AuthorizationResponseMessage,
  createAuthorizationRequestWithMessage,
  encodeBase64url,
} from '@0xpolygonid/js-sdk';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { CONTRACTS, JsSdk, NETWORK_CONFIGS, setupSdk } from 'src/sdk.init';

import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';
import { Wallet, JsonRpcProvider, Contract } from 'ethers';

import { DecodedError, ErrorDecoder } from 'ethers-decode-error';

const errorDecoder = ErrorDecoder.create();

@Controller()
export class AppController implements OnModuleInit {
  private _sdk!: JsSdk;

  private _hostUrl = process.env.HOST_URL || 'http://localhost:4001';

  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}
  async onModuleInit() {
    const polygonAmoy = NETWORK_CONFIGS.amoy(CONTRACTS.AMOY_STATE_CONTRACT);
    const privadoMain = NETWORK_CONFIGS.privadoMain(
      CONTRACTS.PRIVADO_STATE_CONTRACT,
    );
    this._sdk = await setupSdk({
      configs: [polygonAmoy, privadoMain],
    });
  }

  @Get('auth-request')
  async authReq(@Query('from') from: string) {
    const msg = createAuthorizationRequestWithMessage(
      'AI identity layer',
      'PoC how to use Privado.ID',
      from,
      `${this._hostUrl}/api/callback`,
    );

    await this._cacheManager.set(from, msg, 180_000);

    return {
      url: `https://wallet-dev.privado.id/#i_m=${encodeBase64url(JSON.stringify(msg))}`,
    };
  }

  private getContract() {
    const provider = new JsonRpcProvider(process.env.RPC_URL);
    const signer = new Wallet(process.env.ETH_WALLET_PRIVATE_KEY, provider);

    const contract = new Contract(
      process.env.REGISTRY_CONTRACT_ADDRESS,
      REGISTRY_ABI,
      signer,
    );

    return contract;
  }

  @Post('callback')
  @HttpCode(200)
  async postCallback(@Req() req: RawBodyRequest<Request>) {
    const raw = req.rawBody;
    console.log('Callback body:', new TextDecoder().decode(raw));
    const tokeBytes = req.rawBody;
    if (!tokeBytes) {
      throw new HttpException(
        'cant read message from body',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { unpackedMessage: authRespMsg } =
      await this._sdk.packageMgr.unpack(tokeBytes);

    console.log('authRespMsg', authRespMsg);

    const { from: developerDid, to: agentDid } = authRespMsg;

    const authReq: AuthorizationRequestMessage = await this._cacheManager.get(
      authRespMsg.to,
    );

    await this._sdk.authHandler.handleAuthorizationResponse(
      authRespMsg as AuthorizationResponseMessage,
      authReq,
    );
    console.log('Authorization response handled');

    await this._cacheManager.del(authRespMsg.to);

    const contract = this.getContract();

    let tx: any;
    try {
      const developer = await contract.getDeveloperDID(agentDid);
      if (developer) {
        return { developerDid: developer };
      }

      tx = await contract.bindAgentToDeveloper(agentDid, developerDid);
      await tx.wait();
      // Send a transaction that will revert
    } catch (err) {
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`Revert reason: ${decodedError.reason}`);
      throw new HttpException(
        `Revert reason: ${decodedError.reason}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._cacheManager.set(
      agentDid,
      {
        developerDid: developerDid,
        tx_id: tx.hash,
        messages: {
          authReq,
          authResp: authRespMsg,
        },
      },
      180_000,
    );

    return;
  }

  @Get('checkBind')
  async checkBind(@Query('did') agentDid: string) {
    const registered = await this._cacheManager.get(agentDid);
    if (registered) {
      return registered;
    }

    const contract = this.getContract();

    try {
      const developer = await contract.getDeveloperDID(agentDid);
      return { developerDid: developer };
      // Send a transaction that will revert
    } catch (err) {
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`Revert reason: ${decodedError.reason}`);
      throw new HttpException(
        `Revert reason: ${decodedError.reason}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('clear')
  async clear() {
    await this.getContract().clearAllMappings();
    return { status: 'ok' };
  }
}
