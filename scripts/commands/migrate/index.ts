import { Command } from "commander";
import config from "../../../config";
import { getMigrationsList, runMigrations } from "./utils";


export const addMigrateCommand = (program: Command) => {
  const migrations = getMigrationsList();
  program
    .command("migrate")
    .description("deploy the specified contracts")
    .requiredOption<number>(
      "-s, --from <from>",
      "the migrations counter to start with",
      (val, def) => isNaN(parseInt(val)) ? def : parseInt(val),
      0
    )
    .requiredOption<number>(
      "-e, --to <to>",
      "the migrations counter to end with",
      (val, def) => isNaN(parseInt(val)) ? def : parseInt(val),
      migrations.length - 1
    )
    .requiredOption(
      "-k --key <key>",
      "Secret key to sign with",
      config.DEPLOYER_SK
    )
    .showHelpAfterError(true)
    .action(
      async (argv) =>
        await runMigrations(
          argv.from,
          argv.to,
          argv.key,
          migrations
        )
    );
};
