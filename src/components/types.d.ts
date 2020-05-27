interface ScrollSpyTopicSectionProps {
  children?: React.ReactNode
  title: string
  id: string
  inheritedTopic?: string
  parentTopic?: string
}

interface ScrollSpyTopicProps {
  children?: React.ReactNode
  name: string
  inheritedTopic?: string
}

interface ScrollSpyRef {
  title: string
  topic?: string
  parentTopic?: string
}

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

interface ScrollSpyActions {
  addNode: (instance: HTMLDivElement | null, options: ScrollSpyRef) => void
}
