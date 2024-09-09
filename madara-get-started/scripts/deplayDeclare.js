const starknet = require("starknet");
const sierra = require("../../cairo-projects/target/dev/testing_SimpleStorage.contract_class.json");
const casm = require("../../cairo-projects/target/dev/testing_SimpleStorage.compiled_contract_class.json");


const provider = new starknet.RpcProvider({
  nodeUrl: "http://localhost:9944",
});
const account = new starknet.Account(
  provider,
  "0x7cf7d5768968c1c36a1d366421f4d200f3ad173b9e31639c81c5516c1874a92",
  "0x2385662cfbb44bda279de7e021976d5dd027f7c49e0a9bb16e6855076e056d6"
);


async function declare() {
    try {
      const declareResponse = await account.declare({
        contract: sierra,
        casm: casm,
      });
      console.log('Test Contract declared with classHash =', declareResponse.class_hash);
      await provider.waitForTransaction(declareResponse.transaction_hash);
      console.log('✅ Test Completed.');
      } catch (err) {
        console.log("Contract is already declared", err);
      }
}

async function deploy() {
    try {
        const deployResult = await account.deploy({
            classHash: starknet.hash.computeContractClassHash(sierra),
          });
        
          console.log("This is the deploy result - ", deployResult);
          return deployResult.contract_address[0];
      } catch (err) {
        console.log("Error in deployment", err);
      }
}

async function set(contract_address) {
    try {
        const contract = new starknet.Contract(sierra.abi, contract_address, provider);
        // contract.connect(account);

        // const myCall = contract.populate('set', [1000]);
        // const res = await contract.set(myCall.calldata);
        // await provider.waitForTransaction(res.transaction_hash);

        let result = contract.populate("set", {
          x: 20
        });
    
        let hash = await account.execute(result, undefined);
    
        console.log("Txn hash for set - ", hash);
    } catch (err) {
        console.log("error while getting the data: ", err)
    }
}


async function get(contract_address) {
    try {
        const contract = new starknet.Contract(sierra.abi, contract_address, provider);
        let result = await contract.get_again();
        console.log("get again result - ", result);
        result = await contract.get();
        console.log("get result - ", result);
    } catch (err) {
        console.log("error while getting the data: ", err)
    }
}

async function getTransactionReceipt(txnHash) {
    const result = await provider.getTransactionReceipt(txnHash);

    console.log("This is the transaction receipt - ", result);
    console.log(result.events.keys);
    console.log(result.events.data);
}
async function main() {
  let contract = await declare();
//   let contractAddress = await deploy();
//   console.log(contractAddress);
//   let contractx = contractAddress.toString();
  // await set(contract);
  // await get(contract);
//   let getHash = await get(contractAddress);
//   await getTransactionReceipt(getHash);
}

main();
