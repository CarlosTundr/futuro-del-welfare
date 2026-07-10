import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useCountUp } from '../../hooks/useCountUp.js'
import { euro, euroParts } from '../../utils/format.js'
import styles from './CreditAmount.module.css'

/*
 CreditAmount — importo credito che sale da 0 quando entra in viewport.
 Layout Figma: intero grande (H1, Sofia) + ",dec €" (Inter bold) + "/ totale €" (Inter regular).
*/
export default function CreditAmount({ value, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' })
  const v = useCountUp(value, { start: inView })
  const { int, dec } = euroParts(v)
  return (
    <div className={styles.amount} ref={ref}>
      <span className={styles.int}>{int}</span>
      <span className={styles.dec}>,{dec} €</span>
      {total != null && <span className={styles.total}> / {euro(total)} €</span>}
    </div>
  )
}
