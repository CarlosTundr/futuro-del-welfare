import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import styles from './ProgressBar.module.css'

/*
 ProgressBar — si riempie quando entra in viewport, SUBITO se gia' visibile al mount.
*/
export default function ProgressBar({ value, total, delay = 0.1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const pct = total > 0 ? Math.max(0, Math.min(100, (value / total) * 100)) : 0
  return (
    <div className={styles.track} ref={ref} role="progressbar" aria-valuenow={Math.round(pct)}>
      <motion.div
        className={styles.fill}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${pct}%` : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}
