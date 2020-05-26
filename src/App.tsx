import React from 'react'
import ScrollSpyProvider from './components/ScrollSpyProvider'
import ScrollSpyComponent from './components/ScrollSpyComponent'
import Navbar from './components/Navbar'

function App() {
  return (
    <ScrollSpyProvider>
      <Navbar />
      <ScrollSpyComponent id="a" title="a">
        <div style={{ height: '100vh', background: 'red' }}>a</div>
      </ScrollSpyComponent>
      <ScrollSpyComponent id="b" title="b">
        <div style={{ height: '100vh', background: 'blue' }}>b</div>
      </ScrollSpyComponent>
      <ScrollSpyComponent id="c" title="c">
        <div style={{ height: '100vh', background: 'skyblue' }}>c</div>
      </ScrollSpyComponent>
      <ScrollSpyComponent id="d" title="d">
        <div style={{ height: '100vh', background: 'purple' }}>d</div>
      </ScrollSpyComponent>
    </ScrollSpyProvider>
  )
}

export default App
