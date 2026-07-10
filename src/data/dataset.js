/*
 Dataset del prototipo Welfare Generali (mock).
 Basato sul frame Figma "Home - Welfare" (10018:15521).
 Importi in numero: la formattazione euro passa da kit/utils/format.
*/

export const user = {
  firstName: 'Marco',
  lastName: 'Rossi',
  company: 'Generali',
  greeting: 'Ciao Marco',
}

/*
 I due borsellini (wallet) della Home. Ognuno porta il proprio tema:
 lo switch cambia contenuto E colore di sfondo (requisito).
 `theme` mappa una classe in HomeScreen -> gradiente su token.
*/
export const wallets = [
  {
    id: 'welfare',
    label: 'Welfare',
    icon: 'tundr',
    theme: 'welfare', // giallo Tundr
    available: 1345.5,
    detail: {
      fringe: { available: 350.5, total: 500, label: 'credito fringe' },
      flexible: { available: 1345.5, total: 2000, label: 'credito flexible benefit' },
    },
    actions: [
      { id: 'spendi', label: 'Spendi', icon: 'card', variant: 'dark' },
      { id: 'carta', label: 'Vedi carta', icon: 'eye', variant: 'light' },
    ],
  },
  {
    id: 'buoni',
    label: 'Buoni Pasto',
    icon: 'utensils-solid',
    theme: 'buoni', // verde/teal (PROVVISORIO: da confermare col frame BP)
    available: 176.0,
    detail: {
      value: 8.0, // valore singolo buono
      count: 22,
    },
    actions: [
      { id: 'usa', label: 'Usa Buoni', icon: 'tag', variant: 'dark' },
      { id: 'dove', label: 'Dove spendere', icon: 'pin', variant: 'light' },
      { id: 'carta', label: 'Vedi carta', icon: 'card', variant: 'light' },
    ],
  },
]

// Segmented control della Home (deriva dai wallet)
export const homeTabs = wallets.map((w) => ({ id: w.id, label: w.label }))

// Movimenti recenti — CROSS (validi per entrambi i wallet)
export const transactions = [
  { id: 't1', merchant: 'Esselunga',                 date: '2026-07-02T12:34:00', amount: -16.0,   meta: '2 Buoni Pasto',  icon: 'utensils' },
  { id: 't2', merchant: 'Accredito Buoni Pasto',     date: '2026-07-02T08:02:00', amount: +160.0,  meta: '20 Buoni Pasto', icon: 'utensils' },
  { id: 't3', merchant: 'Abbonamento FitPrime',      date: '2026-06-19T19:57:00', amount: -120.5,  meta: 'Welfare',        icon: 'coins' },
  { id: 't4', merchant: 'Versamento Fondo Pensione', date: '2026-06-19T19:57:00', amount: -500.0,  meta: 'Welfare',        icon: 'coins' },
  { id: 't5', merchant: 'Rimborso trasporti',        date: '2026-06-15T16:40:00', amount: +54.0,   meta: 'Welfare',        icon: 'coins' },
]

// Bottom navigation
export const bottomNav = [
  { id: 'home',    label: 'Home',    icon: 'home-solid' },
  { id: 'carte',   label: 'Carte',   icon: 'card' },
  { id: 'servizi', label: 'Servizi', icon: 'grid' },
  { id: 'promo',   label: 'Promo',   icon: 'gift' },
]

// Schermata Spendi (Welfare). theme = colore accent dell'icon tag.
export const spendiWelfare = {
  available: 1345.5,
  channel: 'Carta',
  // opzioni spendibili tramite Carta
  cardOptions: [
    {
      id: 'fringe',
      icon: 'store',
      theme: 'grey',
      title: 'Fringe',
      desc: 'Spendi in negozio e online. Scopri i negozi convenzionati.',
      footer: { label: 'Puoi spendere fino a:', value: 500 },
    },
    {
      id: 'goflex',
      icon: 'lightning',
      theme: 'yellow',
      title: 'Go Flex',
      desc: 'Niente più voucher e regole. Scegli il servizio e pagalo con la Carta.',
      badge: 'Novità',
    },
  ],
  // altri canali
  others: [
    { id: 'cassa', icon: 'cross', theme: 'sand', title: 'Cassa Sanitaria', desc: 'Ottieni rimborsi per visite, esami, farmaci, fisioterapia e psicoterapia' },
    { id: 'fondo', icon: 'deposit', theme: 'green', title: 'Fondo pensione', desc: 'Versa nel tuo fondo di previdenza complementare.' },
    { id: 'voucher', icon: 'tag', theme: 'violet', title: 'Voucher', desc: 'Crea il voucher per la categoria che ti interessa.' },
    { id: 'rimborsi', icon: 'money-insert', theme: 'indaco', title: 'Rimborsi', desc: 'Recupera le spese per te o i tuoi familiari.' },
  ],
}

