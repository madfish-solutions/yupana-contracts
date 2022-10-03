import { BytesString, ContractAddress, IRModel, OracleType, TokenInfo } from "../scripts/types";
import { MichelsonMap } from "@taquito/taquito";

export const loadMarketUpdates = (env = process.env) => {
  return {
    0: {
      interestRateModel: (env.WTEZ_IR_ADDRESS || undefined),
      collateralFactorF: 700000000000000000,
      threshold: 750000000000000000,
      reserveFactorF: 100000000000000000,
      maxBorrowRate: 5000000000000,
      liquidReserveRateF: 15000000000000000,
    },
    1: {
      interestRateModel: (env.CTEZ_IR_ADDRESS || undefined),
      collateralFactorF: 700000000000000000,
      threshold: 750000000000000000,
      reserveFactorF: 300000000000000000,
      maxBorrowRate: 5000000000000,
      liquidReserveRateF: 15000000000000000,
    },
    2: {
      interestRateModel: (env.KUSD_IR_ADDRESS || undefined),
      collateralFactorF: 700000000000000000,
      threshold: 750000000000000000,
      reserveFactorF: 300000000000000000,
      maxBorrowRate: 5000000000000,
      liquidReserveRateF: 15000000000000000,
    },
    3: {
          interestRateModel: (env.UUSD_IR_ADDRESS || undefined),
          collateralFactorF: 600000000000000000,
          threshold: 650000000000000000,
          reserveFactorF: 300000000000000000,
          maxBorrowRate: 5000000000000,
          liquidReserveRateF: 15000000000000000,
    },
    4: {
      interestRateModel: (env.TZBTC_IR_ADDRESS || undefined),
      collateralFactorF: 700000000000000000,
      threshold: 750000000000000000,
      reserveFactorF: 300000000000000000,
      maxBorrowRate: 5000000000000,
      liquidReserveRateF: 15000000000000000,
    },
    5: {
          interestRateModel: (env.UBTC_IR_ADDRESS || undefined),
          collateralFactorF: 600000000000000000,
          threshold: 650000000000000000,
          reserveFactorF: 300000000000000000,
          maxBorrowRate: 5000000000000,
          liquidReserveRateF: 15000000000000000,
    },
  }
}