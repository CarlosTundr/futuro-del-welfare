/*
 Dataset Go Flex — catalogo merchant flexible benefit (mock).
 Categorie top-level per i chip; ogni merchant ha tag, coord (Milano), sedi e servizi.
 Sottoinsieme significativo delle categorie fornite.
*/

export const categories = [
  { id: 'all', label: 'Tutti', icon: 'grid' },
  { id: 'sport', label: 'Sport e movimento', icon: 'award' },
  { id: 'benessere', label: 'Benessere e relax', icon: 'leaf' },
  { id: 'salute', label: 'Salute', icon: 'cross' },
  { id: 'tempo', label: 'Tempo libero', icon: 'gift' },
  { id: 'formazione', label: 'Formazione', icon: 'file' },
  { id: 'famiglia', label: 'Cura dei familiari', icon: 'user' },
]

// foto open source (Unsplash) — id foto stabili, ritagliate 800x450 così riempiono sempre
const PHOTO = {
  cobra: 'photo-1549719386-74dfcbf7dbed',      // boxe
  fitlab: 'photo-1534438327276-14e5300c3a48',  // palestra / functional
  zenith: 'photo-1506126613408-eca07ce68773',  // yoga
  acquaspa: 'photo-1540555700478-4be289fbecef', // spa
  vitae: 'photo-1519494026892-80bbd2d6fd0d',   // studio medico
  sorrisi: 'photo-1588776814546-1ffcf47267a5', // dentista
  cinestar: 'photo-1489599849927-2ee91cede3ba', // cinema
  linguaviva: 'photo-1524178232363-1fb2b075b655', // aula
  piccolipassi: 'photo-1587654780291-39c9404d746b', // bambini
}
// fallback sempre disponibile (riempie 800x450) se un id non risolve
export const merchantPhotoFallback = (id) => `https://picsum.photos/seed/${id || 'store'}/800/450`
export const merchantPhoto = (id) =>
  PHOTO[id]
    ? `https://images.unsplash.com/${PHOTO[id]}?w=800&h=450&fit=crop&auto=format`
    : merchantPhotoFallback(id)

// parole chiave 2° livello (per la ricerca: "palestra", "terme", ecc.)
const KW = {
  cobra: ['palestra', 'arti marziali', 'karate', 'box', 'difesa personale'],
  fitlab: ['palestra', 'crossfit', 'fitness', 'functional'],
  zenith: ['yoga', 'pilates', 'meditazione'],
  acquaspa: ['spa', 'terme', 'benessere', 'massaggi'],
  vitae: ['poliambulatorio', 'medico', 'visite', 'check-up'],
  sorrisi: ['dentista', 'odontoiatra', 'igiene'],
  cinestar: ['cinema', 'film'],
  linguaviva: ['scuola', 'lingue', 'inglese', 'corsi'],
  piccolipassi: ['asilo', 'doposcuola', 'bambini', 'centri estivi'],
}
export const matchesQuery = (m, q) => {
  if (!q) return true
  const hay = [m.name, m.type, ...(KW[m.id] || []), ...m.tags].join(' ').toLowerCase()
  return hay.includes(q.toLowerCase())
}

// helper per generare servizi con prezzo
const s = (cat, name, desc, price) => ({ cat, name, desc, price })

export const merchants = [
  {
    id: 'cobra',
    name: 'Cobra Dojo',
    category: 'sport',
    type: 'Scuola arti marziali',
    theme: 'grey',
    coords: [45.4535, 9.1685],
    website: 'cobradojo.it',
    desc: 'Arti marziali a Milano, tre sedi. Karate, Kickboxing e difesa personale — per chi inizia e per chi compete.',
    info: 'Cobra Dojo è un dojo di arti marziali a Milano. Tre sedi — Porta Genova, NoLo, Isola — un solo principio: si suda, si impara e si vive. I corsi sono tenuti da istruttori federali FIJLKAM, con esperienza di gara e insegnamento. Gruppi per livello, dai principianti agli avanzati.',
    tags: ['Abbonamenti', 'Personal trainer', 'Corsi', 'Pacchetti stagionali'],
    sedi: [
      { id: 'c1', city: 'Milano', name: 'Porta Genova', address: 'Viale Italia 10, Milano', hours: 'Aperto dalle 6:30 alle 22:00', phone: '02 2455346' },
      { id: 'c2', city: 'Milano', name: 'NoLo', address: 'Via Padova 87, Milano', hours: 'Aperto dalle 7:00 alle 21:00', phone: '02 2445043' },
      { id: 'c3', city: 'Milano', name: 'Isola', address: 'Viale Zara 22, Milano', hours: 'Aperto dalle 6:30 alle 22:00', phone: '02 22054426' },
    ],
    services: [
      s('Abbonamenti', 'Abbonamento Early Bird', 'Accesso illimitato ai corsi dalle 07:00 alle 09:00, tutti i giorni. Per chi si allena il primo pomeriggio della mattina.', 70),
      s('Abbonamenti', 'Abbonamento Italia Unlimited', 'Accesso illimitato a tutti i corsi delle sedi di Milano. La scelta di chi fa sul serio.', 120),
      s('Personal trainer', 'Personal con il Maestro Ricci', 'Un\'ora individuale con Luca Ricci, 6° dan di karate e istruttore della nazionale amatoriale.', 60),
      s('Corsi', 'Muay Thai', 'Corso base due lezioni a settimana, martedì e giovedì. Include kit guantoni.', 90),
    ],
  },
  {
    id: 'fitlab',
    name: 'FitLab Milano',
    category: 'sport',
    type: 'Centro fitness funzionale',
    theme: 'yellow',
    coords: [45.4780, 9.1900],
    website: 'fitlab.it',
    desc: 'Functional training e sala pesi in un box CrossFit nel cuore di Milano. Community, WOD giornalieri e coach certificati.',
    info: 'FitLab è un box di functional training e CrossFit. Aperto 7 giorni su 7, con WOD programmati e open box. Coach certificati Level 2 seguono ogni sessione.',
    tags: ['Abbonamenti', 'Drop in', 'Personal training', 'Corsi'],
    sedi: [
      { id: 'f1', city: 'Milano', name: 'Città Studi', address: 'Via Celoria 14, Milano', hours: 'Aperto dalle 7:00 alle 22:30', phone: '02 87654321' },
    ],
    services: [
      s('Abbonamenti', 'Unlimited mensile', 'Accesso illimitato a tutti i WOD e alla sala pesi.', 99),
      s('Drop in', 'Ingresso singolo', 'Un WOD a scelta, prenotabile in app.', 18),
      s('Personal training', 'Pacchetto 5 sedute', 'Cinque sessioni individuali con un coach dedicato.', 250),
    ],
  },
  {
    id: 'zenith',
    name: 'Studio Zenith',
    category: 'benessere',
    type: 'Studio yoga & Pilates',
    theme: 'violet',
    coords: [45.4650, 9.1880],
    website: 'studiozenith.it',
    desc: 'Yoga, Pilates Reformer e meditazione. Uno spazio calmo a due passi dal Duomo per ritrovare equilibrio.',
    info: 'Studio Zenith propone lezioni di Hatha e Vinyasa yoga, Pilates Matwork e Reformer, e percorsi di meditazione guidata. Classi a numero chiuso.',
    tags: ['Abbonamenti', 'Carnet lezioni', 'Lezioni private', 'Workshop'],
    sedi: [
      { id: 'z1', city: 'Milano', name: 'Centro', address: 'Via Torino 45, Milano', hours: 'Aperto dalle 8:00 alle 21:00', phone: '02 33445566' },
    ],
    services: [
      s('Abbonamenti', 'Full access mensile', 'Lezioni illimitate di yoga e Matwork.', 110),
      s('Carnet lezioni', 'Carnet 10 lezioni', 'Dieci ingressi validi 3 mesi, yoga o Pilates.', 130),
      s('Lezioni private', 'Reformer one-to-one', 'Lezione individuale su macchinario Reformer.', 55),
      s('Workshop', 'Intensivo weekend', 'Due giorni di pratica e respirazione.', 90),
    ],
  },
  {
    id: 'acquaspa',
    name: 'Acqua Spa',
    category: 'benessere',
    type: 'Spa e centro benessere',
    theme: 'green',
    coords: [45.4700, 9.1750],
    website: 'acquaspa.it',
    desc: 'Percorso benessere, massaggi e rituali di coppia. Una pausa rigenerante in città.',
    info: 'Acqua Spa offre un percorso benessere con sauna, bagno turco e vasche idromassaggio, oltre a trattamenti viso e corpo e massaggi.',
    tags: ['Percorso benessere', 'Massaggi', 'Rituali', 'Day spa'],
    sedi: [
      { id: 'a1', city: 'Milano', name: 'Brera', address: 'Via Solferino 8, Milano', hours: 'Aperto dalle 10:00 alle 22:00', phone: '02 99887766' },
    ],
    services: [
      s('Percorso benessere', 'Ingresso percorso 2h', 'Sauna, bagno turco, vasche e area relax.', 45),
      s('Massaggi', 'Massaggio decontratturante', 'Cinquanta minuti, focus su schiena e spalle.', 70),
      s('Rituali', 'Rituale di coppia', 'Percorso benessere + massaggio per due.', 160),
    ],
  },
  {
    id: 'vitae',
    name: 'Centro Medico Vitae',
    category: 'salute',
    type: 'Poliambulatorio',
    theme: 'indaco',
    coords: [45.4620, 9.2010],
    website: 'centrovitae.it',
    desc: 'Visite specialistiche, check-up e diagnostica in un unico centro. Prenotazione rapida e teleconsulto.',
    info: 'Il Centro Medico Vitae riunisce specialisti di diverse discipline, un servizio di diagnostica per immagini e pacchetti di prevenzione personalizzati.',
    tags: ['Visite specialistiche', 'Check-up', 'Teleconsulto', 'Prevenzione'],
    sedi: [
      { id: 'v1', city: 'Milano', name: 'Porta Romana', address: 'Corso Lodi 30, Milano', hours: 'Aperto dalle 8:00 alle 20:00', phone: '02 11223344' },
    ],
    services: [
      s('Visite specialistiche', 'Visita cardiologica', 'Visita con ECG a riposo inclusa.', 120),
      s('Check-up', 'Check-up completo', 'Esami del sangue, visita e refertazione.', 190),
      s('Teleconsulto', 'Teleconsulto specialistico', 'Videoconsulto di 30 minuti con lo specialista.', 45),
    ],
  },
  {
    id: 'sorrisi',
    name: 'Studio Sorrisi',
    category: 'salute',
    type: 'Studio dentistico',
    theme: 'green',
    coords: [45.4560, 9.1980],
    website: 'studiosorrisi.it',
    desc: 'Igiene, conservativa e ortodonzia. Un sorriso in salute con un team gentile.',
    info: 'Studio Sorrisi è uno studio dentistico con focus su prevenzione e ortodonzia invisibile. Prima visita sempre gratuita.',
    tags: ['Igiene dentale', 'Ortodonzia', 'Sbiancamento', 'Prevenzione'],
    sedi: [
      { id: 's1', city: 'Milano', name: 'Centrale', address: 'Via Vitruvio 12, Milano', hours: 'Aperto dalle 9:00 alle 19:00', phone: '02 55667788' },
    ],
    services: [
      s('Igiene dentale', 'Igiene e pulizia', 'Detartrasi, air-flow e lucidatura.', 80),
      s('Sbiancamento', 'Sbiancamento professionale', 'Trattamento in studio in un\'unica seduta.', 250),
      s('Ortodonzia', 'Consulenza allineatori', 'Valutazione e piano di trattamento invisibile.', 60),
    ],
  },
  {
    id: 'cinestar',
    name: 'CineStar',
    category: 'tempo',
    type: 'Cinema',
    theme: 'sand',
    coords: [45.4810, 9.2050],
    website: 'cinestar.it',
    desc: 'Multisala con sale premium e rassegne. Biglietti, carnet e abbonamenti.',
    info: 'CineStar è una multisala con 8 sale, tecnologia laser e poltrone reclinabili nelle sale premium.',
    tags: ['Biglietti singoli', 'Carnet ingressi', 'Abbonamenti', 'Eventi'],
    sedi: [
      { id: 'ci1', city: 'Milano', name: 'Loreto', address: 'Piazzale Loreto 5, Milano', hours: 'Aperto dalle 14:00 alle 24:00', phone: '02 66778899' },
    ],
    services: [
      s('Biglietti singoli', 'Biglietto sala premium', 'Poltrona reclinabile, proiezione laser.', 15),
      s('Carnet ingressi', 'Carnet 5 ingressi', 'Cinque biglietti validi 6 mesi.', 55),
      s('Abbonamenti', 'Abbonamento mensile', 'Film illimitati, escluse anteprime.', 22),
    ],
  },
  {
    id: 'linguaviva',
    name: 'Lingua Viva',
    category: 'formazione',
    type: 'Scuola di lingue',
    theme: 'yellow',
    coords: [45.4680, 9.1720],
    website: 'linguaviva.it',
    desc: 'Corsi di lingue in piccoli gruppi e lezioni individuali. In sede e online.',
    info: 'Lingua Viva offre corsi di inglese, spagnolo, tedesco e francese, con docenti madrelingua e preparazione alle certificazioni.',
    tags: ['Corsi di gruppo', 'Lezioni individuali', 'Corsi intensivi', 'Online'],
    sedi: [
      { id: 'l1', city: 'Milano', name: 'Sant\'Ambrogio', address: 'Via De Amicis 20, Milano', hours: 'Aperto dalle 9:00 alle 21:00', phone: '02 44556677' },
    ],
    services: [
      s('Corsi di gruppo', 'Inglese B1 — trimestre', 'Due lezioni a settimana in piccoli gruppi.', 240),
      s('Lezioni individuali', 'Pacchetto 10 lezioni', 'Lezioni one-to-one con docente madrelingua.', 350),
      s('Corsi intensivi', 'Intensivo estivo', 'Due settimane, tutti i giorni.', 290),
    ],
  },
  {
    id: 'piccolipassi',
    name: 'Piccoli Passi',
    category: 'famiglia',
    type: 'Centri estivi e doposcuola',
    theme: 'violet',
    coords: [45.4590, 9.1620],
    website: 'piccolipassi.it',
    desc: 'Doposcuola, laboratori e centri estivi per bambini. Educatori qualificati.',
    info: 'Piccoli Passi propone doposcuola con supporto compiti, laboratori tematici e centri estivi settimanali con full e half day.',
    tags: ['Doposcuola', 'Centri estivi', 'Laboratori', 'Full day'],
    sedi: [
      { id: 'p1', city: 'Milano', name: 'Navigli', address: 'Ripa di Porta Ticinese 40, Milano', hours: 'Aperto dalle 7:30 alle 18:30', phone: '02 33221100' },
    ],
    services: [
      s('Doposcuola', 'Pacchetto mensile', 'Supporto compiti pomeridiano, dal lunedì al venerdì.', 180),
      s('Centri estivi', 'Settimana full day', 'Attività, laboratori e mensa inclusa.', 160),
      s('Laboratori', 'Laboratorio creativo', 'Ciclo di 4 incontri tematici.', 60),
    ],
  },
]

// posizione utente mock (Milano centro)
export const userLocation = [45.4642, 9.19]

/*
 Cloud di pin sparsi sull'area metropolitana: ogni pin punta a un merchant reale.
 Servono a dare l'effetto "sposto la mappa e compaiono altri partner": la lista
 visibile viene filtrata sui bounds correnti (vedi GoFlexScreen).
 Coordinate generate in modo deterministico (nessun random a ogni render).
*/
const BOX = { latMin: 45.38, latMax: 45.56, lngMin: 9.08, lngMax: 9.31 }
export const pins = (() => {
  const out = []
  const cols = 9
  const rows = 8
  let n = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const m = merchants[n % merchants.length]
      // jitter deterministico dentro la cella
      const jx = ((n * 37) % 100) / 100 - 0.5
      const jy = ((n * 53) % 100) / 100 - 0.5
      const lat = BOX.latMin + ((r + 0.5 + jy * 0.7) / rows) * (BOX.latMax - BOX.latMin)
      const lng = BOX.lngMin + ((c + 0.5 + jx * 0.7) / cols) * (BOX.lngMax - BOX.lngMin)
      out.push({ id: `${m.id}-${n}`, merchantId: m.id, category: m.category, coords: [lat, lng] })
      n++
    }
  }
  // aggiungo anche le sedi "reali" dei merchant, in cima
  merchants.forEach((m) => out.push({ id: `real-${m.id}`, merchantId: m.id, category: m.category, coords: m.coords }))
  return out
})()

export default { categories, merchants, userLocation, pins }
