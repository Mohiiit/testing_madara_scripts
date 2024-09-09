const starknet = require("starknet");

// initialize provider

const rpcProvider = new starknet.RpcProvider({ nodeUrl: 'http://localhost:9944' });
// initialize existing pre-deployed account 0 of Devnet
const privateKey = '0x2385662cfbb44bda279de7e021976d5dd027f7c49e0a9bb16e6855076e056d6';
const accountAddress = '0x7cf7d5768968c1c36a1d366421f4d200f3ad173b9e31639c81c5516c1874a92';

const account = new starknet.Account(rpcProvider, accountAddress, privateKey);

async function main() {
    // const nonce = await account.getNonce();
    // console.log("nonce: ", nonce);

    const balance = await account.getNonce(12);
    console.log("balance: ", balance);

    const block = await rpcProvider.getBlockNumber();
    console.log("block: ", block);
}

main();