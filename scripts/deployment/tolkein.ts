import { ethers } from "hardhat"



async function main() {
    const factory = await ethers.getContractFactory(
        "Tolkein"
    )
    const contract = await factory.deploy()
    const succ = await contract.deployed()
    if (!succ) {return}
    console.log(`
        Tolkein deployed successfully
        address: ${contract.address}
    `)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });