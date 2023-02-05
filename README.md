# Ethernaut by Sevenisalie

This is an adventure through the dark forest.

## INSTALLATION
This is a Hardhat project in typescript containing my own hacky solutions to OpenZeppelin's Ethernaut Wargames. This hardhat project makes use of the truffle dashboard so as not to expose private keys anywhere. Before running these scripts, make sure you have an instance of truffle dashboard by running the following command:
```shell
truffle dashboard
```
Once you have truffle running, go ahead and install all the dependencies in the package.json with the following command
```shell
npm install
```
Now you are ready to start pwning some contracts!

## LEVELS
Each level has a script in ethers.js that will solve the objective. You can find these in scripts/levels/**

Running the script will solve the given level. 

## TO RUN A SCRIPT
```shell
npx hardhat run scripts/levels/[levelname].ts --network truffle-dashboard

npx hardhat run scripts/deployments/[contractname].ts --network truffle-dashboard
```

Here are some more helpful hardhat scripts:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
