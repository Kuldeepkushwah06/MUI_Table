import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomizedTables from './components/CustomizedTables'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomizedTables/>
    </>
  )
}

export default App
