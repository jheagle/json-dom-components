import node from './node'
import text from './text'
import type { DomItem } from 'json-dom/dist/domItem/types'

const style = (styleContent: string = ''): DomItem => node('style', null, [text(styleContent)])

export default style
