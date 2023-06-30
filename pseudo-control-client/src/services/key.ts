import { CHAR_SET, PUBLIC_KEY_LENGTH, PRIVATE_KEY_LENGTH } from '~/constants/keyOption'

export class KeyService {
  private _publicKey: string | null = null
  private _privateKey: string | null = null

  private randomChar() {
    return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
  }

  init() {
    this._publicKey = Array(PUBLIC_KEY_LENGTH).fill(0).map(this.randomChar).join('')
    this._privateKey = Array(PRIVATE_KEY_LENGTH).fill(0).map(this.randomChar).join('')
  }

  get publicKey() {
    return this._publicKey
  }

  get privateKey() {
    return this._privateKey
  }

  get fullKey() {
    return `${this._publicKey}-${this._privateKey}`
  }
}

export default new KeyService()
