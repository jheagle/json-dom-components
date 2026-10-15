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