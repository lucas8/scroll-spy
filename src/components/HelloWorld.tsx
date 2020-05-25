import React from 'react'
import { useScrollSpyState } from './ScrollSpyProvider'

export default function HelloWorld() {
  const { addNode: ref } = useScrollSpyState()

  return <div ref={ref}>hello world</div>
}
