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
        const target = LEVEL_ADDRESSES.recovery
        const victim = LEVEL_ADDRESSES.recoveryVictim
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const Hack = await ethers.getContractFactory(
            "contracts/Recovery.sol:Rescuer",
            owner
        )
        const hack = await Hack.deploy(victim)
        const targetContract = await ethers.getContractAt(
            "contracts/Recovery.sol:Recovery",
            target,
            owner
        )
        return { hack, target, targetContract, owner, otherAccount, victim };
    }

    describe("Pwn", () => {
        it("Contract Balance Should Be 0 After Self Destruct; Victim Balance Should Be Increased by Contract Balance Amount", async () => {
            const { owner, hack, target, targetContract, victim } = await loadFixture(deployRecovery)
            const victimBalanceBefore = await owner.provider?.getBalance(victim)
            const recoveredAddress = await hack.recoverRead(target)
            const simpleTokenEthBalanceBefore = await owner.provider?.getBalance(recoveredAddress) as BigNumber

            const targetSimpleToken = await ethers.getContractAt(
                "contracts/Recovery.sol:SimpleToken",
                recoveredAddress,
                owner
            )
            console.log("recovered addy", recoveredAddress)

            const recover = await hack.recover(target)
            const simpleTokenEthBalanceAfter = await owner.provider?.getBalance(recoveredAddress)
            const victimBalanceAfter = await owner.provider?.getBalance(victim)

            console.log("ethbal after", simpleTokenEthBalanceAfter)
            await expect(victimBalanceAfter).to.eq(victimBalanceBefore?.add(simpleTokenEthBalanceBefore))
            await expect(simpleTokenEthBalanceAfter).to.eq(ethers.BigNumber.from("0"))
        })
    })


})