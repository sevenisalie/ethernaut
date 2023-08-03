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

function byteMan() {
    const byteString = "0x829cb0c80660493f5f6a2a839e320fb63528fab2494f3dfa8913e72a4570ab9f"
    const arr = byteString.split("")
    console.log("LENGTH")
    console.log(arr.length)
    console.log("Is Bytes?")
    console.log(ethers.utils.isBytes(byteString))
    console.log("Is BytesLike?")
    console.log(ethers.utils.isBytesLike(byteString))
    console.log("Is HexString?")
    console.log(ethers.utils.isHexString(byteString))
}

byteMan()