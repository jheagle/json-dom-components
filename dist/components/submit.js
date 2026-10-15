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