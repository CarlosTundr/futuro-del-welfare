import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react'
import {
  TopBar,
  SegmentedControl,
  WalletCard,
  PageDots,
  MovementsSheet,
  BottomSheet,
  TabBar,
  IntroLightning,
  IntroLogo,
  IntroSplash,
} from '../../kit'
import { wallets, homeTabs, transactions, bottomNav } from '../../data/dataset.js'
import SpendiSheet from '../Spendi/SpendiSheet.jsx'
import DettagliScreen from '../Dettagli/DettagliScreen.jsx'
import DettagliBuoniScreen from '../Dettagli/DettagliBuoniScreen.jsx'
import CarteScreen from '../Carte/CarteScreen.jsx'
import CardDetailScreen from '../Carte/CardDetailScreen.jsx'
import GoFlexScreen from '../GoFlex/GoFlexScreen.jsx'
import MerchantScreen from '../GoFlex/MerchantScreen.jsx'
import FringeScreen from '../Fringe/FringeScreen.jsx'
import UsaBuoniFlow from '../Buoni/UsaBuoniFlow.jsx'
import styles from './HomeScreen.module.css'

const TABBAR_H = 84
const SHEET_TOP = 104

// intro completa solo al primo atterraggio della sessione (si resetta al reload)
let introSeen = false

