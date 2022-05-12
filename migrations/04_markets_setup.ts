import BigNumber from "bignumber.js";
import { TezosToolkit, Operation } from "@taquito/taquito";
import { loadConfig } from "../config";
import { FA2TokenType } from "../scripts/types";

const config = loadConfig();

module.exports = async (tezos: TezosToolkit) => {
  if (config.YUPANA.address === undefined)
    throw new Error("Yupana must be deployed");
  const contract = await tezos.contract.at(config.YUPANA.address.toString());
  const priceFeedProxy = await tezos.contract.at(
    config.YUPANA.priceFeedProxy.toString()
  );

  let op: Operation = await contract.methodsObject
    .setGlobalFactors({
      ...config.YUPANA,
      address: undefined,
    })
    .send();
  await op.confirmation();
  for (const [tokenKey, tokenInfo] of Object.entries(config.TOKENS)) {
    let batch = tezos.contract.batch();
    const tokenId = ((await contract.storage()) as any).storage.lastTokenId;
    const oracleConfig = config.ORACLES.find(
      (val) => val.type === tokenInfo.oracle.type
    );
    const updateAssetParams = {
      tokenId,
      assetName: tokenInfo.oracle.name,
      decimals: tokenInfo.oracle.decimals,
      oracle: oracleConfig.address.toString(),
    };
    batch = batch.withContractCall(
      priceFeedProxy.methodsObject.updateAsset(updateAssetParams)
    );
    const isFa2Token = (tokenInfo.configuration.asset as unknown as FA2TokenType).fA2;
    const assetParam = isFa2Token === undefined
      ? tokenInfo.configuration.asset
      : {
        fA2: { // weird schema params... details `contract.methods.addMarket().schema`
          2: isFa2Token.token_address,
          3: isFa2Token.token_id,
        },
      };
    const addMarketParams = {
      ...tokenInfo.configuration,
      interestRateModel:
        tokenInfo.configuration.interestRateModel.address.toString(),
      asset: assetParam
    };
    batch = batch.withContractCall(
      contract.methodsObject.addMarket(addMarketParams)
    );
    op = await batch.send();
    await op.confirmation();
    console.log(`Market for ${tokenKey} set`);
  }
};
