const { RpcProvider, Account, Contract, hash, ec, stark, byteArray, CallData, json, starknetId} = require("starknet");
const starknet = require("starknet");
const fs = require('fs');
const sierra = require("../contracts/JsonStorage contract class.json");
const casm = require("../contracts/JsonStorage compiled contract class.json");

const SEPOLIA_RPC_ENDPOINT = "https://starknet-sepolia.infura.io/v3/b32a290252144796984da8aaeb029c8b"
const SEPOLIA_ACCOUNT_PVT_KEY = "0x0257b92fd670e98b21c44d8ff3f38f713e99b94e7a1bc9d82814316c8ed48994"
const SEPOLIA_ACCOUNT_ADDRESS = "0x075B935CE584317391144647aba85Fc09D88Ae6501FB4966Ba35ceEB11a1382c"

console.log("hey");

async function main() {
    const provider = new RpcProvider({ nodeUrl: SEPOLIA_RPC_ENDPOINT });

    

//     const privateKey = stark.randomAddress();
// console.log('New OZ account:\nprivateKey=', privateKey);
// const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
// console.log('publicKey=', starkKeyPub);

// const OZaccountClassHash = '0x061dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f';
// // Calculate future address of the account
// const OZaccountConstructorCallData = CallData.compile({ publicKey: starkKeyPub });
// const OZcontractAddress = hash.calculateContractAddressFromHash(
//   starkKeyPub,
//   OZaccountClassHash,
//   OZaccountConstructorCallData,
//   0
// );

const account0 = new Account(provider, SEPOLIA_ACCOUNT_ADDRESS, SEPOLIA_ACCOUNT_PVT_KEY);

// const { transaction_hash, contract_address } = await account0.deployAccount({
//     classHash: OZaccountClassHash,
//     constructorCalldata: OZaccountConstructorCallData,
//     addressSalt: starkKeyPub,
//   });
  
//   await provider.waitForTransaction(transaction_hash);
//   console.log('✅ New OpenZeppelin account created.\n   address =', contract_address);

console.log("account done");



// Declare & deploy Test contract in devnet
    // const compiledTestSierra = json.parse(
    //     fs.readFileSync('/Users/mohit/Desktop/karnot/madara-get-started/contracts/JsonStorage compiled contract class.json').toString('ascii')
    // );
    // const compiledTestCasm = json.parse(
    //     fs.readFileSync('/Users/mohit/Desktop/karnot/madara-get-started/contracts/JsonStorage compiled contract class.json').toString('ascii')
    // );
    // const deployResponse = await account0.declareAndDeploy({
    //     contract: sierra,
    //     casm: casm,
    // });

    console.log("declare and deploy done");

    try {
        const declareResult = await account0.declare({
            contract: sierra,
            casm: casm,
        });
        console.log("declare result: ", declareResult);
        console.log('Test Contract declared with classHash =', declareResult.class_hash);

    } catch (err) {
        console.log("error: ", err);
    }

    console.log("deployment done");

    let constructorArgs = [
        SEPOLIA_ACCOUNT_ADDRESS
    ];

    try {
        const deployResponse = await account0.deploy({
            classHash: declareResult.class_hash,
            constructorCalldata: constructorArgs,
        });
        console.log("deploy result: ");
    } catch (err) {
        console.log("error: ");
    }



    // console.log(deployResponse.contractAddress);
}

main();