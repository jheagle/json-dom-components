import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const heading = (level: 1 | 2 | 3 | 4 | 5 | 6 = 1, children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element(`h${level}`, children, className, attributes)

export default heading
