import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades'
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    'truffle-dashboard': {
      url: "http://localhost:24012/rpc"
    }
  }
};

export default config;
