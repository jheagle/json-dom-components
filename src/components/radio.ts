import input from './input'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const radio = (name: string = '', value: string = '', checked: boolean = false, children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem => {
  attributes.value = value
  if (checked) {
    attributes.checked = true
  }
  return input('radio', name, null, children, className, attributes)
}

export default radio
