import node from './node'
import type { DomItem } from 'json-dom/dist/domItem/types'

/**
 * Create a text node DomItem.
 * @param nodeValue
 */
const text = (nodeValue: string = ''): DomItem => node('#text', nodeValue)

export default text
