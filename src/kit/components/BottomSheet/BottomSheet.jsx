import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import styles from './BottomSheet.module.css'

/*
 BottomSheet — pannello che entra da sotto e ha 2 stati:
 - collapsed: mostra solo il "peek" (maniglia + testa + primi item)
 - expanded: si apre tutto
 Si apre/chiude con tap sulla maniglia o swipe (drag verticale). Snap a molla.
 Riporta il progresso 0(collapsed)->1(expanded) via onProgress (per parallasse hero).
*/
export default function BottomSheet({
  children,
  collapsedTop, // px dal top dello screen dove riposa da chiuso (sotto i dots)
  peek = 300,
  topOffset = 60,
  tabbarHeight = 84,
  start = true, // avvia l'ingresso da sotto (dopo l'intro)
  onProgress,
}) {
  const ref = useRef(null)
  const y = useMotionValue(0)
  const [maxY, setMaxY] = useState(320)
  const placedOffscreen = useRef(false)
  const entered = useRef(false)

  // altezza adattiva al viewport; il collapsed riposa sotto i dots
  useLayoutEffect(() => {
    const measure = () => {
      const parent = ref.current?.offsetParent
      const ph = parent?.clientHeight ?? 800
      const sheetH = ph - topOffset - tabbarHeight
      const restTop = collapsedTop != null ? collapsedTop : topOffset + Math.max(140, sheetH - peek)
      const collapsed = Math.min(sheetH, Math.max(0, restTop - topOffset))
      setMaxY(collapsed)
      if (!placedOffscreen.current && !entered.current) {
        placedOffscreen.current = true
        y.set(ph) // parte fuori schermo, sotto
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (ref.current?.offsetParent) ro.observe(ref.current.offsetParent)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsedTop, peek, topOffset, tabbarHeight])

  // ingresso da sotto: atterra ESATTAMENTE sul collapsed (tween, nessun overshoot
  // -> non copre mai i dots). Parte quando `start` diventa true (fine intro).
  useEffect(() => {
    if (start && !entered.current) {
      entered.current = true
      animate(y, maxY, { duration: 0.7, ease: [0.16, 1, 0.3, 1] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, maxY])

  // progresso per la parallasse
  useEffect(() => {
    const report = () => onProgress?.(maxY ? Math.min(1, Math.max(0, 1 - y.get() / maxY)) : 0)
    const unsub = y.on('change', report)
    report()
    return () => unsub()
  }, [maxY, onProgress, y])

  const snap = (target) => animate(y, target, { type: 'spring', stiffness: 320, damping: 34 })
  const toggle = () => snap(y.get() > maxY / 2 ? 0 : maxY)
  const onDragEnd = (_e, info) => {
    const open = info.velocity.y < -350 || (info.velocity.y <= 350 && y.get() < maxY / 2)
    snap(open ? 0 : maxY)
  }

  return (
    <motion.section
      ref={ref}
      className={styles.sheet}
      style={{ y, top: topOffset, bottom: tabbarHeight }}
      drag="y"
      dragConstraints={{ top: 0, bottom: maxY }}
      dragElastic={0.05}
      onDragEnd={onDragEnd}
    >
      <button className={styles.grip} onClick={toggle} aria-label="Apri o chiudi i movimenti">
        <span className={styles.handle} />
      </button>
      <div className={styles.body}>{children}</div>
    </motion.section>
  )
}
