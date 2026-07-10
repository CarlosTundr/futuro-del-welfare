import { motion } from 'motion/react'
import { Icon, WalletHero, SpendCard, DetailSection, ProgressBar, CreditAmount } from '../../kit'
import { wallets, dettagliWelfare as d } from '../../data/dataset.js'
import styles from './DettagliScreen.module.css'

const welfare = wallets.find((w) => w.id === 'welfare')

export default function DettagliScreen({ onClose, onSpendi, onGoFlex, onFringe }) {
  const openUsed = (id) => {
    if (id === 'goflex') onGoFlex?.()
    else if (id === 'fringe') onFringe?.()
  }
  return (
    <motion.div
      className={styles.root}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
    >
      {/* Top giallo: header + wallet card */}
      <header className={styles.nav}>
        <button className={styles.back} onClick={onClose} aria-label="Indietro">
          <Icon name="chevron-left" size={24} />
        </button>
        <span className={styles.htitle}>Dettagli</span>
        <span className={styles.hspacer} />
      </header>
      <WalletHero
        icon="lightning"
        title="Welfare"
        amount={welfare.available}
        actions={[
          { id: 'spendi', label: 'Spendi', icon: 'card', onClick: () => onSpendi?.() },
          { id: 'carta', label: 'Vedi carta', icon: 'eye' },
        ]}
      />

      <div className={styles.content}>
        {/* Link informativo (riusa SpendCard) */}
        <SpendCard item={d.info} />

        {/* Credito fringe: cifra + barra animate */}
        <DetailSection icon={d.fringe.icon} title={d.fringe.title}>
          <div className={styles.block}>
            <p className={styles.label}>{d.fringe.label}</p>
            <CreditAmount value={d.fringe.value} total={d.fringe.total} />
            <ProgressBar value={d.fringe.value} total={d.fringe.total} delay={0.35} />
            <button className={styles.link}>
              <Icon name="question" size={16} />
              {d.fringe.link}
            </button>
          </div>
          <div className={styles.block}>
            <p className={styles.usedLabel}>Utilizzalo con</p>
            <div className={styles.cards}>
              {d.fringe.usedWith.map((it, i) => (
                <SpendCard key={it.id} item={it} index={i} onClick={() => openUsed(it.id)} />
              ))}
            </div>
          </div>
        </DetailSection>

        {/* Credito flexible benefit */}
        <DetailSection icon={d.flexible.icon} title={d.flexible.title}>
          <div className={styles.block}>
            <p className={styles.label}>{d.flexible.label}</p>
            <CreditAmount value={d.flexible.value} total={d.flexible.total} />
            <div className={styles.infoLine}>
              <Icon name="info" size={24} />
              <span>{d.flexible.note}</span>
            </div>
          </div>
          <div className={styles.block}>
            <p className={styles.usedLabel}>Utilizzalo con</p>
            <div className={styles.cards}>
              {d.flexible.usedWith.map((it, i) => (
                <SpendCard key={it.id} item={it} index={i} onClick={() => openUsed(it.id)} />
              ))}
            </div>
          </div>
        </DetailSection>
      </div>
    </motion.div>
  )
}
