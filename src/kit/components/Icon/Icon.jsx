/*
 Icon — dispatcher del kit sopra il set DS reale (src/kit/icons/svgs).
 Uso: <Icon name="eye" size={24} />. Il colore si eredita da CSS (currentColor).
 Nuove icone: aggiungi un import ?raw dal set DS e mappalo in `registry`.
*/

import lightning from '../../icons/svgs/status/Lightning-solid.svg?raw'
import lightningOutline from '../../icons/svgs/status/Lightning.svg?raw'
import card from '../../icons/svgs/finance/Card.svg?raw'
import eye from '../../icons/svgs/action/Eye-open.svg?raw'
import chevronRight from '../../icons/svgs/navigation/Chevron-right.svg?raw'
import cart from '../../icons/svgs/finance/Cart.svg?raw'
import coins from '../../icons/svgs/finance/Coins.svg?raw'
import homeSolid from '../../icons/svgs/navigation/Home-solid.svg?raw'
import dashboard from '../../icons/svgs/data/Dashboard.svg?raw'
import tag from '../../icons/svgs/status/Tag.svg?raw'
import user from '../../icons/svgs/user/User.svg?raw'
import plus from '../../icons/svgs/action/Plus.svg?raw'
import utensilsIcon from '../../icons/svgs/domain/Utensils.svg?raw'
import utensilsSolid from '../../icons/svgs/domain/utensils-solid.svg?raw'
import gift from '../../icons/svgs/domain/Gift.svg?raw'
import store from '../../icons/svgs/domain/Store.svg?raw'
import cross from '../../icons/svgs/domain/Cross.svg?raw'
import deposit from '../../icons/svgs/finance/Deposit.svg?raw'
import moneyInsert from '../../icons/svgs/finance/Money-insert.svg?raw'
import question from '../../icons/svgs/action/Question.svg?raw'
import close from '../../icons/svgs/action/Close.svg?raw'
import info from '../../icons/svgs/status/Info.svg?raw'
import cardSolid from '../../icons/svgs/finance/Card-solid.svg?raw'
import awardSolid from '../../icons/svgs/domain/Award-solid.svg?raw'
import clock from '../../icons/svgs/status/Clock.svg?raw'
import chevronLeft from '../../icons/svgs/navigation/Chevron-left.svg?raw'
import pin from '../../icons/svgs/navigation/Pin.svg?raw'
import cancel from '../../icons/svgs/action/Cancel.svg?raw'
import search from '../../icons/svgs/action/Search.svg?raw'
import award from '../../icons/svgs/domain/Award.svg?raw'
import leaf from '../../icons/svgs/status/Leaf.svg?raw'
import file from '../../icons/svgs/document/File.svg?raw'
import mapIcon from '../../icons/svgs/navigation/Pin.svg?raw'

// mappa nome-app -> SVG grezzo del DS
const registry = {
  tundr: lightning,
  lightning,
  'lightning-outline': lightningOutline,
  card,
  eye,
  'chevron-right': chevronRight,
  utensils: utensilsIcon, // posate outline — movimenti food
  'utensils-solid': utensilsSolid, // posate piene — wallet Buoni Pasto
  cart, // spesa
  coins,
  'home-solid': homeSolid,
  grid: dashboard, // Servizi
  'file-heart': gift, // Promo (Gift dal DS)
  gift,
  tag,
  store,
  cross,
  deposit,
  'money-insert': moneyInsert,
  question,
  close,
  info,
  'card-solid': cardSolid,
  'award-solid': awardSolid,
  clock,
  'chevron-left': chevronLeft,
  pin,
  cancel,
  search,
  award,
  leaf,
  file,
  map: mapIcon,
  block: cancel,
  user,
  plus,
}

function colorize(raw, size, color) {
  return raw
    .replace(/width="\d+(\.\d+)?"/, `width="${size}"`)
    .replace(/height="\d+(\.\d+)?"/, `height="${size}"`)
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, `fill="${color}"`)
    .replace(/stroke="#[0-9a-fA-F]{3,8}"/g, `stroke="${color}"`)
}

export default function Icon({ name, size = 24, color = 'currentColor', className, style }) {
  const raw = registry[name]
  if (!raw) return null
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: 'inline-flex', flexShrink: 0, lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: colorize(raw, size, color) }}
    />
  )
}

export const iconNames = Object.keys(registry)
