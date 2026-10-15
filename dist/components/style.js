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