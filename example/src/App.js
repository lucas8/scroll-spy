import React from 'react'
import {
  ScrollSpyProvider,
  ScrollSpyComponent,
  ScrollSpyTopic
} from 'scroll-spy'
import Navbar from './components/Navbar'
import './App.css'

const ExampleContent = ({ children, color }) => (
  <div style={{ background: `var(--color-${color})`, height: '100vh' }}>
    <h1>{children}</h1>
  </div>
)

function App() {
  return (
    <ScrollSpyProvider>
      <Navbar />
      <ScrollSpyTopic topic='Introduction'>
        <ScrollSpyTopic topic='Prepare'>
          <ScrollSpyComponent
            id='get-your-supplies'
            title='Get your supplies ready'
          >
            <ExampleContent color='navy'>
              Get your supplies ready
            </ExampleContent>
          </ScrollSpyComponent>
          <ScrollSpyComponent id='watch-mars-base' title='Watch: Mars Base'>
            <ExampleContent color='blue'>Watch this video</ExampleContent>
          </ScrollSpyComponent>
          <ScrollSpyComponent id='read-space-suits' title='Read space suits'>
            <ExampleContent color='aqua'>Read space suits</ExampleContent>
          </ScrollSpyComponent>
        </ScrollSpyTopic>
        <ScrollSpyTopic topic='Design your repair kit'>
          <ScrollSpyComponent
            id='gather-materials'
            title='Gather your materials'
          >
            <ExampleContent color='teal'>Gather your materials</ExampleContent>
          </ScrollSpyComponent>
        </ScrollSpyTopic>
      </ScrollSpyTopic>
    </ScrollSpyProvider>
  )
}

export default App
