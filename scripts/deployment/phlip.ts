import { ethers } from "hardhat"

async function main () {
    //factory
    //instance
    //success

    const PhlipFactory = await ethers.getContractFactory("Phlip")
    const PhlipInstance = await PhlipFactory.deploy()
    const succ = await PhlipInstance.deployed()
    if (!succ) {return}
    console.log(`
        LowCall deployed successfully
        address: ${PhlipInstance.address}
    `)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });