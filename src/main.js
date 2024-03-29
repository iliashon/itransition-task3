const {Table} = require("./table");
const {Interface} = require("./interface");
const {Hash} = require("./hash");
const {isOdd, hasRepeatArg, randomNumber} = require("./utils")
const {CheckWinner} = require("./checkWinner");

const MIN_ARGUMENTS = 3;

const ERROR_MESSAGE = {
  minArg: "Enter at least three possible moves, try again!",
  odd: "Enter an odd number of possible moves, try again!",
  repeatArg: "Move options cannot be repeated, try again!",
  noAnswer: "There is no such answer, try again!",
  notNumber: "Enter a number, try again!"
}

class Main{
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
    this.optionsLength = this.moveOptions.length;
    this.movePc = null;
    this.hash = new Hash()
    this.table = new Table(this.moveOptions);
    this.interface = new Interface(this.moveOptions);
    this.startGame();
  }
  validatingArguments() {
    if (this.optionsLength < MIN_ARGUMENTS) {
      this.interface.errorFatality(ERROR_MESSAGE.minArg)
      this.stopGame()
    } else if (!isOdd(this.optionsLength)) {
      this.interface.errorFatality(ERROR_MESSAGE.odd)
      this.stopGame()
    } else if (hasRepeatArg(this.moveOptions)) {
      this.interface.errorFatality(ERROR_MESSAGE.repeatArg)
      this.stopGame()
    }
  }
  generatingPcMove() {
    this.movePc = randomNumber(this.optionsLength)
    this.hash.createHmac(this.moveOptions[this.movePc])
  }
  startGame() {
    this.validatingArguments();
    this.generatingPcMove()
    this.interface.renderGame(this.hash.getHash())
    process.stdin.on('data', data => {
      if (data.toString().trim() === '?') {
        this.table.showViewTable()
        this.interface.renderGame(this.hash.getHash())
      } else {
        if (Number(data) === 0) {
          this.stopGame()
        } else if (Number(data) > this.moveOptions.length || Number(data) < 0) {
          this.interface.error(ERROR_MESSAGE.noAnswer)
          this.interface.renderGame(this.hash.getHash())
        } else if (!Number(data)) {
          this.interface.error(ERROR_MESSAGE.notNumber)
          this.interface.renderGame(this.hash.getHash())
        } else {
          this.interface.resultGame(
            this.moveOptions[Number(data) - 1],
            this.moveOptions[this.movePc],
            CheckWinner.getResult(this.table.getTable(), this.movePc, Number(data) - 1),
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
