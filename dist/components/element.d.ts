import type { Attributes, DomItem } from 'treeloom/dist/domItem/types';
/**
 * Create the DomItem of a real HTML element.
 * @param nodeName - a tag name, e.g. 'div'
 * @param children
 * @param className - left out of attributes entirely when not given, instead of setting an empty className
 * @param attributes
 */
declare const element: (nodeName: string, children?: DomItem[], className?: string, attributes?: Attributes) => DomItem;
export default element;
