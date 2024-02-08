const AsciiTable = require('ascii-table')
const colors = require('colors')

class Table{
  constructor(moveOptions) {
    this.moveOption = moveOptions
    this.table = Array.from(Array(moveOptions.length), () => new Array(moveOptions.length));
    this.viewTable = new AsciiTable()
    this.createViewTable()
  }
  createViewTable(){
    this.createTable()
    this.viewTable.setHeading(['v PC\\User >', ...this.moveOption])
      .setBorder('', '-', '-', '-')
    this.moveOption.forEach((option, index) => {
      this.viewTable.addRow([option, ...this.table[index]
        .map(item => item === 0 ? "Draw" : item > 0 ? "Win" : "Lose")])
    })
  }
  getTable() {
    return this.table
  }
  showViewTable() {
    console.clear()
    console.log(this.viewTable.toString().bgWhite.black)
  }
  createTable() {
    const OPTION_LENGTH = this.moveOption.length,
          AVERAGE = (OPTION_LENGTH - 1) / 2
    for (let i = 0; i < OPTION_LENGTH; i++) {
      for (let j = 0; j < OPTION_LENGTH; j++) {
        const cellValue = Math.sign((i - j + AVERAGE + OPTION_LENGTH) % OPTION_LENGTH - AVERAGE);
        this.table[i][j] = cellValue === 0 ? 0 : cellValue * -1
      }
    }
  }
}

module.exports = {Table}
