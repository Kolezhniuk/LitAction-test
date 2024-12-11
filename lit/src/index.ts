import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_NETWORK, LIT_RPC, LIT_ABILITY } from "@lit-protocol/constants";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
  LitActionResource,
  LitPKPResource,
} from "@lit-protocol/auth-helpers";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import * as ethers from "ethers";

import "dotenv/config";
import { readFileSync } from "fs";

const [LIT_PKP_PUBLIC_KEY, LIT_CAPACITY_CREDIT_TOKEN_ID, ETHEREUM_PRIVATE_KEY] =
  [
    "LIT_PKP_PUBLIC_KEY",
    "LIT_CAPACITY_CREDIT_TOKEN_ID",
    "ETHEREUM_PRIVATE_KEY",
  ].map((env) => String(process.env[env]));

const SELECTED_LIT_NETWORK = LIT_NETWORK.DatilTest;

export async function signMessage() {
  let litNodeClient: LitNodeClient;
  let pkpInfo: {
    tokenId?: string;
    publicKey?: string;
    ethAddress?: string;
  } = {
    publicKey: LIT_PKP_PUBLIC_KEY,
  };
  try {
    const ethersWallet = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );
    console.log("🔄 Connecting to the Lit network...");
    litNodeClient = new LitNodeClient({
      litNetwork: SELECTED_LIT_NETWORK,
      debug: false,
    });
    await litNodeClient.connect();
    console.log("✅ Connected to the Lit network");

    console.log("🔄 Connecting LitContracts client to network...");
    const litContracts = new LitContracts({
      signer: ethersWallet,
      network: SELECTED_LIT_NETWORK,
      debug: false,
    });
    await litContracts.connect();
    console.log("✅ Connected LitContracts client to network");

    if (LIT_PKP_PUBLIC_KEY === undefined || LIT_PKP_PUBLIC_KEY === "") {
      console.log("🔄 PKP wasn't provided, minting a new one...");
      pkpInfo = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
      console.log("✅ PKP successfully minted");
      console.log(`ℹ️  PKP token ID: ${pkpInfo.tokenId}`);
      console.log(`ℹ️  PKP public key: ${pkpInfo.publicKey}`);
      console.log(`ℹ️  PKP ETH address: ${pkpInfo.ethAddress}`);
    } else {
      console.log(`ℹ️  Using provided PKP: ${LIT_PKP_PUBLIC_KEY}`);
      pkpInfo = {
        publicKey: LIT_PKP_PUBLIC_KEY,
        ethAddress: ethers.utils.computeAddress(`0x${LIT_PKP_PUBLIC_KEY}`),
      };
      console.log(`ℹ️  PKP ETH address: ${pkpInfo.ethAddress}`);
    }

    let capacityTokenId = LIT_CAPACITY_CREDIT_TOKEN_ID;
    if (capacityTokenId === "" || capacityTokenId === undefined) {
      console.log("🔄 No Capacity Credit provided, minting a new one...");
      capacityTokenId = (
        await litContracts.mintCapacityCreditsNFT({
          requestsPerKilosecond: 10,
          daysUntilUTCMidnightExpiration: 1,
        })
      ).capacityTokenIdStr;
      console.log(`✅ Minted new Capacity Credit with ID: ${capacityTokenId}`);
    } else {
      console.log(
        `ℹ️  Using provided Capacity Credit with ID: ${LIT_CAPACITY_CREDIT_TOKEN_ID}`
      );
    }

    console.log("🔄 Creating capacityDelegationAuthSig...");
    const { capacityDelegationAuthSig } =
      await litNodeClient.createCapacityDelegationAuthSig({
        dAppOwnerWallet: ethersWallet,
        capacityTokenId,
        delegateeAddresses: [ethersWallet.address],
        uses: "1",
      });
    console.log("✅ Capacity Delegation Auth Sig created");

    console.log("🔄 Getting Session Sigs via an Auth Sig...");
    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: "ethereum",
      capabilityAuthSigs: [capacityDelegationAuthSig],
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitPKPResource("*"),
          ability: LIT_ABILITY.PKPSigning,
        },
        {
          resource: new LitActionResource("*"),
          ability: LIT_ABILITY.LitActionExecution,
        },
      ],
      authNeededCallback: async ({
        resourceAbilityRequests,
        expiration,
        uri,
      }) => {
        const toSign = await createSiweMessageWithRecaps({
          uri: uri!,
          expiration: expiration!,
          resources: resourceAbilityRequests!,
          walletAddress: ethersWallet.address,
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });

        return await generateAuthSig({
          signer: ethersWallet,
          toSign,
        });
      },
    });
    console.log("✅ Got Session Sigs via an Auth Sig");

    const msgToSign = ethers.utils.arrayify(
      ethers.utils.keccak256(
        new TextEncoder().encode(
          JSON.stringify({
            from: "dima",
            time: "test",
          })
        )
      )
    );
    const litActionDIDCode = readFileSync("./privado.ID.lit.js", "utf8");
    const litActionDID = await litNodeClient.executeJs({
      sessionSigs,
      code: litActionDIDCode,
      // ipfsId: "Qmc6p6afLZDwRdq8H5WGzbrbjRPoaqt4njeubBEFyeDa5d",
      jsParams: {
        msgToSign,
        ethAddress: pkpInfo.ethAddress,
        publicKey: pkpInfo.publicKey,
      },
    });

    const { signatures, response } = litActionDID;

    console.log("Response", response);

    const signature = signatures["sig"];
    console.log("Signatures", signature);

    const sig = {
      v: signature.recid,
      r: `0x${signature.r}`,
      s: `0x${signature.s}`,
    };

    const encodedSig = ethers.utils.joinSignature(sig);

    const signedData = `0x${signature.dataSigned}`;

    const recoveredAddress = ethers.utils.recoverAddress(
      signedData,
      encodedSig
    );

    console.log("Recovered Address", recoveredAddress);

    console.assert(
      pkpInfo.ethAddress?.toLowerCase() === recoveredAddress.toLowerCase(),
      `Invalid Signature for ${pkpInfo.ethAddress}, recovered ${recoveredAddress}`
    );

    // verify the signature

    return litActionDID;
  } catch (error) {
    console.error(error);
  } finally {
    litNodeClient!.disconnect();
  }
}

signMessage()
  .then((signature) => {
    console.log(signature);
  })
  .catch((error) => {
    console.error(error);
  });
