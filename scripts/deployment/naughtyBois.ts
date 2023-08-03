import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER } from "../consts"
import { BigNumber } from "ethers"


async function main() {
    const factory = await ethers.getContractFactory(
        "NaughtyBois"
    )
    const contract = await factory.deploy(

    )
    const succ = await contract.deployed()
    if (!succ) { return }
    console.log(`
    NaughtyBois deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});