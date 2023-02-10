import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER } from "../consts"


async function main() {
    const factory = await ethers.getContractFactory(
        "PeeElephant"
    )
    const contract = await factory.deploy(
        LEVEL_ADDRESSES.reentrancy,
        PLAYER,
        {
            value: ethers.utils.parseUnits("0.001", 18)
        }
    )
    const succ = await contract.deployed()
    if (!succ) { return }
    console.log(`
    PeeElephant deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});