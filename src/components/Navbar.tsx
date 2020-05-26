import React from 'react'
import { useScrollSpyState } from './ScrollSpyProvider'

export default function Navbar() {
  const { nodes } = useScrollSpyState()
  console.log(nodes)
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
          key={node.title}
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
