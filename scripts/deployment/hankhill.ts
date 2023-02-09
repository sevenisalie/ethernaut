import { ethers } from "hardhat"
import { LEVEL_ADDRESSES,PLAYER } from "../consts"


async function main() {
    const factory = await ethers.getContractFactory(
        "HankHill"
    )
    const contract = await factory.deploy(
        LEVEL_ADDRESSES.king,
        PLAYER
    )
    const succ = await contract.deployed()
    if (!succ) {return}
    console.log(`
    HankHill deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });