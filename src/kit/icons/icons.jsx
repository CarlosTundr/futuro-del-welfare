/**
 * Icone SVG inline.
 * Ogni icona accetta { size, color } via prop. Default = currentColor → eredita dal parent.
 * Aggiungi nuove icone qui per averle in un unico punto.
 *
 * Le icone badge (CardPlusIcon, CoinsIcon, FileIcon) sono caricate direttamente
 * dal DS locale tramite import ?raw per evitare errori di trascrizione manuale.
 */

import cardPlusRaw from './svgs/finance/Card-plus.svg?raw'
import cardRaw from './svgs/finance/Card.svg?raw'
import cardBlockRaw from './svgs/finance/Card-block.svg?raw'
import coinsRaw from './svgs/finance/Coins.svg?raw'
import fileRaw from './svgs/document/File.svg?raw'
import plusRaw from './svgs/action/Plus.svg?raw'
import penRaw from './svgs/action/Pen.svg?raw'
import trashRaw from './svgs/action/Trash.svg?raw'
import calendarRaw from './svgs/document/Calendar.svg?raw'
import dashboardRaw from './svgs/data/Dashboard.svg?raw'
import buildingRaw from './svgs/domain/Building.svg?raw'
import receiptRaw from './svgs/finance/Receipt.svg?raw'
import euroRaw from './svgs/finance/Euro.svg?raw'
import settingsRaw from './svgs/action/Settings.svg?raw'
import refreshRaw from './svgs/action/Refresh.svg?raw'
import chevronRightRaw from './svgs/navigation/Chevron-right.svg?raw'
import chevronLeftRaw from './svgs/navigation/Chevron-left.svg?raw'
import chevronUpRaw from './svgs/navigation/Chevron-up.svg?raw'
import lightningSolidRaw from './svgs/status/Lightning-solid.svg?raw'
import lightningRaw from './svgs/status/Lightning.svg?raw'
import dashboardSolidRaw from './svgs/data/Dashboard-solid.svg?raw'
import storeRaw from './svgs/domain/Store.svg?raw'
import folderRaw from './svgs/document/Folder.svg?raw'
import wrenchRaw from './svgs/action/Wrench.svg?raw'
import optionsRaw from './svgs/action/Options.svg?raw'
import switchRaw from './svgs/action/Switch.svg?raw'
import signoutRaw from './svgs/action/Signout.svg?raw'
import storeSolidRaw from './svgs/domain/Store-solid.svg?raw'
import folderSolidRaw from './svgs/document/Folder-solid.svg?raw'
import receiptSolidRaw from './svgs/finance/Receipt-solid.svg?raw'
import fileSolidRaw from './svgs/document/File-solid.svg?raw'
import wrenchSolidRaw from './svgs/action/Wrench-solid.svg?raw'

