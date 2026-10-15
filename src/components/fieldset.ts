import element from './element'
import legend from './legend'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const fieldset = (content: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('fieldset', content ? [legend(content), ...children] : children, className, attributes)

export default fieldset
