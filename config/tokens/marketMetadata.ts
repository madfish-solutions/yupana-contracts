import { MichelsonMap } from "@taquito/taquito";
import { BytesString } from "../../scripts/types";

const marketMetadata: { [token: string]: MichelsonMap<string, BytesString> } = {
  wTEZ: MichelsonMap.fromLiteral({
    symbol: Buffer.from("y-XTZ").toString("hex"),
    name: Buffer.from("Yupana XTZ").toString("hex"),
    decimals: Buffer.from("6").toString("hex"),
    is_transferable: Buffer.from("true").toString("hex"),
    is_boolean_amount: Buffer.from("false").toString("hex"),
    should_prefer_symbol: Buffer.from("false").toString("hex"),
    thumbnailUri: Buffer.from(
      "ipfs://QmZsAdE5tW5ybx9wqScQtBgGCL95S2gcmRbqgDZDfoTfuf"
    ).toString("hex"),
  }) as MichelsonMap<string, BytesString>,
  cTez: MichelsonMap.fromLiteral({
    symbol: Buffer.from("y-cTez").toString("hex"),
    name: Buffer.from("Yupana cTez").toString("hex"),
    decimals: Buffer.from("6").toString("hex"),
    is_transferable: Buffer.from("true").toString("hex"),
    is_boolean_amount: Buffer.from("false").toString("hex"),
    should_prefer_symbol: Buffer.from("false").toString("hex"),
    thumbnailUri: Buffer.from(
      "ipfs://QmdWLKmesxYBJhzFnEZzNRamNnexvPZvkWuKYzUFXnfJxr"
    ).toString("hex"),
  }) as MichelsonMap<string, BytesString>,
  kUSD: MichelsonMap.fromLiteral({
    symbol: Buffer.from("y-kUSD").toString("hex"),
    name: Buffer.from("Yupana kUSD").toString("hex"),
    decimals: Buffer.from("18").toString("hex"),
    is_transferable: Buffer.from("true").toString("hex"),
    is_boolean_amount: Buffer.from("false").toString("hex"),
    should_prefer_symbol: Buffer.from("false").toString("hex"),
    thumbnailUri: Buffer.from(
      "ipfs://QmdRqtqaUzCqnpsxWNy6hujsV2aqrDr1eVD2AJyGjwZbmn"
    ).toString("hex"),
  }) as MichelsonMap<string, BytesString>,
  uUSD: MichelsonMap.fromLiteral({
    symbol: Buffer.from("y-uUSD").toString("hex"),
    name: Buffer.from("Yupana uUSD").toString("hex"),
    decimals: Buffer.from("12").toString("hex"),
    is_transferable: Buffer.from("true").toString("hex"),
    is_boolean_amount: Buffer.from("false").toString("hex"),
    should_prefer_symbol: Buffer.from("false").toString("hex"),
    thumbnailUri: Buffer.from(
      "ipfs://QmVar6imuHapwci1ttJu21yDdbqfwDjHQHLoLuqHPLx3AG"
    ).toString("hex"),
  }) as MichelsonMap<string, BytesString>,
  tzBTC: MichelsonMap.fromLiteral({
    symbol: Buffer.from("y-tzBTC").toString("hex"),
    name: Buffer.from("Yupana tzBTC").toString("hex"),
    decimals: Buffer.from("8").toString("hex"),
    is_transferable: Buffer.from("true").toString("hex"),
    is_boolean_amount: Buffer.from("false").toString("hex"),
    should_prefer_symbol: Buffer.from("false").toString("hex"),
    thumbnailUri: Buffer.from(
      "ipfs://QmVb4kAmpbwS1beqymjsXGerSPXinVjNqbD4cRWhdjcdzb"
    ).toString("hex"),
  }) as MichelsonMap<string, BytesString>,
  uBTC: MichelsonMap.fromLiteral({
    symbol: Buffer.from("y-uBTC").toString("hex"),
    name: Buffer.from("Yupana uBTC").toString("hex"),
    decimals: Buffer.from("12").toString("hex"),
    is_transferable: Buffer.from("true").toString("hex"),
    is_boolean_amount: Buffer.from("false").toString("hex"),
    should_prefer_symbol: Buffer.from("false").toString("hex"),
    thumbnailUri: Buffer.from(
      "ipfs://QmUKZvcriehsUPQSQ8shZtzWnoxSN8eysg1rUZy7ECCrUR"
      ).toString("hex"),
    }) as MichelsonMap<string, BytesString>,
};

export default marketMetadata;
