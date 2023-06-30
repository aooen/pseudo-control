import type { Server } from 'socket.io'
import { createToken } from '../utils/livekit'

export function detachClientHandler(io: Server, participantMap: Map<string, string>) {
  io.on('connection', (socket) => {
    if (socket.handshake.query.from && socket.handshake.query.from !== 'client') { return }

    const publicKey = socket.handshake.query.publicKey as string | undefined

    if (!publicKey || participantMap.has(publicKey)) {
      socket.emit('error', 'invalid query')
      socket.disconnect(true)
      return
    }

    socket.on('session_accept', ({ sender, roomId }) => {
      socket.to(sender).emit('session_accept')
      socket.emit('session_ready', { token: createToken(roomId, 'client') })
    })

    socket.on('log', (message) => {
      socket.to(publicKey).emit('log', message)
    })

    socket.on('disconnect', () => {
      participantMap.delete(publicKey)
    })

    participantMap.set(publicKey, socket.id)
  })
}
