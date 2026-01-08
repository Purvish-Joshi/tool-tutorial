#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";

import createLogger from "../src/logger.js";
import getConfig from "../src/config/config-mgr.js";
import start from "../src/commands/start.js";
import info from "../src/commands/info.js";

const logger = createLogger("bin");

try {
  const args = arg(
    {
      "--start": Boolean,
      "--info": Boolean,
      "--json": Boolean,
    },
    { permissive: true }
  );

  logger.debug("Received args", args);

  let commandExecuted = false;

  if (args["--info"]) {
    const options = {
      json: Boolean(args["--json"]),
    };

    info(options);
    commandExecuted = true;
  }

  if (args["--start"]) {
    const config = getConfig();
    start(config);
    commandExecuted = true;
  }

  if (!commandExecuted) {
    usage();
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--info")}\tInformation about the app
  ${chalk.greenBright("--info --json")}\tInformation in json format`);
}