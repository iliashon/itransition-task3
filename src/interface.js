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
  errorOdd() {
    console.log('Error! --- Enter an odd number of possible moves!')
  }
  errorRepeatArg() {
    console.log('Error! --- Move options cannot be repeated, try again!')
  }
  errorMinArg() {
    console.log('Error! --- Enter at least three possible moves!')
  }
  errorNumber() {
    console.clear()
    console.log('Error! --- Enter a number!')
  }
}

module.exports = {Interface}
