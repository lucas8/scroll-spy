import React from 'react'
import { useScrollSpyState } from './ScrollSpyProvider'

// This is a simple implementation of ScrollSpy
export default function Navbar() {
  const { sortedNodes } = useScrollSpyState()

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
      {Object.keys(sortedNodes).map((topic) => {
        const nodes = sortedNodes[topic].map((node: any) => (
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
        ))
        if (topic !== 'unsorted') {
          return (
            <ul key={topic}>
              <h3
                style={{
                  fontWeight: sortedNodes[topic].some((n: any) => n.isActive)
                    ? 'bold'
                    : 'normal',
                }}
              >
                {topic}
              </h3>
              <li>{nodes}</li>
            </ul>
          )
        } else {
          return nodes
        }
      })}
    </div>
  )
}
