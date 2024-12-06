import type {
  IStateStorage,
  Identity,
  Profile,
  VerifyOpts,
} from "@0xpolygonid/js-sdk";
import sdk, { IssuerResolver } from "@0xpolygonid/js-sdk";

const {
  BjjProvider,
  CredentialStorage,
  Sec256k1Provider,
  IdentityStorage,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  KMS,
  KmsKeyType,
  VerifiableConstants,
  W3CCredential,
  CredentialStatusResolverRegistry,
  RHSResolver,
  CredentialStatusType,
  CredentialWallet,
  IdentityWallet,
} = sdk;

export const RHS_URL = process.env.RHS_URL as string;
export const RHS_CONTRACT_ADDRESS = process.env.RHS_CONTRACT_ADDRESS as string;
export const STATE_CONTRACT = process.env.STATE_CONTRACT_ADDRESS as string;
export const RPC_URL = process.env.RPC_URL as string;
export const WALLET_KEY = process.env.WALLET_KEY as string;
export const IPFS_URL = process.env.IPFS_URL as string;

export const MOCK_STATE_STORAGE: IStateStorage = {
  getRpcProvider: () => ({} as any),
} as IStateStorage
 

export const registerKeyProvidersInMemoryKMS = () => {
  const memoryKeyStore = new InMemoryPrivateKeyStore();
  const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
  const kms = new KMS();
  kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);
  const sec256k1Provider = new Sec256k1Provider(
    KmsKeyType.Secp256k1,
    memoryKeyStore
  );
  kms.registerKeyProvider(KmsKeyType.Secp256k1, sec256k1Provider);
  return kms;
};

export const getInMemoryDataStorage = (states: IStateStorage) => {
  return {
    credential: new CredentialStorage(new InMemoryDataSource<any>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states,
  };
};

export const dataStorage = getInMemoryDataStorage(MOCK_STATE_STORAGE);
const resolvers = new CredentialStatusResolverRegistry();
resolvers.register(
  CredentialStatusType.SparseMerkleTreeProof,
  new IssuerResolver()
);
export const credWallet = new CredentialWallet(dataStorage, resolvers);
export const idWallet = new IdentityWallet(
  registerKeyProvidersInMemoryKMS(),
  dataStorage,
  credWallet
);
