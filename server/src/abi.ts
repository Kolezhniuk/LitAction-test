export const REGISTRY_ABI = ` [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "agentDID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "developerDID",
				"type": "string"
			}
		],
		"name": "AgentBound",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "agentDID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "developerDID",
				"type": "string"
			}
		],
		"name": "bindAgentToDeveloper",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "clearAllMappings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "clearer",
				"type": "address"
			}
		],
		"name": "setAuthorizedClearer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "agentDID",
				"type": "string"
			}
		],
		"name": "getDeveloperDID",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`;
