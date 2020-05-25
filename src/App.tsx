import React from 'react'
import ScrollSpyProvider from './components/ScrollSpyProvider'
import HelloWorld from './components/HelloWorld'

function App() {
  return (
    <ScrollSpyProvider>
      <HelloWorld />
    </ScrollSpyProvider>
  )
}

export default App
