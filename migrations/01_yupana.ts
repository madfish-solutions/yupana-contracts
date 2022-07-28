import { TezosToolkit } from "@taquito/taquito";
import { MichelsonMap } from "@taquito/michelson-encoder";
import { ContractAddress } from "../scripts/types";
import { migrate, writeToContractsEnvironment } from "../scripts/utils";
import { loadConfig } from "../config";
const config = loadConfig();
import { storage } from "../yupana/storage/yToken";
import { michelson as code } from "../yupana/build/yToken.json";
import tokenLambdas from "../yupana/build/lambdas/tokenLambdas.json";
import useLambdas from "../yupana/build/lambdas/yTokenLambdas.json";

const metadata = MichelsonMap.fromLiteral({
  "":  Buffer.from(
    "ipfs://QmWNvqm8kx2mRTvycjo9J9hLWZNwjCTZGfUEJbWtn2Vn1H",
    "ascii"
  ).toString("hex"),
});

module.exports = async (tezos: TezosToolkit) => {
  let contractAddress: ContractAddress;
  if (config.YUPANA.address)
    contractAddress = new ContractAddress(config.YUPANA.address)
  else {
    const yStorage = {
      ...storage,
      admin: await tezos.signer.publicKeyHash(),
    }

    const contract =
      await migrate(
        tezos,
        code,
        {
          storage: yStorage,
          metadata,
          token_metadata: MichelsonMap.fromLiteral({}),
          tokenLambdas: MichelsonMap.fromLiteral({}),
          useLambdas: MichelsonMap.fromLiteral({}),
        }
      );
    let params = [];

    console.log("Start setting Token lambdas");
    for (const yTokenFunction of tokenLambdas) {
      params.push({
        kind: "transaction",
        to: contract,
        amount: 0,
        parameter: {
          entrypoint: "setTokenAction",
          value: yTokenFunction,
        },
      });
    }

    console.log("Start setting yToken lambdas");

    for (const yTokenFunction of useLambdas) {
      params.push({
        kind: "transaction",
        to: contract,
        amount: 0,
        parameter: {
          entrypoint: "setUseAction",
          value: yTokenFunction,
        },
      });
    }
    const batch = tezos.wallet.batch(params);
    const operation = await batch.send();
    await operation.confirmation()
    console.log("Setting finished");
    contractAddress = new ContractAddress(contract)
  }
  console.log(`Yupana contract: ${contractAddress.toString()}`);
  writeToContractsEnvironment("YUPANA_ADDRESS", contractAddress);
};
