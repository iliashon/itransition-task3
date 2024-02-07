const { Main } = require('./src/main')

const NewGame = new Main(process.argv.slice(2))

// node index.js rock Spock paper lizard scissors
