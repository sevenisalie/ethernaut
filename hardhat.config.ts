import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades'
import * as tdly from "@tenderly/hardhat-tenderly";
import "hardhat-tracer"
import * as dotenv from "dotenv"
dotenv.config()
tdly.setup();
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    'truffle-dashboard': {
      url: "http://localhost:24012/rpc"
    },
    hardhat: {
      forking: {
        enabled: true,
        url: `https://opt-goerli.g.alchemy.com/v2/${process.env.OPTIMISTIC_GOERLI_ID}`,
      }
    }

  },
  tenderly: {
    username: "tenderly", // tenderly username (or organization name)
    project: "project", // project name
    privateVerification: false // if true, contracts will be verified privately, if false, contracts will be verified publicly
  }
};

export default config;
