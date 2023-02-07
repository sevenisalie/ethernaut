import { ethers } from "hardhat"
import { LEVEL_ADDRESSES } from "../consts"


async function main() {
    const factory = await ethers.getContractFactory(
        "Phorce"
    )
    const contract = await factory.deploy(
        LEVEL_ADDRESSES.force
    )
    const succ = await contract.deployed()
    if (!succ) {return}
    console.log(`
        Phorce deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });