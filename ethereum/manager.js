import web3 from './web3';
import Budget from './build/Budget.json';

export default (address)=>{
    return new web3.eth.Contract(
        JSON.parse(Budget.abi),
        address
    )
}