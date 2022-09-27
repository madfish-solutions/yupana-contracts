import BigNumber from "bignumber.js"
import fs from "fs";
import path from "path";
import { TezosToolkit } from "@taquito/taquito";
import {
  ContractAddress,
} from "../scripts/types";
import { loadConfig } from "../config/index";
const config = loadConfig();

import {migrations} from "../config/pf_migration";

module.exports = async (tezos: TezosToolkit) => {
  let contractAddress: ContractAddress;
  if (process.env.PRICE_FEED_ADDRESS) {
    contractAddress = new ContractAddress(process.env.PRICE_FEED_ADDRESS);
  } else {
    throw new Error("PF must be deployed");
  }
  const priceFeedProxy = await tezos.contract.at(contractAddress.toString());
  for (const id in migrations) {
    const migrationConfig = migrations[id];
    let batch = tezos.contract.batch();
    const oracleData = config.ORACLES.filter(val => val.type === migrationConfig.type)[0]
    const store: any = await priceFeedProxy.storage();
    const bytes = await store.parserBytes.get(migrationConfig.type);
    if (bytes === undefined) {
      const newBytes = fs
      .readFileSync(
        path.resolve(
          process.cwd(),
          `./price_feed/build/bytes/${migrationConfig.type}.hex`
        )
      )
      .toString();
      batch = batch.withContractCall(
        priceFeedProxy.methodsObject
          .addParserBytes({ parserType: migrationConfig.type, initFunction: newBytes })
      )
    }
    const oracleAddress = oracleData.address;
    const parser = await store.oracleParser.get(oracleAddress);
    if (parser) {
      console.log(`[PF] Skipping connection parser for: ${migrationConfig.type}, already exists ${parser}`);
    }
    else {
      const connectOracleParams = {
        oracle: oracleData.address.toString(),
        oraclePrecision: oracleData.precision,
        timestampLimit: oracleData.timestampLimit,
        parserType: oracleData.type,
      };
      batch = batch.withContractCall(
        priceFeedProxy.methodsObject
          .connectOracle(connectOracleParams)
      )
    }
    const migrateOracleParams = {
      tokenId: id,
      assetName: migrationConfig.name,
      decimals: new BigNumber(10).pow(migrationConfig.decimals),
      oracle: oracleAddress.toString(),
    };
    batch = batch.withContractCall(
      priceFeedProxy.methodsObject.updateAsset(migrateOracleParams)
    );
    const op = await batch.send();
    await op.confirmation();
    console.log(`Market ${id} migrated to oracle [${oracleData.type}] ${oracleData.address}`);
  }
}
