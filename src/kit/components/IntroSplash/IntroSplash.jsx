import { motion } from 'motion/react'
import Icon from '../Icon/Icon.jsx'
import styles from './IntroSplash.module.css'

/*
 IntroSplash — schermata iniziale gate.
 Fulmine fermo (statico) al centro + bottone "Entra" centrato in basso.
 Al tap chiama onEnter, che avvia l'intro animata (come oggi).
*/
export default function IntroSplash({ onEnter }) {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className={styles.bolt}>
        <Icon name="lightning" size={150} color="#ffffff" />
      </span>

      <div className={styles.footer}>
        <motion.button
          className={styles.enter}
          onClick={onEnter}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          Entra
        </motion.button>
      </div>
    </motion.div>
  )
}
