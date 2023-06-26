const StellarSdk = require('stellar-sdk');

// Create a server object using the Horizon testnet or mainnet endpoint
const server = new StellarSdk.Server('https://horizon.stellar.org'); // Replace with the desired network

// Transaction envelope XDR string
const transactionEnvelopeXDR = 'AAAAAgAAAACtIFry+wAu01XxpKBhaZQIEQfnL+SLcRfB7vLS1n2f5AAAJxACcqGWAAAAHAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAJWKtsAt7Zo+BAFD1pmBUNh7GIDN+7/0jR0Bitgo6zgdAAAAAAAAAANHRF1ZAAAAAAAAAAHWfZ/kAAAAQIcvGux8ym8LkHQmSIaj+O8y1AlFISfrJJDT8YEjLG85wtL5/8cgym0oxqvxMWww7GuezSW+TGkMoNvNZ+XWMg8=';// Replace with your transaction envelope XDR string

// Decode the transaction envelope
const transactionEnvelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(transactionEnvelopeXDR, 'base64');

// console.log(`Transaction value: ${transactionEnvelope}`);

// Get the transaction object from the envelope
const transaction = new StellarSdk.Transaction(transactionEnvelope);

console.log(`Transaction transaction: ${transaction.operations}`);

// Get the transaction value
const transactionValue = transaction.operations[0].amount;

console.log(`Transaction value: ${transactionValue}`);
