import button from '../components/button'
import div from '../components/div'
import input from '../components/input'
import { makeClearInput } from './clearInput'
import { makeToggleClearButton } from './toggleClearButton'
import type { DomItem } from 'json-dom/dist/domItem/types'
import type { ClearableInputConfig } from './types'

/**
 * A regular text input with a small "x" button on its right inner edge to clear it - the common "search box"
 * pattern. The button only shows once there's a value to clear.
 *
 * Minimum/POC implementation: like the typeahead, its listeners are plain closures, not names registered for
 * json-dom's render-only/forwarding mode. See MAIN.md.
 */
const createClearableInput = (config: ClearableInputConfig): DomItem => {
  const { name, value = '', placeholder = '', className, readonly = false } = config

  const inputItem = input('text', name, value || null, [], 'clearable-input-field', {
    placeholder,
    ...(readonly ? { readonly: true } : {})
  })

  const clearButton = button('×', 'clearable-input-clear', {
    'aria-label': 'Clear',
    hidden: value.length === 0,
    ...(readonly ? { hidden: true, disabled: true } : {})
  })

  if (!readonly) {
    inputItem.eventListeners.input = [{ listenerFunc: makeToggleClearButton(clearButton) }]
    clearButton.eventListeners.click = [{ listenerFunc: makeClearInput(inputItem, clearButton) }]
  }

  return div([inputItem, clearButton], className ?? 'clearable-input')
}

export default createClearableInput
