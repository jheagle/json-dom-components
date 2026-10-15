import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const listItem = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('li', children, className, attributes)

export default listItem
