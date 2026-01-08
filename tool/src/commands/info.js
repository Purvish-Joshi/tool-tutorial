import os from "os";
import path from "path";
import fs from "fs";
import chalk from "chalk";

export default function info(options = {}) {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, "package.json");

  const infoData = {
    node: process.version,
    os: `${os.platform()} ${os.release()}`,
    cwd,
  };

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    infoData.project = pkg.name || "Unnamed";
    infoData.version = pkg.version || "N/A";
  }

  // JSON output
  if (options.json) {
    console.log(JSON.stringify(infoData, null, 2));
    return;
  }

  // Human-readable output
  console.log(chalk.cyan("\nTool Info\n"));
  console.log("Node:", infoData.node);
  console.log("OS:", infoData.os);
  console.log("Current directory:", infoData.cwd);

  if (infoData.project) {
    console.log("Project:", infoData.project);
    console.log("Version:", infoData.version);
  } else {
    console.log(chalk.yellow("No package.json found in current directory"));
  }

  console.log();
}
