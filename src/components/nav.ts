import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const nav = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('nav', children, className, attributes)

export default nav
