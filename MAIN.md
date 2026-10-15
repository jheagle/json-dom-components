# json-dom-components

A minimal component library on [json-dom](https://github.com/jheagle/JSON-DOM): a set of base HTML element
factories, plus richer interactive components built on top of them.

## Why this exists

Three projects (`quizzes`, `workout-planner`, the website) had each grown their own, slightly-diverged copy of
the same small set of "build a `<div>`/`<input>`/`<label>`/..." json-dom factory functions. This package is
those functions ported into one place and reconciled, plus a home for new, richer components none of those
projects had yet - starting with a typeahead.

This is a POC/starter package: only what's needed for the components below. A later pass can round out
anything missing (sass theming, more components, a render-only/forwarding-safe listener registry) once a real
need for it shows up.

## Base components (`src/components`)

Thin wrappers around `jsonDom.createDomItem`, one function per real HTML element: `anchor`, `button`, `div`,
`element` (the one every other wrapper builds on), `fieldset`, `footer`, `form`, `header`, `heading`, `input`,
`label`, `legend`, `listItem`, `main`, `nav`, `node` (the actual base, wraps `createDomItem` directly), `option`,
`paragraph`, `radio`, `select`, `span`, `style`, `submit`, `table`/`tableBody`/`tableData`/`tableHead`/
`tableHeading`/`tableRow`, `text`, `textArea`, `unorderedList`.

Each one returns a `DomItem` - compose them the same way you would real HTML, then render with json-dom's own
`renderHtml`/`documentDomItem` as usual.

## Typeahead (`src/typeahead`)

`createTypeahead({ name, options, value?, placeholder?, className?, readonly? })` builds a filterable select: a
free-type input you type into to filter a list of options, and the real `<select>` (visually collapsed until
there's a match) that holds the actual submitted value. Picking an option copies its label back into the
free-type input and collapses the list again.

Ported from a PHP Blade reference implementation - same two-field shape, same filtering rule (case-insensitive
match on value or label text, list only expands once 2+ characters are typed and something matches) - but
wired through json-dom's own `eventListeners` (bound automatically wherever the component gets rendered)
instead of attaching to the real DOM by hand.

**Known POC limitation:** the typeahead's listeners are plain closures (`listenerFunc` set directly to a
function), not names registered through json-dom's `registerListener`. That's fine for a component rendered
and used locally, but it means this component's events can't currently be forwarded across json-dom's
render-only/socket mode (see battleship's own remote play for what that mode looks like) - revisit if a
consumer ever needs that.

Include `styles/typeahead.css` for the dropdown positioning - the show/hide behaviour itself needs no CSS, it's
the native `hidden` attribute.

## Clearable input (`src/clearableInput`)

`createClearableInput({ name, value?, placeholder?, className?, readonly? })` builds the common "search box"
pattern: a regular text input with a small "×" button on its right inner edge that clears it. The button only
shows once there's a value to clear (toggled on the input's own `input` event), and clicking it empties the
field and gives it focus back.

Same POC limitation as the typeahead: plain closures for its listeners, not registered names - fine locally,
not yet forwarding-safe.

Include `styles/clearableInput.css` for the button's positioning.

## Status

Not published to npm (not an npm package) - versioned via git tags/GitHub Releases only (`npm run release`).
Not yet wired into `quizzes`/`workout-planner`/the website - that's the next step, once this is reviewed.
