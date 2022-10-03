import {
  TezosToolkit,
} from "@taquito/taquito";
import {
  loadConfig
} from "../config/index";
import { loadMarketUpdates } from "../config/upd_markets";

const config = loadConfig();
const updMarkets = loadMarketUpdates();

module.exports = async (tezos: TezosToolkit) => {
  if (config.YUPANA.address === undefined)
    throw new Error("Yupana must be deployed");
  const contract = await tezos.contract.at(config.YUPANA.address.toString());
  const priceFeedProxy = await tezos.contract.at(
    config.YUPANA.priceFeedProxy.toString()
  );
  let batch = tezos.contract.batch();
  batch = batch.withContractCall(
    priceFeedProxy.methodsObject
      .getPrice(Object.keys(updMarkets))
  )

  for (const [tokenId, data] of Object.entries(updMarkets)) {
    batch = batch.withContractCall(
      contract.methods.updateInterest(tokenId)
    )
    batch = batch.withContractCall(
      contract.methodsObject
        .setTokenFactors({ tokenId: tokenId, ...data })
    )
  }
  const op = await batch.send();
  await op.confirmation();
  console.log(`Markets ${Object.keys(updMarkets)} updated successfully`);
}
