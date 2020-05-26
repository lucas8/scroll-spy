import React from 'react'
import { useScrollSpyState } from './ScrollSpyProvider'

export default function Navbar() {
  const { nodes } = useScrollSpyState()
  return (
    <div
      style={{
        background: 'orange',
        position: 'fixed',
        top: 0,
        right: 0,
        width: 200,
      }}
    >
      {nodes.map((node) => (
        <a
          key={node.id}
          style={{
            display: 'block',
            fontWeight: node.isActive ? 'bold' : 'normal',
          }}
          href={`#${node.id}`}
        >
          {node.title}
        </a>
      ))}
    </div>
  )
}