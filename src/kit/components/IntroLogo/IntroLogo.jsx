import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import Lottie from 'lottie-react'
import animationData from '../../../assets/tundr-logo.json'
import styles from './IntroLogo.module.css'

/*
 IntroLogo — riproduce il wordmark Tundr animato (Lottie) al centro del viewport,
 forzato in BIANCO via filtro CSS. Al termine chiama onDone (poi la Home si setta).
*/
export default function IntroLogo({ onDone, speed = 1.5 }) {
  const lottieRef = useRef(null)

  useEffect(() => {
    lottieRef.current?.setSpeed?.(speed)
  }, [speed])

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className={styles.logo}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay
          onComplete={onDone}
        />
      </div>
    </motion.div>
  )
}
