import os from "os";
import path from "path";
import fs from "fs";
import chalk from "chalk";

export default function info() {
  const cwd = process.cwd();

  console.log(chalk.cyan("\nTool Info\n"));

  console.log("Node:", process.version);
  console.log("OS:", `${os.platform()} ${os.release()}`);
  console.log("Current directory:", cwd);

  const pkgPath=path.join(cwd,'package.json');

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    console.log('Project:', pkg.name || 'Unnamed');
    console.log('Version:', pkg.version || 'N/A');
  } else {
    console.log(chalk.yellow('No package.json found in current directory'));
  }

  console.log();
}
