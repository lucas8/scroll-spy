import React from 'react'
import { useScrollSpy } from './ScrollSpyProvider'

interface ScrollSpyComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode
  title: string
  id: string
  inheritedTopic?: string
  parentTopic?: string
}

export default function ScrollSpyComponent({
  children,
  title,
  id,
  inheritedTopic,
  parentTopic,
  ...rest
}: ScrollSpyComponentProps) {
  const addNode = useScrollSpy()

  // Because the IntersectionObserver passes back a DOM node, not a
  // react one, we need to forward the data-title to pick back up in state
  return (
    <div
      id={id}
      ref={(instance) =>
        addNode(instance, {
          title,
          topic: inheritedTopic,
          parentTopic: parentTopic
        })
      }
      {...rest}
    >
      {children}
    </div>
  )
}
