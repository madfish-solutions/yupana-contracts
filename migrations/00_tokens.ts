import path from "path";
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { ContractAddress } from "../scripts/types";
import { loadConfig } from "../config";
const config = loadConfig();
import { migrate, writeToContractsEnvironment } from "../scripts/utils";
import { michelson as fa12code } from "../config/tokens/contracts/fa12.json";
import { michelson as fa2code } from "../config/tokens/contracts/fa2.json";
import tokensMetadata from "../config/tokens/contracts/metadata";
import wTezStorage from "../wTez/storage/fa2";
import wTezCode from "../wTez/build/fa2.json";

const testTokenMichelson = {
  fa12: fa12code,
  fa2: fa2code,
};
const admin = config.ADMIN

module.exports = async (tezos: TezosToolkit) => {
  const predefinedTokens = require("dotenv").config({
    path: path.resolve(process.cwd(), "contracts.env"),
  }).parsed;
  // wTez migration
  let wTezAddress: ContractAddress;
  if (predefinedTokens.WTEZ_TOKEN_ADDRESS)
    wTezAddress = new ContractAddress(predefinedTokens.WTEZ_TOKEN_ADDRESS);
  else {
    wTezStorage.admin = admin;
    wTezStorage.metadata = MichelsonMap.fromLiteral({
      "": Buffer.from("ipfs://Qmej4GUjbvo6aa4qvRFrBF7TCYKZLL4SDPQGod6hXBPu1x", "ascii").toString("hex")
    }) as MichelsonMap<string, string>
    wTezAddress = new ContractAddress(
      await migrate(tezos, wTezCode.michelson, wTezStorage)
    );
  }
  console.log("[FA2] wTEZ: ", wTezAddress.toString());
  writeToContractsEnvironment("WTEZ_TOKEN_ADDRESS", wTezAddress);

  // Other tokens
  for (const tokenKey of Object.keys(tokensMetadata)) {
    let contractAddress: ContractAddress;
    if (predefinedTokens[`${tokenKey.toUpperCase()}_TOKEN_ADDRESS`]) {
      contractAddress = new ContractAddress(
        predefinedTokens[`${tokenKey.toUpperCase()}_TOKEN_ADDRESS`]
      );
    } else {
      switch (tokensMetadata[tokenKey].type) {
        case "fa12":
          contractAddress = new ContractAddress(
            await migrate(tezos, testTokenMichelson.fa12, {
              totalSupplyF: "0",
              ledger: MichelsonMap.fromLiteral({}),
              ...tokensMetadata[tokenKey].storage,
            })
          );
          break;
        case "fa2":
          contractAddress = new ContractAddress(
            await migrate(tezos, testTokenMichelson.fa2, {
              account_info: MichelsonMap.fromLiteral({}),
              token_info: MichelsonMap.fromLiteral({}),
              minters: [],
              admin,
              pending_admin: await tezos.signer.publicKeyHash(),
              last_token_id:
                tokensMetadata[tokenKey].storage.token_metadata.size,
              ...tokensMetadata[tokenKey].storage,
            })
          );
          break;
        default:
          throw new Error(
            "Unknown token type: " + tokensMetadata[tokenKey].type
          );
      }
    }
    console.log(
      `[${tokensMetadata[tokenKey].type.toUpperCase()}] ${tokenKey}: `,
      contractAddress.toString()
    );
    writeToContractsEnvironment(
      `${tokenKey.toUpperCase()}_TOKEN_ADDRESS`,
      contractAddress.toString()
    );
  }
};
