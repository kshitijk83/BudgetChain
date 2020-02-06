import web3 from "./web3";
import Budget from "./build/Budget.json";

const add = "0xc7CF9F692bbf45701B743f00484D4D68EF64Ba49";

export default new web3.eth.Contract(Budget.abi, add);
