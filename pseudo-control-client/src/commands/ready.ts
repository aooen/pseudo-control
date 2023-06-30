import { wrapperId } from '~/constants/dom'
import key from '~/services/key'
import literal from '~/services/literal'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ready(_serverUrl: string) {
  const wrapper = document.createElement('div')
  wrapper.id = wrapperId
  document.body.appendChild(wrapper)

  key.init()
  literal.init()

  return key.fullKey
}
