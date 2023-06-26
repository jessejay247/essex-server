var router = require('express').Router();
var bodyParser = require('body-parser');
const axios = require('axios');


//https://horizon.stellar.org/accounts/GCKYVNWAFXWZUPQEAFB5NGMBKDMHWGEAZX5375ENDUAYVWBI5M4B3K4E/transactions


var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.json());
router.post('/transactions', urlencodedParser, async function(req, res) {

  try {

    var account = req.body.account;

    console.log('account ', account);


    const response = await axios.get(`https://horizon.stellar.org/accounts/${account}/transactions`); // Replace with the actual API endpoint
    const data = response.data;
const records = data['_embedded']['records'];

const allRecords = []; // Create an empty array

for (const rec of records) {
  // console.log('rec', rec);


  
  const pageToken = rec['paging_token'];


  // const parsedPageToken = BigInt(pageToken);

  // console.log('paging_token 2', parsedPageToken);

    const id = BigInt(pageToken) + BigInt(1);
    const operations = await axios.get(`https://horizon.stellar.org/operations/${id}`); 


    const opData = operations.data;

    if (opData['type'] == 'payment') {
      allRecords.push(opData);
    }


}




  res
  .status(200)
  .send(allRecords)
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
