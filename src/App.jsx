import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TablaAlimentos from './TablaAlimentos'

function App() {
  const [count, setCount] = useState(0)

  return (
      
  <>
  <TablaAlimentos/>
  </>
  )
}

export default App
