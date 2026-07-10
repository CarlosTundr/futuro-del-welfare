/*
 MerchantLogo — set fisso di marchi "inventati" riutilizzabili.
 Non generiamo un logo unico per ogni merchant: peschiamo in modo deterministico
 da un set condiviso (stesso seed = stesso marchio a ogni caricamento).
*/

// 8 marchi: disco colorato + glifo geometrico bianco (viewBox 24x24)
const MARKS = [
  { bg: '#1A6492', el: <><rect x="6" y="5.5" width="4.2" height="13" rx="2.1" fill="#fff" /><rect x="13.8" y="5.5" width="4.2" height="13" rx="2.1" fill="#fff" /></> },
  { bg: '#E8663A', el: <path d="M12 5 L19 18 H5 Z" fill="#fff" /> },
  { bg: '#2E9E6B', el: <><circle cx="12" cy="12" r="6.4" fill="none" stroke="#fff" strokeWidth="2.4" /><circle cx="12" cy="12" r="1.8" fill="#fff" /></> },
  { bg: '#7A5AF8', el: <><circle cx="8.5" cy="8.5" r="2.3" fill="#fff" /><circle cx="15.5" cy="8.5" r="2.3" fill="#fff" /><circle cx="8.5" cy="15.5" r="2.3" fill="#fff" /><circle cx="15.5" cy="15.5" r="2.3" fill="#fff" /></> },
  { bg: '#E23B7A', el: <path d="M5 15 L9.5 8 L12 12 L14.5 6.5 L19 15 Z" fill="#fff" /> },
  { bg: '#F2A93B', el: <path d="M12 4.5 L19.5 12 L12 19.5 L4.5 12 Z" fill="#fff" /> },
  { bg: '#14808A', el: <><path d="M6 12 A6 6 0 0 1 18 12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /><path d="M8 16.5 A4 4 0 0 1 16 16.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></> },
  { bg: '#4B4BE8', el: <><circle cx="9.5" cy="12" r="4.6" fill="none" stroke="#fff" strokeWidth="2.2" /><circle cx="14.5" cy="12" r="4.6" fill="none" stroke="#fff" strokeWidth="2.2" /></> },
]

const hash = (s = '') => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

export default function MerchantLogo({ seed = '', size = 40, ring = true }) {
  const m = MARKS[hash(seed) % MARKS.length]
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: m.bg,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        border: ring ? '2px solid var(--color-grey-0, #fff)' : 'none',
        boxShadow: ring ? '0 2px 8px rgba(39,39,38,0.2)' : 'none',
      }}
    >
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" aria-hidden="true">
        {m.el}
      </svg>
    </span>
  )
}
