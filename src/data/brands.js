/*
 Catalogo brand del Fringe benefit.
 I dati NON sono hardcoded: vengono letti a runtime dal foglio Google (endpoint
 gviz, CORS abilitato). I loghi restano linkati direttamente dal CDN Tundr,
 non vengono scaricati nel codice.
 Sorgente: https://docs.google.com/spreadsheets/d/1sjI8Pc1pM5ThoFXVqHOWxcgWX0lTYaus9ceCehfwz8A
*/

const SHEET_ID = '1sjI8Pc1pM5ThoFXVqHOWxcgWX0lTYaus9ceCehfwz8A'
const GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`
const CDN = 'https://cdn2.tundr.tech/app/brands'

export const brandLogo = (slug) => `${CDN}/${slug}.png`

// Ordine di presentazione delle categorie (spelling esatto del foglio).
export const CATEGORY_ORDER = [
  'Alimentari',
  'Shopping',
  'Elettronica ed Elettrodomestici',
  'Beauty e Cura del corpo',
  'Casa e Fai da te',
  'Esperienze e Svago',
  'Benessere',
  'Accessori e Lifestyle',
  'Streaming',
  'Green Mobility',
  'Carburante',
  'Ricarica elettrica',
  'Trasporto pubblico',
]

// Brand "riconoscibili" da mostrare in cima ad ogni categoria (subset curato).
// Sono solo slug: nome/logo/disponibilità arrivano comunque dal fetch runtime.
export const FEATURED = new Set([
  'eni', 'q8', 'esso', 'tamoil', 'ip', 'total-erg',
  'enel-x', 'be-charge', 'ionity', 'tesla', 'a2a',
  'trenitalia', 'italo', 'flixbus', 'atm-milano', 'amt-genova', 'trenord', 'busitalia',
  'bikemi', 'lime', 'dott', 'helbiz', 'enjoy', 'bird', 'pandora',
  'decathlon', 'amazon', 'zalando', 'zara', 'nike', 'adidas', 'benetton', 'ovs', 'feltrinelli', 'mondadori', 'yoox', 'asos', 'bata',
  'esselunga', 'conad', 'carrefour', 'coop', 'lidl',
  'sephora', 'douglas', 'tigota', 'marionnaud',
  'leroy-merlin', 'ikea', 'mondo-convenienza',
  'mediaworld', 'unieuro', 'apple', 'samsung', 'dell', 'huawei',
  'netflix', 'spotify', 'dazn',
])

// Fetch + parse una sola volta per sessione (cache di promise).
let cache
export function fetchBrands() {
  if (cache) return cache
  cache = fetch(GVIZ)
    .then((r) => r.text())
    .then((t) => {
      const json = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1))
      const rows = json.table.rows || []
      const cell = (r, i) => (r.c[i] && r.c[i].v != null ? String(r.c[i].v).trim() : '')
      return rows
        .map((r) => ({ category: cell(r, 0), name: cell(r, 1), slug: cell(r, 2), store: cell(r, 3) }))
        // scarta header ("Categoria") e righe vuote
        .filter((b) => b.slug && b.name && b.category && b.category !== 'Categoria')
        .map((b) => ({ ...b, online: b.store === 'DIGITAL_ONLY' }))
    })
    .catch(() => [])
  return cache
}

/*
 Costruisce le sezioni per la vista di default (subset curato).
 Per ogni categoria: prima i FEATURED, poi riempie fino a `cap` con gli altri.
*/
export function curatedSections(brands, { cap = 8 } = {}) {
  const byCat = {}
  brands.forEach((b) => { (byCat[b.category] = byCat[b.category] || []).push(b) })
  const cats = CATEGORY_ORDER.filter((c) => byCat[c])
  return cats.map((cat) => {
    const list = byCat[cat]
    const featured = list.filter((b) => FEATURED.has(b.slug))
    const rest = list.filter((b) => !FEATURED.has(b.slug))
    return { cat, items: [...featured, ...rest].slice(0, Math.max(cap, featured.length)) }
  })
}

// Tutti i brand di una categoria (featured in cima), per la vista "chip selezionato".
export function categoryList(brands, cat, { cap = 60 } = {}) {
  const list = brands.filter((b) => b.category === cat)
  const featured = list.filter((b) => FEATURED.has(b.slug))
  const rest = list.filter((b) => !FEATURED.has(b.slug))
  return [...featured, ...rest].slice(0, cap)
}

// Ricerca su tutto il catalogo per nome.
export function searchBrands(brands, q) {
  const query = q.trim().toLowerCase()
  if (!query) return []
  return brands.filter((b) => b.name.toLowerCase().includes(query)).slice(0, 120)
}
