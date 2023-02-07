import { ethers } from "hardhat"

export const getSigner = async () => {
    try {
        const signer = (await ethers.getSigners())[0]
        return signer
    } catch (e) {
        return undefined
    }
}