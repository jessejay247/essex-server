
var router = require('express').Router();
var bodyParser = require('body-parser');

const StellarSdk = require('stellar-sdk');

// Configure Stellar SDK to use the desired Horizon server
const server = new StellarSdk.Server('https://horizon.stellar.org');

// Stellar account address for which you want to fetch transactions
const accountAddress = 'GCKYVNWAFXWZUPQEAFB5NGMBKDMHWGEAZX5375ENDUAYVWBI5M4B3K4E';
// const transactionEnvelopeXDR = 'AAAAAgAAAACtIFry+wAu01XxpKBhaZQIEQfnL+SLcRfB7vLS1n2f5AAAJxACcqGWAAAAHAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAJWKtsAt7Zo+BAFD1pmBUNh7GIDN+7/0jR0Bitgo6zgdAAAAAAAAAANHRF1ZAAAAAAAAAAHWfZ/kAAAAQIcvGux8ym8LkHQmSIaj+O8y1AlFISfrJJDT8YEjLG85wtL5/8cgym0oxqvxMWww7GuezSW+TGkMoNvNZ+XWMg8=';// Replace with your transaction envelope XDR string


var urlencodedParser = bodyParser.urlencoded({ extended: false })

// const transactionEnvelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(transactionEnvelopeXDR, 'base64');


router.use(bodyParser.json());


/* Retrieve transaction history for AccountA */
router.post('/history', urlencodedParser, async function(req, res) {
    // Retrieve latest transaction
    let historyPage = await server.transactions()
      .forAccount(accountAddress)
      .call()
  
    console.log(`\n\nHistory for public key with accountID ${accountAddress}:`)
    
    // Check if there are more transactions in history
    // Stellar only returns one (or more if you want) transaction
    let hasNext = true
    while(hasNext) {
      if(historyPage.records.length === 0) {
        console.log("\nNo more transactions!")
        hasNext = false
      } else {
        // Print tx details and retrieve next historyPage
        console.log("\nSource account: ", historyPage.records[0].source_account)
        let txDetails = StellarSdk.xdr.TransactionEnvelope.fromXDR(historyPage.records[1].envelope_xdr, 'base64')
        
        txDetails._attributes.tx._attributes.operations.map(operation => console.log(`Transferred amount: ${operation._attributes.body._value._attributes.amount.low} XLM`))
        historyPage = await historyPage.next()
      }
    }
  
    res.send("History retrieved successful!")
});

module.exports = router;
