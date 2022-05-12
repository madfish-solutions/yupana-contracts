import { ContractAddress, IRModel } from "../../scripts/types";

export const loadInterestRates = (env = process.env): { [token: string]: IRModel } => {
  return {
    wTEZ: {
      address: (env.WTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
    kUSD: {
      address: (env.KUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
    cTez: {
      address: (env.CTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
    tzBTC: {
      address: (env.TZBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
    uDEFI: {
      address: (env.UDEFI_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
    uUSD: {
      address: (env.UUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
    uBTC: {
      address: (env.UBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000",
      baseRateF: "634195839",
      multiplierF: "7134703196",
      jumpMultiplierF: "31709791983",
      reserveFactorF: "0",
    },
  }
};

export default loadInterestRates();
