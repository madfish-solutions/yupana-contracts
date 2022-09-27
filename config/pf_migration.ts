import { OracleType } from "../scripts/types";

export const migrations = {
  3: {
    type: OracleType.UBINETIC,
    name: "XTZUSD",
    decimals: 12,
  },
  5: {
    type: OracleType.UBINETIC,
    name: "BTCUSD",
    decimals: 12,
  },
}