import React from 'react'
import { useScrollSpy } from './ScrollSpyProvider'

export default function Section({
  children,
  title,
  id,
  inheritedTopic,
  parentTopic,
  ...rest
}: ScrollSpyTopicSectionProps) {
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
