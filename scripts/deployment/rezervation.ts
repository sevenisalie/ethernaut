import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER } from "../consts"
import { BigNumber } from "ethers"


async function main() {
    const factory = await ethers.getContractFactory(
        "contracts/Rezervation.sol:Pwn"
    )
    const contract = await factory.deploy()
    const succ = await contract.deployed()
    if (!succ) { return }
    console.log(`
    Rezervation deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});