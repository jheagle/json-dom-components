import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const tableRow = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('tr', children, className, attributes)

export default tableRow
