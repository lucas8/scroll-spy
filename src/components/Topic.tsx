import React from 'react'

export default function Topic({
  children,
  name,
  inheritedTopic
}: ScrollSpyTopicProps) {
  const childrenWithTopic = React.Children.map(children, (child) => {
    if (!React.isValidElement<ScrollSpyTopicSectionProps>(child)) {
      return child
    }
    return React.cloneElement(child, {
      inheritedTopic: name,
      parentTopic: inheritedTopic
    })
  })

  return <div>{childrenWithTopic}</div>
}
