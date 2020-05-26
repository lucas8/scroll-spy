import React from 'react'

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

interface ScrollSpyTopicProps {
  children?: React.ReactNode
  topic: string
  inheritedTopic?: string
}

export default function ScrollSpyTopic({
  children,
  topic,
  inheritedTopic
}: ScrollSpyTopicProps) {
  const childrenWithTopic = React.Children.map(children, (child) => {
    if (!React.isValidElement<ScrollSpyComponentProps>(child)) {
      return child
    }
    return React.cloneElement(child, {
      inheritedTopic: topic,
      parentTopic: inheritedTopic
    })
  })

  return <div>{childrenWithTopic}</div>
}
