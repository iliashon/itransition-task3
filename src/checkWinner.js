class CheckWinner {
    static getResult(table, movePc, moveUser) {
        return table[movePc][moveUser] === 0 ?
          "It's a Draw!" : table[movePc][moveUser] > 0 ? "You Win!" : "You Lose!"
    }
}

module.exports = {CheckWinner}
