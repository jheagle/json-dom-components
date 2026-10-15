import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const main = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('main', children, className, attributes)

export default main
