import { BytesString, ContractAddress, IRModel, OracleType, TokenInfo } from "../scripts/types";
import { MichelsonMap } from "@taquito/taquito";

export const loadMarketMigrations = (env = process.env) => {
  return {
    USDT: {
      id: 6,
      market: {
        oracle: {
          type: OracleType.UBINETIC,
          name: "USDTUSD",
          decimals: 6,
        },
        configuration: {
          interestRateModel: {
            address: (env.USDT_IR_ADDRESS || undefined) as ContractAddress,
            kinkF: "650000000000000000", // 65%
            baseRateF: "0", // 0%
            multiplierF: "2219685438", // 7%/year
            jumpMultiplierF: "31709791983", // 100%/year
            reserveFactorF: "0",
          } as IRModel,
          token_metadata: MichelsonMap.fromLiteral({
            symbol: Buffer.from("y-USDT").toString("hex"),
            name: Buffer.from("Yupana USDT").toString("hex"),
            decimals: Buffer.from("6").toString("hex"),
            is_transferable: Buffer.from("true").toString("hex"),
            is_boolean_amount: Buffer.from("false").toString("hex"),
            should_prefer_symbol: Buffer.from("false").toString("hex"),
            thumbnailUri: Buffer.from(
              ""
            ).toString("hex"),
          }) as MichelsonMap<string, BytesString>,
          asset: {
            fA2: {
              token_address: (process.env.USDT_TOKEN_ADDRESS || undefined) as ContractAddress,
              token_id: "0",
            },
          },
          collateralFactorF: 0,
          threshold: 0,
          reserveFactorF: 300000000000000000,
          maxBorrowRate: 5000000000000,
          liquidReserveRateF: 15000000000000000,
        },
      } as TokenInfo,
    },
    SIRS: {
      id: 7,
      market: {
        oracle: {
          type: OracleType.SIRS_LP,
          name: "SIRS",
          decimals: 0,
        },
        configuration: {
          interestRateModel: {
            address: (env.SIRS_IR_ADDRESS || undefined) as ContractAddress,
            kinkF: "650000000000000000", // 65%
            baseRateF: "0", // 0%
            multiplierF: "2219685438", // 7%/year
            jumpMultiplierF: "31709791983", // 100%/year
            reserveFactorF: "0",
          } as IRModel,
          token_metadata: MichelsonMap.fromLiteral({
            symbol: Buffer.from("y-SIRS").toString("hex"),
            name: Buffer.from("Yupana SIRS").toString("hex"),
            decimals: Buffer.from("0").toString("hex"),
            is_transferable: Buffer.from("true").toString("hex"),
            is_boolean_amount: Buffer.from("false").toString("hex"),
            should_prefer_symbol: Buffer.from("false").toString("hex"),
            thumbnailUri: Buffer.from(
              ""
            ).toString("hex"),
          }) as MichelsonMap<string, BytesString>,
          asset: {
            fA2: {
              token_address: (process.env.SIRS_TOKEN_ADDRESS || undefined) as ContractAddress,
              token_id: "0",
            },
          },
          collateralFactorF: 0,
          threshold: 0,
          reserveFactorF: 300000000000000000,
          maxBorrowRate: 5000000000000,
          liquidReserveRateF: 15000000000000000,
        },
      } as TokenInfo
    },
  }
}