/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Base HTML element factories: thin DomItem wrappers matching real HTML elements, ported and reconciled from
 * the component templates duplicated across quizzes, workout-planner and the website.
 */
import anchor from './anchor'
import button from './button'
import div from './div'
import element from './element'
import fieldset from './fieldset'
import footer from './footer'
import form from './form'
import header from './header'
import heading from './heading'
import input from './input'
import label from './label'
import legend from './legend'
import listItem from './listItem'
import main from './main'
import nav from './nav'
import node from './node'
import option from './option'
import paragraph from './paragraph'
import radio from './radio'
import select from './select'
import span from './span'
import style from './style'
import submit from './submit'
import table from './table'
import tableBody from './tableBody'
import tableData from './tableData'
import tableHead from './tableHead'
import tableHeading from './tableHeading'
import tableRow from './tableRow'
import text from './text'
import textArea from './textArea'
import unorderedList from './unorderedList'

export default {
  anchor,
  button,
  div,
  element,
  fieldset,
  footer,
  form,
  header,
  heading,
  input,
  label,
  legend,
  listItem,
  main,
  nav,
  node,
  option,
  paragraph,
  radio,
  select,
  span,
  style,
  submit,
  table,
  tableBody,
  tableData,
  tableHead,
  tableHeading,
  tableRow,
  text,
  textArea,
  unorderedList
}
