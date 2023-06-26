// const solanaWeb3 = require('@solana/web3.js');

// // Connect to Solana mainnet
// const connection = new solanaWeb3.Connection(
//   'https://api.mainnet-beta.solana.com',
//   'confirmed' // Commitment level
// );


// async function getTransactionHistory(address) {
//     const transactions = await connection.getConfirmedSignaturesForAddress2(address, {
//       limit: 10, // Number of transactions to fetch
//     });
  
//     const transactionHistory = [];
  
//     for (const tx of transactions) {
//       const transaction = await connection.getTransaction(tx.signature);
//       transactionHistory.push(transaction);
//     }
  
//     return transactionHistory;
//   }
  

//   const solanaAddress = 'tREBuCKw3PkKPU6jNYN8yCzHj7DGp1GVfumrCQqqKis';

// getTransactionHistory(solanaAddress)
//   .then((history) => {
//     console.log('Transaction History:', history);
//   })
//   .catch((error) => {
//     console.error('Error retrieving transaction history:', error);
//   });
