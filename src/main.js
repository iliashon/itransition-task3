const {Table} = require("./table");
const {Interface} = require("./interface");
const {Hash} = require("./hash");

class Main{
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
    this.argumentsLength = this.moveOptions.length;
    this.movePc = null;
    this.validatingArguments();
    this.hash = new Hash()
    this.table = new Table(this.moveOptions);
    this.interface = new Interface(this.moveOptions);
    this.startGame();
  }
  validatingArguments() {
    const MIN_ARGUMENTS = 3;
    if (this.argumentsLength < MIN_ARGUMENTS) {
      console.log('Error! --- Enter at least three possible moves!')
      this.stopGame()
    } else if (this.argumentsLength % 2 === 0) {
      console.log('Error! --- Enter an odd number of possible moves!')
      this.stopGame()
    }
  }
  generatingPcMove() {
    this.movePc = Math.floor(Math.random() * (this.argumentsLength - 0))
  }
  startGame() {
    this.generatingPcMove()
    this.hash.createHmac(this.moveOptions[this.movePc])
    console.log(`HMAC: ${this.hash.getHash()}`)
    this.interface.renderGame()
    process.stdout.write('Enter your move:')
    process.stdin.on('data', data => {
      if (data.toString().trim() === '?') {
        console.clear()
        this.table.showTable()
        console.log(`HMAC: ${this.hash.getHash()}`)
        this.interface.renderGame()
        process.stdout.write('Enter your move:')
      } else {
        if (!Number(data)) {
          console.clear()
          console.log('Error! --- Enter a number!')
          this.startGame()
        } else if (Number(data) === 0) {
          this.stopGame()
        } else {
          process.stdout.write(`Your move: ${this.moveOptions[Number(data) - 1]}\n`)
          process.stdout.write(`PC move: ${this.moveOptions[this.movePc]}`)
          this.table.checkWinner(this.movePc, Number(data) - 1)
          console.log(`HMAC key: ${this.hash.getKey()}`)
          this.stopGame()
        }
      }
    })
  }
  stopGame() {
    process.exit()
  }
}

module.exports = {Main}
