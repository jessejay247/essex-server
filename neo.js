const { Wallet, Transaction, TransactionOutput } = require("@cityofzion/neon-js");

// Configure your Neo network settings
const networkMagic = 0x00746e41;
const rpcAddress = "http://your.neo.rpc.address:port";
const privateKey = "your-private-key-here";

// Create a new Neo wallet instance
const wallet = new Wallet.Account(privateKey);

// Create a new transaction output
const output = new TransactionOutput({
  assetId: "asset-id-here",
  value: "10",
  scriptHash: "recipient-script-hash-here"
});

// Create a new Neo transaction
const tx = new Transaction({
  type: 0x80,
  version: 0,
  attributes: [],
  inputs: [],
  outputs: [output],
  scripts: []
});

// Sign the transaction with your private key
tx.sign(wallet);

// Send the transaction to the Neo network
const neon = require("@cityofzion/neon-js");
neon.default.add.network({
  name: "custom",
  extra: {
    neoscan: rpcAddress
  },
  rpcServer: rpcAddress,
  type: "TestNet",
  magic: networkMagic
});
neon.default.set.default(new neon.api.neoscan.instance("custom"));
neon.default.doSendTransaction(tx).then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);
});
