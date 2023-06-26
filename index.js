// var app = require('express').app();

const express = require('express');
const app = express();

app.use('/', require('./nft'));
app.use('/bsc', require('./bsc'));
app.use('/erc', require('./erc'));
app.use('/pos', require('./pos'));
app.use('/trx', require('./trx'));
app.use('/monero', require('./monero'));
// app.use('/sol', require('./sol'));
app.use('/vechain', require('./vechain'));
// app.use('/vet', require('./vet'));
app.use('/xlm', require('./xlm-5'));


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});