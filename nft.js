var router = require('express').Router();
var bodyParser = require('body-parser');
const axios = require('axios');

const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');


const abi = [{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];



var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
  res
      .status(200)
      .send('Hello server is running')
      .end();
});

router.post('/transfer', urlencodedParser, async function(req, res) {
  try {
    var tokenId = req.body.tokenId;
    var contractAddress = req.body.contractAddress;
    var recipientAddress = req.body.recipientAddress;
    var privateKey = req.body.privateKey;

    const signer = new ethers.Wallet(privateKey, provider);
    const nftContract = new ethers.Contract(contractAddress, abi, signer);

    const balance = await nftContract.balanceOf(signer.getAddress());
    if (balance < 1) {
        throw new Error('You do not own the NFT.');
    }

    const approved = await nftContract.getApproved(tokenId);
    if (approved !== toAddress) {
      await nftContract.approve(toAddress, tokenId);
    }

    const tx = await nftContract.safeTransferFrom(signer.address, recipientAddress, tokenId);
    await tx.wait();
    console.log("NFT transferred successfully");

  } catch (error) {
    console.error(error);
  }
});

router.post('/balanceOf', urlencodedParser, async function(req, res) {
  try {
    const bscProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');


    var contractAddress = req.body.contractAddress;
    var address = req.body.address;

    const nftContract = new ethers.Contract(contractAddress, abi, bscProvider);
    const balance = await contract.balanceOf(address);

    const nfts = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
      const owner = await nftContract.ownerOf(tokenId);
      nfts.push({ tokenId, owner });
    }
    
    console.log(nfts);

  } catch (error) {
    console.error(error);
  }
});


module.exports = router;


