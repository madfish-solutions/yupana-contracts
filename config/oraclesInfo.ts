import { ContractAddress, OracleInfo, OracleType } from "../scripts/types";

export const loadOraclesInfo = (env = process.env): OracleInfo[] => [
  {
    name: "harbinger",
    address: (env.HARBINGER_ADDRESS || undefined) as ContractAddress,
    type: OracleType.HARBINGER,
    precision: 1000000,
    timestampLimit: 1000
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
    name: "uxtz",
    address: "KT1LNbusATaV425DUoWeDRT95PymrkQFg7Ce" as ContractAddress,
    type: OracleType.UXTZ,
    precision: 1,
    timestampLimit: 1
  },
  {
    name: "ubinetic",
    address: (env.UBINETIC_ADDRESS || undefined) as ContractAddress,
    type: OracleType.UBINETIC,
    precision: 1000000,
    timestampLimit: 1200,
  },
  {
    name: "ubinetic_old",
    address: (env.UBINETIC_LEGACY_ADDRESS || undefined) as ContractAddress,
    type: OracleType.UBINETIC_LEGACY,
    precision: 1000000,
    timestampLimit: 1200,
  },
  {
    name: "sirs_lp",
    address: (env.SIRS_LP_ORACLE_ADDRESS || undefined) as ContractAddress,
    type: OracleType.SIRS_LP,
    precision: 1000000000000,
    timestampLimit: 1200,
  },
];

export default loadOraclesInfo();
