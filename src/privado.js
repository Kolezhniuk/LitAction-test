import {
  buildDIDType,
  DidMethod,
  Blockchain,
  NetworkId,
  Id,
  DID,
  genesisFromEthAddress,
} from "@iden3/js-iden3-core";

(async () => {
  try {
    const didType = buildDIDType(
      DidMethod.Iden3,
      Blockchain.Polygon,
      NetworkId.Amoy
    );

    const genesis = genesisFromEthAddress(ethers.utils.arrayify(ethAddress));
    const identifier = new Id(didType, genesis);
    const did = DID.parseFromId(identifier);

    await LitActions.ethPersonalSignMessageEcdsa({
      message: msgToSign,
      publicKey,
      sigName: "sig",
    });

    const response = JSON.stringify(
      {
        did: did.string(),
        signedMessage: msgToSign,
      },
      null,
      2
    );

    LitActions.setResponse({
      response,
    });
  } catch (error) {
    console.log("Error");
  }
})();
