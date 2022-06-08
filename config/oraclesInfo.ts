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
    name: "ctez",
    address: (env.CTEZ_ORACLE_ADDRESS || undefined) as ContractAddress,
    type: OracleType.CTEZ,
    precision: 1,
    timestampLimit: 1
  },
  {
    name: "wtez",
    address: "KT191fRr1BePvJnq3BbJQaywJa9UbfNpCWzi" as ContractAddress,
    type: OracleType.WTEZ,
    precision: 1,
    timestampLimit: 1
  },
  {
    name: "ubinetic",
    address: (env.UBINETIC_ADDRESS || undefined) as ContractAddress,
    type: OracleType.UBINETIC,
    precision: 1000000,
    timestampLimit: 15000,
  },
];

export default loadOraclesInfo();
