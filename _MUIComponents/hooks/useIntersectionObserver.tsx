import { useUpdateEffect } from 'react-use'

const useIntersectionObserver = (addFn: () => void, data: any[], lastChild: number = 2) => {
  useUpdateEffect(() => {
    const callback = (entries: any, observer: any) => {
      if (entries[0].isIntersecting) {
        addFn()
        observer.unobserve(entries[0].target)
      }
    }

    const target = document.querySelector(`li:nth-last-child(${lastChild})`) as HTMLElement
    if (!target) {
      return
    }

    const observer = new IntersectionObserver(callback, {
      root: null, // 指定觸發位置，這裡為預設值，代表視窗
      rootMargin: '-100px 0px', // 指定觸發位置的偏移量，這裡為底部偏移 200px 觸發
    })

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [data])
}

export default useIntersectionObserver
