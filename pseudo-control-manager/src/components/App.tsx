import { useCallback, useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { Room, RoomEvent, type Track } from 'livekit-client'
import { VideoRenderer } from '@livekit/react-core'
import styles from './App.module.scss'

function App() {
  const socket = useRef<Socket>()
  const logger = useRef<HTMLTextAreaElement>(null)
  const [track, setTrack] = useState<Track>()
  const [key, setKey] = useState('')

  useEffect(() => {
    if (socket.current) { return }

    socket.current = io(`ws://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_CONTROL_PORT}`, {
      autoConnect: false,
      transports: ['websocket'],
      query: { from: 'manager' },
    })

    socket.current.on('session_ready', async ({ token }) => {
      const room = new Room()
      await room.connect(`ws://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SESSION_PORT}`, token)

      room.once(RoomEvent.TrackSubscribed, (track) => {
        setTrack(track)
      })
    })

    socket.current.on('log', message => {
      if (!logger.current) { return }
      logger.current.textContent = `${message}\n${logger.current.textContent}`
    })

    socket.current.connect()
  }, [])

  const sendSessionRequest = useCallback(() => {
    if (!socket.current) { return }
    const [publicKey, privateKey] = key.split('-')
    socket.current.emit('session_request', { publicKey, privateKey })
  }, [key])

  return (
    <>
      <div className={styles.control}>
        <input
          type="text"
          value={key}
          placeholder="key"
          onChange={e => { setKey(e.target.value) }}
        />
        <button onClick={sendSessionRequest}>request session</button>
      </div>
      { track && (
        <div className={styles.sessionWrapper}>
          <textarea
            ref={logger}
            className={styles.logger}
            readOnly
            placeholder="Log messages are written here"
          ></textarea>
          <VideoRenderer
            className={styles.video}
            track={track}
            isLocal={false}
          />
        </div>
      ) }
    </>
  )
}

export default App
