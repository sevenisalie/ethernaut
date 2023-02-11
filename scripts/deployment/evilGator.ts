import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER } from "../consts"
import { BigNumber } from "ethers"


async function main() {
    const factory = await ethers.getContractFactory(
        "EvilGator"
    )
    const contract = await factory.deploy(
        LEVEL_ADDRESSES.elevator,
        {
            gasLimit: 1000000
        }
    )
    const succ = await contract.deployed()
    if (!succ) { return }
    console.log(`
    EvilGator deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});