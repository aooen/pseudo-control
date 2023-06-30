import socket from '~/services/socket'

export function log(message: string) {
  socket.log(message)
}
