import Icon from '../Icon/Icon.jsx'
import { euroParts } from '../../utils/format.js'
import styles from './WalletHero.module.css'

/*
 WalletHero — card wallet semi-trasparente (favicon + titolo + credito) con i
 bottoni azione a cavallo del bordo inferiore. Riusabile: Dettaglio Welfare e Buoni Pasto.
 - icon/iconColor: favicon (colore diverso per wallet)
 - actions: [{ id, label, icon, onClick }] (2 o 3)
*/
export default function WalletHero({ icon, iconColor = 'var(--content-default-default)', title, amount, actions = [] }) {
  const a = euroParts(amount)
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.head}>
          <span className={styles.favicon} style={{ color: iconColor }}>
            <Icon name={icon} size={24} />
          </span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.amountBlock}>
          <span className={styles.capt}>Credito disponibile:</span>
          <div className={styles.amount}>
            <span className={styles.int}>{a.int}</span>
            <span className={styles.dec}>,{a.dec} €</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        {actions.map((ac) => (
          <button key={ac.id} className={styles.action} onClick={ac.onClick}>
            <span className={styles.navCard}><Icon name={ac.icon} size={32} /></span>
            <span className={styles.actionLabel}>{ac.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
