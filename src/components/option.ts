import element from './element'
import text from './text'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const option = (value: string, label: string, className?: string, attributes: Attributes = {}): DomItem =>
  element('option', [text(label)], className, Object.assign({ value }, attributes))

export default option
