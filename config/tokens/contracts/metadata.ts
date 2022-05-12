import { MichelsonMap } from "@taquito/taquito";
import { BytesString } from "../../../scripts/types";
import BigNumber from "bignumber.js";

const contractTokenMetadata: {
  [contract: string]: {
    type: "fa12" | "fa2"
    storage: {
      metadata: MichelsonMap<string, BytesString>;
      token_metadata: MichelsonMap<BigNumber.Value, BytesString>;
    }
  };
} = {
  kUSD: {
    type: "fa12",
    storage: {
      metadata: MichelsonMap.fromLiteral({
        "": Buffer.from("tezos-storage:metadata", "ascii").toString("hex"),
        metadata: Buffer.from(
          JSON.stringify({
            name: "kUSD",
            version: "v1.0.0",
            description: "kUSD test token.",
          }),
          "ascii"
        ).toString("hex"),
      }) as MichelsonMap<string, BytesString>,
      token_metadata: MichelsonMap.fromLiteral({
        0: {
          token_id: "0",
          token_info: MichelsonMap.fromLiteral({
            symbol: Buffer.from("kUSD").toString("hex"),
            name: Buffer.from("Kolibri USD").toString("hex"),
            decimals: Buffer.from("18").toString("hex"),
            is_transferable: Buffer.from("true").toString("hex"),
            is_boolean_amount: Buffer.from("false").toString("hex"),
            should_prefer_symbol: Buffer.from("false").toString("hex"),
            thumbnailUri: Buffer.from(
              "https://kolibri-data.s3.amazonaws.com/logo.png"
            ).toString("hex"),
          }),
        },
      }) as MichelsonMap<BigNumber.Value, BytesString>,
    }
  },
  cTez: {
    type: "fa12",
    storage: {
      metadata: MichelsonMap.fromLiteral({
        "": Buffer.from("tezos-storage:metadata", "ascii").toString("hex"),
        metadata: Buffer.from(
          JSON.stringify({
            name: "cTez",
            version: "v1.0.0",
            description: "cTez test token.",
          }),
          "ascii"
        ).toString("hex"),
      }) as MichelsonMap<string, BytesString>,
      token_metadata: MichelsonMap.fromLiteral({
        0: {
          token_id: "0",
          token_info: MichelsonMap.fromLiteral({
            symbol: Buffer.from("cTez").toString("hex"),
            name: Buffer.from("cTEZ token").toString("hex"),
            decimals: Buffer.from("6").toString("hex"),
            is_transferable: Buffer.from("true").toString("hex"),
            is_boolean_amount: Buffer.from("false").toString("hex"),
            should_prefer_symbol: Buffer.from("false").toString("hex"),
            thumbnailUri: Buffer.from(
              "ipfs://Qme4ybadbY4H84h5WLPjdo47YQUxxVoJHWZrwYq2JZriM4"
            ).toString("hex"),
          }),
        },
      }) as MichelsonMap<BigNumber.Value, BytesString>,
    }
  },
  tzBTC: {
    type: "fa12",
    storage: {
      metadata: MichelsonMap.fromLiteral({
        "": Buffer.from("tezos-storage:metadata", "ascii").toString("hex"),
        metadata: Buffer.from(
          JSON.stringify({
            name: "tzBTC",
            version: "v1.0.0",
            description: "tzBTC test token.",
          }),
          "ascii"
        ).toString("hex"),
      }) as MichelsonMap<string, BytesString>,
      token_metadata: MichelsonMap.fromLiteral({
        0: {
          token_id: "0",
          token_info: MichelsonMap.fromLiteral({
            symbol: Buffer.from("tzBTC").toString("hex"),
            name: Buffer.from("tzBTC").toString("hex"),
            decimals: Buffer.from("8").toString("hex"),
            is_transferable: Buffer.from("true").toString("hex"),
            is_boolean_amount: Buffer.from("false").toString("hex"),
            should_prefer_symbol: Buffer.from("false").toString("hex"),
            thumbnailUri: Buffer.from(
              "https://tzbtc.io/wp-content/uploads/2020/03/tzbtc_logo_single.svg"
            ).toString("hex"),
          }),
        },
      }) as MichelsonMap<BigNumber.Value, BytesString>,
    }
  },
  youves: {
    type: "fa2",
    storage: {
      metadata: MichelsonMap.fromLiteral({
        "": Buffer.from("tezos-storage:metadata", "ascii").toString("hex"),
        metadata: Buffer.from(
          JSON.stringify({
            name: "youves tokens",
            version: "v1.0.0",
            description: "youves test tokens.",
          }),
          "ascii"
        ).toString("hex"),
      }) as MichelsonMap<string, BytesString>,
      token_metadata: MichelsonMap.fromLiteral({
        0: {
          token_id: "0",
          token_info: MichelsonMap.fromLiteral({
            "": Buffer.from("ipfs://QmSaEnhQXXKw4EmkLztnsjpryQFNWZvAffRpHHycSCoUpU").toString("hex"),
          }),
        },
        1: {
          token_id: "1",
          token_info: MichelsonMap.fromLiteral({
            "": Buffer.from("ipfs://QmRms7voEr8HMsDLK4Q5m5JhqqMnEWe9NVyhGTQ6Rmci4h").toString("hex"),
          }),
        },
        2: {
          token_id: "2",
          token_info: MichelsonMap.fromLiteral({
            "": Buffer.from("ipfs://QmZ1KYWo7GZAFEyitV58uZi9kXJY3ivHpBse8JweSm7qHt").toString("hex"),
          }),
        },
      }) as MichelsonMap<BigNumber.Value, BytesString>,
    }
  }
};

export default contractTokenMetadata;