import React from 'react'
import { useScrollSpy } from './ScrollSpyProvider'

export interface ScrollSpyComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode
  title: string
  id: string
  topic?: string
}

export default function ScrollSpyComponent({
  children,
  title,
  id,
  topic,
  ...rest
}: ScrollSpyComponentProps) {
  const ref = useScrollSpy()

  // Because the IntersectionObserver passes back a DOM node, not a
  // react one, we need to forward the data-title to pick back up in state
  return (
    <div id={id} ref={ref} data-title={title} data-topic={topic} {...rest}>
      {children}
    </div>
  )
}
