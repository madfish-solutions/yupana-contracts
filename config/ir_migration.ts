import { OracleType } from "../scripts/types";
import { BytesString, ContractAddress, IRModel, TokenInfo } from "../scripts/types";

export const loadIRMigrations = (env = process.env) => {
  return {
    0: {
      address: (env.WTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "1562235707", // 4,93%/year
      jumpMultiplierF: "107763374979", // 339,84%/year
      reserveFactorF: "0",
    },
    1: {
      address: (env.CTEZ_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "1562235707", // 4,93%/year
      jumpMultiplierF: "70386369328", // 221,97%/year
      reserveFactorF: "0",
    },
    2: {
      address: (env.KUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "1562235707", // 4,93%/year
      jumpMultiplierF: "70386369328", // 221,97%/year
      reserveFactorF: "0",
    },
    3: {
      address: (env.UUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "500000000000000000", // 50%
      baseRateF: "0", // 0%
      multiplierF: "6045321205", // 19,06%/year
      jumpMultiplierF: "52138457105", // 164,42%/year
      reserveFactorF: "0",
    },
    4: {
      address: (env.TZBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "2829818513", // 8,92%/year
      jumpMultiplierF: "68484995118", // 215,97%/year
      reserveFactorF: "0",
    },
    5: {
      address: (env.UBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "500000000000000000", // 50%
      baseRateF: "0", // 0%
      multiplierF: "8311249593", // 26,21%/year
      jumpMultiplierF: "49872528717", // 157,28%/year
      reserveFactorF: "0",
    }
  }
}