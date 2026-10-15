import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const span = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('span', children, className, attributes)

export default span
