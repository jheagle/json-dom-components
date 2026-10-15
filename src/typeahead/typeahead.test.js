/**
 * @jest-environment jsdom
 */
import createTypeahead from './createTypeahead'
import filterOptions from './filterOptions'
import hideList from './hideList'
import selectOption from './selectOption'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' }
]

describe('createTypeahead', () => {
  test('builds a container with a free-type input and the real select, both carrying the right pieces', () => {
    const item = createTypeahead({ name: 'fruit', options })
    expect(item.nodeName).toBe('div')
    expect(item.attributes.className).toBe('typeahead')

    const [freeTypeInput, selectItem] = item.children
    expect(freeTypeInput.attributes).toMatchObject({ name: 'fruit-search', type: 'text' })
    expect(selectItem.attributes).toMatchObject({ name: 'fruit', hidden: true, size: 1 })
    expect(selectItem.children).toHaveLength(3)
    expect(selectItem.children.map(optionItem => optionItem.attributes.value)).toEqual(['apple', 'apricot', 'banana'])
  })

  test('pre-selects a given value: the matching option is selected and its label pre-fills the free-type input', () => {
    const item = createTypeahead({ name: 'fruit', options, value: 'banana' })
    const [freeTypeInput, selectItem] = item.children
    expect(freeTypeInput.attributes.value).toBe('Banana')
    const bananaOption = selectItem.children.find(optionItem => optionItem.attributes.value === 'banana')
    expect(bananaOption.attributes.selected).toBe(true)
  })

  test('readonly skips wiring any listeners and disables the real field', () => {
    const item = createTypeahead({ name: 'fruit', options, readonly: true })
    const [freeTypeInput, selectItem] = item.children
    expect(freeTypeInput.attributes.readonly).toBe(true)
    expect(selectItem.attributes.disabled).toBe(true)
    expect(freeTypeInput.eventListeners.keyup).toBeUndefined()
    expect(selectItem.eventListeners.change).toBeUndefined()
  })

  test('a non-readonly typeahead wires keyup/blur on the input and change/blur on the select', () => {
    const item = createTypeahead({ name: 'fruit', options })
    const [freeTypeInput, selectItem] = item.children
    expect(freeTypeInput.eventListeners.keyup).toHaveLength(1)
    expect(freeTypeInput.eventListeners.blur).toHaveLength(1)
    expect(selectItem.eventListeners.change).toHaveLength(1)
    expect(selectItem.eventListeners.blur).toHaveLength(1)
  })
})

describe('filterOptions', () => {
  const buildItems = () => {
    const item = createTypeahead({ name: 'fruit', options })
    const [, selectItem] = item.children
    return { selectItem, optionItems: selectItem.children }
  }

  test('a search term under 2 characters keeps the list collapsed, regardless of matches', () => {
    const { optionItems, selectItem } = buildItems()
    filterOptions('a', optionItems, selectItem)
    expect(selectItem.attributes.hidden).toBe(true)
    expect(optionItems.every(optionItem => optionItem.attributes.hidden !== true)).toBe(true)
  })

  test('matches by label or value, case-insensitively, hiding the rest and expanding the list', () => {
    const { optionItems, selectItem } = buildItems()
    filterOptions('AP', optionItems, selectItem)
    expect(selectItem.attributes.hidden).toBe(false)
    const [apple, apricot, banana] = optionItems
    expect(apple.attributes.hidden).toBe(false)
    expect(apricot.attributes.hidden).toBe(false)
    expect(banana.attributes.hidden).toBe(true)
    expect(selectItem.attributes.size).toBe(2)
  })

  test('no matches keeps the list collapsed even past 2 characters', () => {
    const { optionItems, selectItem } = buildItems()
    filterOptions('zz', optionItems, selectItem)
    expect(selectItem.attributes.hidden).toBe(true)
  })
})

describe('selectOption', () => {
  test('copies the matching option label onto the free-type input and collapses the list', () => {
    const item = createTypeahead({ name: 'fruit', options })
    const [freeTypeInput, selectItem] = item.children
    selectItem.attributes.hidden = false
    selectOption('apricot', options, freeTypeInput, selectItem)
    expect(freeTypeInput.attributes.value).toBe('Apricot')
    expect(selectItem.attributes.hidden).toBe(true)
  })

  test('a value matching nothing clears the free-type input', () => {
    const item = createTypeahead({ name: 'fruit', options, value: 'apple' })
    const [freeTypeInput, selectItem] = item.children
    selectOption('does-not-exist', options, freeTypeInput, selectItem)
    expect(freeTypeInput.attributes.value).toBe('')
  })
})

describe('hideList', () => {
  test('collapses an expanded list back to hidden, size 1', () => {
    const item = createTypeahead({ name: 'fruit', options })
    const [, selectItem] = item.children
    selectItem.attributes.hidden = false
    selectItem.attributes.size = 5
    hideList(selectItem)
    expect(selectItem.attributes.hidden).toBe(true)
    expect(selectItem.attributes.size).toBe(1)
  })
})
