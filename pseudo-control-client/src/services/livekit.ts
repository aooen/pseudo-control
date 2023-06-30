import { Room, VideoPresets } from 'livekit-client'

export class LiveKitService {
  private url: string | null = null
  private room: Room | null = null

  init(host: string, sessionPort: number) {
    this.url = `ws://${host}:${sessionPort}`
  }

  async start(token: string) {
    if (!this.url) { return }

    this.room = new Room()
    await this.room.connect(this.url, token)

    const { resolution } = (
      (window.innerWidth * window.innerHeight > 1280 * 720)
        ? VideoPresets.h1080
        : VideoPresets.h720
    )

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: { ideal: resolution.width },
        height: { ideal: resolution.height },
        frameRate: resolution.frameRate,
      },
      audio: false,
      preferCurrentTab: true,
    })

    for await (const track of stream.getTracks()) {
      await this.room.localParticipant.publishTrack(track)
    }
  }

  disconnect() {
    this.room?.disconnect()
  }
}

export default new LiveKitService()
