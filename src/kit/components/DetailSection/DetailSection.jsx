import Icon from '../Icon/Icon.jsx'
import styles from './DetailSection.module.css'

// Card contenitore con header (icona + titolo) + contenuto. Riusabile.
export default function DetailSection({ icon, title, children }) {
  return (
    <section className={styles.card}>
      <header className={styles.head}>
        {icon && (
          <span className={styles.ico}>
            <Icon name={icon} size={24} />
          </span>
        )}
        <h2 className={styles.title}>{title}</h2>
      </header>
      {children}
    </section>
  )
}
