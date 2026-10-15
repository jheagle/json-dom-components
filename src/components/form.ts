import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const form = (action: string = '', method: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem => {
  if (action) {
    attributes.action = action
  }
  if (method) {
    attributes.method = method
  }
  return element('form', children, className, attributes)
}

export default form
