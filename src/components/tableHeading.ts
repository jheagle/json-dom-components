import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const tableHeading = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('th', children, className, attributes)

export default tableHeading
