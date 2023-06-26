const Web3 = require('web3');

var router = require('express').Router();
var bodyParser = require('body-parser');
const axios = require('axios');

// Set up the web3 provider
const providerUrl = 'https://bsc-dataseed.binance.org/'; // Choose the appropriate Binance Smart Chain provider URL
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

var urlencodedParser = bodyParser.urlencoded({ extended: false })



const contractAbi =  [
  {
    constant: true,
    inputs: [
        { 
            name: '_owner', 
            type: 'address' 
        },
    ],
    name: 'balanceOf',
    outputs: [
        { 
            name: 'balance', 
            type: 'uint256' 
        }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];


router.use(bodyParser.json());

router.post('/balance', urlencodedParser, async function(req, res) {

    try {
    var contractAddress = req.body.contractAddress;
    var address = req.body.address;

      // Instantiate the token contract using the ABI
      const contract = new web3.eth.Contract(
          contractAbi, // Replace with the actual path to the token contract ABI
        contractAddress
      );
  
      const decimals = await contract.methods.decimals().call();
      const symbol = await contract.methods.symbol().call();
  
      // Retrieve the token balance for the given address
      const balance = await contract.methods.balanceOf(address).call();
  
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

    // return balances;

    } catch (error) {
        console.error(error);

        const jsonObject = JSON.parse(error);
        res
        .status(401)
        .send(jsonObject)
        .end();
      }
    });


router.post('/balances', urlencodedParser, async function(req, res) {

    try {
    var contractAddresses = req.body.contractAddresses;
    var address = req.body.address;

    // console.log(contractAddresses);

    const balances = [];

    // Iterate through each contract address
    for (const contractAddress of contractAddresses) {
      // Instantiate the token contract using the ABI
      const contract = new web3.eth.Contract(
          contractAbi, // Replace with the actual path to the token contract ABI
        contractAddress
      );
  
      const decimals = await contract.methods.decimals().call();
      const symbol = await contract.methods.symbol().call();

      // Retrieve the token balance for the given address
      const balance = await contract.methods.balanceOf(address).call();
  
      const formattedBalance = parseFloat(balance) / Math.pow(10, decimals);
  
      // Create an object with contract address and balance
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

    // return balances;

    } catch (error) {
        console.error(error);

        // const jsonObject = JSON.parse(error);
        res
        .status(401)
        .send(error)
        .end();
      }
    });


    router.post('/info', urlencodedParser, async function(req, res) {

        try {
        var contractAddress = req.body.contractAddress;
      
          // Instantiate the token contract using the ABI
          const contract = new web3.eth.Contract(
              contractAbi, // Replace with the actual path to the token contract ABI
            contractAddress
          );
      
          const name = await contract.methods.name().call();
          const symbol = await contract.methods.symbol().call();
          const decimals = await contract.methods.decimals().call();
    
          const tokenInfo = {
            name,
            symbol,
            decimals
      
          };
      
        res
        .status(200)
        .send(tokenInfo)
        .end();
      
        // return balances;
      
        } catch (error) {
            console.error(error);
      
            const jsonObject = JSON.parse(error);
            res
            .status(401)
            .send(jsonObject)
            .end();
          }
        });


    module.exports = router;
