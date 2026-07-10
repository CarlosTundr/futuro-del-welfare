import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, MerchantLogo } from '../../kit'
import { categories, merchants, userLocation, merchantPhoto, merchantPhotoFallback, matchesQuery, pins } from '../../data/goflex.js'
import awardRaw from '../../kit/icons/svgs/domain/Award.svg?raw'
import leafRaw from '../../kit/icons/svgs/status/Leaf.svg?raw'
import crossRaw from '../../kit/icons/svgs/domain/Cross.svg?raw'
import giftRaw from '../../kit/icons/svgs/domain/Gift.svg?raw'
import fileRaw from '../../kit/icons/svgs/document/File.svg?raw'
import userRaw from '../../kit/icons/svgs/user/User.svg?raw'
import styles from './GoFlexScreen.module.css'

// pin colorato per categoria con l'icona relativa.
// Ogni categoria ha un accent del DS (bg pin + colore icona per contrasto).
const CAT_ICON = { sport: awardRaw, benessere: leafRaw, salute: crossRaw, tempo: giftRaw, formazione: fileRaw, famiglia: userRaw }
const CAT_COLOR = {
  sport: { bg: '#fdbe19', fg: '#272726' },      // accent yellow
  benessere: { bg: '#009a93', fg: '#ffffff' },  // accent green
  salute: { bg: '#0049fb', fg: '#ffffff' },     // accent indaco
  tempo: { bg: '#930af5', fg: '#ffffff' },       // accent violet
  formazione: { bg: '#795d3c', fg: '#ffffff' },  // accent sand
  famiglia: { bg: '#686867', fg: '#ffffff' },    // grey
}
const colorize = (raw, fill) =>
  raw.replace(/width="\d+"/, 'width="18"').replace(/height="\d+"/, 'height="18"').replace(/fill="#[0-9a-fA-F]{3,8}"/g, `fill="${fill}"`)
const PINS = {}
const pinFor = (cat) => {
  if (PINS[cat]) return PINS[cat]
  const { bg, fg } = CAT_COLOR[cat] || CAT_COLOR.sport
  const icon = colorize(CAT_ICON[cat] || awardRaw, fg)
  PINS[cat] = L.divIcon({
    className: '',
    html: `<div style="width:40px;height:40px;border-radius:50% 50% 50% 0;background:${bg};border:2px solid #fff;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,.3);display:grid;place-items:center"><div style="transform:rotate(45deg);line-height:0">${icon}</div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })
  return PINS[cat]
}
const userPin = L.divIcon({
  className: '',
  html: '<div style="width:18px;height:18px;border-radius:50%;background:#1a6492;border:3px solid #fff;box-shadow:0 0 0 6px rgba(26,100,146,.25)"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

// I pin vengono ricalcolati a ogni spostamento/zoom: mostro solo quelli nei bounds correnti.
function DynamicPins({ data, onMerchant }) {
  const [bounds, setBounds] = useState(null)
  const map = useMapEvents({
    moveend: () => setBounds(map.getBounds()),
    zoomend: () => setBounds(map.getBounds()),
  })
  useEffect(() => { setBounds(map.getBounds()) }, [map])

  const visible = useMemo(() => {
    if (!bounds) return []
    return data.filter((p) => bounds.contains(p.coords)).slice(0, 80)
  }, [bounds, data])

  return visible.map((p) => (
    <Marker key={p.id} position={p.coords} icon={pinFor(p.category)} eventHandlers={{ click: () => onMerchant?.(p.merchantId) }} />
  ))
}

function MerchantCard({ m, onClick, index }) {
  const oneSede = m.sedi.length === 1
  return (
    <motion.button
      className={styles.card}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <span className={styles.cover}>
        <img
          src={merchantPhoto(m.id)}
          alt=""
          className={styles.coverImg}
          loading="lazy"
          onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = '1'; e.currentTarget.src = merchantPhotoFallback(m.id) } }}
        />
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardHead}>
          <span className={styles.logo}><MerchantLogo seed={m.id} size={40} /></span>
          <span className={styles.cardTitles}>
            <span className={styles.cardName}>{m.name}</span>
            <span className={styles.cardSub}>{oneSede ? m.sedi[0].address : `${m.sedi.length} sedi`}</span>
          </span>
        </span>
        <span className={styles.tags}>
          {m.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
        </span>
      </span>
    </motion.button>
  )
}

export default function GoFlexScreen({ onClose, onMerchant }) {
  const [view, setView] = useState('map')
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  // merchant per la lista (unici)
  const list = useMemo(
    () => merchants.filter((m) => (cat === 'all' || m.category === cat) && matchesQuery(m, query.trim())),
    [cat, query],
  )

  // pin per la mappa: cloud filtrato per categoria + ricerca (lookup sul merchant)
  const byId = useMemo(() => Object.fromEntries(merchants.map((m) => [m.id, m])), [])
  const mapPins = useMemo(
    () => pins.filter((p) => (cat === 'all' || p.category === cat) && matchesQuery(byId[p.merchantId], query.trim())),
    [cat, query, byId],
  )

  // scroll orizzontale dei chip con drag del mouse + rotellina (oltre al touch)
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
  const onWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) chipsRef.current.scrollLeft += e.deltaY
  }

  return (
    <motion.div className={styles.root} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 36 }}>
      {/* Nav fissa */}
      <div className={styles.top}>
        <header className={styles.nav}>
          <button className={styles.iconBtn} onClick={onClose} aria-label="Indietro"><Icon name="chevron-left" size={24} /></button>
          <span className={styles.htitle}>Go Flex</span>
          <div className={styles.toggle}>
            <button className={view === 'map' ? styles.tOn : styles.tOff} onClick={() => setView('map')} aria-label="Mappa"><Icon name="map" size={18} /></button>
            <button className={view === 'list' ? styles.tOn : styles.tOff} onClick={() => setView('list')} aria-label="Lista"><Icon name="grid" size={18} /></button>
          </div>
        </header>

        <div className={styles.searchRow}>
          <span className={styles.searchIcon}><Icon name="search" size={20} /></span>
          <input className={styles.search} placeholder="Cerca partner o categoria (es. Palestra)" value={query} onChange={(e) => setQuery(e.target.value)} />
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
          {categories.map((c) => (
            <button
              key={c.id}
              className={`${styles.chip} ${cat === c.id ? styles.chipActive : ''}`}
              onClick={() => { if (drag.current.moved < 6) setCat(c.id) }}
            >
              <Icon name={c.icon} size={16} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corpo */}
      <div className={styles.body}>
        {view === 'map' ? (
          <div className={styles.mapWrap}>
            <MapContainer center={userLocation} zoom={13} className={styles.map} zoomControl={false} attributionControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              <Marker position={userLocation} icon={userPin} />
              <DynamicPins data={mapPins} onMerchant={onMerchant} />
            </MapContainer>
          </div>
        ) : (
          <div className={styles.listWrap}>
            {list.length === 0 && <p className={styles.empty}>Nessun partner trovato.</p>}
            {list.map((m, i) => (
              <MerchantCard key={m.id} m={m} index={i} onClick={() => onMerchant?.(m.id)} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
