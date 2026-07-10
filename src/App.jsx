import { PhoneFrame } from './kit'
import HomeScreen from './screens/Home/HomeScreen.jsx'

// La Home riempie il frame (no scroll di pagina): tab bar sempre in fondo,
// i movimenti scorrono dentro il loro bottom-sheet.
export default function App() {
  return (
    <PhoneFrame statusBar>
      <HomeScreen />
    </PhoneFrame>
  )
}
