import { useEffect, useState } from 'react'
import { animate } from 'motion/react'

/*
 useCountUp — anima un numero da 0 al target (per cifre che "salgono" all'ingresso).
 Riusabile ovunque servano contatori animati.
*/
export function useCountUp(target, { duration = 1.1, delay = 0, start = true } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [target, duration, delay, start])
  return value
}
