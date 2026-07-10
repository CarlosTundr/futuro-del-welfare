import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Icon } from '../../kit'
import { wallets, dettagliBuoni } from '../../data/dataset.js'
import styles from './UsaBuoniFlow.module.css'

const eur2 = (n) => n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// tagli disponibili (dal dataset), ordinati dal più alto
const CUTS = [...dettagliBuoni.buoni]
  .map((b) => ({ value: b.value, max: b.count }))
  .sort((a, b) => b.value - a.value)

const buoniWallet = wallets.find((w) => w.id === 'buoni')
const CREDITO = buoniWallet ? buoniWallet.available : 176

// calcolo greedy dei buoni a partire da un importo (i buoni non superano lo scontrino)
function countsFromAmount(amount) {
  let rem = amount
  const c = {}
  CUTS.forEach((cut) => {
    const n = Math.min(cut.max, Math.floor((rem + 1e-9) / cut.value))
    c[cut.value] = n
    rem -= n * cut.value
  })
  return c
}

const randCode = () => String(Math.floor(1000000 + Math.random() * 9000000))

const Backspace = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7 6-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="m12 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const Barcode = () => (
  <div className={styles.barcode} aria-hidden="true">
    {Array.from({ length: 48 }).map((_, i) => (
      <span key={i} style={{ width: (i % 3) + 1 + 'px', opacity: i % 4 === 0 ? 0.4 : 1 }} />
    ))}
  </div>
)

