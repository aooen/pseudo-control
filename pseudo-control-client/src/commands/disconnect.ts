import { wrapperId } from '~/constants/dom'
import livekit from '~/services/livekit'
import socket from '~/services/socket'

export function disconnect() {
  livekit.disconnect()
  socket.disconnect()
  document.getElementById(wrapperId)?.remove()
}
