import { useCallback, useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { Room, RoomEvent, type Track } from 'livekit-client'
import { VideoRenderer } from '@livekit/react-core'
import styles from './App.module.scss'

function App() {
  const socket = useRef<Socket>()
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
      <div className={styles.videoWrapper}>
        { track && (
          <VideoRenderer
            className={styles.video}
            track={track}
            isLocal={false}
          />
        ) }
      </div>
    </>
  )
}

export default App