function RawSvgIcon({ raw, size = 24, color = 'currentColor' }) {
  const svg = raw
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`)
    .replace(/fill="#[0-9a-fA-F]+"/g, `fill="${color}"`)
  return (
    <span
      aria-hidden="true"
      style={{ display: 'inline-flex', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export function LightningIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={lightningSolidRaw} size={size} color={color} />
}

export function LightningOutlineIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={lightningRaw} size={size} color={color} />
}

export function UserIcon({ size = 24, color = 'currentColor' }) {
  // Avatar utente (cerchio + figura)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="10" r="3.2" stroke={color} strokeWidth="1.6" />
      <path
        d="M5.5 19c1.4-2.8 3.9-4.2 6.5-4.2s5.1 1.4 6.5 4.2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function StoreIcon({ size = 80, color = 'currentColor' }) {
  // Icona Store-solid dal DS Tundr — projects/tundr-ds/icons/domain/Store-solid.svg
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.4758 8.38037C21.4704 8.3584 21.4725 8.33606 21.4639 8.31445L21.4612 8.30768L21.4595 8.30365L19.4639 3.31445C19.3884 3.12439 19.2045 2.9997 19 3H5C4.79553 2.9997 4.61157 3.12439 4.53613 3.31445L2.54047 8.30365L2.53882 8.30768L2.53613 8.31445C2.52673 8.33801 2.52869 8.36224 2.52301 8.38617C2.51398 8.42377 2.5 8.45966 2.5 8.5C2.5 8.50256 2.50073 8.50488 2.50073 8.50745C2.50079 8.51001 2.50146 8.51233 2.50153 8.51489C2.50806 9.69544 3.09998 10.7344 4 11.3645V21.5C4.00018 21.776 4.224 22.0002 4.5 22H14.5H19.5C19.7759 21.9998 20.0002 21.776 20 21.5V11.3645C20.9004 10.7341 21.4925 9.6947 21.4986 8.51355L21.4991 8.50855C21.4991 8.50562 21.5 8.50293 21.5 8.5C21.5 8.45758 21.4858 8.41974 21.4758 8.38037ZM19 21H15V14.5C14.9998 14.2241 14.776 13.9998 14.5 14H9.5C9.224 14.0002 8.99982 14.224 9 14.5V21H5V11.8364C5.31885 11.9323 5.65002 11.9996 6 12C7.28156 11.9985 8.3902 11.3016 9 10.2736C9.6098 11.3016 10.7184 11.9985 12 12C13.2816 11.9985 14.3902 11.3016 15 10.2736C15.6098 11.3016 16.7184 11.9985 18 12C18.35 11.9996 18.6812 11.9323 19 11.8364V21Z"
        fill={color}
      />
    </svg>
  )
}

export function PinIcon({ size = 24, color = 'currentColor' }) {
  // Pin outline dal DS Tundr — projects/prototipi/packages/tundr-ui/src/icons/svgs/navigation/Pin.svg
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5.99998C9.51469 5.99998 7.49998 8.01469 7.49998 10.5C7.49998 12.9853 9.51469 15 12 15C14.4841 14.9973 16.4973 12.9841 16.5 10.5C16.5 8.01469 14.4853 5.99998 12 5.99998ZM12 14C10.067 14 8.49998 12.433 8.49998 10.5C8.49998 8.567 10.067 6.99998 12 6.99998C13.932 7.0023 15.4977 8.56798 15.5 10.5C15.5 12.433 13.933 14 12 14ZM18.0107 4.48924C14.6911 1.1696 9.30888 1.1696 5.98924 4.48924C2.6696 7.80888 2.6696 13.1911 5.98924 16.5107L11.6465 22.167C11.7401 22.2609 11.8674 22.3136 12 22.3135C12.1326 22.3136 12.2599 22.2609 12.3535 22.167L18.0107 16.5107C21.3304 13.1911 21.3304 7.80888 18.0107 4.48924ZM17.3037 15.8037L12 21.1064L6.69627 15.8037C3.76714 12.8746 3.76714 8.12541 6.69627 5.19627C9.62541 2.26714 14.3746 2.26714 17.3037 5.19627C20.2328 8.12541 20.2328 12.8746 17.3037 15.8037Z"
        fill={color}
      />
    </svg>
  )
}

export function PinSolidIcon({ size = 24, color = 'currentColor' }) {
  // Pin solid dal DS Tundr — projects/prototipi/packages/tundr-ui/src/icons/svgs/navigation/Pin-solid.svg
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 4.50002C14.7 1.20002 9.30002 1.20002 6.00002 4.50002C2.70002 7.80002 2.70002 13.2 6.00002 16.5L11.3 21.8C11.7 22.2 12.3 22.2 12.7 21.8L18 16.5C21.3 13.1 21.3 7.80002 18 4.50002ZM12 14.8C9.60002 14.8 7.70002 12.9 7.70002 10.5C7.70002 8.10002 9.60002 6.10002 12 6.10002C14.4 6.10002 16.3 8.00002 16.3 10.4C16.3 12.8 14.4 14.8 12 14.8Z"
        fill={color}
      />
    </svg>
  )
}

export function FolderIcon({ size = 80, color = 'currentColor' }) {
  // Folder-solid dal DS Tundr — projects/tundr-ds/icons/document/Folder-solid.svg
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.8 10.4C22.6 10.1 22.3 10 22 10H20V9C20 7.3 18.7 6 17 6H10.7L10.4 5C10 3.8 8.8 3 7.6 3H4C2.3 3 1 4.3 1 6V18C1 19.7 2.3 21 4 21H18.4C19.8 21 21 20 21.3 18.7L23 11.3C23.1 10.9 23 10.6 22.8 10.4ZM19.4 18.2C19.3 18.7 18.9 19 18.4 19H7.2C7.3 18.9 7.3 18.8 7.3 18.7L8.8 12H20.8L19.4 18.2Z"
        fill={color}
      />
    </svg>
  )
}

export function ListIcon({ size = 24, color = 'currentColor' }) {
  // List dal DS Tundr — projects/tundr-ds/icons/data/List.svg
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 12C3.22388 12 3 12.2239 3 12.5C3 12.7761 3.22388 13 3.5 13C3.77612 13 4 12.7761 4 12.5C4 12.2239 3.77612 12 3.5 12ZM6.5 8H21.5C21.7761 8 22 7.77612 22 7.5C22 7.22388 21.7761 7 21.5 7H6.5C6.22388 7 6 7.22388 6 7.5C6 7.77612 6.22388 8 6.5 8ZM3.5 17C3.22388 17 3 17.2239 3 17.5C3 17.7761 3.22388 18 3.5 18C3.77612 18 4 17.7761 4 17.5C4 17.2239 3.77612 17 3.5 17ZM21.5 12H6.5C6.22388 12 6 12.2239 6 12.5C6 12.7761 6.22388 13 6.5 13H21.5C21.7761 13 22 12.7761 22 12.5C22 12.2239 21.7761 12 21.5 12ZM3.5 7C3.22388 7 3 7.22388 3 7.5C3 7.77612 3.22388 8 3.5 8C3.77612 8 4 7.77612 4 7.5C4 7.22388 3.77612 7 3.5 7ZM21.5 17H6.5C6.22388 17 6 17.2239 6 17.5C6 17.7761 6.22388 18 6.5 18H21.5C21.7761 18 22 17.7761 22 17.5C22 17.2239 21.7761 17 21.5 17Z"
        fill={color}
      />
    </svg>
  )
}

export function ChevronDownIcon({ size = 24, color = 'currentColor' }) {
  // Chevron-down dal DS Tundr — projects/tundr-ds/icons/navigation/Chevron-down.svg
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.8534 9.65873C16.6616 9.46012 16.3451 9.45463 16.1465 9.64646L12 13.793L7.85343 9.64652C7.65971 9.45939 7.35252 9.45939 7.15873 9.64652C6.96012 9.83836 6.95463 10.1549 7.14646 10.3535L11.6465 14.8535C11.7401 14.9474 11.8673 15.0002 12 15C12.1326 15.0001 12.2598 14.9474 12.3534 14.8535L16.8534 10.3535C17.0406 10.1597 17.0406 9.85252 16.8534 9.65873Z"
        fill={color}
      />
    </svg>
  )
}

export function CheckIcon({ size = 24, color = 'currentColor' }) {
  // Spunta — usata nel step indicator quando lo step è completato
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6.5l11 11M17.5 6.5l-11 11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CardPlusIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={cardPlusRaw} size={size} color={color} />
}

export function CardIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={cardRaw} size={size} color={color} />
}

export function CardBlockIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={cardBlockRaw} size={size} color={color} />
}

export function CoinsIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={coinsRaw} size={size} color={color} />
}

export function FileIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={fileRaw} size={size} color={color} />
}

export function PlusIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={plusRaw} size={size} color={color} />
}

export function PenIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={penRaw} size={size} color={color} />
}

export function TrashIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={trashRaw} size={size} color={color} />
}

export function CalendarIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={calendarRaw} size={size} color={color} />
}
export function DashboardIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={dashboardRaw} size={size} color={color} />
}
export function BuildingIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={buildingRaw} size={size} color={color} />
}
export function ReceiptIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={receiptRaw} size={size} color={color} />
}
export function EuroIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={euroRaw} size={size} color={color} />
}
export function SettingsIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={settingsRaw} size={size} color={color} />
}
export function RefreshIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={refreshRaw} size={size} color={color} />
}
export function ChevronRightIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={chevronRightRaw} size={size} color={color} />
}
export function ChevronLeftIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={chevronLeftRaw} size={size} color={color} />
}
export function ChevronUpIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={chevronUpRaw} size={size} color={color} />
}
export function DashboardSolidIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={dashboardSolidRaw} size={size} color={color} />
}
export function StoreNavIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={storeRaw} size={size} color={color} />
}
export function FolderNavIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={folderRaw} size={size} color={color} />
}
export function WrenchIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={wrenchRaw} size={size} color={color} />
}
export function OptionsIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={optionsRaw} size={size} color={color} />
}
export function SwitchIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={switchRaw} size={size} color={color} />
}
export function SignoutIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={signoutRaw} size={size} color={color} />
}
export function StoreNavSolidIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={storeSolidRaw} size={size} color={color} />
}
export function FolderNavSolidIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={folderSolidRaw} size={size} color={color} />
}
export function ReceiptSolidIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={receiptSolidRaw} size={size} color={color} />
}
export function FileSolidIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={fileSolidRaw} size={size} color={color} />
}
export function WrenchSolidIcon({ size = 24, color = 'currentColor' }) {
  return <RawSvgIcon raw={wrenchSolidRaw} size={size} color={color} />
}

export function InfoCircleIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="10.5" x2="12" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1" fill={color} />
    </svg>
  )
}

export function WarningTriangleIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  )
}

export function CheckCircleSolidIcon({ size = 24 }) {
  // Check-circle-solid dal DS Tundr — status/Check-circle-solid.svg
  // Cerchio verde (#2e7d52) con segno di spunta bianco (path DS adattato a fill bianco)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#2e7d52" />
      <path d="M16.2 10.3L11.4 15.1C11 15.5 10.4 15.5 10 15.1L7.8 12.9C7.4 12.5 7.4 11.9 7.8 11.5C8.2 11.1 8.8 11.1 9.2 11.5L10.7 13L14.8 8.9C15.2 8.5 15.8 8.5 16.2 8.9C16.6 9.3 16.6 9.9 16.2 10.3Z" fill="white" />
    </svg>
  )
}

export function TundrWordmark({ height = 16, color = 'currentColor' }) {
  // Wordmark "tundr" lowercase — versione semplificata per footer "Powered by".
  // Riusiamo il path SVG già presente in v5 (scalato in altezza).
  // TODO: verificare contro la versione esatta nel DS Figma se serve un altro asset.
  return (
    <svg
      height={height}
      viewBox="0 0 322 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tundr"
    >
      <path
        d="M109.37 57.0649C107.015 57.0649 105.462 54.6106 106.473 52.488L120.935 22.1341C120.914 20.3839 119.494 18.9655 117.737 18.9655H96.6965C94.9138 18.9655 93.4682 20.4095 93.4682 22.1902L93.3916 51.8808C93.3916 54.728 91.0827 57.0342 88.2324 57.0342C85.3821 57.0342 83.0732 54.728 83.0732 51.8808V22.1647C83.0732 20.3942 81.6378 18.9655 79.8704 18.9655H58.7637C56.9963 18.9655 55.5609 20.3993 55.5609 22.1647V56.8557C55.5609 64.3663 57.2773 70.1014 60.7048 74.0608C64.1323 78.0203 69.3835 80 76.4531 80C81.4897 80 85.5353 78.9285 88.5849 76.7753C91.6089 74.6374 93.8207 71.7648 95.2203 68.1727L97.2687 76.4283C97.6262 77.8672 98.9186 78.8775 100.405 78.8775H117.716C119.499 78.8775 120.945 77.4335 120.945 75.6528V57.0649H109.37Z"
        fill={color}
      />
      <path
        d="M188.055 23.7821C184.628 19.8227 179.376 17.843 172.307 17.843C167.265 17.843 163.219 18.9145 160.175 21.0677C157.146 23.2056 154.939 26.0782 153.54 29.6703L151.491 21.4146C151.134 19.9758 149.841 18.9655 148.355 18.9655H131.049C129.266 18.9655 127.82 20.4095 127.82 22.1902V40.7985H139.457C141.811 40.7985 143.364 43.2528 142.348 45.3753L127.836 75.765C127.892 77.4845 129.286 78.8724 131.018 78.8724H152.058C153.841 78.8724 155.287 77.4284 155.287 75.6477L155.363 45.957C155.363 43.1099 157.672 40.8036 160.522 40.8036C163.373 40.8036 165.682 43.1099 165.682 45.957V75.6732C165.682 77.4386 167.117 78.8724 168.889 78.8724H189.991C191.764 78.8724 193.199 77.4386 193.199 75.6732V40.9822C193.199 33.4715 191.483 27.7365 188.05 23.777"
        fill={color}
      />
      <path
        d="M47.2143 18.9706H35.2715V7.14331C35.2715 5.36259 33.8259 3.91861 32.0432 3.91861H17.2552C15.4725 3.91861 14.0269 5.36259 14.0269 7.14331C14.0269 7.14331 13.6642 11.0517 12.8162 13.1335C11.861 16.0724 10.1192 18.0879 7.58555 19.1747C7.58555 19.1747 5.01617 20.389 3.22833 20.389C1.44049 20.389 0 21.833 0 23.6137V37.5738C0 39.3545 1.4456 40.7985 3.22833 40.7985H9.74117V51.2277C9.74117 57.7843 10.4767 63.0908 11.9428 67.1522C13.4139 71.2137 16.0293 74.1833 19.7888 76.061C23.5433 77.9386 28.8762 78.8775 35.7823 78.8775H47.2143C48.997 78.8775 50.4426 77.4335 50.4426 75.6528V58.9629C50.4426 57.1822 48.997 55.7382 47.2143 55.7382H43.8838C41.4881 55.7382 39.6645 55.5494 38.3977 55.1719C37.1309 54.7994 36.2982 54.0136 35.8845 52.8197C35.4758 51.6257 35.2664 49.8297 35.2664 47.4418V40.8036H47.2092C48.9919 40.8036 50.4375 39.3596 50.4375 37.5789V22.2004C50.4375 20.4197 48.9919 18.9757 47.2092 18.9757"
        fill={color}
      />
      <path
        d="M318.797 17.8481H318.205C318.205 17.8481 318.169 17.8481 318.148 17.8481H316.907V17.9093C311.748 18.0675 307.631 19.1084 304.673 21.1238C301.823 23.0627 299.994 26.4558 299.08 31.1448L296.669 21.4197C296.311 19.9809 295.019 18.9706 293.533 18.9706H276.226C274.444 18.9706 272.998 20.4146 272.998 22.1953V75.6528C272.998 77.4335 274.444 78.8775 276.226 78.8775H297.241C299.024 78.8775 300.469 77.4335 300.469 75.6528V56.0801C300.505 52.2278 301.19 49.544 302.553 48.0796C303.953 46.5744 306.773 45.8243 311.018 45.8243L316.907 45.8907V45.9009H318.797C320.565 45.9009 322 44.4671 322 42.7017V21.0473C322 19.2818 320.565 17.8481 318.797 17.8481Z"
        fill={color}
      />
      <path
        d="M262.884 0H241.869C240.086 0 238.641 1.44397 238.641 3.22469V25.272C237.21 23.1698 235.448 21.4146 233.155 20.2003C230.452 18.7665 227.02 18.0471 222.852 18.0471C218.203 18.0471 214.009 19.139 210.286 21.3228C206.562 23.5066 203.625 26.8027 201.469 31.2061C199.318 35.6094 198.241 41.222 198.241 48.0541V49.2837C198.241 59.2487 200.509 66.8308 205.055 72.0199C209.601 77.209 215.496 79.801 222.744 79.801C227.388 79.801 231.27 79.056 234.069 77.0865C237.195 74.8823 239.642 71.3872 240.75 69.6371L242.436 76.4334C242.794 77.8723 244.086 78.8826 245.572 78.8826H262.884C264.667 78.8826 266.112 77.4386 266.112 75.6579V3.22469C266.112 1.44397 264.667 0 262.884 0ZM239.014 49.0797C239.014 52.5595 238.344 55.0035 237.011 56.4015C235.678 57.7996 233.921 58.4986 231.729 58.4986C229.538 58.4986 227.888 57.82 226.555 56.4526C225.222 55.0902 224.553 52.6309 224.553 49.0797V48.1612C224.553 45.0233 225.222 42.7527 226.555 41.3496C227.888 39.9515 229.61 39.2474 231.729 39.2474C233.849 39.2474 235.673 39.9668 237.011 41.4006C238.344 42.8344 239.014 45.0845 239.014 48.1612V49.0797Z"
        fill={color}
      />
    </svg>
  )
}
