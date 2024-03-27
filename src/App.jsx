import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TablaAlimentos from './TablaAlimentos'
import Bienvenida from './Bienvenida/Bienvenida.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      
  <>
  <Bienvenida/>

  <TablaAlimentos/>
  <TablaAlimentos/>
  <TablaAlimentos/>
  <TablaAlimentos/>
  <TablaAlimentos/>
  </>
  )
}

export default App
