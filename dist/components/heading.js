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