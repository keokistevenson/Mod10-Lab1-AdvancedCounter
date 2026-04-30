import { useState } from 'react'
import AdvancedCounter from "./components/AdvancedCounter"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdvancedCounter />
    </>
  )
}

export default App
