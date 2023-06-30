import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { io, type Socket } from 'socket.io-client'
import { Room, RoomEvent, type Track } from 'livekit-client'
import { VideoRenderer } from '@livekit/react-core'
import _ from 'lodash'
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

    socket.current.on('client_disconnect', () => {
      location.reload()
    })

    socket.current.connect()
  }, [])

  const sendSessionRequest = useCallback(() => {
    if (!socket.current) { return }
    const [publicKey, privateKey] = key.split('-')
    socket.current.emit('session_request', { publicKey, privateKey })
  }, [key])

  const handleScreenClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const targetX = event.clientX - target.offsetLeft
    const targetY = event.clientY - target.offsetTop

    const x = targetX / target.clientWidth
    const y = targetY / target.clientHeight

    const [publicKey, privateKey] = key.split('-')
    socket.current?.emit('click', { publicKey, privateKey, x, y })
  }, [key])

  const handleScreenMouseMove = useMemo(() => (
    _.throttle((event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement
      const targetX = event.clientX - target.offsetLeft
      const targetY = event.clientY - target.offsetTop

      const x = targetX / target.clientWidth
      const y = targetY / target.clientHeight

      const [publicKey, privateKey] = key.split('-')
      socket.current?.emit('mousemove', { publicKey, privateKey, x, y })
    }, 200, { leading: true, trailing: true })
  ), [key])

  return (
    <>
      <div className={styles.control}>
        <input
          type="text"
          value={key}
          placeholder="key"
          onChange={e => { setKey(e.target.value) }}
          disabled={!!track}
        />
        <button onClick={sendSessionRequest} disabled={!!track}>request session</button>
      </div>
      { track && (
        <div className={styles.sessionWrapper}>
          <textarea
            ref={logger}
            className={styles.logger}
            readOnly
            placeholder="Log messages are written here"
          ></textarea>
          <div
            onClick={handleScreenClick}
            onMouseMove={handleScreenMouseMove}
          >
            <VideoRenderer
              className={styles.video}
              track={track}
              isLocal={false}
            />
          </div>
        </div>
      ) }
    </>
  )
}

export default App
