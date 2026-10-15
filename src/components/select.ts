import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const select = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('select', children, className, attributes)

export default select
