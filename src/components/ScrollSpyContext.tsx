import React from 'react'

interface ScrollSpyState {
  elements: { ref: React.RefObject<any>; title: string }[]
}

interface ScrollSpyActions {
  addElem: (ref: React.RefObject<any>, title: string) => void
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

  const value: ScrollSpyContextType = React.useMemo(
    () => ({
      ...state,
      addElem: (ref: React.RefObject<any>, title: string): void => {
        setState((state) => ({
          ...state,
          elements: [...state.elements, { ref, title }],
        }))
      },
    }),
    [state],
  )

  return (
    <ScrollSpyContext.Provider value={value}>
      {children}
    </ScrollSpyContext.Provider>
  )
}
