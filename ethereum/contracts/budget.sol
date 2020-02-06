pragma solidity ^0.6.0;

// budget
contract Budget{
    address public manager;
    address payable[] public clubs;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function createClub(address payable _clubPresident) public payable{
        require(msg.sender==manager,'Not manager');
        address club = address(new Club(_clubPresident, msg.sender));
        address payable x = payable(club);
        clubs.push(x);
    }
    
    function sendEth(uint256 index) payable public{
        clubs[index].transfer(msg.value);
    }
    
    function getAllClubs() view public returns(address payable[] memory _clubs){
        _clubs = clubs;
    }
    
    
}

// club
contract Club{
    address public president;
    address public manager;
    
    struct Order{
        address payable vendorAddress;
        string vendorName;
        string orderName;
        uint256 orderAmount;
        bool paid;
        bool accepted;
    }
    
    uint16 public numOfOrders;
    Order[] orders;
    
    constructor(address _presidentAddress, address _manager) public{
        manager = _manager;
        president = _presidentAddress;
    }
    
    receive () external payable { }

    modifier restricted(){
        require(msg.sender==president, 'you are not the President');
        _;
    }

    function addOrder(address payable _vendorAddress, string memory _vendorName, string memory _orderName, uint256 _orderAmount) public restricted{
        Order memory order = Order({
            vendorName: _vendorName,
            orderName: _orderName,
            vendorAddress: _vendorAddress,
            orderAmount: _orderAmount,
            paid: false,
            accepted: false
        });
        orders.push(order);
        numOfOrders++;
    }
    
    event Deposit(uint256 amount, uint256 total);
    
    function sendOrder(uint256 index) public payable restricted{
        Order storage order = orders[index];
        require(order.accepted, 'Not accepted by manager');
        require(!order.paid, 'Already paid!!');
        orders[index].vendorAddress.transfer(order.orderAmount);
        orders[index].paid=true;
    }
    
    function getOrderCount() public view returns(uint16){
        return numOfOrders;
    }
    
    function getOrder(uint256 index) public view returns(address  _vendorAddress, string memory _vendorName, string memory _orderName, uint256 _orderAmount, bool _paid, bool _accepted){
        _vendorAddress = orders[index].vendorAddress;
        _vendorName = orders[index].vendorName;
        _orderName = orders[index].orderName;
        _orderAmount = orders[index].orderAmount;
        _paid = orders[index].paid;
        _accepted = orders[index].accepted;
    }
    
    function getBalance() view public returns(uint256 _b){
        _b = address(this).balance;
    }
    
    function acceptOrder(uint256 index) public {
        require(msg.sender==manager,'Not the manager');
        Order storage order = orders[index];
        order.accepted=true;
    }
}

// vendor
