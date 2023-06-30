import { io, type Socket } from 'socket.io-client'
import interaction from './interaction'
import key from './key'
import livekit from './livekit'
import domEvent from './domEvent'

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

    socket.on('session_request', ({ privateKey, roomId }) => {
      if (privateKey !== key.privateKey) { return }
      interaction.showAcceptModal(() => this.sessionAccept(roomId))
    })

    socket.on('session_ready', ({ token }) => {
      livekit.start(token)
    })

    socket.on('click', ({ privateKey, x, y }) => {
      if (privateKey !== key.privateKey) { return }
      domEvent.click(x, y)
    })

    socket.on('mousemove', ({ privateKey, x, y }) => {
      if (privateKey !== key.privateKey) { return }
      domEvent.mousemove(x, y)
    })

    socket.connect()

    this.socket = socket
  }

  sessionAccept(roomId: string) {
    this.socket?.emit('session_accept', { roomId })
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
