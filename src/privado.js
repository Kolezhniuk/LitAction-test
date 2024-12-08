import { core, hexToBytes } from "@0xpolygonid/js-sdk";

export const go = async () => {
  const didType = core.buildDIDType(
    core.DidMethod.Iden3,
    core.Blockchain.Polygon,
    core.NetworkId.Amoy
  );

  // const did = buildDIDFromEthPubKey(didType, pubKeyHex);

  const genesis = core.genesisFromEthAddress(hexToBytes(ethAddress));
  const identifier = new core.Id(didType, genesis);
  const did = core.DID.parseFromId(identifier);

  const msgBytes = ethers.utils.arrayify(
    ethers.utils.keccak256(
      new TextEncoder().encode(
        typeof msgToSign === "string" ? msgToSign : JSON.stringify(msgToSign)
      )
    )
  );

  await LitActions.ethPersonalSignMessageEcdsa({
    message: msgBytes,
    publicKey,
    sigName: "Privado.ID",
  });

  const response = JSON.stringify(
    {
      did: did.string(),
    },
    null,
    2
  );

  LitActions.setResponse({
    response,
  });
};

go();
