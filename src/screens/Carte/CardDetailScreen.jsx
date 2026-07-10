import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Icon, SpendCard } from '../../kit'
import { carte } from '../../data/dataset.js'
import cardWelfare from '../../assets/card-welfare.png'
import cardBuoni from '../../assets/card-buoni.png'
import styles from './CardDetailScreen.module.css'

const IMG = { welfare: cardWelfare, buoni: cardBuoni }

export default function CardDetailScreen({ cardId = 'welfare', onClose }) {
  const card = carte.find((c) => c.id === cardId) || carte[0]

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.getPropertyValue('--sb-color')
    root.style.setProperty('--sb-color', '#272726')
    return () => {
      if (prev) root.style.setProperty('--sb-color', prev)
      else root.style.removeProperty('--sb-color')
    }
  }, [])

  // le UI (tranne la carta) compaiono dopo la rotazione della carta
  const reveal = (delay) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay },
  })

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.header className={styles.nav} {...reveal(0.08)}>
        <button className={styles.back} onClick={onClose} aria-label="Indietro">
          <Icon name="chevron-left" size={24} />
        </button>
        <span className={styles.htitle}>Dettaglio</span>
        <span className={styles.hspacer} />
      </motion.header>

      <div className={styles.body}>
        <motion.div className={styles.hero} {...reveal(0.15)}>
          <span className={styles.favicon} style={{ background: card.faviconPale }}>
            <Icon name={card.icon} size={22} color={card.iconColor} />
          </span>
          <h1 className={styles.title}>{card.title}</h1>
          <span className={styles.badge}>Attiva</span>
        </motion.div>

        {/* continuità: la carta entra verticale (come in Carte) e ruota in orizzontale */}
        <div className={styles.cardWrap}>
          <motion.img
            src={IMG[card.id]}
            alt={card.title}
            className={styles.card}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.div className={styles.actions} {...reveal(0.15)}>
          {card.actions.map((a) => (
            <button key={a.id} className={styles.action}>
              <span className={styles.actionCard}><Icon name={a.icon} size={24} /></span>
              <span className={styles.actionLabel}>{a.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div className={styles.rows} {...reveal(0.22)}>
          {card.rows.map((r, i) => (
            <SpendCard key={r.id} item={r} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
