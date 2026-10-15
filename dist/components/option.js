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