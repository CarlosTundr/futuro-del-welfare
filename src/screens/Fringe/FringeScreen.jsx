import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '../../kit'
import {
  fetchBrands, brandLogo, CATEGORY_ORDER,
  curatedSections, categoryList, searchBrands,
} from '../../data/brands.js'
import styles from './FringeScreen.module.css'

function BrandRow({ b, index }) {
  return (
    <motion.button
      className={styles.row}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.02, 0.3) }}
    >
      <span className={styles.logo}>
        <img
          src={brandLogo(b.slug)}
          alt=""
          loading="lazy"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />
      </span>
      <span className={styles.info}>
        <span className={styles.name}>{b.name}</span>
        <span className={styles.sub}>{b.category}</span>
      </span>
      {b.online && <span className={styles.badge}>Solo online</span>}
    </motion.button>
  )
}

export default function FringeScreen({ onClose }) {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let alive = true
    fetchBrands().then((b) => { if (alive) { setBrands(b); setLoading(false) } })
    return () => { alive = false }
  }, [])

  // categorie realmente presenti nei dati, nell'ordine definito
  const cats = useMemo(() => {
    const present = new Set(brands.map((b) => b.category))
    return CATEGORY_ORDER.filter((c) => present.has(c))
  }, [brands])

  const q = query.trim()
  const sections = useMemo(() => {
    if (q) return null
    if (cat === 'all') return curatedSections(brands, { cap: 8 })
    return [{ cat, items: categoryList(brands, cat, { cap: 60 }) }]
  }, [brands, cat, q])
  const results = useMemo(() => (q ? searchBrands(brands, query) : []), [brands, query, q])

  // scroll orizzontale chip con drag del mouse + rotellina
  const chipsRef = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: 0 })
  const onDown = (e) => { drag.current = { down: true, x: e.clientX, left: chipsRef.current.scrollLeft, moved: 0 } }
  const onMove = (e) => {
    if (!drag.current.down) return
    const dx = e.clientX - drag.current.x
    drag.current.moved += Math.abs(dx)
    chipsRef.current.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => { drag.current.down = false }
  const onWheel = (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) chipsRef.current.scrollLeft += e.deltaY }

  return (
    <motion.div
      className={styles.root}
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
    >
      <div className={styles.top}>
        <header className={styles.nav}>
          <button className={styles.back} onClick={onClose} aria-label="Indietro"><Icon name="chevron-left" size={24} /></button>
          <span className={styles.htitle}>Lista brand</span>
          <span className={styles.hspacer} />
        </header>

        {/* Ricerca sempre visibile (stesso pattern di Go Flex) */}
        <div className={styles.searchRow}>
          <span className={styles.searchIcon}><Icon name="search" size={20} /></span>
          <input
            className={styles.search}
            placeholder="Cerca un brand"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div
          className={styles.chips}
          ref={chipsRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onWheel={onWheel}
        >
          <button className={`${styles.chip} ${cat === 'all' ? styles.chipActive : ''}`} onClick={() => { if (drag.current.moved < 6) setCat('all') }}>Tutti</button>
          {cats.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${cat === c ? styles.chipActive : ''}`}
              onClick={() => { if (drag.current.moved < 6) setCat(c) }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {loading ? (
          <div className={styles.skeletonWrap}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeleton}>
                <span className={styles.skLogo} />
                <span className={styles.skText} />
              </div>
            ))}
          </div>
        ) : q ? (
          <div className={styles.section}>
            {results.length === 0
              ? <p className={styles.empty}>Nessun brand trovato.</p>
              : results.map((b, i) => <BrandRow key={b.slug} b={b} index={i} />)}
          </div>
        ) : (
          sections.map((s) => (
            <section key={s.cat} className={styles.section}>
              <h2 className={styles.secTitle}>{s.cat}</h2>
              {s.items.map((b, i) => <BrandRow key={b.slug} b={b} index={i} />)}
            </section>
          ))
        )}
      </div>
    </motion.div>
  )
}
