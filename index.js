const { Main } = require('./src/main')

new Main(process.argv.slice(2).map(arg => arg.trim()))
