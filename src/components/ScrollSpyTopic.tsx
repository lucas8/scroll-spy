import React from 'react'
import { ScrollSpyComponentProps } from './ScrollSpyComponent'

interface ScrollSpyTopicProps {
  children?: React.ReactNode
  topic: string
}

export default function ScrollSpyTopic({
  children,
  topic,
}: ScrollSpyTopicProps) {
  const childrenWithTopic = React.Children.map(children, (child) => {
    if (!React.isValidElement<ScrollSpyComponentProps>(child)) {
      return child
    }
    return React.cloneElement(child, { topic })
  })

  return <div>{childrenWithTopic}</div>
}
