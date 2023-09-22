import { CSSProperties, useEffect, useLayoutEffect, useRef } from 'react'
import { RtspToWebMse } from './RtspToWebMse'

interface MsePlayerProps {
  src: string
  play?: boolean
  style: CSSProperties
}

function MsePlayer({ src, style, play }: MsePlayerProps) {
  const vdoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    if (!vdoRef.current || !src) return
    const videoEl = vdoRef.current
    const playerHelper = new RtspToWebMse(videoEl, src)
    return () => {
      playerHelper.destroy()
    }
  }, [src])

  useEffect(() => {
    if (!vdoRef.current) return
    if (vdoRef.current.readyState === 0) return
    play || play === undefined ? vdoRef.current.play() : vdoRef.current.pause()
  }, [play])

  return <video ref={vdoRef} autoPlay muted playsInline style={style}></video>
}

export default MsePlayer
