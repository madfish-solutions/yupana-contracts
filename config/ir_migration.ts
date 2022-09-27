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
      jumpMultiplierF: "107763374979", // 339,84%/year
      reserveFactorF: "0",
    },
    2: {
      address: (env.KUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "1562235707", // 4,93%/year
      jumpMultiplierF: "107763374979", // 339,84%/year
      reserveFactorF: "0",
    },
    3: {
      address: (env.UUSD_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "500000000000000000", // 50%
      baseRateF: "0", // 0%
      multiplierF: "6045321205", // 19,06%/year
      jumpMultiplierF: "82040061626", // 258,72%/year
      reserveFactorF: "0",
    },
    4: {
      address: (env.TZBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "600000000000000000", // 60%
      baseRateF: "0", // 0%
      multiplierF: "2829818513", // 8,92%/year
      jumpMultiplierF: "105862000769", // 333,85%/year
      reserveFactorF: "0",
    },
    5: {
      address: (env.UBTC_IR_ADDRESS || undefined) as ContractAddress,
      kinkF: "500000000000000000", // 50%
      baseRateF: "0", // 0%
      multiplierF: "8311249593", // 26,21%/year
      jumpMultiplierF: "79774133238", // 251,58%/year
      reserveFactorF: "0",
    }
  }
}