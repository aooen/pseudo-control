import { wrapperId } from '~/constants/dom'
import key from '~/services/key'
import literal from '~/services/literal'
import livekit from '~/services/livekit'
import socket from '~/services/socket'

export function ready({ host, controlPort, sessionPort }: { host: string, controlPort: number, sessionPort: number }) {
  const wrapper = document.createElement('div')
  wrapper.id = wrapperId
  document.body.appendChild(wrapper)

  key.init()
  literal.init()
  livekit.init(host, sessionPort)
  socket.init(host, controlPort)

  return key.fullKey
}
