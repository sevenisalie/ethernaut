// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IKOTHKoin {
    function koth (address, uint256) external;
}

abstract contract KOTHKoin is ERC20 {
    address King;
    uint256 treasure;
    constructor() {
        King = msg.sender;
    }
    function koth(
        address king,
        uint256 offering
    ) external {
        King = king;
        treasure = treasure + offering;
    }
}

contract LowCall {
    address prince;
    constructor() {
        prince = msg.sender;
    }
    function takeThrone(bytes calldata encodedCallData, address target) external returns (bool) {
        (bool succ, bytes memory response) = target.call(encodedCallData);
        return succ;
    }

    function encodeCall(address king, uint256 offering) external pure returns (bytes memory) {
        return abi.encodeCall(IKOTHKoin.koth, (king, offering));
    } 

}