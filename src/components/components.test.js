/**
 * @jest-environment jsdom
 */
import anchor from './anchor'
import button from './button'
import div from './div'
import element from './element'
import fieldset from './fieldset'
import form from './form'
import heading from './heading'
import input from './input'
import label from './label'
import legend from './legend'
import node from './node'
import option from './option'
import paragraph from './paragraph'
import radio from './radio'
import select from './select'
import submit from './submit'
import table from './table'
import tableBody from './tableBody'
import tableData from './tableData'
import tableHead from './tableHead'
import tableHeading from './tableHeading'
import tableRow from './tableRow'
import text from './text'
import textArea from './textArea'

describe('node', () => {
  test('creates a DomItem with the given nodeName, nodeValue, children and attributes', () => {
    const child = text('child')
    const item = node('div', null, [child], { id: 'x' })
    expect(item.nodeName).toBe('div')
    expect(item.nodeValue).toBeNull()
    expect(item.children).toEqual([child])
    expect(item.attributes).toEqual({ id: 'x' })
  })
})

describe('text', () => {
  test('creates a #text node carrying the given value', () => {
    const item = text('hello')
    expect(item.nodeName).toBe('#text')
    expect(item.nodeValue).toBe('hello')
  })
})

describe('element', () => {
  test('sets className only when one is given, not an empty string by default', () => {
    expect(element('div').attributes.className).toBeUndefined()
    expect(element('div', [], 'real-class').attributes.className).toBe('real-class')
  })

  test('passes children and extra attributes through', () => {
    const child = text('x')
    const item = element('div', [child], 'c', { id: 'y' })
    expect(item.children).toEqual([child])
    expect(item.attributes).toEqual({ className: 'c', id: 'y' })
  })
})

describe('simple element wrappers', () => {
  const cases = [
    ['div', div, 'div'],
    ['table', table, 'table'],
    ['tableHead', tableHead, 'thead'],
    ['tableBody', tableBody, 'tbody'],
    ['tableRow', tableRow, 'tr'],
    ['tableHeading', tableHeading, 'th'],
    ['tableData', tableData, 'td'],
    ['select', select, 'select']
  ]

  test.each(cases)('%s creates a %s', (_name, factory, expectedNodeName) => {
    const child = text('x')
    const item = factory([child], 'my-class')
    expect(item.nodeName).toBe(expectedNodeName)
    expect(item.children).toEqual([child])
    expect(item.attributes.className).toBe('my-class')
  })
})

describe('anchor', () => {
  test('defaults href to #, accepts a real one', () => {
    expect(anchor().attributes.href).toBe('#')
    expect(anchor('/real').attributes.href).toBe('/real')
  })
})

describe('heading', () => {
  test('builds h1 through h6 from the given level', () => {
    expect(heading(1).nodeName).toBe('h1')
    expect(heading(3).nodeName).toBe('h3')
    expect(heading(6).nodeName).toBe('h6')
  })
})

describe('paragraph', () => {
  test('puts the content text first, ahead of any given children, without mutating the input array', () => {
    const children = [text('after')]
    const item = paragraph('before', children)
    expect(item.children.map(c => c.nodeValue)).toEqual(['before', 'after'])
    expect(children).toHaveLength(1)
  })

  test('with no content, just uses the given children', () => {
    const children = [text('only')]
    expect(paragraph('', children).children).toBe(children)
  })
})

describe('legend / fieldset', () => {
  test('legend puts its content text first', () => {
    expect(legend('Pick one').children.map(c => c.nodeValue)).toEqual(['Pick one'])
  })

  test('fieldset wraps its children with a legend built from content', () => {
    const item = fieldset('Group', [text('field')])
    expect(item.nodeName).toBe('fieldset')
    expect(item.children[0].nodeName).toBe('legend')
    expect(item.children[1].nodeValue).toBe('field')
  })

  test('fieldset with no content skips the legend entirely', () => {
    const item = fieldset('', [text('field')])
    expect(item.children).toHaveLength(1)
  })
})

describe('label', () => {
  test('sets the for attribute and puts the content text first', () => {
    const item = label('Name', 'name-input')
    expect(item.nodeName).toBe('label')
    expect(item.attributes.for).toBe('name-input')
    expect(item.children.map(c => c.nodeValue)).toEqual(['Name'])
  })
})

describe('input', () => {
  test('only sets name/value when given', () => {
    const bare = input()
    expect(bare.attributes.name).toBeUndefined()
    expect(bare.attributes.value).toBeUndefined()
    const filled = input('email', 'who', 'me@example.com')
    expect(filled.attributes).toMatchObject({ type: 'email', name: 'who', value: 'me@example.com' })
  })
})

describe('radio / submit / button', () => {
  test('radio is a radio input with its value and optional checked state', () => {
    const item = radio('size', 'xl', true)
    expect(item.attributes).toMatchObject({ type: 'radio', name: 'size', value: 'xl', checked: true })
  })

  test('submit is a submit input carrying the label as its value', () => {
    const item = submit('go', 'Go!')
    expect(item.attributes).toMatchObject({ type: 'submit', name: 'go', value: 'Go!' })
  })

  test('button is a real <button> element, not an input', () => {
    const item = button('Click me')
    expect(item.nodeName).toBe('button')
    expect(item.attributes.type).toBe('button')
    expect(item.children[0].nodeValue).toBe('Click me')
  })
})

describe('option', () => {
  test('carries its value as an attribute and its label as text', () => {
    const item = option('v', 'Label')
    expect(item.attributes.value).toBe('v')
    expect(item.children[0].nodeValue).toBe('Label')
  })
})

describe('form', () => {
  test('only sets action/method when given', () => {
    expect(form().attributes.action).toBeUndefined()
    expect(form('/submit', 'post').attributes).toMatchObject({ action: '/submit', method: 'post' })
  })
})

describe('textArea', () => {
  test('only sets name when given', () => {
    expect(textArea().attributes.name).toBeUndefined()
    expect(textArea('bio').attributes.name).toBe('bio')
  })
})
