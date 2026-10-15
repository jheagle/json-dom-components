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