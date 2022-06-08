import { ContractAddress, IRModel } from "../../scripts/types";

export const loadInterestRates = (env = process.env): { [token: string]: IRModel } => {
  return {
    wTEZ: {
      address: (env.WTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "450000000000000000", // 45%
      baseRateF: "0", // 0%
      multiplierF: "2219685438", // 7%/year
      jumpMultiplierF: "95129375951", // 300%/year
      reserveFactorF: "0",
    },
    cTez: {
      address: (env.CTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "450000000000000000", // 45%
      baseRateF: "0", // 0%
      multiplierF: "2219685438", // 7%/year
      jumpMultiplierF: "95129375951", // 300%/year
      reserveFactorF: "0",
    },
    kUSD: {
      address: (env.KUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "1268391679", // 4%/year
      jumpMultiplierF: "31709791983", // 100%/year
      reserveFactorF: "0",
    },
    uUSD: {
      address: (env.UUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "1268391679", // 4%/year
      jumpMultiplierF: "47564687975", // 150%/year
      reserveFactorF: "0",
    },
    tzBTC: {
      address: (env.TZBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "650000000000000000", // 65%
      baseRateF: "0", // 0%
      multiplierF: "2536783358", // 8%/year
      jumpMultiplierF: "31709791983", // 100%/year
      reserveFactorF: "0",
    },
    uBTC: {
      address: (env.UBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "650000000000000000", // 65%
      baseRateF: "0", // 0%
      multiplierF: "2536783358", // 8%/year
      jumpMultiplierF: "31709791983", // 100%/year
      reserveFactorF: "0",
    },
    // uDEFI: {
    //   address: (env.UDEFI_IR_ADDRESS || undefined) as ContractAddress,
    //   kinkF: "650000000000000000", // 65%
    //   baseRateF: "0", // 0%
    //   multiplierF: "2219685438", // 7%/year
    //   jumpMultiplierF: "31709791983", // 100%/year
    //   reserveFactorF: "0",
    // },
  }
};

export default loadInterestRates();
