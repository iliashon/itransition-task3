class Interface {
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
  }
  renderGame(hmac) {
    let gameInterface = `HMAC: ${hmac}\nAvailable moves:\n`
    let exitAndHelp = '0 - exit\n? - help'
    this.moveOptions.forEach((option, index) => {
      gameInterface += `${index + 1} - ${option}\n`
    })
    gameInterface += exitAndHelp
    console.log(gameInterface)
    process.stdout.write('Enter your move:')
  }
  resultGame(moveUser, movePc, winner, hmacKey) {
    console.log(`Your move: ${moveUser}\nPC move: ${movePc}\n${winner}\nHMAC key: ${hmacKey}`)
  }
  error(message) {
    console.clear()
    console.log(message)
  }
}

module.exports = {Interface}
