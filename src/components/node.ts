import jsonDom from 'json-dom'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

/**
 * Create the DomItem for any node, the base every other component builds on.
 * @param nodeName - Any document node name: a tag name, #text, #comment or #document.
 * @param nodeValue - The text of a text or comment node, null for elements.
 * @param children
 * @param attributes
 */
const node = (nodeName: string, nodeValue: string | null = null, children: DomItem[] = [], attributes: Attributes = {}): DomItem =>
  jsonDom.createDomItem({ nodeName, nodeValue, attributes, children })

export default node
