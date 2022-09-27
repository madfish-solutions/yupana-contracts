import { ContractAddress, IRModel } from "../../scripts/types";

export const loadInterestRates = (env = process.env): { [token: string]: IRModel } => {
  return {
    wTEZ: {
      address: (env.WTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "6341958397", // 20%/year
      jumpMultiplierF: "158548959919", // 500%/year
      reserveFactorF: "0",
    },
    cTez: {
      address: (env.CTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "6341958397", // 20%/year
      jumpMultiplierF: "158548959919", // 500%/year
      reserveFactorF: "0",
    },
    kUSD: {
      address: (env.KUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "5707762557", // 18%/year
      jumpMultiplierF: "253678335870", // 800%/year
      reserveFactorF: "0",
    },
    uUSD: {
      address: (env.UUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "5707762557", // 18%/year
      jumpMultiplierF: "253678335870", // 800%/year
      reserveFactorF: "0",
    },
    tzBTC: {
      address: (env.TZBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "4756468798", // 15%/year
      jumpMultiplierF: "63419583968", // 200%/year
      reserveFactorF: "0",
    },
    uBTC: {
      address: (env.UBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "4756468798", // 15%/year
      jumpMultiplierF: "63419583968", // 200%/year
      reserveFactorF: "0",
    },
  }
};

export default loadInterestRates();
