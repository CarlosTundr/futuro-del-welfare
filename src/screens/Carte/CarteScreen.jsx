import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { Icon, InlineLink, TabBar } from '../../kit'
import { bottomNav, carte } from '../../data/dataset.js'
import cardWelfare from '../../assets/card-welfare.png'
import cardBuoni from '../../assets/card-buoni.png'
import styles from './CarteScreen.module.css'

const IMG = { welfare: cardWelfare, buoni: cardBuoni }
const CARD_W = 236
const GAP = 24
const STEP = CARD_W + GAP
const N = carte.length
const TOTAL = N * CARD_W + (N - 1) * GAP
const offsetFor = (i) => TOTAL / 2 - (i * STEP + CARD_W / 2)

// carta verticale = PNG landscape ruotata -90°
function VCard({ id, w = CARD_W }) {
  const h = Math.round(w / 0.628) // ratio carta croppata (450/716)
  return (
    <div className={styles.vcard} style={{ width: w, height: h }}>
      <img src={IMG[id]} alt="" className={styles.vimg} style={{ width: h, height: w }} draggable="false" />
    </div>
  )
}

// slide del carosello: scala/opacità in base alla posizione (effetto coverflow)
function Slide({ x, i, id, onClick }) {
  const range = [offsetFor(i) - STEP, offsetFor(i), offsetFor(i) + STEP]
  const scale = useTransform(x, range, [0.82, 1, 0.82])
  const opacity = useTransform(x, range, [0.55, 1, 0.55])
  return (
    <motion.button className={styles.slide} style={{ scale, opacity }} onClick={onClick}>
      <VCard id={id} />
    </motion.button>
  )
}

export default function CarteScreen({ onClose, onDetail }) {
  const [index, setIndex] = useState(0)
  const x = useMotionValue(offsetFor(0))
  const card = carte[index]

  useEffect(() => {
    document.documentElement.style.setProperty('--sb-color', '#ffffff')
    return () => document.documentElement.style.removeProperty('--sb-color')
  }, [])

  const snap = (i) => {
    setIndex(i)
    animate(x, offsetFor(i), { type: 'spring', stiffness: 300, damping: 34 })
  }
  const onDragEnd = (_e, info) => {
    let best = 0
    let bd = Infinity
    carte.forEach((_, i) => {
      const d = Math.abs(x.get() - offsetFor(i))
      if (d < bd) { bd = d; best = i }
    })
    if (info.velocity.x < -300 && best < N - 1) best++
    else if (info.velocity.x > 300 && best > 0) best--
    snap(best)
  }
  // tap su una carta laterale la centra; sulla carta attiva non fa nulla
  // (al dettaglio si entra solo da "Seleziona carta")
  const onCard = (i) => {
    if (i !== index) snap(i)
  }
  const fade = (delay) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  })

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: card.pageBg }}
      exit={{ opacity: 0 }}
      transition={{ backgroundColor: { duration: 0.5 }, opacity: { duration: 0.3 } }}
    >
      <motion.header className={styles.header} {...fade(0.05)}>
        <span className={styles.htitle}>Carte</span>
      </motion.header>

      <motion.div className={styles.hero} {...fade(0.12)}>
        <span className={styles.favicon}><Icon name={card.icon} size={22} color={card.iconColor} /></span>
        <h1 className={styles.title}>{card.title}</h1>
        <span className={styles.badge}>Attiva</span>
      </motion.div>

      <div className={styles.deck}>
        <div className={styles.carousel}>
          <motion.div
            className={styles.track}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: offsetFor(N - 1) - 40, right: offsetFor(0) + 40 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
          >
            {carte.map((c, i) => (
              <Slide key={c.id} x={x} i={i} id={c.id} onClick={() => onCard(i)} />
            ))}
          </motion.div>
        </div>
        <div className={styles.dots}>
          {carte.map((c, i) => (
            <button key={c.id} className={`${styles.dot} ${i === index ? styles.dotActive : ''}`} onClick={() => snap(i)} aria-label={c.title} />
          ))}
        </div>
      </div>

      <motion.div className={styles.sheet} {...fade(0.1)}>
        <div className={styles.selezione}>
          <InlineLink onClick={() => onDetail?.(card.id)}>Seleziona carta</InlineLink>
        </div>
        <TabBar items={bottomNav} active="carte" onChange={(id) => id === 'home' && onClose?.()} />
      </motion.div>
    </motion.div>
  )
}
