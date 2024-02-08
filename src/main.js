const {Table} = require("./table");
const {Interface} = require("./interface");
const {Hash} = require("./hash");
const {isOdd, hasRepeatArg} = require("./utils")

const MIN_ARGUMENTS = 3;

class Main{
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
    this.optionsLength = this.moveOptions.length;
    this.movePc = null;
    this.validatingArguments();
    this.hash = new Hash()
    this.table = new Table(this.moveOptions);
    this.interface = new Interface(this.moveOptions);
    this.startGame();
  }
  validatingArguments() {
    if (this.optionsLength < MIN_ARGUMENTS) {
      this.interface.errorMinArg()
      this.stopGame()
    } else if (isOdd(this.optionsLength)) {
      this.interface.errorOdd()
      this.stopGame()
    } else if (hasRepeatArg(this.moveOptions)) {
      this.interface.errorRepeatArg()
      this.stopGame()
    }
  }
  generatingPcMove() {
    this.movePc = Math.floor(Math.random() * (this.optionsLength - 0))
    this.hash.createHmac(this.moveOptions[this.movePc])
  }
  startGame() {
    this.generatingPcMove()
    this.interface.renderGame(this.hash.getHash())
    process.stdin.on('data', data => {
      if (data.toString().trim() === '?') {
        this.table.showTable()
        this.interface.renderGame(this.hash.getHash())
      } else {
        if (Number(data) === 0) {
          this.stopGame()
        } else if (!Number(data)) {
          this.interface.errorNumber()
          this.interface.renderGame(this.hash.getHash())
        } else {
          this.interface.resultGame(
            this.moveOptions[Number(data) - 1],
            this.moveOptions[this.movePc],
            this.table.checkWinner(this.movePc, Number(data) - 1),
            this.hash.getKey()
          )
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
