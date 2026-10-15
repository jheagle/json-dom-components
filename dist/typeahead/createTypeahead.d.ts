import type { DomItem } from 'json-dom/dist/domItem/types';
import type { TypeaheadConfig } from './types';
/**
 * A typeahead: a free-text input that filters a list of options as you type, and a (visually hidden until
 * needed) select carrying the real options and the real submitted value - picking one from the filtered list
 * copies its label back into the free-text input and collapses the list again.
 *
 * Ported from a PHP Blade reference implementation, reusing its two-field shape (visible free-type input +
 * collapsed select holding the real value) and its filtering rules (case-insensitive match on value or label,
 * list only expands once there are 2+ characters typed and at least one match) - but wired through json-dom's
 * own DomItem tree (via eventListeners set directly on each item, bound automatically on render) instead of
 * attaching to the real DOM by hand.
 *
 * This is a minimum/POC implementation: listeners are plain closures, not names registered for json-dom's
 * render-only/forwarding mode - fine for a component built and rendered locally, not yet for one whose events
 * need forwarding across a socket. See MAIN.md.
 */
declare const createTypeahead: (config: TypeaheadConfig) => DomItem;
export default createTypeahead;
