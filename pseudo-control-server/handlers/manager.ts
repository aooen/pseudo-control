import type { Server } from 'socket.io'
import { v4 as UUID } from 'uuid'
import { createToken } from '../utils/livekit'

export function detachManagerHandler(io: Server, participantMap: Map<string, string>) {
  io.on('connection', (socket) => {
    if (socket.handshake.query.from !== 'manager') { return }

    socket.on('session_request', ({ publicKey, privateKey }) => {
      const clientId = participantMap.get(publicKey)
      if (!clientId) { return }

      const roomId = UUID()

      socket.to(clientId).emit('session_request', { privateKey, roomId })
      socket.emit('session_ready', { token: createToken(roomId, 'manager') })
      socket.join(publicKey)
    })

    socket.on('click', ({ publicKey, privateKey, x, y }) => {
      const clientId = participantMap.get(publicKey)
      if (!clientId) { return }

      socket.to(clientId).emit('click', { privateKey, x, y })
    })

    socket.on('mousemove', ({ publicKey, privateKey, x, y }) => {
      const clientId = participantMap.get(publicKey)
      if (!clientId) { return }

      socket.to(clientId).emit('mousemove', { privateKey, x, y })
    })
  })
}
