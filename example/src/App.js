import React from 'react'
import { ScrollSpyProvider, Section, Topic } from 'scroll-spy'
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
      <Topic name='Introduction'>
        <Section id='welcome' title='Welcome!'>
          <ExampleContent color='purple'>Welcome!</ExampleContent>
        </Section>
        <Topic name='Prepare'>
          <Section id='get-your-supplies' title='Get your supplies ready'>
            <ExampleContent color='navy'>
              Get your supplies ready
            </ExampleContent>
          </Section>
          <Section id='watch-mars-base' title='Watch: Mars Base'>
            <ExampleContent color='blue'>Watch this video</ExampleContent>
          </Section>
          <Section id='read-space-suits' title='Read space suits'>
            <ExampleContent color='aqua'>Read space suits</ExampleContent>
          </Section>
        </Topic>
        <Topic name='Design your repair kit'>
          <Section id='gather-materials' title='Gather your materials'>
            <ExampleContent color='teal'>Gather your materials</ExampleContent>
          </Section>
        </Topic>
      </Topic>
      <Section id='goodbye' title='Goodbye!'>
        <ExampleContent color='red'>Byee!</ExampleContent>
      </Section>
    </ScrollSpyProvider>
  )
}

export default App
