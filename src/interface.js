class Interface {
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
  }
  renderGame() {
    let gameInterface = 'Available moves:\n'
    let exitAndHelp = '0 - exit\n? - help'
    this.moveOptions.forEach((option, index) => {
      gameInterface += `${index + 1} - ${option}\n`
    })
    gameInterface += exitAndHelp
    console.log(gameInterface)
  }
}

module.exports = {Interface}
