const chalk = require('chalk')

const log = (msg) => {
    return console.log(chalk.white(msg))
}

const err = (msg) => {
    return console.log(chalk.red(msg))
}

const info = (msg) => {
    return console.log(chalk.green(msg))
}

const run = (msg) => {
    return console.log(chalk.bgMagenta(">>> " + msg))
}

module.exports = {log, err, info, run}