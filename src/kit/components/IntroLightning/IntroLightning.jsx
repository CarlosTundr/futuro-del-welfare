import { motion } from 'motion/react'
import Icon from '../Icon/Icon.jsx'
import styles from './IntroLightning.module.css'

// stato di riposo del fulmine (sfondo)
const REST = { y: -96, scale: 1.9, blur: 24, opacity: 0.7 }

/*
 IntroLightning — fulmine bianco di sfondo.
 - reveal=true (primo atterraggio): appare al centro, sale, scala e sfoca fino al riposo, poi onRest.
 - reveal=false (ritorno in Home): appare gia' a riposo, senza rigiocare l'animazione.
*/
export default function IntroLightning({ color = '#ffffff', reveal = true, onRest }) {
  if (!reveal) {
    return (
      <div className={styles.layer} aria-hidden="true">
        <span
          className={styles.bolt}
          style={{
            color,
            transform: `translateY(${REST.y}px) scale(${REST.scale})`,
            filter: `blur(${REST.blur}px)`,
            opacity: REST.opacity,
          }}
        >
          <Icon name="lightning" size={230} color="currentColor" />
        </span>
      </div>
    )
  }

  return (
    <div className={styles.layer} aria-hidden="true">
      <motion.span
        className={styles.bolt}
        style={{ color }}
        initial={{ y: 0, scale: 0.7, filter: 'blur(0px)', opacity: 0 }}
        animate={{
          y: [0, 0, REST.y],
          scale: [0.7, 1, REST.scale],
          filter: ['blur(0px)', 'blur(0px)', `blur(${REST.blur}px)`],
          opacity: [0, 1, REST.opacity],
        }}
        transition={{ duration: 0.55, times: [0, 0.3, 1], ease: ['easeOut', [0.16, 1, 0.3, 1]] }}
        onAnimationComplete={onRest}
      >
        <Icon name="lightning" size={230} color="currentColor" />
      </motion.span>
    </div>
  )
}
