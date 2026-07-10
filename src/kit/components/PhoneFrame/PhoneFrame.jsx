import { forwardRef } from 'react'
import styles from './PhoneFrame.module.css'

/*
 PhoneFrame — mockup smartphone.
 - Desktop: cornice iPhone (dynamic island, bezel, ombra) + status bar finta.
 - Mobile (<=480px): la cornice sparisce, contenuto full-bleed a tutto schermo.
 Il contenuto scrolla dentro `.screen` (ref esposto -> aggancio Lenis).
*/
const PhoneFrame = forwardRef(function PhoneFrame(
  { children, statusBar = true, time = '9:41' },
  ref,
) {
  return (
    <div className={styles.stage}>
      <div className={styles.device}>
        <div className={styles.island} aria-hidden="true" />
        <div className={styles.screen} ref={ref}>
          {/* viewport: unico figlio scrollabile (Lenis misura questo) */}
          <div className={styles.viewport}>
            {statusBar && (
              <div className={styles.statusBar} aria-hidden="true">
                <span className={styles.time}>{time}</span>
                <span className={styles.icons}>
                  <SignalIcon /> <WifiIcon /> <BatteryIcon />
                </span>
              </div>
            )}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
  )
}
function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2C11.7 2 14.6 3.3 16.7 5.3l-1.6 1.7C13.4 5.3 11 4.3 8.5 4.3S3.6 5.3 1.9 7L.3 5.3C2.4 3.3 5.3 2 8.5 2Zm0 3.6c1.9 0 3.6.7 4.9 2l-1.7 1.7c-.8-.8-1.9-1.3-3.2-1.3s-2.4.5-3.2 1.3L3.6 7.6c1.3-1.3 3-2 4.9-2Zm0 3.6c.9 0 1.7.4 2.3 1L8.5 12 6.2 9.8c.6-.6 1.4-1 2.3-1Z"/></svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.7" y="0.7" width="22" height="11.6" rx="3" stroke="currentColor" strokeOpacity="0.4"/><rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.3c1 .4 1 3 0 3.4V4.3Z" fill="currentColor" fillOpacity="0.4"/></svg>
  )
}

export default PhoneFrame
