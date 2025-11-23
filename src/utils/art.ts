import chalk from "chalk";

export function getFiglet() {
    return `
  _   _            _             _ _             _
 | \\ | | ___ _   _| |_ _ __ __ _| (_)_ __   ___ (_)___
 |  \\| |/ _ \\ | | | __| '__/ _' | | | '_ \\ / _ \\| / __|
 | |\\  |  __/ |_| | |_| | | (_| | | | | | | (_) | \\__ \\
 |_| \\_|\\___|\\__,_|\\__|_|  \\__,_|_|_|_| |_|\\___// |___/
                                               |__/\n\n`;
}

export function printHeader() {
    console.log('\n' + chalk.yellow.bold('Welcome to @neutralinojs/react-native'))
    console.log(chalk.yellow(getFiglet()));
}