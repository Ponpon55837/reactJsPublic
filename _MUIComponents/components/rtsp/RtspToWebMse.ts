export class RtspToWebMse {
  mseQueue: BufferSource[] = []
  mseSourceBuffer: SourceBuffer | null = null
  mseStreamingStarted: boolean = false
  videoEl: HTMLVideoElement
  url: string
  constructor(videoEl: HTMLVideoElement, url: string) {
    this.videoEl = videoEl
    this.url = url
    _startPlay(this)
    // fix stalled video in safari
    videoEl.addEventListener('pause', this._onPause)
  }
  destroy() {
    this.videoEl.removeEventListener('pause', this._onPause)
  }
  _onPause() {
    const { videoEl } = this
    if (!videoEl) return
    if (videoEl.currentTime || 0 > videoEl.buffered.end(videoEl.buffered.length - 1)) {
      videoEl.currentTime = videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1
      videoEl.play()
    }
  }
}

function _startPlay(playerOb: RtspToWebMse) {
  const { videoEl, url } = playerOb
  const mse = new MediaSource()
  videoEl.src = window.URL.createObjectURL(mse)
  mse.addEventListener('sourceopen', on_sourceopen)
  function on_sourceopen() {
    const ws = new WebSocket(url)
    ws.binaryType = 'arraybuffer'
    // ws.onopen = function (event) {
    //   console.log('Connect to ws', event)
    // }
    ws.onmessage = function (event) {
      const data = new Uint8Array(event.data)
      if (data[0] === 9) {
        let mimeCodec
        const decodedArr = data.slice(1)
        if (window.TextDecoder) {
          mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
        } else {
          // mimeCodec = Utf8ArrayToStr(decodedArr)
          console.warn('not support TextDecoder!')
          return
        }
        playerOb.mseSourceBuffer = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
        playerOb.mseSourceBuffer.mode = 'segments'
        playerOb.mseSourceBuffer.addEventListener('updateend', () => _pushPacket(playerOb))
      } else {
        _readPacket(playerOb, event.data)
      }
    }
  }
  return () => {
    mse.removeEventListener('sourceopen', on_sourceopen)
  }
}

function _pushPacket(playerOb: RtspToWebMse) {
  const { videoEl, mseSourceBuffer, mseQueue } = playerOb
  let packet: BufferSource
  if (!mseSourceBuffer?.updating) {
    if (mseQueue.length > 0) {
      packet = mseQueue.shift() as BufferSource
      mseSourceBuffer?.appendBuffer(packet)
    } else {
      playerOb.mseStreamingStarted = false
    }
  }
  if (videoEl.buffered.length > 0) {
    if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
      videoEl.currentTime = videoEl.buffered.end(videoEl.buffered.length - 1) - 0.5
    }
  }
}

function _readPacket(playerOb: RtspToWebMse, packet: BufferSource) {
  const { mseSourceBuffer, mseQueue } = playerOb
  if (!playerOb.mseStreamingStarted) {
    try {
      mseSourceBuffer?.appendBuffer(packet)
    } catch (error) {
      // console.log(123, error)
    }
    playerOb.mseStreamingStarted = true
    return
  }
  mseQueue.push(packet)
  if (!mseSourceBuffer?.updating) {
    _pushPacket(playerOb)
  }
}
