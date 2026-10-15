import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const unorderedList = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('ul', children, className, attributes)

export default unorderedList
