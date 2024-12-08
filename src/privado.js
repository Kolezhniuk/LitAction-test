
import {
  buildDIDType,
  DidMethod,
  Blockchain,
  NetworkId,
  Id,
  DID,
  genesisFromEthAddress,
} from "@iden3/js-iden3-core";

export const go = async () => {
  const didType = buildDIDType(
    DidMethod.Iden3,
    Blockchain.Polygon,
    NetworkId.Amoy
  );

  const genesis = genesisFromEthAddress(ethers.utils.arrayify(ethAddress));
  const identifier = new Id(didType, genesis);
  const did = DID.parseFromId(identifier);

  msgToSign =
    typeof msgToSign === "string" ? msgToSign : JSON.stringify(msgToSign);
  const msgBytes = ethers.utils.arrayify(
    ethers.utils.keccak256(new TextEncoder().encode(msgToSign))
  );

  await LitActions.ethPersonalSignMessageEcdsa({
    message: msgBytes,
    publicKey,
    sigName: "Privado.ID",
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
};

go();
