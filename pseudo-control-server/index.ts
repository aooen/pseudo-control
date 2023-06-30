import { createServer } from 'http'
import httpProxy from 'http-proxy'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { detachClientHandler } from './handlers/client'
import { detachManagerHandler } from './handlers/manager'

dotenv.config({ path: '.env' })

const participantMap = new Map()

if (process.env.CONTROL_PORT) {
  const controlPort = parseInt(process.env.CONTROL_PORT, 10)
  const httpServer = createServer()
  const io = new Server(httpServer, { cors: { origin: '*' } })

  detachClientHandler(io, participantMap)
  detachManagerHandler(io, participantMap)

  httpServer.listen(controlPort)
}

if (process.env.SESSION_PORT) {
  const sessionPort = parseInt(process.env.SESSION_PORT, 10)
  httpProxy.createProxyServer({ target: process.env.LIVEKIT_URL, ws: true }).listen(sessionPort)
}
