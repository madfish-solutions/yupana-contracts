import fs from "fs";
import path from "path";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import {
  BytesString,
  ContractAddress,
  OracleInfo,
} from "../scripts/types";
import { migrate, writeToContractsEnvironment } from "../scripts/utils";
import { michelson as code } from "../price_feed/build/router.json";
import storage from "../price_feed/storage/router";
import { loadConfig } from "../config";
const config = loadConfig();

module.exports = async (tezos: TezosToolkit) => {
  let contractAddress: ContractAddress;
  if (process.env.PRICE_FEED_ADDRESS) {
    contractAddress = new ContractAddress(process.env.PRICE_FEED_ADDRESS);
  } else {
    if (config.YUPANA.address === undefined)
      throw new Error("Yupana must be deployed");
    const parserBytes = config.ORACLES.reduce(
      (acc: { [key: string]: BytesString }, info: OracleInfo) => {
        if (info.address) {
          acc[info.name] = fs
            .readFileSync(
              path.resolve(
                process.cwd(),
                `./price_feed/build/bytes/${info.type}.hex`
              )
            )
            .toString();
        }
        return acc;
      },
      {}
    );
    storage.admin = await tezos.signer.publicKeyHash();
    storage.yToken = config.YUPANA.address.toString();
    storage.parserBytes = MichelsonMap.fromLiteral(parserBytes) as MichelsonMap<
      string,
      string
      >;
    storage.metadata = MichelsonMap.fromLiteral({
      "": Buffer.from("ipfs://QmSuUM9Y3aqyWNC8okigJZ78sJHsWnqBnQ8b6US5Fxqq2v", "ascii").toString("hex")
    })
    contractAddress = new ContractAddress(await migrate(tezos, code, storage));
    const priceFeedProxy = await tezos.contract.at(contractAddress.toString());
    for (const oracle of config.ORACLES) {
      if (oracle.address === undefined) {
        console.log(`[PF] Skipping connection parser for: ${oracle.type}, address not defined`);
        continue;
      }
      const connectOracleParams = {
        oracle: oracle.address.toString(),
        oraclePrecision: oracle.precision,
        timestampLimit: oracle.timestampLimit,
        parserType: oracle.type,
      };
      await (
        await priceFeedProxy.methodsObject
          .connectOracle(connectOracleParams)
          .send()
      ).confirmation();
      console.log(`[PF] Connected parser for: ${oracle.type}, ${oracle.address.toString()}`);
    }
  }
  console.log(`Price Feed: ${contractAddress}`);
  writeToContractsEnvironment("PRICE_FEED_ADDRESS", contractAddress);
};
