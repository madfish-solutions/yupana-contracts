import BigNumber from "bignumber.js"
import fs from "fs";
import path from "path";
import {
  ContractAddress,
  TokenInfo,
} from "../scripts/types";
import {
  TezosToolkit,
  MichelsonMap
} from "@taquito/taquito";
import {
  migrate,
  writeToContractsEnvironment
} from "../scripts/utils";
import {
  loadConfig
} from "../config/index";
import {
  loadMarketMigrations
} from "../config/new_markets";
import {
  michelson as IRcode
} from "../yupana/build/interestRate.json";
import IRstorage from "../yupana/storage/interestRate";

const config = loadConfig();
const admin = config.ADMIN
const newMarkets = loadMarketMigrations();

module.exports = async (tezos: TezosToolkit) => {
  const priceFeedProxy = await tezos.contract.at(
    config.YUPANA.priceFeedProxy.toString()
  );
  for (const [marketName, data] of Object.entries(newMarkets)) {
    const marketConfig: TokenInfo = data.market;
    let batch = tezos.contract.batch();
    console.log("Checking PF for market " + marketName);
    const oracleData = config.ORACLES.filter(val => val.type === marketConfig.oracle.type)[0]
    const store: any = await priceFeedProxy.storage();
    const bytes = await store.parserBytes.get(marketConfig.oracle.type);
    if (bytes === undefined) {
      const newBytes = fs
        .readFileSync(
          path.resolve(
            process.cwd(),
            `./price_feed/build/bytes/${marketConfig.oracle.type}.hex`
          )
        )
        .toString();
      batch = batch.withContractCall(
        priceFeedProxy.methodsObject
          .addParserType({ parserType: marketConfig.oracle.type, initFunction: newBytes })
      )
    }
    const oracleAddress = oracleData.address;
    const parser = await store.oracleParser.get(oracleAddress);
    if (parser) {
      console.log(`[PF] Skipping connection parser for: ${marketConfig.oracle.type}, already exists ${parser}`);
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
      console.log(`PF connectOracle batched for market [${data.id}] ${marketName}`);
    }
    const oracleParams = {
      tokenId: data.id,
      assetName: marketConfig.oracle.name,
      decimals: new BigNumber(10).pow(marketConfig.oracle.decimals),
      oracle: oracleAddress.toString(),
    };
    batch = batch.withContractCall(
      priceFeedProxy.methodsObject.updateAsset(oracleParams)
    );
    console.log(`PF updateAsset batched for market [${data.id}] ${marketName}`);
    const op = await batch.send();
    await op.confirmation();
    console.log(`PF batch update sent for market [${data.id}] ${marketName}`);
    let irAddress: ContractAddress;
    if (marketConfig.configuration.interestRateModel.address)
      irAddress = new ContractAddress(marketConfig.configuration.interestRateModel.address);
    else {
      const interestRateStorage = {
        ...IRstorage,
        metadata: MichelsonMap.fromLiteral({
          "": Buffer.from(
            "ipfs://QmPwLqJDvUev8fi34ey9mvHbubCuqaZE9ZireVL8B8raRV",
            "ascii"
          ).toString("hex")
        }),
        admin,
        ...marketConfig.configuration.interestRateModel,
      };
      irAddress = new ContractAddress(
        await migrate(tezos, IRcode, interestRateStorage)
      );
      console.log(`IR migration done for market [${data.id}] ${marketName} - ${irAddress}`);
      writeToContractsEnvironment(`${marketName.toUpperCase()}_IR_ADDRESS`, irAddress);
    }
  }
}
