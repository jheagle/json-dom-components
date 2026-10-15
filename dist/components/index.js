"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Base HTML element factories: thin DomItem wrappers matching real HTML elements, ported and reconciled from
 * the component templates duplicated across quizzes, workout-planner and the website.
 */
const anchor_1 = __importDefault(require("./anchor"));
const button_1 = __importDefault(require("./button"));
const div_1 = __importDefault(require("./div"));
const element_1 = __importDefault(require("./element"));
const fieldset_1 = __importDefault(require("./fieldset"));
const footer_1 = __importDefault(require("./footer"));
const form_1 = __importDefault(require("./form"));
const header_1 = __importDefault(require("./header"));
const heading_1 = __importDefault(require("./heading"));
const input_1 = __importDefault(require("./input"));
const label_1 = __importDefault(require("./label"));
const legend_1 = __importDefault(require("./legend"));
const listItem_1 = __importDefault(require("./listItem"));
const main_1 = __importDefault(require("./main"));
const nav_1 = __importDefault(require("./nav"));
const node_1 = __importDefault(require("./node"));
const option_1 = __importDefault(require("./option"));
const paragraph_1 = __importDefault(require("./paragraph"));
const radio_1 = __importDefault(require("./radio"));
const select_1 = __importDefault(require("./select"));
const span_1 = __importDefault(require("./span"));
const style_1 = __importDefault(require("./style"));
const submit_1 = __importDefault(require("./submit"));
const table_1 = __importDefault(require("./table"));
const tableBody_1 = __importDefault(require("./tableBody"));
const tableData_1 = __importDefault(require("./tableData"));
const tableHead_1 = __importDefault(require("./tableHead"));
const tableHeading_1 = __importDefault(require("./tableHeading"));
const tableRow_1 = __importDefault(require("./tableRow"));
const text_1 = __importDefault(require("./text"));
const textArea_1 = __importDefault(require("./textArea"));
const unorderedList_1 = __importDefault(require("./unorderedList"));
exports.default = {
  anchor: anchor_1.default,
  button: button_1.default,
  div: div_1.default,
  element: element_1.default,
  fieldset: fieldset_1.default,
  footer: footer_1.default,
  form: form_1.default,
  header: header_1.default,
  heading: heading_1.default,
  input: input_1.default,
  label: label_1.default,
  legend: legend_1.default,
  listItem: listItem_1.default,
  main: main_1.default,
  nav: nav_1.default,
  node: node_1.default,
  option: option_1.default,
  paragraph: paragraph_1.default,
  radio: radio_1.default,
  select: select_1.default,
  span: span_1.default,
  style: style_1.default,
  submit: submit_1.default,
  table: table_1.default,
  tableBody: tableBody_1.default,
  tableData: tableData_1.default,
  tableHead: tableHead_1.default,
  tableHeading: tableHeading_1.default,
  tableRow: tableRow_1.default,
  text: text_1.default,
  textArea: textArea_1.default,
  unorderedList: unorderedList_1.default
};