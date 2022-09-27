import { ContractAddress, OracleType, TokenInfo } from "../../scripts/types";
import { loadInterestRates } from "./interestRateConfig";
import marketMetadata from "./marketMetadata";

export const loadTokens = (env = process.env): { [token: string]: TokenInfo } => {
  const interestRates = loadInterestRates(env);
  return {
    wTEZ: {
      oracle: {
        type: OracleType.WTEZ,
        name: "wTez",
        decimals: 6,
      },
      configuration: {
        interestRateModel: interestRates.wTEZ,
        token_metadata: marketMetadata.wTEZ,
        asset: {
          fA2: {
            token_address: (env.WTEZ_TOKEN_ADDRESS || undefined) as ContractAddress,
            token_id: "0",
          },
        },
        collateralFactorF: 500000000000000000,
        threshold: 550000000000000000,
        reserveFactorF: 100000000000000000,
        maxBorrowRate: 5000000000000,
        liquidReserveRateF: 15000000000000000,
      },
    },
    cTez: {
      oracle: {
        type: OracleType.CTEZ,
        name: "cTez",
        decimals: 6,
      },
      configuration: {
        interestRateModel: interestRates.cTez,
        token_metadata: marketMetadata.cTez,
        asset: {
          fA12: (process.env.CTEZ_TOKEN_ADDRESS || undefined) as ContractAddress,
        },
        collateralFactorF: 500000000000000000,
        threshold: 550000000000000000,
        reserveFactorF: 300000000000000000,
        maxBorrowRate: 5000000000000,
        liquidReserveRateF: 15000000000000000,
      },
    },
    kUSD: {
      oracle: {
        type: OracleType.HARBINGER,
        name: "XTZ-USD",
        decimals: 18,
      },
      configuration: {
        interestRateModel: interestRates.kUSD,
        token_metadata: marketMetadata.kUSD,
        asset: {
          fA12: (process.env.KUSD_TOKEN_ADDRESS || undefined) as ContractAddress,
        },
        collateralFactorF: 550000000000000000,
        threshold: 600000000000000000,
        reserveFactorF: 300000000000000000,
        maxBorrowRate: 5000000000000,
        liquidReserveRateF: 15000000000000000,
      },
    },
    uUSD: {
      oracle: {
        type: OracleType.UBINETIC_LEGACY,
        name: "XTZ",
        decimals: 12,
      },
      // oracle: {
      //   type: OracleType.UBINETIC,
      //   name: "XTZUSD",
      //   decimals: 12,
      // },
      configuration: {
        interestRateModel: interestRates.uUSD,
        token_metadata: marketMetadata.uUSD,
        asset: {
          fA2: {
            token_address: (process.env.YOUVES_TOKEN_ADDRESS || undefined) as ContractAddress,
            token_id: "0",
          },
        },
        collateralFactorF: 0,
        threshold: 0,
        reserveFactorF: 300000000000000000,
        maxBorrowRate: 5000000000000,
        liquidReserveRateF: 15000000000000000,
      },
    },

    tzBTC: {
      oracle: {
        type: OracleType.HARBINGER,
        name: "BTC-USD",
        decimals: 8,
      },
      configuration: {
        interestRateModel: interestRates.tzBTC,
        token_metadata: marketMetadata.tzBTC,
        asset: {
          fA12: (process.env.TZBTC_TOKEN_ADDRESS || undefined) as ContractAddress,
        },
        collateralFactorF: 500000000000000000,
        threshold: 550000000000000000,
        reserveFactorF: 300000000000000000,
        maxBorrowRate: 5000000000000,
        liquidReserveRateF: 15000000000000000,
      },
    },
    uBTC: {
      oracle: {
        type: OracleType.UBINETIC_LEGACY,
        name: "BTC",
        decimals: 12,
      },
      // oracle: {
      //   type: OracleType.UBINETIC,
      //   name: "BTCUSD",
      //   decimals: 12,
      // },
      configuration: {
        interestRateModel: interestRates.uBTC,
        token_metadata: marketMetadata.uBTC,
        asset: {
          fA2: {
            token_address: (process.env.YOUVES_TOKEN_ADDRESS || undefined) as ContractAddress,
            token_id: "2",
          },
        },
        collateralFactorF: 0,
        threshold: 0,
        reserveFactorF: 300000000000000000,
        maxBorrowRate: 5000000000000,
        liquidReserveRateF: 15000000000000000,
      },
    },
  }
};
export default loadTokens();