import { ethers } from "hardhat"
import { LEVEL_ADDRESSES } from "../consts"


async function main() {
    const factory = await ethers.getContractFactory(
        "DelicateBall"
    )
    const contract = await factory.deploy(
        LEVEL_ADDRESSES.delegateCall
    )
    const succ = await contract.deployed()
    if (!succ) {return}
    console.log(`
        DelicateBall deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });