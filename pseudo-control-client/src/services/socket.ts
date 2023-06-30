import { io, type Socket } from 'socket.io-client'
import interaction from './interaction'
import key from './key'
import livekit from './livekit'

export class SocketService {
  private socket: Socket | null = null

  init(host: string, controlPort: number) {
    const socket = io(`ws://${host}:${controlPort}`, {
      autoConnect: false,
      transports: ['websocket'],
      query: {
        from: 'client',
        publicKey: key.publicKey,
      },
    })

    socket.on('session_request', ({ sender, privateKey, roomId }) => {
      if (privateKey !== key.privateKey) { return }
      interaction.showAcceptModal(() => this.sessionAccept(sender, roomId))
    })

    socket.on('session_ready', ({ token }) => {
      livekit.start(token)
    })

    socket.connect()

    this.socket = socket
  }

  sessionAccept(sender: string, roomId: string) {
    this.socket?.emit('session_accept', { sender, roomId })
  }

  log(message: string) {
    this.socket?.emit('log', message)
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketService()
