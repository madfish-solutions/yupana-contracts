import {
  validateKeyHash,
  validateAddress,
  validateContractAddress,
} from "@taquito/utils";
import BigNumber from "bignumber.js";
import { UnitValue, MichelsonMap } from "@taquito/taquito";

export function validateValue(validationFunc, value) {
  const valid = validationFunc(value);
  if (valid == 3) return value;
  else {
    const error_values = [
      "NO_PREFIX_MATCHED",
      "INVALID_CHECKSUM",
      "INVALID_LENGTH",
      "VALID",
    ];
    throw new Error("Value invalid, Error: " + error_values[valid]);
  }
}

export class TezosAddress extends String {
  constructor(value: any) {
    validateValue(validateAddress, value);
    super(value.toString());
    return this;
  }
}
export class KeyHashString extends String {
  constructor(value: any) {
    validateValue(validateKeyHash, value);
    super(value.toString());
    return this;
  }
}

export class ContractAddress extends String {
  constructor(value: any) {
    validateValue(validateContractAddress, value);
    super(value.toString());
    return this;
  }
}

export class BytesString extends String {
  constructor(value: any) {
    if (new RegExp("/([A-Fa-f0-9]{2}){8,9}/g").test(value.toString())) {
      super(value.toString());
      return this;
    } else {
      throw new Error("Invalid bytes string");
    }
  }
}

export declare type Tez = typeof UnitValue;
export declare type FA2 = {
  token_address: TezosAddress;
  token_id: BigNumber.Value;
};
export declare type FA12 = TezosAddress;
export declare type TezTokenType = {
  tez: Tez;
};
export declare type FA2TokenType = {
  fA2: FA2;
};

export declare type FA12TokenType = {
  fA12: FA12;
};

export declare type TokenType = FA12TokenType | FA2TokenType | TezTokenType;

export declare type YupanaConfiguration = {
  address?: ContractAddress;
  closeFactorF: BigNumber.Value;
  liqIncentiveF: BigNumber.Value;
  priceFeedProxy?: ContractAddress;
  maxMarkets: BigNumber.Value;
};

export enum OracleType {
  HARBINGER = 'harbinger',
  UBINETIC = 'ubinetic',
  UBINETIC_LEGACY = 'ubinetic_old',
  CTEZ = 'ctez',
  WTEZ = 'wtez',
}

export declare type OracleInfo = {
  name: string;
  address?: ContractAddress;
  type: OracleType;
  precision: BigNumber.Value;
  timestampLimit: BigNumber.Value;
};

export declare type IRModel = {
  address?: ContractAddress;
  kinkF: BigNumber.Value;
  baseRateF: BigNumber.Value;
  multiplierF: BigNumber.Value;
  jumpMultiplierF: BigNumber.Value;
  reserveFactorF: BigNumber.Value;
};

export declare type MarketConfiguration = {
  interestRateModel: IRModel;
  asset: TokenType;
  collateralFactorF: BigNumber.Value;
  reserveFactorF: BigNumber.Value;
  maxBorrowRate: BigNumber.Value;
  token_metadata: MichelsonMap<string, BytesString>;
  threshold: BigNumber.Value;
  liquidReserveRateF: BigNumber.Value;
};

export declare type TokenInfo = {
  oracle: {
    name: string // for oracle
    type: OracleType,
    decimals: BigNumber.Value;
  },
  configuration: MarketConfiguration;
};

export declare type MonorepoConfiguration = {
  YUPANA: YupanaConfiguration;
  ORACLES: OracleInfo[];
  TOKENS: { [token: string]: TokenInfo };
  RPC: string;
  DEPLOYER_SK: string;
  ADMIN: string;
};
