import React from 'react'
import { useScrollSpyState } from './ScrollSpyProvider'

interface Props {
  children: React.ReactNode
}

export default function HelloWorld({ children }: Props) {
  const [ref] = useScrollSpyState()

  return (
    <div ref={ref} style={{ height: '100vh', background: 'red' }}>
      {children}
    </div>
  )
}
