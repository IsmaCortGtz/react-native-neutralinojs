import chalk from "chalk";

export function log(...args: any[]) {
  console.log(chalk.bgCyan.black.bold(' Info '), ...args);
}

export function error(...args: any[]) {
  console.log(chalk.bgRed.white.bold(' Error '), ...args);
}

export function warn(...args: any[]) {
  console.log(chalk.yellow.bold('warn'), ...args);
}

export function raw(...args: any[]) {
  console.log(...args);
}

export default {
  log,
  error,
  warn,
  raw
};