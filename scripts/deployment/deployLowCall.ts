import { ethers } from "hardhat"

async function main () {
    //factory
    //instance
    //success

    const LowCallFactory = await ethers.getContractFactory("LowCall")
    const LowCallInstance = await LowCallFactory.deploy()
    const succ = await LowCallInstance.deployed()
    if (!succ) {return}
    console.log(`
        LowCall deployed successfully
        address: ${LowCallInstance}
    `)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });