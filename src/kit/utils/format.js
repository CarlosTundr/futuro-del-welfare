// Formattazione euro stile IT: 1.345,50 (punto migliaia, virgola decimali).
// Manuale, indipendente da Intl/ICU per garantire il separatore in ogni ambiente.
export function euro(value, { decimals = true } = {}) {
  const n = Math.abs(Number(value) || 0)
  const fixed = decimals ? n.toFixed(2) : String(Math.round(n))
  const [intPart, decPart] = fixed.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return decimals ? `${grouped},${decPart}` : grouped
}

// Ritorna { int, dec } per stilare i centesimi piu piccoli (es. int "1.345", dec "50")
export function euroParts(value) {
  const [int, dec = '00'] = euro(value).split(',')
  return { int, dec }
}
