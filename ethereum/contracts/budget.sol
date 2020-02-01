pragma solidity ^0.6.0;

// budget
contract Budget{
    address public manager;
    address payable[] public clubs;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function createClub(address payable _clubPresident) public payable{
        require(msg.sender==manager);
        address club = address(new Club(_clubPresident));
        address payable x = payable(club);
        clubs.push(x);
    }
    
    function sendEth(uint256 index) payable public{
        clubs[index].transfer(msg.value);
    }
}

// club
contract Club{
    address public president;
    
    struct Order{
        address payable vendorAddress;
        string vendorName;
        string orderName;
        uint256 orderAmount;
        bool paid;
    }
    
    uint16 public numOfOrders;
    Order[] orders;
    
    constructor(address _presidentAddress) public{
        president = _presidentAddress;
    }
    
    receive () external payable { }

    modifier restricted(){
        require(msg.sender==president, 'you are not not the President');
        _;
    }

    function addOrder(address payable _vendorAddress, string memory _vendorName, string memory _orderName, uint256 _orderAmount) public restricted{
        Order memory order = Order({
            vendorName: _vendorName,
            orderName: _orderName,
            vendorAddress: _vendorAddress,
            orderAmount: _orderAmount,
            paid: false
        });
        orders.push(order);
        numOfOrders++;
    }
    
    event Deposit(uint256 amount, uint256 total);
    
    function sendOrder(uint256 index) public payable restricted{
        Order storage order = orders[index];
        require(!order.paid, 'Already paid!!');
        // require(address(this).balance<=0, 'No Fund left');
        orders[index].vendorAddress.transfer(order.orderAmount);
        orders[index].paid=true;
    }
    
    function getOrderCount() public view returns(uint16){
        return numOfOrders;
    }
    
    function getOrder(uint256 index) public view returns(address  _vendorAddress, string memory _vendorName, string memory _orderName, uint256 _orderAmount, bool _paid){
        _vendorAddress = orders[index].vendorAddress;
        _vendorName = orders[index].vendorName;
        _orderName = orders[index].orderName;
        _orderAmount = orders[index].orderAmount;
        _paid = orders[index].paid;
    }
    
    function getBalance() view public returns(uint256 _b){
        _b = address(this).balance;
    }
}

// vendor
