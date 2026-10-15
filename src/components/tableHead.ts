import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const tableHead = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('thead', children, className, attributes)

export default tableHead
