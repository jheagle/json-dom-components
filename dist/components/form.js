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