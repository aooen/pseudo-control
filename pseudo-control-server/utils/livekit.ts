import { AccessToken } from 'livekit-server-sdk'

export function createToken(room: string, identity: 'client' | 'manager') {
  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, { identity })
  at.addGrant({ roomJoin: true, room })

  return at.toJwt()
}
