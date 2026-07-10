import { motion } from 'motion/react'
import Icon from '../Icon/Icon.jsx'
import { euroParts } from '../../utils/format.js'
import styles from './WalletCard.module.css'

/*
 WalletCard — contenuto di un borsellino (Welfare o Buoni Pasto).
 Presentazionale: riceve il wallet dal dataset. Lo switch/carosello sta in HomeScreen.
*/
export default function WalletCard({ wallet, onDetail, onAction, showDetail = true }) {
  const { int, dec } = euroParts(wallet.available)
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.favicon}>
          <Icon name={wallet.icon} size={24} />
        </span>
        <span className={styles.title}>{wallet.label}</span>
      </div>

      <div className={styles.amountBlock}>
        <span className={styles.caption}>Credito disponibile:</span>
        <div className={styles.amount}>
          <span className={styles.int}>{int}</span>
          <span className={styles.dec}>,{dec} €</span>
        </div>
      </div>

      {showDetail && (
        <motion.button
          className={styles.detail}
          whileTap={{ scale: 0.95 }}
          onClick={onDetail}
        >
          Dettagli
          <Icon name="chevron-right" size={16} />
        </motion.button>
      )}

      <div className={styles.actions}>
        {wallet.actions.map((a) => (
          <motion.button
            key={a.id}
            className={styles.action}
            whileTap={{ scale: 0.94 }}
            onClick={() => onAction?.(a)}
          >
            <span className={`${styles.navCard} ${a.variant === 'dark' ? styles.dark : styles.light}`}>
              <Icon name={a.icon} size={32} />
            </span>
            <span className={styles.actionLabel}>{a.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