// Dettaglio wallet Welfare (riusa gli item di spendiWelfare dove possibile)
export const dettagliWelfare = {
  available: 1345.5,
  info: { id: 'info', icon: 'clock', theme: 'grey', title: 'Come funziona?', desc: 'Scopri tutto quello che devi sapere sul Welfare' },
  fringe: {
    icon: 'card-solid',
    title: 'Il tuo credito fringe',
    label: 'Credito fringe disponibile:',
    value: 350.5,
    total: 500,
    link: 'Cosa è il credito fringe?',
    usedWith: [
      { id: 'fringe', icon: 'store', theme: 'grey', title: 'Fringe', desc: 'Spendi in negozio e online. Scopri i negozi convenzionati.' },
    ],
  },
  flexible: {
    icon: 'award-solid',
    title: 'Il tuo credito flexible benefit',
    label: 'Credito flexible disponibile:',
    value: 1345.5,
    total: 2000,
    note: 'Tutto il credito Welfare compreso il credito Fringe',
    usedWith: [
      { id: 'goflex', icon: 'lightning-outline', theme: 'yellow', title: 'Go Flex', desc: 'Spendi in negozio. Scopri i negozi convenzionati.' },
      { id: 'cassa', icon: 'cross', theme: 'sand', title: 'Cassa Sanitaria', desc: 'Tipologie di locale e Mappa' },
      { id: 'fondo', icon: 'deposit', theme: 'green', title: 'Fondo pensione', desc: 'Versa nel tuo fondo di previdenza complementare.' },
      { id: 'voucher', icon: 'tag', theme: 'violet', title: 'Voucher', desc: 'Crea il voucher per la categoria che ti interessa.' },
      { id: 'rimborsi', icon: 'money-insert', theme: 'indaco', title: 'Rimborsi', desc: 'Recupera le spese per te o i tuoi familiari.' },
    ],
  },
}

// Dettaglio wallet Buoni Pasto (tema teal)
export const dettagliBuoni = {
  available: 160,
  actions: [
    { id: 'usa', label: 'Usa buoni', icon: 'tag' },
    { id: 'dove', label: 'Dove spendere', icon: 'pin' },
    { id: 'carta', label: 'Vedi carta', icon: 'card' },
  ],
  buoni: [
    { id: 'b1', count: 8, scadenza: '31/12/2026', value: 7.5 },
    { id: 'b2', count: 6, scadenza: '31/12/2027', value: 4.5 },
  ],
  info: { id: 'info', icon: 'question', theme: 'grey', title: 'Come funziona?', desc: 'Scopri come funzionano i Buoni Pasto Pellegrini' },
}

// Carte + dettaglio card. `pageBg` = colore carta -10 lightness (sfondo pagina Carte).
export const carte = [
  {
    id: 'welfare',
    title: 'Carta Welfare',
    icon: 'lightning',
    iconColor: '#fdb015',
    faviconPale: 'var(--accent-yellow-default-pale, #ffebb4)',
    pageBg: '#1e1e1d',
    actions: [
      { id: 'dati', label: 'Vedi dati', icon: 'eye' },
      { id: 'pin', label: 'Mostra PIN', icon: 'eye' },
      { id: 'blocca', label: 'Blocca', icon: 'block' },
    ],
    rows: [
      { id: 'dove', icon: 'store', theme: 'grey', title: 'Dove usarla', desc: 'Tipologie di negozio e mappa' },
      { id: 'come', icon: 'card', theme: 'grey', title: 'Come usarla', desc: 'Come usare i buoni e la carta fisica' },
    ],
  },
  {
    id: 'buoni',
    title: 'Carta Buoni Pasto',
    icon: 'utensils-solid',
    iconColor: '#007d74',
    faviconPale: 'var(--accent-green-default-pale, #b3e0e0)',
    pageBg: '#8f1414',
    actions: [
      { id: 'dati', label: 'Vedi dati', icon: 'eye' },
      { id: 'blocca', label: 'Blocca', icon: 'block' },
    ],
    rows: [
      { id: 'dove', icon: 'store', theme: 'grey', title: 'Dove usarla', desc: 'Tipologie di negozio e mappa' },
      { id: 'come', icon: 'card', theme: 'grey', title: 'Come usarla', desc: 'Come usare i buoni e la carta fisica' },
    ],
  },
]

// Schermata Servizi (catalogo). Riusa gli item di spendiWelfare + una card Buoni pasto.
export const servizi = {
  intro: {
    title: 'Non solo una carta',
    sub: 'Con Tundr puoi utilizzare il tuo credito welfare a tuo piacimento.',
  },
  welfare: {
    icon: 'tundr',
    title: 'Welfare',
    desc: 'Ecco i servizi dove spendere il tuo welfare, dal fringe al flex.',
    items: [...spendiWelfare.cardOptions, ...spendiWelfare.others],
  },
  buoni: {
    icon: 'utensils-solid',
    title: 'Buoni pasto',
    desc: 'Il servizio è in partnership con Pellegrini. Scegli un locale aderente nella sezione "Dove spendere" e paga direttamente con la carta o l\'app.',
    items: [
      { id: 'bp', icon: 'tag', theme: 'green', title: 'Buoni pasto Pellegrini', desc: 'Usa il credito per pranzi e spesa nei locali che aderiscono a Pellegrini.' },
    ],
  },
}

export default { user, wallets, homeTabs, transactions, bottomNav, spendiWelfare, dettagliWelfare, dettagliBuoni, carte, servizi }
