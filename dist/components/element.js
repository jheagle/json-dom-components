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