import element from './element'
import text from './text'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const paragraph = (content: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('p', content ? [text(content), ...children] : children, className, attributes)

export default paragraph
