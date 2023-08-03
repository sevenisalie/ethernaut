import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ADDRESSES, LEVEL_ADDRESSES } from "../scripts/consts";
import { randomBytes } from "crypto";

describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployFateKeeper() {
        const target = LEVEL_ADDRESSES.gatekeeper

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const Gatekeeper = await ethers.getContractFactory("GatekeeperOne");
        const Fatekeeper = await ethers.getContractFactory("Fatekeeper");
        const gatekeeper = await Gatekeeper.deploy();
        const fatekeeper = await Fatekeeper.deploy(gatekeeper.address)

        return { gatekeeper, fatekeeper, target, owner, otherAccount };
    }

    describe("Gates", () => {
        it("should set clear first gate", async () => {
            const { gatekeeper } = await loadFixture(deployFateKeeper)
            await expect(gatekeeper.enter(randomBytes(8))).to.be.reverted
        })
    })

    describe("Gas Estimation", function () {
        it("Should not revert if gasleft 8191 ", async function () {
            const { target, gatekeeper } = await loadFixture(deployFateKeeper)

            let gasAmount = 0
            for (let i = 0; i < 8191; i++) {
                console.log(i)
                gatekeeper.gateTwo()
                try { gatekeeper.gateTwo({ gas: ethers.utils.parseUnits("100000", 9) }) } catch (err) { gasAmount++ }
            }
            console.log(gasAmount)
            await expect(gatekeeper.gateTwo()).to.be.reverted
        })
    })
})