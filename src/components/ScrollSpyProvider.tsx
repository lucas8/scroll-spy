import React from 'react'
import { getTitleFromAttributes, getTopicFromAttributes } from './utils'

interface ScrollItem {
  title: string
  id: string
  isActive: boolean
  topic?: string
  parent?: string
}

interface Tree {
  unsorted: ScrollItem[]
  [key: string]: any
}

interface ScrollSpyState {
  addNode: (instance: HTMLDivElement | null) => void
  nodes: ScrollItem[]
  sortedNodeTree: Tree
}

interface ScrollSpyProviderProps {
  children?: React.ReactNode

  // The threshold is a number from 0-1 indicating how much the child should be
  // in view before becoming the current node
  threshold?: number
  options?: IntersectionObserverInit
}

const ScrollSpyContext = React.createContext<ScrollSpyState | undefined>(
  undefined,
)

export default function ScrollSpyProvider({
  children,
  options = { threshold: 0.5 },
}: ScrollSpyProviderProps) {
  const [nodes, setNodes] = React.useState<ScrollItem[]>([])

  // We want the IntersectionObserver inside a useRef because it will
  // not trigger a rerender unlike useState
  const { current: currentObserver } = React.useRef(
    new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the entry past the threshold, set it as the current node
        if (entry.intersectionRatio > (options.threshold || 0.5)) {
          // This may not work on older browsers, but pushState doesnt
          // trigger a hashchange which would cause a jumping
          window.history.pushState(null, '', `#${entry.target.id}`)
          setNodes((nodes) =>
            nodes.map((n) =>
              n.id === entry.target.id
                ? { ...n, isActive: true }
                : { ...n, isActive: false },
            ),
          )
        }
      })
    }, options),
  )

  // We need to seperate the state from the actions because we dont want
  // addNode to update everytime currentNode or nodes updates
  const state = React.useMemo(
    () => ({
      nodes,
      // This tree implementation is a little complex, but it consolidate repeated
      // topics and supports up to 2 levels of depth
      sortedNodeTree: nodes.reduce((obj: any, item) => {
        if (item.parent) {
          const parentObj = obj[item.parent] || {}
          const arr = parentObj[item.topic || 'unsorted'] || []
          return {
            ...obj,
            [item.parent]: {
              ...parentObj,
              [item.topic || 'unsorted']: [...arr, item],
            },
          }
        } else {
          const arr = obj[item.topic || 'unsorted'] || []
          return {
            ...obj,
            [item.topic || 'unsorted']: [...arr, item],
          }
        }
      }, {}),
    }),
    [nodes],
  )

  // We memorize the state & actions to prevent occasional unnecessary rerenders
  const actions = React.useMemo(
    () => ({
      // Because we can pass in a function as a 'ref' we can use this function
      // to add the node to the observer 'tree'
      addNode: (instance: HTMLDivElement | null): void => {
        if (instance) {
          currentObserver.observe(instance)

          setNodes((prevNodes) => [
            ...prevNodes,
            {
              title: getTitleFromAttributes(instance),
              id: instance.id,
              isActive: false,
              topic: getTopicFromAttributes(instance),
              parent: getTopicFromAttributes(instance, 'data-parent-topic'),
            },
          ])
        }
      },
    }),
    [currentObserver],
  )

  // Cleanup
  React.useEffect(() => {
    return () => currentObserver.disconnect()
  }, [currentObserver])

  return (
    <ScrollSpyContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ScrollSpyContext.Provider>
  )
}

export const useScrollSpy = () => {
  const context = React.useContext(ScrollSpyContext)
  if (!context) {
    throw new Error('useScrollSpy must be used within the ScrollSpyProvider')
  }

  return context.addNode
}

export const useScrollSpyState = () => {
  const context = React.useContext(ScrollSpyContext)
  if (!context) {
    throw new Error(
      'useScrollSpyState must be used within the ScrollSpyProvider',
    )
  }

  return context
}
