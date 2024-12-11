# HOW to run the project

1. `cd fe && npm install`
2. `npm run build`
3. `cd ../server && npm install`
4. `cp .env.example .env` and provide the required values
5. `npm run start`
6. verify if signature is valid `http://localhost:4001/?name=TrumpBot&did=did:iden3:polygon:amoy:x6x5sor7zpxt8m7mh6u3pZJRDH1zTb13Fdt6BZVMM&signature=%7B%22v%22:1,%22r%22:%220x93377b8b3f967782d8fa1af5197f6c4f641a3e931ce67d8b3e99ab9325b9052a%22,%22s%22:%220x648b5ffdb5c6f2e97f53f1b66566b45694726065d4630c63fee8a20f4f4ba256%22%7D&msg=%7B%22from%22:%22ueba_detected%22,%22timeStamp%22:%222024-12-11T17:03:11.039Z%22%7D&signedMsg=0x50DA312AC1F60CE5B0CC0643415AD70C2651F6DD98DB7A4CAA4F6642EAA0951F`
