import { OracleType } from "../scripts/types";
import { BytesString, ContractAddress, IRModel, TokenInfo } from "../scripts/types";

export const loadIRMigrations = (env = process.env) => {
  return {
    0: {
      address: (env.WTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "500000000000000000", // 50%
      baseRateF: "0", // 0%
      multiplierF: "1874682848", // 5,91%/year
      jumpMultiplierF: "86210699984", // 271,87%/year
      reserveFactorF: "0",
    },
    1: {
      address: (env.CTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "400000000000000000", // 40%
      baseRateF: "0", // 0%
      multiplierF: "2343353561", // 7,39%/year
      jumpMultiplierF: "71842249986", // 226,56%/year
      reserveFactorF: "0",
    },
    2: {
      address: (env.KUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "1994072063", // 6,29%/year
      jumpMultiplierF: "111644656250", // 352,08%/year
      reserveFactorF: "0",
    },
    3: {
      address: (env.UUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "700000000000000000", // 70%
      baseRateF: "0", // 0%
      multiplierF: "5134552838", // 16,19%/year
      jumpMultiplierF: "84992340563", // 268,03%/year
      reserveFactorF: "0",
    },
    4: {
      address: (env.TZBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000", // 80%
      baseRateF: "0", // 0%
      multiplierF: "2309803059", // 7,28%/year
      jumpMultiplierF: "165207024361", // 521,00%/year
      reserveFactorF: "0",
    },
    5: {
      address: (env.UBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "6926041328", // 21,84%/year
      jumpMultiplierF: "62340660897", // 196,60%/year
      reserveFactorF: "0",
    },
    6: {
      address: (env.USDT_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "800000000000000000", // 80%
      baseRateF: "0", // 0%
      multiplierF: "2682050659", // 8,46%/year
      jumpMultiplierF: "209485254443", // 660,63%/year
      reserveFactorF: "0",
    },
    7: {
      address: (env.SIRS_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "400000000000000000", // 40%
      baseRateF: "0", // 0%
      multiplierF: "5364101319", // 16,92%/year
      jumpMultiplierF: "69828418148", // 220,21%/year
      reserveFactorF: "0",
    }
  }
}