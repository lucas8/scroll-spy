import React from 'react'
import { useScrollSpyState } from 'scroll-spy'

function renderArr(arr) {
  return arr.map((node) => {
    return (
      <li key={node.id}>
        <a
          style={{
            display: 'block',
            fontWeight: node.isActive ? 'bold' : 'normal',
            color: node.isActive ? 'var(--color-fuchsia)' : '#5850ec'
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
    <div className='navbar-container'>
      <ul>
        {Object.keys(sortedNodeTree).map((topic) => {
          // This is all of the unsorted arrays, first layer of arrays
          if (Array.isArray(sortedNodeTree[topic])) {
            return renderArr(sortedNodeTree[topic])
          } else {
            // We then render the parent and topic
            return (
              <div key={topic}>
                <h2>{topic}</h2>
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
      </ul>
    </div>
  )
}
