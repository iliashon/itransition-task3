const crypto = require('crypto')

const ALGORITHM = 'sha3-256';

class Hash {
  constructor() {
    this.key = null
    this.hmac = null
  }
  createKey() {
    this.key = crypto.generateKeySync('hmac', {length: 256}).export().toString('hex')
  }
  getKey() {
    return this.key
  }
  getHash() {
    return this.hmac
  }
  createHmac(move) {
    this.createKey()
    this.hmac = crypto.createHmac(ALGORITHM, this.key).update(move).digest('hex')
  }
}

module.exports = {Hash}
