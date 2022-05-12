
import { MonorepoConfiguration } from "../scripts/types";
import { loadEnvironment } from "../scripts/utils";
import { loadCoreConfiguration } from "./core";
import { loadOraclesInfo } from "./oraclesInfo";
import { loadTokens } from "./tokens";

export const loadConfig = (env = process.env): MonorepoConfiguration => {
  env = {
    ...env,
    ...loadEnvironment()
  }
  return {
    YUPANA: loadCoreConfiguration(env),
    ORACLES: loadOraclesInfo(env),
    TOKENS: loadTokens(env),
    RPC: env.RPC,
    DEPLOYER_SK: env.DEPLOYER_SK,
  }
};

export default loadConfig();
