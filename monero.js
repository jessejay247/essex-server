var router = require('express').Router();
var bodyParser = require('body-parser');

const MoneroWallet = require('monero-javascript').MoneroWallet;

const wallet = new MoneroWallet({
  networkType: 'mainnet', // or 'testnet'
  mnemonic: 'myself crystal heart ten nephew degree extra lemon tonight pig search detail swarm short exile',
});


router.post('/balance', async(req, res)  => {

    // Balance
    const balance = await wallet.getBalance(0); // get the balance of the first account
    console.log(`Wallet balance: ${balance}`);

    const result = {
        'balance': balance
    };


    res
        .status(200)
        .send(result)
        .end();
  });



router.post('/transfer', async(req, res)  => {
//Trx
    const tx = await wallet.createTx({
        accountIndex: 0, // the account index to send from
        address: 'recipient address',
        amount: 1000000000, // the amount to send in atomic units (1 XMR = 1e12 atomic units)
        priority: 0, // the transaction priority (0-3)
    });
    

    const signedTx = await wallet.signTx(tx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(`Transaction sent! Hash: ${txHash}`);

  });




  module.exports = router;
