/**
 * A minimal component library on json-dom: base HTML element factories plus richer interactive components.
 */
import 'core-js/stable'
import clearableInput from './clearableInput/index'
import components from './components/index'
import typeahead from './typeahead/index'

/**
 * Store a reference to the global scope which will be Window if rendered via browser
 */
const root = (typeof window !== 'undefined' ? window : {}) as unknown as Record<string, unknown>

const jsonDomComponents = {
  ...components,
  ...typeahead,
  ...clearableInput
}

root.jsonDomComponents = jsonDomComponents

export default jsonDomComponents
