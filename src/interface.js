const consola = require("consola");

class Interface {
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
  }
  renderGame(hmac) {
    let gameInterface = `HMAC: ${hmac.underline.reset}\nAvailable moves:\n`.bold,
        exitAndHelp = '0 - exit\n? - help'.magenta.bold
    this.moveOptions.forEach((option, index) => {
      gameInterface += `${index + 1} - ${option}\n`.cyan.italic
    })
    gameInterface += exitAndHelp
    console.log(gameInterface)
    process.stdout.write('Enter your move: '.bold)
  }
  resultGame(moveUser, movePc, winner, hmacKey) {
    const yourMove = 'Your move: ' + moveUser.cyan.italic,
          pcMove = 'PC move: ' + movePc.cyan.italic,
          hmac = 'HMAC key: '.bold + hmacKey.underline.bold;
    console.log(`${yourMove}\n${pcMove}\n${winner.bold}\n${hmac}`)
  }
  error(message){
    console.clear()
    consola.warn(message)
  }
  errorFatality(message){
    console.clear()
    consola.error(message)
  }
}

module.exports = {Interface}
