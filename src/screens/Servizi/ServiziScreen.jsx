import { motion } from 'motion/react'
import { Icon, SpendCard, TabBar } from '../../kit'
import { bottomNav, servizi as s } from '../../data/dataset.js'
import styles from './ServiziScreen.module.css'

function Section({ data, delay = 0, faviconBg, iconColor, onItem }) {
  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.favicon} style={{ background: faviconBg }}>
          <Icon name={data.icon} size={22} color={iconColor} />
        </span>
        <h2 className={styles.secTitle}>{data.title}</h2>
      </div>
      <p className={styles.secDesc}>{data.desc}</p>
      <div className={styles.cards}>
        {data.items.map((it, i) => (
          <SpendCard key={it.id} item={it} index={i + delay} onClick={() => onItem(it.id)} />
        ))}
      </div>
    </section>
  )
}

export default function ServiziScreen({ onClose, onNav, onFringe, onGoFlex }) {
  const onItem = (id) => {
    if (id === 'fringe') onFringe?.()
    else if (id === 'goflex') onGoFlex?.()
  }

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <header className={styles.nav}>
        <button className={styles.back} onClick={onClose} aria-label="Indietro"><Icon name="chevron-left" size={24} /></button>
        <span className={styles.htitle}>Servizi</span>
        <span className={styles.hspacer} />
      </header>

      <div className={styles.body}>
        <div className={styles.intro}>
          <h1 className={styles.introTitle}>{s.intro.title}</h1>
          <p className={styles.introSub}>{s.intro.sub}</p>
        </div>

        <Section data={s.welfare} faviconBg="var(--color-yellow-400, #fec82f)" iconColor="var(--content-default-default)" onItem={onItem} />
        <Section data={s.buoni} delay={6} faviconBg="#d3eaea" iconColor="var(--color-green-700, #007d74)" onItem={onItem} />
      </div>

      <TabBar items={bottomNav} active="servizi" onChange={onNav} />
    </motion.div>
  )
}
