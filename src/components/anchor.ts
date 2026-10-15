import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const anchor = (href: string = '#', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('a', children, className, Object.assign({ href }, attributes))

export default anchor
