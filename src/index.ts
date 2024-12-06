import { core, CredentialStatusType, hexToBytes } from "@0xpolygonid/js-sdk";
import { signMessage } from "./lit";
import { idWallet } from "./iden3";

signMessage("Challenge to sign")
  .then((signature) => {
    console.log(signature);
  })
  .catch((error) => {
    console.error(error);
  });

// const createDID = async () => {
//   const seed = hexToBytes(
//     "0x264A71D3C11264111E25A3FBE9EA501E0861BD30654F9428E649E6904872EEF7"
//   );

//   const { did, credential } = await idWallet.createIdentity({
//     method: core.DidMethod.Iden3,
//     blockchain: core.Blockchain.Polygon,
//     networkId: core.NetworkId.Amoy,
//     seed,
//     revocationOpts: {
//       type: CredentialStatusType.Iden3commRevocationStatusV1,
//       id: "http://example.com/revocation-list",
//       nonce: 12345,
//     },
//   });

//   console.log(did.string(), credential);
// };

// createDID();

// import sdk from "@0xpolygonid/js-sdk";
// import { signMessage } from "./lit.js";
// import { idWallet } from "./iden3.js";
// import type { Express, Request, Response } from "express";
// import express from "express";
// import path from "path";
// import "dotenv/config";
// import cors from "cors";
// import c from '@iden3/js-crypto';

// const { core, CredentialStatusType, hexToBytes } = sdk;

// const app: Express = express();
// const port = process.env.PORT || 3005;

// app.use(cors());
// app.use("/verification", express.static(path.join(process.cwd(), "static")));

// app.get("/id", async (_req: Request, res: Response) => {
//   const signature = await signMessage("Challenge to sign");
//   // const seed = hexToBytes(signature!.dataSigned);
//   // const seed = hexToBytes("0x264A71D3C11264111E25A3FBE9EA501E0861BD30654F9428E649E6904872EEF7");

//   // const { did, credential } = await idWallet.createIdentity({
//   //   method: core.DidMethod.Iden3,
//   //   blockchain: core.Blockchain.Polygon,
//   //   networkId: core.NetworkId.Amoy,
//   //   seed,
//   //   revocationOpts: {
//   //     type: CredentialStatusType.Iden3commRevocationStatusV1,
//   //     id: "http://example.com/revocation-list",
//   //     nonce: new Date().getTime(),
//   //   }
//   // });

//   return res.json({});
//   // return res.json({ did: did.string(), credential });
// });

// app.get("/resolve-did/:did", async (req: Request, res: Response) => {
//   const did = req.params["did"];

//   if (!did) {
//     res.status(400);
//     return res.json({ error: "Invalid DID" });
//   }

//   const bjjCred = await idWallet.getActualAuthCredential(core.DID.parse(did));

//   if (!bjjCred) {
//     res.status(404);
//     return res.json({ error: "Credential not found" });
//   }

//   const didDocResp = await fetch(
//     `https://resolver.privado.id/1.0/identifiers/${did}`
//   );

//   const didDoc = await didDocResp.json();

//   const {
//     credentialSubject: { x, y },
//     credentialStatus,
//     proof,
//   } = bjjCred.authCredential;

//   const verificationMethod = {
//     id: `${did}#bjj`,
//     type: "BJJKey",
//     controller: did,
//     jwk: {
//       alg: "BJJ",
//       crv: "BN-128",
//       x,
//       y,
//     },
//     credentialStatus,
//     proof,
//   };

//   return res.json({
//     ...didDoc,
//     didDocument: {
//       ...didDoc.didDocument,
//       verificationMethod: [
//         ...didDoc.didDocument.verificationMethod,
//         verificationMethod,
//       ],
//       services: [
//         ...(didDoc.didDocument?.services ?? []),
//         {
//           id: `${did}#service`,
//           type: "challenge",
//           serviceEndpoint: `http://localhost:${port}/sign-challenge`,
//         },
//       ],
//     },
//   });
// });

// app.post(
//   "/sign-challenge/:challenge/:did",
//   async (req: Request, res: Response) => {
//     const challenge = req.params["challenge"];
//     const did = req.params["did"];
//     const bjjCred = await idWallet.getActualAuthCredential(core.DID.parse(did));
//     const signature = await idWallet.signChallenge(
//       BigInt(challenge),
//       bjjCred.authCredential
//     );

//     return res.json({ signature: signature.hex() });
//   }
// );

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
