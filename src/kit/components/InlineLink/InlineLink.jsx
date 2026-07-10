import { motion } from 'motion/react'
import Icon from '../Icon/Icon.jsx'
import styles from './InlineLink.module.css'

/*
 InlineLink — link "Vedi tutti" (pattern DS Internal link): label + chevron.
 Condiviso tra Home movimenti, Dettaglio Buoni, ecc.
*/
export default function InlineLink({ children, onClick }) {
  return (
    <motion.button className={styles.link} onClick={onClick} whileTap={{ scale: 0.96 }}>
      <span>{children}</span>
      <Icon name="chevron-right" size={24} />
    </motion.button>
  )
}
