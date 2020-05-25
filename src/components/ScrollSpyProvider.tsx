import React from 'react'

interface ScrollSpyState {
  elements: { ref: React.RefObject<any>; title: string }[]
}

interface ScrollSpyActions {
  addNode: (instance: HTMLDivElement | null) => void
}

interface ScrollSpyContextType extends ScrollSpyState, ScrollSpyActions {}

interface ScrollSpyProviderProps {
  children?: React.ReactNode
}

// We initially set the context as undefined because we havent set up the state yet
const ScrollSpyContext = React.createContext<ScrollSpyContextType | undefined>(
  undefined,
)

export default function ScrollSpyProvider({
  children,
}: ScrollSpyProviderProps) {
  const [state, setState] = React.useState<ScrollSpyState>({
    elements: [],
  })

  // We memorize the state & actions to prevent occasional unnecessary rerenders
  const value: ScrollSpyContextType = React.useMemo(
    () => ({
      ...state,
      // Because we can pass in a function as a 'ref' we can use this function
      // to add the node to the observer tree
      addNode: (instance: HTMLDivElement | null): void => {
        console.log(instance)
      },
    }),
    [state],
  )

  // console.log(state.elements)

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

  return context
}
