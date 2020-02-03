import web3 from "./web3";
import Budget from "./build/Budget.json";

const add = "0x0b5Ed509d3c6053164693d1d1774F4D1be94D2A7";

export default new web3.eth.Contract(Budget.abi, add);
