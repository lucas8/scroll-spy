import React from 'react'
import { getTitleFromAttributes } from './utils'

interface ScrollNode {
  title: string
  entry: IntersectionObserverEntry
  id: string
}

interface ScrollItem {
  title: string
  id: string
  isActive: boolean
}

interface ScrollSpyState {
  currentNode: ScrollNode | null
  nodes: ScrollItem[]
  addNode: (instance: HTMLDivElement | null) => void
}

interface ScrollSpyProviderProps {
  children?: React.ReactNode

  // The threshold is a number from 0-1 indicating how much the child should be
  // in view before becoming the current node
  threshold?: number
}

// TODO: PREVENT SAME IDS

const ScrollSpyContext = React.createContext<ScrollSpyState | undefined>(
  undefined,
)

export default function ScrollSpyProvider({
  children,
  threshold = 0.5,
}: ScrollSpyProviderProps) {
  const [currentNode, setCurrentNode] = React.useState<ScrollNode | null>(null)
  const [nodes, setNodes] = React.useState<ScrollItem[]>([])

  // We want the IntersectionObserver inside a useRef because it will
  // not trigger a rerender unlike useState
  const { current: currentObserver } = React.useRef(
    new window.IntersectionObserver(
      (entries) => {
        // TODO: Optimise using new Set
        setNodes(
          entries.map((e) => {
            return {
              title: getTitleFromAttributes(e.target),
              id: e.target.id,
              isActive: e.intersectionRatio > threshold ? true : false,
            }
          }),
        )
        entries.forEach((entry) => {
          // If the entry past the threshold, set it as the current node
          if (entry.intersectionRatio > threshold) {
            // This may not work on older browsers, but pushState doesnt
            // trigger a hashchange which would cause a jumping
            window.history.pushState(null, '', `#${entry.target.id}`)
            setCurrentNode({
              entry,
              title: getTitleFromAttributes(entry.target),
              id: entry.target.id,
            })
            console.log(
              entries.map((e) => {
                return {
                  title: getTitleFromAttributes(entry.target),
                  id: entry.target.id,
                  isActive: e.target.id === entry.target.id ? true : false,
                }
              }),
            )
          }
        })
      },
      {
        threshold,
      },
    ),
  )

  // We need to seperate the state from the actions because we dont want
  // addNode to update everytime currentNode or nodes updates
  const state = React.useMemo(
    () => ({
      currentNode,
      nodes,
    }),
    [currentNode, nodes],
  )

  // We memorize the state & actions to prevent occasional unnecessary rerenders
  const actions = React.useMemo(
    () => ({
      // Because we can pass in a function as a 'ref' we can use this function
      // to add the node to the observer 'tree'
      addNode: (instance: HTMLDivElement | null): void => {
        if (instance) {
          // TODO: Update hash
          currentObserver.observe(instance)

          setNodes((prevNodes) => [
            ...prevNodes,
            {
              title: getTitleFromAttributes(instance),
              id: instance.id,
              isActive: false,
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
  }, [])

  return (
    <ScrollSpyContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ScrollSpyContext.Provider>
  )
}

export const useScrollSpy = () => {
  const context = React.useContext(ScrollSpyContext)
  if (!context) {
    throw new Error(
      'useScrollSpyState must be used within the ScrollSpyProvider',
    )
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