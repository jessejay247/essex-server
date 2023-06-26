const StellarSdk = require('stellar-sdk');

// Configure Stellar SDK to use the desired Horizon server
StellarSdk.Network.usePublicNetwork(); // Or useTestNetwork() for the Stellar testnet
const server = new StellarSdk.Server('https://horizon.stellar.org'); // Replace with the desired Horizon server URL

// Stellar account address for which you want to fetch transactions
const accountAddress = 'GCMCIJSSZJ6KM3QRXLC56OCW5AVOII3T6WUMBG3VMRJVWIJO5XG32AJ7';

// Fetch transactions for the account
server.transactions()
  .forAccount(accountAddress)
  .call()
  .then((response) => {
    console.log(response.records);
  })
  .catch((error) => {
    console.error('Error fetching transactions:', error);
  });
