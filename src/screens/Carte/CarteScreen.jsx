import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { Icon, TabBar } from '../../kit'
import { bottomNav, carte } from '../../data/dataset.js'
import cardWelfare from '../../assets/card-welfare.png'
import cardBuoni from '../../assets/card-buoni.png'
import styles from './CarteScreen.module.css'

const IMG = { welfare: cardWelfare, buoni: cardBuoni }
const RATIO = 0.628 // portrait (450/716)
const GAP = 24
const N = carte.length
const CARD_W_MAX = 236

// carta verticale = PNG landscape ruotata -90°
function VCard({ id, w }) {
  const h = Math.round(w / RATIO)
  return (
    <div className={styles.vcard} style={{ width: w, height: h }}>
      <img src={IMG[id]} alt="" className={styles.vimg} style={{ width: h, height: w }} draggable="false" />
    </div>
  )
}

// slide del carosello: scala/opacità in base alla posizione (effetto coverflow)
function Slide({ x, offset, step, id, w, onClick }) {
  const range = [offset - step, offset, offset + step]
  const scale = useTransform(x, range, [0.82, 1, 0.82])
  const opacity = useTransform(x, range, [0.55, 1, 0.55])
  return (
    <motion.button className={styles.slide} style={{ scale, opacity, width: w }} onClick={onClick}>
      <VCard id={id} w={w} />
    </motion.button>
  )
}

export default function CarteScreen({ onClose, onDetail }) {
  const [index, setIndex] = useState(0)
  const [cardW, setCardW] = useState(CARD_W_MAX)
  const deckRef = useRef(null)
  const x = useMotionValue(0)
  const card = carte[index]

  // geometria del carosello, dipende da cardW
  const geo = useMemo(() => {
    const step = cardW + GAP
    const total = N * cardW + (N - 1) * GAP
    const offsetFor = (i) => total / 2 - (i * step + cardW / 2)
    return { step, total, offsetFor, cardH: Math.round(cardW / RATIO) }
  }, [cardW])

  useEffect(() => {
    document.documentElement.style.setProperty('--sb-color', '#ffffff')
    return () => document.documentElement.style.removeProperty('--sb-color')
  }, [])

  // la carta si adatta all'altezza disponibile: mai invadere "Seleziona carta"
  useLayoutEffect(() => {
    const measure = () => {
      const h = deckRef.current?.clientHeight || 0
      if (!h) return
      const avail = h - 64 // spazio per dots + margine sopra/sotto
      const cardH = Math.max(180, Math.min(380, avail))
      setCardW(Math.round(cardH * RATIO))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (deckRef.current) ro.observe(deckRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  // riallinea la posizione quando cambia la dimensione della carta
  useEffect(() => { x.set(geo.offsetFor(index)) }, [geo]) // eslint-disable-line

  const snap = (i) => {
    setIndex(i)
    animate(x, geo.offsetFor(i), { type: 'spring', stiffness: 300, damping: 34 })
  }
  const onDragEnd = (_e, info) => {
    let best = 0
    let bd = Infinity
    carte.forEach((_, i) => {
      const d = Math.abs(x.get() - geo.offsetFor(i))
      if (d < bd) { bd = d; best = i }
    })
    if (info.velocity.x < -300 && best < N - 1) best++
    else if (info.velocity.x > 300 && best > 0) best--
    snap(best)
  }
  const onCard = (i) => { if (i !== index) snap(i) }
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

      <div className={styles.deck} ref={deckRef}>
        <div className={styles.carousel} style={{ height: geo.cardH }}>
          <motion.div
            className={styles.track}
            style={{ x, marginLeft: -geo.total / 2 }}
            drag="x"
            dragConstraints={{ left: geo.offsetFor(N - 1) - 40, right: geo.offsetFor(0) + 40 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
          >
            {carte.map((c, i) => (
              <Slide key={c.id} x={x} offset={geo.offsetFor(i)} step={geo.step} id={c.id} w={cardW} onClick={() => onCard(i)} />
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
          <motion.button
            className={styles.selectBtn}
            whileTap={{ scale: 0.96 }}
            onClick={() => onDetail?.(card.id)}
          >
            Seleziona carta
            <Icon name="chevron-right" size={18} />
          </motion.button>
        </div>
        <TabBar items={bottomNav} active="carte" onChange={(id) => id === 'home' && onClose?.()} />
      </motion.div>
    </motion.div>
  )
}
