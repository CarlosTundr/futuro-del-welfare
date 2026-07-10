import Icon from '../Icon/Icon.jsx'
import styles from './TopBar.module.css'

// Barra superiore: avatar sx, titolo centrale, avatar profilo dx.
export default function TopBar({ title = 'Home' }) {
  return (
    <header className={styles.bar}>
      <span className={styles.spacer} aria-hidden="true" />
      <h1 className={styles.title}>{title}</h1>
      <button className={styles.avatar} aria-label="Profilo">
        <Icon name="user" size={20} />
      </button>
    </header>
  )
}
