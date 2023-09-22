import { useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'

const useScreenHeight = () => {
  const elementRef: any = useRef(null)
  const [screenHeight, setScreenHeight] = useState(elementRef.current?.clientHeight)
  useEffectOnce(() => {
    setScreenHeight(window.innerHeight)
    const handleScreenHeight = () => setScreenHeight(window.innerHeight)
    window.addEventListener('resize', handleScreenHeight)
  })
  return screenHeight
}

export default useScreenHeight
