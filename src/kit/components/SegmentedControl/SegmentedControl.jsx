import { motion } from 'motion/react'
import styles from './SegmentedControl.module.css'

/*
 SegmentedControl — toggle pill (Welfare / Buoni Pasto).
 La pill attiva scorre con layoutId (animazione shared-layout di Motion).
*/
export default function SegmentedControl({ items, value, onChange }) {
  return (
    <div className={styles.track} role="tablist">
      {items.map((it) => {
        const active = it.id === value
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={active}
            className={`${styles.segment} ${active ? styles.active : ''}`}
            onClick={() => onChange(it.id)}
          >
            {active && (
              <motion.span
                layoutId="segmentPill"
                className={styles.pill}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className={styles.label}>{it.label}</span>
          </button>
        )
      })}
    </div>
  )
}
