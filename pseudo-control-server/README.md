# pseudo-control-server
- It is a socket server with feature of LiveKit proxying.
- pseudo-control handles screen sharing through the WebRTC-based LiveKit server, and other controls through the socket.io server provided by pseudo-control-server.

## Install
1. Install and configure LiveKit ([See LiveKit docs](https://docs.livekit.io/getting-started/server-setup/)) ㅡ for production use, you need to set api key and secret through yaml.
2. Put in `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` to `.env` file
3. (optional) You can change port if you want. `CONTROL_PORT=26610` means socket server port, and `SESSION_PORT=26611` means proxy port to LiveKit server. (you can also set empty value if you don't want) ㅡ it must be set on all clients as well.
4. Run `yarn start`, and enjoy!

## Defined Event (socket)
(← is outstream, → means instream)

### client
- `connection { publicKey }`: publicKey(front part separated by `-` at key) is required.
- ←`session_request { privateKey, roomId }`: When there is a session request from the manager, The server forwards privateKey for validation and LiveKit roomId.
- →`session_accept { roomId }`: If privateKey is valid, the client send a accept socket with roomId.
- ←`session_ready { roomId }`: Give LiveKit roomId when session_accept.
- →`log { message }`: Forward to a manager for logging.

### manager
- →`session_request { publicKey, privateKey }`: request session to client.
- ←`session_ready { roomId }`: Give LiveKit roomId when session_request.
- ←`session_accept { roomId }`: Forward a client accept message.
- ←`log { message }`: Forward a client log message.
- →`click { publicKey, privateKey, x, y }`: Send click event to client.
- →`mousemove { publicKey, privateKey, x, y }`: Send mousemove event to client.
- ←`client_disconnect`: Notify client's disconnecting.
