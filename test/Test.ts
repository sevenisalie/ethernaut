import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ADDRESSES, LEVEL_ADDRESSES } from "../scripts/consts";
import { randomBytes } from "crypto";
import { assert } from "console";
import { BigNumber } from "ethers";

describe("Reservation", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployRecovery() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const Test = await ethers.getContractFactory(
            "contracts/Test.sol:InitCodeTest",
            owner
        )
        const test = await Test.deploy()

        const Test2 = await ethers.getContractFactory(
            "contracts/Test.sol:GateTwoTest",
            owner
        )
        const test2 = await Test2.deploy()

        const Test2Caller = await ethers.getContractFactory(
            "contracts/Test.sol:GateTwoCaller",
            owner
        )
        const test2Caller = await Test2Caller.deploy(test2.address)

        return { test, owner, otherAccount, test2, test2Caller };
    }

    describe("Pwn", () => {
        it("Generate Key to Pass Gate3", async () => {
            const { owner, test } = await loadFixture(deployRecovery)
            const response = await test.getBytecode()
        })

        // it("Pass Gate 2", async () => {
        //     const { owner, test, test2, test2Caller } = await loadFixture(deployRecovery)
        //     const response = await test2Caller.test()
        //     console.log(response)
        //     await expect((await test2.entrant())).to.equal(owner.address)
        // })
    })


})