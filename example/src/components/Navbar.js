import React from 'react'
import { useScrollSpyState } from 'scroll-spy'

function renderArr(arr) {
  return arr.map((node) => {
    return (
      <li>
        <a
          key={node.id}
          style={{
            display: 'block',
            fontWeight: node.isActive ? 'bold' : 'normal'
          }}
          href={`#${node.id}`}
        >
          {node.title}
        </a>
      </li>
    )
  })
}

// This is a simple implementation of ScrollSpy
export default function Navbar() {
  const { sortedNodeTree } = useScrollSpyState()

  return (
    <div
      style={{
        background: 'orange',
        position: 'fixed',
        top: 0,
        right: 0,
        width: 500
      }}
    >
      {Object.keys(sortedNodeTree).map((topic) => {
        // This is all of the unsorted arrays, first layer of arrays
        if (Array.isArray(sortedNodeTree[topic])) {
          return renderArr(sortedNodeTree[topic])
        } else {
          // We then rendering the parent and topic
          return (
            <div>
              <h3>{topic}</h3>
              {Object.keys(sortedNodeTree[topic]).map((nestedTopic) => {
                return (
                  <ul key={nestedTopic}>
                    {nestedTopic !== 'unsorted' && (
                      <h3
                        style={{
                          fontWeight: sortedNodeTree[topic][nestedTopic].some(
                            (n) => n.isActive
                          )
                            ? 'bold'
                            : 'normal'
                        }}
                      >
                        {nestedTopic}
                      </h3>
                    )}
                    {renderArr(sortedNodeTree[topic][nestedTopic])}
                  </ul>
                )
              })}
            </div>
          )
        }
      })}
    </div>
  )
}
