import element from './element'
import text from './text'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const button = (label: string, className?: string, attributes: Attributes = {}): DomItem =>
  element('button', [text(label)], className, Object.assign({ type: 'button' }, attributes))

export default button
