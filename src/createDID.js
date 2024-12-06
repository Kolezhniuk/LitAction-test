import sdk from "@0xpolygonid/js-sdk";

const {
  BjjProvider,
  CredentialStorage,
  IdentityStorage,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  KMS,
  KmsKeyType,
  CredentialStatusResolverRegistry,
  IssuerResolver,
  CredentialStatusType,
  CredentialWallet,
  IdentityWallet,
} = sdk;

export const registerKeyProvidersInMemoryKMS = () => {
  const memoryKeyStore = new InMemoryPrivateKeyStore();
  const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
  const kms = new KMS();
  kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);

  return kms;
};

export const getInMemoryDataStorage = (states) => {
  return {
    credential: new CredentialStorage(new InMemoryDataSource()),
    identity: new IdentityStorage(
      new InMemoryDataSource(),
      new InMemoryDataSource()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states,
  };
};

export const dataStorage = getInMemoryDataStorage({
  getRpcProvider: () => ({}),
});
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

export const go = async () => {
  const seed = hexToBytes(signatureHex);

  const { did, credential } = await idWallet.createIdentity({
    method: core.DidMethod.Iden3,
    blockchain: core.Blockchain.Polygon,
    networkId: core.NetworkId.Amoy,
    seed,
    revocationOpts: {
      type: credStatusType,
      id,
      nonce,
    },
  });

  Lit.Actions.setResponse({
    response: JSON.stringify({ did: did.string(), credential }),
  });
};

go();
