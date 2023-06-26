const { Api, JsonRpc, RpcError, Serialize } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only

const defaultPrivateKey = 'YOUR_PRIVATE_KEY'; // replace with your private key
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://eos.greymass.com', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const account = 'YOUR_ACCOUNT_NAME';
const actions = [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
        actor: account,
        permission: 'active',
    }],
    data: {
        from: account,
        to: 'RECIPIENT_ACCOUNT_NAME',
        quantity: '1.0000 EOS',
        memo: 'Test Transfer',
    },
}];

(async () => {
    try {
        const result = await api.transact({ actions }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(result);
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    }
})();
