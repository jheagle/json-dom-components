import type { DomItem } from 'treeloom/dist/domItem/types';
import type { ClearableInputConfig } from './types';
/**
 * A regular text input with a small "x" button on its right inner edge to clear it - the common "search box"
 * pattern. The button only shows once there's a value to clear.
 *
 * Minimum/POC implementation: like the typeahead, its listeners are plain closures, not names registered for
 * treeloom's render-only/forwarding mode. See MAIN.md.
 */
declare const createClearableInput: (config: ClearableInputConfig) => DomItem;
export default createClearableInput;
