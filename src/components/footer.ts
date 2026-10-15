import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const footer = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('footer', children, className, attributes)

export default footer
