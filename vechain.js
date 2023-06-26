var router = require('express').Router();
var bodyParser = require('body-parser');

const thorify = require("thorify").thorify;
const Web3 = require("web3");

const web3 = thorify(new Web3(), "https://mainnet.veblocks.net");


var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.json());


router.post('/trxns', urlencodedParser, async function(req, res) {

    //?
web3.eth.getPastLogs({fromBlock:'0x0',address:'0x9e3319636e2126e3c0bc9e3134AEC5e1508A46c7'})
.then((res) => {
  res.forEach(rec => {
    console.log(rec.blockNumber, rec.transactionHash, rec.topics);
  });
}).catch(err => console.log("getPastLogs failed", err));

// var address = req.body.address;
//?
//!
// var myAddr = '0xbb9bc244d798123fde783fcc1c72d3bb8c189413';
// var currentBlock = eth.blockNumber;
// var n = eth.getTransactionCount(myAddr, currentBlock);

// myAddr.toLowerCase();

// var bal = eth.getBalance(myAddr, currentBlock);
// for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
//     try {
//         var block = eth.getBlock(i, true);
//         if (block && block.transactions) {
//             block.transactions.forEach(function(e) {
//                 if (myAddr == e.from) {
//                     if (e.from != e.to)
//                         bal = bal.plus(e.value);
//                     console.log(i, e.from, e.to, e.value.toString(10));
//                     --n;
//                 }
//                 if (myAddr == e.to) {
//                     if (e.from != e.to)
//                         bal = bal.minus(e.value);
//                     console.log(i, e.from, e.to, e.value.toString(10));
//                 }
//             });
//         }
//     } catch (e) { console.error("Error in block " + i, e); }
// }
//!


});



router.post('/transactions', urlencodedParser, async function(req, res) {

    var address = req.body.address;
    var endBlockNumber = req.body.endBlockNumber;
    var startBlockNumber = req.body.startBlockNumber;

    if (endBlockNumber == null) {
        // endBlockNumber = eth.blockNumber;
        endBlockNumber =await web3.eth.getBlockNumber();
        console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == null) {
      startBlockNumber = endBlockNumber - 1000;
      console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for transactions to/from account \"" + address + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
  
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
      if (i % 1000 == 0) {
        console.log("Searching block " + i);
      }

      try {

        let block;

    //   var block = eth.getBlock(i, true);
    // web3.eth.getBlock(i)
    // .then(console.log);
    //   var block =  await web3.eth.getBlock(i);
    //   console.log(" block " + block);

      web3.eth.getBlock(i)
        .then((retrievedBlock) => {
            block = retrievedBlock;
            console.log(" block " +block);
            // Use the block value here
        })
        .catch(error => {
            console.error(" block error " +error);
        });

      if (block != null && block.transactions != null) {
        block.transactions.forEach( function(e) {
          if (address == "*" || address == e.from || address == e.to) {
            console.log("  tx hash          : " + e.hash + "\n"
              + "   nonce           : " + e.nonce + "\n"
              + "   blockHash       : " + e.blockHash + "\n"
              + "   blockNumber     : " + e.blockNumber + "\n"
              + "   transactionIndex: " + e.transactionIndex + "\n"
              + "   from            : " + e.from + "\n" 
              + "   to              : " + e.to + "\n"
              + "   value           : " + e.value + "\n"
              + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
              + "   gasPrice        : " + e.gasPrice + "\n"
              + "   gas             : " + e.gas + "\n"
              + "   input           : " + e.input);
          }
        })
      }
    
    } catch (error) {
    console.error(error);

    // const jsonObject = JSON.parse(error);
    // res
    // .status(401)
    // .send(jsonObject)
    // .end();
  }
}
});

module.exports = router;