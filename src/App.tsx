import React from 'react'
import ScrollSpyProvider from './components/ScrollSpyProvider'
import HelloWorld from './components/HelloWorld'

function App() {
  return (
    <ScrollSpyProvider>
      <HelloWorld>a</HelloWorld>
      <HelloWorld>b</HelloWorld>
    </ScrollSpyProvider>
  )
}

export default App
