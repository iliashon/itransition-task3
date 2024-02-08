const colors = require('colors')

class CheckWinner {
    static getResult(table, movePc, moveUser) {
        return table[movePc][moveUser] === 0 ?
          "It's a Draw!".bgYellow : table[movePc][moveUser] > 0 ? "You Win!".bgGreen : "You Lose!".bgRed
    }
}

module.exports = {CheckWinner}
