import element from './element'
import text from './text'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const label = (content: string = '', labelFor: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('label', content ? [text(content), ...children] : children, className, Object.assign({ for: labelFor }, attributes))

export default label
