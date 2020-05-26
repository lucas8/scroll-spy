import React from 'react'
import ScrollSpyProvider from './components/ScrollSpyProvider'
import ScrollSpyComponent from './components/ScrollSpyComponent'
import Navbar from './components/Navbar'
import ScrollSpyTopic from './components/ScrollSpyTopic'
import './App.css'

function App() {
  return (
    <ScrollSpyProvider>
      <Navbar />
      <ScrollSpyTopic topic="Introduction">
        <ScrollSpyTopic topic="Prepare">
          <ScrollSpyComponent
            id="get-your-supplies"
            title="Get your supplies ready"
          >
            <div style={{ background: 'red', height: '100vh' }}>
              Get your supplies ready
            </div>
          </ScrollSpyComponent>
          <ScrollSpyComponent id="watch-mars-base" title="Watch: Mars Base">
            <div style={{ background: 'purple', height: '100vh' }}>
              Watch this video
            </div>
          </ScrollSpyComponent>
          <ScrollSpyComponent id="read-space-suits" title="Read space suits">
            <div style={{ background: 'blue', height: '100vh' }}>
              Read space suits
            </div>
          </ScrollSpyComponent>
        </ScrollSpyTopic>
        <ScrollSpyTopic topic="Design your repair kit">
          <ScrollSpyComponent
            id="gather-materials"
            title="Gather your materials"
          >
            <div style={{ background: 'violet', height: '100vh' }}>
              Gather your materials
            </div>
          </ScrollSpyComponent>
        </ScrollSpyTopic>
      </ScrollSpyTopic>
    </ScrollSpyProvider>
  )
}

export default App
