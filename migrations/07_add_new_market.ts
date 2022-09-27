import BigNumber from "bignumber.js"
import fs from "fs";
import path from "path";
import {
  ContractAddress,
  FA2TokenType,
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
  if (config.YUPANA.address === undefined)
  throw new Error("Yupana must be deployed");
const contract = await tezos.contract.at(config.YUPANA.address.toString());
const priceFeedProxy = await tezos.contract.at(
  config.YUPANA.priceFeedProxy.toString()
);
  for (const [marketName, data] of Object.entries(newMarkets)) {
    const marketConfig: TokenInfo = data.market;
    let batch = tezos.contract.batch();
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
      writeToContractsEnvironment(`${marketName.toUpperCase()}_IR_ADDRESS`, irAddress);
    }
    const isFa2Token = (
      marketConfig.configuration.asset as unknown as FA2TokenType
    ).fA2;
    const assetParam =
      isFa2Token === undefined
        ? marketConfig.configuration.asset
        : {
          fA2: {
            // weird schema params... details `contract.methods.addMarket().schema`
            2: isFa2Token.token_address,
            3: isFa2Token.token_id,
          },
        };
    const addMarketParams = {
      ...marketConfig.configuration,
      interestRateModel: irAddress.toString(),
      asset: assetParam,
    };
    batch = batch.withContractCall(
      contract.methodsObject.addMarket(addMarketParams)
    );
    const op = await batch.send();
    await op.confirmation();
    console.log(`Market ${data.id} - ${marketName} deployed successfully`);
  }
}
