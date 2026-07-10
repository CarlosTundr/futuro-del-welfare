import { motion } from 'motion/react'
import Icon from '../Icon/Icon.jsx'
import InlineLink from '../InlineLink/InlineLink.jsx'
import { euro } from '../../utils/format.js'
import styles from './MovementsSheet.module.css'

function formatDate(iso) {
  const d = new Date(iso)
  const date = d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const time = d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  return `${date}, ${time}`
}

function Movement({ mov, index }) {
  const positive = mov.amount > 0
  return (
    <motion.li
      className={styles.mov}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1 + index * 0.06 }}
    >
      <span className={styles.ico}>
        <Icon name={mov.icon} size={18} />
      </span>
      <div className={styles.main}>
        <span className={styles.merchant}>{mov.merchant}</span>
        <span className={styles.date}>{formatDate(mov.date)}</span>
      </div>
      <div className={styles.right}>
        <span className={`${styles.value} ${positive ? styles.pos : ''}`}>
          {positive ? '+ ' : '- '}{euro(Math.abs(mov.amount))} €
        </span>
        <span className={styles.meta}>{mov.meta}</span>
      </div>
    </motion.li>
  )
}

// Contenuto movimenti (cross-wallet). Va dentro un BottomSheet.
export default function MovementsSheet({ transactions, onViewAll }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.title}>Movimenti recenti</h2>
        <InlineLink onClick={onViewAll}>Vedi tutti</InlineLink>
      </div>
      <ul className={styles.list}>
        {transactions.map((m, i) => (
          <Movement key={m.id} mov={m} index={i} />
        ))}
      </ul>
    </div>
  )
}
