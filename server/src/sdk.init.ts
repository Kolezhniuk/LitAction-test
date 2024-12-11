import { proving } from '@iden3/js-jwz';
import {
  BjjProvider,
  CredentialStorage,
  CredentialWallet,
  defaultEthConnectionConfig,
  EthStateStorage,
  ICredentialWallet,
  IDataStorage,
  Identity,
  IdentityStorage,
  IdentityWallet,
  IIdentityWallet,
  KMS,
  KmsKeyType,
  Profile,
  W3CCredential,
  EthConnectionConfig,
  CircuitData,
  ProofService,
  CredentialStatusType,
  CredentialStatusResolverRegistry,
  IssuerResolver,
  RHSResolver,
  AuthDataPrepareFunc,
  StateVerificationFunc,
  DataPrepareHandlerFunc,
  VerificationHandlerFunc,
  IPackageManager,
  VerificationParams,
  ProvingParams,
  ZKPPacker,
  PlainPacker,
  PackageManager,
  AgentResolver,
  FSCircuitStorage,
  CredentialStatusPublisherRegistry,
  Iden3SmtRhsCredentialStatusPublisher,
  CircuitId,
  AuthHandler,
  ICircuitStorage,
  IProofService,
  NativeProver,
  IZKProver,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  Sec256k1Provider,
  IAuthHandler,
} from '@0xpolygonid/js-sdk';
import * as path from 'path';

export const registerKeyProvidersInMemoryKMS = (): KMS => {
  const memoryKeyStore = new InMemoryPrivateKeyStore();
  const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
  const kms = new KMS();
  kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);
  const sec256k1Provider = new Sec256k1Provider(
    KmsKeyType.Secp256k1,
    memoryKeyStore,
  );
  kms.registerKeyProvider(KmsKeyType.Secp256k1, sec256k1Provider);
  return kms;
};

export interface JsSdk {
  dataStorage: IDataStorage;
  idWallet: IIdentityWallet;
  credWallet: ICredentialWallet;
  proofService: IProofService;
  authHandler: IAuthHandler;
  packageMgr: IPackageManager;
  circuitStorage: ICircuitStorage;
  prover: IZKProver;
}

const getPackageMgr = async (
  circuitData: CircuitData,
  prepareFn: AuthDataPrepareFunc,
  stateVerificationFn: StateVerificationFunc,
): Promise<IPackageManager> => {
  const authInputsHandler = new DataPrepareHandlerFunc(prepareFn);

  const verificationFn = new VerificationHandlerFunc(stateVerificationFn);
  const mapKey =
    proving.provingMethodGroth16AuthV2Instance.methodAlg.toString();

  if (!circuitData.verificationKey) {
    throw new Error(
      `verification key doesn't exist for ${circuitData.circuitId}`,
    );
  }
  const verificationParamMap: Map<string, VerificationParams> = new Map([
    [
      mapKey,
      {
        key: circuitData.verificationKey,
        verificationFn,
      },
    ],
  ]);

  if (!circuitData.provingKey) {
    throw new Error(`proving doesn't exist for ${circuitData.circuitId}`);
  }
  if (!circuitData.wasm) {
    throw new Error(`wasm file doesn't exist for ${circuitData.circuitId}`);
  }
  const provingParamMap: Map<string, ProvingParams> = new Map();
  provingParamMap.set(mapKey, {
    dataPreparer: authInputsHandler,
    provingKey: circuitData.provingKey,
    wasm: circuitData.wasm,
  });

  const mgr: IPackageManager = new PackageManager();
  const packer = new ZKPPacker(provingParamMap, verificationParamMap);
  const plainPacker = new PlainPacker();
  mgr.registerPackers([packer, plainPacker]);

  return mgr;
};

async function initCredentialWallet(
  dataStorage: IDataStorage,
): Promise<CredentialWallet> {
  const resolvers = new CredentialStatusResolverRegistry();
  resolvers.register(
    CredentialStatusType.SparseMerkleTreeProof,
    new IssuerResolver(),
  );
  resolvers.register(
    CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    new RHSResolver(dataStorage.states),
  );
  resolvers.register(
    CredentialStatusType.Iden3commRevocationStatusV1,
    new AgentResolver(),
  );

  return new CredentialWallet(dataStorage, resolvers);
}

async function initIdentityWallet(
  dataStorage: IDataStorage,
  credentialWallet: ICredentialWallet,
  kms: KMS,
): Promise<IIdentityWallet> {
  const credentialStatusPublisherRegistry =
    new CredentialStatusPublisherRegistry();
  credentialStatusPublisherRegistry.register(
    CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    new Iden3SmtRhsCredentialStatusPublisher(),
  );

  return new IdentityWallet(kms, dataStorage, credentialWallet, {
    credentialStatusPublisherRegistry,
  });
}

export const CONTRACTS = {
  AMOY_STATE_CONTRACT: '0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124',
  AMOY_UNIVERSAL_VERIFIER: '0x1Df0B05F15b5ea9648B8a081aca8ad0dE065bD1F',
  PRIVADO_STATE_CONTRACT: '0x975556428F077dB5877Ea2474D783D6C69233742',
  AUTH_V2_AMOY_VALIDATOR: '0x1a593E1aD3843b4363Dfa42585c4bBCA885553c0',
};

export const NETWORK_CONFIGS = {
  amoy: (contractAddress: string) => ({
    ...defaultEthConnectionConfig,
    url: 'https://rpc-amoy.polygon.technology',
    contractAddress,
    chainId: 80002,
  }),
  privadoMain: (contractAddress: string) => ({
    ...defaultEthConnectionConfig,
    url: 'https://rpc-testnet.privado.id',
    contractAddress,
    chainId: 21000,
  }),
  privadoTest: (contractAddress: string) => ({
    ...defaultEthConnectionConfig,
    url: 'https://rpc-mainnet.privado.id',
    contractAddress,
    chainId: 21001,
  }),
  lineaSepolia: (contractAddress: string) => ({
    ...defaultEthConnectionConfig,
    url: 'https://linea-sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    contractAddress,
    chainId: 80001,
  }),
};

export const setupSdk = async ({
  configs,
}: {
  configs: EthConnectionConfig[];
}): Promise<JsSdk> => {
  const states = new EthStateStorage([...configs]);

  const dataStorage: IDataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>(),
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states,
  };

  const circuitStorage = new FSCircuitStorage({
    dirname: path.join(process.cwd(), 'circuits'),
  });

  const credWallet = await initCredentialWallet(dataStorage);

  const kms = registerKeyProvidersInMemoryKMS();
  const idWallet = await initIdentityWallet(dataStorage, credWallet, kms);

  const prover = new NativeProver(circuitStorage);

  const proofService = new ProofService(
    idWallet,
    credWallet,
    circuitStorage,
    states,
  );

  const packageMgr = await getPackageMgr(
    await circuitStorage.loadCircuitData(CircuitId.AuthV2),
    proofService.generateAuthV2Inputs.bind(proofService),
    proofService.verifyState.bind(proofService),
  );

  const authHandler = new AuthHandler(packageMgr, proofService);

  return {
    dataStorage,
    idWallet,
    authHandler,
    proofService,
    packageMgr,
    circuitStorage,
    credWallet,
    prover,
  };
};
