import { motion } from 'motion/react'
import { Icon, WalletHero, SpendCard, InlineLink, euro } from '../../kit'
import { dettagliBuoni as b } from '../../data/dataset.js'
import styles from './DettagliBuoniScreen.module.css'

export default function DettagliBuoniScreen({ onClose, onUsa }) {
  return (
    <motion.div
      className={styles.root}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
    >
      <header className={styles.nav}>
        <button className={styles.back} onClick={onClose} aria-label="Indietro">
          <Icon name="chevron-left" size={24} />
        </button>
        <span className={styles.htitle}>Dettagli</span>
        <span className={styles.hspacer} />
      </header>
      <WalletHero
        icon="utensils-solid"
        iconColor="var(--color-green-700)"
        title="Buoni pasto"
        amount={b.available}
        actions={b.actions.map((a) => ({ ...a, onClick: a.id === 'usa' ? onUsa : undefined }))}
      />

      <div className={styles.content}>
        <section className={styles.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>I Buoni Pasto attivi</h2>
            <InlineLink>Vedi tutti</InlineLink>
          </div>
          <ul className={styles.list}>
            {b.buoni.map((it, i) => (
              <motion.li
                key={it.id}
                className={styles.row}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              >
                <span className={styles.badge}>{it.count}</span>
                <div className={styles.rowMain}>
                  <span className={styles.rowCapt}>prossima scadenza</span>
                  <span className={styles.rowDate}>{it.scadenza}</span>
                </div>
                <span className={styles.rowValue}>{euro(it.value)}€</span>
              </motion.li>
            ))}
          </ul>
        </section>

        <SpendCard item={b.info} />
      </div>
    </motion.div>
  )
}
