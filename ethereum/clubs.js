import web3 from './web3';
import Clubs from './build/Club.json';

export default (address)=>{
    return new web3.eth.Contract(
        JSON.parse(Clubs.abi),
        address
    )
}