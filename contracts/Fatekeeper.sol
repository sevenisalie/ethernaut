// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperOne {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}

contract Fatekeeper is GatekeeperOne {
    GatekeeperOne public TargetGateKeeper;

    constructor(address target) {
        TargetGateKeeper = GatekeeperOne(target);
    }

    function updateTarget(address _newTarget) external {
        require(_newTarget != address(0));
        TargetGateKeeper = GatekeeperOne(_newTarget);
    }

    function estimateGas() public view returns (uint256 gas) {
        uint256 gasStart = 10 * 10 ** 9;
        // for (uint256 i; i < 8191)
        // (bool succ,) = TargetGateKeeper.gateTwo{value}()
        uint256 gasEnd = gasleft();
        return gas;
    }
}
