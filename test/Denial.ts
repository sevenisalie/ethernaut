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
    async function deployDenial() {
        const target = LEVEL_ADDRESSES.denial
        const victim = LEVEL_ADDRESSES.recoveryVictim
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const Hack = await ethers.getContractFactory(
            "contracts/Denial.sol:Denile",
            owner
        )
        const hack = await Hack.deploy(target)
        const targetContract = await ethers.getContractAt(
            "contracts/Denial.sol:Denial",
            target,
            owner
        )
        return { hack, target, targetContract, owner, otherAccount, victim };
    }

    describe("Pwn", () => {
        it("Contract Balance Should Be 0 After Self Destruct; Victim Balance Should Be Increased by Contract Balance Amount", async () => {
            const { owner, hack, target, targetContract, victim } = await loadFixture(deployDenial)



            const recover = await targetContract.withdraw()
            console.log(recover)
            expect(recover).to.be.reverted
        })
    })


})