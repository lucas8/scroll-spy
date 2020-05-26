export const getTitleFromAttributes = (
  instance: HTMLDivElement | Element,
): string => {
  return instance.attributes.getNamedItem('data-title')!.value || 'Undefined'
}
