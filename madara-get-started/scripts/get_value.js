const starknet = require("starknet");
const SimpleStorage = require("../../cairo-projects/target/dev/testing_SimpleStorage.contract_class.json");

const contract_address =
  "0x7e65263ad905f9822c0c8a0300005b4cb257b0b26e5ffa70bfa139359848ecb";
const provider = new starknet.RpcProvider({
  nodeUrl: "http://localhost:9944",
});
const account = new starknet.Account(
  provider,
  "0x4",
  "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d",
  "1",
);

async function transfer() {
  const contract = new starknet.Contract(SimpleStorage.abi, contract_address, provider);
  let result = await contract.get();

//   let hash = await account.execute(result, undefined);

  console.log("Txn hash - ", result);
}

transfer();
