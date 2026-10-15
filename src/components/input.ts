import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const input = (type: string = 'text', name: string = '', value: string | null = null, children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem => {
  attributes.type = type
  if (name) {
    attributes.name = name
  }
  if (value !== null) {
    attributes.value = value
  }
  return element('input', children, className, attributes)
}

export default input
