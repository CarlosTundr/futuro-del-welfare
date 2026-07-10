import Icon from '../Icon/Icon.jsx'
import styles from './TabBar.module.css'

// Bottom navigation. Fissa in basso (sticky) dentro lo screen.
export default function TabBar({ items, active, onChange }) {
  return (
    <nav className={styles.bar}>
      {items.map((it) => {
        const isActive = it.id === active
        return (
          <button
            key={it.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => onChange?.(it.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon name={it.icon} size={24} />
            <span className={styles.label}>{it.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
