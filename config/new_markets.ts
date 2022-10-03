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
            kinkF: "500000000000000000", // 50%
            baseRateF: "0", // 0%
            multiplierF: "2487494954", 
            jumpMultiplierF: "85597887877", 
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
              "ipfs://QmTxM9EEenCdLKq9Zg3aydiQYmPM4Rujyr7YhrqWEQCofr"
            ).toString("hex"),
          }) as MichelsonMap<string, BytesString>,
          asset: {
            fA2: {
              token_address: (process.env.USDT_TOKEN_ADDRESS || undefined) as ContractAddress,
              token_id: "0",
            },
          },
          collateralFactorF: 600000000000000000,
          threshold: 650000000000000000,
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
            kinkF: "500000000000000000", // 50%
            baseRateF: "0", // 0%
            multiplierF: "4291281054",
            jumpMultiplierF: "83794101777",
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
              "ipfs://QmZ3DCP5RZSRBT2Q8nVc5WHPwS8Qv4TzPraddqoG7bVhBR"
            ).toString("hex"),
          }) as MichelsonMap<string, BytesString>,
          asset: {
            fA12: (process.env.SIRS_TOKEN_ADDRESS || undefined) as ContractAddress,
          },
          collateralFactorF: 600000000000000000,
          threshold: 650000000000000000,
          reserveFactorF: 300000000000000000,
          maxBorrowRate: 5000000000000,
          liquidReserveRateF: 15000000000000000,
        },
      } as TokenInfo
    },
  }
}