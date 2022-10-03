import {
  ContractAddress,
  FA2TokenType,
  TokenInfo,
} from "../scripts/types";
import {
  TezosToolkit,
} from "@taquito/taquito"
import {
  loadConfig
} from "../config/index";
import {
  loadMarketMigrations
} from "../config/new_markets";

const config = loadConfig();
const newMarkets = loadMarketMigrations();

module.exports = async (tezos: TezosToolkit) => {
  if (config.YUPANA.address === undefined)
    throw new Error("Yupana must be deployed");
  const contract = await tezos.contract.at(config.YUPANA.address.toString());
  for (const [marketName, data] of Object.entries(newMarkets)) {
    const marketConfig: TokenInfo = data.market;
    const irAddress = new ContractAddress(marketConfig.configuration.interestRateModel.address);
    if (irAddress === undefined)
      throw new Error(`IR must be deployed (${marketName.toUpperCase()}_IR_ADDRESS)`);
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
    const op = await contract.methodsObject.addMarket(addMarketParams).send();
    await op.confirmation();
    console.log(`Market ${data.id} - ${marketName} deployed successfully`);
  }
}
