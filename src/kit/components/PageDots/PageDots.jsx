import { motion } from 'motion/react'
import styles from './PageDots.module.css'

// Indicatore di pagina del carosello wallet.
export default function PageDots({ count, active }) {
  return (
    <div className={styles.wrap}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className={styles.dot}
          animate={{ width: i === active ? 18 : 6, opacity: i === active ? 1 : 0.35 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      ))}
    </div>
  )
}
