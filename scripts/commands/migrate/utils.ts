import fs from "fs";
import path from "path";
import config from "../../../config";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import { ContractAddress } from "../../types";

const migrationsDir = path.resolve(process.cwd(), "migrations");

export const getMigrationsList = () => {
  if (!fs.existsSync(migrationsDir))
    fs.mkdirSync(migrationsDir, { recursive: true });
  return fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => file.slice(0, file.length - 3));
};

export const runMigrations = async (
  from: number,
  to: number,
  key: string,
  migrations: string[]
) => {
  try {
    const tezos = new TezosToolkit(config.RPC);
    const signer = await InMemorySigner.fromSecretKey(key);
    tezos.setSignerProvider(signer);
    migrations = migrations.filter((value, idx) => idx >= from && idx <= to);
    for (const migration of migrations) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const func = require(`${migrationsDir}/${migration}.ts`);
      await func(tezos);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};