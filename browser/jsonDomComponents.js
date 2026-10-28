(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsonDomComponents = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeClearInput = void 0;
const toggleClearButton_1 = __importDefault(require("./toggleClearButton"));
/**
 * Clear the input's real value and its attributes (so it stays correct across a re-render), hide the clear
 * button, and give focus back to the input - matching the common "search box" convention.
 * @param inputItem
 * @param clearButton
 */
const clearInput = (inputItem, clearButton) => {
  inputItem.attributes.value = '';
  if (inputItem.element) {
    const element = inputItem.element;
    element.value = '';
    element.focus();
  }
  (0, toggleClearButton_1.default)(false, clearButton);
};
/**
 * A ready-to-attach click listener for the clear button.
 * @param inputItem
 * @param clearButton
 */
const makeClearInput = (inputItem, clearButton) => () => clearInput(inputItem, clearButton);
exports.makeClearInput = makeClearInput;
exports.default = clearInput;
},{"./toggleClearButton":4}],2:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const button_1 = __importDefault(require("../components/button"));
const div_1 = __importDefault(require("../components/div"));
const input_1 = __importDefault(require("../components/input"));
const clearInput_1 = require("./clearInput");
const toggleClearButton_1 = require("./toggleClearButton");
/**
 * A regular text input with a small "x" button on its right inner edge to clear it - the common "search box"
 * pattern. The button only shows once there's a value to clear.
 *
 * Minimum/POC implementation: like the typeahead, its listeners are plain closures, not names registered for
 * json-dom's render-only/forwarding mode. See MAIN.md.
 */
const createClearableInput = config => {
  const {
    name,
    value = '',
    placeholder = '',
    className,
    readonly = false
  } = config;
  const inputItem = (0, input_1.default)('text', name, value || null, [], 'clearable-input-field', {
    placeholder,
    ...(readonly ? {
      readonly: true
    } : {})
  });
  const clearButton = (0, button_1.default)('×', 'clearable-input-clear', {
    'aria-label': 'Clear',
    hidden: value.length === 0,
    ...(readonly ? {
      hidden: true,
      disabled: true
    } : {})
  });
  if (!readonly) {
    inputItem.eventListeners.input = [{
      listenerFunc: (0, toggleClearButton_1.makeToggleClearButton)(clearButton)
    }];
    clearButton.eventListeners.click = [{
      listenerFunc: (0, clearInput_1.makeClearInput)(inputItem, clearButton)
    }];
  }
  return (0, div_1.default)([inputItem, clearButton], className ?? 'clearable-input');
};
exports.default = createClearableInput;
},{"../components/button":6,"../components/div":7,"../components/input":15,"./clearInput":1,"./toggleClearButton":4}],3:[function(require,module,exports){
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
 * A text input with a clear ("x") button on its right inner edge.
 */
const createClearableInput_1 = __importDefault(require("./createClearableInput"));
exports.default = {
  createClearableInput: createClearableInput_1.default
};
},{"./createClearableInput":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeToggleClearButton = void 0;
/**
 * Show the clear button when there's a value to clear, hide it when the input is empty.
 * @param hasValue
 * @param clearButton
 */
const toggleClearButton = (hasValue, clearButton) => {
  clearButton.attributes.hidden = !hasValue;
  if (clearButton.element) {
    clearButton.element.hidden = !hasValue;
  }
};
/**
 * A ready-to-attach input listener: shows/hides the clear button based on the real input's current value.
 * @param clearButton
 */
const makeToggleClearButton = clearButton => event => toggleClearButton(event.target.value.length > 0, clearButton);
exports.makeToggleClearButton = makeToggleClearButton;
exports.default = toggleClearButton;
},{}],5:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const anchor = (href = '#', children = [], className, attributes = {}) => (0, element_1.default)('a', children, className, Object.assign({
  href
}, attributes));
exports.default = anchor;
},{"./element":8}],6:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const text_1 = __importDefault(require("./text"));
const button = (label, className, attributes = {}) => (0, element_1.default)('button', [(0, text_1.default)(label)], className, Object.assign({
  type: 'button'
}, attributes));
exports.default = button;
},{"./element":8,"./text":35}],7:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const div = (children = [], className, attributes = {}) => (0, element_1.default)('div', children, className, attributes);
exports.default = div;
},{"./element":8}],8:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const node_1 = __importDefault(require("./node"));
/**
 * Create the DomItem of a real HTML element.
 * @param nodeName - a tag name, e.g. 'div'
 * @param children
 * @param className - left out of attributes entirely when not given, instead of setting an empty className
 * @param attributes
 */
const element = (nodeName, children = [], className, attributes = {}) => {
  if (className !== undefined) {
    attributes.className = className;
  }
  return (0, node_1.default)(nodeName, null, children, attributes);
};
exports.default = element;
},{"./node":21}],9:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const legend_1 = __importDefault(require("./legend"));
const fieldset = (content = '', children = [], className, attributes = {}) => (0, element_1.default)('fieldset', content ? [(0, legend_1.default)(content), ...children] : children, className, attributes);
exports.default = fieldset;
},{"./element":8,"./legend":17}],10:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const footer = (children = [], className, attributes = {}) => (0, element_1.default)('footer', children, className, attributes);
exports.default = footer;
},{"./element":8}],11:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const form = (action = '', method = '', children = [], className, attributes = {}) => {
  if (action) {
    attributes.action = action;
  }
  if (method) {
    attributes.method = method;
  }
  return (0, element_1.default)('form', children, className, attributes);
};
exports.default = form;
},{"./element":8}],12:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const header = (children = [], className, attributes = {}) => (0, element_1.default)('header', children, className, attributes);
exports.default = header;
},{"./element":8}],13:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const heading = (level = 1, children = [], className, attributes = {}) => (0, element_1.default)(`h${level}`, children, className, attributes);
exports.default = heading;
},{"./element":8}],14:[function(require,module,exports){
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
},{"./anchor":5,"./button":6,"./div":7,"./element":8,"./fieldset":9,"./footer":10,"./form":11,"./header":12,"./heading":13,"./input":15,"./label":16,"./legend":17,"./listItem":18,"./main":19,"./nav":20,"./node":21,"./option":22,"./paragraph":23,"./radio":24,"./select":25,"./span":26,"./style":27,"./submit":28,"./table":29,"./tableBody":30,"./tableData":31,"./tableHead":32,"./tableHeading":33,"./tableRow":34,"./text":35,"./textArea":36,"./unorderedList":37}],15:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const input = (type = 'text', name = '', value = null, children = [], className, attributes = {}) => {
  attributes.type = type;
  if (name) {
    attributes.name = name;
  }
  if (value !== null) {
    attributes.value = value;
  }
  return (0, element_1.default)('input', children, className, attributes);
};
exports.default = input;
},{"./element":8}],16:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const text_1 = __importDefault(require("./text"));
const label = (content = '', labelFor = '', children = [], className, attributes = {}) => (0, element_1.default)('label', content ? [(0, text_1.default)(content), ...children] : children, className, Object.assign({
  for: labelFor
}, attributes));
exports.default = label;
},{"./element":8,"./text":35}],17:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const text_1 = __importDefault(require("./text"));
const legend = (content = '', children = [], className, attributes = {}) => (0, element_1.default)('legend', content ? [(0, text_1.default)(content), ...children] : children, className, attributes);
exports.default = legend;
},{"./element":8,"./text":35}],18:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const listItem = (children = [], className, attributes = {}) => (0, element_1.default)('li', children, className, attributes);
exports.default = listItem;
},{"./element":8}],19:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const main = (children = [], className, attributes = {}) => (0, element_1.default)('main', children, className, attributes);
exports.default = main;
},{"./element":8}],20:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const nav = (children = [], className, attributes = {}) => (0, element_1.default)('nav', children, className, attributes);
exports.default = nav;
},{"./element":8}],21:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const json_dom_1 = __importDefault(require("json-dom"));
/**
 * Create the DomItem for any node, the base every other component builds on.
 * @param nodeName - Any document node name: a tag name, #text, #comment or #document.
 * @param nodeValue - The text of a text or comment node, null for elements.
 * @param children
 * @param attributes
 */
const node = (nodeName, nodeValue = null, children = [], attributes = {}) => json_dom_1.default.createDomItem({
  nodeName,
  nodeValue,
  attributes,
  children
});
exports.default = node;
},{"json-dom":329}],22:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const text_1 = __importDefault(require("./text"));
const option = (value, label, className, attributes = {}) => (0, element_1.default)('option', [(0, text_1.default)(label)], className, Object.assign({
  value
}, attributes));
exports.default = option;
},{"./element":8,"./text":35}],23:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const text_1 = __importDefault(require("./text"));
const paragraph = (content = '', children = [], className, attributes = {}) => (0, element_1.default)('p', content ? [(0, text_1.default)(content), ...children] : children, className, attributes);
exports.default = paragraph;
},{"./element":8,"./text":35}],24:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const input_1 = __importDefault(require("./input"));
const radio = (name = '', value = '', checked = false, children = [], className, attributes = {}) => {
  attributes.value = value;
  if (checked) {
    attributes.checked = true;
  }
  return (0, input_1.default)('radio', name, null, children, className, attributes);
};
exports.default = radio;
},{"./input":15}],25:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const select = (children = [], className, attributes = {}) => (0, element_1.default)('select', children, className, attributes);
exports.default = select;
},{"./element":8}],26:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const span = (children = [], className, attributes = {}) => (0, element_1.default)('span', children, className, attributes);
exports.default = span;
},{"./element":8}],27:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const node_1 = __importDefault(require("./node"));
const text_1 = __importDefault(require("./text"));
const style = (styleContent = '') => (0, node_1.default)('style', null, [(0, text_1.default)(styleContent)]);
exports.default = style;
},{"./node":21,"./text":35}],28:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const input_1 = __importDefault(require("./input"));
const submit = (name = '', label = 'Submit', className, attributes = {}) => {
  attributes.value = label;
  return (0, input_1.default)('submit', name, null, [], className, attributes);
};
exports.default = submit;
},{"./input":15}],29:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const table = (children = [], className, attributes = {}) => (0, element_1.default)('table', children, className, attributes);
exports.default = table;
},{"./element":8}],30:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const tableBody = (children = [], className, attributes = {}) => (0, element_1.default)('tbody', children, className, attributes);
exports.default = tableBody;
},{"./element":8}],31:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const tableData = (children = [], className, attributes = {}) => (0, element_1.default)('td', children, className, attributes);
exports.default = tableData;
},{"./element":8}],32:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const tableHead = (children = [], className, attributes = {}) => (0, element_1.default)('thead', children, className, attributes);
exports.default = tableHead;
},{"./element":8}],33:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const tableHeading = (children = [], className, attributes = {}) => (0, element_1.default)('th', children, className, attributes);
exports.default = tableHeading;
},{"./element":8}],34:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const tableRow = (children = [], className, attributes = {}) => (0, element_1.default)('tr', children, className, attributes);
exports.default = tableRow;
},{"./element":8}],35:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const node_1 = __importDefault(require("./node"));
/**
 * Create a text node DomItem.
 * @param nodeValue
 */
const text = (nodeValue = '') => (0, node_1.default)('#text', nodeValue);
exports.default = text;
},{"./node":21}],36:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const textArea = (name = '', children = [], className, attributes = {}) => {
  if (name) {
    attributes.name = name;
  }
  return (0, element_1.default)('textarea', children, className, attributes);
};
exports.default = textArea;
},{"./element":8}],37:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const element_1 = __importDefault(require("./element"));
const unorderedList = (children = [], className, attributes = {}) => (0, element_1.default)('ul', children, className, attributes);
exports.default = unorderedList;
},{"./element":8}],38:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
/**
 * A minimal component library on json-dom: base HTML element factories plus richer interactive components.
 */
const index_1 = __importDefault(require("./clearableInput/index"));
const index_2 = __importDefault(require("./components/index"));
const index_3 = __importDefault(require("./typeahead/index"));
/**
 * Store a reference to the global scope which will be Window if rendered via browser
 */
const root = typeof window !== 'undefined' ? window : {};
const jsonDomComponents = {
  ...index_2.default,
  ...index_3.default,
  ...index_1.default
};
root.jsonDomComponents = jsonDomComponents;
module.exports = jsonDomComponents;
},{"./clearableInput/index":3,"./components/index":14,"./typeahead/index":42}],39:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const div_1 = __importDefault(require("../components/div"));
const input_1 = __importDefault(require("../components/input"));
const option_1 = __importDefault(require("../components/option"));
const select_1 = __importDefault(require("../components/select"));
const filterOptions_1 = require("./filterOptions");
const hideList_1 = require("./hideList");
const selectOption_1 = require("./selectOption");
/**
 * A typeahead: a free-text input that filters a list of options as you type, and a (visually hidden until
 * needed) select carrying the real options and the real submitted value - picking one from the filtered list
 * copies its label back into the free-text input and collapses the list again.
 *
 * Ported from a PHP Blade reference implementation, reusing its two-field shape (visible free-type input +
 * collapsed select holding the real value) and its filtering rules (case-insensitive match on value or label,
 * list only expands once there are 2+ characters typed and at least one match) - but wired through json-dom's
 * own DomItem tree (via eventListeners set directly on each item, bound automatically on render) instead of
 * attaching to the real DOM by hand.
 *
 * This is a minimum/POC implementation: listeners are plain closures, not names registered for json-dom's
 * render-only/forwarding mode - fine for a component built and rendered locally, not yet for one whose events
 * need forwarding across a socket. See MAIN.md.
 */
const createTypeahead = config => {
  const {
    name,
    options,
    value = '',
    placeholder = '',
    className,
    readonly = false
  } = config;
  const selected = options.find(candidate => candidate.value === value);
  const optionItems = options.map(choice => (0, option_1.default)(choice.value, choice.label, undefined, choice.value === value ? {
    selected: true
  } : {}));
  const freeTypeInput = (0, input_1.default)('text', `${name}-search`, selected ? selected.label : '', [], 'typeahead-search', {
    placeholder,
    ...(readonly ? {
      readonly: true
    } : {})
  });
  const selectItem = (0, select_1.default)(optionItems, 'typeahead-options', {
    name,
    hidden: true,
    size: 1,
    ...(value ? {
      value
    } : {}),
    ...(readonly ? {
      disabled: true
    } : {})
  });
  if (!readonly) {
    freeTypeInput.eventListeners.keyup = [{
      listenerFunc: (0, filterOptions_1.makeFilterOptions)(optionItems, selectItem)
    }];
    freeTypeInput.eventListeners.blur = [{
      listenerFunc: (0, hideList_1.makeHideList)(selectItem)
    }];
    selectItem.eventListeners.change = [{
      listenerFunc: (0, selectOption_1.makeSelectOption)(options, freeTypeInput, selectItem)
    }];
    selectItem.eventListeners.blur = [{
      listenerFunc: (0, hideList_1.makeHideList)(selectItem)
    }];
  }
  return (0, div_1.default)([freeTypeInput, selectItem], className ?? 'typeahead');
};
exports.default = createTypeahead;
},{"../components/div":7,"../components/input":15,"../components/option":22,"../components/select":25,"./filterOptions":40,"./hideList":41,"./selectOption":43,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.map.js":217}],40:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFilterOptions = void 0;
/**
 * Filter optionItems by whether their value or label text includes the search term (case-insensitive), hiding
 * everything else. Reveals the select (as a real dropdown, a few rows tall) once there is a real search term and
 * at least one match; otherwise keeps it collapsed - matching the reference Blade component's own behaviour.
 * @param searchTerm
 * @param optionItems
 * @param selectItem
 */
const filterOptions = (searchTerm, optionItems, selectItem) => {
  const term = searchTerm.trim().toLowerCase();
  let visibleCount = 0;
  optionItems.forEach(optionItem => {
    const label = (optionItem.children[0]?.nodeValue ?? '').toLowerCase();
    const value = String(optionItem.attributes.value ?? '').toLowerCase();
    const matches = term.length > 0 && (label.includes(term) || value.includes(term));
    optionItem.attributes.hidden = !matches;
    if (matches) {
      visibleCount++;
    }
    if (optionItem.element) {
      optionItem.element.hidden = !matches;
    }
  });
  const expand = term.length >= 2 && visibleCount > 0;
  selectItem.attributes.hidden = !expand;
  selectItem.attributes.size = expand ? Math.min(5, visibleCount) : 1;
  if (selectItem.element) {
    const element = selectItem.element;
    element.hidden = !expand;
    element.size = expand ? Math.min(5, visibleCount) : 1;
  }
};
/**
 * A ready-to-attach keyup listener: reads the real input's current value and filters the given options by it.
 * @param optionItems
 * @param selectItem
 */
const makeFilterOptions = (optionItems, selectItem) => event => filterOptions(event.target.value, optionItems, selectItem);
exports.makeFilterOptions = makeFilterOptions;
exports.default = filterOptions;
},{"core-js/modules/es.array.includes.js":199,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHideList = void 0;
/**
 * Collapse the options list: hidden again, back to a single visible row's worth of height.
 * @param selectItem
 */
const hideList = selectItem => {
  selectItem.attributes.hidden = true;
  selectItem.attributes.size = 1;
  if (selectItem.element) {
    const element = selectItem.element;
    element.hidden = true;
    element.size = 1;
  }
};
/**
 * A ready-to-attach listener (ignores the event) which collapses the given select's options list.
 * @param selectItem
 */
const makeHideList = selectItem => () => hideList(selectItem);
exports.makeHideList = makeHideList;
exports.default = hideList;
},{}],42:[function(require,module,exports){
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
 * A typeahead (filterable select) built on the base components.
 */
const createTypeahead_1 = __importDefault(require("./createTypeahead"));
exports.default = {
  createTypeahead: createTypeahead_1.default
};
},{"./createTypeahead":39}],43:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelectOption = void 0;
const hideList_1 = __importDefault(require("./hideList"));
/**
 * A pick was made (directly, or via the select's own change event): copy the matching option's label back into
 * the free-type input's real value and its attributes (so it stays correct across a re-render), then collapse
 * the list again.
 * @param selectedValue
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
const selectOption = (selectedValue, options, freeTypeInput, selectItem) => {
  const matched = options.find(candidate => candidate.value === selectedValue);
  const displayValue = matched ? matched.label : '';
  freeTypeInput.attributes.value = displayValue;
  if (freeTypeInput.element) {
    freeTypeInput.element.value = displayValue;
  }
  (0, hideList_1.default)(selectItem);
};
/**
 * A ready-to-attach change listener for the select: reads its real current value and applies the pick.
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
const makeSelectOption = (options, freeTypeInput, selectItem) => event => selectOption(event.target.value, options, freeTypeInput, selectItem);
exports.makeSelectOption = makeSelectOption;
exports.default = selectOption;
},{"./hideList":41,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayElement = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
/**
 * Element represents a node in an Arrayable.
 */
class ArrayElement {
  /**
   * Create the new Element instance, provide the data and optionally configure the type of Element.
   * @param data The data to be stored in this element.
   */
  constructor(data = null) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = ArrayElement;
    /** The data stored in this element. */
    this.data = null;
    this.data = data;
  }
}
/**
 * Make a new Element from the data given if it is not already a valid Element.
 * @param element Return a valid ArrayElement instance from given data, or even an already valid one.
 * @param classType Provide the type of IsElement to use.
 */
exports.ArrayElement = ArrayElement;
ArrayElement.make = (element, classType = ArrayElement) => {
  if (element === null || typeof element !== 'object') {
    // It is not an object (or it is null), so instantiate the Element with element as the data
    return new classType(element);
  }
  if (element.classType) {
    // Already valid Element, return as-is
    return element;
  }
  // Create the new node as the configured #classType
  return new classType(element);
};
/**
 * Convert an array into Element instances, return the head and tail Elements.
 * @param values Provide an array of data that will be converted to array of elements.
 * @param classType Provide the type of IsElement to use.
 */
ArrayElement.fromArray = (values = [], classType = ArrayElement) => values.reduce((references, element) => {
  const newElement = classType.make(element, classType);
  if (!references.head.length) {
    // Initialize the head and tail with the new node
    return {
      head: [newElement],
      tail: newElement
    };
  }
  // Only update the tail once head has been set, tail is always the most recent node
  references.head.push(newElement);
  references.tail = newElement;
  return references;
}, {
  head: [],
  tail: null
});
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arrayable = void 0;
var _ArrayElement = require("./ArrayElement");
var _ArrayIterator = require("../../recipes/ArrayIterator");
/**
 * arrayable list.
 */

/**
 * Arrayable represents a collection stored as an array.
 */
class Arrayable {
  /**
   * Create the new Arrayable instance, configure the Arrayable class.
   * @param elementClass The class used to wrap given data as elements.
   */
  constructor(elementClass = _ArrayElement.ArrayElement) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = Arrayable;
    /** The array which stores the elements of this Arrayable. */
    this.innerList = [];
    /** Whether the inner list has been initialized (it can only be initialized once). */
    this.initialized = false;
    this.elementClass = elementClass;
  }
  /**
   * Find the position of an element which must be in this list.
   * @param node The element to find
   * @throws {Error} When the element is not in this list
   */
  indexOfElement(node) {
    const index = this.innerList.indexOf(node);
    if (index < 0) {
      throw new Error('The reference element is not in this list.');
    }
    return index;
  }
  /**
   * Initialize the inner list, should only run once.
   * @param initialList Give the array of elements to start in this Arrayable.
   */
  initialize(initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize non-empty list.');
      return this;
    }
    this.initialized = true;
    this.innerList = initialList;
    return this;
  }
  /**
   * Retrieve the innerList used (the list itself, not a copy).
   */
  get list() {
    return this.innerList;
  }
  /**
   * Retrieve the first Element from the Arrayable
   * @returns The first element, or null when the Arrayable is empty
   */
  get first() {
    return this.length ? this.innerList[0] : null;
  }
  /**
   * Retrieve the last Element from the Arrayable
   * @returns The last element, or null when the Arrayable is empty
   */
  get last() {
    return this.length ? this.innerList[this.length - 1] : null;
  }
  /**
   * Return the length of the list.
   */
  get length() {
    return this.innerList.length;
  }
  /**
   * Insert a new node (or data) after a node.
   * @param node The existing node as reference, or null to insert at the start of the list
   * @param newNode The new node to go after the existing node
   * @throws {Error} When the reference node is not in this list
   */
  insertAfter(node, newNode) {
    // With no reference element, the new one goes after nothing: at the start of the list
    const insertAt = node === null || typeof node === 'undefined' ? -1 : this.indexOfElement(node);
    this.innerList.splice(insertAt + 1, 0, this.elementClass.make(newNode, this.elementClass));
    return this;
  }
  /**
   * Insert a new node (or data) before a node.
   * @param node The existing node as reference, or null to insert at the end of the list
   * @param newNode The new node to go before the existing node
   * @throws {Error} When the reference node is not in this list
   */
  insertBefore(node, newNode) {
    // With no reference element, the new one goes before nothing: at the end of the list
    const insertAt = node === null || typeof node === 'undefined' ? this.length : this.indexOfElement(node);
    this.innerList.splice(insertAt, 0, this.elementClass.make(newNode, this.elementClass));
    return this;
  }
  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param node The new node to add to the end of the list
   * @param after The existing last node
   */
  append(node, after = this.last) {
    if (after === this.last) {
      // Adding to the end does not need to search for where that is
      this.innerList.push(this.elementClass.make(node, this.elementClass));
      return this;
    }
    return this.insertAfter(after, node);
  }
  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param node The new node to add to the start of the list
   * @param before The existing first node
   */
  prepend(node, before = this.first) {
    if (before === this.first) {
      // Adding to the start does not need to search for where that is
      this.innerList.unshift(this.elementClass.make(node, this.elementClass));
      return this;
    }
    return this.insertBefore(before, node);
  }
  /**
   * Remove an element from this arrayable.
   * @param node The node we wish to remove (and it will be returned after removal)
   * @returns The removed node, or null when it was not in this list (nothing is removed)
   */
  remove(node) {
    const deleteAt = this.innerList.indexOf(node);
    if (deleteAt < 0) {
      return null;
    }
    this.innerList.splice(deleteAt, 1);
    return node;
  }
  /**
   * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
   * @param index The integer number for retrieving a node by position.
   */
  item(index) {
    if (index >= this.length) {
      // index is beyond array limit
      return null;
    }
    if (index >= 0) {
      // use the positive index at nth position from the beginning of the array
      return this.innerList[index];
    }
    const calculatedIndex = this.length + index;
    if (calculatedIndex < 0) {
      // negative index is beyond array limit (minus direction)
      return null;
    }
    // Return the item at nth position from the end of the array
    return this.innerList[calculatedIndex];
  }
  /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param callback The function to call for-each element
   * @param thisArg Optional, 'this' reference
   */
  forEach(callback, thisArg = this) {
    for (let i = 0; i < thisArg.length; ++i) {
      callback(thisArg.item(i), i, thisArg);
    }
    return thisArg;
  }
  /**
   * Be able to iterate over this class.
   */
  [Symbol.iterator]() {
    const index = 0;
    return new _ArrayIterator.ArrayIterator(this.innerList, index);
  }
}
/**
 * Convert an array to an Arrayable.
 * @param values An array of values which will be converted to elements in this arrayable
 * @param elementClass The class to use for each element
 * @param classType Provide the type of IsArrayable to use.
 */
exports.Arrayable = Arrayable;
Arrayable.fromArray = (values = [], elementClass = _ArrayElement.ArrayElement, classType = Arrayable) => {
  const list = new classType(elementClass);
  return list.initialize(elementClass.fromArray(values).head);
};
},{"../../recipes/ArrayIterator":60,"./ArrayElement":44}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoubleLinker = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _Linker = require("../linked-list/Linker");
/**
 * DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.
 * @extends Linker
 */
class DoubleLinker {
  /**
   * Create the new DoubleLinker instance, provide the data and optionally the next and prev references.
   * @param nodeData The settings for the new linker.
   * @param nodeData.data The data to be stored in this linker
   * @param nodeData.next The reference to the next linker if any
   * @param nodeData.prev The reference to the previous linker if any
   */
  constructor({
    data = null,
    next = null,
    prev = null
  } = {}) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = DoubleLinker;
    /** The data stored in this linker. */
    this.data = null;
    /** The linker after this one, or null when this is the last. */
    this.next = null;
    /** The linker before this one, or null when this is the first. */
    this.prev = null;
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param linker Return a valid Linker instance from given data, or even an already valid one.
 * @param classType Provide the type of IsDoubleLinker to use.
 */
exports.DoubleLinker = DoubleLinker;
DoubleLinker.make = (linker, classType = DoubleLinker) => {
  return _Linker.Linker.make(linker, classType);
};
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param values Provide an array of data that will be converted to a chain of linkers.
 * @param classType Provide the type of IsDoubleLinker to use.
 */
DoubleLinker.fromArray = (values = [], classType = DoubleLinker) => values.reduce((references, linker) => {
  const newLinker = classType.make(linker, classType);
  if (references.head === null) {
    // Initialize the head and tail with the new node
    return {
      head: newLinker,
      tail: newLinker
    };
  }
  newLinker.prev = references.tail;
  // Only update the tail once head has been set, tail is always the most recent node
  references.tail.next = newLinker;
  references.tail = newLinker;
  return references;
}, {
  head: null,
  tail: null
});
},{"../linked-list/Linker":49,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoublyLinkedList = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _DoubleLinker = require("./DoubleLinker");
var _DoubleLinkerIterator = require("../../recipes/DoubleLinkerIterator");
var _LinkedList = require("../linked-list/LinkedList");
/**
 * doubly linked list.
 */

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 * @extends LinkedList
 */
class DoublyLinkedList {
  /**
   * Create the new DoublyLinkedList instance.
   * @param linkerClass The class used to wrap given data as linkers.
   */
  constructor(linkerClass = _DoubleLinker.DoubleLinker) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = DoublyLinkedList;
    /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
    this.innerList = null;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    this.initialized = false;
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    this.tailCache = null;
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    this.countCache = null;
    this.linkerClass = linkerClass;
  }
  /**
   * Initialize the inner list, should only run once.
   * @param initialList Give the list of double-linkers to start in this doubly linked-list.
   */
  initialize(initialList) {
    // Borrowed from LinkedList, which types its return as a LinkedList although it returns whatever list called it
    return _LinkedList.LinkedList.prototype.initialize.call(this, initialList);
  }
  /**
   * Retrieve the innerList used (the list itself, not a copy).
   */
  get list() {
    return this.innerList;
  }
  /**
   * Retrieve the first DoubleLinker in the list.
   */
  get first() {
    let head = this.innerList;
    if (head === null) {
      return null;
    }
    // innerList is normally the head already, walking back also finds anything linked on before it outside of this list
    while (head.prev !== null) {
      head = head.prev;
    }
    this.innerList = head;
    return head;
  }
  /**
   * Retrieve the last DoubleLinker in the list. The end is remembered, so this does not walk the list.
   */
  get last() {
    if (this.innerList === null) {
      return null;
    }
    let tail = this.tailCache !== null ? this.tailCache : this.innerList;
    // The remembered tail is normally the end already, walking on from it also finds anything linked on outside of this list
    while (tail.next !== null) {
      tail = tail.next;
    }
    this.tailCache = tail;
    return tail;
  }
  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   */
  get length() {
    if (this.countCache === null) {
      this.reset();
    }
    return this.countCache;
  }
  /**
   * Insert a new node (or data) after a node.
   * @param node The existing node as reference (which must be in this list, this is not checked), or null to insert at the start of the list
   * @param newNode The new node to go after the existing node
   */
  insertAfter(node, newNode) {
    newNode = this.linkerClass.make(newNode, this.linkerClass);
    if (node === null || typeof node === 'undefined') {
      // After nothing means at the start of the list
      const head = this.first;
      newNode.prev = null;
      newNode.next = head;
      if (head) {
        head.prev = newNode;
      } else {
        this.tailCache = newNode;
      }
      this.innerList = newNode;
    } else {
      // Ensure the next reference of this node is assigned to the new node
      newNode.next = node.next;
      // Ensure this node is assigned as the prev reference of the new node
      newNode.prev = node;
      // Then set this node's next reference to the new node
      node.next = newNode;
      if (newNode.next) {
        // Update the next reference to ensure circular reference for prev points to the new node
        newNode.next.prev = newNode;
      } else {
        this.tailCache = newNode;
      }
    }
    if (this.countCache !== null) {
      ++this.countCache;
    }
    return this;
  }
  /**
   * Insert a new node (or data) before a node.
   * @param node The existing node as reference (which must be in this list, this is not checked), or null to insert at the end of the list
   * @param newNode The new node to go before the existing node
   */
  insertBefore(node, newNode) {
    newNode = this.linkerClass.make(newNode, this.linkerClass);
    if (node === null || typeof node === 'undefined') {
      // Before nothing means at the end of the list
      const tail = this.last;
      newNode.next = null;
      newNode.prev = tail;
      if (tail === null) {
        this.innerList = newNode;
      } else {
        tail.next = newNode;
      }
      this.tailCache = newNode;
    } else {
      // The new node will reference this prev node as prev
      newNode.prev = node.prev;
      // The new node will reference this node as next
      newNode.next = node;
      // This prev will reference the new node
      node.prev = newNode;
      if (newNode.prev) {
        // Update the prev reference to ensure circular reference for next points to the new node
        newNode.prev.next = newNode;
      } else {
        this.innerList = newNode;
      }
    }
    if (this.countCache !== null) {
      ++this.countCache;
    }
    return this;
  }
  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param node The new node to add to the end of the list
   * @param after The existing last node
   */
  append(node, after = this.last) {
    return this.insertAfter(after, node);
  }
  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param node The new node to add to the start of the list
   * @param before The existing first node
   */
  prepend(node, before = this.first) {
    return this.insertBefore(before, node);
  }
  /**
   * Remove a linker from this linked list.
   * @param node The node we wish to remove (and it will be returned after removal)
   */
  remove(node) {
    if (node === null || typeof node === 'undefined') {
      return null;
    }
    if (node.prev) {
      // The previous node will reference this next node
      node.prev.next = node.next;
    }
    if (node.next) {
      // The next node will reference this previous node
      node.next.prev = node.prev;
    }
    // The list finds its head by walking from innerList, so it must not keep pointing at the node being removed. For the
    // last remaining node there is nothing to walk to, which would otherwise leave the removed node in the list.
    if (this.innerList === node) {
      this.innerList = node.next || node.prev || null;
    }
    if (this.tailCache === node) {
      this.tailCache = node.prev;
    }
    if (this.innerList === null) {
      this.tailCache = null;
    }
    if (this.countCache !== null) {
      --this.countCache;
    }
    return node;
  }
  /**
   * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The list's
   * own methods keep these up to date, so this is only needed after linkers were changed directly.
   */
  reset() {
    // Start at the pointer for the list
    let pointer = this.innerList;
    if (pointer === null) {
      this.countCache = 0;
      this.tailCache = null;
      return null;
    }
    // Follow references back to the beginning
    while (pointer.prev !== null) {
      pointer = pointer.prev;
    }
    // We are pointing to the true head, now count along to the end to find the tail and the length
    this.innerList = pointer;
    let count = 0;
    let tail = pointer;
    let current = pointer;
    while (current !== null) {
      ++count;
      tail = current;
      current = current.next;
    }
    this.countCache = count;
    this.tailCache = tail;
    return pointer;
  }
  /**
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @param index The integer number for retrieving a node by position.
   */
  item(index) {
    if (index >= 0) {
      // For a positive index, start from the beginning of the list until the current item counter equals our index
      let current = this.first;
      let currentIndex = -1;
      while (++currentIndex < index && current !== null) {
        current = current.next;
      }
      return currentIndex === index ? current : null;
    }
    // For a negative index, get the delta of index and length, then go backwards until we reach that delta
    let current = this.last;
    let currentIndex = this.length;
    const calculatedIndex = this.length + index;
    if (calculatedIndex < 0) {
      return null;
    }
    while (--currentIndex > calculatedIndex && current !== null) {
      current = current.prev;
    }
    return currentIndex === calculatedIndex ? current : null;
  }
  /**
   * Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.
   * @param callback The function to call for-each double linker
   * @param thisArg Optional, 'this' reference
   * @returns The list which was iterated.
   */
  forEach(callback, thisArg = this) {
    return _LinkedList.LinkedList.prototype.forEach.call(this, callback, thisArg);
  }
  /**
   * Be able to iterate over this class.
   */
  [Symbol.iterator]() {
    const current = this.first;
    return new _DoubleLinkerIterator.DoubleLinkerIterator(current);
  }
}
/**
 * Convert an array into a DoublyLinkedList instance, return the new instance.
 * @param values An array of values which will be converted to linkers in this doubly-linked-list
 * @param linkerClass The class to use for each linker
 * @param classType Provide the type of IsArrayable to use.
 */
exports.DoublyLinkedList = DoublyLinkedList;
DoublyLinkedList.fromArray = (values = [], linkerClass = _DoubleLinker.DoubleLinker, classType = DoublyLinkedList) => {
  return _LinkedList.LinkedList.fromArray(values, linkerClass, classType);
};
},{"../../recipes/DoubleLinkerIterator":61,"../linked-list/LinkedList":48,"./DoubleLinker":46,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedList = void 0;
var _Linker = require("./Linker");
var _LinkerIterator = require("../../recipes/LinkerIterator");
var _Arrayable = require("../arrayable/Arrayable");
/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
class LinkedList {
  /**
   * Create the new LinkedList instance.
   * @param linkerClass The class used to wrap given data as linkers.
   */
  constructor(linkerClass = _Linker.Linker) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = LinkedList;
    /** The first linker of the list (null when the list is empty), from which the whole list is reached. */
    this.innerList = null;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    this.initialized = false;
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    this.tailCache = null;
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    this.countCache = null;
    this.linkerClass = linkerClass;
  }
  /**
   * Initialize the inner list, should only run once.
   * @param initialList Give the list of linkers to start in this linked-list.
   */
  initialize(initialList) {
    // Borrowed from Arrayable, which types its return as an Arrayable although it returns whatever list called it
    return _Arrayable.Arrayable.prototype.initialize.call(this, initialList);
  }
  /**
   * Retrieve the innerList used (the list itself, not a copy).
   */
  get list() {
    return this.innerList;
  }
  /**
   * Retrieve the first Linker in the list.
   */
  get first() {
    return this.innerList;
  }
  /**
   * Retrieve the last Linker in the list. The end is remembered, so this does not walk the list.
   */
  get last() {
    if (this.innerList === null) {
      return null;
    }
    let tail = this.tailCache !== null ? this.tailCache : this.innerList;
    // The remembered tail is normally the end already, walking on from it also finds anything linked on outside of this list
    while (tail.next !== null) {
      tail = tail.next;
    }
    this.tailCache = tail;
    return tail;
  }
  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   */
  get length() {
    if (this.countCache === null) {
      this.reset();
    }
    return this.countCache;
  }
  /**
   * Insert a new node (or data) after a node.
   * @param node The existing node as reference, or null to insert at the start of the list
   * @param newNode The new node to go after the existing node
   */
  insertAfter(node, newNode) {
    newNode = this.linkerClass.make(newNode, this.linkerClass);
    if (node === null || typeof node === 'undefined') {
      // After nothing means at the start of the list
      newNode.next = this.innerList;
      if (this.innerList === null) {
        this.tailCache = newNode;
      }
      this.innerList = newNode;
    } else {
      newNode.next = node.next;
      node.next = newNode;
      if (newNode.next === null) {
        this.tailCache = newNode;
      }
    }
    if (this.countCache !== null) {
      ++this.countCache;
    }
    return this;
  }
  /**
   * Insert a new node (or data) before a node.
   * @param node The existing node as reference, or null to insert at the end of the list
   * @param newNode The new node to go before the existing node
   * @throws {Error} When the reference node is not in this list
   */
  insertBefore(node, newNode) {
    newNode = this.linkerClass.make(newNode, this.linkerClass);
    if (node === null || typeof node === 'undefined') {
      // Before nothing means at the end of the list
      const tail = this.last;
      newNode.next = null;
      if (tail === null) {
        this.innerList = newNode;
      } else {
        tail.next = newNode;
      }
      this.tailCache = newNode;
    } else {
      let prevNode = null;
      let currentNode = this.first;
      while (currentNode !== null && currentNode !== node) {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
      if (currentNode === null) {
        throw new Error('The reference node is not in this list.');
      }
      newNode.next = node;
      if (prevNode) {
        prevNode.next = newNode;
      } else {
        this.innerList = newNode;
      }
    }
    if (this.countCache !== null) {
      ++this.countCache;
    }
    return this;
  }
  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param node The new node to add to the end of the list
   * @param after The existing last node
   */
  append(node, after = this.last) {
    return this.insertAfter(after, node);
  }
  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param node The new node to add to the start of the list
   * @param before The existing first node
   */
  prepend(node, before = this.first) {
    return this.insertBefore(before, node);
  }
  /**
   * Remove a linker from this linked list.
   * @param node The node we wish to remove (and it will be returned after removal)
   * @returns The removed node, or null when it was not in this list (nothing is removed)
   */
  remove(node) {
    if (node === null || typeof node === 'undefined') {
      return null;
    }
    let prevNode = null;
    let currentNode = this.first;
    while (currentNode !== null && currentNode !== node) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      // The node is not in this list, so there is nothing to remove
      return null;
    }
    if (prevNode) {
      prevNode.next = node.next;
    } else {
      this.innerList = node.next;
    }
    if (this.tailCache === node) {
      this.tailCache = prevNode;
    }
    if (this.innerList === null) {
      this.tailCache = null;
    }
    if (this.countCache !== null) {
      --this.countCache;
    }
    return node;
  }
  /**
   * Refresh the remembered end and length of the list by walking it once. The list's own methods keep these up to date,
   * so this is only needed after linkers were changed directly (for example by setting next on a linker).
   * @returns The first linker of the list
   */
  reset() {
    let count = 0;
    let tail = null;
    let current = this.innerList;
    while (current !== null) {
      ++count;
      tail = current;
      current = current.next;
    }
    this.countCache = count;
    this.tailCache = tail;
    return this.innerList;
  }
  /**
   * Retrieve a Linker item from this list by numeric index, otherwise return null.
   * @param index The integer number for retrieving a node by position.
   */
  item(index) {
    if (index >= 0) {
      let current = this.first;
      let currentIndex = -1;
      while (++currentIndex < index && current !== null) {
        current = current.next;
      }
      return currentIndex === index ? current : null;
    }
    let current = this.first;
    let currentIndex = 0;
    const calculatedIndex = this.length + index;
    if (calculatedIndex < 0) {
      return null;
    }
    while (currentIndex < calculatedIndex && current !== null) {
      current = current.next;
      ++currentIndex;
    }
    return currentIndex === calculatedIndex ? current : null;
  }
  /**
   * Be able to run forEach on this LinkedList to iterate over the linkers.
   * @param callback The function to call for-each linker
   * @param thisArg Optional, 'this' reference
   */
  forEach(callback, thisArg = this) {
    let index = 0;
    let current = thisArg.first;
    while (current !== null) {
      callback(current, index, thisArg);
      current = current.next;
      ++index;
    }
    return thisArg;
  }
  /**
   * Be able to iterate over this class.
   */
  [Symbol.iterator]() {
    return new _LinkerIterator.LinkerIterator(this.first);
  }
}
/**
 * Convert an array to a LinkedList.
 * @param values An array of values which will be converted to linkers in this linked-list
 * @param linkerClass The class to use for each linker
 * @param classType Provide the type of IsArrayable to use.
 */
exports.LinkedList = LinkedList;
LinkedList.fromArray = (values = [], linkerClass = _Linker.Linker, classType = LinkedList) => {
  const list = new classType(linkerClass);
  return list.initialize(linkerClass.fromArray(values).head);
};
},{"../../recipes/LinkerIterator":62,"../arrayable/Arrayable":45,"./Linker":49}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Linker = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _ArrayElement = require("../arrayable/ArrayElement");
/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
class Linker {
  /**
   * Create the new Linker instance, provide the data and optionally give the next Linker.
   * @param nodeData The settings for the new linker.
   * @param nodeData.data The data to be stored in this linker
   * @param nodeData.next The reference to the next linker if any
   */
  constructor({
    data = null,
    next = null
  } = {}) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = Linker;
    /** The data stored in this linker. */
    this.data = null;
    /** The linker after this one, or null when this is the last. */
    this.next = null;
    this.data = data;
    this.next = next;
  }
}
/**
 * Make a new Linker from the data given if it is not already a valid Linker.
 * @param linker Return a valid Linker instance from given data, or even an already valid one.
 * @param classType Provide the type of IsLinker to use.
 */
exports.Linker = Linker;
Linker.make = (linker, classType = Linker) => {
  if (linker === null || typeof linker !== 'object') {
    // It is not an object (or it is null), so instantiate the Linker with element as the data
    return new classType({
      data: linker
    });
  }
  if (linker.classType) {
    // Already valid Linker, return as-is
    return linker;
  }
  if (!('data' in linker)) {
    // Not the settings for a linker (which would have data, even if it is falsy), so it is the data itself
    linker = {
      data: linker
    };
  }
  // Create the new node as the configured #classType
  return _ArrayElement.ArrayElement.make(linker, classType);
};
/**
 * Convert an array into Linker instances, return the head and tail Linkers.
 * @param values Provide an array of data that will be converted to a chain of linkers.
 * @param classType Provide the type of IsLinker to use.
 */
Linker.fromArray = (values = [], classType = Linker) => values.reduce((references, linker) => {
  const newLinker = classType.make(linker, classType);
  if (references.head === null) {
    // Initialize the head and tail with the new node
    return {
      head: newLinker,
      tail: newLinker
    };
  }
  // Only update the tail once head has been set, tail is always the most recent node
  references.tail.next = newLinker;
  references.tail = newLinker;
  return references;
}, {
  head: null,
  tail: null
});
},{"../arrayable/ArrayElement":44,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedTreeList = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _TreeLinker = require("./TreeLinker");
var _TreeLinkerIterator = require("../../recipes/TreeLinkerIterator");
var _DoublyLinkedList = require("../doubly-linked-list/DoublyLinkedList");
/**
 * doubly linked tree list.
 */

/**
 * Use one of the accessors of DoublyLinkedList (which keeps track of the head, tail and length) for a LinkedTreeList.
 * @param name The accessor to use
 * @param list The list to use it on
 */
const borrowedGetter = (name, list) => Object.getOwnPropertyDescriptor(_DoublyLinkedList.DoublyLinkedList.prototype, name).get.call(list);
/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 * @extends DoublyLinkedList
 */
class LinkedTreeList {
  /**
   * Create the new LinkedTreeList instance, configure the list class.
   * @param linkerClass The class used to wrap given data as tree linkers.
   */
  constructor(linkerClass = _TreeLinker.TreeLinker) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = LinkedTreeList;
    /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
    this.innerList = null;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    this.initialized = false;
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    this.tailCache = null;
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    this.countCache = null;
    /** The node these linkers are the children of, remembered so that it is known even while the list is empty (undefined until it is known). */
    this.ownerNode = undefined;
    this.linkerClass = linkerClass;
  }
  /**
   * Initialize the inner list, should only run once.
   * @param initialList Give the list of tree-linkers to start in this linked-tree-list.
   */
  initialize(initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize LinkedTreeList which is not empty.');
      return this;
    }
    this.initialized = true;
    this.innerList = initialList;
    return this;
  }
  /**
   * Retrieve the innerList used (the list itself, not a copy).
   */
  get list() {
    return this.innerList;
  }
  /**
   * Retrieve the first TreeLinker in the list.
   */
  get first() {
    return borrowedGetter('first', this);
  }
  /**
   * Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.
   */
  get last() {
    return borrowedGetter('last', this);
  }
  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   */
  get length() {
    return borrowedGetter('length', this);
  }
  /**
   * Get the parent of this tree list: the node these linkers are the children of (remembered even while the list is
   * empty), or null for the linkers at the top of a tree.
   */
  get parent() {
    if (this.ownerNode !== undefined) {
      return this.ownerNode;
    }
    const first = this.first;
    return first === null ? null : first.parent;
  }
  /**
   * Set the parent of this tree list: every linker in it gets the node as its parent, and the node gets this list as its
   * children. Linkers added to the list later get this parent too.
   * @param parent The new node to use as the parent for this group of children
   */
  set parent(parent) {
    this.ownerNode = parent;
    let current = this.first;
    while (current !== null) {
      current.parent = parent;
      current = current.next;
    }
    if (parent) {
      parent.children = this;
    }
  }
  /**
   * Return the root parent of the entire tree.
   */
  get rootParent() {
    let current = this.first;
    if (!current) {
      return null;
    }
    let parent = this.first.parent;
    while (parent !== null) {
      current = parent;
      parent = current.parent;
    }
    return current;
  }
  /**
   * Set the children on a parent item.
   * @param item The TreeLinker node (one of the linkers of this list) that will be the parent of the children
   * @param children The LinkedTreeList which has the child nodes to use, or null to remove the children of the item
   * @throws {Error} When the item is not one of the linkers of this list
   */
  setChildren(item, children = null) {
    // The item must be one of the linkers of this list (only the siblings are checked, not the whole tree)
    let isChild = false;
    this.forEach(linker => {
      if (linker === item) {
        isChild = true;
      }
    });
    if (!isChild) {
      throw new Error('The item is not one of the linkers of this list.');
    }
    if (children === null || typeof children === 'undefined') {
      item.children = null;
      return;
    }
    children.parent = item;
  }
  /**
   * Make a linker of the given node (or data) and make this list's parent its parent.
   * @param newNode The node (or data) which is being added to this list
   */
  adopt(newNode) {
    const linker = this.linkerClass.make(newNode, this.linkerClass);
    linker.parent = this.parent;
    return linker;
  }
  /**
   * Insert a new node (or data) after a node. The new node gets the parent of this list.
   * @param node The existing node as reference, or null to insert at the start of the list
   * @param newNode The new node to go after the existing node
   */
  insertAfter(node, newNode) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.insertAfter.call(this, node, this.adopt(newNode));
  }
  /**
   * Insert a new node (or data) before a node. The new node gets the parent of this list.
   * @param node The existing node as reference, or null to insert at the end of the list
   * @param newNode The new node to go before the existing node
   */
  insertBefore(node, newNode) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.insertBefore.call(this, node, this.adopt(newNode));
  }
  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param node The new node to add to the end of the list
   * @param after The existing last node
   */
  append(node, after = this.last) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.append.call(this, node, after);
  }
  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param node The new node to add to the start of the list
   * @param before The existing first node
   */
  prepend(node, before = this.first) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.prepend.call(this, node, before);
  }
  /**
   * Remove a linker from this linked list. The removed node no longer has a parent.
   * @param node The node we wish to remove (and it will be returned after removal)
   * @returns The removed node, or null when there was nothing to remove
   */
  remove(node) {
    const owner = this.parent;
    const removed = _DoublyLinkedList.DoublyLinkedList.prototype.remove.call(this, node);
    if (removed && removed.parent === owner) {
      // Remember whose children these are (the list may now be empty), the removed node no longer has that parent
      this.ownerNode = owner;
      removed.parent = null;
    }
    return removed;
  }
  /**
   * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The
   * list's own methods keep these up to date, so this is only needed after linkers were changed directly.
   */
  reset() {
    return _DoublyLinkedList.DoublyLinkedList.prototype.reset.call(this);
  }
  /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param index The integer number for retrieving a node by position.
   */
  item(index) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.item.call(this, index);
  }
  /**
   * Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.
   * @param callback The function to call for-each tree node
   * @param thisArg Optional, 'this' reference
   * @returns The list which was iterated.
   */
  forEach(callback, thisArg = this) {
    let index = 0;
    let current = thisArg.first;
    while (current !== null) {
      callback(current, index, thisArg);
      current = current.next;
      ++index;
    }
    return thisArg;
  }
  /**
   * Be able to iterate over this class: the linkers of this list and everything below them (left-first). It stays within
   * this list (it does not start at, or climb up to, the parents), use the parseTree service to parse a whole tree.
   */
  [Symbol.iterator]() {
    // The linkers of this list and everything below them, left-first. It stays within this list: it does not start at,
    // or climb up to, the parents (use the parseTree service to parse a whole tree)
    return new _TreeLinkerIterator.TreeLinkerIterator(this.first, this.parent);
  }
}
/**
 * Convert an array into a LinkedTreeList instance, return the new instance.
 * @param values An array of values which will be converted to nodes in this tree-list
 * @param linkerClass The class to use for each node
 * @param classType Provide the type of IsArrayable to use.
 */
exports.LinkedTreeList = LinkedTreeList;
LinkedTreeList.fromArray = (values = [], linkerClass = _TreeLinker.TreeLinker, classType = LinkedTreeList) => {
  const list = new classType(linkerClass);
  return list.initialize(linkerClass.fromArray(values).head);
};
},{"../../recipes/TreeLinkerIterator":64,"../doubly-linked-list/DoublyLinkedList":47,"./TreeLinker":51,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeLinker = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _DoubleLinker = require("../doubly-linked-list/DoubleLinker");
var _LinkedTreeList = require("./LinkedTreeList");
/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 * @extends DoubleLinker
 */
class TreeLinker {
  /**
   * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
   * @param settings The settings for the new tree node.
   * @param settings.data The data to be stored in this tree node
   * @param settings.next The reference to the next linker if any
   * @param settings.prev The reference to the previous linker if any
   * @param settings.children The references to child linkers if any
   * @param settings.parent The reference to a parent linker if any
   * @param listClass Give the type of list to use for storing the children
   */
  constructor({
    data = null,
    next = null,
    prev = null,
    children = null,
    parent = null,
    listClass = _LinkedTreeList.LinkedTreeList
  } = {}) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = TreeLinker;
    /** The data stored in this tree node. */
    this.data = null;
    /** The sibling after this node, or null when this is the last child. */
    this.next = null;
    /** The sibling before this node, or null when this is the first child. */
    this.prev = null;
    /** The node this node is a child of, or null for a root node. */
    this.parent = null;
    /** The list of the children of this node, or null when it has none. */
    this.children = null;
    this.data = data;
    this.next = next;
    this.prev = prev;
    this.parent = parent;
    this.children = this.childrenFromArray(children, listClass);
  }
  /**
   * Create the children for this tree from an array. Each child becomes a tree linker with this node as its parent: an
   * existing linker is kept as it is, an object with a data property gives the settings of the linker, and anything
   * else is the data of the linker.
   * @param children Provide an array of data / linker references to be children of this tree node.
   * @param listClass Give the type of list to use for storing the children
   */
  childrenFromArray(children = null, listClass = _LinkedTreeList.LinkedTreeList) {
    if (children === null) {
      return null;
    }
    // Every child is made into a tree linker (an existing one is kept as it is, and a plain value is the data) and is
    // given this node as its parent
    const nodes = children.map(child => {
      const linker = this.classType.make(child, this.classType);
      linker.parent = this;
      return linker;
    });
    // Creates a linked-tree-list to store the children, which remembers this node as its parent even when it is empty
    const list = listClass.fromArray(nodes, this.classType);
    list.parent = this;
    return list;
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param linker Return a valid TreeLinker instance from given data, or even an already valid one.
 * @param classType Provide the type of IsTreeNode to use.
 */
exports.TreeLinker = TreeLinker;
TreeLinker.make = (linker, classType = TreeLinker) => {
  return _DoubleLinker.DoubleLinker.make(linker, classType);
};
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param values Provide an array of data that will be converted to a chain of tree-linkers.
 * @param classType Provide the type of IsTreeNode to use.
 */
TreeLinker.fromArray = (values = [], classType = TreeLinker) => _DoubleLinker.DoubleLinker.fromArray(values, classType);
},{"../doubly-linked-list/DoubleLinker":46,"./LinkedTreeList":50,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _LinkedList = require("../linked-list/LinkedList");
var _Linker = require("../linked-list/Linker");
/**
 * queue
 */

/**
 * A first-in-first-out collection: items are added to the back with enqueue and taken from the front with dequeue.
 * Any value can be queued (it is stored as it is, whether it is a function, an object or null), and adding and taking
 * are constant time. To queue tasks which are run as they are taken use TaskQueue.
 */
class Queue {
  /**
   * Instantiate the queue, optionally with a list of items to start from.
   * @param queuedList The list of linkers to start in this queue (the first is the front)
   * @param listClass The type of list to create when no queued list is given
   * @param linkerClass The class used to hold each queued item
   */
  constructor(queuedList = null, listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) {
    this.linkerClass = linkerClass;
    this.queuedList = queuedList === null ? new listClass(linkerClass) : queuedList;
  }
  /**
   * Take the item from the front of the queue.
   * @returns The item, or null when the queue is empty
   */
  dequeue() {
    const front = this.queuedList.first;
    if (front === null || typeof front === 'undefined') {
      return null;
    }
    this.queuedList.remove(front);
    return front.data;
  }
  /**
   * Check whether the queue has no items.
   */
  empty() {
    return this.size() <= 0;
  }
  /**
   * Add an item to the back of the queue.
   * @param data The item to add
   * @returns This queue, so that adding can be chained
   */
  enqueue(data) {
    // The item is wrapped here rather than left to the list, since the list treats objects that look like a linker's
    // settings (they have a data property) as such, and a queue must give back exactly what it was given
    this.queuedList.append(new this.linkerClass({
      data
    }));
    return this;
  }
  /**
   * Look at the item at the front of the queue, without removing it.
   * @returns The item, or null when the queue is empty
   */
  peek() {
    const front = this.queuedList.first;
    return front === null || typeof front === 'undefined' ? null : front.data;
  }
  /**
   * Count the items in the queue.
   */
  size() {
    return this.queuedList.length;
  }
  /**
   * Iterate over the items from the front of the queue to the back, without removing them.
   */
  [Symbol.iterator]() {
    const linkers = this.queuedList[Symbol.iterator]();
    return {
      next: () => {
        const result = linkers.next();
        return result.done ? {
          done: true,
          value: undefined
        } : {
          done: false,
          value: result.value.data
        };
      }
    };
  }
}
/**
 * Convert an array to a Queue, the first value is at the front.
 * @param values The items to queue
 * @param listClass The type of list used to store the items
 * @param linkerClass The class used to hold each queued item
 */
exports.Queue = Queue;
Queue.fromArray = (values = [], listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) => {
  const queue = new Queue(null, listClass, linkerClass);
  values.forEach(value => queue.enqueue(value));
  return queue;
};
},{"../linked-list/LinkedList":48,"../linked-list/Linker":49,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queueable = void 0;
var _Linker = require("../linked-list/Linker");
/**
 * Queueable represents a runnable entry in a queue.
 * @extends Linker
 */
class Queueable {
  /**
   * Create a queueable item that can be used in a queue.
   * @param queueableData The settings for the new queueable.
   * @param queueableData.task The data to be stored in this queueable
   * @param queueableData.next The reference to the next queueable if any
   * @param queueableData.ready Indicate if the queueable is ready to run
   */
  constructor({
    task = null,
    next = null,
    ready = false
  } = {}) {
    /** The task (or data) this queueable holds. */
    this.data = null;
    /** The queueable after this one, or null when this is the last. */
    this.next = null;
    /** Whether this queueable has been run to completion. */
    this.complete = false;
    /** Whether this queueable may run, or a function which answers that when asked. */
    this.ready = false;
    /** Whether this queueable is running right now. */
    this.running = false;
    this.classType = Queueable;
    this.data = task;
    this.next = next;
    this.complete = false;
    this.ready = ready;
    this.running = false;
  }
  /**
   * Check ready state.
   */
  get isReady() {
    return typeof this.ready === 'function' ? this.ready() : this.ready;
  }
  /**
   * Retrieve the data which should be formed as a task.
   */
  get task() {
    if (typeof this.data === 'function') {
      return this.data;
    }
    return complete => typeof complete === 'function' ? complete({
      context: this.data
    }).context : this.data;
  }
  /**
   * Set this queueable as completed.
   * @param completeResponse The result to report for the task.
   * @param completeResponse.success Indicate when the task failed (use false) or give a success message
   * @param completeResponse.error Indicate a task was error-free (use false) or give an error message
   * @param completeResponse.context Provide additional data in the response
   */
  markCompleted({
    success = true,
    error = false,
    context = null
  } = {}) {
    this.complete = true;
    this.running = false;
    return {
      success,
      error,
      context
    };
  }
  /**
   * Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.
   */
  run() {
    if (!this.isReady) {
      // Not yet ready, return with errors
      return {
        success: false,
        error: 'Task is not ready',
        context: this.data
      };
    }
    if (this.running) {
      // Already running, return error since we cannot run again
      return {
        success: false,
        error: 'Queued task is already running, possible missing \'complete\' callback',
        context: this.data
      };
    }
    this.running = true;
    // Wrap the task in the markCompleted function, so we can set flags and format the response
    return this.task(this.markCompleted.bind(this));
  }
}
/**
 * Make a new Queueable from the data given if it is not already a valid Queueable.
 * @param queueable Return a valid Queueable instance from given data, or even an already valid one.
 * @param classType Provide the type of IsLinker to use.
 */
exports.Queueable = Queueable;
Queueable.make = (queueable, classType = Queueable) => {
  if (queueable === null || typeof queueable !== 'object') {
    // It is not an object (or it is null), so instantiate the Queueable with an element as the data
    return new classType({
      task: queueable,
      ready: true
    });
  }
  if (queueable.classType) {
    // Already valid Queueable, return as-is
    return queueable;
  }
  if (!('task' in queueable)) {
    queueable = {
      task: queueable,
      ready: true
    };
  }
  // Create the new node as the configured #classType
  return new classType(queueable);
};
/**
 * Convert an array into Queueable instances, return the head and tail Queueables.
 * @param values Provide an array of data that will be converted to a chain of queueable linkers.
 * @param classType Provide the type of IsLinker to use.
 */
Queueable.fromArray = (values = [], classType = Queueable) => _Linker.Linker.fromArray(values, classType);
},{"../linked-list/Linker":49}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskQueue = void 0;
var _Queueable = require("./Queueable");
var _LinkedList = require("../linked-list/LinkedList");
/**
 * task queue
 */

/**
 * Maintain a series of queued tasks (Queueables): dequeue() takes the next task from the front and RUNS it, giving each
 * task in turn a chance to run (a task which is not ready, or which has not finished, is placed at the back again).
 * This is a task scheduler, for a plain first-in-first-out collection of items use Queue.
 */
class TaskQueue {
  /**
   * Instantiate the queue with the given queue list.
   * @param queuedList Give the list of queueables to start in this queue.
   * @param listClass The type of list to create when no queued list is given.
   * @param queueableClass The class used to wrap queued items.
   */
  constructor(queuedList = null, listClass = _LinkedList.LinkedList, queueableClass = _Queueable.Queueable) {
    this.listClass = listClass;
    this.queueableClass = queueableClass;
    if (queuedList === null) {
      queuedList = new listClass(queueableClass);
    }
    this.queuedList = queuedList;
  }
  /**
   * Take a queued task from the front of the queue and run it if ready. A task which is not ready yet is kept in the
   * queue (never dropped), a task which is still running is reported as blocking and left to finish on its own, and
   * completed tasks are discarded.
   */
  dequeue() {
    let next = this.remove();
    // Tasks which already completed are discarded when they reach the front of the queue
    while (next && next.complete) {
      next = this.remove();
    }
    if (!next) {
      return {
        success: 'No more queueable tasks in the queue',
        error: false,
        context: this.queuedList
      };
    }
    if (next.running) {
      // The unfinished task reports back through its own complete callback, so it is not kept in the queue
      return {
        success: false,
        error: 'The queue has been blocked by an unfinished task.',
        context: next
      };
    }
    if (!next.isReady) {
      // Keep the task (at the back, so the next dequeue can try the other tasks) rather than losing it
      this.enqueue(next);
      // We could go check the next in queue here but if we end up in a state where nothing is ready it would infinite loop
      // Also, we want the loop handled externally
      return {
        success: false,
        error: 'Unable to find ready task.',
        context: next
      };
    }
    if (!this.empty()) {
      // Place back in queue to be checked once again next time, only if the queue will not be empty
      this.enqueue(next);
    }
    return next.run.call(next);
  }
  /**
   * Return true if the queue is empty (there are no tasks in the queue list)
   */
  empty() {
    return this.size() <= 0;
  }
  /**
   * Add a queued task to the end of the queue
   * @param queueable Add a new queueable to the end of the queue
   */
  enqueue(queueable) {
    this.queuedList.append(queueable);
  }
  /**
   * Take a look at the next queued task
   */
  peek() {
    return this.queuedList.first;
  }
  /**
   * Remove the next queued item and return it.
   */
  remove() {
    if (this.empty()) {
      return null;
    }
    return this.queuedList.remove(this.queuedList.first);
  }
  /**
   * Get the length of the current queue.
   */
  size() {
    return this.queuedList.length;
  }
}
/**
 * Convert an array to a TaskQueue.
 * @param values An array of values which will be converted to queueables in this queue
 * @param queueableClass The class to use for each queueable
 * @param listClass The class to use to manage the queueables
 */
exports.TaskQueue = TaskQueue;
TaskQueue.fromArray = (values = [], queueableClass = _Queueable.Queueable, listClass = _LinkedList.LinkedList) => {
  const list = new listClass(queueableClass);
  list.initialize(queueableClass.fromArray(values, queueableClass).head);
  return new TaskQueue(list, listClass, queueableClass);
};
},{"../linked-list/LinkedList":48,"./Queueable":53}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedCollection = void 0;
require("core-js/modules/esnext.map.delete-all.js");
require("core-js/modules/esnext.map.every.js");
require("core-js/modules/esnext.map.filter.js");
require("core-js/modules/esnext.map.find.js");
require("core-js/modules/esnext.map.find-key.js");
require("core-js/modules/esnext.map.includes.js");
require("core-js/modules/esnext.map.key-of.js");
require("core-js/modules/esnext.map.map-keys.js");
require("core-js/modules/esnext.map.map-values.js");
require("core-js/modules/esnext.map.merge.js");
require("core-js/modules/esnext.map.reduce.js");
require("core-js/modules/esnext.map.some.js");
require("core-js/modules/esnext.map.update.js");
require("core-js/modules/esnext.weak-map.delete-all.js");
/**
 * A keyed collection, partitioned by an arbitrary scope object: values are stored and looked up by key, with a
 * separate key space per scope. Scopes are held by a WeakMap, so a scope that nothing else references any more
 * takes its whole key space with it - useful anywhere state needs to be tracked per instance of something (a
 * tree's root, a session) without that something needing to hold the state itself.
 */
class ScopedCollection {
  constructor() {
    this.scopes = new WeakMap();
  }
  /**
   * Remove a key from a scope's key space.
   * @param scope The scope to remove the key from
   * @param key The key to remove
   * @returns Whether a value was actually removed
   */
  delete(scope, key) {
    const keyedValues = this.scopes.get(scope);
    return typeof keyedValues === 'undefined' ? false : keyedValues.delete(key);
  }
  /**
   * Look up a value by key within a scope.
   * @param scope The scope to look within
   * @param key The key to look up
   * @returns The value, or undefined when the scope or key is not present
   */
  get(scope, key) {
    var _a;
    return (_a = this.scopes.get(scope)) === null || _a === void 0 ? void 0 : _a.get(key);
  }
  /**
   * Check whether a key exists within a scope.
   * @param scope The scope to look within
   * @param key The key to check
   */
  has(scope, key) {
    var _a, _b;
    return (_b = (_a = this.scopes.get(scope)) === null || _a === void 0 ? void 0 : _a.has(key)) !== null && _b !== void 0 ? _b : false;
  }
  /**
   * Store a value under a key within a scope.
   * @param scope The scope to store the key within
   * @param key The key to store the value under
   * @param value The value to store
   * @returns This collection, so that setting can be chained
   */
  set(scope, key, value) {
    let keyedValues = this.scopes.get(scope);
    if (typeof keyedValues === 'undefined') {
      keyedValues = new Map();
      this.scopes.set(scope, keyedValues);
    }
    keyedValues.set(key, value);
    return this;
  }
}
exports.ScopedCollection = ScopedCollection;
},{"core-js/modules/esnext.map.delete-all.js":220,"core-js/modules/esnext.map.every.js":221,"core-js/modules/esnext.map.filter.js":222,"core-js/modules/esnext.map.find-key.js":223,"core-js/modules/esnext.map.find.js":224,"core-js/modules/esnext.map.includes.js":225,"core-js/modules/esnext.map.key-of.js":226,"core-js/modules/esnext.map.map-keys.js":227,"core-js/modules/esnext.map.map-values.js":228,"core-js/modules/esnext.map.merge.js":229,"core-js/modules/esnext.map.reduce.js":230,"core-js/modules/esnext.map.some.js":231,"core-js/modules/esnext.map.update.js":232,"core-js/modules/esnext.weak-map.delete-all.js":249}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _LinkedList = require("../linked-list/LinkedList");
var _Linker = require("../linked-list/Linker");
/**
 * stack.
 */

/**
 * A last-in-first-out collection: items are added to the top with push and taken from the top with pop. Any value can
 * be stacked (it is stored as it is, whether it is a function, an object or null), and adding and taking are constant
 * time. To stack tasks which are run as they are taken use TaskStack.
 */
class Stack {
  /**
   * Instantiate the stack, optionally with a list of items to start from.
   * @param stackedList The list of linkers to start in this stack (the first is the top)
   * @param listClass The type of list to create when no stacked list is given
   * @param linkerClass The class used to hold each stacked item
   */
  constructor(stackedList = null, listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) {
    this.linkerClass = linkerClass;
    this.stackedList = stackedList === null ? new listClass(linkerClass) : stackedList;
  }
  /**
   * Check whether the stack has no items.
   */
  empty() {
    return this.size() <= 0;
  }
  /**
   * Look at the item on the top of the stack, without removing it.
   * @returns The item, or null when the stack is empty
   */
  peek() {
    const top = this.stackedList.first;
    return top === null || typeof top === 'undefined' ? null : top.data;
  }
  /**
   * Take the item from the top of the stack.
   * @returns The item, or null when the stack is empty
   */
  pop() {
    const top = this.stackedList.first;
    if (top === null || typeof top === 'undefined') {
      return null;
    }
    this.stackedList.remove(top);
    return top.data;
  }
  /**
   * Add an item to the top of the stack.
   * @param data The item to add
   * @returns This stack, so that adding can be chained
   */
  push(data) {
    // The item is wrapped here rather than left to the list, since the list treats objects that look like a linker's
    // settings (they have a data property) as such, and a stack must give back exactly what it was given
    this.stackedList.prepend(new this.linkerClass({
      data
    }));
    return this;
  }
  /**
   * Count the items in the stack.
   */
  size() {
    return this.stackedList.length;
  }
  /**
   * The item on the top of the stack (the same as peek).
   * @returns The item, or null when the stack is empty
   */
  top() {
    return this.peek();
  }
  /**
   * Iterate over the items from the top of the stack to the bottom, without removing them.
   */
  [Symbol.iterator]() {
    const linkers = this.stackedList[Symbol.iterator]();
    return {
      next: () => {
        const result = linkers.next();
        return result.done ? {
          done: true,
          value: undefined
        } : {
          done: false,
          value: result.value.data
        };
      }
    };
  }
}
/**
 * Convert an array to a Stack by pushing each value in turn, so the last value is on the top.
 * @param values The items to stack
 * @param listClass The type of list used to store the items
 * @param linkerClass The class used to hold each stacked item
 */
exports.Stack = Stack;
Stack.fromArray = (values = [], listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) => {
  const stack = new Stack(null, listClass, linkerClass);
  values.forEach(value => stack.push(value));
  return stack;
};
},{"../linked-list/LinkedList":48,"../linked-list/Linker":49,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stackable = void 0;
var _Linker = require("../linked-list/Linker");
/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
class Stackable {
  /**
   * Create a stackable item that can be used in a stack.
   * @param stackData The settings for the new stackable.
   * @param stackData.task The data to be stored in this stackable
   * @param stackData.next The reference to the next stackable if any
   * @param stackData.ready Indicate if the stackable is ready to run
   */
  constructor({
    task = null,
    next = null,
    ready = false
  } = {}) {
    /** The task (or data) this stackable holds. */
    this.data = null;
    /** The stackable below this one, or null when this is the bottom. */
    this.next = null;
    this.classType = Stackable;
    this.data = task;
    this.next = next;
  }
  /**
   * Retrieve the data which should be formed as a task.
   */
  get task() {
    if (typeof this.data === 'function') {
      return this.data;
    }
    return () => this.data;
  }
  /**
   * Run the stacked task.
   */
  run() {
    return this.task();
  }
}
/**
 * Make a new Stackable from the data given if it is not already a valid Stackable.
 * @param stackable Return a valid Stackable instance from given data, or even an already valid one.
 * @param classType Provide the type of IsLinker to use.
 */
exports.Stackable = Stackable;
Stackable.make = (stackable, classType = Stackable) => {
  if (stackable === null || typeof stackable !== 'object') {
    // It is not an object (or it is null), so instantiate the Stackable with stackable as the data
    return new classType({
      task: stackable
    });
  }
  if (stackable.classType) {
    // Already valid Stackable, return as-is
    return stackable;
  }
  if (!('task' in stackable)) {
    stackable = {
      task: stackable
    };
  }
  // Create the new node as the configured stackableClass
  return new classType(stackable);
};
/**
 * Convert an array into Stackable instances, return the head and tail Stackables.
 * @param values Provide an array of data that will be converted to a chain of stackable linkers.
 * @param classType Provide the type of IsLinker to use.
 */
Stackable.fromArray = (values = [], classType = Stackable) => _Linker.Linker.fromArray(values, classType);
},{"../linked-list/Linker":49}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskStack = void 0;
var _Stackable = require("./Stackable");
var _LinkedList = require("../linked-list/LinkedList");
/**
 * task stack.
 */

/**
 * Store a collection of tasks (Stackables) which can only be inserted and removed from the top: pop() takes the task from
 * the top and RUNS it. For a plain last-in-first-out collection of items use Stack.
 */
class TaskStack {
  /**
   * Instantiate the state with the starter stacked list.
   * @param stackedList The list of stackables to start in this stack.
   * @param listClass The type of list to create when no stacked list is given.
   * @param stackableClass The class used to wrap stacked items.
   */
  constructor(stackedList = null, listClass = _LinkedList.LinkedList, stackableClass = _Stackable.Stackable) {
    this.listClass = listClass;
    this.stackableClass = stackableClass;
    if (stackedList === null) {
      stackedList = new listClass(stackableClass);
    }
    this.stackedList = stackedList;
  }
  /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   */
  empty() {
    return this.size() <= 0;
  }
  /**
   * Take a look at the next stacked task
   */
  top() {
    return this.stackedList.first;
  }
  /**
   * Remove the next stacked task and return it.
   */
  pop() {
    const next = this.remove();
    if (!next) {
      return {
        success: 'No more stackable tasks in the stack',
        error: false,
        context: this.stackedList
      };
    }
    return next.run();
  }
  /**
   * Push a stackable task to the top of the stack.
   * @param stackable Add a new stackable to the top of the stack
   */
  push(stackable) {
    this.stackedList.prepend(stackable);
  }
  /**
   * Remove the next stacked task and return it.
   */
  remove() {
    if (this.empty()) {
      return null;
    }
    return this.stackedList.remove(this.stackedList.first);
  }
  /**
   * Get the size of the current stack.
   */
  size() {
    return this.stackedList.length;
  }
}
/**
 * Convert an array to a TaskStack.
 * @param values An array of values which will be converted to stackables in this queue
 * @param stackableClass The class to use for each stackable
 * @param listClass The class to use to manage the stackables
 */
exports.TaskStack = TaskStack;
TaskStack.fromArray = (values = [], stackableClass = _Stackable.Stackable, listClass = _LinkedList.LinkedList) => {
  const list = new listClass(stackableClass);
  list.initialize(stackableClass.fromArray(values, stackableClass).head);
  return new TaskStack(list, listClass, stackableClass);
};
},{"../linked-list/LinkedList":48,"./Stackable":57}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ArrayElement", {
  enumerable: true,
  get: function () {
    return _ArrayElement.ArrayElement;
  }
});
Object.defineProperty(exports, "Arrayable", {
  enumerable: true,
  get: function () {
    return _Arrayable.Arrayable;
  }
});
Object.defineProperty(exports, "DoubleLinker", {
  enumerable: true,
  get: function () {
    return _DoubleLinker.DoubleLinker;
  }
});
Object.defineProperty(exports, "DoublyLinkedList", {
  enumerable: true,
  get: function () {
    return _DoublyLinkedList.DoublyLinkedList;
  }
});
Object.defineProperty(exports, "LinkedList", {
  enumerable: true,
  get: function () {
    return _LinkedList.LinkedList;
  }
});
Object.defineProperty(exports, "LinkedTreeList", {
  enumerable: true,
  get: function () {
    return _LinkedTreeList.LinkedTreeList;
  }
});
Object.defineProperty(exports, "Linker", {
  enumerable: true,
  get: function () {
    return _Linker.Linker;
  }
});
Object.defineProperty(exports, "Queue", {
  enumerable: true,
  get: function () {
    return _Queue.Queue;
  }
});
Object.defineProperty(exports, "Queueable", {
  enumerable: true,
  get: function () {
    return _Queueable.Queueable;
  }
});
Object.defineProperty(exports, "ScopedCollection", {
  enumerable: true,
  get: function () {
    return _ScopedCollection.ScopedCollection;
  }
});
Object.defineProperty(exports, "Stack", {
  enumerable: true,
  get: function () {
    return _Stack.Stack;
  }
});
Object.defineProperty(exports, "Stackable", {
  enumerable: true,
  get: function () {
    return _Stackable.Stackable;
  }
});
Object.defineProperty(exports, "TaskQueue", {
  enumerable: true,
  get: function () {
    return _TaskQueue.TaskQueue;
  }
});
Object.defineProperty(exports, "TaskStack", {
  enumerable: true,
  get: function () {
    return _TaskStack.TaskStack;
  }
});
Object.defineProperty(exports, "TreeLinker", {
  enumerable: true,
  get: function () {
    return _TreeLinker.TreeLinker;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "recipes", {
  enumerable: true,
  get: function () {
    return _recipes.recipes;
  }
});
Object.defineProperty(exports, "services", {
  enumerable: true,
  get: function () {
    return _services.services;
  }
});
var _ArrayElement = require("./collections/arrayable/ArrayElement");
var _Arrayable = require("./collections/arrayable/Arrayable");
var _DoubleLinker = require("./collections/doubly-linked-list/DoubleLinker");
var _DoublyLinkedList = require("./collections/doubly-linked-list/DoublyLinkedList");
var _Linker = require("./collections/linked-list/Linker");
var _LinkedList = require("./collections/linked-list/LinkedList");
var _TreeLinker = require("./collections/linked-tree-list/TreeLinker");
var _LinkedTreeList = require("./collections/linked-tree-list/LinkedTreeList");
var _Queueable = require("./collections/queue/Queueable");
var _Queue = require("./collections/queue/Queue");
var _TaskQueue = require("./collections/queue/TaskQueue");
var _ScopedCollection = require("./collections/scoped-collection/ScopedCollection");
var _Stackable = require("./collections/stack/Stackable");
var _Stack = require("./collections/stack/Stack");
var _TaskStack = require("./collections/stack/TaskStack");
var _recipes = require("./recipes/recipes");
var _services = require("./services/services");
/**
 * All of the collections available.
 */

/**
 * TODO:
 * 1. Create binary tree. Use the tree, but it has a limit of only two children per parent, and when adding / removing sort is applied. Add sort function in fromArray
 * 2. Create a heap (both min and max heap variants) which is similar to binary tree in structure, but tree having its min / max value as root. and it must insert on the left-most lowest level, and removes from root. Be able to easily swap nodes to ensure min / max ordering.
 * 3. Create a graph type which can have directional and undirectional variants for linking nodes
 */
// Every collection (with the linker / element class it is built from), the recipes and the services are available by
// name: import { LinkedList, Linker } from 'collect-your-stuff', require('collect-your-stuff').LinkedList ...

/**
 * All methods exported from this module are encapsulated within collect-your-stuff (this default export is the same
 * set of classes as the named exports).
 */
const collectYourStuff = {
  ArrayElement: _ArrayElement.ArrayElement,
  Arrayable: _Arrayable.Arrayable,
  DoubleLinker: _DoubleLinker.DoubleLinker,
  DoublyLinkedList: _DoublyLinkedList.DoublyLinkedList,
  Linker: _Linker.Linker,
  LinkedList: _LinkedList.LinkedList,
  TreeLinker: _TreeLinker.TreeLinker,
  LinkedTreeList: _LinkedTreeList.LinkedTreeList,
  Queueable: _Queueable.Queueable,
  Queue: _Queue.Queue,
  TaskQueue: _TaskQueue.TaskQueue,
  ScopedCollection: _ScopedCollection.ScopedCollection,
  Stackable: _Stackable.Stackable,
  Stack: _Stack.Stack,
  TaskStack: _TaskStack.TaskStack,
  recipes: _recipes.recipes,
  services: _services.services
};
var _default = exports.default = collectYourStuff;
if (void 0) {
  // @ts-ignore
  (void 0).collectYourStuff = collectYourStuff;
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.collectYourStuff = collectYourStuff;
}
},{"./collections/arrayable/ArrayElement":44,"./collections/arrayable/Arrayable":45,"./collections/doubly-linked-list/DoubleLinker":46,"./collections/doubly-linked-list/DoublyLinkedList":47,"./collections/linked-list/LinkedList":48,"./collections/linked-list/Linker":49,"./collections/linked-tree-list/LinkedTreeList":50,"./collections/linked-tree-list/TreeLinker":51,"./collections/queue/Queue":52,"./collections/queue/Queueable":53,"./collections/queue/TaskQueue":54,"./collections/scoped-collection/ScopedCollection":55,"./collections/stack/Stack":56,"./collections/stack/Stackable":57,"./collections/stack/TaskStack":58,"./recipes/recipes":65,"./services/services":68}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayIterator = void 0;
/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
class ArrayIterator {
  /**
   * Create an iterator over the given array.
   * @param innerList The elements to iterate over.
   * @param index The position to start from.
   */
  constructor(innerList, index = 0) {
    this.innerList = innerList;
    this.index = index;
  }
  /**
   * Get the next element, moving the iterator forward.
   * @param value Not used, present to match the Iterator interface.
   * @returns The next element, or done when there are no more.
   */
  next(value) {
    if (this.index < this.innerList.length) {
      return {
        value: this.innerList[this.index++],
        done: false
      };
    }
    return {
      value: undefined,
      done: true
    };
  }
}
exports.ArrayIterator = ArrayIterator;
},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoubleLinkerIterator = void 0;
/**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
class DoubleLinkerIterator {
  /**
   * Create an iterator starting at the given item.
   * @param current The item to start from.
   */
  constructor(current) {
    this.current = current;
  }
  /**
   * Get the current item and move on to the following one.
   * @param value Not used, present to match the Iterator interface.
   * @returns The current item, or done when there are no more.
   */
  next(value) {
    const result = {
      value: this.current,
      done: !this.current
    };
    this.current = this.current ? this.current.next : null;
    return result;
  }
}
exports.DoubleLinkerIterator = DoubleLinkerIterator;
},{}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkerIterator = void 0;
/**
 * Class LinkerIterator returns the next value when using linkers of linked type lists.
 */
class LinkerIterator {
  /**
   * Create an iterator starting at the given item.
   * @param current The item to start from.
   */
  constructor(current) {
    this.current = current;
  }
  /**
   * Get the current item and move on to the following one.
   * @param value Not used, present to match the Iterator interface.
   * @returns The current item, or done when there are no more.
   */
  next(value) {
    const result = {
      value: this.current,
      done: !this.current
    };
    this.current = this.current ? this.current.next : null;
    return result;
  }
}
exports.LinkerIterator = LinkerIterator;
},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runnable = void 0;
/**
 * Runnable class recipe.
 */
/**
 * Identify a class that can be run.
 */
class Runnable {
  /**
   * Instantiate a Runnable class.
   * @param data The task (a function) or the data which the task returns.
   */
  constructor(data = null) {
    /** The task (or data) this runnable holds. */
    this.data = null;
    this.data = data;
  }
  /**
   * Retrieve the data which should be formed as a task.
   */
  get task() {
    if (typeof this.data === 'function') {
      return this.data;
    }
    return () => this.data;
  }
  /**
   * Run the runnable task.
   */
  run() {
    return this.task();
  }
  /**
   * Check if a given thing is Runnable
   * @memberof Runnable
   * @param thing The value to check, or nothing to check whether this class is Runnable.
   */
  static isRunnable(thing) {
    if (typeof thing === 'undefined') {
      // No argument past, this class is runnable
      return this instanceof Runnable;
    }
    if (typeof thing !== 'object') {
      // It is not even an object, so cannot be a class instance
      return false;
    }
    if (typeof thing.task !== 'function') {
      // It does not have a task getter that returns a function
      return false;
    }
    // Finally, it has a runnable 'run' method. This method should return the result of running the task.
    return typeof thing.run === 'function';
  }
}
exports.Runnable = Runnable;
},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeLinkerIterator = void 0;
var _parseTreeNext = require("../services/parseTreeNext");
/**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
class TreeLinkerIterator {
  /**
   * Create an iterator starting at the given item.
   * @param current The item to start from.
   * @param boundaryParent The parent of the nodes to stay within (null for the top of a tree), the whole tree when not given.
   */
  constructor(current, boundaryParent) {
    this.current = current;
    this.boundaryParent = boundaryParent;
  }
  /**
   * Get the current item and move on to the following one (left-first, down each branch).
   * @param value Not used, present to match the Iterator interface.
   * @returns The current item, or done when there are no more.
   */
  next(value) {
    const result = {
      value: this.current,
      done: !this.current
    };
    this.current = (0, _parseTreeNext.parseTreeNext)(this.current, this.boundaryParent);
    return result;
  }
}
exports.TreeLinkerIterator = TreeLinkerIterator;
},{"../services/parseTreeNext":67}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recipes = void 0;
var _ArrayIterator = require("./ArrayIterator");
var _Runnable = require("./Runnable");
/**
 * sample classes which follow a pattern (have certain members or methods).
 */

/**
 * List of class declarations that can be used to specify attributes for a style of object / class.
 */
const recipes = exports.recipes = {
  ArrayIterator: _ArrayIterator.ArrayIterator,
  Runnable: _Runnable.Runnable
};
},{"./ArrayIterator":60,"./Runnable":63}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTree = void 0;
var _parseTreeNext = require("./parseTreeNext");
/**
 * Loop over all the nodes in a tree starting from left and apply a callback for each
 * @param tree
 * @param callback
 */
const parseTree = (tree, callback) => {
  let index = 0;
  let current = tree.rootParent;
  while (current !== null) {
    callback(current, index, tree);
    current = (0, _parseTreeNext.parseTreeNext)(current);
    ++index;
  }
  return tree;
};
exports.parseTree = parseTree;
},{"./parseTreeNext":67}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTreeNext = void 0;
/**
 * Be able to parse over every node in a tree.
 * 1. Start at root (get root parent)
 * 2. Get first child (repeat until no children)
 * 3. Check next child
 * 4. Repeat 2
 * 5. Repeat 3
 * 6. If no next child, return to parent and repeat 3
 * 7. Stop at root (next is null and parent is null
 * A boundary can be given to parse only part of a tree: going back up to the parents stops at the boundary, so the
 * parsing stays within the nodes whose parent is the boundary (and everything below them).
 * @param treeNode Provide a node in a tree and get the next node (left-first approach)
 * @param boundaryParent The parent of the nodes to stay within, null for the nodes at the top of a tree. When it is not given the whole tree is parsed.
 */
const parseTreeNext = (treeNode, boundaryParent) => {
  if (!treeNode) {
    return null;
  }
  if (treeNode.children && treeNode.children.length) {
    return treeNode.children.first;
  }
  if (treeNode.next) {
    return treeNode.next;
  }
  // Nothing more below or beside this node, so go back up until there is a node which has a next (or the boundary)
  let parent = treeNode.parent;
  while (parent && parent !== boundaryParent) {
    if (parent.next) {
      return parent.next;
    }
    parent = parent.parent;
  }
  return null;
};
exports.parseTreeNext = parseTreeNext;
},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = void 0;
var _parseTree = require("./parseTree");
var _parseTreeNext = require("./parseTreeNext");
/**
 * some useful resources when working with collections.
 */

/**
 * List helpful functions when dealing with collections.
 */
const services = exports.services = {
  parseTree: _parseTree.parseTree,
  parseTreeNext: _parseTreeNext.parseTreeNext
};
},{"./parseTree":66,"./parseTreeNext":67}],69:[function(require,module,exports){
'use strict';
var isCallable = require('../internals/is-callable');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};

},{"../internals/is-callable":123,"../internals/try-to-string":191}],70:[function(require,module,exports){
'use strict';
var has = require('../internals/map-helpers').has;

// Perform ? RequireInternalSlot(M, [[MapData]])
module.exports = function (it) {
  has(it);
  return it;
};

},{"../internals/map-helpers":143}],71:[function(require,module,exports){
'use strict';
var has = require('../internals/set-helpers').has;

// Perform ? RequireInternalSlot(M, [[SetData]])
module.exports = function (it) {
  has(it);
  return it;
};

},{"../internals/set-helpers":167}],72:[function(require,module,exports){
'use strict';
var has = require('../internals/weak-map-helpers').has;

// Perform ? RequireInternalSlot(M, [[WeakMapData]])
module.exports = function (it) {
  has(it);
  return it;
};

},{"../internals/weak-map-helpers":196}],73:[function(require,module,exports){
'use strict';
var has = require('../internals/weak-set-helpers').has;

// Perform ? RequireInternalSlot(M, [[WeakSetData]])
module.exports = function (it) {
  has(it);
  return it;
};

},{"../internals/weak-set-helpers":197}],74:[function(require,module,exports){
'use strict';
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var defineProperty = require('../internals/object-define-property').f;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/object-create":147,"../internals/object-define-property":149,"../internals/well-known-symbol":198}],75:[function(require,module,exports){
'use strict';
var isPrototypeOf = require('../internals/object-is-prototype-of');

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};

},{"../internals/object-is-prototype-of":154}],76:[function(require,module,exports){
'use strict';
var isObject = require('../internals/is-object');

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};

},{"../internals/is-object":127}],77:[function(require,module,exports){
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/length-of-array-like":141,"../internals/to-absolute-index":181,"../internals/to-indexed-object":182}],78:[function(require,module,exports){
'use strict';
var anObject = require('../internals/an-object');
var iteratorClose = require('../internals/iterator-close');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

},{"../internals/an-object":76,"../internals/iterator-close":135}],79:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this":105}],80:[function(require,module,exports){
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var isCallable = require('../internals/is-callable');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

},{"../internals/classof-raw":79,"../internals/is-callable":123,"../internals/to-string-tag-support":189,"../internals/well-known-symbol":198}],81:[function(require,module,exports){
'use strict';
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

},{"../internals/has-own-property":114,"../internals/object-define-property":149,"../internals/object-get-own-property-descriptor":150,"../internals/own-keys":159}],82:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":97}],83:[function(require,module,exports){
'use strict';
// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};

},{}],84:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":85,"../internals/descriptors":91,"../internals/object-define-property":149}],85:[function(require,module,exports){
'use strict';
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],86:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};

},{"../internals/create-property-descriptor":85,"../internals/descriptors":91,"../internals/object-define-property":149}],87:[function(require,module,exports){
'use strict';
var makeBuiltIn = require('../internals/make-built-in');
var defineProperty = require('../internals/object-define-property');

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

},{"../internals/make-built-in":142,"../internals/object-define-property":149}],88:[function(require,module,exports){
'use strict';
var isCallable = require('../internals/is-callable');
var definePropertyModule = require('../internals/object-define-property');
var makeBuiltIn = require('../internals/make-built-in');
var defineGlobalProperty = require('../internals/define-global-property');

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

},{"../internals/define-global-property":90,"../internals/is-callable":123,"../internals/make-built-in":142,"../internals/object-define-property":149}],89:[function(require,module,exports){
'use strict';
var defineBuiltIn = require('../internals/define-built-in');

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};

},{"../internals/define-built-in":88}],90:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};

},{"../internals/global-this":113}],91:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

},{"../internals/fails":97}],92:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var isObject = require('../internals/is-object');

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global-this":113,"../internals/is-object":127}],93:[function(require,module,exports){
'use strict';
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],94:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';

},{"../internals/global-this":113}],95:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var userAgent = require('../internals/environment-user-agent');

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

},{"../internals/environment-user-agent":94,"../internals/global-this":113}],96:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var defineGlobalProperty = require('../internals/define-global-property');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

},{"../internals/copy-constructor-properties":81,"../internals/create-non-enumerable-property":84,"../internals/define-built-in":88,"../internals/define-global-property":90,"../internals/global-this":113,"../internals/is-forced":124,"../internals/object-get-own-property-descriptor":150}],97:[function(require,module,exports){
'use strict';
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],98:[function(require,module,exports){
'use strict';
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

},{"../internals/function-bind-native":100}],99:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this-clause');
var aCallable = require('../internals/a-callable');
var NATIVE_BIND = require('../internals/function-bind-native');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-callable":69,"../internals/function-bind-native":100,"../internals/function-uncurry-this-clause":104}],100:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = function () { /* empty */ }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"../internals/fails":97}],101:[function(require,module,exports){
'use strict';
var NATIVE_BIND = require('../internals/function-bind-native');

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

},{"../internals/function-bind-native":100}],102:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

},{"../internals/descriptors":91,"../internals/has-own-property":114}],103:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

},{"../internals/a-callable":69,"../internals/function-uncurry-this":105}],104:[function(require,module,exports){
'use strict';
var classofRaw = require('../internals/classof-raw');
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};

},{"../internals/classof-raw":79,"../internals/function-uncurry-this":105}],105:[function(require,module,exports){
'use strict';
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};

},{"../internals/function-bind-native":100}],106:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var isCallable = require('../internals/is-callable');

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};

},{"../internals/global-this":113,"../internals/is-callable":123}],107:[function(require,module,exports){
'use strict';
// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/ecma262/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};

},{}],108:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getIteratorMethod = require('../internals/get-iterator-method-internal');

module.exports = function (obj, stringHandling) {
  if (!stringHandling || typeof obj !== 'string') anObject(obj);
  var method = getIteratorMethod(obj);
  return getIteratorDirect(anObject(method !== undefined ? call(method, obj) : obj));
};

},{"../internals/an-object":76,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/get-iterator-method-internal":110}],109:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var getIteratorMethod = require('../internals/get-iterator-method-internal');

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (isCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};

},{"../internals/an-object":76,"../internals/function-call":101,"../internals/get-iterator-method-internal":110,"../internals/is-callable":123,"../internals/try-to-string":191}],110:[function(require,module,exports){
'use strict';
var classof = require('../internals/classof-raw');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var getMethod = require('../internals/get-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || (classof(it) === 'Arguments' ? ArrayPrototype[ITERATOR] : undefined);
};

},{"../internals/classof-raw":79,"../internals/get-method":111,"../internals/is-null-or-undefined":126,"../internals/well-known-symbol":198}],111:[function(require,module,exports){
'use strict';
var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"../internals/a-callable":69,"../internals/is-null-or-undefined":126}],112:[function(require,module,exports){
'use strict';
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var call = require('../internals/function-call');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var getIteratorDirect = require('../internals/get-iterator-direct');

var INVALID_SIZE = 'Invalid size';
var $RangeError = RangeError;
var $TypeError = TypeError;
var max = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max(intSize, 0);
  this.has = aCallable(set.has);
  this.keys = aCallable(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject(call(this.keys, this.set)));
  },
  includes: function (it) {
    return call(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
module.exports = function (obj) {
  anObject(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
  var intSize = toIntegerOrInfinity(numSize);
  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
  return new SetRecord(obj, intSize);
};

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/to-integer-or-infinity":183}],113:[function(require,module,exports){
(function (global){(function (){
'use strict';
var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],114:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":105,"../internals/to-object":185}],115:[function(require,module,exports){
'use strict';
module.exports = {};

},{}],116:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":106}],117:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

},{"../internals/descriptors":91,"../internals/document-create-element":92,"../internals/fails":97}],118:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;

},{"../internals/classof-raw":79,"../internals/fails":97,"../internals/function-uncurry-this":105}],119:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":105,"../internals/is-callable":123,"../internals/shared-store":177}],120:[function(require,module,exports){
'use strict';
var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection');
var globalThis = require('../internals/global-this');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/create-non-enumerable-property":84,"../internals/global-this":113,"../internals/has-own-property":114,"../internals/hidden-keys":115,"../internals/is-object":127,"../internals/shared-key":176,"../internals/shared-store":177,"../internals/weak-map-basic-detection":195}],121:[function(require,module,exports){
'use strict';
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":140,"../internals/well-known-symbol":198}],122:[function(require,module,exports){
'use strict';
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};

},{"../internals/classof-raw":79}],123:[function(require,module,exports){
'use strict';
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

},{}],124:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":97,"../internals/is-callable":123}],125:[function(require,module,exports){
'use strict';
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  return it[ITERATOR] !== undefined
    || it['@@iterator'] !== undefined
    || classof(it) === 'Arguments';
};

},{"../internals/classof-raw":79,"../internals/well-known-symbol":198}],126:[function(require,module,exports){
'use strict';
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

},{}],127:[function(require,module,exports){
'use strict';
var isCallable = require('../internals/is-callable');

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/is-callable":123}],128:[function(require,module,exports){
'use strict';
module.exports = false;

},{}],129:[function(require,module,exports){
'use strict';
var isObject = require('../internals/is-object');
var getInternalState = require('../internals/internal-state').get;

module.exports = function isRawJSON(O) {
  if (!isObject(O)) return false;
  var state = getInternalState(O);
  return !!state && state.type === 'RawJSON';
};

},{"../internals/internal-state":120,"../internals/is-object":127}],130:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"../internals/get-built-in":106,"../internals/is-callable":123,"../internals/object-is-prototype-of":154,"../internals/use-symbol-as-uid":193}],131:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');

module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};

},{"../internals/function-call":101}],132:[function(require,module,exports){
'use strict';
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getIterator = require('../internals/get-iterator-internal');
var getIteratorMethod = require('../internals/get-iterator-method-internal');
var iteratorClose = require('../internals/iterator-close');

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    var $iterator = iterator;
    iterator = undefined;
    if ($iterator) iteratorClose($iterator, 'normal');
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    // `IteratorValue` errors should propagate without closing the iterator
    var value = step.value;
    try {
      result = callFn(value);
    } catch (error) {
      if (iterator) iteratorClose(iterator, 'throw', error);
      else throw error;
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};

},{"../internals/an-object":76,"../internals/function-bind-context":99,"../internals/function-call":101,"../internals/get-iterator-internal":109,"../internals/get-iterator-method-internal":110,"../internals/is-array-iterator-method":121,"../internals/iterator-close":135,"../internals/length-of-array-like":141,"../internals/object-is-prototype-of":154,"../internals/try-to-string":191}],133:[function(require,module,exports){
'use strict';
// release references held by exhausted / closed iterator helpers to allow GC of the source chain
module.exports = function (state) {
  state.iterator = state.next = state.nextHandler = state.mapper = state.predicate = state.inner =
    state.iterables = state.iters = state.openIters = state.padding = state.finishResults = state.buffer = null;
};

},{}],134:[function(require,module,exports){
'use strict';
var iteratorClose = require('../internals/iterator-close');

module.exports = function (iters, kind, value) {
  for (var i = iters.length - 1; i >= 0; i--) {
    if (iters[i] === undefined) continue;
    try {
      value = iteratorClose(iters[i].iterator, kind, value);
    } catch (error) {
      kind = 'throw';
      value = error;
    }
  }
  if (kind === 'throw') throw value;
  return value;
};

},{"../internals/iterator-close":135}],135:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getMethod = require('../internals/get-method');

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

},{"../internals/an-object":76,"../internals/function-call":101,"../internals/get-method":111}],136:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIns = require('../internals/define-built-ins');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var getMethod = require('../internals/get-method');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var createIterResultObject = require('../internals/create-iter-result-object');
var iteratorClose = require('../internals/iterator-close');
var iteratorCloseAll = require('../internals/iterator-close-all');
var cleanupState = require('../internals/iterator-cleanup-state');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var NORMAL = 'normal';
var THROW = 'throw';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      if (state.done) return createIterResultObject(undefined, true);
      try {
        var result = state.nextHandler();
        if (state.done) cleanupState(state);
        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        cleanupState(state);
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      var inner = state.inner;
      var openIters = state.openIters;
      var done = state.done;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      cleanupState(state);
      if (done) return createIterResultObject(undefined, true);
      if (inner) try {
        iteratorClose(inner.iterator, NORMAL);
      } catch (error) {
        return iteratorClose(iterator, THROW, error);
      }
      if (openIters) try {
        iteratorCloseAll(openIters, NORMAL);
      } catch (error) {
        if (iterator) return iteratorClose(iterator, THROW, error);
        throw error;
      }
      if (iterator) iteratorClose(iterator, NORMAL);
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};

},{"../internals/create-iter-result-object":83,"../internals/create-non-enumerable-property":84,"../internals/define-built-ins":89,"../internals/function-call":101,"../internals/get-method":111,"../internals/internal-state":120,"../internals/iterator-cleanup-state":133,"../internals/iterator-close":135,"../internals/iterator-close-all":134,"../internals/iterators-core":139,"../internals/object-create":147,"../internals/well-known-symbol":198}],137:[function(require,module,exports){
'use strict';
// Should throw an error on invalid iterator
// https://issues.chromium.org/issues/336839115
module.exports = function (methodName, argument) {
  // eslint-disable-next-line es/no-iterator -- required for testing
  var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
  if (method) try {
    method.call({ next: null }, argument).next();
  } catch (error) {
    return true;
  }
};

},{}],138:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');

// https://github.com/tc39/ecma262/pull/3467
module.exports = function (METHOD_NAME, ExpectedError) {
  var Iterator = globalThis.Iterator;
  var IteratorPrototype = Iterator && Iterator.prototype;
  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];

  var CLOSED = false;

  if (method) try {
    method.call({
      next: function () { return { done: true }; },
      'return': function () { CLOSED = true; }
    }, -1);
  } catch (error) {
    // https://bugs.webkit.org/show_bug.cgi?id=291195
    if (!(error instanceof ExpectedError)) CLOSED = false;
  }

  if (!CLOSED) return method;
};

},{"../internals/global-this":113}],139:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/define-built-in":88,"../internals/fails":97,"../internals/is-callable":123,"../internals/is-object":127,"../internals/is-pure":128,"../internals/object-create":147,"../internals/object-get-prototype-of":153,"../internals/well-known-symbol":198}],140:[function(require,module,exports){
'use strict';
module.exports = Object.create ? Object.create(null) : {};

},{}],141:[function(require,module,exports){
'use strict';
var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

},{"../internals/to-length":184}],142:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var DESCRIPTORS = require('../internals/descriptors');
var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

},{"../internals/descriptors":91,"../internals/fails":97,"../internals/function-name":102,"../internals/function-uncurry-this":105,"../internals/has-own-property":114,"../internals/inspect-source":119,"../internals/internal-state":120,"../internals/is-callable":123}],143:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

// eslint-disable-next-line es/no-map -- safe
var MapPrototype = Map.prototype;

module.exports = {
  // eslint-disable-next-line es/no-map -- safe
  Map: Map,
  set: uncurryThis(MapPrototype.set),
  get: uncurryThis(MapPrototype.get),
  has: uncurryThis(MapPrototype.has),
  remove: uncurryThis(MapPrototype['delete']),
  proto: MapPrototype
};

},{"../internals/function-uncurry-this":105}],144:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var iterateSimple = require('../internals/iterate-simple');
var MapHelpers = require('../internals/map-helpers');

var Map = MapHelpers.Map;
var MapPrototype = MapHelpers.proto;
var forEach = uncurryThis(MapPrototype.forEach);
var entries = uncurryThis(MapPrototype.entries);
var next = entries(new Map()).next;

module.exports = function (map, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: entries(map), next: next }, function (entry) {
    return fn(entry[1], entry[0]);
  }) : forEach(map, fn);
};

},{"../internals/function-uncurry-this":105,"../internals/iterate-simple":131,"../internals/map-helpers":143}],145:[function(require,module,exports){
'use strict';
var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

},{}],146:[function(require,module,exports){
'use strict';
/* eslint-disable es/no-json -- safe */
var fails = require('../internals/fails');

module.exports = !fails(function () {
  var unsafeInt = '9007199254740993';
  // eslint-disable-next-line es/no-json-rawjson -- feature detection
  var raw = JSON.rawJSON(unsafeInt);
  // eslint-disable-next-line es/no-json-israwjson -- feature detection
  return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
});

},{"../internals/fails":97}],147:[function(require,module,exports){
'use strict';
/* global ActiveXObject -- old IE, WSH */
var anObject = require('../internals/an-object');
var definePropertiesModule = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

},{"../internals/an-object":76,"../internals/document-create-element":92,"../internals/enum-bug-keys":93,"../internals/hidden-keys":115,"../internals/html":116,"../internals/object-define-properties":148,"../internals/shared-key":176}],148:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

},{"../internals/an-object":76,"../internals/descriptors":91,"../internals/object-define-property":149,"../internals/object-keys":156,"../internals/to-indexed-object":182,"../internals/v8-prototype-define-bug":194}],149:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":76,"../internals/descriptors":91,"../internals/ie8-dom-define":117,"../internals/to-property-key":187,"../internals/v8-prototype-define-bug":194}],150:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/create-property-descriptor":85,"../internals/descriptors":91,"../internals/function-call":101,"../internals/has-own-property":114,"../internals/ie8-dom-define":117,"../internals/object-property-is-enumerable":157,"../internals/to-indexed-object":182,"../internals/to-property-key":187}],151:[function(require,module,exports){
'use strict';
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":93,"../internals/object-keys-internal":155}],152:[function(require,module,exports){
'use strict';
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],153:[function(require,module,exports){
'use strict';
var hasOwn = require('../internals/has-own-property');
var isCallable = require('../internals/is-callable');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":82,"../internals/has-own-property":114,"../internals/is-callable":123,"../internals/shared-key":176,"../internals/to-object":185}],154:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

},{"../internals/function-uncurry-this":105}],155:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

},{"../internals/array-includes":77,"../internals/function-uncurry-this":105,"../internals/has-own-property":114,"../internals/hidden-keys":115,"../internals/to-indexed-object":182}],156:[function(require,module,exports){
'use strict';
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":93,"../internals/object-keys-internal":155}],157:[function(require,module,exports){
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],158:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};

},{"../internals/function-call":101,"../internals/is-callable":123,"../internals/is-object":127}],159:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":76,"../internals/function-uncurry-this":105,"../internals/get-built-in":106,"../internals/object-get-own-property-names":151,"../internals/object-get-own-property-symbols":152}],160:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode = String.fromCharCode;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

module.exports = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at(source, i);
    if (chr === '\\') {
      var twoChars = slice(source, i, i + 2);
      if (hasOwn(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice(source, i, i + 4);
        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode($parseInt(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};

},{"../internals/function-uncurry-this":105,"../internals/has-own-property":114}],161:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var fails = require('../internals/fails');

// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp = globalThis.RegExp;

var FLAGS_GETTER_IS_CORRECT = !fails(function () {
  var INDICES_SUPPORT = true;
  try {
    RegExp('.', 'd');
  } catch (error) {
    INDICES_SUPPORT = false;
  }

  var O = {};
  // modern V8 bug
  var calls = '';
  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

  var addGetter = function (key, chr) {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(O, key, { get: function () {
      calls += chr;
      return true;
    } });
  };

  var pairs = {
    dotAll: 's',
    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    sticky: 'y'
  };

  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

  for (var key in pairs) addGetter(key, pairs[key]);

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var result = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(O);

  return result !== expected || calls !== expected;
});

module.exports = { correct: FLAGS_GETTER_IS_CORRECT };

},{"../internals/fails":97,"../internals/global-this":113}],162:[function(require,module,exports){
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":76}],163:[function(require,module,exports){
'use strict';
var isNullOrUndefined = require('../internals/is-null-or-undefined');

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};

},{"../internals/is-null-or-undefined":126}],164:[function(require,module,exports){
'use strict';
// `SameValueZero` abstract operation
// https://tc39.es/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x !== x && y !== y;
};

},{}],165:[function(require,module,exports){
'use strict';
var SetHelpers = require('../internals/set-helpers');
var iterate = require('../internals/set-iterate');

var Set = SetHelpers.Set;
var add = SetHelpers.add;

module.exports = function (set) {
  var result = new Set();
  iterate(set, function (it) {
    add(result, it);
  });
  return result;
};

},{"../internals/set-helpers":167,"../internals/set-iterate":172}],166:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var clone = require('../internals/set-clone');
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSet = require('../internals/set-iterate');
var iterateSimple = require('../internals/iterate-simple');

var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.difference` method
// https://tc39.es/ecma262/#sec-set.prototype.difference
module.exports = function difference(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = clone(O);
  if (size(result) <= otherRec.size) iterateSet(result, function (e) {
    if (otherRec.includes(e)) remove(result, e);
  });
  else iterateSimple(otherRec.getIterator(), function (e) {
    if (has(result, e)) remove(result, e);
  });
  return result;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/iterate-simple":131,"../internals/set-clone":165,"../internals/set-helpers":167,"../internals/set-iterate":172,"../internals/set-size":173}],167:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

// eslint-disable-next-line es/no-set -- safe
var SetPrototype = Set.prototype;

module.exports = {
  // eslint-disable-next-line es/no-set -- safe
  Set: Set,
  add: uncurryThis(SetPrototype.add),
  has: uncurryThis(SetPrototype.has),
  remove: uncurryThis(SetPrototype['delete']),
  proto: SetPrototype
};

},{"../internals/function-uncurry-this":105}],168:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSet = require('../internals/set-iterate');
var iterateSimple = require('../internals/iterate-simple');

var Set = SetHelpers.Set;
var add = SetHelpers.add;
var has = SetHelpers.has;

// `Set.prototype.intersection` method
// https://tc39.es/ecma262/#sec-set.prototype.intersection
module.exports = function intersection(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = new Set();

  if (size(O) > otherRec.size) {
    iterateSimple(otherRec.getIterator(), function (e) {
      if (has(O, e)) add(result, e);
    });
  } else {
    iterateSet(O, function (e) {
      if (otherRec.includes(e)) add(result, e);
    });
  }

  return result;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/iterate-simple":131,"../internals/set-helpers":167,"../internals/set-iterate":172,"../internals/set-size":173}],169:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var has = require('../internals/set-helpers').has;
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSet = require('../internals/set-iterate');
var iterateSimple = require('../internals/iterate-simple');
var iteratorClose = require('../internals/iterator-close');

// `Set.prototype.isDisjointFrom` method
// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
module.exports = function isDisjointFrom(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
    if (otherRec.includes(e)) return false;
  }, true) !== false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (has(O, e)) return iteratorClose(iterator.iterator, 'normal', false);
  }) !== false;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/iterate-simple":131,"../internals/iterator-close":135,"../internals/set-helpers":167,"../internals/set-iterate":172,"../internals/set-size":173}],170:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var size = require('../internals/set-size');
var iterate = require('../internals/set-iterate');
var getSetRecord = require('../internals/get-set-record');

// `Set.prototype.isSubsetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
module.exports = function isSubsetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) > otherRec.size) return false;
  return iterate(O, function (e) {
    if (!otherRec.includes(e)) return false;
  }, true) !== false;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/set-iterate":172,"../internals/set-size":173}],171:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var has = require('../internals/set-helpers').has;
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');
var iteratorClose = require('../internals/iterator-close');

// `Set.prototype.isSupersetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
module.exports = function isSupersetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) < otherRec.size) return false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (!has(O, e)) return iteratorClose(iterator.iterator, 'normal', false);
  }) !== false;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/iterate-simple":131,"../internals/iterator-close":135,"../internals/set-helpers":167,"../internals/set-size":173}],172:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var iterateSimple = require('../internals/iterate-simple');
var SetHelpers = require('../internals/set-helpers');

var Set = SetHelpers.Set;
var SetPrototype = SetHelpers.proto;
var forEach = uncurryThis(SetPrototype.forEach);
var keys = uncurryThis(SetPrototype.keys);
var next = keys(new Set()).next;

module.exports = function (set, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
};

},{"../internals/function-uncurry-this":105,"../internals/iterate-simple":131,"../internals/set-helpers":167}],173:[function(require,module,exports){
'use strict';
var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor');
var SetHelpers = require('../internals/set-helpers');

module.exports = uncurryThisAccessor(SetHelpers.proto, 'size', 'get') || function (set) {
  return set.size;
};

},{"../internals/function-uncurry-this-accessor":103,"../internals/set-helpers":167}],174:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var clone = require('../internals/set-clone');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');

var add = SetHelpers.add;
var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.symmetricDifference` method
// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
module.exports = function symmetricDifference(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (e) {
    if (has(O, e)) remove(result, e);
    else add(result, e);
  });
  return result;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/iterate-simple":131,"../internals/set-clone":165,"../internals/set-helpers":167}],175:[function(require,module,exports){
'use strict';
var aSet = require('../internals/a-set');
var add = require('../internals/set-helpers').add;
var clone = require('../internals/set-clone');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');

// `Set.prototype.union` method
// https://tc39.es/ecma262/#sec-set.prototype.union
module.exports = function union(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (it) {
    add(result, it);
  });
  return result;
};

},{"../internals/a-set":71,"../internals/get-set-record":112,"../internals/iterate-simple":131,"../internals/set-clone":165,"../internals/set-helpers":167}],176:[function(require,module,exports){
'use strict';
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":178,"../internals/uid":192}],177:[function(require,module,exports){
'use strict';
var IS_PURE = require('../internals/is-pure');
var globalThis = require('../internals/global-this');
var defineGlobalProperty = require('../internals/define-global-property');

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.51.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
  license: 'https://github.com/zloirock/core-js/blob/v3.51.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

},{"../internals/define-global-property":90,"../internals/global-this":113,"../internals/is-pure":128}],178:[function(require,module,exports){
'use strict';
var store = require('../internals/shared-store');
// eslint-disable-next-line es/no-object-create -- safe
var create = Object.create || Object;

module.exports = function (key, value) {
  return store[key] || (store[key] = value || create(null));
};

},{"../internals/shared-store":177}],179:[function(require,module,exports){
'use strict';
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/environment-v8-version');
var fails = require('../internals/fails');
var globalThis = require('../internals/global-this');

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/environment-v8-version":95,"../internals/fails":97,"../internals/global-this":113}],180:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.1.valueOf);

},{"../internals/function-uncurry-this":105}],181:[function(require,module,exports){
'use strict';
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":183}],182:[function(require,module,exports){
'use strict';
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":118,"../internals/require-object-coercible":163}],183:[function(require,module,exports){
'use strict';
var trunc = require('../internals/math-trunc');

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

},{"../internals/math-trunc":145}],184:[function(require,module,exports){
'use strict';
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":183}],185:[function(require,module,exports){
'use strict';
var requireObjectCoercible = require('../internals/require-object-coercible');

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":163}],186:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var getMethod = require('../internals/get-method');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

},{"../internals/function-call":101,"../internals/get-method":111,"../internals/is-object":127,"../internals/is-symbol":130,"../internals/ordinary-to-primitive":158,"../internals/well-known-symbol":198}],187:[function(require,module,exports){
'use strict';
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

},{"../internals/is-symbol":130,"../internals/to-primitive":186}],188:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isIterable = require('../internals/is-iterable');
var isObject = require('../internals/is-object');

var Set = getBuiltIn('Set');

var isSetLike = function (it) {
  return isObject(it)
    && typeof it.size == 'number'
    && isCallable(it.has)
    && isCallable(it.keys);
};

// fallback old -> new set methods proposal arguments
module.exports = function (it) {
  if (isSetLike(it)) return it;
  return isIterable(it) ? new Set(it) : it;
};

},{"../internals/get-built-in":106,"../internals/is-callable":123,"../internals/is-iterable":125,"../internals/is-object":127}],189:[function(require,module,exports){
'use strict';
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":198}],190:[function(require,module,exports){
'use strict';
var classof = require('../internals/classof');

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

},{"../internals/classof":80}],191:[function(require,module,exports){
'use strict';
var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

},{}],192:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":105}],193:[function(require,module,exports){
'use strict';
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';

},{"../internals/symbol-constructor-detection":179}],194:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

},{"../internals/descriptors":91,"../internals/fails":97}],195:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var isCallable = require('../internals/is-callable');

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"../internals/global-this":113,"../internals/is-callable":123}],196:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

// eslint-disable-next-line es/no-weak-map -- safe
var WeakMapPrototype = WeakMap.prototype;

module.exports = {
  // eslint-disable-next-line es/no-weak-map -- safe
  WeakMap: WeakMap,
  set: uncurryThis(WeakMapPrototype.set),
  get: uncurryThis(WeakMapPrototype.get),
  has: uncurryThis(WeakMapPrototype.has),
  remove: uncurryThis(WeakMapPrototype['delete'])
};

},{"../internals/function-uncurry-this":105}],197:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

// eslint-disable-next-line es/no-weak-set -- safe
var WeakSetPrototype = WeakSet.prototype;

module.exports = {
  // eslint-disable-next-line es/no-weak-set -- safe
  WeakSet: WeakSet,
  add: uncurryThis(WeakSetPrototype.add),
  has: uncurryThis(WeakSetPrototype.has),
  remove: uncurryThis(WeakSetPrototype['delete'])
};

},{"../internals/function-uncurry-this":105}],198:[function(require,module,exports){
'use strict';
var globalThis = require('../internals/global-this');
var shared = require('../internals/shared');
var hasOwn = require('../internals/has-own-property');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global-this":113,"../internals/has-own-property":114,"../internals/shared":178,"../internals/symbol-constructor-detection":179,"../internals/uid":192,"../internals/use-symbol-as-uid":193}],199:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var fails = require('../internals/fails');
var addToUnscopables = require('../internals/add-to-unscopables');

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// Safari 26.4- bug
var BROKEN_ON_SPARSE_WITH_FROM_INDEX = fails(function () {
  // eslint-disable-next-line no-sparse-arrays, es/no-array-prototype-includes -- detection
  return [, 1].includes(undefined, 1);
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE || BROKEN_ON_SPARSE_WITH_FROM_INDEX }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

},{"../internals/add-to-unscopables":74,"../internals/array-includes":77,"../internals/export":96,"../internals/fails":97}],200:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var anInstance = require('../internals/an-instance');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var createProperty = require('../internals/create-property');
var fails = require('../internals/fails');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://tc39.es/ecma262/#sec-iterator
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});

},{"../internals/an-instance":75,"../internals/an-object":76,"../internals/create-property":86,"../internals/define-built-in-accessor":87,"../internals/descriptors":91,"../internals/export":96,"../internals/fails":97,"../internals/global-this":113,"../internals/has-own-property":114,"../internals/is-callable":123,"../internals/is-pure":128,"../internals/iterators-core":139,"../internals/object-get-prototype-of":153,"../internals/well-known-symbol":198}],201:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var everyWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('every', TypeError);

// `Iterator.prototype.every` method
// https://tc39.es/ecma262/#sec-iterator.prototype.every
$({ target: 'Iterator', proto: true, real: true, forced: everyWithoutClosingOnEarlyError }, {
  every: function every(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (everyWithoutClosingOnEarlyError) return call(everyWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return !iterate(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/export":96,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/iterate":132,"../internals/iterator-close":135,"../internals/iterator-helper-without-closing-on-early-error":138}],202:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var IS_PURE = require('../internals/is-pure');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('filter', function () { /* empty */ });
var filterWithoutClosingOnEarlyError = !IS_PURE && !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('filter', TypeError);

var FORCED = IS_PURE || FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  filter: function filter(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (filterWithoutClosingOnEarlyError) return call(filterWithoutClosingOnEarlyError, this, predicate);

    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/call-with-safe-iteration-closing":78,"../internals/export":96,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/is-pure":128,"../internals/iterator-close":135,"../internals/iterator-create-proxy":136,"../internals/iterator-helper-throws-on-invalid-iterator":137,"../internals/iterator-helper-without-closing-on-early-error":138}],203:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('find', TypeError);

// `Iterator.prototype.find` method
// https://tc39.es/ecma262/#sec-iterator.prototype.find
$({ target: 'Iterator', proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
  find: function find(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/export":96,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/iterate":132,"../internals/iterator-close":135,"../internals/iterator-helper-without-closing-on-early-error":138}],204:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getIteratorFlattenable = require('../internals/get-iterator-flattenable');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var iteratorClose = require('../internals/iterator-close');
var fails = require('../internals/fails');
var IS_PURE = require('../internals/is-pure');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

// Should not throw an error for an iterator without `return` method. Fixed in Safari 26.2
// https://bugs.webkit.org/show_bug.cgi?id=297532
var THROWS_ON_ITERATOR_WITHOUT_RETURN = !IS_PURE && fails(function () {
  // eslint-disable-next-line es/no-array-prototype-values, es/no-iterator-prototype-flatmap, es/no-iterator-prototype-find -- testing
  return [1].values()
    .flatMap(function () { return [1]; })
    .find(function () { return true; }) !== 1;
});

var FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !THROWS_ON_ITERATOR_WITHOUT_RETURN
  && !iteratorHelperThrowsOnInvalidIterator('flatMap', function () { /* empty */ });

var flatMapWithoutClosingOnEarlyError = !IS_PURE && !THROWS_ON_ITERATOR_WITHOUT_RETURN && !FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('flatMap', TypeError);

var FORCED = IS_PURE || THROWS_ON_ITERATOR_WITHOUT_RETURN || FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  || flatMapWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var mapper = this.mapper;
  var result, inner;

  while (true) {
    if (inner = this.inner) try {
      result = anObject(call(inner.next, inner.iterator));
      if (!result.done) return result.value;
      this.inner = null;
    } catch (error) { iteratorClose(iterator, 'throw', error); }

    result = anObject(call(this.next, iterator));

    if (this.done = !!result.done) return;

    try {
      this.inner = getIteratorFlattenable(mapper(result.value, this.counter++), false);
    } catch (error) { iteratorClose(iterator, 'throw', error); }
  }
});

// `Iterator.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-iterator.prototype.flatmap
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  flatMap: function flatMap(mapper) {
    anObject(this);
    try {
      aCallable(mapper);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (flatMapWithoutClosingOnEarlyError) return call(flatMapWithoutClosingOnEarlyError, this, mapper);

    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper,
      inner: null
    });
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/export":96,"../internals/fails":97,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/get-iterator-flattenable":108,"../internals/is-pure":128,"../internals/iterator-close":135,"../internals/iterator-create-proxy":136,"../internals/iterator-helper-throws-on-invalid-iterator":137,"../internals/iterator-helper-without-closing-on-early-error":138}],205:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('forEach', TypeError);

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$({ target: 'Iterator', proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
  forEach: function forEach(fn) {
    anObject(this);
    try {
      aCallable(fn);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);

    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/export":96,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/iterate":132,"../internals/iterator-close":135,"../internals/iterator-helper-without-closing-on-early-error":138}],206:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');
var IS_PURE = require('../internals/is-pure');

var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('map', function () { /* empty */ });
var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('map', TypeError);

var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  map: function map(mapper) {
    anObject(this);
    try {
      aCallable(mapper);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);

    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper
    });
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/call-with-safe-iteration-closing":78,"../internals/export":96,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/is-pure":128,"../internals/iterator-close":135,"../internals/iterator-create-proxy":136,"../internals/iterator-helper-throws-on-invalid-iterator":137,"../internals/iterator-helper-without-closing-on-early-error":138}],207:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');
var apply = require('../internals/function-apply');
var fails = require('../internals/fails');

var $TypeError = TypeError;

// https://bugs.webkit.org/show_bug.cgi?id=291651
var FAILS_ON_INITIAL_UNDEFINED = fails(function () {
  // eslint-disable-next-line es/no-iterator-prototype-reduce, es/no-array-prototype-keys, array-callback-return -- required for testing
  [].keys().reduce(function () { /* empty */ }, undefined);
});

var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError('reduce', $TypeError);

// `Iterator.prototype.reduce` method
// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
$({ target: 'Iterator', proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    try {
      aCallable(reducer);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    if (reduceWithoutClosingOnEarlyError) {
      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
    }
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value, counter);
      }
      counter++;
    }, { IS_RECORD: true });
    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/export":96,"../internals/fails":97,"../internals/function-apply":98,"../internals/get-iterator-direct":107,"../internals/iterate":132,"../internals/iterator-close":135,"../internals/iterator-helper-without-closing-on-early-error":138}],208:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var someWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('some', TypeError);

// `Iterator.prototype.some` method
// https://tc39.es/ecma262/#sec-iterator.prototype.some
$({ target: 'Iterator', proto: true, real: true, forced: someWithoutClosingOnEarlyError }, {
  some: function some(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (someWithoutClosingOnEarlyError) return call(someWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/a-callable":69,"../internals/an-object":76,"../internals/export":96,"../internals/function-call":101,"../internals/get-iterator-direct":107,"../internals/iterate":132,"../internals/iterator-close":135,"../internals/iterator-helper-without-closing-on-early-error":138}],209:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var isRawJSON = require('../internals/is-raw-json');
var isSymbol = require('../internals/is-symbol');
var classof = require('../internals/classof-raw');
var thisNumberValue = require('../internals/this-number-value');
var includes = require('../internals/array-includes').includes;
var hasOwn = require('../internals/has-own-property');
var toString = require('../internals/to-string');
var parseJSONString = require('../internals/parse-json-string');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var NATIVE_RAW_JSON = require('../internals/native-raw-json');

var $String = String;
var $TypeError = TypeError;
var $stringify = getBuiltIn('JSON', 'stringify');
var $BigInt = getBuiltIn('BigInt');
var stringValueOf = uncurryThis(''.valueOf);
var booleanValueOf = uncurryThis(true.valueOf);
var bigIntValueOf = $BigInt && uncurryThis($BigInt.prototype.valueOf);
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var slice = uncurryThis(''.slice);
var push = uncurryThis([].push);
var pop = uncurryThis([].pop);
var numberToString = uncurryThis(1.1.toString);

var surrogates = /[\uD800-\uDFFF]/g;
var leadingSurrogates = /^[\uD800-\uDBFF]$/;
var trailingSurrogates = /^[\uDC00-\uDFFF]$/;
var digits = /^\d+$/;

// a placeholder of a raw JSON value
var RAW_MARK = uid();
// a prefix of keys of a reordered object, see `createOrderedObject`
var KEY_MARK = uid();
// the last key of a reordered object, marks the end of its serialization
var END_MARK = uid();
var RAW_MARK_LENGTH = RAW_MARK.length;
var KEY_MARK_LENGTH = KEY_MARK.length;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var isRawJSONValue = NATIVE_RAW_JSON ? getBuiltIn('JSON', 'isRawJSON') : isRawJSON;

var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function (it, replacer, space) {
  return $stringify(it, function (key, value) {
    var replaced = call(replacer, this, key, value);
    if (!isSymbol(replaced)) return replaced;
  }, space);
} : $stringify;

var fixIllFormedJSON = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if (
    (exec(leadingSurrogates, match) && !exec(trailingSurrogates, next)) ||
    (exec(trailingSurrogates, match) && !exec(leadingSurrogates, prev))
  ) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

// `PropertyList` of `JSON.stringify`
// https://tc39.es/ecma262/#sec-json.stringify
var getPropertyList = function (replacer) {
  if (!isArray(replacer)) return;
  var rawLength = replacer.length;
  var propertyList = [];
  // a null prototype object is used as a set of already added keys to keep the deduplication linear
  var addedKeys = create(null);
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    var key;
    if (typeof element == 'string') key = element;
    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') key = toString(element);
    else continue;
    if (!hasOwn(addedKeys, key)) {
      addedKeys[key] = true;
      push(propertyList, key);
    }
  }
  return propertyList;
};

// values with such an internal slot are unwrapped by `SerializeJSONProperty` instead of being serialized as objects
var hasInternalSlot = function (valueOf, it) {
  try {
    valueOf(it);
    return true;
  } catch (error) {
    return false;
  }
};

// the slot check is expensive, so it's performed only for the kind reported by the value itself -
// a value lying about its kind via `Symbol.toStringTag` is serialized as an ordinary object
var isBoxedPrimitive = function (it) {
  var kind = classof(it);
  return (kind === 'Number' && hasInternalSlot(thisNumberValue, it))
    || (kind === 'String' && hasInternalSlot(stringValueOf, it))
    || (kind === 'Boolean' && hasInternalSlot(booleanValueOf, it))
    || (!!bigIntValueOf && kind === 'BigInt' && hasInternalSlot(bigIntValueOf, it));
};

// only objects serialized by `SerializeJSONObject` are affected by the property list
var isSerializedAsObject = function (it) {
  if (!isObject(it) || isCallable(it) || isArray(it)) return false;
  try {
    return !isBoxedPrimitive(it);
  // `classof` reads `Symbol.toStringTag`, so a proxy could throw - it has no internal slots anyway
  } catch (error) {
    return true;
  }
};

// the engine unwraps it in the same order as it would read the original property,
// so the property is read lazily and `toJSON` is called once and with the original key
var createElementHolder = function (holder, key) {
  return {
    toJSON: function () {
      var element = holder[key];
      if (isObject(element) || typeof element == 'bigint') {
        var elementToJSON = element.toJSON;
        if (isCallable(elementToJSON)) element = call(elementToJSON, element, key);
      } return element;
    }
  };
};

// own keys of objects are sorted - integer-like keys are moved to the beginning,
// so such keys should be marked and restored in the serialized string
var getKeyPrefix = function (propertyList) {
  for (var i = 0, length = propertyList.length; i < length; i++) {
    if (exec(digits, propertyList[i])) return KEY_MARK;
  } return '';
};

// `SerializeJSONObject` iterates the property list, so the value is replaced with an object with keys in this order
var createOrderedObject = function (value, propertyList, keyPrefix) {
  // keys are not marked if the property list has no integer-like keys, so `Object.prototype`
  // with a setter, a non-writable property or `__proto__` should not intercept the assignment
  var ordered = create(null);
  for (var i = 0, length = propertyList.length; i < length; i++) {
    var key = propertyList[i];
    ordered[keyPrefix + key] = createElementHolder(value, key);
  }
  ordered[END_MARK] = null;
  return ordered;
};

// `JSON.stringify` method
// https://tc39.es/ecma262/#sec-json.stringify
// https://github.com/tc39/proposal-json-parse-with-source
if ($stringify) $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {
  stringify: function stringify(text, replacer, space) {
    var replacerFunction = isCallable(replacer) ? replacer : undefined;
    var propertyList = replacerFunction ? undefined : getPropertyList(replacer);
    var keyPrefix = propertyList && getKeyPrefix(propertyList);
    var rawStrings = [];
    var openObjects = [];
    var parentOrdered = [];
    var currentOrdered;
    var marked = false;
    var root = true;

    var json = stringifyWithProperSymbolsConversion(text, function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      key = $String(key);

      if (propertyList) {
        if (key === END_MARK) {
          pop(openObjects);
          currentOrdered = pop(parentOrdered);
          return;
        }
        if (root) root = false;
        // the innermost reordered object already contains only keys of the property list and arrays are not
        // affected by it, the rest of objects (like objects with a fake `Symbol.toStringTag`) are filtered here
        else if (this !== currentOrdered && !isArray(this) && !includes(propertyList, key)) return;
      } else if (replacerFunction) value = call(replacerFunction, this, key, value);

      if (isRawJSONValue(value)) {
        if (NATIVE_RAW_JSON) return value;
        marked = true;
        return RAW_MARK + (push(rawStrings, value.rawJSON) - 1);
      }

      if (propertyList && isSerializedAsObject(value)) {
        // reordered objects are new each time, so cycles should be detected before the engine does it
        if (includes(openObjects, value)) throw new $TypeError('Converting circular structure to JSON');
        var ordered = createOrderedObject(value, propertyList, keyPrefix);
        push(openObjects, value);
        push(parentOrdered, currentOrdered);
        currentOrdered = ordered;
        if (keyPrefix) marked = true;
        return ordered;
      }

      return value;
    }, space);

    if (typeof json != 'string') return json;

    if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);

    if (!marked) return json;

    var result = '';
    var length = json.length;

    for (var i = 0; i < length; i++) {
      var chr = charAt(json, i);
      if (chr === '"') {
        var end = parseJSONString(json, ++i).end - 1;
        var string = slice(json, i, end);
        if (slice(string, 0, RAW_MARK_LENGTH) === RAW_MARK) result += rawStrings[slice(string, RAW_MARK_LENGTH)];
        else if (slice(string, 0, KEY_MARK_LENGTH) === KEY_MARK) result += '"' + slice(string, KEY_MARK_LENGTH) + '"';
        else result += '"' + string + '"';
        i = end;
      } else result += chr;
    }

    return result;
  }
});

},{"../internals/array-includes":77,"../internals/classof-raw":79,"../internals/export":96,"../internals/fails":97,"../internals/function-call":101,"../internals/function-uncurry-this":105,"../internals/get-built-in":106,"../internals/has-own-property":114,"../internals/is-array":122,"../internals/is-callable":123,"../internals/is-object":127,"../internals/is-raw-json":129,"../internals/is-symbol":130,"../internals/native-raw-json":146,"../internals/object-create":147,"../internals/parse-json-string":160,"../internals/symbol-constructor-detection":179,"../internals/this-number-value":180,"../internals/to-string":190,"../internals/uid":192}],210:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var regExpFlagsDetection = require('../internals/regexp-flags-detection');
var regExpFlagsGetterImplementation = require('../internals/regexp-flags');

// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (DESCRIPTORS && !regExpFlagsDetection.correct) {
  defineBuiltInAccessor(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlagsGetterImplementation
  });

  regExpFlagsDetection.correct = true;
}

},{"../internals/define-built-in-accessor":87,"../internals/descriptors":91,"../internals/regexp-flags":162,"../internals/regexp-flags-detection":161}],211:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.constructor');

},{"../modules/es.iterator.constructor":200}],212:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.every');

},{"../modules/es.iterator.every":201}],213:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.filter');

},{"../modules/es.iterator.filter":202}],214:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.find');

},{"../modules/es.iterator.find":203}],215:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.flat-map');

},{"../modules/es.iterator.flat-map":204}],216:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.for-each');

},{"../modules/es.iterator.for-each":205}],217:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.map');

},{"../modules/es.iterator.map":206}],218:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.reduce');

},{"../modules/es.iterator.reduce":207}],219:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4`
require('../modules/es.iterator.some');

},{"../modules/es.iterator.some":208}],220:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var remove = require('../internals/map-helpers').remove;

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/map-helpers":143}],221:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (!boundFunction(value, key, map)) return false;
    }, true) !== false;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-iterate":144}],222:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) set(newMap, key, value);
    });
    return newMap;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-helpers":143,"../internals/map-iterate":144}],223:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { key: key };
    }, true);
    return result && result.key;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-iterate":144}],224:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { value: value };
    }, true);
    return result && result.value;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-iterate":144}],225:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var sameValueZero = require('../internals/same-value-zero');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  includes: function includes(searchElement) {
    return iterate(aMap(this), function (value) {
      if (sameValueZero(value, searchElement)) return true;
    }, true) === true;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/map-iterate":144,"../internals/same-value-zero":164}],226:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  keyOf: function keyOf(searchElement) {
    var result = iterate(aMap(this), function (value, key) {
      if (value === searchElement) return { key: key };
    }, true);
    return result && result.key;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/map-iterate":144}],227:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, boundFunction(value, key, map), value);
    });
    return newMap;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-helpers":143,"../internals/map-iterate":144}],228:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, key, boundFunction(value, key, map));
    });
    return newMap;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-helpers":143,"../internals/map-iterate":144}],229:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var iterate = require('../internals/iterate');
var set = require('../internals/map-helpers').set;

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, arity: 1, forced: true }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable /* ...iterables */) {
    var map = aMap(this);
    var argumentsLength = arguments.length;
    var i = 0;
    while (i < argumentsLength) {
      iterate(arguments[i++], function (key, value) {
        set(map, key, value);
      }, { AS_ENTRIES: true });
    }
    return map;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/iterate":132,"../internals/map-helpers":143}],230:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

var $TypeError = TypeError;

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = aMap(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(map, function (value, key) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});

},{"../internals/a-callable":69,"../internals/a-map":70,"../internals/export":96,"../internals/map-iterate":144}],231:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return true;
    }, true) === true;
  }
});

},{"../internals/a-map":70,"../internals/export":96,"../internals/function-bind-context":99,"../internals/map-iterate":144}],232:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');

var $TypeError = TypeError;
var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  update: function update(key, callback /* , thunk */) {
    var map = aMap(this);
    var length = arguments.length;
    aCallable(callback);
    var isPresentInMap = has(map, key);
    if (!isPresentInMap && length < 3) {
      throw new $TypeError('Updating absent value');
    }
    var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);
    set(map, key, callback(value, key, map));
    return map;
  }
});

},{"../internals/a-callable":69,"../internals/a-map":70,"../internals/export":96,"../internals/map-helpers":143}],233:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aSet = require('../internals/a-set');
var add = require('../internals/set-helpers').add;

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  addAll: function addAll(/* ...elements */) {
    var set = aSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    } return set;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/set-helpers":167}],234:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aSet = require('../internals/a-set');
var remove = require('../internals/set-helpers').remove;

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/set-helpers":167}],235:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $difference = require('../internals/set-difference');

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  difference: function difference(other) {
    return call($difference, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-difference":166,"../internals/to-set-like":188}],236:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (!boundFunction(value, value, set)) return false;
    }, true) !== false;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/function-bind-context":99,"../internals/set-iterate":172}],237:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var iterate = require('../internals/set-iterate');

var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      if (boundFunction(value, value, set)) add(newSet, value);
    });
    return newSet;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/function-bind-context":99,"../internals/set-helpers":167,"../internals/set-iterate":172}],238:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(set, function (value) {
      if (boundFunction(value, value, set)) return { value: value };
    }, true);
    return result && result.value;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/function-bind-context":99,"../internals/set-iterate":172}],239:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $intersection = require('../internals/set-intersection');

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  intersection: function intersection(other) {
    return call($intersection, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-intersection":168,"../internals/to-set-like":188}],240:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $isDisjointFrom = require('../internals/set-is-disjoint-from');

// `Set.prototype.isDisjointFrom` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isDisjointFrom: function isDisjointFrom(other) {
    return call($isDisjointFrom, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-is-disjoint-from":169,"../internals/to-set-like":188}],241:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $isSubsetOf = require('../internals/set-is-subset-of');

// `Set.prototype.isSubsetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isSubsetOf: function isSubsetOf(other) {
    return call($isSubsetOf, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-is-subset-of":170,"../internals/to-set-like":188}],242:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $isSupersetOf = require('../internals/set-is-superset-of');

// `Set.prototype.isSupersetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isSupersetOf: function isSupersetOf(other) {
    return call($isSupersetOf, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-is-superset-of":171,"../internals/to-set-like":188}],243:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');
var toString = require('../internals/to-string');

var arrayJoin = uncurryThis([].join);
var push = uncurryThis([].push);

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  join: function join(separator) {
    var set = aSet(this);
    var sep = separator === undefined ? ',' : toString(separator);
    var array = [];
    iterate(set, function (value) {
      push(array, value);
    });
    return arrayJoin(array, sep);
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/function-uncurry-this":105,"../internals/set-iterate":172,"../internals/to-string":190}],244:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var iterate = require('../internals/set-iterate');

var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      add(newSet, boundFunction(value, value, set));
    });
    return newSet;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/function-bind-context":99,"../internals/set-helpers":167,"../internals/set-iterate":172}],245:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

var $TypeError = TypeError;

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = aSet(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(set, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});

},{"../internals/a-callable":69,"../internals/a-set":71,"../internals/export":96,"../internals/set-iterate":172}],246:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (boundFunction(value, value, set)) return true;
    }, true) === true;
  }
});

},{"../internals/a-set":71,"../internals/export":96,"../internals/function-bind-context":99,"../internals/set-iterate":172}],247:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $symmetricDifference = require('../internals/set-symmetric-difference');

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  symmetricDifference: function symmetricDifference(other) {
    return call($symmetricDifference, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-symmetric-difference":174,"../internals/to-set-like":188}],248:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $union = require('../internals/set-union');

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  union: function union(other) {
    return call($union, this, toSetLike(other));
  }
});

},{"../internals/export":96,"../internals/function-call":101,"../internals/set-union":175,"../internals/to-set-like":188}],249:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aWeakMap = require('../internals/a-weak-map');
var remove = require('../internals/weak-map-helpers').remove;

// `WeakMap.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aWeakMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

},{"../internals/a-weak-map":72,"../internals/export":96,"../internals/weak-map-helpers":196}],250:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aWeakSet = require('../internals/a-weak-set');
var add = require('../internals/weak-set-helpers').add;

// `WeakSet.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: true }, {
  addAll: function addAll(/* ...elements */) {
    var set = aWeakSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    } return set;
  }
});

},{"../internals/a-weak-set":73,"../internals/export":96,"../internals/weak-set-helpers":197}],251:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aWeakSet = require('../internals/a-weak-set');
var remove = require('../internals/weak-set-helpers').remove;

// `WeakSet.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aWeakSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

},{"../internals/a-weak-set":73,"../internals/export":96,"../internals/weak-set-helpers":197}],252:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.json.stringify.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const removeEmptyProperties_1 = __importDefault(require("./removeEmptyProperties"));
const useExclusions = function makeExclusions() {
  let jsonExclusions = [];
  return (key, value) => {
    if (key === 'jsonExclusions') {
      jsonExclusions = value;
      return value;
    }
    if (jsonExclusions.includes(key)) {
      return undefined;
    }
    return value;
  };
}();
/**
 * Convert DOM Item to JSON string.
 * @param item
 * @param options
 * @param options.propertiesToDelete - Additional property names to strip from every item in the tree for this
 * call only, alongside the always-stripped internal ones. Unlike `jsonExclusions` (set once on an item itself,
 * so every caller sees the same exclusions), this is per-call: the same item can be serialized differently for
 * different callers - for example, a server redacting the same tree once per viewer - without mutating the item.
 */
const domItemToJson = (item, {
  propertiesToDelete = []
} = {}) => JSON.stringify((0, removeEmptyProperties_1.default)(si_funciona_1.default.cloneObject(item), ['activeListeners', 'element', 'parentItem', 'body', 'head', ...propertiesToDelete]), useExclusions);
exports.default = domItemToJson;
},{"./removeEmptyProperties":254,"core-js/modules/es.array.includes.js":199,"core-js/modules/es.json.stringify.js":209,"si-funciona":419}],253:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const domItemToJson_1 = __importDefault(require("./domItemToJson"));
const removeEmptyProperties_1 = __importDefault(require("./removeEmptyProperties"));
exports.default = {
  domItemToJson: domItemToJson_1.default,
  removeEmptyProperties: removeEmptyProperties_1.default
};
},{"./domItemToJson":252,"./removeEmptyProperties":254}],254:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getNonSerializableKeys_1 = __importDefault(require("../domItem/traits/getNonSerializableKeys"));
/**
 * Check if the value is an empty object / array, or if it is null or undefined.
 * @param propertyValue
 * @private
 */
const isEmpty = propertyValue => si_funciona_1.default.emptyObject(propertyValue) || propertyValue === null || typeof propertyValue === 'undefined';
/**
 * Remove all empty properties to reduce total size of the object.
 * @param item - The DomItem with properties to check for empty.
 * @param propertiesToDelete - Optional array of additional property names to remove.
 */
const removeEmptyProperties = (item, propertiesToDelete = []) => {
  item.children.forEach(child => {
    removeEmptyProperties(child, propertiesToDelete);
  });
  const properties = item;
  // What the item's traits only have where the item lives (an element, ...) is not json either
  const toDelete = propertiesToDelete.concat((0, getNonSerializableKeys_1.default)(item));
  si_funciona_1.default.objectKeys(item).forEach(property => {
    const propertyValue = properties[property];
    if (isEmpty(propertyValue) || toDelete.includes(property)) {
      delete properties[property];
    }
  });
  return item;
};
exports.default = removeEmptyProperties;
},{"../domItem/traits/getNonSerializableKeys":282,"core-js/modules/es.array.includes.js":199,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"si-funciona":419}],255:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Initialize the appendChanges method with the changeList, return the appendChanges method.
 * @param changeList
 * @private
 */
const appendChangesTo = changeList => (changeType, changes) => {
  if (!['added', 'removed'].includes(changeType)) {
    throw Error(`Method appendChanges change type must be 'added' or 'removed'; ${changeType} given.`);
  }
  return si_funciona_1.default.mergeObjects(changeList[changeType], changes);
};
/**
 * Create the change list template.
 * @param changeList
 * @param changeList.removed
 * @param changeList.added
 */
const createChangeList = ({
  removed = {},
  added = {}
} = {}) => {
  const changeList = {
    removed: Object.assign({}, removed),
    added: Object.assign({}, added)
  };
  changeList.appendChanges = appendChangesTo(changeList);
  return changeList;
};
exports.default = createChangeList;
},{"core-js/modules/es.array.includes.js":199,"si-funciona":419}],256:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.reduce.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const elementHasAttribute_1 = __importDefault(require("./elementHasAttribute"));
const createChangeList_1 = __importDefault(require("./createChangeList"));
/**
 * Given some config, provide a function to testing attribute and key existence in that config.
 * @param element
 */
const checkAttribute = element => (attr, key) => {
  if (typeof attr === 'object') {
    const styles = attr;
    const elementStyle = () => element.style;
    const styleDiff = (0, elementHasAttribute_1.default)(element, key, attr);
    if (Array.isArray(styleDiff) && styleDiff.length === 1 && styleDiff[0].result[0] === 0 && elementStyle()[styleDiff[0].value] === styles[styleDiff[0].value]) {
      return 0;
    }
    // Check new, removed, or changed styles
    return si_funciona_1.default.filterObject(styleDiff, arrayDiff => arrayDiff.result[0] !== 0 || elementStyle()[arrayDiff.value] !== styles[arrayDiff.value]);
  }
  if (key === 'class') {
    const classDiff = (0, elementHasAttribute_1.default)(element, key, attr);
    if (Array.isArray(classDiff) && classDiff.length === 1 && classDiff[0].result[0] === 0) {
      return 0;
    }
    return si_funciona_1.default.filterObject(classDiff, arrayDiff => arrayDiff.result[0] !== 0);
  }
  return (0, elementHasAttribute_1.default)(element, key, attr);
};
/**
 * Updates all the keys to be kabob-case
 * @param attributesToSet
 */
const kabobCaseAttributes = attributesToSet => si_funciona_1.default.reduceObject(attributesToSet, (attributes, value, name) => {
  let attrValue = attributesToSet[name] ?? value;
  if (si_funciona_1.default.isObject(attrValue)) {
    attrValue = kabobCaseAttributes(attrValue);
  }
  const kabobKey = name === 'className' ? 'class' : si_funciona_1.default.kabobCase(name);
  attributes[kabobKey] = attrValue;
  return attributes;
}, {});
/**
 * Find the name an attribute was given on the item from its kabob-case name: innerHTML is compared as inner-html, and
 * camelCase cannot turn that back into innerHTML.
 * @private
 */
const attributeName = (attributes, kabobKey) => Object.keys(attributes).find(name => (name === 'className' ? 'class' : si_funciona_1.default.kabobCase(name)) === kabobKey) ?? si_funciona_1.default.camelCase(kabobKey);
/**
 * Given a domGeneral.DomItem as domItem, this function will return the changes to be applied
 * to the stored element property.
 * @param domItem - The DomItem having changes to be applied to its element
 */
const domItemChanges = domItem => {
  const changeList = (0, createChangeList_1.default)();
  if (!domItem.element) {
    changeList.added.nodeName = domItem.nodeName.toLowerCase();
  }
  if (domItem.element && domItem.element.nodeName.toLowerCase() !== domItem.nodeName.toLowerCase()) {
    // This should trigger new element creation
    changeList.removed.nodeName = domItem.element.nodeName.toLowerCase();
    changeList.added.nodeName = domItem.nodeName.toLowerCase();
  }
  if (domItem.nodeValue !== null) {
    if (!si_funciona_1.default.emptyObject(domItem.attributes)) {
      changeList.added = changeList.appendChanges('added', si_funciona_1.default.dotNotate(domItem.attributes));
    }
    if (!domItem.element) {
      changeList.added.nodeValue = domItem.nodeValue;
      return changeList;
    }
    changeList.removed.nodeValue = domItem.element.nodeValue;
    if (domItem.element.nodeValue !== domItem.nodeValue) {
      changeList.added.nodeValue = domItem.nodeValue;
    }
    return changeList;
  }
  const domItemAttributes = kabobCaseAttributes(domItem.attributes);
  const diffMap = si_funciona_1.default.mapObject(domItemAttributes, (attr, key) => checkAttribute(domItem.element)(attr, key));
  return si_funciona_1.default.reduceObject(diffMap, (changed, result, key) => {
    const isArray = Array.isArray(result);
    if (!isArray && !result) {
      // Skip if the attribute is not changed (false and not an array)
      return changed;
    }
    if (!isArray && key === 'class') {
      // Full class name string set
      changed.added.className = domItem.attributes.className;
      return changed;
    }
    if (!isArray) {
      // Not an array, simply set the attribute as added
      const name = attributeName(domItem.attributes, key);
      // A property of the element (innerHTML) is set by its own name, anything else as an attribute (aria-label)
      const element = domItem.element;
      changed.added[element && name in element && name !== 'form' ? name : key] = domItem.attributes[name];
      return changed;
    }
    if (key !== 'class' && key !== 'style') {
      // Is an array, but not class or style; we don't know what this is, so we skip it.
      return changed;
    }
    if (key === 'class') {
      changed.removed = result.reduce((removed, results) => {
        if (results.result[0] === -1) {
          removed[`class.${results.keys[1]}`] = results.value;
        }
        return removed;
      }, changed.removed);
      changed.added = result.reduce((added, results) => {
        if (results.result[0] === 1) {
          added[`class.${results.keys[0]}`] = results.value;
        }
        return added;
      }, changed.added);
      return changed;
    }
    const elementStyle = () => domItem.element.style;
    changed.removed = result.reduce((removed, results) => {
      if (!domItem.element) {
        return removed;
      }
      if (results.result[0] === -1) {
        removed[`style.${results.value}`] = elementStyle()[results.value];
      }
      if (results.result[0] === 0 && elementStyle()[results.value] !== domItemAttributes.style[results.value]) {
        removed[`style.${results.value}`] = elementStyle()[results.value];
      }
      return removed;
    }, changed.removed);
    changed.added = result.reduce((added, results) => {
      if (results.result[0] === 1) {
        added[`style.${results.value}`] = domItemAttributes.style[results.value];
      }
      if (results.result[0] === 0 && elementStyle()[results.value] !== domItemAttributes.style[results.value]) {
        added[`style.${results.value}`] = domItemAttributes.style[results.value];
      }
      return added;
    }, changed.added);
    return changed;
  }, changeList);
};
exports.default = domItemChanges;
},{"./createChangeList":255,"./elementHasAttribute":259,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.reduce.js":218,"si-funciona":419}],257:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getAssignedStyles_1 = __importDefault(require("./getAssignedStyles"));
/**
 * For attributes which are objects or multi-part strings -1 = remove attribute, 0 = no change, 1 = add attribute
 * @param domItem
 * @param attr
 */
const checkStyles = (domItem, attr = {}) => {
  const assignedStyles = domItem.attributes.style ?? {};
  if (si_funciona_1.default.emptyObject(assignedStyles)) {
    return 1;
  }
  return si_funciona_1.default.compareArrays(Object.keys((0, getAssignedStyles_1.default)(attr)).map(si_funciona_1.default.camelCase), Object.keys(assignedStyles));
};
/**
 * For attributes which are objects or multipart strings -1 = remove attribute, 0 = no change, 1 = add attribute
 * @param domItem
 * @param attr
 */
const checkClasses = (domItem, attr = '') => {
  const assignedClasses = domItem.attributes.className ?? '';
  if (!assignedClasses.length) {
    return 1;
  }
  return si_funciona_1.default.compareArrays(attr.split(' '), assignedClasses.split(' '));
};
/**
 * Check if the provided DomItem has the provided attributes.
 * Returns a boolean, or an array of 1 / 0 / -1 based on the comparison status.
 * @param domItem - Receive the DomItem to be assessed
 * @param key - The attribute name to search for
 * @param attr - The expected value of the attribute to compare against
 */
const domItemHasAttribute = (domItem, key, attr) => {
  if (key === 'style') {
    return checkStyles(domItem, attr);
  }
  if (key === 'className') {
    return checkClasses(domItem, attr);
  }
  const camelKey = si_funciona_1.default.camelCase(key);
  if (typeof domItem.attributes[camelKey] === 'undefined') {
    return 1;
  }
  if (domItem.attributes[camelKey] === attr) {
    return 0;
  }
  return 1;
};
exports.default = domItemHasAttribute;
},{"./getAssignedStyles":260,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217,"si-funciona":419}],258:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const domItemHasAttribute_1 = __importDefault(require("./domItemHasAttribute"));
const createChangeList_1 = __importDefault(require("./createChangeList"));
/**
 * Given some config, provide a function to testing attribute and key existence in that config.
 * @param domItem
 */
const checkAttribute = domItem => (attr, key) => {
  if (key === 'className') {
    const diff = (0, domItemHasAttribute_1.default)(domItem, key, attr);
    if (Array.isArray(diff) && diff.length === 1 && diff[0].result[0] === 0) {
      return 0;
    }
    return si_funciona_1.default.filterObject(diff, arrayDiff => arrayDiff.result[0] !== 0);
  }
  if (key === 'style') {
    const diff = (0, domItemHasAttribute_1.default)(domItem, key, attr);
    const styles = attr;
    const itemStyle = () => domItem.attributes.style;
    if (Array.isArray(diff) && diff.length === 1 && diff[0].result[0] === 0 && itemStyle()[diff[0].value] === styles[diff[0].value]) {
      return 0;
    }
    return si_funciona_1.default.filterObject(diff, arrayDiff => arrayDiff.result[0] !== 0 || itemStyle()[arrayDiff.value] !== styles[arrayDiff.value]);
  }
  return (0, domItemHasAttribute_1.default)(domItem, key, attr);
};
/**
 * Updates all the keys to be camelCase
 * @param domItem
 */
const camelCaseAttributes = domItem => domItem.element ? si_funciona_1.default.reduceObject(domItem.element.attributes, (attributes, attr) => {
  if (!attr.name) {
    return attributes;
  }
  const camelKey = attr.name === 'class' ? 'className' : si_funciona_1.default.camelCase(attr.name);
  const attributeValue = domItem.element[attr.name] ?? attr.value;
  if (typeof attributeValue === 'undefined') {
    return attributes;
  }
  attributes[camelKey] = attributeValue;
  return attributes;
}, {}) : {};
/**
 * Given a domGeneral.DomItem as config, this function will return the changes from the element
 * to be applied to the domItem.
 * @param domItem - The DomItem having the element which changes to be applied to the config
 * element
 */
const elementChanges = domItem => {
  const changeList = (0, createChangeList_1.default)();
  if (!domItem.element) {
    changeList.removed.nodeName = domItem.nodeName.toLowerCase();
  }
  if (domItem.element && domItem.element.nodeName.toLowerCase() !== domItem.nodeName.toLowerCase()) {
    changeList.removed.nodeName = domItem.nodeName.toLowerCase();
    changeList.added.nodeName = domItem.element.nodeName.toLowerCase();
  }
  if (!domItem.element && domItem.nodeValue !== null) {
    changeList.removed.nodeValue = domItem.nodeValue;
    if (!si_funciona_1.default.emptyObject(domItem.attributes)) {
      changeList.removed = changeList.appendChanges('removed', si_funciona_1.default.dotNotate({
        attributes: domItem.attributes
      }));
    }
    return changeList;
  }
  if (domItem.element && !(domItem.element instanceof Element)) {
    if (domItem.element.nodeValue !== domItem.nodeValue) {
      changeList.added.nodeValue = domItem.element.nodeValue;
    }
    if (!si_funciona_1.default.emptyObject(domItem.attributes)) {
      changeList.removed = changeList.appendChanges('removed', si_funciona_1.default.dotNotate({
        attributes: domItem.attributes
      }));
    }
    return changeList;
  }
  if (!(domItem.element && domItem.element.hasAttributes()) && !si_funciona_1.default.emptyObject(domItem.attributes)) {
    changeList.removed = changeList.appendChanges('removed', si_funciona_1.default.dotNotate({
      attributes: domItem.attributes
    }));
    return changeList;
  }
  const elementAttributes = camelCaseAttributes(domItem);
  const diffMap = si_funciona_1.default.mapObject(elementAttributes, (attr, key) => checkAttribute(domItem)(attr, key));
  return si_funciona_1.default.reduceObject(diffMap, (changed, result, key) => {
    const isArray = Array.isArray(result);
    if (!isArray && !result) {
      // Skip if the attribute is not changed (false and not an array)
      return changed;
    }
    if (!isArray) {
      // Not an array, simply set the attribute as added
      changed.added[`attributes.${key}`] = domItem.element[key] ?? domItem.element.getAttribute(si_funciona_1.default.kabobCase(key));
      return changed;
    }
    if (key !== 'className' && key !== 'style') {
      // Is an array, but not class or style; we don't know what this is, so we skip it.
      return changed;
    }
    if (key === 'className') {
      changed.removed = result.reduce((removed, results) => {
        if (results.result[0] === -1) {
          removed[`attributes.className.${results.keys[1]}`] = results.value;
        }
        return removed;
      }, changed.removed);
      changed.added = result.reduce((added, results) => {
        if (results.result[0] === 1) {
          added[`attributes.className.${results.keys[0]}`] = results.value;
        }
        return added;
      }, changed.added);
      return changed;
    }
    const itemStyle = () => domItem.attributes.style;
    changed.removed = result.reduce((removed, results) => {
      if (results.result[0] === -1) {
        removed[`attributes.style.${results.value}`] = itemStyle()[results.value];
      }
      if (results.result[0] === 0 && itemStyle()[results.value] !== elementAttributes.style[results.value]) {
        removed[`attributes.style.${results.value}`] = itemStyle()[results.value];
      }
      return removed;
    }, changed.removed);
    changed.added = result.reduce((added, results) => {
      if (results.result[0] === 1) {
        added[`attributes.style.${results.value}`] = elementAttributes.style[results.value];
      }
      if (results.result[0] === 0 && itemStyle()[results.value] !== elementAttributes.style[results.value]) {
        added[`attributes.style.${results.value}`] = elementAttributes.style[results.value];
      }
      return added;
    }, changed.added);
    return changed;
  }, changeList);
};
exports.default = elementChanges;
},{"./createChangeList":255,"./domItemHasAttribute":257,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218,"si-funciona":419}],259:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const getAssignedStyles_1 = __importDefault(require("./getAssignedStyles"));
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * For attributes which are objects or multi-part strings -1 = remove attribute, 0 = no change, 1 = add attribute
 * @param element
 * @param attr
 */
const checkStyles = (element, attr = {}) => {
  const assignedStyles = (0, getAssignedStyles_1.default)(element.style) ?? {};
  if (si_funciona_1.default.emptyObject(assignedStyles)) {
    return 1;
  }
  return si_funciona_1.default.compareArrays(Object.keys(attr).map(si_funciona_1.default.kabobCase), Object.keys(assignedStyles));
};
/**
 * For attributes which are objects or multi-part strings -1 = remove attribute, 0 = no change, 1 = add attribute
 * @param element
 * @param attr
 */
const checkClasses = (element, attr = '') => {
  if (typeof attr !== 'string') {
    // Somehow an empty object got in here one time
    attr = '';
  }
  const assignedClasses = Array.from(element.classList);
  if (!assignedClasses.length) {
    return 1;
  }
  return si_funciona_1.default.compareArrays(attr.split(' '), assignedClasses);
};
/**
 * Check if the provided Element has the provided attributes.
 * Returns a boolean, or an array of 1 / 0 / -1 based on the comparison status.
 * @param element - Receive the element to be assessed
 * @param key - The attribute name to search for
 * @param attr - The expected value of the attribute to compare against
 */
const elementHasAttribute = (element, key, attr) => {
  if (!element) {
    return 1;
  }
  if (key === 'style') {
    return checkStyles(element, attr);
  }
  if (key === 'class') {
    return checkClasses(element, attr);
  }
  const kabobKey = si_funciona_1.default.kabobCase(key);
  if (!element.hasAttribute(kabobKey)) {
    return 1;
  }
  if (element.getAttribute(kabobKey) === attr) {
    return 0;
  }
  return 1;
};
exports.default = elementHasAttribute;
},{"./getAssignedStyles":260,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217,"si-funciona":419}],260:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Get all the styles which have been assigned to this element. Assigned styles are indicated as numeric-key
 * properties with a value indicating the string-key property which has been assigned. The string-key properties
 * have the assigned values.
 * @param elementStyles
 */
const getAssignedStyles = elementStyles => si_funciona_1.default.reduceObject(elementStyles, (styles, attr, key) => Number.isNaN(Number(key)) ? styles : si_funciona_1.default.setValue(attr, elementStyles[attr], styles), {});
exports.default = getAssignedStyles;
},{"si-funciona":419}],261:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createChangeList_1 = __importDefault(require("./createChangeList"));
const domItemChanges_1 = __importDefault(require("./domItemChanges"));
const domItemHasAttribute_1 = __importDefault(require("./domItemHasAttribute"));
const elementChanges_1 = __importDefault(require("./elementChanges"));
const elementHasAttribute_1 = __importDefault(require("./elementHasAttribute"));
const getAssignedStyles_1 = __importDefault(require("./getAssignedStyles"));
exports.default = {
  createChangeList: createChangeList_1.default,
  domItemChanges: domItemChanges_1.default,
  domItemHasAttribute: domItemHasAttribute_1.default,
  elementChanges: elementChanges_1.default,
  elementHasAttribute: elementHasAttribute_1.default,
  getAssignedStyles: getAssignedStyles_1.default
};
},{"./createChangeList":255,"./domItemChanges":256,"./domItemHasAttribute":257,"./elementChanges":258,"./elementHasAttribute":259,"./getAssignedStyles":260}],262:[function(require,module,exports){
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
 * Core Virtual DOM (DomItem tree) management: building items, the traits they carry, and finding and changing
 * items in a tree.
 */
const addDomItemProperties_1 = __importDefault(require("./objects/addDomItemProperties"));
const appendChild_1 = __importDefault(require("./tree/appendChild"));
const createCoreItem_1 = __importDefault(require("./objects/createCoreItem"));
const createDomItem_1 = __importDefault(require("./objects/createDomItem"));
const defineTrait_1 = __importDefault(require("./traits/defineTrait"));
const documentDomItem_1 = __importDefault(require("./objects/documentDomItem"));
const documentItem_1 = __importDefault(require("./objects/documentItem"));
const gatherChildItems_1 = __importDefault(require("./query/gatherChildItems"));
const getChildrenByClass_1 = __importDefault(require("./query/getChildrenByClass"));
const getChildrenByName_1 = __importDefault(require("./query/getChildrenByName"));
const getChildrenFromAttribute_1 = __importDefault(require("./query/getChildrenFromAttribute"));
const getChildTest_1 = __importDefault(require("./query/getChildTest"));
const getItemByElement_1 = __importDefault(require("./query/getItemByElement"));
const itemIdIndex_1 = require("./tree/itemIdIndex");
const getItemByPath_1 = __importDefault(require("./tree/getItemByPath"));
const getItemPath_1 = __importDefault(require("./tree/getItemPath"));
const getParentsByClass_1 = __importDefault(require("./query/getParentsByClass"));
const getParentsByName_1 = __importDefault(require("./query/getParentsByName"));
const getParentsByTagName_1 = __importDefault(require("./query/getParentsByTagName"));
const getParentsFromAttribute_1 = __importDefault(require("./query/getParentsFromAttribute"));
const getTopParentItem_1 = __importDefault(require("./tree/getTopParentItem"));
const getTraitDefinition_1 = __importDefault(require("./traits/getTraitDefinition"));
const hasTrait_1 = __importDefault(require("./traits/hasTrait"));
const hasTraits_1 = __importDefault(require("./traits/hasTraits"));
const initChildren_1 = __importDefault(require("./objects/initChildren"));
const initRoot_1 = __importDefault(require("./objects/initRoot"));
const insertChild_1 = __importDefault(require("./tree/insertChild"));
const isDomItem_1 = __importDefault(require("./traits/isDomItem"));
const removeChild_1 = __importDefault(require("./tree/removeChild"));
const setParentItemReferences_1 = __importDefault(require("./tree/setParentItemReferences"));
const withTrait_1 = __importDefault(require("./traits/withTrait"));
exports.default = {
  addDomItemProperties: addDomItemProperties_1.default,
  appendChild: appendChild_1.default,
  createCoreItem: createCoreItem_1.default,
  createDomItem: createDomItem_1.default,
  defineTrait: defineTrait_1.default,
  documentDomItem: documentDomItem_1.default,
  documentItem: documentItem_1.default,
  gatherChildItems: gatherChildItems_1.default,
  getChildrenByClass: getChildrenByClass_1.default,
  getChildrenByName: getChildrenByName_1.default,
  getChildrenFromAttribute: getChildrenFromAttribute_1.default,
  getChildTest: getChildTest_1.default,
  getItemByElement: getItemByElement_1.default,
  getItemById: itemIdIndex_1.getItemById,
  getItemByPath: getItemByPath_1.default,
  getItemPath: getItemPath_1.default,
  getParentsByClass: getParentsByClass_1.default,
  getParentsByName: getParentsByName_1.default,
  getParentsByTagName: getParentsByTagName_1.default,
  getParentsFromAttribute: getParentsFromAttribute_1.default,
  getTopParentItem: getTopParentItem_1.default,
  getTraitDefinition: getTraitDefinition_1.default,
  hasTrait: hasTrait_1.default,
  hasTraits: hasTraits_1.default,
  initChildren: initChildren_1.default,
  initRoot: initRoot_1.default,
  insertChild: insertChild_1.default,
  isDomItem: isDomItem_1.default,
  removeChild: removeChild_1.default,
  setParentItemReferences: setParentItemReferences_1.default,
  withTrait: withTrait_1.default
};
},{"./objects/addDomItemProperties":263,"./objects/createCoreItem":264,"./objects/createDomItem":265,"./objects/documentDomItem":266,"./objects/documentItem":267,"./objects/initChildren":268,"./objects/initRoot":269,"./query/gatherChildItems":270,"./query/getChildTest":271,"./query/getChildrenByClass":272,"./query/getChildrenByName":273,"./query/getChildrenFromAttribute":274,"./query/getItemByElement":275,"./query/getParentsByClass":276,"./query/getParentsByName":277,"./query/getParentsByTagName":278,"./query/getParentsFromAttribute":279,"./traits/defineTrait":280,"./traits/getTraitDefinition":283,"./traits/hasTrait":284,"./traits/hasTraits":285,"./traits/isDomItem":286,"./traits/withTrait":287,"./tree/appendChild":288,"./tree/getItemByPath":289,"./tree/getItemPath":290,"./tree/getTopParentItem":291,"./tree/insertChild":292,"./tree/itemIdIndex":293,"./tree/removeChild":294,"./tree/setParentItemReferences":295}],263:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createDomItem_1 = __importDefault(require("./createDomItem"));
/**
 * Ensure all basic properties of the DomItem are present.
 * @param item - The object that will be formatted as a DomItem.
 */
const addDomItemProperties = item => {
  if (typeof item.children !== 'undefined') {
    item.children.forEach(child => {
      addDomItemProperties(child);
    });
  }
  return (0, createDomItem_1.default)(item);
};
exports.default = addDomItemProperties;
},{"./createDomItem":265,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],264:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const appendChild_1 = __importDefault(require("../tree/appendChild"));
const removeChild_1 = __importDefault(require("../tree/removeChild"));
const itemIdIndex_1 = require("../tree/itemIdIndex");
/**
 * Create the generic item, without the render trait. Every property which is not given gets its default. The given
 * object is completed and returned (it is not copied). Children which are plain objects are completed the same way, all
 * the way down; a child which already has a has map is taken to be complete and is left alone.
 * @param item - Item-like object to be formatted as a CoreItem
 */
const createCoreItem = (item = {}) => {
  if (Array.isArray(item.children)) {
    item.children.forEach(child => {
      if (typeof child === 'object' && child !== null && !child.has) {
        createCoreItem(child);
      }
    });
  }
  const newItem = si_funciona_1.default.reduceObject({
    attributes: {},
    children: [],
    eventListeners: {},
    has: {},
    id: (0, itemIdIndex_1.generateItemId)(),
    jsonExclusions: [],
    nodeName: 'div',
    nodeValue: null,
    parentItem: null
  }, (coreItem, defaultValue, prop) => {
    if (!(prop in coreItem)) {
      coreItem[prop] = defaultValue;
      return coreItem;
    }
    return coreItem;
  }, item);
  newItem.appendChild = si_funciona_1.default.curry(appendChild_1.default)(newItem);
  newItem.removeChild = si_funciona_1.default.curry(removeChild_1.default)(newItem);
  return newItem;
};
exports.default = createCoreItem;
},{"../tree/appendChild":288,"../tree/itemIdIndex":293,"../tree/removeChild":294,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"si-funciona":419}],265:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createCoreItem_1 = __importDefault(require("./createCoreItem"));
const withTrait_1 = __importDefault(require("../traits/withTrait"));
/**
 * A plain child is an object which is not an item yet (an item always has a has map).
 * @private
 */
const isPlainChild = child => typeof child === 'object' && child !== null && !child.has;
/**
 * This is the basic Object for representing a node in json-dom's Virtual DOM (DomItem tree): a generic item (see
 * {@link createCoreItem}) with the render trait. All incoming attributes will be merged to the specified format, and the
 * given object is completed and returned (it is not copied). Children which are plain objects are completed the same way,
 * all the way down; a child which already has a has map is already an item, and is left alone.
 * @param item - DomItem-like object to be formatted as DomItem
 */
const createDomItem = (item = {}) => {
  if (Array.isArray(item.children)) {
    item.children.forEach(child => {
      if (isPlainChild(child)) {
        createDomItem(child);
      }
    });
  }
  return (0, withTrait_1.default)((0, createCoreItem_1.default)(item), 'render', {
    element: item.element ?? null
  });
};
exports.default = createDomItem;
},{"../traits/withTrait":287,"./createCoreItem":264,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],266:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createDomItem_1 = __importDefault(require("./createDomItem"));
const initChildren_1 = __importDefault(require("./initChildren"));
const initRoot_1 = __importDefault(require("./initRoot"));
const updateDomItems_1 = __importDefault(require("../../sync/updateDomItems"));
/**
 * Return the root DomItem of a Virtual DOM (DomItem tree) for the document. The rootItem argument is a system
 * variable and not necessary to implement.
 * @param listeners - An object of all event
 * listeners to be registered in the Dom
 * @param rootItem - This is a
 * reference to DomItemRoot which will be defaulted with {@link initRoot}
 */
const documentDomItem = (listeners = {}, rootItem = (0, initRoot_1.default)((0, initChildren_1.default)(), listeners)) => {
  rootItem.children = rootItem.children.map(child => (0, createDomItem_1.default)(child));
  rootItem.children.map(child => {
    child.parentItem = rootItem;
    return child;
  });
  rootItem.head = rootItem.children[0];
  rootItem.body = rootItem.children[1];
  return (0, updateDomItems_1.default)((0, createDomItem_1.default)(rootItem));
};
exports.default = documentDomItem;
},{"../../sync/updateDomItems":339,"./createDomItem":265,"./initChildren":268,"./initRoot":269,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217}],267:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentDomItem_1 = __importDefault(require("./documentDomItem"));
let existingItem = null;
/**
 * The shared root DomItem of the Virtual DOM (DomItem tree) for this environment's real document.
 */
const documentItem = (() => {
  if (existingItem === null) {
    existingItem = (0, documentDomItem_1.default)();
  }
  return existingItem;
})();
exports.default = documentItem;
},{"./documentDomItem":266}],268:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createDomItem_1 = __importDefault(require("./createDomItem"));
const onBodyLoad_1 = __importDefault(require("si-funciona/dist/helpers/functions/onBodyLoad"));
/**
 * Initiate the children of Root / DocumentItem. This is a helper for {@link documentDomItem}.
 */
const initChildren = () => {
  const head = document.head;
  const body = document.body;
  const children = [(0, createDomItem_1.default)({
    nodeName: 'head',
    attributes: {},
    element: head,
    children: []
  }), (0, createDomItem_1.default)({
    nodeName: 'body',
    attributes: {},
    element: body,
    children: []
  })];
  if (!head || !body) {
    (0, onBodyLoad_1.default)(() => {
      if (children[1].element === null) {
        children[0].element = document.head;
        children[1].element = document.body;
      }
      return children;
    });
  }
  return children;
};
exports.default = initChildren;
},{"./createDomItem":265,"si-funciona/dist/helpers/functions/onBodyLoad":367}],269:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createDomItem_1 = __importDefault(require("./createDomItem"));
/**
 * Initiate the Root for DocumentItem. This is primary a helper for {@link documentDomItem}.
 * @param children - Provide an array of Head and Body (usually via {@link initChildren})
 * @param listeners - An object of all event listeners to be registered in the Dom
 */
const initRoot = (children = [{}, {}], listeners = {}) => (0, createDomItem_1.default)({
  nodeName: '#document',
  nodeValue: null,
  attributes: {},
  element: document,
  eventActions: listeners,
  eventListeners: {},
  children,
  parentItem: {},
  head: children[0],
  body: children[1]
});
exports.default = initRoot;
},{"./createDomItem":265}],270:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A selector function for retrieving existing child domGeneral.DomItems from the given parent item.
 * This function will check all the children starting from and including item, and run the test function on each
 * child encountered. The return array contains children returned from the test from all levels.
 * WARNING: This is a recursive function.
 * @param item - The DomItem which may have child items matching the attribute
 * criteria
 * @param test - Assess each child, and return the ones which qualify
 */
const gatherChildItems = (item, test) => test(item, item.children.reduce((a, b) => a.concat(gatherChildItems(b, test)), []));
exports.default = gatherChildItems;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],271:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Retrieve the {@link module:domGeneral~testChildItem} function by providing an attribute and value to check.
 * @param attr - Provide the attribute name to be searched
 * @param value - The attribute value to be compared
 */
const getChildTest = (attr, value) => (item, gatheredResults) => item.attributes[attr] && item.attributes[attr] === value ? gatheredResults.concat([item]) : gatheredResults;
exports.default = getChildTest;
},{}],272:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../objects/documentItem"));
const gatherChildItems_1 = __importDefault(require("./gatherChildItems"));
/**
 * Helper for getting all domGeneral.DomItems starting at item and carrying the given class, among possibly several
 * space-separated classes on that item - the same membership check as the real DOM's classList.contains, not an
 * exact match of the whole className attribute string (which getChildrenFromAttribute does, and which would miss
 * an item that also carries other classes).
 * @param className - The one class being searched for
 * @param item - The DomItem which may have child items carrying the class
 */
const getChildrenByClass = (className, item = documentItem_1.default.body) => (0, gatherChildItems_1.default)(item, (child, gatheredResults) => (child.attributes.className ?? '').split(' ').includes(className) ? gatheredResults.concat([child]) : gatheredResults);
exports.default = getChildrenByClass;
},{"../objects/documentItem":267,"./gatherChildItems":270,"core-js/modules/es.array.includes.js":199}],273:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getChildrenFromAttribute_1 = __importDefault(require("./getChildrenFromAttribute"));
/**
 * Helper for getting all domGeneral.DomItems starting at parent and having specified name attribute
 * @param name - The name searched for
 * @param item - The DomItem which may have child items matching the attribute
 * criteria
 */
const getChildrenByName = si_funciona_1.default.curry(getChildrenFromAttribute_1.default)('name');
exports.default = getChildrenByName;
},{"./getChildrenFromAttribute":274,"si-funciona":419}],274:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../objects/documentItem"));
const gatherChildItems_1 = __importDefault(require("./gatherChildItems"));
const getChildTest_1 = __importDefault(require("./getChildTest"));
/**
 * A selector function for retrieving existing child domGeneral.DomItems from the given parent item.
 * This function will check all the children starting from item, and scan the attributes
 * property for matches. The returned array contains children matching from all levels.
 * WARNING: This calls a recursive function.
 * @param attr - Provide the attribute name to be searched
 * @param value - The attribute value to be compared
 * @param item - The DomItem which may have child items matching the attribute
 * criteria
 */
const getChildrenFromAttribute = (attr, value, item = documentItem_1.default.body) => (0, gatherChildItems_1.default)(item, (0, getChildTest_1.default)(attr, value));
exports.default = getChildrenFromAttribute;
},{"../objects/documentItem":267,"./gatherChildItems":270,"./getChildTest":271}],275:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Find the item (item itself, or one of its descendants) whose element is the one given, or null when none match.
 * Only searches item and its own subtree: an event's target is always the item a listener is attached to, or one of
 * its descendants (that is what bubbling means), so there is never a reason to search outside it.
 * WARNING: This is a recursive function.
 * @param item - The DomItem (and its subtree) to search.
 * @param element - The real element to match against each item's element.
 */
const getItemByElement = (item, element) => {
  if (item.element === element) {
    return item;
  }
  for (const child of item.children) {
    const found = getItemByElement(child, element);
    if (found) {
      return found;
    }
  }
  return null;
};
exports.default = getItemByElement;
},{}],276:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../objects/documentItem"));
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Helper for getting all domGeneral.DomItems going up from item's parent, each one carrying the given class, among
 * possibly several space-separated classes on that item - the same membership check as the real DOM's
 * classList.contains, not an exact match of the whole className attribute string (which getParentsFromAttribute
 * does, and which would miss a parent that also carries other classes).
 * WARNING: This is a recursive function.
 * @param className - The one class being searched for
 * @param item - The DomItem which may have parent items carrying the class
 */
const getParentsByClass = (className, item = documentItem_1.default.body) => {
  if (item.parentItem === null) {
    if (item.nodeName === '#document') {
      throw new Error('Root parent item must be an empty object, null reference found.');
    }
    throw new Error('Detached child, missing parentItem reference. Use empty object if this is the root item.');
  }
  if (si_funciona_1.default.emptyObject(item.parentItem)) {
    return [];
  }
  const parent = item.parentItem;
  const carriesClass = (parent.attributes.className ?? '').split(' ').includes(className);
  return carriesClass ? getParentsByClass(className, parent).concat([parent]) : getParentsByClass(className, parent);
};
exports.default = getParentsByClass;
},{"../objects/documentItem":267,"core-js/modules/es.array.includes.js":199,"si-funciona":419}],277:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getParentsFromAttribute_1 = __importDefault(require("./getParentsFromAttribute"));
/**
 * Helper for getting all domGeneral.DomItems starting at child and having specified name attribute
 * @param name - The name to search for
 * @param item - The DomItem which may have parent items matching the
 * attribute criteria
 */
const getParentsByName = si_funciona_1.default.curry(getParentsFromAttribute_1.default)('name');
exports.default = getParentsByName;
},{"./getParentsFromAttribute":279,"si-funciona":419}],278:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getParentsFromAttribute_1 = __importDefault(require("./getParentsFromAttribute"));
/**
 * Helper for getting all domGeneral.DomItems starting at child and having specified nodeName
 * @param nodeName - The nodeName to search for
 * @param item - The DomItem which may have parent items matching the
 * attribute criteria
 */
const getParentsByTagName = si_funciona_1.default.curry(getParentsFromAttribute_1.default)('nodeName');
exports.default = getParentsByTagName;
},{"./getParentsFromAttribute":279,"si-funciona":419}],279:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../objects/documentItem"));
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * A selector function for retrieving existing child domGeneral.DomItems from the given parent item.
 * This function will check all the children starting from item, and scan the attributes
 * property for matches. The return array contains children matching from all levels.
 * WARNING: This is a recursive function.
 * @param attr - Provide the attribute name to be searched
 * @param value - The attribute value to be compared
 * @param item - The DomItem which may have parent items matching the
 * attribute criteria
 */
const getParentsFromAttribute = (attr, value, item = documentItem_1.default.body) => {
  if (item.parentItem === null) {
    if (item.nodeName === '#document') {
      throw new Error('Root parent item must be an empty object, null reference found.');
    }
    throw new Error('Detached child, missing parentItem reference. Use empty object if this is the root item.');
  }
  if (si_funciona_1.default.emptyObject(item.parentItem)) {
    return [];
  }
  const parent = item.parentItem;
  return (parent.attributes[attr] || item[attr] || false) === value ? getParentsFromAttribute(attr, value, parent).concat([parent]) : getParentsFromAttribute(attr, value, parent);
};
exports.default = getParentsFromAttribute;
},{"../objects/documentItem":267,"si-funciona":419}],280:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const definitions_1 = __importDefault(require("./definitions"));
/**
 * Describe a trait so json-dom knows what it is at runtime: the properties it puts on an item (so they can be left out
 * of json when they only make sense where the item lives), and the defaults a new item gets. Types are added
 * separately, by merging into TraitRegistry.
 * @param name - The name of the trait, prefixed by the package which defines it: matrix.row
 * @param definition - The properties the trait puts on an item, whether they are serializable and the defaults.
 */
const defineTrait = (name, definition) => {
  definitions_1.default.set(name, definition);
  return definition;
};
exports.default = defineTrait;
},{"./definitions":281}],281:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.map.delete-all.js");
require("core-js/modules/esnext.map.every.js");
require("core-js/modules/esnext.map.filter.js");
require("core-js/modules/esnext.map.find.js");
require("core-js/modules/esnext.map.find-key.js");
require("core-js/modules/esnext.map.includes.js");
require("core-js/modules/esnext.map.key-of.js");
require("core-js/modules/esnext.map.map-keys.js");
require("core-js/modules/esnext.map.map-values.js");
require("core-js/modules/esnext.map.merge.js");
require("core-js/modules/esnext.map.reduce.js");
require("core-js/modules/esnext.map.some.js");
require("core-js/modules/esnext.map.update.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * What each trait is at runtime, by name. render is the one json-dom brings; other libraries add theirs with
 * defineTrait.
 */
const definitions = new Map([['render', {
  keys: ['element', 'activeListeners'],
  serializable: false,
  defaults: () => ({
    element: null
  })
}]]);
exports.default = definitions;
},{"core-js/modules/esnext.map.delete-all.js":220,"core-js/modules/esnext.map.every.js":221,"core-js/modules/esnext.map.filter.js":222,"core-js/modules/esnext.map.find-key.js":223,"core-js/modules/esnext.map.find.js":224,"core-js/modules/esnext.map.includes.js":225,"core-js/modules/esnext.map.key-of.js":226,"core-js/modules/esnext.map.map-keys.js":227,"core-js/modules/esnext.map.map-values.js":228,"core-js/modules/esnext.map.merge.js":229,"core-js/modules/esnext.map.reduce.js":230,"core-js/modules/esnext.map.some.js":231,"core-js/modules/esnext.map.update.js":232}],282:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.flat-map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const definitions_1 = __importDefault(require("./definitions"));
/**
 * The properties an item has only because of its traits, and which do not belong in json (the element of the render
 * trait, for one).
 * @param item - The item to look at.
 * @private
 */
const getNonSerializableKeys = item => Object.keys(item.has ?? {}).flatMap(trait => {
  const definition = definitions_1.default.get(trait);
  return definition && definition.serializable === false ? definition.keys : [];
});
exports.default = getNonSerializableKeys;
},{"./definitions":281,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.flat-map.js":215}],283:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const definitions_1 = __importDefault(require("./definitions"));
/**
 * The runtime definition of a trait, if it was defined.
 * @param name - The name of the trait.
 */
const getTraitDefinition = name => definitions_1.default.get(name);
exports.default = getTraitDefinition;
},{"./definitions":281}],284:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Whether an item has a trait. It is also a type guard: after the check the trait's data is typed on the item.
 * @param item - The item to check.
 * @param trait - The name of the trait.
 */
const hasTrait = (item, trait) => (item.has ?? {})[trait] === true;
exports.default = hasTrait;
},{}],285:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Whether an item has all of these traits. It is also a type guard: after the check the data of every one of the traits
 * is typed on the item.
 * @param item - The item to check.
 * @param traits - The names of the traits.
 */
const hasTraits = (item, ...traits) => traits.every(trait => (item.has ?? {})[trait] === true);
exports.default = hasTraits;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212}],286:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const hasTrait_1 = __importDefault(require("./hasTrait"));
/**
 * Whether an item, and every item below it, has the render trait: the tree json-dom's render and sync functions work
 * on. hasTrait only checks the one item, so use this where a tree comes from somewhere else. It is also a type guard.
 * @param item - The item at the top of the tree to check.
 */
const isDomItem = item => (0, hasTrait_1.default)(item, 'render') && item.children.every(isDomItem);
exports.default = isDomItem;
},{"./hasTrait":284,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212}],287:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const definitions_1 = __importDefault(require("./definitions"));
/**
 * Give an item a trait: the trait's defaults and the given data are put on the item (the same object, not a copy), and
 * it is added to the item's has map.
 * @param item - The item which gains the trait.
 * @param trait - The name of the trait.
 * @param data - The data the trait puts on the item.
 * @returns The same item, now with the trait.
 */
const withTrait = (item, trait, data) => {
  Object.assign(item, definitions_1.default.get(trait)?.defaults?.(), data);
  item.has = Object.assign(item.has ?? {}, {
    [trait]: true
  });
  return item;
};
exports.default = withTrait;
},{"./definitions":281}],288:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Append a child to the end of given parent's children list.
 * @param parent - The parent that will receive the child.
 * @param child - The new child to attach to the parent.
 */
const appendChild = (parent, child) => {
  parent.children.push(child);
  child.parentItem = parent;
  return parent;
};
exports.default = appendChild;
},{}],289:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Resolve a path (as built by getItemPath) back to the item it points at, starting from the root. Throws when the
 * path no longer matches the tree's current shape - exactly like a stale reference to a real DOM element would, a
 * path is only valid for as long as the tree it was built from keeps the same shape.
 * @param root - The item the path is relative to (usually documentItem).
 * @param path - The path to resolve, as returned by getItemPath.
 */
const getItemByPath = (root, path) => path.reduce((item, index) => {
  const child = item.children[index];
  if (!child) {
    throw new Error(`No item at index ${index} of path [${path.join(', ')}] - the tree may have changed shape since this path was built.`);
  }
  return child;
}, root);
exports.default = getItemByPath;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],290:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * The path from the root to an item: the index of the item among its parent's children, at each level from the top
 * down. An empty array means the item is the root itself.
 * WARNING: This is a recursive function.
 * @param item - The DomItem to find the path of.
 */
const getItemPath = item => {
  if (item.parentItem === null) {
    throw new Error('Detached child, missing parentItem reference. Use empty object if this is the root item.');
  }
  if (si_funciona_1.default.emptyObject(item.parentItem)) {
    return [];
  }
  const parent = item.parentItem;
  return [...getItemPath(parent), parent.children.indexOf(item)];
};
exports.default = getItemPath;
},{"si-funciona":419}],291:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Get the upper parentItem for the provided child. (usually this is a documentItem reference)
 * WARNING: This is a recursive function.
 * @param item - The DomItem which we want the highest parent item of
 */
const getTopParentItem = item => {
  if (item.parentItem === null) {
    if (item.nodeName === '#document') {
      throw new Error('Root parent item must be an empty object, null reference found.');
    }
    throw new Error('Detached child, missing parentItem reference. Use empty object if this is the root item.');
  }
  return si_funciona_1.default.emptyObject(item.parentItem) ? item : getTopParentItem(item.parentItem);
};
exports.default = getTopParentItem;
},{"si-funciona":419}],292:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Insert a child into a parent's children list at a given position (like appendChild, but positioned). Appending is
 * insertChild at the end: `appendChild(parent, child)` is `insertChild(parent, child, parent.children.length)`.
 * @param parent - The parent that will receive the child.
 * @param child - The new child to attach to the parent.
 * @param index - Where in parent's children the child goes; out of range clamps to the nearest end, so 0 is always
 * the front and a large index is always the back (matching Array.prototype.splice).
 */
const insertChild = (parent, child, index) => {
  parent.children.splice(index, 0, child);
  child.parentItem = parent;
  return parent;
};
exports.default = insertChild;
},{}],293:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemById = exports.unregisterItemIds = exports.registerItemIds = exports.generateItemId = void 0;
const si_funciona_1 = __importDefault(require("si-funciona"));
const collect_your_stuff_1 = require("collect-your-stuff");
/** One lookup index per json-dom process: every root's own ids live in their own scope, so two unrelated trees
 * (the server's real tree and a client's independently-built one) never collide even though both number their
 * items starting from the same small integers. */
const itemsById = new collect_your_stuff_1.ScopedCollection();
/** The next id to assign - a plain, process-local monotonic counter (not a UUID: cheaper to generate/compare/
 * serialize, and uniqueness only ever needs to hold within one process, since nothing resolves an id against a
 * different root than the one it came from). Exported for createCoreItem's own first stamp and for this
 * module's own collision repair below - kept here, not there, since this module must never import back from
 * createCoreItem (which already imports this one, via removeChild - see unregisterItemIds's own caller). */
let nextItemId = 0;
const generateItemId = () => nextItemId++;
exports.generateItemId = generateItemId;
/**
 * The real root above item, or null when item's own parentItem chain never reaches one. That covers two
 * different, both legitimate cases: an item rendered into some arbitrary, never-rooted container (see
 * renderHtml's own tests - not one forwarding could ever target, so it is not an error for it to have no
 * id-index entry), and an item that was never completed as a real DomItem at all - a raw plain config object
 * merged directly onto an already-rendered tree (si-funciona's mergeObjectsMutable, by reference, "as is",
 * when the two sides' shapes do not line up index-for-index - see updatePlayerStats.ts) carries no parentItem
 * property whatsoever, `undefined` rather than this codebase's own usual `null` for "detached". Unlike
 * getTopParentItem, this never throws: it is used purely to decide whether registration applies, not to
 * assert that a real root exists.
 * @param item
 */
const tryGetRoot = item => {
  let current = item;
  while (current.parentItem != null) {
    if (si_funciona_1.default.emptyObject(current.parentItem)) {
      return current;
    }
    current = current.parentItem;
  }
  return null;
};
/**
 * Register an item (and, recursively, its whole subtree) in its own root's id index, so getItemById can find
 * it. Call once a subtree's relationship to its parent is settled - see renderHtml, which is the one place
 * that happens for a freshly-attached subtree. Does nothing when item is not under a real root yet (or ever).
 *
 * Repairs two ways an item can reach this point without the id createCoreItem is supposed to have already
 * stamped on it, rather than requiring every consumer to avoid either:
 * - No id at all (`typeof item.id !== 'number'`): a raw plain config object merged directly onto an
 *   already-rendered tree (si-funciona's mergeObjectsMutable, by reference, "as is", when the two sides'
 *   shapes do not line up index-for-index - see updatePlayerStats.ts) never passed through createCoreItem at
 *   all, so it has no id (or parentItem, or has map) whatsoever.
 * - A collision (the id is already registered to a *different* item within this same root): a generic "build
 *   one item, then replicate it N times" helper (si-funciona's buildArray, cloning rather than constructing
 *   fresh - the shape matrix-dom's own buildMatrix uses for a grid's rows/columns/tiles) copies whatever id
 *   the one template already carries into every copy right along with everything else, with no way for
 *   json-dom to know that happened before registration.
 *
 * Catching both here, at the one real choke point every attached item passes through, protects against these
 * patterns (and any other generic cloning or raw merging this codebase does not yet know about) without
 * needing every consumer to avoid them. A real reuse of someone else's id (rather than two different items
 * both starting unassigned) is not realistically distinguishable from the collision case, so the same repair
 * applies regardless of cause - the alternative (leaving it in place) silently breaks resolution for one of
 * the two items, which is worse than quietly handing the second one a fresh id.
 * @param item - The subtree to register, root item included.
 */
const registerItemIds = item => {
  const root = tryGetRoot(item);
  if (!root) {
    return;
  }
  const alreadyThere = typeof item.id === 'number' ? itemsById.get(root, item.id) : undefined;
  if (typeof item.id !== 'number' || alreadyThere && alreadyThere !== item) {
    item.id = (0, exports.generateItemId)();
  }
  itemsById.set(root, item.id, item);
  (item.children || []).forEach(exports.registerItemIds);
};
exports.registerItemIds = registerItemIds;
/**
 * Remove an item (and, recursively, its whole subtree) from its own root's id index - the reverse of
 * registerItemIds. Call before the item is actually detached, while its parentItem chain still resolves and
 * its own subtree is still intact to walk.
 * @param item - The subtree to unregister, root item included.
 */
const unregisterItemIds = item => {
  const root = tryGetRoot(item);
  if (!root) {
    return;
  }
  itemsById.delete(root, item.id);
  (item.children || []).forEach(exports.unregisterItemIds);
};
exports.unregisterItemIds = unregisterItemIds;
/**
 * Resolve an id (as captured off a DomItem's own id) back to the item it refers to, within root's own tree.
 * Throws when the id isn't registered against this root - the same "stale reference" contract getItemByPath
 * already has: a silent wrong-answer resolution is worse than a loud failure.
 * @param root - The tree to resolve the id against.
 * @param id - The id to resolve, as read directly off a DomItem's own id property.
 */
const getItemById = (root, id) => {
  const item = itemsById.get(root, id);
  if (!item) {
    throw new Error(`No item with id ${id} in this tree - it may have been removed, or never belonged to it.`);
  }
  return item;
};
exports.getItemById = getItemById;
},{"collect-your-stuff":59,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"si-funciona":419}],294:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const itemIdIndex_1 = require("./itemIdIndex");
/**
 * Reverse of appendHtml, remove a DomItem and have the associated element removed.
 * @param parent - The parent of the items
 * @param child - The DomItem with HTMLElement to be removed
 */
const removeChild = (parent, child) => {
  // Before detaching: child's own parentItem chain (still pointing at parent) is what resolves its root.
  (0, itemIdIndex_1.unregisterItemIds)(child);
  parent.element.removeChild(child.element);
  return parent.children.splice(parent.children.indexOf(child), 1);
};
exports.default = removeChild;
},{"./itemIdIndex":293}],295:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * For each child of this item, set the parentItem references.
 * @param item - The DomItem to have parent references applied.
 */
const setParentItemReferences = item => {
  if (!item.children || !item.children.length) {
    item.children = [];
    return item;
  }
  item.children.forEach(child => {
    child.parentItem = item;
    setParentItemReferences(child);
  });
  return item;
};
exports.default = setParentItemReferences;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],296:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const getTopParentItem_1 = __importDefault(require("../../domItem/tree/getTopParentItem"));
const makeEventHandler_1 = __importDefault(require("./makeEventHandler"));
const createEventResponder_1 = __importDefault(require("../objects/createEventResponder"));
const getListenerOptions_1 = __importDefault(require("../objects/options/getListenerOptions"));
const optionsToNumber_1 = __importDefault(require("../objects/options/optionsToNumber"));
const retrieveListener_1 = __importDefault(require("./retrieveListener"));
/**
 * Activate listener by pushing it to activeListeners.
 * @param eventName
 * @param eventListener
 * @param item
 */
const activateListener = (eventName, eventListener, item) => {
  const listenerOptions = (0, getListenerOptions_1.default)();
  if (typeof item.activeListeners === 'undefined') {
    item.activeListeners = {};
  }
  if (!(eventName in item.activeListeners)) {
    item.activeListeners[eventName] = {};
  }
  const optionIdentifier = (0, optionsToNumber_1.default)(listenerOptions, eventListener.listenerOptions);
  if (!(optionIdentifier in item.activeListeners[eventName])) {
    item.activeListeners[eventName][optionIdentifier] = [];
  }
  const listenerFunc = (0, retrieveListener_1.default)(eventListener.listenerFunc, (0, getTopParentItem_1.default)(item));
  const eventHandler = (0, makeEventHandler_1.default)(listenerFunc, item, eventListener.listenerArgs);
  const eventResponder = (0, createEventResponder_1.default)(eventHandler, !!(optionIdentifier & listenerOptions.signal));
  item.activeListeners[eventName][optionIdentifier].push(eventResponder);
  eventListener.activeResponder = eventResponder;
  return item;
};
exports.default = activateListener;
},{"../../domItem/tree/getTopParentItem":291,"../objects/createEventResponder":322,"../objects/options/getListenerOptions":324,"../objects/options/optionsToNumber":326,"./makeEventHandler":309,"./retrieveListener":315}],297:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createEventListener_1 = __importDefault(require("../objects/createEventListener"));
/**
 * Create an EventListener descriptor and push it onto a DomItem's eventListeners for the given event name.
 * Does not attach anything to the real element - see {@link bindListeners} or {@link fullAddEventListener} for that.
 *
 * item is the last parameter (instead of customArgs/options having literal defaults) so this can be curried and
 * piped directly - see {@link fullAddEventListener} for an example.
 *
 * Prefer calling this through {@link fullAddEventListener} with a registered name (see {@link registerListener}).
 * Passing a raw function directly here works, but logs a console warning - see {@link EventListener}'s
 * listenerFunc property for what that discretionary path gives up.
 * @param eventName - The name of the trigger event (e.g. 'click').
 * @param listenerFunction - Preferably a name registered via
 * {@link registerListener}; a raw listener function is also accepted, at the caller's discretion.
 * @param customArgs - Additional args passed through to the listener when called.
 * @param options - Options to be used when the listener is attached
 * to the element.
 * @param item - The DomItem which will receive the event listener.
 * @returns The same DomItem, with the new EventListener descriptor appended.
 */
const addEventListener = (eventName, listenerFunction, customArgs, options, item) => {
  customArgs = customArgs ?? null;
  options = options ?? false;
  if (typeof listenerFunction === 'function') {
    console.warn(`addEventListener: attaching a raw function directly for "${eventName}" instead of a name registered via ` + 'registerListener. This works, but the listener will not be discoverable via eventActions, cannot be ' + 'shared by name across DomItems, and will be silently dropped by domItemToJson (JSON.stringify omits ' + 'function values). Prefer fullAddEventListener with a name unless this one-off behavior is intentional.');
  }
  if (typeof item.eventListeners === 'undefined') {
    item.eventListeners = {};
  }
  if (typeof item.eventListeners[eventName] === 'undefined') {
    item.eventListeners[eventName] = [];
  }
  // check if the listener already exists and don't add if it does
  item.eventListeners[eventName].push((0, createEventListener_1.default)({
    listenerFunc: listenerFunction,
    listenerArgs: customArgs,
    listenerOptions: options
  }));
  return item;
};
exports.default = addEventListener;
},{"../objects/createEventListener":320}],298:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getListenerOptions_1 = __importDefault(require("../objects/options/getListenerOptions"));
const numberToOptions_1 = __importDefault(require("../objects/options/numberToOptions"));
const assignListener_1 = __importDefault(require("./assignListener"));
const createEventProxy_1 = __importDefault(require("../objects/createEventProxy"));
/**
 * Apply each active event listener for event type to the DOM Item's element.
 * @param eventName
 * @param item
 */
const applyActiveListeners = (eventName, item) => {
  const listenerOptions = (0, getListenerOptions_1.default)();
  const eventOptions = si_funciona_1.default.dotGet(item, `activeListeners.${eventName}`);
  if (eventOptions === null) {
    return item;
  }
  si_funciona_1.default.objectKeys(eventOptions).forEach(binaryOptions => {
    const optionsToUse = (0, numberToOptions_1.default)(listenerOptions, parseInt(binaryOptions));
    const usesSignal = !!optionsToUse.signal;
    if (!usesSignal) {
      // Abort signal must be undefined if it is not required.
      delete optionsToUse.signal;
    }
    ;
    item.activeListeners[eventName][Number(binaryOptions)].forEach(eventResponder => {
      if (eventResponder.assignedHandler) {
        // already attached to the element
        return;
      }
      const finalOptions = usesSignal ? Object.assign({}, optionsToUse, {
        signal: eventResponder.abort.signal
      }) : optionsToUse;
      eventResponder.assignedHandler = e => eventResponder.handler((0, createEventProxy_1.default)(e, item));
      (0, assignListener_1.default)(eventName, item.element, eventResponder.assignedHandler, finalOptions);
    });
  });
  return item;
};
exports.default = applyActiveListeners;
},{"../objects/createEventProxy":321,"../objects/options/getListenerOptions":324,"../objects/options/numberToOptions":325,"./assignListener":299,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"si-funciona":419}],299:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const listenerOptions_1 = __importDefault(require("./listenerOptions"));
/**
 * Provide compatibility for assigning listeners.
 * @param trigger - The name of the event which will trigger the listenerFunction on the element. (keyof HTMLElementEventMap)
 * @param elem - An element to append the listener onto
 * @param fn - The function which will be invoked when the
 * event is triggered
 * @param options - Additional options to how the event will be
 * fired
 */
const assignListener = (trigger, elem, fn, options = false) => {
  // Attaching a listener may be done differently based on the browser support
  if (elem.addEventListener) {
    // Latest support is provided from addEventListener with the options parameter varying slightly
    elem.addEventListener(trigger, fn, (0, listenerOptions_1.default)(options));
  } else if (elem.attachEvent) {
    // Older browsers, especially Internet Explorer
    elem.attachEvent(`on${trigger}`, fn);
  } else {
    // General support for adding a new function onto the element which can be called to trigger the function
    ;
    elem[`on${trigger}`] = fn;
  }
  return fn;
};
exports.default = assignListener;
},{"./listenerOptions":308}],300:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const bindListeners_1 = __importDefault(require("./bindListeners"));
/**
 * Based on the eventListeners property of the provided item, bind the listeners to the associated element property
 * for each item in the domEvents.DomItem structure.
 * WARNING: This is a recursive function.
 * @param item - The DomItem with an associated HTMLElement to have a listener
 * assigned
 */
const bindAllListeners = item => {
  for (const child of item.children) {
    bindAllListeners(child);
  }
  return (0, bindListeners_1.default)(item);
};
exports.default = bindAllListeners;
},{"./bindListeners":302}],301:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const activateListener_1 = __importDefault(require("./activateListener"));
const applyActiveListeners_1 = __importDefault(require("./applyActiveListeners"));
/**
 * Receive a DomItem with eventListeners and apply the event listeners onto the Dom element.
 * @param item - The DomItem which has eventListeners to apply to its element
 */
const bindElementListeners = item => {
  for (const eventName in item.eventListeners) {
    const listeners = item.eventListeners[eventName];
    listeners.forEach(eventAttributes => {
      if (eventAttributes.listenerActive) {
        return;
      }
      item = (0, activateListener_1.default)(eventName, eventAttributes, item);
      eventAttributes.listenerActive = true;
    });
    item = (0, applyActiveListeners_1.default)(eventName, item);
  }
  return item;
};
exports.default = bindElementListeners;
},{"./activateListener":296,"./applyActiveListeners":298,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],302:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const bindElementListeners_1 = __importDefault(require("./bindElementListeners"));
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Based on the eventListeners property of the provided item, bind the
 * listeners to the associated element property for the provided domEvents.DomItem.
 * @param item - The DomItem which may have eventListeners to apply to its
 * element
 */
const bindListeners = item => !si_funciona_1.default.emptyObject(item.eventListeners) && item.element ? (0, bindElementListeners_1.default)(item) : item;
exports.default = bindListeners;
},{"./bindElementListeners":301,"si-funciona":419}],303:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getListenerOptions_1 = __importDefault(require("../objects/options/getListenerOptions"));
const optionsToNumber_1 = __importDefault(require("../objects/options/optionsToNumber"));
const numberToOptions_1 = __importDefault(require("../objects/options/numberToOptions"));
const unassignListener_1 = __importDefault(require("./unassignListener"));
/**
 * Deactivate a single listener: detach it from the element (if it was actually attached) and remove it from
 * activeListeners, without disturbing any other listener sharing the same options bucket.
 * @param eventName - The name of the trigger event the listener was activated under.
 * @param eventListener - The EventListener descriptor to deactivate, as found via
 * {@link findEventListener} or returned from {@link activateListener}.
 * @param item - The DomItem the listener is attached to.
 * @returns The same DomItem, with this listener detached and marked inactive.
 */
const deactivateListener = (eventName, eventListener, item) => {
  const eventOptions = si_funciona_1.default.dotGet(item, `activeListeners.${eventName}`);
  if (eventOptions === null || !eventListener.activeResponder) {
    return item;
  }
  const listenerOptions = (0, getListenerOptions_1.default)();
  const optionIdentifier = (0, optionsToNumber_1.default)(listenerOptions, eventListener.listenerOptions);
  const active = item.activeListeners;
  const bucket = active[eventName][optionIdentifier];
  if (!bucket) {
    return item;
  }
  if (eventListener.activeResponder.assignedHandler) {
    const optionsToUse = (0, numberToOptions_1.default)(listenerOptions, optionIdentifier);
    const finalOptions = optionsToUse.signal ? Object.assign({}, optionsToUse, {
      signal: eventListener.activeResponder.abort.signal
    }) : (delete optionsToUse.signal, optionsToUse);
    (0, unassignListener_1.default)(eventName, item.element, eventListener.activeResponder.assignedHandler, finalOptions);
  }
  const responderIndex = bucket.indexOf(eventListener.activeResponder);
  if (responderIndex > -1) {
    bucket.splice(responderIndex, 1);
  }
  if (bucket.length === 0) {
    delete active[eventName][optionIdentifier];
  }
  eventListener.activeResponder = null;
  eventListener.listenerActive = false;
  return item;
};
exports.default = deactivateListener;
},{"../objects/options/getListenerOptions":324,"../objects/options/numberToOptions":325,"../objects/options/optionsToNumber":326,"./unassignListener":318,"si-funciona":419}],304:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Set all the listeners for this DOMItem to be inactive.
 * @param item - The DomItem which will have its eventListeners updated.
 */
const deactivateListeners = item => {
  for (const eventName in item.eventListeners) {
    item.eventListeners[eventName].forEach(eventListener => {
      eventListener.listenerActive = false;
    });
  }
  delete item.activeListeners;
  return item;
};
exports.default = deactivateListeners;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],305:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getListenerOptions_1 = __importDefault(require("../objects/options/getListenerOptions"));
const optionsToNumber_1 = __importDefault(require("../objects/options/optionsToNumber"));
/**
 * Whether the options ask for the capture phase.
 * @private
 */
const capturing = options => {
  const template = (0, getListenerOptions_1.default)();
  return ((0, optionsToNumber_1.default)(template, options) & template.capture) !== 0;
};
/**
 * Search a DOM item's eventListeners for a specific event listener, matched by listener function, custom args, and
 * whether it listens in the capture phase. Returns its index and the matching descriptor as a tuple.
 *
 * As with the DOM's removeEventListener, only the capture flag tells two listeners of the same function apart: once,
 * passive and signal only change how a listener behaves, not which listener it is.
 *
 * item is the last parameter (instead of customArgs/options having literal defaults) so this can be curried and
 * piped directly - see {@link fullAddEventListener} for an example of the pattern.
 * @param eventName - The name of the trigger event the listener was registered under.
 * @param listenerFunction - The listener function to match against.
 * @param customArgs - The custom args the listener was registered with.
 * @param options - The options the listener was registered with; only
 * the capture flag is compared.
 * @param item - The DomItem whose eventListeners will be searched.
 * @returns A 2-element [index, matchingListener] tuple. If no match is
 * found, index is -1 and matchingListener is undefined.
 */
const findEventListener = (eventName, listenerFunction, customArgs, options, item) => {
  customArgs = customArgs ?? null;
  if (!si_funciona_1.default.isObject(item.eventListeners)) {
    return [-1, undefined];
  }
  if (typeof item.eventListeners[eventName] === 'undefined') {
    return [-1, undefined];
  }
  const findListener = {
    listenerFunc: listenerFunction,
    listenerArgs: si_funciona_1.default.describeObject(customArgs)
  };
  const listenerIndex = item.eventListeners[eventName].findIndex(eventListener => {
    const argDescriptor = si_funciona_1.default.describeObject(eventListener.listenerArgs);
    return eventListener.listenerFunc === findListener.listenerFunc && si_funciona_1.default.sameDescriptor(findListener.listenerArgs, argDescriptor) && capturing(eventListener.listenerOptions) === capturing(options);
  });
  return [listenerIndex, item.eventListeners[eventName][listenerIndex]];
};
exports.default = findEventListener;
},{"../objects/options/getListenerOptions":324,"../objects/options/optionsToNumber":326,"si-funciona":419}],306:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const curry_1 = __importDefault(require("si-funciona/dist/helpers/functions/curry"));
const pipe_1 = __importDefault(require("si-funciona/dist/helpers/functions/pipe"));
const getTopParentItem_1 = __importDefault(require("../../domItem/tree/getTopParentItem"));
const registerListener_1 = __importDefault(require("./registerListener"));
const addEventListener_1 = __importDefault(require("./addEventListener"));
const bindListeners_1 = __importDefault(require("./bindListeners"));
/**
 * Register the listener function, attach it as a descriptor on the item, then bind it onto the
 * real element - the full setup sequence for a single event listener, in order:
 * 1. {@link registerListener} - store the real function in the root DomItem's eventActions, keyed by name.
 * 2. {@link addEventListener} - push an EventListener descriptor referencing that name onto item.eventListeners.
 * 3. {@link bindListeners} - activate and apply any unbound descriptors, attaching them to item.element.
 *
 * item is the last parameter (instead of name/customArgs/options having literal defaults) so addEventListener can
 * be curried directly into the pipe below without an argument-reordering wrapper.
 * @param eventName - The name of the trigger event (e.g. 'click').
 * @param listener - The function to be called when the event is triggered.
 * @param name - The name the listener will be registered under in eventActions.
 * @param customArgs - Additional args passed through to the listener when called.
 * @param options - Options to be used when the listener is attached to the element.
 * @param item - The DomItem which will receive the event listener.
 */
const fullAddEventListener = (eventName, listener, name, customArgs, options, item) => {
  const listenerName = name ?? listener.name;
  customArgs = customArgs ?? null;
  options = options ?? false;
  return (0, pipe_1.default)(currentItem => {
    (0, registerListener_1.default)(listener, listenerName, (0, getTopParentItem_1.default)(currentItem));
    return currentItem;
  }, (0, curry_1.default)(addEventListener_1.default)(eventName, listenerName, customArgs, options), bindListeners_1.default)(item);
};
exports.default = fullAddEventListener;
},{"../../domItem/tree/getTopParentItem":291,"./addEventListener":297,"./bindListeners":302,"./registerListener":312,"si-funciona/dist/helpers/functions/curry":364,"si-funciona/dist/helpers/functions/pipe":368}],307:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const removeEventListener_1 = __importDefault(require("./removeEventListener"));
/**
 * Find and remove a listener that was registered by name (e.g. via {@link fullAddEventListener}) - the counterpart
 * to fullAddEventListener. Resolves name the same way fullAddEventListener defaults it, so a caller only needs the
 * original listener function (not the internal name string it was registered under) to remove it:
 * 1. Resolve name (defaults to listener.name, same as {@link fullAddEventListener}).
 * 2. {@link removeEventListener} - find the descriptor by that name, detach it from the element if active, and
 *    splice it out of item.eventListeners.
 *
 * Does not remove the function from the root DomItem's eventActions registry, since that name may still be shared
 * by other DomItems - see {@link registerListener}.
 * @param eventName - The name of the trigger event (e.g. 'click').
 * @param listener - The same function originally passed to fullAddEventListener.
 * @param name - The name the listener was registered under in eventActions.
 * @param customArgs - The custom args the listener was registered with.
 * @param options - The options the listener was registered with.
 * @param item - The DomItem to remove the listener from.
 * @returns The same DomItem, with the matching listener removed if one was found.
 */
const fullRemoveEventListener = (eventName, listener, name, customArgs, options, item) => {
  const listenerName = name ?? listener.name;
  return (0, removeEventListener_1.default)(eventName, listenerName, customArgs, options, item);
};
exports.default = fullRemoveEventListener;
},{"./removeEventListener":314}],308:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Provide compatibility for using the options parameter of addEventListener
 * @param options - An object or boolean with the listener options
 */
const listenerOptions = options => {
  if (typeof listenerOptions.supportsOptions === 'undefined') {
    // Check if supportsOptions has been defined. This is a compatibility checking flag.
    listenerOptions.supportsOptions = true;
    try {
      // If it is possible to use OptionsObject, then set our flag to true
      window.addEventListener('test', null, {
        capture: false,
        once: false,
        passive: false
      });
    } catch (err) {
      // When using an OptionsObjects fails, it is only possible to pass the boolean UseCapture as the option
      listenerOptions.supportsOptions = false;
    }
  }
  return typeof options === 'object' && listenerOptions.supportsOptions ? options : false;
};
exports.default = listenerOptions;
},{}],309:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Prepare a listener to be used before assigning to an element.
 * @param listener
 * @param item
 * @param args
 */
const makeEventHandler = (listener, item, ...args) => {
  return event => {
    if (!event || event.immediatePropagationStopped) {
      return event;
    }
    return listener(event, item, ...args);
  };
};
exports.default = makeEventHandler;
},{}],310:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Form-control elements whose state a listener might read directly off the event target. */
const FORM_CONTROL_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];
/**
 * Whatever live state a listener commonly reads directly off the real event's target - a checkbox's checked, an
 * input's value - captured here since the receiving end's corresponding element is otherwise an independent object
 * with no way to know what the user actually set. Omitted for anything that is not a form control (every element
 * has a non-undefined value or checked is not a safe enough check on its own - a plain button also has a value,
 * defaulting to '', and any input has checked defaulting to false even when it is not a checkbox).
 * @param target
 */
const captureTargetState = target => {
  const element = target;
  if (!element || !FORM_CONTROL_TAGS.includes(element.tagName)) {
    return undefined;
  }
  return element.type === 'checkbox' || element.type === 'radio' ? {
    checked: element.checked
  } : {
    value: element.value
  };
};
/**
 * Build the listener function used in render-only mode: instead of running real logic locally, it packages the
 * event as a plain envelope (the id of the item it fired on, the event type, the registered listener name, any
 * custom args, and any live target state - see captureTargetState) and hands it to the injected transport
 * function. See retrieveListener.
 * @param listenerName - The registered name this forwarder stands in for.
 * @param transport - Where the envelope is sent (set on the root item with setForwardEvents).
 */
const makeForwardingListener = (listenerName, transport) => (event, item, ...args) => transport({
  itemId: (event.domItemTarget ?? item).id,
  eventType: event.type,
  listenerFunc: listenerName,
  data: args,
  targetState: captureTargetState(event.target)
});
exports.default = makeForwardingListener;
},{"core-js/modules/es.array.includes.js":199}],311:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const itemIdIndex_1 = require("../../domItem/tree/itemIdIndex");
/**
 * The receiving end of makeForwardingListener's envelope: resolve the item it was built for, replay any live target
 * state it carried onto that item's real element (see captureTargetState in makeForwardingListener), then dispatch
 * a real event of the same type on it. The resolved item's own, already-bound listener runs exactly as it would for
 * a genuine local event - nothing here needs to know what that listener does.
 * @param root - The tree to resolve the envelope's itemId against. Its listeners must be the real ones (not
 * itself set up with setForwardEvents), or this would just forward the event again instead of running it.
 * @param envelope - As produced by makeForwardingListener on the sending end.
 * @param validator - Optional: when given and it returns false for the resolved item, the event is never
 * dispatched. Resolving by id is correct (it finds the right item even if this root's own tree shape differs
 * from the sender's), but not authorized on its own - a validator is the one place to plug an ownership check
 * in, instead of every caller re-deriving "resolve first, then check, then dispatch" by hand.
 */
const receiveForwardedEvent = (root, envelope, validator) => {
  const resolvedItem = (0, itemIdIndex_1.getItemById)(root, envelope.itemId);
  if (validator && !validator(resolvedItem, envelope)) {
    return;
  }
  const element = resolvedItem.element;
  if (!element) {
    throw new Error('The resolved item has no element to dispatch the event on.');
  }
  if (envelope.targetState) {
    Object.assign(element, envelope.targetState);
  }
  element.dispatchEvent(new Event(envelope.eventType, {
    bubbles: true,
    cancelable: true
  }));
};
exports.default = receiveForwardedEvent;
},{"../../domItem/tree/itemIdIndex":293}],312:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../../domItem/objects/documentItem"));
/**
 * Register a single listener function as part of the root domEvents.DomItem.
 * @param listener - Provide a function which will be called
 * when a Dom event is triggered.
 * @param name - The name of the listener to be used.
 * @param parent - The parent DomItem which is DomItemRoot which stores eventListeners property.
 */
const registerListener = (listener, name = listener.name, parent = documentItem_1.default) => Object.assign(parent.eventActions, {
  [name]: listener
});
exports.default = registerListener;
},{"../../domItem/objects/documentItem":267}],313:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const documentItem_1 = __importDefault(require("../../domItem/objects/documentItem"));
/**
 * Register multiple listeners from an array of functions.
 * @param listeners - An array of functions to be
 * used as the registered event listeners.
 * @param parent - The parent DomItem which is DomItemRoot which has eventActions property.
 */
const registerListeners = (listeners, parent = documentItem_1.default) => {
  si_funciona_1.default.mergeObjectsMutable(parent.eventActions, listeners);
  return parent;
};
exports.default = registerListeners;
},{"../../domItem/objects/documentItem":267,"si-funciona":419}],314:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const findEventListener_1 = __importDefault(require("./findEventListener"));
const deactivateListener_1 = __importDefault(require("./deactivateListener"));
/**
 * Find and remove an event listener from a DomItem: detaches it from the element first (via
 * {@link deactivateListener}) if it was active, then splices its descriptor out of eventListeners. A no-op if no
 * matching listener is found.
 *
 * item is the last parameter (instead of customArgs/options having literal defaults) so this can be curried and
 * piped directly - see {@link fullAddEventListener} for an example of the pattern.
 * @param eventName - The name of the trigger event the listener was registered under.
 * @param listenerFunction - The listener function to match against.
 * @param customArgs - The custom args the listener was registered with.
 * @param options - The options the listener was registered with.
 * @param item - The DomItem to remove the listener from.
 * @returns The same DomItem, with the matching listener removed if one was found.
 */
const removeEventListener = (eventName, listenerFunction, customArgs, options, item) => {
  const [listenerIndex, foundListener] = (0, findEventListener_1.default)(eventName, listenerFunction, customArgs, options, item);
  if (listenerIndex < 0 || typeof foundListener === 'undefined') {
    // listener not found
    return item;
  }
  if (foundListener.listenerActive === true) {
    item = (0, deactivateListener_1.default)(eventName, foundListener, item);
  }
  item.eventListeners[eventName].splice(listenerIndex, 1);
  return item;
};
exports.default = removeEventListener;
},{"./deactivateListener":303,"./findEventListener":305}],315:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../../domItem/objects/documentItem"));
const makeForwardingListener_1 = __importDefault(require("./makeForwardingListener"));
/**
 * Based on the provided function / listener name, retrieve the associated function from the root domEvents.DomItem.
 * If a raw function is passed instead of a registered name, it is returned as-is - see {@link EventListener}'s
 * listenerFunc property for the tradeoffs of that discretionary path. When the root has forwardEvents set (render-
 * only mode - see setForwardEvents), every name resolves to a forwarder instead, whether or not it is registered in
 * eventActions: see makeForwardingListener.
 * @param listenerName - The name of one of the registered listener functions, or an
 * already-resolved listener function.
 * @param parent - The parent DomItem which is DomItemRoot which stores eventListeners property.
 */
const retrieveListener = (listenerName, parent = documentItem_1.default) => {
  if (typeof listenerName === 'function') {
    return listenerName;
  }
  if (parent.forwardEvents) {
    return (0, makeForwardingListener_1.default)(listenerName, parent.forwardEvents);
  }
  if (!Object.keys(parent.eventActions).includes(listenerName)) {
    throw new Error(`Undefined listener function on this DomItemRoot: ${listenerName}`);
  }
  return parent.eventActions[listenerName];
};
exports.default = retrieveListener;
},{"../../domItem/objects/documentItem":267,"./makeForwardingListener":310,"core-js/modules/es.array.includes.js":199}],316:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const getListenerOptions_1 = __importDefault(require("../objects/options/getListenerOptions"));
const numberToOptions_1 = __importDefault(require("../objects/options/numberToOptions"));
const unassignListener_1 = __importDefault(require("./unassignListener"));
/**
 * Detach every active listener for one event type from a DomItem's element, regardless of which EventListener
 * descriptor each one belongs to, and clear that event's activeListeners bucket. Unlike {@link deactivateListener},
 * this does not update the listenerActive/activeResponder state on the individual descriptors.
 * @param eventName - The name of the trigger event whose active listeners will be revoked.
 * @param item - The DomItem to revoke active listeners from.
 * @returns The same DomItem, with all active listeners for this event detached.
 */
const revokeActiveListeners = (eventName, item) => {
  const listenerOptions = (0, getListenerOptions_1.default)();
  const eventOptions = si_funciona_1.default.dotGet(item, `activeListeners.${eventName}`);
  if (eventOptions === null) {
    return item;
  }
  si_funciona_1.default.objectKeys(eventOptions).forEach(binaryOptions => {
    const optionsToUse = (0, numberToOptions_1.default)(listenerOptions, parseInt(binaryOptions));
    const usesSignal = !!optionsToUse.signal;
    if (!usesSignal) {
      // Abort signal must be undefined if it is not required.
      delete optionsToUse.signal;
    }
    ;
    item.activeListeners[eventName][Number(binaryOptions)].forEach(eventResponder => {
      if (!eventResponder.assignedHandler) {
        // never actually attached to the element, nothing to detach
        return;
      }
      const finalOptions = usesSignal ? Object.assign({}, optionsToUse, {
        signal: eventResponder.abort.signal
      }) : optionsToUse;
      (0, unassignListener_1.default)(eventName, item.element, eventResponder.assignedHandler, finalOptions);
    });
  });
  delete item.activeListeners[eventName];
  return item;
};
exports.default = revokeActiveListeners;
},{"../objects/options/getListenerOptions":324,"../objects/options/numberToOptions":325,"./unassignListener":318,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"si-funciona":419}],317:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../../domItem/objects/documentItem"));
/**
 * Switch the root item into render-only mode: every registered listener name resolves to a forwarder instead of a
 * local function (see retrieveListener, makeForwardingListener), so no local listener functions need to be
 * registered at all.
 * @param transport - Called with the envelope of each forwarded event.
 * @param parent - The parent DomItem which is DomItemRoot to switch into render-only mode.
 */
const setForwardEvents = (transport, parent = documentItem_1.default) => {
  parent.forwardEvents = transport;
  return parent;
};
exports.default = setForwardEvents;
},{"../../domItem/objects/documentItem":267}],318:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const listenerOptions_1 = __importDefault(require("./listenerOptions"));
/**
 * Provide compatibility for unassigning listeners.
 * @param trigger - The name of the event which will trigger the listenerFunction on the element. (keyof HTMLElementEventMap)
 * @param elem - An element to append the listener onto
 * @param fn - The function which will be invoked when the
 * event is triggered
 * @param options - Additional options to how the event will be
 * fired
 */
const unassignListener = (trigger, elem, fn, options = false) => {
  // Removing a listener may be done differently based on the browser support
  if (elem.removeEventListener) {
    // Latest support is provided from removeEventListener with the options parameter varying slightly
    elem.removeEventListener(trigger, fn, (0, listenerOptions_1.default)(options));
  }
  return fn;
};
exports.default = unassignListener;
},{"./listenerOptions":308}],319:[function(require,module,exports){
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
 * Setting up and handling events for items in a Virtual DOM (DomItem tree)
 */
const activateListener_1 = __importDefault(require("./functions/activateListener"));
const addEventListener_1 = __importDefault(require("./functions/addEventListener"));
const applyActiveListeners_1 = __importDefault(require("./functions/applyActiveListeners"));
const assignListener_1 = __importDefault(require("./functions/assignListener"));
const bindAllListeners_1 = __importDefault(require("./functions/bindAllListeners"));
const bindElementListeners_1 = __importDefault(require("./functions/bindElementListeners"));
const bindListeners_1 = __importDefault(require("./functions/bindListeners"));
const deactivateListener_1 = __importDefault(require("./functions/deactivateListener"));
const deactivateListeners_1 = __importDefault(require("./functions/deactivateListeners"));
const findEventListener_1 = __importDefault(require("./functions/findEventListener"));
const fullAddEventListener_1 = __importDefault(require("./functions/fullAddEventListener"));
const fullRemoveEventListener_1 = __importDefault(require("./functions/fullRemoveEventListener"));
const listenerOptions_1 = __importDefault(require("./functions/listenerOptions"));
const makeEventHandler_1 = __importDefault(require("./functions/makeEventHandler"));
const makeForwardingListener_1 = __importDefault(require("./functions/makeForwardingListener"));
const receiveForwardedEvent_1 = __importDefault(require("./functions/receiveForwardedEvent"));
const registerListener_1 = __importDefault(require("./functions/registerListener"));
const registerListeners_1 = __importDefault(require("./functions/registerListeners"));
const removeEventListener_1 = __importDefault(require("./functions/removeEventListener"));
const retrieveListener_1 = __importDefault(require("./functions/retrieveListener"));
const revokeActiveListeners_1 = __importDefault(require("./functions/revokeActiveListeners"));
const setForwardEvents_1 = __importDefault(require("./functions/setForwardEvents"));
const unassignListener_1 = __importDefault(require("./functions/unassignListener"));
const createEventListener_1 = __importDefault(require("./objects/createEventListener"));
const createEventProxy_1 = __importDefault(require("./objects/createEventProxy"));
const createEventResponder_1 = __importDefault(require("./objects/createEventResponder"));
const options_1 = __importDefault(require("./objects/options"));
exports.default = {
  activateListener: activateListener_1.default,
  addEventListener: addEventListener_1.default,
  applyActiveListeners: applyActiveListeners_1.default,
  assignListener: assignListener_1.default,
  bindAllListeners: bindAllListeners_1.default,
  bindElementListeners: bindElementListeners_1.default,
  bindListeners: bindListeners_1.default,
  deactivateListener: deactivateListener_1.default,
  deactivateListeners: deactivateListeners_1.default,
  findEventListener: findEventListener_1.default,
  fullAddEventListener: fullAddEventListener_1.default,
  fullRemoveEventListener: fullRemoveEventListener_1.default,
  listenerOptions: listenerOptions_1.default,
  makeEventHandler: makeEventHandler_1.default,
  makeForwardingListener: makeForwardingListener_1.default,
  receiveForwardedEvent: receiveForwardedEvent_1.default,
  registerListener: registerListener_1.default,
  registerListeners: registerListeners_1.default,
  removeEventListener: removeEventListener_1.default,
  retrieveListener: retrieveListener_1.default,
  revokeActiveListeners: revokeActiveListeners_1.default,
  setForwardEvents: setForwardEvents_1.default,
  unassignListener: unassignListener_1.default,
  createEventListener: createEventListener_1.default,
  createEventProxy: createEventProxy_1.default,
  createEventResponder: createEventResponder_1.default,
  options: options_1.default
};
},{"./functions/activateListener":296,"./functions/addEventListener":297,"./functions/applyActiveListeners":298,"./functions/assignListener":299,"./functions/bindAllListeners":300,"./functions/bindElementListeners":301,"./functions/bindListeners":302,"./functions/deactivateListener":303,"./functions/deactivateListeners":304,"./functions/findEventListener":305,"./functions/fullAddEventListener":306,"./functions/fullRemoveEventListener":307,"./functions/listenerOptions":308,"./functions/makeEventHandler":309,"./functions/makeForwardingListener":310,"./functions/receiveForwardedEvent":311,"./functions/registerListener":312,"./functions/registerListeners":313,"./functions/removeEventListener":314,"./functions/retrieveListener":315,"./functions/revokeActiveListeners":316,"./functions/setForwardEvents":317,"./functions/unassignListener":318,"./objects/createEventListener":320,"./objects/createEventProxy":321,"./objects/createEventResponder":322,"./objects/options":323}],320:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Prepare an eventListener object to attach to a DOMItem
 * @param listenerProperties
 * @param listenerProperties.listenerFunc - The function or name (string) of the listener
 * action - see {@link EventListener}'s listenerFunc property for when to use which.
 * @param listenerProperties.listenerArgs - Additional parameters to apply to the function
 * @param listenerProperties.listenerOptions - The listener options to apply to the element
 * @param listenerProperties.listenerActive - Flag for listener applied to element
 * @returns An EventListener descriptor ready to be pushed onto a DomItem's eventListeners
 */
const createEventListener = ({
  listenerFunc,
  listenerArgs = null,
  listenerOptions = false,
  listenerActive = false
} = {}) => ({
  listenerFunc: listenerFunc,
  listenerArgs,
  listenerOptions,
  listenerActive
});
exports.default = createEventListener;
},{}],321:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const getItemByElement_1 = __importDefault(require("../../domItem/query/getItemByElement"));
/**
 * Return a modified version of the event: adds domItemTarget and currentDomItemTarget, next to the real DOM's own
 * target and currentTarget.
 * @param event
 * @param item - The DomItem the listener is attached to (this event's currentTarget).
 */
const createEventProxy = (event, item) => new Proxy(Object.defineProperties(event, {
  immediatePropagationStopped: {
    enumerable: true,
    value: false,
    writable: true
  },
  currentDomItemTarget: {
    enumerable: true,
    value: item,
    writable: true
  },
  domItemTarget: {
    enumerable: true,
    value: (0, getItemByElement_1.default)(item, event.target),
    writable: true
  }
}), {
  get(thisEvent, prop) {
    if (prop === 'stopImmediatePropagation') {
      thisEvent.immediatePropagationStopped = true;
    }
    // Read from the event itself rather than the proxy: Event's methods and accessors rely on internal slots
    // (private fields since Node 24), which throw when `this` is the proxy.
    const value = Reflect.get(thisEvent, prop);
    return typeof value === 'function' && prop !== 'constructor' ? value.bind(thisEvent) : value;
  }
});
exports.default = createEventProxy;
},{"../../domItem/query/getItemByElement":275}],322:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Store the handler function and associated abort controller instance if available to be used when events are triggered.
 * @param eventHandler - The eventHandler wrapped function to be called for the event.
 * @param abort - Assign an AbortSignal provided or create one (if true), otherwise null.
 */
const createEventResponder = (eventHandler, abort = null) => {
  if (abort === true) {
    abort = new AbortController();
  }
  if (abort === false) {
    abort = null;
  }
  return Object.assign({}, {
    handler: eventHandler,
    abort,
    assignedHandler: null
  });
};
exports.default = createEventResponder;
},{}],323:[function(require,module,exports){
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
 * Be able to use Flags (Options) in a well-formed way.
 */
const getListenerOptions_1 = __importDefault(require("./options/getListenerOptions"));
const numberToOptions_1 = __importDefault(require("./options/numberToOptions"));
const optionsToNumber_1 = __importDefault(require("./options/optionsToNumber"));
exports.default = {
  getListenerOptions: getListenerOptions_1.default,
  numberToOptions: numberToOptions_1.default,
  optionsToNumber: optionsToNumber_1.default
};
},{"./options/getListenerOptions":324,"./options/numberToOptions":325,"./options/optionsToNumber":326}],324:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const CAPTURE = 1;
const ONCE = 2;
const PASSIVE = 4;
const SIGNAL = 8;
/**
 * Retrieve the OptionsTemplate for EventListenerOptions.
 */
const getListenerOptions = () => ({
  capture: CAPTURE,
  once: ONCE,
  passive: PASSIVE,
  signal: SIGNAL
});
exports.default = getListenerOptions;
},{}],325:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Take an integer representation of the listener options and convert them to the listener options object.
 * @param optionsTemplate
 * @param binaryOptions
 */
const numberToOptions = (optionsTemplate, binaryOptions) => si_funciona_1.default.mapObject(optionsTemplate, flag => !!(binaryOptions & flag));
exports.default = numberToOptions;
},{"si-funciona":419}],326:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
/**
 * Take the given options and convert them (using binary) to an integer. Given listener options, each one is assigned a
 * bitwise position. The resulting binary number represents any possible combination of the available flags set.
 * @param optionsTemplate
 * @param listenerOptions
 */
const optionsToNumber = (optionsTemplate, listenerOptions) => {
  if (!listenerOptions) {
    return 0;
  }
  return si_funciona_1.default.reduceObject(optionsTemplate, (binaryOptions, flag, name) => listenerOptions[name] ? binaryOptions | flag : binaryOptions, 0);
};
exports.default = optionsToNumber;
},{"si-funciona":419}],327:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const jsonToDomItem_1 = __importDefault(require("./jsonToDomItem"));
exports.default = {
  jsonToDomItem: jsonToDomItem_1.default
};
},{"./jsonToDomItem":328}],328:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const setParentItemReferences_1 = __importDefault(require("../domItem/tree/setParentItemReferences"));
const addDomItemProperties_1 = __importDefault(require("../domItem/objects/addDomItemProperties"));
/**
 * Convert DOM Item to JSON string.
 * @param jsonString
 */
const jsonToDomItem = jsonString => {
  const parsedJson = (0, setParentItemReferences_1.default)((0, addDomItemProperties_1.default)(JSON.parse(jsonString)));
  if (parsedJson.nodeName === '#document') {
    const root = parsedJson;
    root.element = document;
    root.head = root.children[0];
    root.body = root.children[1];
  }
  return parsedJson;
};
exports.default = jsonToDomItem;
},{"../domItem/objects/addDomItemProperties":263,"../domItem/tree/setParentItemReferences":295}],329:[function(require,module,exports){
"use strict";

/**
 * All of the JSON DOM system functions for building and syncing a Virtual DOM (DomItem tree) to the real HTML DOM.
 */
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
const index_1 = __importDefault(require("./events/index"));
const index_2 = __importDefault(require("./domItem/index"));
const index_3 = __importDefault(require("./inflate/index"));
const index_4 = __importDefault(require("./deflate/index"));
const index_5 = __importDefault(require("./render/index"));
const index_6 = __importDefault(require("./sync/index"));
const index_7 = __importDefault(require("./diff/index"));
const jsonDom = Object.assign({}, index_1.default, index_2.default, index_3.default, index_4.default, index_5.default, index_6.default, index_7.default);
module.exports = jsonDom;
},{"./deflate/index":253,"./diff/index":261,"./domItem/index":262,"./events/index":319,"./inflate/index":327,"./render/index":331,"./sync/index":336}],330:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const updateElement_1 = __importDefault(require("./updateElement"));
/**
 * Create a new DOM Node based on name and data.
 * @param nodeName
 * @param data
 */
const makeElementType = (nodeName, data = null, is) => {
  switch (nodeName) {
    case '#text':
      return document.createTextNode(data);
    case '#comment':
      return document.createComment(data);
    default:
      // A customized built-in element (<button is="fancy-button">) has to be given its name when it is created
      return is ? document.createElement(nodeName, {
        is
      }) : document.createElement(nodeName);
  }
};
/**
 * Create an HTML element based on the provided attributes and return the element as an Object.
 * @param domItem - The DomItem requiring matching HTML element property
 */
const generateElement = domItem => {
  domItem.element = makeElementType(domItem.nodeName, domItem.nodeValue, typeof domItem.attributes.is === 'string' ? domItem.attributes.is : undefined);
  return (0, updateElement_1.default)(domItem);
};
exports.default = generateElement;
},{"./updateElement":334}],331:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const generateElement_1 = __importDefault(require("./generateElement"));
const renderHtml_1 = __importDefault(require("./renderHtml"));
const updateChildNodes_1 = __importDefault(require("./updateChildNodes"));
const updateElement_1 = __importDefault(require("./updateElement"));
const updateElements_1 = __importDefault(require("./updateElements"));
exports.default = {
  generateElement: generateElement_1.default,
  renderHtml: renderHtml_1.default,
  updateChildNodes: updateChildNodes_1.default,
  updateElement: updateElement_1.default,
  updateElements: updateElements_1.default
};
},{"./generateElement":330,"./renderHtml":332,"./updateChildNodes":333,"./updateElement":334,"./updateElements":335}],332:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const documentItem_1 = __importDefault(require("../domItem/objects/documentItem"));
const insertChild_1 = __importDefault(require("../domItem/tree/insertChild"));
const itemIdIndex_1 = require("../domItem/tree/itemIdIndex");
const setParentItemReferences_1 = __importDefault(require("../domItem/tree/setParentItemReferences"));
const updateChildNodes_1 = __importDefault(require("./updateChildNodes"));
const updateElements_1 = __importDefault(require("./updateElements"));
/**
 * This is a shortcut for syncing a Virtual DOM (DomItem tree) item onto the real HTML DOM: builds the real elements
 * for it and its descendants, inserts them into parent's children (the document body by default), and binds their
 * associated listeners.
 * @param item - The DomItem that we want to render the element for
 * @param parent - Where to insert item, when it does not already have a parent - defaults to the
 * document body, so passing nothing keeps working exactly as before
 * @param index - Where in parent's children to put item - defaults to the end (a plain append), so passing nothing
 * keeps working exactly as before. To insert item among parent's already-rendered content (existing real HTML),
 * parent's children must already reflect that content first - see {@link updateDomItems}, which captures the real
 * DOM into items. Skipping that step and inserting anyway will make the next render remove the untracked content,
 * since it is invisible to parent.children.
 */
const renderHtml = (item = null, parent = documentItem_1.default.body, index = parent.children.length) => {
  const itemToRender = item === null ? documentItem_1.default : item;
  // Every descendant needs its parentItem chain in place before anything below tries to walk up it (a listener
  // being bound looks up its root via getTopParentItem) - set it first, rather than after rendering the subtree.
  (0, setParentItemReferences_1.default)(itemToRender);
  if (itemToRender.parentItem === null) {
    // excluding when documentItem was passed in, insert the item into parent, and place its real element among
    // parent's real children - scoped to just this positioning, not a resync of parent's whole existing subtree
    // (updateElements(parent) would walk every sibling's attributes too, reverting anything about them - like a
    // style change some other, unrelated script made directly on the real DOM - that parent's items don't track)
    (0, insertChild_1.default)(parent, item, index);
    (0, updateChildNodes_1.default)(parent);
  }
  // Register this subtree (root item included) in its own root's id index - unconditionally, since this is
  // correct and idempotent whichever branch above ran: a freshly-attached subtree needs it for the first time,
  // an already-attached one being re-rendered just gets its own (unchanged) entries re-set, and the document
  // root's own very first render (parentItem is {}, not null, so the branch above never runs for it) registers
  // the root's own already-built initial content. Does nothing at all when itemToRender is rendered into some
  // arbitrary, never-rooted container rather than a real DomItemRoot - see registerItemIds.
  (0, itemIdIndex_1.registerItemIds)(itemToRender);
  // Render the elements and return either to original reference, or updated documentItem (whichever is available)
  const updatedItem = (0, updateElements_1.default)(itemToRender);
  return item ?? updatedItem;
};
exports.default = renderHtml;
},{"../domItem/objects/documentItem":267,"../domItem/tree/insertChild":292,"../domItem/tree/itemIdIndex":293,"../domItem/tree/setParentItemReferences":295,"./updateChildNodes":333,"./updateElements":335}],333:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const updateElement_1 = __importDefault(require("./updateElement"));
/**
 * Update all the childNodes for this domItem element to mach domItem children.
 * @param domItem
 */
const updateChildNodes = domItem => {
  if (!domItem.element) {
    domItem = (0, updateElement_1.default)(domItem);
  }
  if (!domItem.children || !domItem.children.length) {
    domItem.children = [];
    return domItem;
  }
  const element = domItem.element;
  const previousChildNodes = Array.from(element.childNodes);
  domItem.children.map((child, index) => {
    const existing = previousChildNodes.find(childNode => childNode === child.element);
    let childNode = existing ?? child.element;
    if (!childNode) {
      childNode = (0, updateElement_1.default)(child).element;
    }
    if (!previousChildNodes[index]) {
      element.appendChild(childNode);
      return childNode;
    }
    if (childNode !== previousChildNodes[index]) {
      element.replaceChild(childNode, previousChildNodes[index]);
    }
    return childNode;
  }).forEach((childNode, index) => {
    domItem.children[index].element = childNode;
  });
  if (element.childNodes.length > domItem.children.length) {
    const maxLength = domItem.children.length;
    let nodeToRemove = element.childNodes[maxLength];
    while (nodeToRemove) {
      element.removeChild(nodeToRemove);
      nodeToRemove = element.childNodes[maxLength];
    }
  }
  return domItem;
};
exports.default = updateChildNodes;
},{"./updateElement":334,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.for-each.js":216,"core-js/modules/esnext.iterator.map.js":217}],334:[function(require,module,exports){
"use strict";

require("core-js/modules/es.array.includes.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const bindListeners_1 = __importDefault(require("../events/functions/bindListeners"));
const deactivateListeners_1 = __importDefault(require("../events/functions/deactivateListeners"));
const domItemChanges_1 = __importDefault(require("../diff/domItemChanges"));
const si_funciona_1 = __importDefault(require("si-funciona"));
const generateElement_1 = __importDefault(require("./generateElement"));
const updateChildNodes_1 = __importDefault(require("./updateChildNodes"));
/**
 * Update a single objects.DomItem element with the provided attributes / style / elementProperties.
 *
 * Safe to call standalone (not just through {@link updateElements}/{@link renderHtml}): whenever this ends up
 * (re)generating domItem.element - because it had none yet, or because nodeName changed - it also re-attaches
 * domItem's direct children onto that element via {@link updateChildNodes}, so a bare call never orphans an
 * existing child subtree. The plain attribute/style patch path below doesn't touch domItem.element itself, so it
 * doesn't need to.
 * @param domItem - The DomItem having domItem changes to be applied to its
 * element
 */
const updateElement = domItem => {
  if (!domItem.element) {
    return (0, updateChildNodes_1.default)((0, generateElement_1.default)((0, deactivateListeners_1.default)(domItem)));
  }
  const changes = (0, domItemChanges_1.default)(domItem);
  // From here on the item has an element (an element which is missing was generated above)
  const element = domItem.element;
  const properties = element;
  if (changes.removed.nodeName || changes.added.nodeName) {
    // if the nodeName has changed then remove the element and create a new one
    element.remove();
    return (0, updateChildNodes_1.default)((0, generateElement_1.default)((0, deactivateListeners_1.default)(domItem)));
  }
  for (const dotKey in changes.removed) {
    const value = changes.removed[dotKey];
    if (!dotKey.includes('.')) {
      if (dotKey in element) {
        delete properties[dotKey];
        continue;
      }
      element.removeAttribute(dotKey);
      continue;
    }
    const baseKey = si_funciona_1.default.strBefore(dotKey, '.');
    if (baseKey !== 'class' && baseKey !== 'style') {
      throw new Error('Unhandled dotKey: ' + dotKey);
    }
    if (baseKey === 'class') {
      element.classList.remove(value);
      continue;
    }
    // The key is usually already kebab-case here (domItemChanges normalizes it), but not always - see the fix
    // notes on the matching line below. kabobCase on an already-kebab string is a harmless no-op.
    element.style.removeProperty(si_funciona_1.default.kabobCase(si_funciona_1.default.strAfter(dotKey, '.')));
  }
  for (const dotKey in changes.added) {
    const value = changes.added[dotKey];
    if (dotKey === 'className') {
      element.className = value;
      continue;
    }
    if (dotKey === 'style') {
      // Update all styles based on incoming style object
      // setProperty wants CSS names (background-color), but the style object is written in camelCase (backgroundColor)
      for (const style in value) {
        element.style.setProperty(si_funciona_1.default.kabobCase(style), value[style]);
      }
      continue;
    }
    if (!dotKey.includes('.')) {
      if (dotKey in element && dotKey !== 'form') {
        // Some things can be assigned directly, but 'form' attribute cannot
        properties[dotKey] = value;
        continue;
      }
      element.setAttribute(dotKey, value);
      continue;
    }
    const baseKey = si_funciona_1.default.strBefore(dotKey, '.');
    if (baseKey !== 'class' && baseKey !== 'style') {
      throw new Error('Unhandled dotKey: ' + dotKey);
    }
    if (baseKey === 'class' && (/\s/.test(value) || !value)) {
      // Skip this empty class name
      continue;
    }
    if (baseKey === 'class') {
      element.classList.add(value);
      continue;
    }
    // domItemChanges is expected to hand this key through already kebab-cased, but a style property which was
    // already assigned on the element (changed, not newly added) can come back through as its original camelCase
    // form; CSSOM silently ignores setProperty with an invalid (camelCase) name, so the style is dropped with no
    // error. kabobCase here is a harmless no-op when the key is already kebab, and a real fix when it is not.
    element.style.setProperty(si_funciona_1.default.kabobCase(si_funciona_1.default.strAfter(dotKey, '.')), value);
  }
  return (0, bindListeners_1.default)(domItem);
};
exports.default = updateElement;
},{"../diff/domItemChanges":256,"../events/functions/bindListeners":302,"../events/functions/deactivateListeners":304,"./generateElement":330,"./updateChildNodes":333,"core-js/modules/es.array.includes.js":199,"si-funciona":419}],335:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const updateChildNodes_1 = __importDefault(require("./updateChildNodes"));
const updateElement_1 = __importDefault(require("./updateElement"));
/**
 * Generate HTML element data for each object in the matrix
 * WARNING: This is a recursive function.
 * @param config - The DomItem having child DomItems with config changes to be
 * applied
 */
const updateElements = config => {
  if (config.nodeName === '#document') {
    for (const child of config.children) {
      updateElements(child);
    }
    return config;
  }
  const domItem = (0, updateChildNodes_1.default)((0, updateElement_1.default)(config));
  domItem.children.forEach(updateElements);
  return domItem;
};
exports.default = updateElements;
},{"./updateChildNodes":333,"./updateElement":334,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],336:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const updateChildren_1 = __importDefault(require("./updateChildren"));
const updateDomItem_1 = __importDefault(require("./updateDomItem"));
const updateDomItems_1 = __importDefault(require("./updateDomItems"));
exports.default = {
  updateChildren: updateChildren_1.default,
  updateDomItem: updateDomItem_1.default,
  updateDomItems: updateDomItems_1.default
};
},{"./updateChildren":337,"./updateDomItem":338,"./updateDomItems":339}],337:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const createDomItem_1 = __importDefault(require("../domItem/objects/createDomItem"));
/**
 * Update all the children for this domItem to match the domItem element childNodes.
 * @param domItem
 */
const updateChildren = domItem => {
  if (!domItem.element) {
    domItem.children = [];
    return domItem;
  }
  const previousChildren = domItem.children;
  domItem.children = [];
  domItem.element.childNodes.forEach((childNode, index) => {
    const existing = previousChildren.find(child => child.element === childNode);
    const child = existing ?? (0, createDomItem_1.default)({
      nodeName: childNode.nodeName.toLowerCase(),
      nodeValue: childNode.nodeValue,
      element: childNode
    });
    domItem.children[index] = child;
    child.parentItem = domItem;
  });
  return domItem;
};
exports.default = updateChildren;
},{"../domItem/objects/createDomItem":265,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.for-each.js":216}],338:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const si_funciona_1 = __importDefault(require("si-funciona"));
const elementChanges_1 = __importDefault(require("../diff/elementChanges"));
/**
 * Update a single objects.DomItem element with the provided attributes / style / elementProperties
 * @param config - The DomItem having config changes to be applied to its
 * element
 */
const updateDomItem = config => {
  if (!config.element) {
    // if element is not a valid element then return the config without changes
    return config;
  }
  const changes = (0, elementChanges_1.default)(config);
  for (const dotKey in changes.removed) {
    const attributeKey = si_funciona_1.default.strAfter(dotKey, '.');
    if (si_funciona_1.default.strBefore(attributeKey, '.') === 'className') {
      const classList = config.attributes.className.split(' ');
      classList.splice(si_funciona_1.default.strAfterLast(attributeKey, '.'), 1);
      config.attributes.className = classList.join(' ');
      continue;
    }
    si_funciona_1.default.dotUnset(config, dotKey);
  }
  for (const dotKey in changes.added) {
    const attributeKey = si_funciona_1.default.strAfter(dotKey, '.');
    if (si_funciona_1.default.strBefore(attributeKey, '.') === 'className') {
      const classList = config.attributes.className.split(' ');
      classList.push(changes.added[dotKey]);
      config.attributes.className = classList.join(' ');
      continue;
    }
    si_funciona_1.default.dotSet(config, dotKey, changes.added[dotKey]);
  }
  return config;
};
exports.default = updateDomItem;
},{"../diff/elementChanges":258,"si-funciona":419}],339:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const updateChildren_1 = __importDefault(require("./updateChildren"));
const updateDomItem_1 = __importDefault(require("./updateDomItem"));
/**
 * Generate HTML element data for each object in the matrix
 * WARNING: This is a recursive function.
 * @param config - The DomItem having child DomItems with config changes to be
 * applied
 */
const updateDomItems = config => {
  if (config.nodeName === '#document') {
    for (const child of config.children) {
      updateDomItems(child);
    }
    return config;
  }
  const domItem = (0, updateChildren_1.default)((0, updateDomItem_1.default)(config));
  domItem.children.forEach(updateDomItems);
  return domItem;
};
exports.default = updateDomItems;
},{"./updateChildren":337,"./updateDomItem":338,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216}],340:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
  defineProperty(
    GeneratorFunctionPrototype,
    "constructor",
    { value: GeneratorFunction, configurable: true }
  );
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", { value: enqueue });
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per GeneratorResume behavior specified since ES2015:
        // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
        // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next method, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined;
        maybeInvokeDelegate(delegate, context);

        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a '" + methodName + "' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable != null) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    throw new TypeError(typeof iterable + " is not iterable");
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],341:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BasicQueue", {
  enumerable: true,
  get: function () {
    return _BasicQueue.default;
  }
});
Object.defineProperty(exports, "addUniqueToArray", {
  enumerable: true,
  get: function () {
    return _addUniqueToArray.default;
  }
});
Object.defineProperty(exports, "buildArray", {
  enumerable: true,
  get: function () {
    return _buildArray.default;
  }
});
Object.defineProperty(exports, "buildArrayOfReferences", {
  enumerable: true,
  get: function () {
    return _buildArrayOfReferences.default;
  }
});
Object.defineProperty(exports, "compareArrays", {
  enumerable: true,
  get: function () {
    return _compareArrays.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "mergeArrays", {
  enumerable: true,
  get: function () {
    return _mergeArrays.default;
  }
});
Object.defineProperty(exports, "uniqueArray", {
  enumerable: true,
  get: function () {
    return _uniqueArray.default;
  }
});
var _addUniqueToArray = _interopRequireDefault(require("./arrays/addUniqueToArray"));
var _BasicQueue = _interopRequireDefault(require("./arrays/BasicQueue"));
var _buildArray = _interopRequireDefault(require("./arrays/buildArray"));
var _buildArrayOfReferences = _interopRequireDefault(require("./arrays/buildArrayOfReferences"));
var _compareArrays = _interopRequireDefault(require("./arrays/compareArrays"));
var _mergeArrays = _interopRequireDefault(require("./arrays/mergeArrays"));
var _uniqueArray = _interopRequireDefault(require("./arrays/uniqueArray"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Utilities for building, merging, deduplicating and comparing arrays, plus a basic FIFO queue (BasicQueue) for
 * use with functionHelpers' queueManager/queueTimeout.
 */
var _default = exports.default = {
  addUniqueToArray: _addUniqueToArray.default,
  BasicQueue: _BasicQueue.default,
  buildArray: _buildArray.default,
  buildArrayOfReferences: _buildArrayOfReferences.default,
  compareArrays: _compareArrays.default,
  mergeArrays: _mergeArrays.default,
  uniqueArray: _uniqueArray.default
};
},{"./arrays/BasicQueue":342,"./arrays/addUniqueToArray":343,"./arrays/buildArray":344,"./arrays/buildArrayOfReferences":345,"./arrays/compareArrays":346,"./arrays/mergeArrays":347,"./arrays/uniqueArray":348}],342:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Class BasicQueue is a functional example of a queue to be used with queueManager.
 */
class BasicQueue {
  /**
   * @param innerList - Items to pre-populate the queue with, in order.
   */
  constructor(innerList = []) {
    this.innerList = innerList;
  }
  /**
   * Remove and return the next item in the queue
   */
  dequeue() {
    return this.innerList.shift();
  }
  /**
   * Check if the queue is empty
   */
  empty() {
    return !this.size();
  }
  /**
   * Add an item to the end of the queue
   * @param data
   */
  enqueue(data) {
    this.innerList.push(data);
    return this;
  }
  /**
   * Retrieve the next item from the queue
   */
  peek() {
    return this.empty() ? null : this.innerList[0];
  }
  /**
   * Get the quantity of items in the queue
   */
  size() {
    return this.innerList.length;
  }
}
var _default = exports.default = BasicQueue;
},{}],343:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
/**
 * Having an array and a potential new array element, check if the element is in the array, if not append to array.
 * @param item - An potential array element, possibly a DomItem
 * @param array - An array where an element may be appended.
 */
const addUniqueToArray = (item, array) => !array.includes(item) ? array.concat([item]) : array;
var _default = exports.default = addUniqueToArray;
},{"core-js/modules/es.array.includes.js":199}],344:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cloneObject = _interopRequireDefault(require("../objects/cloneObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @param item - The item to be used for each array element
 * @param length - The desired length of the array
 */
const buildArray = (item, length) => {
  const arr = [];
  while (arr.length < length) {
    const cloned = (0, _cloneObject.default)(item);
    arr.push(cloned);
  }
  return arr;
};
var _default = exports.default = buildArray;
},{"../objects/cloneObject":385}],345:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Leverage buildArrayBase to generate an array filled with references to the provided item.
 * The length defines how long the array should be.
 * @param item - The item to be used for each array element
 * @param length - The desired length of the array
 */
const buildArrayOfReferences = (item, length) => {
  const arr = [];
  while (arr.length < length) {
    arr.push(item);
  }
  return arr;
};
var _default = exports.default = buildArrayOfReferences;
},{}],346:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _isObject = _interopRequireDefault(require("../objects/isObject"));
var _mergeArrays = _interopRequireDefault(require("./mergeArrays"));
var _objectKeys = _interopRequireDefault(require("../objects/objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Compare two Arrays and return the Object where the value for each property is as follows:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * The returned Object uses the element values as the property names
 * This functions works by first creating a concatenated array of all unique values. Then for each unique values,
 * convert to a string and use it as a new property name. Array filter each array checking if it has the unique value.
 * Use the lengths of these filtered arrays to compare. So if the first array has the value and the second one doesn't
 * the first length will be one or more and the second will be zero, if the both have the value then both will be one
 * or more.
 * @example
 * // example of input and resulting output
 * compareArrays(
 *   ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
 *   ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
 * )
 * // unique array
 * ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']
 * // result object
 * [
 *   {
 *     value: 'match1',
 *     keys: [[0], [0]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch1',
 *     keys: [[1], []],
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'match2',
 *     keys: [[2], [1]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch2',
 *     keys: [[3], []],
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'badMatch1',
 *     keys: [[4], [3, 4]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'secondMismatch1',
 *     keys: [[], [2]],
 *     result: [-1, 1]
 *   }
 * ]
 *
 * @param arrays - The arrays to compare
 */
const compareArrays = (...arrays) => (0, _mergeArrays.default)(...arrays).reduce((results, attr) => {
  const attrType = typeof attr;
  const useArray = Array.isArray(attr);
  const keys = arrays.map(array => array.reduce((results, current, key) => {
    const currentType = typeof current;
    if (attrType !== currentType) {
      return results;
    }
    if (!(0, _isObject.default)(attr)) {
      return current === attr ? [...results, key] : results;
    }
    if (useArray !== Array.isArray(current)) {
      return results;
    }
    const compareKeys = useArray ? compareArrays(attr, current) : compareArrays((0, _objectKeys.default)(attr), (0, _objectKeys.default)(current));
    return compareKeys.every(compare => compare.result.every(result => result === 0)) ? [...results, key] : results;
  }, []));
  const arrayResults = keys.map(array => array.length ? 1 : -1);
  return [...results, {
    value: attr,
    keys,
    result: arrayResults.every(result => result === 1) ? arrayResults.map(result => 0) : arrayResults
  }];
}, []);
var _default = exports.default = compareArrays;
},{"../objects/isObject":395,"../objects/objectKeys":400,"./mergeArrays":347,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212,"core-js/modules/esnext.iterator.map.js":217,"core-js/modules/esnext.iterator.reduce.js":218}],347:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _uniqueArray = _interopRequireDefault(require("./uniqueArray"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Take multiple arrays and then filter all these into one unique array.
 * @param arrays - Provide multiple arrays to create one unique array
 */
const mergeArrays = (...arrays) => arrays.map(_uniqueArray.default).reduce((merged, arr) => [...merged, ...arr.filter(attr => !merged.includes(attr))], []);
var _default = exports.default = mergeArrays;
},{"./uniqueArray":348,"core-js/modules/es.array.includes.js":199,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.filter.js":213,"core-js/modules/esnext.iterator.map.js":217,"core-js/modules/esnext.iterator.reduce.js":218}],348:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
/**
 * Remove duplicate values from an array. uniqueArray
 * @param array - The array to make unique
 */
const uniqueArray = array => array.filter((item, index) => array.indexOf(item) === index);
var _default = exports.default = uniqueArray;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.filter.js":213}],349:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "assignDescriptor", {
  enumerable: true,
  get: function () {
    return _assignDescriptor.default;
  }
});
Object.defineProperty(exports, "assignDescriptorDetail", {
  enumerable: true,
  get: function () {
    return _assignDescriptorDetail.default;
  }
});
Object.defineProperty(exports, "checkClearValues", {
  enumerable: true,
  get: function () {
    return _checkClearValues.default;
  }
});
Object.defineProperty(exports, "checkDescriptorComplete", {
  enumerable: true,
  get: function () {
    return _checkDescriptorComplete.default;
  }
});
Object.defineProperty(exports, "cloneDescriptor", {
  enumerable: true,
  get: function () {
    return _cloneDescriptor.default;
  }
});
Object.defineProperty(exports, "cloneDescriptorDetail", {
  enumerable: true,
  get: function () {
    return _cloneDescriptorDetail.default;
  }
});
Object.defineProperty(exports, "compareDescriptor", {
  enumerable: true,
  get: function () {
    return _compareDescriptor.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "describeObject", {
  enumerable: true,
  get: function () {
    return _describeObject.default;
  }
});
Object.defineProperty(exports, "describeObjectDetail", {
  enumerable: true,
  get: function () {
    return _describeObjectDetail.default;
  }
});
Object.defineProperty(exports, "describeObjectMap", {
  enumerable: true,
  get: function () {
    return _describeObjectMap.default;
  }
});
Object.defineProperty(exports, "nextReference", {
  enumerable: true,
  get: function () {
    return _nextReference.default;
  }
});
Object.defineProperty(exports, "sameDescriptor", {
  enumerable: true,
  get: function () {
    return _sameDescriptor.default;
  }
});
var _assignDescriptor = _interopRequireDefault(require("./descriptors/assignDescriptor"));
var _assignDescriptorDetail = _interopRequireDefault(require("./descriptors/assignDescriptorDetail"));
var _checkClearValues = _interopRequireDefault(require("./descriptors/checkClearValues"));
var _checkDescriptorComplete = _interopRequireDefault(require("./descriptors/checkDescriptorComplete"));
var _cloneDescriptor = _interopRequireDefault(require("./descriptors/cloneDescriptor"));
var _cloneDescriptorDetail = _interopRequireDefault(require("./descriptors/cloneDescriptorDetail"));
var _compareDescriptor = _interopRequireDefault(require("./descriptors/compareDescriptor"));
var _describeObject = _interopRequireDefault(require("./descriptors/describeObject"));
var _describeObjectMap = _interopRequireDefault(require("./descriptors/describeObjectMap"));
var _describeObjectDetail = _interopRequireDefault(require("./descriptors/describeObjectDetail"));
var _nextReference = _interopRequireDefault(require("./descriptors/nextReference"));
var _sameDescriptor = _interopRequireDefault(require("./descriptors/sameDescriptor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * A "descriptor" is a flat, serializable snapshot of an object or array's shape: for each property, its type(s),
 * whether it's nullable, and - if the property's own value is itself an object/array - a reference to that nested
 * value's own descriptor elsewhere in the same list, rather than nesting descriptors inside descriptors. This flat,
 * reference-based structure is what lets these utilities walk deeply nested and even circular object graphs (an
 * object that contains itself, directly or indirectly) without infinite recursion, since a value that's already
 * been described is simply pointed to again instead of re-described.
 *
 * Start with {@link module:objectDescriptors.describeObjectMap}, which takes any real object or array and produces
 * this flat list of descriptors for you - the other functions here (comparing, merging, cloning descriptors) are
 * building blocks used internally, or useful once you already have descriptors to work with directly.
 *
 * The concrete use this module has earned its keep on: describing two objects and comparing the results tells
 * you whether they're the same shape and values even when they're different references entirely (see
 * {@link module:objectDescriptors.sameDescriptor}/{@link module:objectDescriptors.compareDescriptor}) - useful
 * anywhere you need to check that two objects genuinely match without caring whether they're literally the same
 * instance. A descriptor also doubles as a flat, structured summary of an object's shape, which can be handy for
 * discussion or assessment purposes (e.g. describing what an object looks like without dumping the whole thing).
 */
var _default = exports.default = {
  assignDescriptor: _assignDescriptor.default,
  assignDescriptorDetail: _assignDescriptorDetail.default,
  checkClearValues: _checkClearValues.default,
  checkDescriptorComplete: _checkDescriptorComplete.default,
  cloneDescriptor: _cloneDescriptor.default,
  cloneDescriptorDetail: _cloneDescriptorDetail.default,
  compareDescriptor: _compareDescriptor.default,
  describeObject: _describeObject.default,
  describeObjectMap: _describeObjectMap.default,
  describeObjectDetail: _describeObjectDetail.default,
  nextReference: _nextReference.default,
  sameDescriptor: _sameDescriptor.default
};
},{"./descriptors/assignDescriptor":350,"./descriptors/assignDescriptorDetail":351,"./descriptors/checkClearValues":352,"./descriptors/checkDescriptorComplete":353,"./descriptors/cloneDescriptor":354,"./descriptors/cloneDescriptorDetail":355,"./descriptors/compareDescriptor":356,"./descriptors/describeObject":357,"./descriptors/describeObjectDetail":358,"./descriptors/describeObjectMap":359,"./descriptors/nextReference":360,"./descriptors/sameDescriptor":361}],350:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _assignDescriptorDetail = _interopRequireDefault(require("./assignDescriptorDetail"));
var _cloneDescriptor = _interopRequireDefault(require("./cloneDescriptor"));
var _compareArrays = _interopRequireDefault(require("../arrays/compareArrays"));
var _uniqueArray = _interopRequireDefault(require("../arrays/uniqueArray"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.
 * Used to widen a descriptor as more differently-shaped objects are described into it (e.g. array elements of
 * different types), rather than replacing it outright.
 * @param originalMap - The base descriptor to merge onto (not mutated - a
 * clone is merged and returned).
 * @param  descriptors - One or more further descriptors to merge in.
 * @returns A new descriptor representing the merge of all of the above.
 */
const assignDescriptor = (originalMap, ...descriptors) => descriptors.reduce((assignedDescriptor, descriptor) => {
  const detailsDiff = (0, _compareArrays.default)(assignedDescriptor.keys, descriptor.keys);
  detailsDiff.forEach(diff => {
    const existingDetail = assignedDescriptor.details.find(detail => detail.key === diff.value);
    const newDetail = descriptor.details.find(detail => detail.key === diff.value);
    if (diff.result.every(result => result === 0)) {
      assignedDescriptor.details[existingDetail.index] = (0, _assignDescriptorDetail.default)(existingDetail, newDetail);
      return assignedDescriptor;
    }
    const useDetail = diff.result[0] > 0 ? existingDetail : newDetail;
    if (!useDetail) {
      assignedDescriptor.details[existingDetail.index].optional = true;
      return assignedDescriptor;
    }
    const useIndex = diff.result[0] > 0 ? useDetail.index : assignedDescriptor.length;
    assignedDescriptor.details[useIndex] = Object.assign({}, useDetail, {
      index: useIndex,
      optional: true
    });
    assignedDescriptor.length = assignedDescriptor.length < assignedDescriptor.details.length ? assignedDescriptor.details.length : assignedDescriptor.length;
    return assignedDescriptor;
  });
  assignedDescriptor.keys = (0, _uniqueArray.default)(assignedDescriptor.details.map(detail => detail.key));
  assignedDescriptor.references = (0, _uniqueArray.default)(assignedDescriptor.details.filter(detail => detail.isReference).map(detail => detail.index));
  assignedDescriptor.isArray = assignedDescriptor.length ? assignedDescriptor.details.every(detail => typeof detail.key === 'number') : assignedDescriptor.isArray;
  assignedDescriptor.complete = !assignedDescriptor.references.length || assignedDescriptor.complete || descriptor.complete;
  return assignedDescriptor;
}, (0, _cloneDescriptor.default)(originalMap));
var _default = exports.default = assignDescriptor;
},{"../arrays/compareArrays":346,"../arrays/uniqueArray":348,"./assignDescriptorDetail":351,"./cloneDescriptor":354,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212,"core-js/modules/esnext.iterator.filter.js":213,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.for-each.js":216,"core-js/modules/esnext.iterator.map.js":217,"core-js/modules/esnext.iterator.reduce.js":218}],351:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _cloneDescriptorDetail = _interopRequireDefault(require("./cloneDescriptorDetail"));
var _uniqueArray = _interopRequireDefault(require("../arrays/uniqueArray"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Assign properties from other details onto an existing detail, widening it (e.g. combining `type`/`value` arrays,
 * OR-ing boolean flags like `nullable`/`optional`) rather than overwriting it - the per-property counterpart to
 * {@link module:objectDescriptors.assignDescriptor}.
 * @param originalDetail - The base detail to merge onto (not mutated -
 * a clone is merged and returned).
 * @param  details - One or more further details to merge in.
 * @returns A new detail representing the merge of all of the above.
 */
const assignDescriptorDetail = (originalDetail, ...details) => details.reduce((existingDetail, newDetail) => {
  existingDetail.type = (0, _uniqueArray.default)([...existingDetail.type, ...newDetail.type]);
  existingDetail.value = (0, _uniqueArray.default)([...existingDetail.value, ...newDetail.value]);
  existingDetail.nullable = existingDetail.nullable || newDetail.nullable;
  existingDetail.optional = existingDetail.optional || newDetail.optional;
  existingDetail.circular = existingDetail.circular || newDetail.circular;
  existingDetail.isReference = existingDetail.isReference || newDetail.isReference;
  existingDetail.isInstance = existingDetail.isInstance || newDetail.isInstance;
  existingDetail.arrayReference = [existingDetail.arrayReference, newDetail.arrayReference].find(ref => typeof ref === 'number');
  existingDetail.objectReference = [existingDetail.objectReference, newDetail.objectReference].find(ref => typeof ref === 'number');
  existingDetail.arrayReference = typeof existingDetail.arrayReference === 'undefined' ? null : existingDetail.arrayReference;
  existingDetail.objectReference = typeof existingDetail.objectReference === 'undefined' ? null : existingDetail.objectReference;
  return existingDetail;
}, (0, _cloneDescriptorDetail.default)(originalDetail));
var _default = exports.default = assignDescriptorDetail;
},{"../arrays/uniqueArray":348,"./cloneDescriptorDetail":355,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],352:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _setValue = _interopRequireDefault(require("../objects/setValue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Once a descriptor is complete (all its references have been resolved), its details' actual `value` arrays are no
 * longer needed to build the descriptor further - clear them to save memory, unless `keepValues` says otherwise.
 * @param descriptor - The descriptor to check.
 * @param keepValues - Set true to keep the values even once the descriptor is complete.
 * @returns The same descriptor, with `details[].value` cleared if applicable.
 */
const checkClearValues = (descriptor, keepValues = false) => (0, _setValue.default)('details', descriptor.complete && !keepValues ? descriptor.details.map(detail => (0, _setValue.default)('value', [], detail)) : descriptor.details, descriptor);
var _default = exports.default = checkClearValues;
},{"../objects/setValue":404,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217}],353:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
var _setValue = _interopRequireDefault(require("../objects/setValue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Check if every property this descriptor references (i.e. every nested object/array it points to) has actually
 * had its own descriptor built yet, and set the descriptor's `complete` flag to true if so.
 * @param descriptor - The descriptor to check.
 * @returns The same descriptor, with `complete` updated.
 */
const checkDescriptorComplete = descriptor => (0, _setValue.default)('complete', descriptor.references.every(refId => [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(ref => typeof ref === 'number')), descriptor);
var _default = exports.default = checkDescriptorComplete;
},{"../objects/setValue":404,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212}],354:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _cloneDescriptorDetail = _interopRequireDefault(require("./cloneDescriptorDetail"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Make a copy of an object descriptor so that the original will not be mutated.
 * @param originalMap - The descriptor to copy.
 * @returns A new, independent copy.
 */
const cloneDescriptor = originalMap => {
  const copyMap = {};
  // @ts-ignore
  copyMap['index'] = originalMap.index || 0;
  // @ts-ignore
  copyMap['details'] = originalMap.details.map(_cloneDescriptorDetail.default);
  // @ts-ignore
  copyMap['length'] = originalMap.length;
  // @ts-ignore
  copyMap['keys'] = originalMap.keys.map(key => key);
  // @ts-ignore
  copyMap['references'] = originalMap.references.map(reference => reference);
  // @ts-ignore
  copyMap['isArray'] = originalMap.isArray;
  // @ts-ignore
  copyMap['complete'] = originalMap.complete;
  return copyMap;
};
var _default = exports.default = cloneDescriptor;
},{"./cloneDescriptorDetail":355,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217}],355:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
var _objectKeys = _interopRequireDefault(require("../objects/objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Get a new copy of an existing descriptor detail so that the original will not be mutated.
 * @param originalDetail - The detail to copy.
 * @returns A new, independent copy.
 */
const cloneDescriptorDetail = originalDetail => {
  const copyDetail = {};
  (0, _objectKeys.default)(originalDetail).forEach(key => {
    // @ts-ignore
    copyDetail[key] = Array.isArray(originalDetail[key]) ? originalDetail[key].map(value => value) : originalDetail[key];
  });
  return copyDetail;
};
var _default = exports.default = cloneDescriptorDetail;
},{"../objects/objectKeys":400,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"core-js/modules/esnext.iterator.map.js":217}],356:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.some.js");
/**
 * Check if two descriptors are the same or similar, in that the smaller one's keys are all present in the larger
 * one and their types line up - used to detect when a newly-described value actually matches a descriptor already
 * in the map, so it can be pointed at instead of creating a duplicate.
 * @param descriptor1 - The first descriptor to compare.
 * @param descriptor2 - The second descriptor to compare.
 * @returns True if the descriptors describe a compatible shape.
 */
const compareDescriptor = (descriptor1, descriptor2) => {
  if (descriptor1.isArray !== descriptor2.isArray) {
    return false;
  }
  if (descriptor1.length === 0 || descriptor2.length === 0) {
    return descriptor1.length === descriptor2.length;
  }
  const smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2;
  const largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1;
  return smallerDescriptor.keys.every(key => largerDescriptor.keys.includes(key)) ? smallerDescriptor.details.every(detail => detail.type.some(type => largerDescriptor.details.find(foundDetail => foundDetail.key === detail.key).type.includes(type))) : false;
};
var _default = exports.default = compareDescriptor;
},{"core-js/modules/es.array.includes.js":199,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.some.js":219}],357:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _assignDescriptorDetail = _interopRequireDefault(require("./assignDescriptorDetail"));
var _describeObjectDetail = _interopRequireDefault(require("./describeObjectDetail"));
var _objectKeys = _interopRequireDefault(require("../objects/objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Trace a single object or array (not its nested objects/arrays - see
 * {@link module:objectDescriptors.describeObjectMap} for that) and return the descriptor which defines its own
 * structure and attributes.
 * @param object - The object or array to describe.
 */
const describeObject = object => {
  const descriptor = {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  };
  const keys = (0, _objectKeys.default)(object);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    // @ts-ignore
    const newDetail = (0, _describeObjectDetail.default)(object[key], key, descriptor.length++);
    if (typeof key === 'number' && descriptor.details.length) {
      descriptor.details[0] = (0, _assignDescriptorDetail.default)(descriptor.details[0], newDetail);
      descriptor.keys = [0];
      if (newDetail.isReference) {
        descriptor.references = [0];
      }
      continue;
    }
    descriptor.details.push(newDetail);
    descriptor.keys.push(newDetail.key);
    if (newDetail.isReference) {
      descriptor.references.push(newDetail.index);
    }
  }
  descriptor.isArray = Array.isArray(object);
  descriptor.complete = !descriptor.references.length;
  return descriptor;
};
var _default = exports.default = describeObject;
},{"../objects/objectKeys":400,"./assignDescriptorDetail":351,"./describeObjectDetail":358}],358:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emptyObject = _interopRequireDefault(require("../objects/emptyObject"));
var _isCloneable = _interopRequireDefault(require("../objects/isCloneable"));
var _isInstanceObject = _interopRequireDefault(require("../objects/isInstanceObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Trace a single property's value and produce the descriptorDetail describing it (type, nullability, whether it
 * references a nested object/array, etc.) - the per-property building block used by
 * {@link module:objectDescriptors.describeObject}.
 * @param value - The property's value to describe.
 * @param key - The property name (or array index) this value belongs to.
 * @param index - This detail's intended position within its parent descriptor's `details` array.
 */
const describeObjectDetail = (value, key = 0, index = 0) => {
  const type = typeof value;
  return {
    index,
    key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: (0, _isCloneable.default)(value) && !(0, _emptyObject.default)(value),
    isInstance: (0, _isInstanceObject.default)(value),
    arrayReference: null,
    objectReference: null
  };
};
var _default = exports.default = describeObjectDetail;
},{"../objects/emptyObject":390,"../objects/isCloneable":392,"../objects/isInstanceObject":394}],359:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _assignDescriptor = _interopRequireDefault(require("./assignDescriptor"));
var _checkClearValues = _interopRequireDefault(require("./checkClearValues"));
var _checkDescriptorComplete = _interopRequireDefault(require("./checkDescriptorComplete"));
var _compareDescriptor = _interopRequireDefault(require("./compareDescriptor"));
var _describeObject = _interopRequireDefault(require("./describeObject"));
var _nextReference = _interopRequireDefault(require("./nextReference"));
var _sameDescriptor = _interopRequireDefault(require("./sameDescriptor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Trace out the entire object including nested objects, producing a flat descriptorMap - see the
 * {@link module:objectDescriptors} module description for what a descriptor represents and why it's flat. This is
 * the main entry point into this module: start here to describe a real object/array before comparing, merging, or
 * inspecting its structure with the other functions in this module.
 * @example
 * describeObjectMap({ name: 'example', tags: ['a', 'b'] })
 * // [
 * //   { index: 0, details: [...], length: 2, keys: ['name', 'tags'], references: [1], isArray: false, complete: true },
 * //   { index: 1, details: [...], length: 2, keys: [0], references: [], isArray: true, complete: true }
 * // ]
 * // descriptorMap[0] describes the top-level object; its 'tags' property is a reference (references: [1]) to
 * // descriptorMap[1], which separately describes that nested array. descriptorMap[1]'s own `length` (2) reflects
 * // the array's actual length, but `keys` has only one entry (0) since both elements share the same type
 * // ('string') and are described together by a single, representative descriptorDetail.
 * @param object - The real object or array to describe.
 * @param options
 * @param options.mapLimit - Stop describing further nested references once the map reaches
 * this many descriptors - a safety limit for extremely large or deeply-referenced structures.
 * @param options.depthLimit - How many levels of nested objects/arrays to describe; `-1` means no
 * limit, `0` describes only the top level, etc.
 * @param options.keepValues - By default, each detail's actual values are cleared once its
 * descriptor is complete (to save memory) - set true to keep them.
 */
const describeObjectMap = (object, {
  mapLimit = 1000000000,
  depthLimit = -1,
  keepValues = false
} = {}) => {
  const descriptorMap = [(0, _describeObject.default)(object)];
  descriptorMap[0].index = 0;
  const describeReferences = (descriptor, currentDetail, limit = -1, returnCallback = returnMap => returnMap) => {
    let index = descriptorMap.length;
    const nextRef = currentDetail ? (0, _nextReference.default)(descriptor, currentDetail.index) : undefined;
    const nextDetail = typeof nextRef !== 'undefined' ? descriptor.details[nextRef] : null;
    if (currentDetail) {
      const vals = descriptor.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]];
      vals.forEach(val => {
        const tempDescriptor = (0, _describeObject.default)(val);
        const existingDescriptorIndex = descriptorMap.findIndex(existingDescriptor => (0, _compareDescriptor.default)(tempDescriptor, existingDescriptor));
        if (existingDescriptorIndex >= 0) {
          index = existingDescriptorIndex;
          if (tempDescriptor.length && (0, _sameDescriptor.default)(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
            currentDetail.circular = true;
            descriptor.details[currentDetail.index] = currentDetail;
          }
        }
        if (index >= mapLimit) {
          return descriptorMap;
        }
        if (limit === 0) {
          return descriptorMap;
        }
        if (tempDescriptor.isArray) {
          index = currentDetail.arrayReference ?? index;
          descriptor.details[currentDetail.index].arrayReference = index;
        } else {
          index = currentDetail.objectReference ?? index;
          descriptor.details[currentDetail.index].objectReference = index;
        }
        tempDescriptor.index = index;
        if (existingDescriptorIndex < 0) {
          descriptorMap[index] = descriptorMap[index] ? (0, _assignDescriptor.default)(descriptorMap[index], tempDescriptor) : tempDescriptor;
        }
        descriptorMap[descriptor.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor.index], descriptor);
        currentDetail = descriptorMap[descriptor.index].details.find(detail => detail.key === currentDetail.key);
        if (!currentDetail.circular) {
          const newReference = (0, _nextReference.default)(tempDescriptor, -1);
          const newDetail = typeof newReference !== 'undefined' ? tempDescriptor.details[newReference] : null;
          return describeReferences(tempDescriptor, newDetail, --limit, returnMap => describeReferences(descriptor, nextDetail, --limit));
        }
      });
    }
    descriptorMap[descriptor.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor.index], (0, _checkDescriptorComplete.default)(descriptor));
    descriptorMap[descriptor.index] = (0, _checkClearValues.default)(descriptorMap[descriptor.index], keepValues);
    return nextDetail ? describeReferences(descriptor, nextDetail, --limit) : returnCallback(descriptorMap);
  };
  const descriptor = descriptorMap[0];
  const currentReference = (0, _nextReference.default)(descriptor, -1);
  if (typeof currentReference === 'undefined') {
    descriptorMap[0] = (0, _assignDescriptor.default)(descriptorMap[0], (0, _checkDescriptorComplete.default)(descriptor));
    descriptorMap[0] = (0, _checkClearValues.default)(descriptorMap[0], keepValues);
    return descriptorMap;
  }
  return describeReferences(descriptor, descriptor.details[currentReference], depthLimit);
};
var _default = exports.default = describeObjectMap;
},{"./assignDescriptor":350,"./checkClearValues":352,"./checkDescriptorComplete":353,"./compareDescriptor":356,"./describeObject":357,"./nextReference":360,"./sameDescriptor":361,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214,"core-js/modules/esnext.iterator.for-each.js":216}],360:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
var _objectKeys = _interopRequireDefault(require("../objects/objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Find the index (within `descriptor.details`) of the next referenced property - after `currentReference` - whose
 * own nested object/array still needs its descriptor built. Used to walk through a descriptor's references one at
 * a time while building out a descriptorMap.
 * @param descriptor - The descriptor whose references to search.
 * @param currentReference - The `details` index already processed - search continues after this one.
 * @returns The next detail index to process, or `undefined` if none remain.
 */
const nextReference = (descriptor, currentReference) => descriptor.references.find(nextRef => {
  if (nextRef <= currentReference) {
    return false;
  }
  const val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1];
  if (typeof val !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
    return false;
  }
  return !!(0, _objectKeys.default)(val).length;
});
var _default = exports.default = nextReference;
},{"../objects/objectKeys":400,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.find.js":214}],361:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
require("core-js/modules/esnext.iterator.some.js");
/**
 * Check if two descriptors describe the exact same underlying values (not just compatible types, like
 * {@link module:objectDescriptors.compareDescriptor} does) - used to detect genuine circular references, where a
 * nested value's descriptor turns out to be identical to one of its own ancestors.
 * @param descriptor1 - The first descriptor to compare.
 * @param descriptor2 - The second descriptor to compare.
 * @returns True if every detail's values match at the same position.
 */
const sameDescriptor = (descriptor1, descriptor2) => descriptor1.details.every((detail, index) => detail.value.some(dVal => descriptor2.details[index].value.includes(dVal)));
var _default = exports.default = sameDescriptor;
},{"core-js/modules/es.array.includes.js":199,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212,"core-js/modules/esnext.iterator.some.js":219}],362:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "callWithParams", {
  enumerable: true,
  get: function () {
    return _callWithParams.default;
  }
});
Object.defineProperty(exports, "curry", {
  enumerable: true,
  get: function () {
    return _curry.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.default;
  }
});
Object.defineProperty(exports, "makeBasicQueue", {
  enumerable: true,
  get: function () {
    return _makeBasicQueue.default;
  }
});
Object.defineProperty(exports, "onBodyLoad", {
  enumerable: true,
  get: function () {
    return _onBodyLoad.default;
  }
});
Object.defineProperty(exports, "pipe", {
  enumerable: true,
  get: function () {
    return _pipe.default;
  }
});
Object.defineProperty(exports, "preloadParams", {
  enumerable: true,
  get: function () {
    return _preloadParams.default;
  }
});
Object.defineProperty(exports, "queueManager", {
  enumerable: true,
  get: function () {
    return _queueManager.default;
  }
});
Object.defineProperty(exports, "queueTimeout", {
  enumerable: true,
  get: function () {
    return _queueTimeout.default;
  }
});
Object.defineProperty(exports, "relevancyFilter", {
  enumerable: true,
  get: function () {
    return _relevancyFilter.default;
  }
});
Object.defineProperty(exports, "trace", {
  enumerable: true,
  get: function () {
    return _trace.default;
  }
});
var _callWithParams = _interopRequireDefault(require("./functions/callWithParams"));
var _curry = _interopRequireDefault(require("./functions/curry"));
var _delay = _interopRequireDefault(require("./functions/delay"));
var _makeBasicQueue = _interopRequireDefault(require("./functions/makeBasicQueue"));
var _onBodyLoad = _interopRequireDefault(require("./functions/onBodyLoad"));
var _pipe = _interopRequireDefault(require("./functions/pipe"));
var _preloadParams = _interopRequireDefault(require("./functions/preloadParams"));
var _queueManager = _interopRequireDefault(require("./functions/queueManager"));
var _queueTimeout = _interopRequireDefault(require("./functions/queueTimeout"));
var _relevancyFilter = _interopRequireDefault(require("./functions/relevancyFilter"));
var _trace = _interopRequireDefault(require("./functions/trace"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Manage how functions are called with these utilities.
 */
var _default = exports.default = {
  callWithParams: _callWithParams.default,
  curry: _curry.default,
  delay: _delay.default,
  makeBasicQueue: _makeBasicQueue.default,
  onBodyLoad: _onBodyLoad.default,
  pipe: _pipe.default,
  preloadParams: _preloadParams.default,
  queueManager: _queueManager.default,
  queueTimeout: _queueTimeout.default,
  relevancyFilter: _relevancyFilter.default,
  trace: _trace.default
};
},{"./functions/callWithParams":363,"./functions/curry":364,"./functions/delay":365,"./functions/makeBasicQueue":366,"./functions/onBodyLoad":367,"./functions/pipe":368,"./functions/preloadParams":369,"./functions/queueManager":370,"./functions/queueTimeout":371,"./functions/relevancyFilter":372,"./functions/trace":373}],363:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Given a function, call with the correct number of parameters from an array of possible parameters.
 * @param fn - The function to be called
 * @param params - Array of possible function parameters
 * @param minimum - Minimum number of parameters to use in the function
 */
const callWithParams = (fn, params = [], minimum = 2) => fn(...params.slice(0, fn.length || minimum));
var _default = exports.default = callWithParams;
},{}],364:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @param fn - Receives a function to be curried
 */
const curry = fn => (...args) => args.length >= fn.length ? fn(...args) : (...a) => curry(fn)(...[...args, ...a]);
var _default = exports.default = curry;
},{}],365:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("regenerator-runtime/runtime");
/**
 * Provide a timeout which returns a promise.
 * @param time - Delay in milliseconds
 */
const delay = (time = 0) => {
  let cancel = () => undefined;
  return {
    resolver: new Promise((resolve, reject) => {
      if (isNaN(time)) {
        reject(new Error(`Invalid delay: ${time}`));
      } else {
        const timeoutId = setTimeout(resolve, time, `Delayed for: ${time}`);
        cancel = () => {
          clearTimeout(timeoutId);
          reject(new Error(`Cancelled delay: ${time}`));
        };
      }
    }),
    cancel
  };
};
var _default = exports.default = delay;
},{"regenerator-runtime/runtime":340}],366:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _BasicQueue = _interopRequireDefault(require("../arrays/BasicQueue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Create an instance of a basic queue.
 * @param initialQueue - Items to pre-populate the queue with, in order.
 */
const makeBasicQueue = (initialQueue = []) => {
  return new _BasicQueue.default(initialQueue);
};
var _default = exports.default = makeBasicQueue;
},{"../arrays/BasicQueue":342}],367:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _queueManager = _interopRequireDefault(require("./queueManager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const queue = [];
const manager = (0, _queueManager.default)();
manager.start();
let observer = null;
const doReset = () => observer = null;
const initializeObserver = async () => {
  observer = new MutationObserver(() => {
    if (document.body) {
      while (queue.length) {
        manager.push(queue.shift());
      }
      observer.disconnect();
      doReset();
    }
  });
  observer.observe(document.documentElement, {
    childList: true
  });
  return observer;
};
/**
 * Prepare functions to be called once the body is available.
 * @param callback
 * @param reset
 */
const onBodyLoad = (callback, reset = false) => {
  if (reset) {
    doReset();
  }
  queue.push(callback);
  if (observer === null) {
    initializeObserver();
  }
  return queue;
};
var _default = exports.default = onBodyLoad;
},{"./queueManager":370}],368:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
/**
 * Take one or more function with a single parameter and return value.
 * Pass a parameter and the value will be transformed by each function then returned.
 * @param fns - Takes a series of functions having the same parameter
 */
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
var _default = exports.default = pipe;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],369:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Provide an array of parameters to be used with a function, allow the function to be called later
 * with the missing parameter.
 * @param fn - The function to be called
 * @param params - The parameters to preload
 * @param unassignedParam - Position of missing parameter (zero indexed)
 */
const preloadParams = (fn, params = [], unassignedParam = 0) => missing => {
  params.splice(unassignedParam, 0, missing);
  return fn(...params);
};
var _default = exports.default = preloadParams;
},{}],370:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("regenerator-runtime/runtime");
var _makeBasicQueue = _interopRequireDefault(require("./makeBasicQueue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Manage functions to run sequentially.
 * @param queue - The queue to manage. Pass a plain array to have it converted into a
 * {@link module:arrayHelpers.BasicQueue} automatically, or a custom queue implementing `IsQueue`; omit it (or pass
 * `null`) to have one created for you.
 */
const queueManager = (queue = null) => {
  let isRunning = false;
  let isPaused = true;
  /**
   * Convert a function to a queueable object.
   * @param resolve
   * @param reject
   * @param fn
   * @param args
   */
  const makeQueuedRunnable = (resolve, reject, fn, ...args) => {
    const generator = function* () {
      const item = yield;
      if (typeof item.fn !== 'function') {
        return reject(item);
      }
      try {
        return resolve(item.fn(...item.args));
      } catch (error) {
        // A function which throws rejects its own promise (as one which returns a rejected promise does), instead of
        // throwing out of whichever function happened to finish just before it and starting the next item.
        return reject(error);
      }
    }();
    // Prepare the generator to be used on the subsequent call
    generator.next();
    return {
      item: {
        fn,
        args
      },
      generator
    };
  };
  /**
   * After an item is run, THEN run this function to reset isRunning
   * @param result
   */
  const postRun = result => {
    isRunning = false;
    runNextItem();
    return result;
  };
  /**
   * When a queued function throws (or returns a promise which rejects), carry on with the rest of the queue and pass the
   * error on to whoever queued it - otherwise the queue would stay marked as running and never start another function.
   * @param error
   * @throws {*} The same error
   */
  const postFailedRun = error => {
    isRunning = false;
    runNextItem();
    throw error;
  };
  /**
   * When ready, runs the next queued runnable generator.
   */
  const runNextItem = () => {
    if (!isPaused && !queue.empty() && !isRunning) {
      isRunning = true;
      let toRun = queue.dequeue();
      if (typeof toRun === 'undefined' || toRun === null) {
        return null;
      }
      if (typeof toRun === 'function') {
        new Promise((resolve, reject) => {
          toRun = makeQueuedRunnable(resolve, reject, toRun);
          runNextItem();
        }).then(postRun, postFailedRun);
      }
      if ('success' in toRun) {
        // Some run responses return an object with 'success' property.
        console.info(toRun.success);
        return null;
      }
      if (!toRun.generator || 'error' in toRun) {
        // Some run responses return an object with an 'error' property
        let errorMessage = 'Verify queued function implements "done()" state.';
        if ('error' in toRun && toRun.error) {
          errorMessage = `[${toRun.error}]: ${errorMessage}`;
        }
        throw new Error(errorMessage);
      }
      if (toRun.generator && toRun.item) {
        // Ensure the returned result has both the generator and the item to be valid
        return toRun.generator.next(toRun.item);
      }
    }
    return null;
  };
  /**
   * Add a function into the queue to be run when ready.
   * @param fn - The function to run when ready
   * @param args - Optional arguments to apply when the function is ready to be run
   * @returns Promise
   */
  const pushAnother = (fn, ...args) => new Promise((resolve, reject) => {
    queue.enqueue(makeQueuedRunnable(resolve, reject, fn, ...args));
    runNextItem();
  }).then(postRun, postFailedRun);
  if (Array.isArray(queue)) {
    const queueArray = queue;
    queue = (0, _makeBasicQueue.default)();
    queueArray.forEach(queued => pushAnother(queued));
  }
  if (queue === null) {
    queue = (0, _makeBasicQueue.default)();
  }
  runNextItem();
  return {
    start: () => {
      isPaused = false;
      runNextItem();
    },
    pause: () => {
      isPaused = true;
    },
    push: pushAnother
  };
};
var _default = exports.default = queueManager;
},{"./makeBasicQueue":366,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"regenerator-runtime/runtime":340}],371:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("regenerator-runtime/runtime");
var _delay = _interopRequireDefault(require("./delay"));
var _queueManager = _interopRequireDefault(require("./queueManager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Manage functions to run sequentially with delays.
 * @param queueManagerHandle
 */
const queueTimeout = (queueManagerHandle = null) => {
  const manager = queueManagerHandle || (0, _queueManager.default)();
  manager.start();
  return (fn, time = 0, ...args) => manager.push(() => (0, _delay.default)(time).resolver.then(() => fn(...args)));
};
var _default = exports.default = queueTimeout;
},{"./delay":365,"./queueManager":370,"regenerator-runtime/runtime":340}],372:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.map.js");
/**
 * Remove elements out of relevance range and update the max relevance.
 * @param map
 * @param options
 * @param options.mapLimit - Only filter once the map exceeds this many entries.
 * @param options.relevancyRange - How many of the most-recent relevance values to keep.
 */
const relevancyFilter = (map, {
  mapLimit = 1000,
  relevancyRange = 100
} = {}) => {
  if (map.length <= mapLimit) {
    return map;
  }
  const minRelevance = map.length - relevancyRange;
  const filtered = map.filter(reference => reference.relevance >= minRelevance);
  return filtered.map(reference => {
    reference.relevance = reference.relevance > filtered.length ? filtered.length : reference.relevance;
    return reference;
  });
};
var _default = exports.default = relevancyFilter;
},{"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.filter.js":213,"core-js/modules/esnext.iterator.map.js":217}],373:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("regenerator-runtime/runtime");
var _cloneObject = _interopRequireDefault(require("../objects/cloneObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Output the value with label to the console and return the value to not interrupt the code - useful for
 * inspecting a value mid-pipe/mid-chain without altering the result.
 * @param label - Pass an identifying label of the value being output.
 * @param useClone - Determines if the logged data should be a clone of the original to preserve
 * its state at the time of logging (rather than a live reference that may show later mutations).
 */
const trace = (label, useClone = true) => value => {
  // noinspection JSForgottenDebugStatementInspection
  console.info(`${label}: `, useClone ? (0, _cloneObject.default)(value) : value);
  return value;
};
var _default = exports.default = trace;
},{"../objects/cloneObject":385,"regenerator-runtime/runtime":340}],374:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "absoluteMax", {
  enumerable: true,
  get: function () {
    return _absoluteMax.default;
  }
});
Object.defineProperty(exports, "absoluteMin", {
  enumerable: true,
  get: function () {
    return _absoluteMin.default;
  }
});
Object.defineProperty(exports, "compare", {
  enumerable: true,
  get: function () {
    return _compare.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "greatestCommonDivisor", {
  enumerable: true,
  get: function () {
    return _greatestCommonDivisor.default;
  }
});
Object.defineProperty(exports, "leastCommonMultiple", {
  enumerable: true,
  get: function () {
    return _leastCommonMultiple.default;
  }
});
Object.defineProperty(exports, "lowestCommonDenominator", {
  enumerable: true,
  get: function () {
    return _lowestCommonDenominator.default;
  }
});
Object.defineProperty(exports, "randomInteger", {
  enumerable: true,
  get: function () {
    return _randomInteger.default;
  }
});
Object.defineProperty(exports, "randomNumber", {
  enumerable: true,
  get: function () {
    return _randomNumber.default;
  }
});
Object.defineProperty(exports, "simplestRatio", {
  enumerable: true,
  get: function () {
    return _simplestRatio.default;
  }
});
var _absoluteMax = _interopRequireDefault(require("./numbers/absoluteMax"));
var _absoluteMin = _interopRequireDefault(require("./numbers/absoluteMin"));
var _compare = _interopRequireDefault(require("./numbers/compare"));
var _greatestCommonDivisor = _interopRequireDefault(require("./numbers/greatestCommonDivisor"));
var _leastCommonMultiple = _interopRequireDefault(require("./numbers/leastCommonMultiple"));
var _lowestCommonDenominator = _interopRequireDefault(require("./numbers/lowestCommonDenominator"));
var _randomInteger = _interopRequireDefault(require("./numbers/randomInteger"));
var _randomNumber = _interopRequireDefault(require("./numbers/randomNumber"));
var _simplestRatio = _interopRequireDefault(require("./numbers/simplestRatio"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Some number comparators and random number generators.
 */
var _default = exports.default = {
  absoluteMax: _absoluteMax.default,
  absoluteMin: _absoluteMin.default,
  compare: _compare.default,
  greatestCommonDivisor: _greatestCommonDivisor.default,
  leastCommonMultiple: _leastCommonMultiple.default,
  lowestCommonDenominator: _lowestCommonDenominator.default,
  randomInteger: _randomInteger.default,
  randomNumber: _randomNumber.default,
  simplestRatio: _simplestRatio.default
};
},{"./numbers/absoluteMax":375,"./numbers/absoluteMin":376,"./numbers/compare":377,"./numbers/greatestCommonDivisor":378,"./numbers/leastCommonMultiple":379,"./numbers/lowestCommonDenominator":380,"./numbers/randomInteger":381,"./numbers/randomNumber":382,"./numbers/simplestRatio":383}],375:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Helper for returning the absolute max value
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const absoluteMax = (num1, num2) => Math.abs(num1) > Math.abs(num2) ? num1 : num2;
var _default = exports.default = absoluteMax;
},{}],376:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Helper for returning the absolute min value
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const absoluteMin = (num1, num2) => Math.abs(num1) < Math.abs(num2) ? num1 : num2;
var _default = exports.default = absoluteMin;
},{}],377:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Compare two numbers and return:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * @param val1 - The first number to compare
 * @param val2 - The second number to compare
 */
const compare = (val1, val2) => val1 === val2 ? 0 : val1 > val2 ? 1 : -1;
var _default = exports.default = compare;
},{}],378:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Return the highest number that can be divided into both numbers.
 * @param num1 - First number to assess
 * @param num2 - Second number to compare for common divisor
 */
const greatestCommonDivisor = (num1, num2) => num2 === 0 ? num1 : greatestCommonDivisor(num2, num1 % num2);
var _default = exports.default = greatestCommonDivisor;
},{}],379:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _greatestCommonDivisor = _interopRequireDefault(require("./greatestCommonDivisor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Helper for calculating the multiplier that would make each number relative to each other.
 * @param num1 - A number to compare
 * @param num2 - Another number to be compared against
 */
const leastCommonMultiple = (num1, num2) => num1 === 0 || num2 === 0 ? 0 : num1 * num2 / (0, _greatestCommonDivisor.default)(num1, num2);
var _default = exports.default = leastCommonMultiple;
},{"./greatestCommonDivisor":378}],380:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _leastCommonMultiple = _interopRequireDefault(require("./leastCommonMultiple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Find the smallest number that all the given numbers divide into evenly, by reducing them pairwise with
 * leastCommonMultiple.
 * @param numbers - Two or more numbers to find the lowest common denominator of.
 */
const lowestCommonDenominator = (...numbers) => numbers.reduce((num1, num2) => (0, _leastCommonMultiple.default)(num1, num2), 1);
var _default = exports.default = lowestCommonDenominator;
},{"./leastCommonMultiple":379,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],381:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Create a single random integer from a set of `range` possible values, starting at the optional offset.
 * With no offset the result is 0 to range - 1 (so range is the number of possible values, the same as an array length
 * when choosing an index). The distance between the result numbers can be adjusted with interval.
 * @example
 * randomInteger(1) // always 0 (one possible value)
 * randomInteger(2) // 0 or 1
 * randomInteger(3, 1, 5) // 5, 10 or 15
 * items[randomInteger(items.length)] // a random valid index
 * @param range - The number of possible values (0-99 would be 100 for range)
 * @param offset - Choose the starting number (1-10 would be 1 for offset, 10 for range)
 * @param interval - Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for
 * offset, 3 for range)
 */
const randomInteger = (range, offset = 0, interval = 1) => (Math.floor(Math.random() * range) + offset) * interval;
var _default = exports.default = randomInteger;
},{}],382:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Create a single random number from offset up to (but never including) offset + range. With optional offset,
 * the distance between the result numbers can be adjusted with interval. Matches randomInteger, which gives the
 * whole numbers of the same span.
 * @param range - Choose the breadth of the random number (0 up to, but not including, 100 would be 100 for range)
 * @param offset - Choose the starting number (1 up to, but not including, 10 would be 1 for offset, 9 for range)
 * @param interval - Choose the multiplier applied to the result (~5, ~10, ~15 would be 5 for interval,
 * 1 for offset, 2 for range)
 */
const randomNumber = (range, offset = 0, interval = 1) => (Math.random() * range + offset) * interval;
var _default = exports.default = randomNumber;
},{}],383:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _greatestCommonDivisor = _interopRequireDefault(require("./greatestCommonDivisor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Reduce several numbers to their simplest form / ratio
 * @param numbers - Array of numbers to simplify
 */
const simplestRatio = (...numbers) => {
  if (numbers.length === 0) {
    return [];
  }
  let commonDivisor = numbers.reduce((num1, num2) => (0, _greatestCommonDivisor.default)(num1, num2), 0);
  // Set to positive so that when we divide the numbers they retain their +/-
  commonDivisor = Math.abs(commonDivisor);
  // Simplify the numbers, handle zero
  return numbers.map(num => commonDivisor === 0 ? 0 : num / commonDivisor);
};
var _default = exports.default = simplestRatio;
},{"./greatestCommonDivisor":378,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217,"core-js/modules/esnext.iterator.reduce.js":218}],384:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "cloneObject", {
  enumerable: true,
  get: function () {
    return _cloneObject.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "dotGet", {
  enumerable: true,
  get: function () {
    return _dotGet.default;
  }
});
Object.defineProperty(exports, "dotNotate", {
  enumerable: true,
  get: function () {
    return _dotNotate.default;
  }
});
Object.defineProperty(exports, "dotSet", {
  enumerable: true,
  get: function () {
    return _dotSet.default;
  }
});
Object.defineProperty(exports, "dotUnset", {
  enumerable: true,
  get: function () {
    return _dotUnset.default;
  }
});
Object.defineProperty(exports, "emptyObject", {
  enumerable: true,
  get: function () {
    return _emptyObject.default;
  }
});
Object.defineProperty(exports, "filterObject", {
  enumerable: true,
  get: function () {
    return _filterObject.default;
  }
});
Object.defineProperty(exports, "isCloneable", {
  enumerable: true,
  get: function () {
    return _isCloneable.default;
  }
});
Object.defineProperty(exports, "isEqual", {
  enumerable: true,
  get: function () {
    return _isEqual.default;
  }
});
Object.defineProperty(exports, "isInstanceObject", {
  enumerable: true,
  get: function () {
    return _isInstanceObject.default;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function () {
    return _isObject.default;
  }
});
Object.defineProperty(exports, "mapObject", {
  enumerable: true,
  get: function () {
    return _mapObject.default;
  }
});
Object.defineProperty(exports, "mergeObjects", {
  enumerable: true,
  get: function () {
    return _mergeObjects.default;
  }
});
Object.defineProperty(exports, "mergeObjectsBase", {
  enumerable: true,
  get: function () {
    return _mergeObjectsBase.default;
  }
});
Object.defineProperty(exports, "mergeObjectsMutable", {
  enumerable: true,
  get: function () {
    return _mergeObjectsMutable.default;
  }
});
Object.defineProperty(exports, "objectKeys", {
  enumerable: true,
  get: function () {
    return _objectKeys.default;
  }
});
Object.defineProperty(exports, "objectValues", {
  enumerable: true,
  get: function () {
    return _objectValues.default;
  }
});
Object.defineProperty(exports, "reduceObject", {
  enumerable: true,
  get: function () {
    return _reduceObject.default;
  }
});
Object.defineProperty(exports, "setAndReturnValue", {
  enumerable: true,
  get: function () {
    return _setAndReturnValue.default;
  }
});
Object.defineProperty(exports, "setValue", {
  enumerable: true,
  get: function () {
    return _setValue.default;
  }
});
var _cloneObject = _interopRequireDefault(require("./objects/cloneObject"));
var _dotGet = _interopRequireDefault(require("./objects/dotGet"));
var _dotNotate = _interopRequireDefault(require("./objects/dotNotate"));
var _dotSet = _interopRequireDefault(require("./objects/dotSet"));
var _dotUnset = _interopRequireDefault(require("./objects/dotUnset"));
var _emptyObject = _interopRequireDefault(require("./objects/emptyObject"));
var _filterObject = _interopRequireDefault(require("./objects/filterObject"));
var _isCloneable = _interopRequireDefault(require("./objects/isCloneable"));
var _isEqual = _interopRequireDefault(require("./objects/isEqual"));
var _isInstanceObject = _interopRequireDefault(require("./objects/isInstanceObject"));
var _isObject = _interopRequireDefault(require("./objects/isObject"));
var _mapObject = _interopRequireDefault(require("./objects/mapObject"));
var _mergeObjects = _interopRequireDefault(require("./objects/mergeObjects"));
var _mergeObjectsBase = _interopRequireDefault(require("./objects/mergeObjectsBase"));
var _mergeObjectsMutable = _interopRequireDefault(require("./objects/mergeObjectsMutable"));
var _objectKeys = _interopRequireDefault(require("./objects/objectKeys"));
var _objectValues = _interopRequireDefault(require("./objects/objectValues"));
var _reduceObject = _interopRequireDefault(require("./objects/reduceObject"));
var _setAndReturnValue = _interopRequireDefault(require("./objects/setAndReturnValue"));
var _setValue = _interopRequireDefault(require("./objects/setValue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 */
var _default = exports.default = {
  cloneObject: _cloneObject.default,
  dotGet: _dotGet.default,
  dotNotate: _dotNotate.default,
  dotSet: _dotSet.default,
  dotUnset: _dotUnset.default,
  emptyObject: _emptyObject.default,
  filterObject: _filterObject.default,
  isCloneable: _isCloneable.default,
  isEqual: _isEqual.default,
  isInstanceObject: _isInstanceObject.default,
  isObject: _isObject.default,
  mapObject: _mapObject.default,
  mergeObjects: _mergeObjects.default,
  mergeObjectsBase: _mergeObjectsBase.default,
  mergeObjectsMutable: _mergeObjectsMutable.default,
  objectKeys: _objectKeys.default,
  objectValues: _objectValues.default,
  reduceObject: _reduceObject.default,
  setAndReturnValue: _setAndReturnValue.default,
  setValue: _setValue.default
};
},{"./objects/cloneObject":385,"./objects/dotGet":386,"./objects/dotNotate":387,"./objects/dotSet":388,"./objects/dotUnset":389,"./objects/emptyObject":390,"./objects/filterObject":391,"./objects/isCloneable":392,"./objects/isEqual":393,"./objects/isInstanceObject":394,"./objects/isObject":395,"./objects/mapObject":396,"./objects/mergeObjects":397,"./objects/mergeObjectsBase":398,"./objects/mergeObjectsMutable":399,"./objects/objectKeys":400,"./objects/objectValues":401,"./objects/reduceObject":402,"./objects/setAndReturnValue":403,"./objects/setValue":404}],385:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mergeObjectsBase = _interopRequireDefault(require("./mergeObjectsBase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @param object - The original object that is being cloned
 * @param options
 * @param options.mapLimit - Deprecated and ignored (circular references are handled without trimming).
 * @param options.depthLimit - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param options.relevancyRange - Deprecated and ignored: see mapLimit.
 */
const cloneObject = (object, {
  mapLimit = 100,
  depthLimit = -1,
  relevancyRange = 1000
} = {}) => (0, _mergeObjectsBase.default)({
  mapLimit,
  depthLimit,
  relevancyRange,
  useClone: true
})(object);
var _default = exports.default = cloneObject;
},{"./mergeObjectsBase":398}],386:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject = _interopRequireDefault(require("./isObject"));
var _strAfter = _interopRequireDefault(require("../strings/strAfter"));
var _strBefore = _interopRequireDefault(require("../strings/strBefore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Get a nested property value from an object.
 * @param arrayObject - The array or object to get the property from
 * @param dotNotation - The path to the property
 * @param defaultValue - The default value to return if the property is not found
 * @returns The value of the property
 */
const dotGet = (arrayObject, dotNotation, defaultValue = null) => {
  let key = (0, _strBefore.default)(dotNotation, '.');
  const lastKey = !key;
  if (lastKey) {
    key = dotNotation;
  }
  if (key === '*') {
    const result = [];
    for (const wildKey in arrayObject) {
      // @ts-ignore
      const wildValue = arrayObject[wildKey];
      if (lastKey) {
        // @ts-ignore
        result[wildKey] = wildValue;
        continue;
      }
      if (!(0, _isObject.default)(wildValue)) {
        continue;
      }
      // @ts-ignore
      result[wildKey] = dotGet(wildValue, (0, _strAfter.default)(dotNotation, '.'), defaultValue);
    }
    return result;
  }
  if (lastKey) {
    // @ts-ignore
    return arrayObject[dotNotation] ?? defaultValue;
  }
  // @ts-ignore
  if (typeof arrayObject[key] === 'undefined') {
    return defaultValue;
  }
  // @ts-ignore
  const next = arrayObject[key];
  if (!(0, _isObject.default)(next)) {
    return defaultValue;
  }
  return dotGet(next, (0, _strAfter.default)(dotNotation, '.'), defaultValue);
};
var _default = exports.default = dotGet;
},{"../strings/strAfter":412,"../strings/strBefore":414,"./isObject":395}],387:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _emptyObject = _interopRequireDefault(require("./emptyObject"));
var _isObject = _interopRequireDefault(require("./isObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Convert an array of keys into a regex, return a function to test if incoming keys match.
 * @inner
 * @param retainObjects - An array of keys to retain as objects
 * @returns The dot-notated array
 */
const handleRetainObjects = (retainObjects = []) => {
  if (!retainObjects.length) {
    /**
     * Bypass the test function if there are no retainObjects.
     */
    return (currentKey, value, results) => false;
  }
  retainObjects = retainObjects.map(key => key.replace('\.', '\\.'));
  const retainRegex = new RegExp(`(${retainObjects.join('|')})$`);
  /**
   * Test if a key should be retained as an object.
   * @param currentKey - The key to test
   * @param value - The value of the key
   * @param results - The results object to add to
   */
  return (currentKey, value, results) => {
    if (!currentKey.match(retainRegex)) {
      return false;
    }
    // @ts-ignore
    results[currentKey] = value;
    return true;
  };
};
/**
 * The underlying logic function for converting arrays to dot-notation.
 * @inner
 * @param arrayObject - The array or object to dot-notate
 * @param didRetain - The test function to see if a key should be retained
 * @param prepend - The path for the property being processed
 * @param results - The final array to return
 * @returns The dot-notated object
 */
const performDotNotate = (arrayObject, didRetain, prepend = '', results = {}) => {
  // @ts-ignore
  for (const key in arrayObject) {
    // @ts-ignore
    const value = arrayObject[key];
    const currentKey = `${prepend}${key}`;
    if (didRetain(currentKey, value, results)) {
      continue;
    }
    // An empty object/array has no keys to flatten into - recursing into one would silently drop currentKey
    // from the result entirely, rather than keeping it as the empty value it actually is. Treat it as a leaf.
    if ((0, _isObject.default)(value) && !(0, _emptyObject.default)(value)) {
      performDotNotate(value, didRetain, `${currentKey}.`, results);
      continue;
    }
    results[currentKey] = value;
  }
  return results;
};
/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @param arrayObject - The array or object to dot-notate
 * @param retainObjects - An array of keys to retain as objects
 * @returns The dot-notated object
 */
const dotNotate = (arrayObject, retainObjects = []) => performDotNotate(arrayObject, handleRetainObjects(retainObjects));
var _default = exports.default = dotNotate;
},{"./emptyObject":390,"./isObject":395,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217}],388:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject = _interopRequireDefault(require("./isObject"));
var _strAfter = _interopRequireDefault(require("../strings/strAfter"));
var _strBefore = _interopRequireDefault(require("../strings/strBefore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Set a nested property value an object.
 * @param arrayObject - The array or object to set the property on
 * @param dotNotation - The path for the property
 * @param value - The default value to return if the property is not found
 * @returns The modified object
 */
const dotSet = (arrayObject, dotNotation, value = null) => {
  let key = (0, _strBefore.default)(dotNotation, '.');
  const lastKey = !key;
  if (lastKey) {
    key = dotNotation;
  }
  if (key === '*') {
    for (const wildKey in arrayObject) {
      if (lastKey) {
        // @ts-ignore
        arrayObject[wildKey] = value;
        continue;
      }
      // @ts-ignore
      if (!(0, _isObject.default)(arrayObject[wildKey])) {
        continue;
      }
      // @ts-ignore
      dotSet(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, '.'), value);
    }
    return arrayObject;
  }
  if (lastKey) {
    // @ts-ignore
    arrayObject[dotNotation] = value;
    return arrayObject;
  }
  // @ts-ignore
  const next = arrayObject[key] ?? [];
  // @ts-ignore
  arrayObject[key] = dotSet(next, (0, _strAfter.default)(dotNotation, '.'), value);
  return arrayObject;
};
var _default = exports.default = dotSet;
},{"../strings/strAfter":412,"../strings/strBefore":414,"./isObject":395}],389:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject = _interopRequireDefault(require("./isObject"));
var _strAfter = _interopRequireDefault(require("../strings/strAfter"));
var _strBefore = _interopRequireDefault(require("../strings/strBefore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Unset a nested property value an object.
 * @param arrayObject - The array or object to set the property on
 * @param dotNotation - The path for the property
 * @returns The modified object
 */
const dotUnset = (arrayObject, dotNotation) => {
  let key = (0, _strBefore.default)(dotNotation, '.');
  const lastKey = !key;
  if (lastKey) {
    key = dotNotation;
  }
  if (key === '*') {
    for (const wildKey in arrayObject) {
      if (lastKey) {
        // @ts-ignore
        delete arrayObject[wildKey];
        continue;
      }
      // @ts-ignore
      if (!(0, _isObject.default)(arrayObject[wildKey])) {
        continue;
      }
      // @ts-ignore
      dotUnset(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, '.'));
    }
    return arrayObject;
  }
  if (lastKey) {
    // @ts-ignore
    delete arrayObject[dotNotation];
    return arrayObject;
  }
  // @ts-ignore
  const next = arrayObject[key] ?? [];
  // @ts-ignore
  arrayObject[key] = dotUnset(next, (0, _strAfter.default)(dotNotation, '.'));
  return arrayObject;
};
var _default = exports.default = dotUnset;
},{"../strings/strAfter":412,"../strings/strBefore":414,"./isObject":395}],390:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject = _interopRequireDefault(require("./isObject"));
var _objectKeys = _interopRequireDefault(require("./objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Helper function for testing if the item is an Object or Array that does not have any properties
 * @param item - Object or Array to test
 */
const emptyObject = item => (typeof item === 'function' || (0, _isObject.default)(item)) && !(0, _objectKeys.default)(item).length;
var _default = exports.default = emptyObject;
},{"./isObject":395,"./objectKeys":400}],391:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _callWithParams = _interopRequireDefault(require("../functions/callWithParams"));
var _objectKeys = _interopRequireDefault(require("./objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @param obj - The Object (or Array) to be filtered
 * @param fn - The function to be processed for each filtered property
 * @param thisArg - Optional. Value to use as this when executing callback.
 */
const filterObject = (obj, fn, thisArg = undefined) => Array.isArray(obj) ? obj.filter(fn, thisArg) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => {
  if ((0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
    newObj[curr] = obj[curr];
  } else {
    delete newObj[curr];
  }
  return newObj;
}, {});
var _default = exports.default = filterObject;
},{"../functions/callWithParams":363,"./objectKeys":400,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.filter.js":213,"core-js/modules/esnext.iterator.reduce.js":218}],392:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isInstanceObject = _interopRequireDefault(require("./isInstanceObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Determine if the value is a reference instance
 * @param value
 */
const isCloneable = value => typeof value === 'object' && value !== null && !(0, _isInstanceObject.default)(value);
var _default = exports.default = isCloneable;
},{"./isInstanceObject":394}],393:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.flags.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
require("core-js/modules/esnext.iterator.some.js");
require("core-js/modules/esnext.map.delete-all.js");
require("core-js/modules/esnext.map.every.js");
require("core-js/modules/esnext.map.filter.js");
require("core-js/modules/esnext.map.find.js");
require("core-js/modules/esnext.map.find-key.js");
require("core-js/modules/esnext.map.includes.js");
require("core-js/modules/esnext.map.key-of.js");
require("core-js/modules/esnext.map.map-keys.js");
require("core-js/modules/esnext.map.map-values.js");
require("core-js/modules/esnext.map.merge.js");
require("core-js/modules/esnext.map.reduce.js");
require("core-js/modules/esnext.map.some.js");
require("core-js/modules/esnext.map.update.js");
require("core-js/modules/esnext.set.add-all.js");
require("core-js/modules/esnext.set.delete-all.js");
require("core-js/modules/esnext.set.difference.js");
require("core-js/modules/esnext.set.every.js");
require("core-js/modules/esnext.set.filter.js");
require("core-js/modules/esnext.set.find.js");
require("core-js/modules/esnext.set.intersection.js");
require("core-js/modules/esnext.set.is-disjoint-from.js");
require("core-js/modules/esnext.set.is-subset-of.js");
require("core-js/modules/esnext.set.is-superset-of.js");
require("core-js/modules/esnext.set.join.js");
require("core-js/modules/esnext.set.map.js");
require("core-js/modules/esnext.set.reduce.js");
require("core-js/modules/esnext.set.some.js");
require("core-js/modules/esnext.set.symmetric-difference.js");
require("core-js/modules/esnext.set.union.js");
require("core-js/modules/esnext.weak-map.delete-all.js");
require("core-js/modules/esnext.weak-set.add-all.js");
require("core-js/modules/esnext.weak-set.delete-all.js");
const sameValueZero = (first, second) => first === second || first !== first && second !== second;
const compare = (first, second, seen) => {
  if (sameValueZero(first, second)) {
    return true;
  }
  if (typeof first !== 'object' || typeof second !== 'object' || first === null || second === null) {
    // Different primitives, or a function (which is only equal to itself), or an object against a primitive
    return false;
  }
  if (Object.getPrototypeOf(first) !== Object.getPrototypeOf(second)) {
    return false;
  }
  // A pair which is already being compared further up is not a difference (this is what makes circular references work)
  const comparing = seen.get(first);
  if (comparing && comparing.has(second)) {
    return true;
  }
  if (comparing) {
    comparing.add(second);
  } else {
    seen.set(first, new WeakSet([second]));
  }
  if (first instanceof Date) {
    return first.getTime() === second.getTime();
  }
  if (first instanceof RegExp) {
    return first.source === second.source && first.flags === second.flags;
  }
  if (first instanceof Map) {
    return first.size === second.size && Array.from(first.entries()).every(([key, value]) => second.has(key) && compare(value, second.get(key), seen));
  }
  if (first instanceof Set) {
    const others = Array.from(second.values());
    return first.size === second.size && Array.from(first.values()).every(value => others.some(other => compare(value, other, seen)));
  }
  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  return firstKeys.length === secondKeys.length && firstKeys.every(key => Object.prototype.hasOwnProperty.call(second, key) && compare(first[key], second[key], seen));
};
/**
 * Check whether two values are equal by value, however they are stored: two separately made arrays or objects with the
 * same contents are equal, while two references only need to be the same when the value is a function.
 * - Primitives are equal when they are the same value (and NaN equals NaN)
 * - Arrays are equal when they have the same elements in the same order
 * - Objects are equal when they have the same prototype (the same kind of object) and the same own properties with
 * equal values, the order of the properties does not matter
 * - Dates, regular expressions, Maps and Sets are compared by what they hold
 * - Circular references are handled: a pair of objects which is already being compared is taken to be equal
 * @param first - The first value.
 * @param second - The second value.
 * @returns True when the values are equal.
 */
const isEqual = (first, second) => compare(first, second, new WeakMap());
var _default = exports.default = isEqual;
},{"core-js/modules/es.regexp.flags.js":210,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.every.js":212,"core-js/modules/esnext.iterator.some.js":219,"core-js/modules/esnext.map.delete-all.js":220,"core-js/modules/esnext.map.every.js":221,"core-js/modules/esnext.map.filter.js":222,"core-js/modules/esnext.map.find-key.js":223,"core-js/modules/esnext.map.find.js":224,"core-js/modules/esnext.map.includes.js":225,"core-js/modules/esnext.map.key-of.js":226,"core-js/modules/esnext.map.map-keys.js":227,"core-js/modules/esnext.map.map-values.js":228,"core-js/modules/esnext.map.merge.js":229,"core-js/modules/esnext.map.reduce.js":230,"core-js/modules/esnext.map.some.js":231,"core-js/modules/esnext.map.update.js":232,"core-js/modules/esnext.set.add-all.js":233,"core-js/modules/esnext.set.delete-all.js":234,"core-js/modules/esnext.set.difference.js":235,"core-js/modules/esnext.set.every.js":236,"core-js/modules/esnext.set.filter.js":237,"core-js/modules/esnext.set.find.js":238,"core-js/modules/esnext.set.intersection.js":239,"core-js/modules/esnext.set.is-disjoint-from.js":240,"core-js/modules/esnext.set.is-subset-of.js":241,"core-js/modules/esnext.set.is-superset-of.js":242,"core-js/modules/esnext.set.join.js":243,"core-js/modules/esnext.set.map.js":244,"core-js/modules/esnext.set.reduce.js":245,"core-js/modules/esnext.set.some.js":246,"core-js/modules/esnext.set.symmetric-difference.js":247,"core-js/modules/esnext.set.union.js":248,"core-js/modules/esnext.weak-map.delete-all.js":249,"core-js/modules/esnext.weak-set.add-all.js":250,"core-js/modules/esnext.weak-set.delete-all.js":251}],394:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
var _isObject = _interopRequireDefault(require("./isObject"));
var _objectKeys = _interopRequireDefault(require("./objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Check if the current object has inherited properties.
 * @param object
 */
const isInstanceObject = object => {
  if (typeof object !== 'function' && !(0, _isObject.default)(object)) {
    return false;
  }
  if (!['Array', 'Function', 'Object'].includes(object.constructor.name)) {
    return true;
  }
  return object.constructor.name !== 'Array' && (0, _objectKeys.default)(object, true).length > (0, _objectKeys.default)(object).length;
};
var _default = exports.default = isInstanceObject;
},{"./isObject":395,"./objectKeys":400,"core-js/modules/es.array.includes.js":199}],395:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Check if the provided thing is an object / array.
 * @param object
 */
const isObject = object => typeof object === 'object' && object !== null;
var _default = exports.default = isObject;
},{}],396:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _callWithParams = _interopRequireDefault(require("../functions/callWithParams"));
var _objectKeys = _interopRequireDefault(require("./objectKeys"));
var _setValue = _interopRequireDefault(require("./setValue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @param obj - The Object (or Array) to be mapped
 * @param fn - The function to be processed for each mapped property
 * @param thisArg - Optional. Value to use as this when executing callback.
 */
const mapObject = (obj, fn, thisArg = undefined) => Array.isArray(obj) ? obj.map(fn, thisArg) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => (0, _setValue.default)(curr, (0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2), newObj), {});
var _default = exports.default = mapObject;
},{"../functions/callWithParams":363,"./objectKeys":400,"./setValue":404,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217,"core-js/modules/esnext.iterator.reduce.js":218}],397:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mergeObjectsBase = _interopRequireDefault(require("./mergeObjectsBase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param objects - Provide a list of objects which will be merged starting from the end up into the first
 */
const mergeObjects = (0, _mergeObjectsBase.default)({
  useClone: true
});
var _default = exports.default = mergeObjects;
},{"./mergeObjectsBase":398}],398:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
require("core-js/modules/esnext.map.delete-all.js");
require("core-js/modules/esnext.map.every.js");
require("core-js/modules/esnext.map.filter.js");
require("core-js/modules/esnext.map.find.js");
require("core-js/modules/esnext.map.find-key.js");
require("core-js/modules/esnext.map.includes.js");
require("core-js/modules/esnext.map.key-of.js");
require("core-js/modules/esnext.map.map-keys.js");
require("core-js/modules/esnext.map.map-values.js");
require("core-js/modules/esnext.map.merge.js");
require("core-js/modules/esnext.map.reduce.js");
require("core-js/modules/esnext.map.some.js");
require("core-js/modules/esnext.map.update.js");
var _isCloneable = _interopRequireDefault(require("./isCloneable"));
var _reduceObject = _interopRequireDefault(require("./reduceObject"));
var _setValue = _interopRequireDefault(require("./setValue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
 * Objects having the same attributes will overwrite from last object to first.
 * Every call of the returned function keeps its own record of the objects it has already visited (so circular
 * references are followed only once, and an object which is referenced in several places is merged once), and nothing
 * is remembered between calls: the results of separate calls never share state or go stale.
 * @param options
 * @param options.mapLimit - Deprecated and ignored: the record of visited objects is now scoped to a
 * single call, so it does not need trimming.
 * @param options.depthLimit - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param options.relevancyRange - Deprecated and ignored: see mapLimit.
 * @param options.map] - A predetermined list of references (source and the object it should
 * resolve to) which every call starts from. It is only read, never added to.
 * @param options.useClone
 */
const mergeObjectsBase = ({
  depthLimit = -1,
  map = [],
  useClone = false
} = {}) => {
  const merge = (visited, depth, objects) => {
    const firstObject = useClone ? Array.isArray(objects[0]) ? [] : {} : objects.shift();
    if (objects.length < 1) {
      return firstObject;
    }
    if (depth === 0) {
      return firstObject;
    }
    return objects.reduce((newObj, arg) => {
      if (!arg) {
        return newObj;
      }
      if (!visited.has(arg)) {
        visited.set(arg, newObj);
      }
      return (0, _reduceObject.default)(arg, (returnObj, value, key) => {
        if ((0, _isCloneable.default)(value)) {
          if (visited.has(value)) {
            return (0, _setValue.default)(key, visited.get(value), returnObj);
          }
          let objectValue = newObj[key];
          if (!(0, _isCloneable.default)(objectValue) || !objectValue) {
            if (!useClone) {
              // Merging by reference: the source object is used as it is, there is nothing to merge it into.
              visited.set(value, value);
              return (0, _setValue.default)(key, value, returnObj);
            }
            objectValue = Array.isArray(value) ? [] : {};
          }
          return (0, _setValue.default)(key, merge(visited, depth - 1, [objectValue, value]), returnObj);
        }
        return (0, _setValue.default)(key, value, returnObj);
      }, newObj);
    }, firstObject || {});
  };
  return (...objects) => merge(new Map(map.map(({
    source,
    object
  }) => [source, object])), depthLimit, objects);
};
var _default = exports.default = mergeObjectsBase;
},{"./isCloneable":392,"./reduceObject":402,"./setValue":404,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217,"core-js/modules/esnext.iterator.reduce.js":218,"core-js/modules/esnext.map.delete-all.js":220,"core-js/modules/esnext.map.every.js":221,"core-js/modules/esnext.map.filter.js":222,"core-js/modules/esnext.map.find-key.js":223,"core-js/modules/esnext.map.find.js":224,"core-js/modules/esnext.map.includes.js":225,"core-js/modules/esnext.map.key-of.js":226,"core-js/modules/esnext.map.map-keys.js":227,"core-js/modules/esnext.map.map-values.js":228,"core-js/modules/esnext.map.merge.js":229,"core-js/modules/esnext.map.reduce.js":230,"core-js/modules/esnext.map.some.js":231,"core-js/modules/esnext.map.update.js":232}],399:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mergeObjectsBase = _interopRequireDefault(require("./mergeObjectsBase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param objects - Provide a list of objects which will be merged starting from the end up into the first
 */
const mergeObjectsMutable = (0, _mergeObjectsBase.default)();
var _default = exports.default = mergeObjectsMutable;
},{"./mergeObjectsBase":398}],400:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject = _interopRequireDefault(require("./isObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @param object
 * @param includeInherited
 */
const objectKeys = (object, includeInherited = false) => {
  if (typeof object !== 'function' && !(0, _isObject.default)(object)) {
    return [];
  }
  if (includeInherited) {
    const propNames = Object.getOwnPropertyNames(object);
    if (propNames.length) {
      return propNames;
    }
  }
  const keys = [];
  for (const key in object) {
    if (includeInherited || Object.prototype.hasOwnProperty.call(object, key)) {
      if (Array.isArray(object)) {
        keys.push(parseInt(key));
        continue;
      }
      keys.push(key);
    }
  }
  return keys;
};
var _default = exports.default = objectKeys;
},{"./isObject":395}],401:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _objectKeys = _interopRequireDefault(require("./objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Get an array of values from any object or array. Will return empty array when invalid or there are no values.
 * Optional flag will include the inherited values from prototype chain when set.
 * @param object
 * @param includeInherited
 */
const objectValues = (object, includeInherited = false) => (0, _objectKeys.default)(object, includeInherited).map(key => object[key]);
var _default = exports.default = objectValues;
},{"./objectKeys":400,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.map.js":217}],402:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _callWithParams = _interopRequireDefault(require("../functions/callWithParams"));
var _objectKeys = _interopRequireDefault(require("./objectKeys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
 * If an array is passed in instead then it will perform standard reduce(). It is recommended to
 * always use the standard reduce() function when it is known that the object is actually an array.
 * @param obj - The Object (or Array) to be filtered
 * @param fn - The function to be processed for each filtered property
 * @param initialValue - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 */
const reduceObject = (obj, fn, initialValue = obj[(0, _objectKeys.default)(obj)[0]] || obj[0]) => Array.isArray(obj) ? obj.reduce(fn, initialValue) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => (0, _callWithParams.default)(fn, [newObj, obj[curr], curr, obj], 2), initialValue);
var _default = exports.default = reduceObject;
},{"../functions/callWithParams":363,"./objectKeys":400,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],403:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Set a value on an item, then return the value
 * @param item - An object or array to be updated
 * @param key - The key on the item which will have its value set
 * @param value - Any value to be applied to the key
 */
const setAndReturnValue = (item, key, value) => {
  item[key] = value;
  return value;
};
var _default = exports.default = setAndReturnValue;
},{}],404:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Set a value on an item, then return the item.
 * NOTE: Argument order designed for usage with pipe
 * @param key - The key on the item which will have its value set
 * @param value - Any value to be applied to the key
 * @param item - An object or array to be updated
 */
const setValue = (key, value, item) => {
  // @ts-ignore
  item[key] = value;
  return item;
};
var _default = exports.default = setValue;
},{}],405:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "camelCase", {
  enumerable: true,
  get: function () {
    return _camelCase.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "kabobCase", {
  enumerable: true,
  get: function () {
    return _kabobCase.default;
  }
});
Object.defineProperty(exports, "makeFilepath", {
  enumerable: true,
  get: function () {
    return _makeFilepath.default;
  }
});
Object.defineProperty(exports, "makeRelativePath", {
  enumerable: true,
  get: function () {
    return _makeRelativePath.default;
  }
});
Object.defineProperty(exports, "regexEscape", {
  enumerable: true,
  get: function () {
    return _regexEscape.default;
  }
});
Object.defineProperty(exports, "snakeCase", {
  enumerable: true,
  get: function () {
    return _snakeCase.default;
  }
});
Object.defineProperty(exports, "strAfter", {
  enumerable: true,
  get: function () {
    return _strAfter.default;
  }
});
Object.defineProperty(exports, "strAfterLast", {
  enumerable: true,
  get: function () {
    return _strAfterLast.default;
  }
});
Object.defineProperty(exports, "strBefore", {
  enumerable: true,
  get: function () {
    return _strBefore.default;
  }
});
Object.defineProperty(exports, "strBeforeLast", {
  enumerable: true,
  get: function () {
    return _strBeforeLast.default;
  }
});
Object.defineProperty(exports, "titleCase", {
  enumerable: true,
  get: function () {
    return _titleCase.default;
  }
});
Object.defineProperty(exports, "ucFirst", {
  enumerable: true,
  get: function () {
    return _ucFirst.default;
  }
});
Object.defineProperty(exports, "words", {
  enumerable: true,
  get: function () {
    return _words.default;
  }
});
var _camelCase = _interopRequireDefault(require("./strings/camelCase"));
var _kabobCase = _interopRequireDefault(require("./strings/kabobCase"));
var _makeFilepath = _interopRequireDefault(require("./strings/makeFilepath"));
var _makeRelativePath = _interopRequireDefault(require("./strings/makeRelativePath"));
var _regexEscape = _interopRequireDefault(require("./strings/regexEscape"));
var _snakeCase = _interopRequireDefault(require("./strings/snakeCase"));
var _strAfter = _interopRequireDefault(require("./strings/strAfter"));
var _strAfterLast = _interopRequireDefault(require("./strings/strAfterLast"));
var _strBefore = _interopRequireDefault(require("./strings/strBefore"));
var _strBeforeLast = _interopRequireDefault(require("./strings/strBeforeLast"));
var _titleCase = _interopRequireDefault(require("./strings/titleCase"));
var _ucFirst = _interopRequireDefault(require("./strings/ucFirst"));
var _words = _interopRequireDefault(require("./strings/words"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Manage how strings are manipulated with these utilities.
 */
var _default = exports.default = {
  camelCase: _camelCase.default,
  kabobCase: _kabobCase.default,
  makeFilepath: _makeFilepath.default,
  makeRelativePath: _makeRelativePath.default,
  regexEscape: _regexEscape.default,
  snakeCase: _snakeCase.default,
  strAfter: _strAfter.default,
  strAfterLast: _strAfterLast.default,
  strBefore: _strBefore.default,
  strBeforeLast: _strBeforeLast.default,
  titleCase: _titleCase.default,
  ucFirst: _ucFirst.default,
  words: _words.default
};
},{"./strings/camelCase":406,"./strings/kabobCase":407,"./strings/makeFilepath":408,"./strings/makeRelativePath":409,"./strings/regexEscape":410,"./strings/snakeCase":411,"./strings/strAfter":412,"./strings/strAfterLast":413,"./strings/strBefore":414,"./strings/strBeforeLast":415,"./strings/titleCase":416,"./strings/ucFirst":417,"./strings/words":418}],406:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _ucFirst = _interopRequireDefault(require("./ucFirst"));
var _words = _interopRequireDefault(require("./words"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Given a string in kebab-case, snake_case or 'Sentence case', convert to camelCase.
 * @param str - The string to convert.
 */
const camelCase = str => (0, _words.default)(str).reduce((camel, part) => camel ? camel.concat((0, _ucFirst.default)(part)) : part.toLowerCase(), '');
var _default = exports.default = camelCase;
},{"./ucFirst":417,"./words":418,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],407:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _words = _interopRequireDefault(require("./words"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Given a string in snake_case, camelCase or 'Sentence case', convert to kabob-case.
 * @param str - The string to convert.
 */
const kabobCase = str => (0, _words.default)(str).reduce((kabob, part) => kabob ? kabob.concat('-' + part.toLowerCase()) : part.toLowerCase(), '');
var _default = exports.default = kabobCase;
},{"./words":418,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],408:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFilepath = exports.default = void 0;
var _strBeforeLast = _interopRequireDefault(require("./strBeforeLast"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Format the given path so that it does not have trailing slashes and also correctly appends a path.
 * @param root - The base path to start from.
 * @param append - A path to append to `root` - may itself use `./` or `../` segments.
 */
const makeFilepath = (root, append = '') => {
  if (root.startsWith('./')) {
    root = root.slice(2);
  }
  if (root.startsWith('/')) {
    root = root.slice(1);
  }
  if (root.endsWith('/')) {
    root = root.slice(0, -1);
  }
  if (append.startsWith('/')) {
    append = append.slice(1);
  }
  if (append.startsWith('./')) {
    append = append.slice(2);
  }
  if (append.startsWith('../')) {
    if (!root) {
      return append.endsWith('/') ? append.slice(0, -1) : append;
    }
    append = append.slice(3);
    root = (0, _strBeforeLast.default)(root, '/');
    return makeFilepath(root, append);
  }
  if (append.endsWith('/')) {
    append = append.slice(0, -1);
  }
  if (!root) {
    return append;
  }
  return append ? `${root}/${append}` : root;
};
exports.makeFilepath = makeFilepath;
var _default = exports.default = makeFilepath;
},{"./strBeforeLast":415}],409:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRelativePath = exports.default = void 0;
var _strBefore = _interopRequireDefault(require("./strBefore"));
var _strAfter = _interopRequireDefault(require("./strAfter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Compare two file paths and simplify them to a relative path.
 * @param fromFile - The path of the file the resulting relative path will be used from.
 * @param toFile - The path of the file being referenced.
 * @returns `toFile` expressed relative to `fromFile`.
 */
const makeRelativePath = (fromFile, toFile) => {
  let relativePath = toFile;
  let nextPart = fromFile;
  let firstPart = (0, _strBefore.default)(nextPart, '/');
  let hasMatches = false;
  while (firstPart && relativePath.startsWith(firstPart)) {
    relativePath = (0, _strAfter.default)(relativePath, `${firstPart}/`);
    nextPart = (0, _strAfter.default)(nextPart, `${firstPart}/`);
    firstPart = (0, _strBefore.default)(nextPart, '/');
    hasMatches = true;
  }
  if (!hasMatches) {
    // No similar base paths, use the path as-is
    return relativePath;
  }
  let relativePrefix = '';
  const nextParts = nextPart.split('/');
  if (nextParts.length < 2) {
    relativePrefix = './';
  }
  for (let i = 1; i < nextParts.length; ++i) {
    relativePrefix += '../';
  }
  return relativePrefix + relativePath;
};
exports.makeRelativePath = makeRelativePath;
var _default = exports.default = makeRelativePath;
},{"./strAfter":412,"./strBefore":414}],410:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexEscape = exports.default = void 0;
/**
 * Take a string and escape the regex characters.
 * @param str - The string to escape, so it can be used literally inside a `RegExp`.
 */
const regexEscape = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
exports.regexEscape = regexEscape;
var _default = exports.default = regexEscape;
},{}],411:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _words = _interopRequireDefault(require("./words"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Given a string in kebab-case, camelCase or 'Sentence case', convert to snake_case.
 * @param str - The string to convert.
 */
const snakeCase = str => (0, _words.default)(str).reduce((snake, part) => snake ? snake.concat('_' + part.toLowerCase()) : part.toLowerCase(), '');
var _default = exports.default = snakeCase;
},{"./words":418,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],412:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Retrieve the string part after the search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` after the first occurrence of `search`, or `''` if not found.
 */
const strAfter = (str, search) => {
  const index = str.indexOf(search);
  return index === -1 ? '' : str.substring(index + search.length);
};
var _default = exports.default = strAfter;
},{}],413:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Retrieve the string part after the last search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` after the last occurrence of `search`, or `''` if not found.
 */
const strAfterLast = (str, search) => {
  const index = str.lastIndexOf(search);
  return index === -1 ? '' : str.substring(index + search.length);
};
var _default = exports.default = strAfterLast;
},{}],414:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Retrieve the string part before the search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` before the first occurrence of `search`, or `''` if not found.
 */
const strBefore = (str, search) => {
  const index = str.indexOf(search);
  return index === -1 ? '' : str.slice(0, index);
};
var _default = exports.default = strBefore;
},{}],415:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Retrieve the string part before the last search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` before the last occurrence of `search`, or `''` if not found.
 */
const strBeforeLast = (str, search) => {
  const index = str.lastIndexOf(search);
  return index === -1 ? '' : str.substring(0, index);
};
var _default = exports.default = strBeforeLast;
},{}],416:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _ucFirst = _interopRequireDefault(require("./ucFirst"));
var _words = _interopRequireDefault(require("./words"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Given a string in kebab-case, snake_case, camelCase or 'Sentence case', convert to 'Title Case'.
 * @param str - The string to convert.
 */
const titleCase = str => (0, _words.default)(str).reduce((title, part) => title ? title.concat(' ' + (0, _ucFirst.default)(part)) : (0, _ucFirst.default)(part), '');
var _default = exports.default = titleCase;
},{"./ucFirst":417,"./words":418,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.reduce.js":218}],417:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @param str - The string to convert.
 */
const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
var _default = exports.default = ucFirst;
},{}],418:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Split a string into sets of numbers or letters - the shared tokenizer behind camelCase/kabobCase/snakeCase/
 * titleCase, so each can rebuild the string in its own casing style.
 * @param str - The string to split.
 */
const words = str => str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g);
var _default = exports.default = words;
},{}],419:[function(require,module,exports){
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.weak-map.delete-all.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _arrays = _interopRequireWildcard(require("./helpers/arrays"));
Object.keys(_arrays).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _arrays[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _arrays[key];
    }
  });
});
var _descriptors = _interopRequireWildcard(require("./helpers/descriptors"));
Object.keys(_descriptors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _descriptors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptors[key];
    }
  });
});
var _functions = _interopRequireWildcard(require("./helpers/functions"));
Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _functions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _functions[key];
    }
  });
});
var _numbers = _interopRequireWildcard(require("./helpers/numbers"));
Object.keys(_numbers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _numbers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _numbers[key];
    }
  });
});
var _objects = _interopRequireWildcard(require("./helpers/objects"));
Object.keys(_objects).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _objects[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _objects[key];
    }
  });
});
var _strings = _interopRequireWildcard(require("./helpers/strings"));
Object.keys(_strings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _strings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _strings[key];
    }
  });
});
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * All the siFunciona system functions for stringing together functions and simplifying logic.
 */

// Every function is available by name (import { curry } from 'si-funciona', require('si-funciona').curry) ...

// ... and all together on the default export (import siFunciona from 'si-funciona', require('si-funciona').default)
const siFunciona = Object.assign({}, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default, _strings.default);
var _default = exports.default = siFunciona;
if (void 0) {
  // @ts-ignore
  (void 0)['siFunciona'] = siFunciona;
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window['siFunciona'] = siFunciona;
}
},{"./helpers/arrays":341,"./helpers/descriptors":349,"./helpers/functions":362,"./helpers/numbers":374,"./helpers/objects":384,"./helpers/strings":405,"core-js/modules/esnext.iterator.constructor.js":211,"core-js/modules/esnext.iterator.for-each.js":216,"core-js/modules/esnext.weak-map.delete-all.js":249}]},{},[38])(38)
});
