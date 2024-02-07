const {Table} = require('./table')

class Main{
  constructor(moveOptions) {
    this.moveOptions = moveOptions;
    this.argumentsLength = this.moveOptions.length
    this.validatingArguments()
    this.table = new Table(moveOptions)
  }
  validatingArguments() {
    const MIN_ARGUMENTS = 6;
    if (this.argumentsLength < MIN_ARGUMENTS) {
      console.log('Enter at least three possible moves')
    } else if (this.argumentsLength % 2 === 0) {
      console.log('Enter an odd number of possible moves')
    }
  }
}

module.exports = {Main}
