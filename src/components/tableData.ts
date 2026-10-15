import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const tableData = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('td', children, className, attributes)

export default tableData
