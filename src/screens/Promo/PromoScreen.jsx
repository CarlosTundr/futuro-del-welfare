import { motion } from 'motion/react'
import { Icon, InlineLink, TabBar } from '../../kit'
import { bottomNav, promo as p } from '../../data/dataset.js'
import styles from './PromoScreen.module.css'

const storeImg = (img) => `https://images.unsplash.com/${img}?w=200&h=200&fit=crop&auto=format`
const storeFallback = (id) => `https://picsum.photos/seed/${id}/200/200`

function StoreCard({ s, index }) {
  return (
    <motion.button
      className={styles.card}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.05 + index * 0.06 }}
    >
      <span className={styles.thumb}>
        <img
          src={storeImg(s.img)}
          alt=""
          loading="lazy"
          onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = '1'; e.currentTarget.src = storeFallback(s.id) } }}
        />
      </span>
      <span className={styles.box}>
        <span className={styles.dist}><Icon name="pin" size={16} /> {s.dist}</span>
        <span className={styles.name}>{s.name}</span>
        <span className={styles.desc}>{s.desc}</span>
      </span>
      <Icon name="chevron-right" size={24} className={styles.chev} />
    </motion.button>
  )
}

export default function PromoScreen({ onClose, onNav }) {
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
        <span className={styles.htitle}>Promo</span>
        <span className={styles.hspacer} />
      </header>

      <div className={styles.body}>
        <div className={styles.intro}>
          <h1 className={styles.introTitle}>{p.intro.title}</h1>
          <p className={styles.introSub}>{p.intro.sub}</p>
        </div>

        <button className={styles.cityBtn}>
          <Icon name="pin" size={20} />
          {p.city}
        </button>

        <p className={styles.count}>{p.count} negozi trovati</p>

        <div className={styles.list}>
          {p.stores.map((s, i) => <StoreCard key={s.id} s={s} index={i} />)}
        </div>

        <div className={styles.more}>
          <InlineLink>Vedi altri negozi</InlineLink>
        </div>
      </div>

      <TabBar items={bottomNav} active="promo" onChange={onNav} />
    </motion.div>
  )
}
