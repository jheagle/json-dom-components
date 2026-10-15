import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const textArea = (name: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem => {
  if (name) {
    attributes.name = name
  }
  return element('textarea', children, className, attributes)
}

export default textArea
