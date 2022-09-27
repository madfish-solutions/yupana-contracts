import { TezosToolkit } from "@taquito/taquito";
import { loadConfig } from "../config";
import { loadIRMigrations } from "../config/ir_migration";
const config = loadConfig();

module.exports = async (tezos: TezosToolkit) => {
  const migrations = loadIRMigrations();
  let batch = tezos.contract.batch();
  for (const newConfig of Object.values(migrations)) {
    const irModel = await tezos.contract.at(newConfig.address.toString());
    batch = batch.withContractCall(
      irModel.methodsObject
        .setCoefficients({
          kinkF: newConfig.kinkF,
          baseRateF: newConfig.baseRateF,
          multiplierF: newConfig.multiplierF,
          jumpMultiplierF: newConfig.jumpMultiplierF,
         })
    )
  }
  const op = await batch.send();
  await op.confirmation();
  console.log(`InterestRates updated for markets: ${Object.keys(migrations)}`);
};