export default function HomeScreen() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [tab, setTab] = useState('home')
  const [collapsedTop, setCollapsedTop] = useState(null)
  // intro a fasi: 'logo' (wordmark) -> 'bolt' (fulmine) -> 'done'.
  // Al ritorno in Home (introSeen) parte gia' da 'done', tutto smooth senza replay.
  const [phase, setPhase] = useState(
    introSeen || (typeof location !== 'undefined' && /nointro/.test(location.search)) ? 'done' : 'splash',
  )
  const revealBolt = useRef(!introSeen)
  const done = phase === 'done'
  const [spendiOpen, setSpendiOpen] = useState(false)
  const [dettagliOpen, setDettagliOpen] = useState(false)
  const [dettagliBuoniOpen, setDettagliBuoniOpen] = useState(false)
  const [carteOpen, setCarteOpen] = useState(false)
  const [cardDetailId, setCardDetailId] = useState(null)
  const [goFlexOpen, setGoFlexOpen] = useState(false)
  const [gfMerchant, setGfMerchant] = useState(null)
  const [fringeOpen, setFringeOpen] = useState(false)
  const [usaBuoniOpen, setUsaBuoniOpen] = useState(false)

  useEffect(() => {
    if (done) introSeen = true
  }, [done])

  const onWalletAction = (a) => {
    if (a.id === 'spendi') setSpendiOpen(true)
    else if (a.id === 'carta') setCarteOpen(true)
    else if (a.id === 'usa') setUsaBuoniOpen(true)
  }
  const onNav = (id) => {
    if (id === 'carte') setCarteOpen(true)
    else setTab(id)
  }

  const rootRef = useRef(null)
  const heroRef = useRef(null)

  const wallet = wallets[index]
  const theme = wallet.theme

  // progresso bottom-sheet 0(chiuso)->1(aperto): guida la parallasse
  const sheetP = useMotionValue(0)
  const heroY = useTransform(sheetP, [0, 1], [0, -26])
  const heroScale = useTransform(sheetP, [0, 1], [1, 0.93])
  const heroOpacity = useTransform(sheetP, [0, 1], [1, 0.25])
  const boltScale = useTransform(sheetP, [0, 1], [1, 1.12])

  // il collapsed dello sheet riposa sotto i dots (mai coprirli); adattivo al viewport
  useLayoutEffect(() => {
    const measure = () => {
      if (!rootRef.current || !heroRef.current) return
      const rootTop = rootRef.current.getBoundingClientRect().top
      const heroBottom = heroRef.current.getBoundingClientRect().bottom
      setCollapsedTop(Math.round(heroBottom - rootTop + 16))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (heroRef.current) ro.observe(heroRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const goTo = (next) => {
    if (next === index || next < 0 || next >= wallets.length) return
    setDir(next > index ? 1 : -1)
    setIndex(next)
  }
  const onDragEnd = (_e, info) => {
    const t = 60
    if (info.offset.x < -t) goTo(index + 1)
    else if (info.offset.x > t) goTo(index - 1)
  }

  return (
    <div className={styles.screen} ref={rootRef} style={{ '--tabbar-h': `${TABBAR_H}px` }}>
      {/* Sfondi tema in cross-fade */}
      <div className={`${styles.bg} ${styles.bgWelfare}`} style={{ opacity: theme === 'welfare' ? 1 : 0 }} />
      <div className={`${styles.bg} ${styles.bgBuoni}`} style={{ opacity: theme === 'buoni' ? 1 : 0 }} />

      {/* Fase 2+: il fulmine sale/sfoca e resta come sfondo */}
      <motion.div className={styles.boltWrap} style={{ scale: boltScale }}>
        {(phase === 'bolt' || phase === 'done') && (
          <IntroLightning color="#ffffff" reveal={revealBolt.current} onRest={() => setPhase('done')} />
        )}
      </motion.div>

      {/* Contenuto: compare quando l'intro e' finita */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <TopBar title="Home" />

        <motion.div
          className={styles.hero}
          ref={heroRef}
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          <div className={styles.segment}>
            <SegmentedControl
              items={homeTabs}
              value={wallet.id}
              onChange={(id) => goTo(homeTabs.findIndex((t) => t.id === id))}
            />
          </div>

          <motion.div
            className={styles.carousel}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={wallet.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <WalletCard
                  wallet={wallet}
                  onAction={onWalletAction}
                  onDetail={() =>
                    wallet.id === 'welfare' ? setDettagliOpen(true) : setDettagliBuoniOpen(true)
                  }
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className={styles.dots}>
            <PageDots count={wallets.length} active={index} />
          </div>
        </motion.div>
      </motion.div>

      {/* Movimenti: bottom-sheet, entra dopo l'intro e riposa sotto i dots */}
      <BottomSheet
        collapsedTop={collapsedTop}
        topOffset={SHEET_TOP}
        tabbarHeight={TABBAR_H}
        start={done}
        onProgress={(p) => sheetP.set(p)}
      >
        <MovementsSheet transactions={transactions} />
      </BottomSheet>

      <TabBar items={bottomNav} active={tab} onChange={onNav} />

      {/* Dettaglio Welfare (apre al tap su Dettagli) */}
      <AnimatePresence>
        {dettagliOpen && (
          <DettagliScreen
            key="dettagli"
            onClose={() => setDettagliOpen(false)}
            onSpendi={() => setSpendiOpen(true)}
            onGoFlex={() => setGoFlexOpen(true)}
            onFringe={() => setFringeOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Carte + dettaglio card */}
      <AnimatePresence>
        {carteOpen && (
          <CarteScreen key="carte" onClose={() => setCarteOpen(false)} onDetail={(id) => setCardDetailId(id)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cardDetailId && (
          <CardDetailScreen key="card-detail" cardId={cardDetailId} onClose={() => setCardDetailId(null)} />
        )}
      </AnimatePresence>

      {/* Dettaglio Buoni Pasto */}
      <AnimatePresence>
        {dettagliBuoniOpen && (
          <DettagliBuoniScreen
            key="dettagli-buoni"
            onClose={() => setDettagliBuoniOpen(false)}
            onUsa={() => setUsaBuoniOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Modale Spendi (apre al tap su Spendi) */}
      <AnimatePresence>
        {spendiOpen && (
          <SpendiSheet
            key="spendi"
            onClose={() => setSpendiOpen(false)}
            onGoFlex={() => { setSpendiOpen(false); setGoFlexOpen(true) }}
            onFringe={() => { setSpendiOpen(false); setFringeOpen(true) }}
          />
        )}
      </AnimatePresence>

      {/* Go Flex: catalogo merchant + dettaglio */}
      <AnimatePresence>
        {goFlexOpen && (
          <GoFlexScreen key="goflex" onClose={() => setGoFlexOpen(false)} onMerchant={(id) => setGfMerchant(id)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gfMerchant && <MerchantScreen key="merchant" merchantId={gfMerchant} onClose={() => setGfMerchant(null)} />}
      </AnimatePresence>

      {/* Fringe: lista brand (fetch dinamico dal foglio) */}
      <AnimatePresence>
        {fringeOpen && <FringeScreen key="fringe" onClose={() => setFringeOpen(false)} />}
      </AnimatePresence>

      {/* Usa Buoni: flusso pagamento buoni pasto */}
      <AnimatePresence>
        {usaBuoniOpen && <UsaBuoniFlow key="usabuoni" onClose={() => setUsaBuoniOpen(false)} />}
      </AnimatePresence>

      {/* Fase 0: splash con fulmine fermo + bottone Entra */}
      <AnimatePresence>
        {phase === 'splash' && <IntroSplash key="splash" onEnter={() => setPhase('logo')} />}
      </AnimatePresence>

      {/* Fase 1: wordmark Tundr animato (bianco, 50% larghezza, fulmine centrato) */}
      <AnimatePresence>
        {phase === 'logo' && <IntroLogo key="intro" onDone={() => setPhase('bolt')} />}
      </AnimatePresence>
    </div>
  )
}
