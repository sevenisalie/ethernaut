import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER } from "../consts"
import { BigNumber } from "ethers"


async function main() {
    const target = LEVEL_ADDRESSES.dex
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Hack = await ethers.getContractFactory(
        "contracts/Dex.sol:PokeDex",
        owner
    )
    const contract = await Hack.deploy(target)
    const succ = await contract.deployed()
    if (!succ) { return }
    console.log(`
    PokeDex deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});