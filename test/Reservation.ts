import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ADDRESSES, LEVEL_ADDRESSES } from "../scripts/consts";
import { randomBytes } from "crypto";
import { assert } from "console";
import { recoverAddress } from "ethers/lib/utils";

describe("Reservation", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployReservation() {
        const target = LEVEL_ADDRESSES.reservation
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const factory = await ethers.getContractFactory(
            "contracts/Rezervation.sol:Pwn",
            owner
        )
        const hack = await factory.deploy()
        const targetContract = await ethers.getContractAt(
            "contracts/Rezervation.sol:Preservation",
            target,
            owner
        )
        return { hack, target, targetContract, owner, otherAccount };
    }

    describe("Pwn", () => {
        it("owner should be me", async () => {
            const { owner, hack, target, targetContract } = await loadFixture(deployReservation)
            const recoveredAddress = await hack.recoverRead(target)
            const targetSimpleToken = await ethers.getContractAt(
                "contracts/Rezervation.sol:SimpleToken",
                recoveredAddress,
                owner
            )
            const recover = await hack.recover(target)
            const simpleTokenEthBalance = await owner.provider?.getBalance(recoveredAddress)
            console.log(recoverAddress)
            console.log(simpleTokenEthBalance)
            await expect(simpleTokenEthBalance).to.eq("0.0")

        })
    })


})