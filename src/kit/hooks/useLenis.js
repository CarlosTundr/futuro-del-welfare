import { useEffect } from 'react'
import Lenis from 'lenis'

/*
 Aggancia lo smooth-scroll (parallasse) al contenitore scrollabile del PhoneFrame.
 Passa la ref di `.screen`. Su mobile lo smooth resta attivo ma leggero.
*/
export function useLenis(scrollRef, options = {}) {
  useEffect(() => {
    const wrapper = scrollRef?.current
    if (!wrapper) return
    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild || wrapper,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      ...options,
    })
    let raf
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [scrollRef])
}
