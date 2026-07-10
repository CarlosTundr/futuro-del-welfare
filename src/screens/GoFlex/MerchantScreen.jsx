import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Icon, MerchantLogo, euro } from '../../kit'
import { merchants, merchantPhoto, merchantPhotoFallback } from '../../data/goflex.js'
import styles from './MerchantScreen.module.css'

export default function MerchantScreen({ merchantId, onClose }) {
  const m = merchants.find((x) => x.id === merchantId) || merchants[0]
  const cats = useMemo(() => ['Tutti', ...Array.from(new Set(m.services.map((s) => s.cat)))], [m])
  const [tab, setTab] = useState('Tutti')
  const [scrolled, setScrolled] = useState(false)
  const sede = m.sedi[0]
  const list = m.services.filter((s) => tab === 'Tutti' || s.cat === tab)

  return (
    <motion.div className={styles.root} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 36 }}>
      {/* Navbar fissa allo scroll: trasparente sull'hero, glass sfocato quando scrolli */}
      <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <button className={styles.back} onClick={onClose} aria-label="Indietro"><Icon name="chevron-left" size={24} /></button>
        <span className={styles.navTitle}>{m.name}</span>
        <span className={styles.hspacer} />
      </header>

      <div className={styles.body} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 150)}>
        {/* Cover */}
        <div className={styles.cover}>
          <img
            src={merchantPhoto(m.id)}
            alt=""
            className={styles.coverImg}
            onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = '1'; e.currentTarget.src = merchantPhotoFallback(m.id) } }}
          />
          <span className={styles.coverScrim} />
          <span className={styles.coverLogo}><MerchantLogo seed={m.id} size={64} /></span>
        </div>

        <div className={styles.content}>
          <h1 className={styles.name}>{m.name}</h1>
          <p className={styles.desc}>{m.desc}</p>
          <a className={styles.web}><Icon name="chevron-right" size={16} /> {m.website}</a>
          <p className={styles.sedi}>{m.sedi.length} sedi · {sede.address}</p>

          {/* Cosa offre qui */}
          <h2 className={styles.section}>Cosa offre qui</h2>
          <p className={styles.small}>{m.services.length} servizi in {cats.length - 1} categorie</p>
          <div className={styles.tags}>
            {m.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          {/* Servizi con tab */}
          <div className={styles.serviceTabs}>
            {cats.map((c) => (
              <button key={c} className={`${styles.stab} ${tab === c ? styles.stabActive : ''}`} onClick={() => setTab(c)}>{c}</button>
            ))}
          </div>
          <div className={styles.services}>
            {list.map((sv, i) => (
              <motion.div
                key={sv.name}
                className={styles.service}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <span className={styles.sTag}>{sv.cat}</span>
                <h3 className={styles.sName}>{sv.name}</h3>
                <p className={styles.sDesc}>{sv.desc}</p>
                <span className={styles.sPrice}>{euro(sv.price)} €</span>
              </motion.div>
            ))}
          </div>

          {/* Info partner */}
          <h2 className={styles.section}>Info Partner</h2>
          <p className={styles.info}>{m.info}</p>
        </div>
      </div>

      {/* Footer azioni */}
      <div className={styles.footer}>
        <button className={styles.primary}>Vai in sede</button>
        <button className={styles.secondary}><Icon name="pin" size={18} /> Chiama {sede.phone}</button>
      </div>
    </motion.div>
  )
}
