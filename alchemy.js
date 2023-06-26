// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const config = {
  apiKey: "XsKJzbLf6-4MQPk_Wq4bmzHIUfo9i79t",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Wallet address
  const address = "0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3";

  // Get token balances
  const balances = await alchemy.core.getTokenBalances(address);

  console.log(`The balances of ${address} address are:`, balances);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();


