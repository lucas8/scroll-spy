import React from 'react'
import ScrollSpyProvider from './components/ScrollSpyProvider'
import ScrollSpyComponent from './components/ScrollSpyComponent'
import Navbar from './components/Navbar'

function App() {
  return (
    <ScrollSpyProvider>
      <Navbar />
      <ScrollSpyComponent id="a" title="a" key={1}>
        <div style={{ height: '100vh', background: 'red' }}>a</div>
      </ScrollSpyComponent>
      <ScrollSpyComponent id="b" title="b" key={2}>
        <div style={{ height: '100vh', background: 'blue' }}>b</div>
      </ScrollSpyComponent>
    </ScrollSpyProvider>
  )
}

export default App
