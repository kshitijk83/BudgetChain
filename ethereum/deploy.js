const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
// const ganache = require('ganache-cli');
const compiledBudget = require("./build/Budget.json");

const provider = new HDWalletProvider(
  "east fame scheme hero hole able jelly cabbage inspire dentist gravity sphere", // account mneumonic
  "https://rinkeby.infura.io/v3/3d156b362e204bae9b3a0e1c5f2e0855" // infura api to interact with infura node
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("deploying from account", accounts[0]);
  // console.log(compiledBudget.abi);
  const result = await new web3.eth.Contract(
    compiledBudget.abi
  )
    .deploy({ data: "0x"+compiledBudget.evm.bytecode.object })
    .send({ from: accounts[0], gas: "7000000" });
  console.log("deployed to address", result.options.address);
};
deploy();
