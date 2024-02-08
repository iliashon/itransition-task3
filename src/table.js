const AsciiTable = require('ascii-table')

class Table{
  constructor(moveOptions) {
    this.moveOption = moveOptions
    this.table = Array.from(Array(moveOptions.length), () => new Array(moveOptions.length));
    this.viewTable = new AsciiTable()
    this.getTable()
  }
  getTable(){
    this.createTable()
    this.viewTable.setHeading(['v PC\\User >', ...this.moveOption])
      .setBorder('', '-', '-', '-')
    this.moveOption.forEach((option, index) => {
      this.viewTable.addRow([option, ...this.table[index]
        .map(item => item === 0 ? "Draw" : item > 0 ? "Win" : "Lose")])
    })
  }
  showTable() {
    console.log(this.viewTable.toString())
  }

  checkWinner(movePc, moveUser) {
    console.log(`\n${this.table[movePc][moveUser] === 0 ? 
      "It's a Draw!" : this.table[movePc][moveUser] > 0 ? "You Win!" : "You Lose!"}`)
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


// const [DRAW, WIN, LOSE] = [0, 1, -1]
// for (let i = 0; i < OPTION_LENGTH; i++) {
//   let balance = 0;
//   for (let j = 0; j < OPTION_LENGTH; j++) {
//     if (i === j) {
//       this.table[i][j] = DRAW
//     } else if (i > j) {
//       balance += this.table[i][j];
//     } else {
//       if (balance <= 0) {
//         this.table[i][j] = WIN
//         this.table[j][i] = WIN
//         balance += WIN
//       } else {
//         this.table[i][j] = LOSE
//         this.table[j][i] = LOSE
//         balance += LOSE
//       }
//     }
//   }
// }

// Array.from(Array(moveOptions.length), () => new Array(moveOptions.length))

module.exports = {Table}
