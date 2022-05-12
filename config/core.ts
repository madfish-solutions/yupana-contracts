import { ContractAddress, YupanaConfiguration } from "../scripts/types";
import { loadTokens } from "./tokens";

export const loadCoreConfiguration = (env = process.env): YupanaConfiguration => {
  return {
    address: (env.YUPANA_ADDRESS || undefined) as ContractAddress,
    closeFactorF: "500000000000000000",
    liqIncentiveF: "1100000000000000000",
    priceFeedProxy: (env.PRICE_FEED_ADDRESS || undefined) as ContractAddress,
    maxMarkets: Object.keys(loadTokens(env)).length,
  }
}

export default loadCoreConfiguration();