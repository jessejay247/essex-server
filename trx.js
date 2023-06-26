var router = require('express').Router();

const TronWeb = require('tronweb');
var bodyParser = require('body-parser');



const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");





const apiKey = "1d0408c9-b1c0-4ca8-80c3-ee799d4d89b7";

// router.use(require('body-parser').urlencoded({ extended: false }));


var urlencodedParser = bodyParser.urlencoded({ extended: false })



const tronWeb = new TronWeb({
    // fullHost: 'https://api.shasta.trongrid.io',
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": apiKey },
})



router.use(bodyParser.json());

router.post('/balance', urlencodedParser, async function(req, res) {

    try {
        var address = req.body.address;
        var contractAddress = req.body.contractAddress;

        const privateKey = "01c2a99a6ba1d720acb3dd9a9f519ed7548923b480bad3109b7385466fd32361";
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

        let contract = await tronWeb.contract().at(contractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let decimals = await contract.decimals().call();
        let balance = await contract.balanceOf(address).call();
        let symbol = await contract.symbol().call();

        const formattedBalance = parseFloat(balance) / Math.pow(10, decimals);

        // Create an object with contract address and balance
        const tokenBalance = {
            contractAddress,
            formattedBalance,
            decimals,
            symbol
        };

        res
        .status(200)
        .send(tokenBalance)
        .end();

    } catch (err) {
        // next(err);
        console.error("trigger smart contract error", err)

    }
});

router.post('/balances', urlencodedParser, async function(req, res) {
    try {
        var address = req.body.address;
        var contractAddresses = req.body.contractAddresses;


        const privateKey = "01c2a99a6ba1d720acb3dd9a9f519ed7548923b480bad3109b7385466fd32361";
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

        const balances = [];

        // Iterate through each contract address
        for (const contractAddress of contractAddresses) {
          // Instantiate the token contract using the ABI
          let contract = await tronWeb.contract().at(contractAddress);
          let decimal = await contract.decimals().call();
          let balance = await contract.balanceOf(address).call();
          let symbol = await contract.symbol().call();

          const formattedBalance = parseFloat(balance) / Math.pow(10, decimal);
      
          // Create an object with contract address and balance
          let decimals = parseInt(decimal);
          const tokenBalance = {
            contractAddress,
            formattedBalance,
            decimals,
            symbol
          };
      
          // Push the object to the balances array
          balances.push(tokenBalance);
        }
            // Return the balances array
            res
            .status(200)
            .send(balances)
            .end();

    } catch (err) {
        // next(err);
        console.error("trigger smart contract error", err)

    }
});


router.post('/transfer', urlencodedParser, async function(req, res) {
    try {
        var privateKey = req.body.privateKey;
        var amount = parseInt(req.body.amount);
        var toAddress = req.body.toAddress;
        var fromAddress = req.body.fromAddress;
        // var hasCommission = req.body.hasCommission;


        //Creates an unsigned TRX transfer transaction
        const tradeobj = await tronWeb.transactionBuilder.sendTrx(
            toAddress,
            amount * 1000000,
            fromAddress
        );
        const signedtxn = await tronWeb.trx.sign(
            tradeobj,
            privateKey
        );
        const receipt = await tronWeb.trx.sendRawTransaction(
            signedtxn
        );

        res.end(JSON.stringify(receipt));


    } catch (err) {
        // next(err);
        console.log('- Error:', err, '\n');

    }
});


router.post('/transferTrc20', urlencodedParser, async function(req, res) {


    try {
        var privateKey = req.body.privateKey;
        var trc20ContractAddress = req.body.trc20ContractAddress;
        var toAddress = req.body.toAddress;
        var amount = parseInt(req.body.amount);
        // var fromAddress = req.body.fromAddress;

        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        let result = await contract.transfer(
            toAddress, //address _to
            amount * 1000000 //amount
        ).send(
            //     {
            //     feeLimit: 1000000
            // }
        );
        // .then(output => { console.log('- Output:', output, '\n'); });

        res.end(JSON.stringify(result));


    } catch (err) {
        // next(err);
        console.log('- Error:', err, '\n');

    }
});

router.post('/info', urlencodedParser, async function(req, res) {

    try {

        
        var contractAddress = req.body.contractAddress;
        console.error("trigger contractAddress", contractAddress)

        const privateKey = "01c2a99a6ba1d720acb3dd9a9f519ed7548923b480bad3109b7385466fd32361";
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

        let contract = await tronWeb.contract().at(contractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let name = await contract.name().call();
        let symbol = await contract.symbol().call();
        let decimals = await contract.decimals().call();

        // Create an object with contract address and balance
        const tokenBalance = {
            name,
            symbol,
            decimals
        };

        res
        .status(200)
        .send(tokenBalance)
        .end();

    } catch (err) {
        // next(err);
        console.error("trigger smart contract error", err)

    }
});

router.post('/fromHex', urlencodedParser, async function(req, res) {

    try {

        var address = req.body.address;

        const privateKey = "01c2a99a6ba1d720acb3dd9a9f519ed7548923b480bad3109b7385466fd32361";
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

        let newAdd = tronWeb.address.fromHex(address);

        res
        .status(200)
        .send(newAdd)
        .end();

    } catch (err) {
        // next(err);
        console.error("error", err)

    }
});
module.exports = router;