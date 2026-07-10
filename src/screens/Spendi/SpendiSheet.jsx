import { motion } from 'motion/react'
import { Icon, SpendCard, euro } from '../../kit'
import { spendiWelfare } from '../../data/dataset.js'
import cardImg from '../../assets/tundr-card.png'
import styles from './SpendiSheet.module.css'

/*
 SpendiSheet — modale che sale dal basso sopra la Home oscurata.
 Va renderizzata dentro <AnimatePresence> dal parent (monta/smonta su open).
*/
export default function SpendiSheet({ onClose, onGoFlex, onFringe }) {
  return (
    <div className={styles.root}>
      <motion.div
        className={styles.scrim}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.sheet}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      >
        <header className={styles.header}>
          <button className={styles.close} onClick={onClose} aria-label="Chiudi">
            <Icon name="close" size={24} />
          </button>
          <span className={styles.htitle}>Spendi</span>
          <span className={styles.hspacer} />
        </header>

        <div className={styles.body}>
          {/* Box Welfare */}
          <div className={styles.walletBox}>
            <span className={styles.favicon}><Icon name="tundr" size={22} /></span>
            <span className={styles.wlabel}>Welfare</span>
            <span className={styles.wcredit}>
              <span className={styles.wcapt}>Credito disponibile:</span>
              <span className={styles.wval}>{euro(spendiWelfare.available)} €</span>
            </span>
          </div>

          {/* Sezione Carta */}
          <section className={styles.section}>
            <div className={styles.cartaHead}>
              <div className={styles.cartaText}>
                <p className={styles.small}>Spendi solo tramite:</p>
                <p className={styles.cartaTitle}>
                  Carta <Icon name="question" size={20} className={styles.q} />
                </p>
              </div>
              <img className={styles.cardImg} src={cardImg} alt="Tundr Card" />
            </div>
            <div className={styles.cards}>
              {spendiWelfare.cardOptions.map((o, i) => (
                <SpendCard
                  key={o.id}
                  item={o}
                  index={i}
                  onClick={() => {
                    if (o.id === 'goflex') onGoFlex?.()
                    else if (o.id === 'fringe') onFringe?.()
                  }}
                />
              ))}
            </div>
          </section>

          {/* Spendi anche con */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Spendi anche con:</h2>
            <div className={styles.cards}>
              {spendiWelfare.others.map((o, i) => (
                <SpendCard key={o.id} item={o} index={i} />
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
