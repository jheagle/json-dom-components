import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const tableBody = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('tbody', children, className, attributes)

export default tableBody
