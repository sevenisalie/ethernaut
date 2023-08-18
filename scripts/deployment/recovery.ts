import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER } from "../consts"
import { BigNumber } from "ethers"


async function main() {
    const target = LEVEL_ADDRESSES.recovery
    const victim = LEVEL_ADDRESSES.recoveryVictim
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Hack = await ethers.getContractFactory(
        "contracts/Recovery.sol:Rescuer",
        owner
    )
    const contract = await Hack.deploy(victim)
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