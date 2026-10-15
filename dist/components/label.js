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