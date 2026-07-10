import { motion } from 'motion/react'
import Icon from '../Icon/Icon.jsx'
import { euro } from '../../utils/format.js'
import styles from './SpendCard.module.css'

/*
 SpendCard — riga-card di spesa: icon tag colorato (tema accent), titolo, desc, chevron.
 Badge opzionale (es. "Novità") e footer info opzionale (es. plafond Fringe) che
 spunta DA SOTTO la card (strip incastrata dietro), come da Figma.
*/
export default function SpendCard({ item, index = 0, onClick }) {
  const { icon, theme = 'grey', title, desc, badge, footer, round } = item
  return (
    <motion.button
      type="button"
      className={styles.wrapper}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.06 }}
    >
      <div className={styles.card}>
        <span className={styles.tag} data-theme={theme} data-round={round ? 'true' : undefined}>
          <Icon name={icon} size={24} />
        </span>
        <span className={styles.box}>
          <span className={styles.titleRow}>
            <span className={styles.title}>{title}</span>
            {badge && <span className={styles.badge}>{badge}</span>}
          </span>
          {desc && <span className={styles.desc}>{desc}</span>}
        </span>
        <Icon name="chevron-right" size={24} className={styles.chev} />
      </div>

      {footer && (
        <div className={styles.footer}>
          <span>{footer.label}</span>
          <strong className={styles.footerValue}>{euro(footer.value)} €</strong>
          <Icon name="info" size={16} />
        </div>
      )}
    </motion.button>
  )
}
