import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const header = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('header', children, className, attributes)

export default header
