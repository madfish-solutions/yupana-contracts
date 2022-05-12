import { ContractAddress, OracleInfo, OracleType } from "../scripts/types";

export const loadOraclesInfo = (env = process.env): OracleInfo[] => [
  {
    name: "harbinger",
    address: (env.HARBINGER_ADDRESS || undefined) as ContractAddress,
    type: OracleType.HARBINGER,
    precision: 1000000,
    timestampLimit: 30000000
  },
  {
    name: "ubinetic",
    address: (env.UBINETIC_ADDRESS || undefined) as ContractAddress,
    type: OracleType.UBINETIC,
    precision: 1000000,
    timestampLimit: 15000,
  },
  {
    name: "ctez",
    address: (env.CTEZ_ORACLE_ADDRESS || undefined) as ContractAddress,
    type: OracleType.CTEZ,
    precision: 1,
    timestampLimit: 1
  },
];

export default loadOraclesInfo();
