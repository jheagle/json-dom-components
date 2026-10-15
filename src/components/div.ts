import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const div = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('div', children, className, attributes)

export default div
