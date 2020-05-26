import React from 'react'

interface ScrollSpyActions {
  addNode: (instance: HTMLDivElement | null) => void
}

interface ScrollSpyContextType extends ScrollSpyActions {
  node: IntersectionObserverEntry | null
}

interface ScrollSpyProviderProps {
  children?: React.ReactNode
  threshold?: number
}

// We initially set the context as undefined because we havent set up the state yet
const ScrollSpyContext = React.createContext<ScrollSpyContextType | undefined>(
  undefined,
)

export default function ScrollSpyProvider({
  children,
  threshold = 0.5,
}: ScrollSpyProviderProps) {
  const [node, setNode] = React.useState<IntersectionObserverEntry | null>(null)

  // We want the IntersectionObserver inside a useRef because it will
  // not trigger a rerender unline useState
  const currentObserver = React.useRef(
    new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the entry past the threshold, set it as the current node
          if (entry.intersectionRatio > threshold) {
            setNode(entry)
          } else {
            return
          }
        })
      },
      {
        threshold,
      },
    ),
  )

  // We memorize the state & actions to prevent occasional unnecessary rerenders
  const value: ScrollSpyContextType = React.useMemo(
    () => ({
      node,
      // Because we can pass in a function as a 'ref' we can use this function
      // to add the node to the observer tree
      addNode: (instance: HTMLDivElement | null): void => {
        console.log('hi')
        if (instance) {
          // TODO: Update hash
          currentObserver.current.observe(instance)
        }
      },
    }),
    [],
  )

  React.useEffect(() => {
    console.log(node)
  }, [node])

  // Cleanup
  React.useEffect(() => {
    // Capture the current value of the observer to cleanup with
    const { current } = currentObserver

    return () => current.disconnect()
  }, [])

  return (
    <ScrollSpyContext.Provider value={value}>
      {children}
    </ScrollSpyContext.Provider>
  )
}

export const useScrollSpyState = () => {
  const context = React.useContext(ScrollSpyContext)
  if (!context) {
    throw new Error(
      'useScrollSpyState must be used within the ScorllSpyProvider',
    )
  }

  return [context.addNode]
}