export default function UsaBuoniFlow({ onClose }) {
  const [step, setStep] = useState('select') // select | keypad | confirm
  const [counts, setCounts] = useState(() => Object.fromEntries(CUTS.map((c) => [c.value, 0])))
  const [typed, setTyped] = useState('')
  const [scontrino, setScontrino] = useState(0) // importo inserito da keypad
  const [code, setCode] = useState(randCode)
  const [secs, setSecs] = useState(299)
  const [barcodeOpen, setBarcodeOpen] = useState(false)

  const total = useMemo(() => CUTS.reduce((s, c) => s + counts[c.value] * c.value, 0), [counts])
  const typedNum = Number(typed || 0)
  const residual = scontrino > 0 ? Math.max(0, +(scontrino - total).toFixed(2)) : 0

  useEffect(() => {
    if (step !== 'confirm') return
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [step])

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`

  const setCount = (value, delta) => {
    const cut = CUTS.find((c) => c.value === value)
    setCounts((prev) => ({ ...prev, [value]: Math.max(0, Math.min(cut.max, prev[value] + delta)) }))
  }

  const confirmKeypad = () => {
    setScontrino(typedNum)
    setCounts(countsFromAmount(typedNum))
    setStep('select')
  }

  const goConfirm = () => {
    setCode(randCode())
    setSecs(299)
    setBarcodeOpen(false)
    setStep('confirm')
  }

  const back = () => {
    if (step === 'select') onClose?.()
    else setStep('select')
  }

  const title = step === 'keypad' ? 'Inserisci importo' : 'Usa buoni'
  const breakdown = CUTS.filter((c) => counts[c.value] > 0)

  return (
    <motion.div
      className={styles.root}
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
    >
      <header className={styles.header}>
        <button className={styles.back} onClick={back} aria-label="Indietro"><Icon name="chevron-left" size={24} /></button>
        <span className={styles.htitle}>{title}</span>
        <span className={styles.hspacer} />
      </header>

      {step !== 'confirm' && (
        <div className={styles.creditBar}>
          <span className={styles.creditLabel}>Credito disponibile:</span>
          <span className={styles.creditVal}>{eur2(CREDITO)} €</span>
        </div>
      )}

      {/* STEP 1 — selezione buoni */}
      {step === 'select' && (
        <div className={styles.body}>
          <p className={styles.desc}>Inserisci l'importo manualmente o seleziona i buoni da utilizzare.</p>

          <button className={styles.amountCard} onClick={() => { setTyped(''); setStep('keypad') }}>
            <span className={styles.amountIco}>€</span>
            <span className={styles.amountText}>
              <span className={styles.amountTitle}>Inserisci tu l'importo</span>
              <span className={styles.amountSub}>Calcoleremo in automatico i buoni.</span>
            </span>
            <Icon name="chevron-right" size={24} className={styles.amountChev} />
          </button>

          {CUTS.map((c) => (
            <div key={c.value} className={styles.stepperBlock}>
              <p className={styles.stepperLabel}>Buoni da {eur2(c.value)} €</p>
              <div className={styles.stepper}>
                <button className={styles.stepBtn} onClick={() => setCount(c.value, -1)} aria-label="Meno" disabled={counts[c.value] === 0}>−</button>
                <span className={styles.stepVal}>{counts[c.value]}</span>
                <button className={styles.stepBtn} onClick={() => setCount(c.value, +1)} aria-label="Più" disabled={counts[c.value] >= c.max}>+</button>
              </div>
              <p className={styles.stepperHint}>Stai utilizzando {counts[c.value]}/{c.max} buoni</p>
            </div>
          ))}

          <div className={styles.sticky}>
            {residual > 0 && (
              <div className={styles.resid}>
                <p className={styles.residTop}>Restano <strong>{eur2(residual)}€</strong> da pagare con carta o contanti.</p>
                <p className={styles.residSub}>I buoni non possono superare lo scontrino e <strong>non danno resto.</strong></p>
              </div>
            )}
            <button className={styles.ctaPrimary} disabled={total <= 0} onClick={goConfirm}>
              {total > 0 ? `Conferma ${eur2(total)}€` : 'Conferma'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — tastierino importo */}
      {step === 'keypad' && (
        <div className={styles.body}>
          <div className={styles.amountDisplay}>
            <span className={styles.amountBig}>{typedNum}</span>
            <span className={styles.amountCur}> €</span>
          </div>
          <div className={styles.amountRule} />

          <div className={styles.kpArea}>
            <div className={styles.sticky}>
              <button className={styles.ctaYellow} disabled={typedNum <= 0} onClick={confirmKeypad}>Conferma</button>
            </div>
            <div className={styles.keypad}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                <button key={d} className={styles.key} onClick={() => setTyped((t) => (t + d).slice(0, 4))}>{d}</button>
              ))}
              <span className={styles.keyGap} />
              <button className={styles.key} onClick={() => setTyped((t) => (t + '0').slice(0, 4))}>0</button>
              <button className={styles.keyBack} onClick={() => setTyped((t) => t.slice(0, -1))} aria-label="Cancella"><Backspace /></button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — conferma con codice */}
      {step === 'confirm' && (
        <>
          <div className={styles.confScroll}>
            <div className={styles.confTop}>
              <div className={styles.illu} aria-hidden="true">
                <span className={styles.illuCard} />
                <span className={styles.illuPhone}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#009a93" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <p className={styles.confSub}>Mostra il codice al commerciante<br />per pagare con i buoni</p>
            </div>

            <div className={styles.card}>
              <p className={styles.codeLabel}>Codice da mostrare</p>
              <p className={styles.code}>{code}</p>
              <p className={styles.expire}>Scade tra {mmss}</p>

              <div className={styles.links}>
                <button className={styles.link} onClick={() => setBarcodeOpen(true)}>
                  <Icon name="eye" size={18} /> Mostra barcode
                </button>
                <button className={styles.link} onClick={() => { setCode(randCode()); setSecs(299) }}>
                  <span className={styles.refresh} aria-hidden="true">↻</span> Nuovo codice
                </button>
              </div>

              <div className={styles.payRow}>
                <div className={styles.payCol}>
                  <span className={styles.payLabel}>Stai pagando</span>
                  <span className={styles.payValue}>{eur2(total)}€</span>
                </div>
                <div className={styles.payCol}>
                  <span className={styles.payLabel}>Buoni utilizzati</span>
                  {breakdown.map((c) => (
                    <span key={c.value} className={styles.payValue}>{counts[c.value]} da {eur2(c.value)}€</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.confActions}>
            <button className={styles.ctaYellow} onClick={onClose}>Fatto</button>
            <button className={styles.ctaSecondary} onClick={onClose}>Annulla operazione</button>
          </div>
        </>
      )}

      {/* Barcode in bottom sheet */}
      <AnimatePresence>
        {barcodeOpen && (
          <>
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setBarcodeOpen(false)}
            />
            <motion.div
              className={styles.bcSheet}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            >
              <span className={styles.bcHandle} />
              <p className={styles.bcTitle}>Mostra al commerciante</p>
              <Barcode />
              <p className={styles.bcCode}>{code}</p>
              <button className={styles.ctaSecondary} onClick={() => setBarcodeOpen(false)}>Chiudi</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
