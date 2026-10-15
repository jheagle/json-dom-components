import input from './input'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const submit = (name: string = '', label: string = 'Submit', className?: string, attributes: Attributes = {}): DomItem => {
  attributes.value = label
  return input('submit', name, null, [], className, attributes)
}

export default submit
