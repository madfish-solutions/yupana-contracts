import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { TezosToolkit } from "@taquito/taquito";
import { ContractAddress, TezosAddress } from "./types"
export function writeToContractsEnvironment(key: string, value: ContractAddress) {
  const file_path = path.resolve(process.cwd(), 'contracts.env');
  const contractsConfig = dotenv.config({ path: file_path}).parsed || {};
  contractsConfig[key] = value.toString();
  const data = Object.entries(contractsConfig).reduce((accum, [key, value]) => {
    const entry = key + '="' + value + '"\n';
    return accum.concat(entry);
  }, "");
  fs.writeFileSync(file_path, data);
}

export function loadEnvironment() {
  return {
    ...dotenv.config().parsed,
    ...dotenv.config({ path: path.resolve(process.cwd(), 'contracts.env') }).parsed
  }
}

export async function migrate(
  tezos: TezosToolkit,
  contractMichelson: string | object[],
  storage: any,
): Promise<TezosAddress> {
  const operation = await tezos.contract
    .originate({
      code: contractMichelson,
      storage: storage,
    })
    .catch((e) => {
      throw e;
    });
  await operation.confirmation();
  return operation.contractAddress;
}
