export const getTitleFromAttributes = (
  instance: HTMLDivElement | Element,
): string => {
  return instance.attributes.getNamedItem('data-title')!.value || 'Undefined'
}

export const getTopicFromAttributes = (
  instance: HTMLDivElement | Element,
): undefined | string => {
  const attribute = instance.attributes.getNamedItem('data-topic')
  if (attribute) {
    return attribute.value
  } else {
    return undefined
  }
}
