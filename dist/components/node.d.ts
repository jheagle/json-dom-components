import type { Attributes, DomItem } from 'treeloom/dist/domItem/types';
/**
 * Create the DomItem for any node, the base every other component builds on.
 * @param nodeName - Any document node name: a tag name, #text, #comment or #document.
 * @param nodeValue - The text of a text or comment node, null for elements.
 * @param children
 * @param attributes
 */
declare const node: (nodeName: string, nodeValue?: string | null, children?: DomItem[], attributes?: Attributes) => DomItem;
export default node;
