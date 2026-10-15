import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const table = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('table', children, className, attributes)

export default table
