import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { loadConfig } from "../config";
import { loadInterestRates } from "../config/tokens/interestRateConfig";
import { ContractAddress } from "../scripts/types";
import { migrate, writeToContractsEnvironment } from "../scripts/utils";
const config = loadConfig();
import { michelson as code } from "../yupana/build/interestRate.json";
import storage from "../yupana/storage/interestRate";

module.exports = async (tezos: TezosToolkit) => {
  const irConfigs = loadInterestRates(process.env);
  for (const tokenKey in irConfigs) {
    let irAddress: ContractAddress;
    if (irConfigs[tokenKey].address)
      irAddress = new ContractAddress(irConfigs[tokenKey].address);
    else {
      const interestRateStorage = {
        ...storage,
        metadata: MichelsonMap.fromLiteral({
          "": Buffer.from("ipfs://QmYao3D4WT3PcXUjD2goFoTXqVQh5JYbD34bGk1aKwvAvK", "ascii").toString("hex")
        }),
        admin: await tezos.signer.publicKeyHash(),
        ...irConfigs[tokenKey],
      };
      irAddress = new ContractAddress(
        await migrate(tezos, code, interestRateStorage)
      );
    }
    console.log(`InterestRate ${tokenKey} contract: ${irAddress.toString()}`);
    writeToContractsEnvironment(`${tokenKey.toUpperCase()}_IR_ADDRESS`, irAddress);
  }
};
