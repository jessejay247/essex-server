// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

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

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  console.log(`Token balances of ${address} \n`);

  // Counter for SNo of final output
  let i = 1;

  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    // Print name, balance, and symbol of token
    console.log(`${i++}. ${token.contractAddress} - ${metadata.name}: ${balance} ${metadata.symbol} ${metadata.logo}`);
  }
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