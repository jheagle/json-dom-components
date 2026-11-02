"use strict";
var jsonDomComponents = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // js-build-tools-inject:process
  var init_process = __esm({
    "js-build-tools-inject:process"() {
    }
  });

  // node_modules/core-js/internals/global-this.js
  var require_global_this = __commonJS({
    "node_modules/core-js/internals/global-this.js"(exports, module) {
      "use strict";
      init_process();
      var check = function(it) {
        return it && it.Math === Math && it;
      };
      module.exports = // eslint-disable-next-line es/no-global-this -- safe
      check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
      check(typeof self == "object" && self) || check(typeof globalThis == "object" && globalThis) || check(typeof exports == "object" && exports) || // eslint-disable-next-line no-new-func -- fallback
      /* @__PURE__ */ (function() {
        return this;
      })() || Function("return this")();
    }
  });

  // node_modules/core-js/internals/fails.js
  var require_fails = __commonJS({
    "node_modules/core-js/internals/fails.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };
    }
  });

  // node_modules/core-js/internals/descriptors.js
  var require_descriptors = __commonJS({
    "node_modules/core-js/internals/descriptors.js"(exports, module) {
      "use strict";
      init_process();
      var fails = require_fails();
      module.exports = !fails(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }
  });

  // node_modules/core-js/internals/function-bind-native.js
  var require_function_bind_native = __commonJS({
    "node_modules/core-js/internals/function-bind-native.js"(exports, module) {
      "use strict";
      init_process();
      var fails = require_fails();
      module.exports = !fails(function() {
        var test = function() {
        }.bind();
        return typeof test != "function" || test.hasOwnProperty("prototype");
      });
    }
  });

  // node_modules/core-js/internals/function-call.js
  var require_function_call = __commonJS({
    "node_modules/core-js/internals/function-call.js"(exports, module) {
      "use strict";
      init_process();
      var NATIVE_BIND = require_function_bind_native();
      var call = Function.prototype.call;
      module.exports = NATIVE_BIND ? call.bind(call) : function() {
        return call.apply(call, arguments);
      };
    }
  });

  // node_modules/core-js/internals/object-property-is-enumerable.js
  var require_object_property_is_enumerable = __commonJS({
    "node_modules/core-js/internals/object-property-is-enumerable.js"(exports) {
      "use strict";
      init_process();
      var $propertyIsEnumerable = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
      exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      } : $propertyIsEnumerable;
    }
  });

  // node_modules/core-js/internals/create-property-descriptor.js
  var require_create_property_descriptor = __commonJS({
    "node_modules/core-js/internals/create-property-descriptor.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value
        };
      };
    }
  });

  // node_modules/core-js/internals/function-uncurry-this.js
  var require_function_uncurry_this = __commonJS({
    "node_modules/core-js/internals/function-uncurry-this.js"(exports, module) {
      "use strict";
      init_process();
      var NATIVE_BIND = require_function_bind_native();
      var FunctionPrototype = Function.prototype;
      var call = FunctionPrototype.call;
      var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
      module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
        return function() {
          return call.apply(fn, arguments);
        };
      };
    }
  });

  // node_modules/core-js/internals/classof-raw.js
  var require_classof_raw = __commonJS({
    "node_modules/core-js/internals/classof-raw.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var toString = uncurryThis({}.toString);
      var stringSlice = uncurryThis("".slice);
      module.exports = function(it) {
        return stringSlice(toString(it), 8, -1);
      };
    }
  });

  // node_modules/core-js/internals/indexed-object.js
  var require_indexed_object = __commonJS({
    "node_modules/core-js/internals/indexed-object.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var fails = require_fails();
      var classof = require_classof_raw();
      var $Object = Object;
      var split = uncurryThis("".split);
      module.exports = fails(function() {
        return !$Object("z").propertyIsEnumerable(0);
      }) ? function(it) {
        return classof(it) === "String" ? split(it, "") : $Object(it);
      } : $Object;
    }
  });

  // node_modules/core-js/internals/is-null-or-undefined.js
  var require_is_null_or_undefined = __commonJS({
    "node_modules/core-js/internals/is-null-or-undefined.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(it) {
        return it === null || it === void 0;
      };
    }
  });

  // node_modules/core-js/internals/require-object-coercible.js
  var require_require_object_coercible = __commonJS({
    "node_modules/core-js/internals/require-object-coercible.js"(exports, module) {
      "use strict";
      init_process();
      var isNullOrUndefined = require_is_null_or_undefined();
      var $TypeError = TypeError;
      module.exports = function(it) {
        if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
        return it;
      };
    }
  });

  // node_modules/core-js/internals/to-indexed-object.js
  var require_to_indexed_object = __commonJS({
    "node_modules/core-js/internals/to-indexed-object.js"(exports, module) {
      "use strict";
      init_process();
      var IndexedObject = require_indexed_object();
      var requireObjectCoercible = require_require_object_coercible();
      module.exports = function(it) {
        return IndexedObject(requireObjectCoercible(it));
      };
    }
  });

  // node_modules/core-js/internals/is-callable.js
  var require_is_callable = __commonJS({
    "node_modules/core-js/internals/is-callable.js"(exports, module) {
      "use strict";
      init_process();
      var documentAll = typeof document == "object" && document.all;
      module.exports = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
        return typeof argument == "function" || argument === documentAll;
      } : function(argument) {
        return typeof argument == "function";
      };
    }
  });

  // node_modules/core-js/internals/is-object.js
  var require_is_object = __commonJS({
    "node_modules/core-js/internals/is-object.js"(exports, module) {
      "use strict";
      init_process();
      var isCallable = require_is_callable();
      module.exports = function(it) {
        return typeof it == "object" ? it !== null : isCallable(it);
      };
    }
  });

  // node_modules/core-js/internals/get-built-in.js
  var require_get_built_in = __commonJS({
    "node_modules/core-js/internals/get-built-in.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var isCallable = require_is_callable();
      var aFunction = function(argument) {
        return isCallable(argument) ? argument : void 0;
      };
      module.exports = function(namespace, method) {
        return arguments.length < 2 ? aFunction(globalThis2[namespace]) : globalThis2[namespace] && globalThis2[namespace][method];
      };
    }
  });

  // node_modules/core-js/internals/object-is-prototype-of.js
  var require_object_is_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-is-prototype-of.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      module.exports = uncurryThis({}.isPrototypeOf);
    }
  });

  // node_modules/core-js/internals/environment-user-agent.js
  var require_environment_user_agent = __commonJS({
    "node_modules/core-js/internals/environment-user-agent.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var navigator = globalThis2.navigator;
      var userAgent = navigator && navigator.userAgent;
      module.exports = userAgent ? String(userAgent) : "";
    }
  });

  // node_modules/core-js/internals/environment-v8-version.js
  var require_environment_v8_version = __commonJS({
    "node_modules/core-js/internals/environment-v8-version.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var userAgent = require_environment_user_agent();
      var process = globalThis2.process;
      var Deno = globalThis2.Deno;
      var versions = process && process.versions || Deno && Deno.version;
      var v8 = versions && versions.v8;
      var match;
      var version;
      if (v8) {
        match = v8.split(".");
        version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
      }
      if (!version && userAgent) {
        match = userAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
          match = userAgent.match(/Chrome\/(\d+)/);
          if (match) version = +match[1];
        }
      }
      module.exports = version;
    }
  });

  // node_modules/core-js/internals/symbol-constructor-detection.js
  var require_symbol_constructor_detection = __commonJS({
    "node_modules/core-js/internals/symbol-constructor-detection.js"(exports, module) {
      "use strict";
      init_process();
      var V8_VERSION = require_environment_v8_version();
      var fails = require_fails();
      var globalThis2 = require_global_this();
      var $String = globalThis2.String;
      module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
        var symbol = /* @__PURE__ */ Symbol("symbol detection");
        return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION && V8_VERSION < 41;
      });
    }
  });

  // node_modules/core-js/internals/use-symbol-as-uid.js
  var require_use_symbol_as_uid = __commonJS({
    "node_modules/core-js/internals/use-symbol-as-uid.js"(exports, module) {
      "use strict";
      init_process();
      var NATIVE_SYMBOL = require_symbol_constructor_detection();
      module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }
  });

  // node_modules/core-js/internals/is-symbol.js
  var require_is_symbol = __commonJS({
    "node_modules/core-js/internals/is-symbol.js"(exports, module) {
      "use strict";
      init_process();
      var getBuiltIn = require_get_built_in();
      var isCallable = require_is_callable();
      var isPrototypeOf = require_object_is_prototype_of();
      var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
      var $Object = Object;
      module.exports = USE_SYMBOL_AS_UID ? function(it) {
        return typeof it == "symbol";
      } : function(it) {
        var $Symbol = getBuiltIn("Symbol");
        return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
      };
    }
  });

  // node_modules/core-js/internals/try-to-string.js
  var require_try_to_string = __commonJS({
    "node_modules/core-js/internals/try-to-string.js"(exports, module) {
      "use strict";
      init_process();
      var $String = String;
      module.exports = function(argument) {
        try {
          return $String(argument);
        } catch (error) {
          return "Object";
        }
      };
    }
  });

  // node_modules/core-js/internals/a-callable.js
  var require_a_callable = __commonJS({
    "node_modules/core-js/internals/a-callable.js"(exports, module) {
      "use strict";
      init_process();
      var isCallable = require_is_callable();
      var tryToString = require_try_to_string();
      var $TypeError = TypeError;
      module.exports = function(argument) {
        if (isCallable(argument)) return argument;
        throw new $TypeError(tryToString(argument) + " is not a function");
      };
    }
  });

  // node_modules/core-js/internals/get-method.js
  var require_get_method = __commonJS({
    "node_modules/core-js/internals/get-method.js"(exports, module) {
      "use strict";
      init_process();
      var aCallable = require_a_callable();
      var isNullOrUndefined = require_is_null_or_undefined();
      module.exports = function(V, P) {
        var func = V[P];
        return isNullOrUndefined(func) ? void 0 : aCallable(func);
      };
    }
  });

  // node_modules/core-js/internals/ordinary-to-primitive.js
  var require_ordinary_to_primitive = __commonJS({
    "node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      var isCallable = require_is_callable();
      var isObject = require_is_object();
      var $TypeError = TypeError;
      module.exports = function(input, pref) {
        var fn, val;
        if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
        if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
        if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
        throw new $TypeError("Can't convert object to primitive value");
      };
    }
  });

  // node_modules/core-js/internals/is-pure.js
  var require_is_pure = __commonJS({
    "node_modules/core-js/internals/is-pure.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = false;
    }
  });

  // node_modules/core-js/internals/define-global-property.js
  var require_define_global_property = __commonJS({
    "node_modules/core-js/internals/define-global-property.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var defineProperty = Object.defineProperty;
      module.exports = function(key, value) {
        try {
          defineProperty(globalThis2, key, { value, configurable: true, writable: true });
        } catch (error) {
          globalThis2[key] = value;
        }
        return value;
      };
    }
  });

  // node_modules/core-js/internals/shared-store.js
  var require_shared_store = __commonJS({
    "node_modules/core-js/internals/shared-store.js"(exports, module) {
      "use strict";
      init_process();
      var IS_PURE = require_is_pure();
      var globalThis2 = require_global_this();
      var defineGlobalProperty = require_define_global_property();
      var SHARED = "__core-js_shared__";
      var store = module.exports = globalThis2[SHARED] || defineGlobalProperty(SHARED, {});
      (store.versions || (store.versions = [])).push({
        version: "3.51.0",
        mode: IS_PURE ? "pure" : "global",
        copyright: "\xA9 2013\u20132025 Denis Pushkarev (zloirock.ru), 2025\u20132026 CoreJS Company (core-js.io). All rights reserved.",
        license: "https://github.com/zloirock/core-js/blob/v3.51.0/LICENSE",
        source: "https://github.com/zloirock/core-js"
      });
    }
  });

  // node_modules/core-js/internals/shared.js
  var require_shared = __commonJS({
    "node_modules/core-js/internals/shared.js"(exports, module) {
      "use strict";
      init_process();
      var store = require_shared_store();
      var create = Object.create || Object;
      module.exports = function(key, value) {
        return store[key] || (store[key] = value || create(null));
      };
    }
  });

  // node_modules/core-js/internals/to-object.js
  var require_to_object = __commonJS({
    "node_modules/core-js/internals/to-object.js"(exports, module) {
      "use strict";
      init_process();
      var requireObjectCoercible = require_require_object_coercible();
      var $Object = Object;
      module.exports = function(argument) {
        return $Object(requireObjectCoercible(argument));
      };
    }
  });

  // node_modules/core-js/internals/has-own-property.js
  var require_has_own_property = __commonJS({
    "node_modules/core-js/internals/has-own-property.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var toObject = require_to_object();
      var hasOwnProperty = uncurryThis({}.hasOwnProperty);
      module.exports = Object.hasOwn || function hasOwn(it, key) {
        return hasOwnProperty(toObject(it), key);
      };
    }
  });

  // node_modules/core-js/internals/uid.js
  var require_uid = __commonJS({
    "node_modules/core-js/internals/uid.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var id = 0;
      var postfix = Math.random();
      var toString = uncurryThis(1.1.toString);
      module.exports = function(key) {
        return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
      };
    }
  });

  // node_modules/core-js/internals/well-known-symbol.js
  var require_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/well-known-symbol.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var shared = require_shared();
      var hasOwn = require_has_own_property();
      var uid = require_uid();
      var NATIVE_SYMBOL = require_symbol_constructor_detection();
      var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
      var Symbol2 = globalThis2.Symbol;
      var WellKnownSymbolsStore = shared("wks");
      var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2["for"] || Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
      module.exports = function(name) {
        if (!hasOwn(WellKnownSymbolsStore, name)) {
          WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol2, name) ? Symbol2[name] : createWellKnownSymbol("Symbol." + name);
        }
        return WellKnownSymbolsStore[name];
      };
    }
  });

  // node_modules/core-js/internals/to-primitive.js
  var require_to_primitive = __commonJS({
    "node_modules/core-js/internals/to-primitive.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      var isObject = require_is_object();
      var isSymbol = require_is_symbol();
      var getMethod = require_get_method();
      var ordinaryToPrimitive = require_ordinary_to_primitive();
      var wellKnownSymbol = require_well_known_symbol();
      var $TypeError = TypeError;
      var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
      module.exports = function(input, pref) {
        if (!isObject(input) || isSymbol(input)) return input;
        var exoticToPrim = getMethod(input, TO_PRIMITIVE);
        var result;
        if (exoticToPrim) {
          if (pref === void 0) pref = "default";
          result = call(exoticToPrim, input, pref);
          if (!isObject(result) || isSymbol(result)) return result;
          throw new $TypeError("Can't convert object to primitive value");
        }
        if (pref === void 0) pref = "number";
        return ordinaryToPrimitive(input, pref);
      };
    }
  });

  // node_modules/core-js/internals/to-property-key.js
  var require_to_property_key = __commonJS({
    "node_modules/core-js/internals/to-property-key.js"(exports, module) {
      "use strict";
      init_process();
      var toPrimitive = require_to_primitive();
      var isSymbol = require_is_symbol();
      module.exports = function(argument) {
        var key = toPrimitive(argument, "string");
        return isSymbol(key) ? key : key + "";
      };
    }
  });

  // node_modules/core-js/internals/document-create-element.js
  var require_document_create_element = __commonJS({
    "node_modules/core-js/internals/document-create-element.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var isObject = require_is_object();
      var document2 = globalThis2.document;
      var EXISTS = isObject(document2) && isObject(document2.createElement);
      module.exports = function(it) {
        return EXISTS ? document2.createElement(it) : {};
      };
    }
  });

  // node_modules/core-js/internals/ie8-dom-define.js
  var require_ie8_dom_define = __commonJS({
    "node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var fails = require_fails();
      var createElement = require_document_create_element();
      module.exports = !DESCRIPTORS && !fails(function() {
        return Object.defineProperty(createElement("div"), "a", {
          get: function() {
            return 7;
          }
        }).a !== 7;
      });
    }
  });

  // node_modules/core-js/internals/object-get-own-property-descriptor.js
  var require_object_get_own_property_descriptor = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-descriptor.js"(exports) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var call = require_function_call();
      var propertyIsEnumerableModule = require_object_property_is_enumerable();
      var createPropertyDescriptor = require_create_property_descriptor();
      var toIndexedObject = require_to_indexed_object();
      var toPropertyKey = require_to_property_key();
      var hasOwn = require_has_own_property();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPropertyKey(P);
        if (IE8_DOM_DEFINE) try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error) {
        }
        if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
      };
    }
  });

  // node_modules/core-js/internals/v8-prototype-define-bug.js
  var require_v8_prototype_define_bug = __commonJS({
    "node_modules/core-js/internals/v8-prototype-define-bug.js"(exports, module) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var fails = require_fails();
      module.exports = DESCRIPTORS && fails(function() {
        return Object.defineProperty(function() {
        }, "prototype", {
          value: 42,
          writable: false
        }).prototype !== 42;
      });
    }
  });

  // node_modules/core-js/internals/an-object.js
  var require_an_object = __commonJS({
    "node_modules/core-js/internals/an-object.js"(exports, module) {
      "use strict";
      init_process();
      var isObject = require_is_object();
      var $String = String;
      var $TypeError = TypeError;
      module.exports = function(argument) {
        if (isObject(argument)) return argument;
        throw new $TypeError($String(argument) + " is not an object");
      };
    }
  });

  // node_modules/core-js/internals/object-define-property.js
  var require_object_define_property = __commonJS({
    "node_modules/core-js/internals/object-define-property.js"(exports) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
      var anObject = require_an_object();
      var toPropertyKey = require_to_property_key();
      var $TypeError = TypeError;
      var $defineProperty = Object.defineProperty;
      var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var ENUMERABLE = "enumerable";
      var CONFIGURABLE = "configurable";
      var WRITABLE = "writable";
      exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
          var current = $getOwnPropertyDescriptor(O, P);
          if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
              enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
              writable: false
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      } : $defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
        }
        if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };
    }
  });

  // node_modules/core-js/internals/create-non-enumerable-property.js
  var require_create_non_enumerable_property = __commonJS({
    "node_modules/core-js/internals/create-non-enumerable-property.js"(exports, module) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var definePropertyModule = require_object_define_property();
      var createPropertyDescriptor = require_create_property_descriptor();
      module.exports = DESCRIPTORS ? function(object, key, value) {
        return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
      } : function(object, key, value) {
        object[key] = value;
        return object;
      };
    }
  });

  // node_modules/core-js/internals/function-name.js
  var require_function_name = __commonJS({
    "node_modules/core-js/internals/function-name.js"(exports, module) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var hasOwn = require_has_own_property();
      var FunctionPrototype = Function.prototype;
      var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
      var EXISTS = hasOwn(FunctionPrototype, "name");
      var PROPER = EXISTS && function something() {
      }.name === "something";
      var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
      module.exports = {
        EXISTS,
        PROPER,
        CONFIGURABLE
      };
    }
  });

  // node_modules/core-js/internals/inspect-source.js
  var require_inspect_source = __commonJS({
    "node_modules/core-js/internals/inspect-source.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var isCallable = require_is_callable();
      var store = require_shared_store();
      var functionToString = uncurryThis(Function.toString);
      if (!isCallable(store.inspectSource)) {
        store.inspectSource = function(it) {
          return functionToString(it);
        };
      }
      module.exports = store.inspectSource;
    }
  });

  // node_modules/core-js/internals/weak-map-basic-detection.js
  var require_weak_map_basic_detection = __commonJS({
    "node_modules/core-js/internals/weak-map-basic-detection.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var isCallable = require_is_callable();
      var WeakMap2 = globalThis2.WeakMap;
      module.exports = isCallable(WeakMap2) && /native code/.test(String(WeakMap2));
    }
  });

  // node_modules/core-js/internals/shared-key.js
  var require_shared_key = __commonJS({
    "node_modules/core-js/internals/shared-key.js"(exports, module) {
      "use strict";
      init_process();
      var shared = require_shared();
      var uid = require_uid();
      var keys = shared("keys");
      module.exports = function(key) {
        return keys[key] || (keys[key] = uid(key));
      };
    }
  });

  // node_modules/core-js/internals/hidden-keys.js
  var require_hidden_keys = __commonJS({
    "node_modules/core-js/internals/hidden-keys.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = {};
    }
  });

  // node_modules/core-js/internals/internal-state.js
  var require_internal_state = __commonJS({
    "node_modules/core-js/internals/internal-state.js"(exports, module) {
      "use strict";
      init_process();
      var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
      var globalThis2 = require_global_this();
      var isObject = require_is_object();
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var hasOwn = require_has_own_property();
      var shared = require_shared_store();
      var sharedKey = require_shared_key();
      var hiddenKeys = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var TypeError2 = globalThis2.TypeError;
      var WeakMap2 = globalThis2.WeakMap;
      var set;
      var get;
      var has;
      var enforce = function(it) {
        return has(it) ? get(it) : set(it, {});
      };
      var getterFor = function(TYPE) {
        return function(it) {
          var state;
          if (!isObject(it) || (state = get(it)).type !== TYPE) {
            throw new TypeError2("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared.state) {
        store = shared.state || (shared.state = new WeakMap2());
        store.get = store.get;
        store.has = store.has;
        store.set = store.set;
        set = function(it, metadata) {
          if (store.has(it)) throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          store.set(it, metadata);
          return metadata;
        };
        get = function(it) {
          return store.get(it) || {};
        };
        has = function(it) {
          return store.has(it);
        };
      } else {
        STATE = sharedKey("state");
        hiddenKeys[STATE] = true;
        set = function(it, metadata) {
          if (hasOwn(it, STATE)) throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          createNonEnumerableProperty(it, STATE, metadata);
          return metadata;
        };
        get = function(it) {
          return hasOwn(it, STATE) ? it[STATE] : {};
        };
        has = function(it) {
          return hasOwn(it, STATE);
        };
      }
      var store;
      var STATE;
      module.exports = {
        set,
        get,
        has,
        enforce,
        getterFor
      };
    }
  });

  // node_modules/core-js/internals/make-built-in.js
  var require_make_built_in = __commonJS({
    "node_modules/core-js/internals/make-built-in.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var fails = require_fails();
      var isCallable = require_is_callable();
      var hasOwn = require_has_own_property();
      var DESCRIPTORS = require_descriptors();
      var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
      var inspectSource = require_inspect_source();
      var InternalStateModule = require_internal_state();
      var enforceInternalState = InternalStateModule.enforce;
      var getInternalState = InternalStateModule.get;
      var $String = String;
      var defineProperty = Object.defineProperty;
      var stringSlice = uncurryThis("".slice);
      var replace = uncurryThis("".replace);
      var join = uncurryThis([].join);
      var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
        return defineProperty(function() {
        }, "length", { value: 8 }).length !== 8;
      });
      var TEMPLATE = String(String).split("String");
      var makeBuiltIn = module.exports = function(value, name, options) {
        if (stringSlice($String(name), 0, 7) === "Symbol(") {
          name = "[" + replace($String(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
        }
        if (options && options.getter) name = "get " + name;
        if (options && options.setter) name = "set " + name;
        if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
          if (DESCRIPTORS) defineProperty(value, "name", { value: name, configurable: true });
          else value.name = name;
        }
        if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
          defineProperty(value, "length", { value: options.arity });
        }
        try {
          if (options && hasOwn(options, "constructor") && options.constructor) {
            if (DESCRIPTORS) defineProperty(value, "prototype", { writable: false });
          } else if (value.prototype) value.prototype = void 0;
        } catch (error) {
        }
        var state = enforceInternalState(value);
        if (!hasOwn(state, "source")) {
          state.source = join(TEMPLATE, typeof name == "string" ? name : "");
        }
        return value;
      };
      Function.prototype.toString = makeBuiltIn(function toString() {
        return isCallable(this) && getInternalState(this).source || inspectSource(this);
      }, "toString");
    }
  });

  // node_modules/core-js/internals/define-built-in.js
  var require_define_built_in = __commonJS({
    "node_modules/core-js/internals/define-built-in.js"(exports, module) {
      "use strict";
      init_process();
      var isCallable = require_is_callable();
      var definePropertyModule = require_object_define_property();
      var makeBuiltIn = require_make_built_in();
      var defineGlobalProperty = require_define_global_property();
      module.exports = function(O, key, value, options) {
        if (!options) options = {};
        var simple = options.enumerable;
        var name = options.name !== void 0 ? options.name : key;
        if (isCallable(value)) makeBuiltIn(value, name, options);
        if (options.global) {
          if (simple) O[key] = value;
          else defineGlobalProperty(key, value);
        } else {
          try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
          } catch (error) {
          }
          if (simple) O[key] = value;
          else definePropertyModule.f(O, key, {
            value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          });
        }
        return O;
      };
    }
  });

  // node_modules/core-js/internals/math-trunc.js
  var require_math_trunc = __commonJS({
    "node_modules/core-js/internals/math-trunc.js"(exports, module) {
      "use strict";
      init_process();
      var ceil = Math.ceil;
      var floor = Math.floor;
      module.exports = Math.trunc || function trunc(x) {
        var n = +x;
        return (n > 0 ? floor : ceil)(n);
      };
    }
  });

  // node_modules/core-js/internals/to-integer-or-infinity.js
  var require_to_integer_or_infinity = __commonJS({
    "node_modules/core-js/internals/to-integer-or-infinity.js"(exports, module) {
      "use strict";
      init_process();
      var trunc = require_math_trunc();
      module.exports = function(argument) {
        var number = +argument;
        return number !== number || number === 0 ? 0 : trunc(number);
      };
    }
  });

  // node_modules/core-js/internals/to-absolute-index.js
  var require_to_absolute_index = __commonJS({
    "node_modules/core-js/internals/to-absolute-index.js"(exports, module) {
      "use strict";
      init_process();
      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var max = Math.max;
      var min = Math.min;
      module.exports = function(index, length) {
        var integer = toIntegerOrInfinity(index);
        return integer < 0 ? max(integer + length, 0) : min(integer, length);
      };
    }
  });

  // node_modules/core-js/internals/to-length.js
  var require_to_length = __commonJS({
    "node_modules/core-js/internals/to-length.js"(exports, module) {
      "use strict";
      init_process();
      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var min = Math.min;
      module.exports = function(argument) {
        var len = toIntegerOrInfinity(argument);
        return len > 0 ? min(len, 9007199254740991) : 0;
      };
    }
  });

  // node_modules/core-js/internals/length-of-array-like.js
  var require_length_of_array_like = __commonJS({
    "node_modules/core-js/internals/length-of-array-like.js"(exports, module) {
      "use strict";
      init_process();
      var toLength = require_to_length();
      module.exports = function(obj) {
        return toLength(obj.length);
      };
    }
  });

  // node_modules/core-js/internals/array-includes.js
  var require_array_includes = __commonJS({
    "node_modules/core-js/internals/array-includes.js"(exports, module) {
      "use strict";
      init_process();
      var toIndexedObject = require_to_indexed_object();
      var toAbsoluteIndex = require_to_absolute_index();
      var lengthOfArrayLike = require_length_of_array_like();
      var createMethod = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIndexedObject($this);
          var length = lengthOfArrayLike(O);
          if (length === 0) return !IS_INCLUDES && -1;
          var index = toAbsoluteIndex(fromIndex, length);
          var value;
          if (IS_INCLUDES && el !== el) while (length > index) {
            value = O[index++];
            if (value !== value) return true;
          }
          else for (; length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
          }
          return !IS_INCLUDES && -1;
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
    }
  });

  // node_modules/core-js/internals/object-keys-internal.js
  var require_object_keys_internal = __commonJS({
    "node_modules/core-js/internals/object-keys-internal.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var hasOwn = require_has_own_property();
      var toIndexedObject = require_to_indexed_object();
      var indexOf = require_array_includes().indexOf;
      var hiddenKeys = require_hidden_keys();
      var push = uncurryThis([].push);
      module.exports = function(object, names) {
        var O = toIndexedObject(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
        while (names.length > i) if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push(result, key);
        }
        return result;
      };
    }
  });

  // node_modules/core-js/internals/enum-bug-keys.js
  var require_enum_bug_keys = __commonJS({
    "node_modules/core-js/internals/enum-bug-keys.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf"
      ];
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names.js
  var require_object_get_own_property_names = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names.js"(exports) {
      "use strict";
      init_process();
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys = enumBugKeys.concat("length", "prototype");
      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return internalObjectKeys(O, hiddenKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-get-own-property-symbols.js
  var require_object_get_own_property_symbols = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-symbols.js"(exports) {
      "use strict";
      init_process();
      exports.f = Object.getOwnPropertySymbols;
    }
  });

  // node_modules/core-js/internals/own-keys.js
  var require_own_keys = __commonJS({
    "node_modules/core-js/internals/own-keys.js"(exports, module) {
      "use strict";
      init_process();
      var getBuiltIn = require_get_built_in();
      var uncurryThis = require_function_uncurry_this();
      var getOwnPropertyNamesModule = require_object_get_own_property_names();
      var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
      var anObject = require_an_object();
      var concat = uncurryThis([].concat);
      module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
        var keys = getOwnPropertyNamesModule.f(anObject(it));
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
      };
    }
  });

  // node_modules/core-js/internals/copy-constructor-properties.js
  var require_copy_constructor_properties = __commonJS({
    "node_modules/core-js/internals/copy-constructor-properties.js"(exports, module) {
      "use strict";
      init_process();
      var hasOwn = require_has_own_property();
      var ownKeys = require_own_keys();
      var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
      var definePropertyModule = require_object_define_property();
      module.exports = function(target, source, exceptions) {
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
    }
  });

  // node_modules/core-js/internals/is-forced.js
  var require_is_forced = __commonJS({
    "node_modules/core-js/internals/is-forced.js"(exports, module) {
      "use strict";
      init_process();
      var fails = require_fails();
      var isCallable = require_is_callable();
      var replacement = /#|\.prototype\./;
      var isForced = function(feature, detection) {
        var value = data[normalize(feature)];
        return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
      };
      var normalize = isForced.normalize = function(string) {
        return String(string).replace(replacement, ".").toLowerCase();
      };
      var data = isForced.data = {};
      var NATIVE = isForced.NATIVE = "N";
      var POLYFILL = isForced.POLYFILL = "P";
      module.exports = isForced;
    }
  });

  // node_modules/core-js/internals/export.js
  var require_export = __commonJS({
    "node_modules/core-js/internals/export.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var defineBuiltIn = require_define_built_in();
      var defineGlobalProperty = require_define_global_property();
      var copyConstructorProperties = require_copy_constructor_properties();
      var isForced = require_is_forced();
      module.exports = function(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = globalThis2;
        } else if (STATIC) {
          target = globalThis2[TARGET] || defineGlobalProperty(TARGET, {});
        } else {
          target = globalThis2[TARGET] && globalThis2[TARGET].prototype;
        }
        if (target) for (key in source) {
          sourceProperty = source[key];
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
          } else targetProperty = target[key];
          FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
          if (!FORCED && targetProperty !== void 0) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty(sourceProperty, "sham", true);
          }
          defineBuiltIn(target, key, sourceProperty, options);
        }
      };
    }
  });

  // node_modules/core-js/internals/an-instance.js
  var require_an_instance = __commonJS({
    "node_modules/core-js/internals/an-instance.js"(exports, module) {
      "use strict";
      init_process();
      var isPrototypeOf = require_object_is_prototype_of();
      var $TypeError = TypeError;
      module.exports = function(it, Prototype) {
        if (isPrototypeOf(Prototype, it)) return it;
        throw new $TypeError("Incorrect invocation");
      };
    }
  });

  // node_modules/core-js/internals/correct-prototype-getter.js
  var require_correct_prototype_getter = __commonJS({
    "node_modules/core-js/internals/correct-prototype-getter.js"(exports, module) {
      "use strict";
      init_process();
      var fails = require_fails();
      module.exports = !fails(function() {
        function F() {
        }
        F.prototype.constructor = null;
        return Object.getPrototypeOf(new F()) !== F.prototype;
      });
    }
  });

  // node_modules/core-js/internals/object-get-prototype-of.js
  var require_object_get_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-get-prototype-of.js"(exports, module) {
      "use strict";
      init_process();
      var hasOwn = require_has_own_property();
      var isCallable = require_is_callable();
      var toObject = require_to_object();
      var sharedKey = require_shared_key();
      var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
      var IE_PROTO = sharedKey("IE_PROTO");
      var $Object = Object;
      var ObjectPrototype = $Object.prototype;
      module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
        var object = toObject(O);
        if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
        var constructor = object.constructor;
        if (isCallable(constructor) && object instanceof constructor) {
          return constructor.prototype;
        }
        return object instanceof $Object ? ObjectPrototype : null;
      };
    }
  });

  // node_modules/core-js/internals/define-built-in-accessor.js
  var require_define_built_in_accessor = __commonJS({
    "node_modules/core-js/internals/define-built-in-accessor.js"(exports, module) {
      "use strict";
      init_process();
      var makeBuiltIn = require_make_built_in();
      var defineProperty = require_object_define_property();
      module.exports = function(target, name, descriptor) {
        if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
        if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
        return defineProperty.f(target, name, descriptor);
      };
    }
  });

  // node_modules/core-js/internals/create-property.js
  var require_create_property = __commonJS({
    "node_modules/core-js/internals/create-property.js"(exports, module) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var definePropertyModule = require_object_define_property();
      var createPropertyDescriptor = require_create_property_descriptor();
      module.exports = function(object, key, value) {
        if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
        else object[key] = value;
      };
    }
  });

  // node_modules/core-js/internals/object-keys.js
  var require_object_keys = __commonJS({
    "node_modules/core-js/internals/object-keys.js"(exports, module) {
      "use strict";
      init_process();
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      module.exports = Object.keys || function keys(O) {
        return internalObjectKeys(O, enumBugKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-define-properties.js
  var require_object_define_properties = __commonJS({
    "node_modules/core-js/internals/object-define-properties.js"(exports) {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
      var definePropertyModule = require_object_define_property();
      var anObject = require_an_object();
      var toIndexedObject = require_to_indexed_object();
      var objectKeys = require_object_keys();
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
    }
  });

  // node_modules/core-js/internals/html.js
  var require_html = __commonJS({
    "node_modules/core-js/internals/html.js"(exports, module) {
      "use strict";
      init_process();
      var getBuiltIn = require_get_built_in();
      module.exports = getBuiltIn("document", "documentElement");
    }
  });

  // node_modules/core-js/internals/object-create.js
  var require_object_create = __commonJS({
    "node_modules/core-js/internals/object-create.js"(exports, module) {
      "use strict";
      init_process();
      var anObject = require_an_object();
      var definePropertiesModule = require_object_define_properties();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys = require_hidden_keys();
      var html = require_html();
      var documentCreateElement = require_document_create_element();
      var sharedKey = require_shared_key();
      var GT = ">";
      var LT = "<";
      var PROTOTYPE = "prototype";
      var SCRIPT = "script";
      var IE_PROTO = sharedKey("IE_PROTO");
      var EmptyConstructor = function() {
      };
      var scriptTag = function(content) {
        return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
      };
      var NullProtoObjectViaActiveX = function(activeXDocument2) {
        activeXDocument2.write(scriptTag(""));
        activeXDocument2.close();
        var temp = activeXDocument2.parentWindow.Object;
        activeXDocument2 = null;
        return temp;
      };
      var NullProtoObjectViaIFrame = function() {
        var iframe = documentCreateElement("iframe");
        var JS = "java" + SCRIPT + ":";
        var iframeDocument;
        iframe.style.display = "none";
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag("document.F=Object"));
        iframeDocument.close();
        return iframeDocument.F;
      };
      var activeXDocument;
      var NullProtoObject = function() {
        try {
          activeXDocument = new ActiveXObject("htmlfile");
        } catch (error) {
        }
        NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
        var length = enumBugKeys.length;
        while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
        return NullProtoObject();
      };
      hiddenKeys[IE_PROTO] = true;
      module.exports = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE] = anObject(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE] = null;
          result[IE_PROTO] = O;
        } else result = NullProtoObject();
        return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
      };
    }
  });

  // node_modules/core-js/internals/iterators-core.js
  var require_iterators_core = __commonJS({
    "node_modules/core-js/internals/iterators-core.js"(exports, module) {
      "use strict";
      init_process();
      var fails = require_fails();
      var isCallable = require_is_callable();
      var isObject = require_is_object();
      var create = require_object_create();
      var getPrototypeOf = require_object_get_prototype_of();
      var defineBuiltIn = require_define_built_in();
      var wellKnownSymbol = require_well_known_symbol();
      var IS_PURE = require_is_pure();
      var ITERATOR = wellKnownSymbol("iterator");
      var BUGGY_SAFARI_ITERATORS = false;
      var IteratorPrototype;
      var PrototypeOfArrayIteratorPrototype;
      var arrayIterator;
      if ([].keys) {
        arrayIterator = [].keys();
        if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
        else {
          PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
        }
      }
      var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function() {
        var test = {};
        return IteratorPrototype[ITERATOR].call(test) !== test;
      });
      if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
      else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);
      if (!isCallable(IteratorPrototype[ITERATOR])) {
        defineBuiltIn(IteratorPrototype, ITERATOR, function() {
          return this;
        });
      }
      module.exports = {
        IteratorPrototype,
        BUGGY_SAFARI_ITERATORS
      };
    }
  });

  // node_modules/core-js/modules/es.iterator.constructor.js
  var require_es_iterator_constructor = __commonJS({
    "node_modules/core-js/modules/es.iterator.constructor.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var globalThis2 = require_global_this();
      var anInstance = require_an_instance();
      var anObject = require_an_object();
      var isCallable = require_is_callable();
      var getPrototypeOf = require_object_get_prototype_of();
      var defineBuiltInAccessor = require_define_built_in_accessor();
      var createProperty = require_create_property();
      var fails = require_fails();
      var hasOwn = require_has_own_property();
      var wellKnownSymbol = require_well_known_symbol();
      var IteratorPrototype = require_iterators_core().IteratorPrototype;
      var DESCRIPTORS = require_descriptors();
      var IS_PURE = require_is_pure();
      var CONSTRUCTOR = "constructor";
      var ITERATOR = "Iterator";
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      var $TypeError = TypeError;
      var NativeIterator = globalThis2[ITERATOR];
      var FORCED = IS_PURE || !isCallable(NativeIterator) || NativeIterator.prototype !== IteratorPrototype || !fails(function() {
        NativeIterator({});
      });
      var IteratorConstructor = function Iterator2() {
        anInstance(this, IteratorPrototype);
        if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError("Abstract class Iterator not directly constructable");
      };
      var defineIteratorPrototypeAccessor = function(key, value) {
        if (DESCRIPTORS) {
          defineBuiltInAccessor(IteratorPrototype, key, {
            configurable: true,
            get: function() {
              return value;
            },
            set: function(replacement) {
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
      $({ global: true, constructor: true, forced: FORCED }, {
        Iterator: IteratorConstructor
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.constructor.js
  var require_esnext_iterator_constructor = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.constructor.js"() {
      "use strict";
      init_process();
      require_es_iterator_constructor();
    }
  });

  // node_modules/core-js/internals/function-uncurry-this-clause.js
  var require_function_uncurry_this_clause = __commonJS({
    "node_modules/core-js/internals/function-uncurry-this-clause.js"(exports, module) {
      "use strict";
      init_process();
      var classofRaw = require_classof_raw();
      var uncurryThis = require_function_uncurry_this();
      module.exports = function(fn) {
        if (classofRaw(fn) === "Function") return uncurryThis(fn);
      };
    }
  });

  // node_modules/core-js/internals/function-bind-context.js
  var require_function_bind_context = __commonJS({
    "node_modules/core-js/internals/function-bind-context.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this_clause();
      var aCallable = require_a_callable();
      var NATIVE_BIND = require_function_bind_native();
      var bind = uncurryThis(uncurryThis.bind);
      module.exports = function(fn, that) {
        aCallable(fn);
        return that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
          return fn.apply(that, arguments);
        };
      };
    }
  });

  // node_modules/core-js/internals/iterators.js
  var require_iterators = __commonJS({
    "node_modules/core-js/internals/iterators.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = Object.create ? /* @__PURE__ */ Object.create(null) : {};
    }
  });

  // node_modules/core-js/internals/is-array-iterator-method.js
  var require_is_array_iterator_method = __commonJS({
    "node_modules/core-js/internals/is-array-iterator-method.js"(exports, module) {
      "use strict";
      init_process();
      var wellKnownSymbol = require_well_known_symbol();
      var Iterators = require_iterators();
      var ITERATOR = wellKnownSymbol("iterator");
      var ArrayPrototype = Array.prototype;
      module.exports = function(it) {
        return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-method-internal.js
  var require_get_iterator_method_internal = __commonJS({
    "node_modules/core-js/internals/get-iterator-method-internal.js"(exports, module) {
      "use strict";
      init_process();
      var classof = require_classof_raw();
      var isNullOrUndefined = require_is_null_or_undefined();
      var getMethod = require_get_method();
      var wellKnownSymbol = require_well_known_symbol();
      var ITERATOR = wellKnownSymbol("iterator");
      var ArrayPrototype = Array.prototype;
      module.exports = function(it) {
        if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || (classof(it) === "Arguments" ? ArrayPrototype[ITERATOR] : void 0);
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-internal.js
  var require_get_iterator_internal = __commonJS({
    "node_modules/core-js/internals/get-iterator-internal.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      var isCallable = require_is_callable();
      var anObject = require_an_object();
      var tryToString = require_try_to_string();
      var getIteratorMethod = require_get_iterator_method_internal();
      var $TypeError = TypeError;
      module.exports = function(argument, usingIterator) {
        var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
        if (isCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
        throw new $TypeError(tryToString(argument) + " is not iterable");
      };
    }
  });

  // node_modules/core-js/internals/iterator-close.js
  var require_iterator_close = __commonJS({
    "node_modules/core-js/internals/iterator-close.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      var anObject = require_an_object();
      var getMethod = require_get_method();
      module.exports = function(iterator, kind, value) {
        var innerResult, innerError;
        anObject(iterator);
        try {
          innerResult = getMethod(iterator, "return");
          if (!innerResult) {
            if (kind === "throw") throw value;
            return value;
          }
          innerResult = call(innerResult, iterator);
        } catch (error) {
          innerError = true;
          innerResult = error;
        }
        if (kind === "throw") throw value;
        if (innerError) throw innerResult;
        anObject(innerResult);
        return value;
      };
    }
  });

  // node_modules/core-js/internals/iterate.js
  var require_iterate = __commonJS({
    "node_modules/core-js/internals/iterate.js"(exports, module) {
      "use strict";
      init_process();
      var bind = require_function_bind_context();
      var call = require_function_call();
      var anObject = require_an_object();
      var tryToString = require_try_to_string();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var lengthOfArrayLike = require_length_of_array_like();
      var isPrototypeOf = require_object_is_prototype_of();
      var getIterator = require_get_iterator_internal();
      var getIteratorMethod = require_get_iterator_method_internal();
      var iteratorClose = require_iterator_close();
      var $TypeError = TypeError;
      var Result = function(stopped, result) {
        this.stopped = stopped;
        this.result = result;
      };
      var ResultPrototype = Result.prototype;
      module.exports = function(iterable, unboundFunction, options) {
        var that = options && options.that;
        var AS_ENTRIES = !!(options && options.AS_ENTRIES);
        var IS_RECORD = !!(options && options.IS_RECORD);
        var IS_ITERATOR = !!(options && options.IS_ITERATOR);
        var INTERRUPTED = !!(options && options.INTERRUPTED);
        var fn = bind(unboundFunction, that);
        var iterator, iterFn, index, length, result, next, step;
        var stop = function(condition) {
          var $iterator = iterator;
          iterator = void 0;
          if ($iterator) iteratorClose($iterator, "normal");
          return new Result(true, condition);
        };
        var callFn = function(value2) {
          if (AS_ENTRIES) {
            anObject(value2);
            return INTERRUPTED ? fn(value2[0], value2[1], stop) : fn(value2[0], value2[1]);
          }
          return INTERRUPTED ? fn(value2, stop) : fn(value2);
        };
        if (IS_RECORD) {
          iterator = iterable.iterator;
        } else if (IS_ITERATOR) {
          iterator = iterable;
        } else {
          iterFn = getIteratorMethod(iterable);
          if (!iterFn) throw new $TypeError(tryToString(iterable) + " is not iterable");
          if (isArrayIteratorMethod(iterFn)) {
            for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
              result = callFn(iterable[index]);
              if (result && isPrototypeOf(ResultPrototype, result)) return result;
            }
            return new Result(false);
          }
          iterator = getIterator(iterable, iterFn);
        }
        next = IS_RECORD ? iterable.next : iterator.next;
        while (!(step = call(next, iterator)).done) {
          var value = step.value;
          try {
            result = callFn(value);
          } catch (error) {
            if (iterator) iteratorClose(iterator, "throw", error);
            else throw error;
          }
          if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result)) return result;
        }
        return new Result(false);
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-direct.js
  var require_get_iterator_direct = __commonJS({
    "node_modules/core-js/internals/get-iterator-direct.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(obj) {
        return {
          iterator: obj,
          next: obj.next,
          done: false
        };
      };
    }
  });

  // node_modules/core-js/internals/iterator-helper-without-closing-on-early-error.js
  var require_iterator_helper_without_closing_on_early_error = __commonJS({
    "node_modules/core-js/internals/iterator-helper-without-closing-on-early-error.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      module.exports = function(METHOD_NAME, ExpectedError) {
        var Iterator2 = globalThis2.Iterator;
        var IteratorPrototype = Iterator2 && Iterator2.prototype;
        var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];
        var CLOSED = false;
        if (method) try {
          method.call({
            next: function() {
              return { done: true };
            },
            "return": function() {
              CLOSED = true;
            }
          }, -1);
        } catch (error) {
          if (!(error instanceof ExpectedError)) CLOSED = false;
        }
        if (!CLOSED) return method;
      };
    }
  });

  // node_modules/core-js/modules/es.iterator.for-each.js
  var require_es_iterator_for_each = __commonJS({
    "node_modules/core-js/modules/es.iterator.for-each.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var iterate = require_iterate();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var iteratorClose = require_iterator_close();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("forEach", TypeError);
      $({ target: "Iterator", proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
        forEach: function forEach(fn) {
          anObject(this);
          try {
            aCallable(fn);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);
          var record = getIteratorDirect(this);
          var counter = 0;
          iterate(record, function(value) {
            fn(value, counter++);
          }, { IS_RECORD: true });
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.for-each.js
  var require_esnext_iterator_for_each = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.for-each.js"() {
      "use strict";
      init_process();
      require_es_iterator_for_each();
    }
  });

  // node_modules/core-js/internals/weak-map-helpers.js
  var require_weak_map_helpers = __commonJS({
    "node_modules/core-js/internals/weak-map-helpers.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var WeakMapPrototype = WeakMap.prototype;
      module.exports = {
        // eslint-disable-next-line es/no-weak-map -- safe
        WeakMap,
        set: uncurryThis(WeakMapPrototype.set),
        get: uncurryThis(WeakMapPrototype.get),
        has: uncurryThis(WeakMapPrototype.has),
        remove: uncurryThis(WeakMapPrototype["delete"])
      };
    }
  });

  // node_modules/core-js/internals/a-weak-map.js
  var require_a_weak_map = __commonJS({
    "node_modules/core-js/internals/a-weak-map.js"(exports, module) {
      "use strict";
      init_process();
      var has = require_weak_map_helpers().has;
      module.exports = function(it) {
        has(it);
        return it;
      };
    }
  });

  // node_modules/core-js/modules/esnext.weak-map.delete-all.js
  var require_esnext_weak_map_delete_all = __commonJS({
    "node_modules/core-js/modules/esnext.weak-map.delete-all.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aWeakMap = require_a_weak_map();
      var remove = require_weak_map_helpers().remove;
      $({ target: "WeakMap", proto: true, real: true, forced: true }, {
        deleteAll: function deleteAll() {
          var collection = aWeakMap(this);
          var allDeleted = true;
          var wasDeleted;
          for (var k = 0, len = arguments.length; k < len; k++) {
            wasDeleted = remove(collection, arguments[k]);
            allDeleted = allDeleted && wasDeleted;
          }
          return !!allDeleted;
        }
      });
    }
  });

  // node_modules/core-js/internals/add-to-unscopables.js
  var require_add_to_unscopables = __commonJS({
    "node_modules/core-js/internals/add-to-unscopables.js"(exports, module) {
      "use strict";
      init_process();
      var wellKnownSymbol = require_well_known_symbol();
      var create = require_object_create();
      var defineProperty = require_object_define_property().f;
      var UNSCOPABLES = wellKnownSymbol("unscopables");
      var ArrayPrototype = Array.prototype;
      if (ArrayPrototype[UNSCOPABLES] === void 0) {
        defineProperty(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: create(null)
        });
      }
      module.exports = function(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
      };
    }
  });

  // node_modules/core-js/modules/es.array.includes.js
  var require_es_array_includes = __commonJS({
    "node_modules/core-js/modules/es.array.includes.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var $includes = require_array_includes().includes;
      var fails = require_fails();
      var addToUnscopables = require_add_to_unscopables();
      var BROKEN_ON_SPARSE = fails(function() {
        return !Array(1).includes();
      });
      var BROKEN_ON_SPARSE_WITH_FROM_INDEX = fails(function() {
        return [, 1].includes(void 0, 1);
      });
      $({ target: "Array", proto: true, forced: BROKEN_ON_SPARSE || BROKEN_ON_SPARSE_WITH_FROM_INDEX }, {
        includes: function includes(el) {
          return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
      addToUnscopables("includes");
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/addUniqueToArray.js
  var require_addUniqueToArray = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/addUniqueToArray.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_es_array_includes();
      var addUniqueToArray = (item, array) => !array.includes(item) ? array.concat([item]) : array;
      var _default = exports.default = addUniqueToArray;
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/BasicQueue.js
  var require_BasicQueue = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/BasicQueue.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var BasicQueue = class {
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
      };
      var _default = exports.default = BasicQueue;
    }
  });

  // node_modules/core-js/internals/define-built-ins.js
  var require_define_built_ins = __commonJS({
    "node_modules/core-js/internals/define-built-ins.js"(exports, module) {
      "use strict";
      init_process();
      var defineBuiltIn = require_define_built_in();
      module.exports = function(target, src, options) {
        for (var key in src) defineBuiltIn(target, key, src[key], options);
        return target;
      };
    }
  });

  // node_modules/core-js/internals/create-iter-result-object.js
  var require_create_iter_result_object = __commonJS({
    "node_modules/core-js/internals/create-iter-result-object.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(value, done) {
        return { value, done };
      };
    }
  });

  // node_modules/core-js/internals/iterator-close-all.js
  var require_iterator_close_all = __commonJS({
    "node_modules/core-js/internals/iterator-close-all.js"(exports, module) {
      "use strict";
      init_process();
      var iteratorClose = require_iterator_close();
      module.exports = function(iters, kind, value) {
        for (var i = iters.length - 1; i >= 0; i--) {
          if (iters[i] === void 0) continue;
          try {
            value = iteratorClose(iters[i].iterator, kind, value);
          } catch (error) {
            kind = "throw";
            value = error;
          }
        }
        if (kind === "throw") throw value;
        return value;
      };
    }
  });

  // node_modules/core-js/internals/iterator-cleanup-state.js
  var require_iterator_cleanup_state = __commonJS({
    "node_modules/core-js/internals/iterator-cleanup-state.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(state) {
        state.iterator = state.next = state.nextHandler = state.mapper = state.predicate = state.inner = state.iterables = state.iters = state.openIters = state.padding = state.finishResults = state.buffer = null;
      };
    }
  });

  // node_modules/core-js/internals/iterator-create-proxy.js
  var require_iterator_create_proxy = __commonJS({
    "node_modules/core-js/internals/iterator-create-proxy.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      var create = require_object_create();
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var defineBuiltIns = require_define_built_ins();
      var wellKnownSymbol = require_well_known_symbol();
      var InternalStateModule = require_internal_state();
      var getMethod = require_get_method();
      var IteratorPrototype = require_iterators_core().IteratorPrototype;
      var createIterResultObject = require_create_iter_result_object();
      var iteratorClose = require_iterator_close();
      var iteratorCloseAll = require_iterator_close_all();
      var cleanupState = require_iterator_cleanup_state();
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      var ITERATOR_HELPER = "IteratorHelper";
      var WRAP_FOR_VALID_ITERATOR = "WrapForValidIterator";
      var NORMAL = "normal";
      var THROW = "throw";
      var setInternalState = InternalStateModule.set;
      var createIteratorProxyPrototype = function(IS_ITERATOR) {
        var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);
        return defineBuiltIns(create(IteratorPrototype), {
          next: function next() {
            var state = getInternalState(this);
            if (IS_ITERATOR) return state.nextHandler();
            if (state.done) return createIterResultObject(void 0, true);
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
          "return": function() {
            var state = getInternalState(this);
            var iterator = state.iterator;
            var inner = state.inner;
            var openIters = state.openIters;
            var done = state.done;
            state.done = true;
            if (IS_ITERATOR) {
              var returnMethod = getMethod(iterator, "return");
              return returnMethod ? call(returnMethod, iterator) : createIterResultObject(void 0, true);
            }
            cleanupState(state);
            if (done) return createIterResultObject(void 0, true);
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
            return createIterResultObject(void 0, true);
          }
        });
      };
      var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
      var IteratorHelperPrototype = createIteratorProxyPrototype(false);
      createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, "Iterator Helper");
      module.exports = function(nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
        var IteratorProxy = function Iterator2(record, state) {
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
    }
  });

  // node_modules/core-js/internals/call-with-safe-iteration-closing.js
  var require_call_with_safe_iteration_closing = __commonJS({
    "node_modules/core-js/internals/call-with-safe-iteration-closing.js"(exports, module) {
      "use strict";
      init_process();
      var anObject = require_an_object();
      var iteratorClose = require_iterator_close();
      module.exports = function(iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
        } catch (error) {
          iteratorClose(iterator, "throw", error);
        }
      };
    }
  });

  // node_modules/core-js/internals/iterator-helper-throws-on-invalid-iterator.js
  var require_iterator_helper_throws_on_invalid_iterator = __commonJS({
    "node_modules/core-js/internals/iterator-helper-throws-on-invalid-iterator.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(methodName, argument) {
        var method = typeof Iterator == "function" && Iterator.prototype[methodName];
        if (method) try {
          method.call({ next: null }, argument).next();
        } catch (error) {
          return true;
        }
      };
    }
  });

  // node_modules/core-js/modules/es.iterator.map.js
  var require_es_iterator_map = __commonJS({
    "node_modules/core-js/modules/es.iterator.map.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var createIteratorProxy = require_iterator_create_proxy();
      var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
      var iteratorClose = require_iterator_close();
      var iteratorHelperThrowsOnInvalidIterator = require_iterator_helper_throws_on_invalid_iterator();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var IS_PURE = require_is_pure();
      var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator("map", function() {
      });
      var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR && iteratorHelperWithoutClosingOnEarlyError("map", TypeError);
      var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;
      var IteratorProxy = createIteratorProxy(function() {
        var iterator = this.iterator;
        var result = anObject(call(this.next, iterator));
        var done = this.done = !!result.done;
        if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
      });
      $({ target: "Iterator", proto: true, real: true, forced: FORCED }, {
        map: function map(mapper) {
          anObject(this);
          try {
            aCallable(mapper);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);
          return new IteratorProxy(getIteratorDirect(this), {
            mapper
          });
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.map.js
  var require_esnext_iterator_map = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.map.js"() {
      "use strict";
      init_process();
      require_es_iterator_map();
    }
  });

  // node_modules/core-js/internals/function-apply.js
  var require_function_apply = __commonJS({
    "node_modules/core-js/internals/function-apply.js"(exports, module) {
      "use strict";
      init_process();
      var NATIVE_BIND = require_function_bind_native();
      var FunctionPrototype = Function.prototype;
      var apply = FunctionPrototype.apply;
      var call = FunctionPrototype.call;
      module.exports = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
        return call.apply(apply, arguments);
      });
    }
  });

  // node_modules/core-js/modules/es.iterator.reduce.js
  var require_es_iterator_reduce = __commonJS({
    "node_modules/core-js/modules/es.iterator.reduce.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var iterate = require_iterate();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var iteratorClose = require_iterator_close();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var apply = require_function_apply();
      var fails = require_fails();
      var $TypeError = TypeError;
      var FAILS_ON_INITIAL_UNDEFINED = fails(function() {
        [].keys().reduce(function() {
        }, void 0);
      });
      var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError("reduce", $TypeError);
      $({ target: "Iterator", proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
        reduce: function reduce(reducer) {
          anObject(this);
          try {
            aCallable(reducer);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          var noInitial = arguments.length < 2;
          var accumulator = noInitial ? void 0 : arguments[1];
          if (reduceWithoutClosingOnEarlyError) {
            return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
          }
          var record = getIteratorDirect(this);
          var counter = 0;
          iterate(record, function(value) {
            if (noInitial) {
              noInitial = false;
              accumulator = value;
            } else {
              accumulator = reducer(accumulator, value, counter);
            }
            counter++;
          }, { IS_RECORD: true });
          if (noInitial) throw new $TypeError("Reduce of empty iterator with no initial value");
          return accumulator;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.reduce.js
  var require_esnext_iterator_reduce = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.reduce.js"() {
      "use strict";
      init_process();
      require_es_iterator_reduce();
    }
  });

  // node_modules/core-js/internals/map-helpers.js
  var require_map_helpers = __commonJS({
    "node_modules/core-js/internals/map-helpers.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var MapPrototype = Map.prototype;
      module.exports = {
        // eslint-disable-next-line es/no-map -- safe
        Map,
        set: uncurryThis(MapPrototype.set),
        get: uncurryThis(MapPrototype.get),
        has: uncurryThis(MapPrototype.has),
        remove: uncurryThis(MapPrototype["delete"]),
        proto: MapPrototype
      };
    }
  });

  // node_modules/core-js/internals/a-map.js
  var require_a_map = __commonJS({
    "node_modules/core-js/internals/a-map.js"(exports, module) {
      "use strict";
      init_process();
      var has = require_map_helpers().has;
      module.exports = function(it) {
        has(it);
        return it;
      };
    }
  });

  // node_modules/core-js/modules/esnext.map.delete-all.js
  var require_esnext_map_delete_all = __commonJS({
    "node_modules/core-js/modules/esnext.map.delete-all.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aMap = require_a_map();
      var remove = require_map_helpers().remove;
      $({ target: "Map", proto: true, real: true, forced: true }, {
        deleteAll: function deleteAll() {
          var collection = aMap(this);
          var allDeleted = true;
          var wasDeleted;
          for (var k = 0, len = arguments.length; k < len; k++) {
            wasDeleted = remove(collection, arguments[k]);
            allDeleted = allDeleted && wasDeleted;
          }
          return !!allDeleted;
        }
      });
    }
  });

  // node_modules/core-js/internals/iterate-simple.js
  var require_iterate_simple = __commonJS({
    "node_modules/core-js/internals/iterate-simple.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      module.exports = function(record, fn, ITERATOR_INSTEAD_OF_RECORD) {
        var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
        var next = record.next;
        var step, result;
        while (!(step = call(next, iterator)).done) {
          result = fn(step.value);
          if (result !== void 0) return result;
        }
      };
    }
  });

  // node_modules/core-js/internals/map-iterate.js
  var require_map_iterate = __commonJS({
    "node_modules/core-js/internals/map-iterate.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var iterateSimple = require_iterate_simple();
      var MapHelpers = require_map_helpers();
      var Map2 = MapHelpers.Map;
      var MapPrototype = MapHelpers.proto;
      var forEach = uncurryThis(MapPrototype.forEach);
      var entries = uncurryThis(MapPrototype.entries);
      var next = entries(new Map2()).next;
      module.exports = function(map, fn, interruptible) {
        return interruptible ? iterateSimple({ iterator: entries(map), next }, function(entry) {
          return fn(entry[1], entry[0]);
        }) : forEach(map, fn);
      };
    }
  });

  // node_modules/core-js/modules/esnext.map.every.js
  var require_esnext_map_every = __commonJS({
    "node_modules/core-js/modules/esnext.map.every.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      $({ target: "Map", proto: true, real: true, forced: true }, {
        every: function every(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          return iterate(map, function(value, key) {
            if (!boundFunction(value, key, map)) return false;
          }, true) !== false;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.filter.js
  var require_esnext_map_filter = __commonJS({
    "node_modules/core-js/modules/esnext.map.filter.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var MapHelpers = require_map_helpers();
      var iterate = require_map_iterate();
      var Map2 = MapHelpers.Map;
      var set = MapHelpers.set;
      $({ target: "Map", proto: true, real: true, forced: true }, {
        filter: function filter(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var newMap = new Map2();
          iterate(map, function(value, key) {
            if (boundFunction(value, key, map)) set(newMap, key, value);
          });
          return newMap;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.find.js
  var require_esnext_map_find = __commonJS({
    "node_modules/core-js/modules/esnext.map.find.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      $({ target: "Map", proto: true, real: true, forced: true }, {
        find: function find(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var result = iterate(map, function(value, key) {
            if (boundFunction(value, key, map)) return { value };
          }, true);
          return result && result.value;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.find-key.js
  var require_esnext_map_find_key = __commonJS({
    "node_modules/core-js/modules/esnext.map.find-key.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      $({ target: "Map", proto: true, real: true, forced: true }, {
        findKey: function findKey(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var result = iterate(map, function(value, key) {
            if (boundFunction(value, key, map)) return { key };
          }, true);
          return result && result.key;
        }
      });
    }
  });

  // node_modules/core-js/internals/same-value-zero.js
  var require_same_value_zero = __commonJS({
    "node_modules/core-js/internals/same-value-zero.js"(exports, module) {
      "use strict";
      init_process();
      module.exports = function(x, y) {
        return x === y || x !== x && y !== y;
      };
    }
  });

  // node_modules/core-js/modules/esnext.map.includes.js
  var require_esnext_map_includes = __commonJS({
    "node_modules/core-js/modules/esnext.map.includes.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var sameValueZero = require_same_value_zero();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      $({ target: "Map", proto: true, real: true, forced: true }, {
        includes: function includes(searchElement) {
          return iterate(aMap(this), function(value) {
            if (sameValueZero(value, searchElement)) return true;
          }, true) === true;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.key-of.js
  var require_esnext_map_key_of = __commonJS({
    "node_modules/core-js/modules/esnext.map.key-of.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      $({ target: "Map", proto: true, real: true, forced: true }, {
        keyOf: function keyOf(searchElement) {
          var result = iterate(aMap(this), function(value, key) {
            if (value === searchElement) return { key };
          }, true);
          return result && result.key;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.map-keys.js
  var require_esnext_map_map_keys = __commonJS({
    "node_modules/core-js/modules/esnext.map.map-keys.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var MapHelpers = require_map_helpers();
      var iterate = require_map_iterate();
      var Map2 = MapHelpers.Map;
      var set = MapHelpers.set;
      $({ target: "Map", proto: true, real: true, forced: true }, {
        mapKeys: function mapKeys(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var newMap = new Map2();
          iterate(map, function(value, key) {
            set(newMap, boundFunction(value, key, map), value);
          });
          return newMap;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.map-values.js
  var require_esnext_map_map_values = __commonJS({
    "node_modules/core-js/modules/esnext.map.map-values.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var MapHelpers = require_map_helpers();
      var iterate = require_map_iterate();
      var Map2 = MapHelpers.Map;
      var set = MapHelpers.set;
      $({ target: "Map", proto: true, real: true, forced: true }, {
        mapValues: function mapValues(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var newMap = new Map2();
          iterate(map, function(value, key) {
            set(newMap, key, boundFunction(value, key, map));
          });
          return newMap;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.merge.js
  var require_esnext_map_merge = __commonJS({
    "node_modules/core-js/modules/esnext.map.merge.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aMap = require_a_map();
      var iterate = require_iterate();
      var set = require_map_helpers().set;
      $({ target: "Map", proto: true, real: true, arity: 1, forced: true }, {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        merge: function merge(iterable) {
          var map = aMap(this);
          var argumentsLength = arguments.length;
          var i = 0;
          while (i < argumentsLength) {
            iterate(arguments[i++], function(key, value) {
              set(map, key, value);
            }, { AS_ENTRIES: true });
          }
          return map;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.reduce.js
  var require_esnext_map_reduce = __commonJS({
    "node_modules/core-js/modules/esnext.map.reduce.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aCallable = require_a_callable();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      var $TypeError = TypeError;
      $({ target: "Map", proto: true, real: true, forced: true }, {
        reduce: function reduce(callbackfn) {
          var map = aMap(this);
          var noInitial = arguments.length < 2;
          var accumulator = noInitial ? void 0 : arguments[1];
          aCallable(callbackfn);
          iterate(map, function(value, key) {
            if (noInitial) {
              noInitial = false;
              accumulator = value;
            } else {
              accumulator = callbackfn(accumulator, value, key, map);
            }
          });
          if (noInitial) throw new $TypeError("Reduce of empty map with no initial value");
          return accumulator;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.some.js
  var require_esnext_map_some = __commonJS({
    "node_modules/core-js/modules/esnext.map.some.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aMap = require_a_map();
      var iterate = require_map_iterate();
      $({ target: "Map", proto: true, real: true, forced: true }, {
        some: function some(callbackfn) {
          var map = aMap(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          return iterate(map, function(value, key) {
            if (boundFunction(value, key, map)) return true;
          }, true) === true;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.map.update.js
  var require_esnext_map_update = __commonJS({
    "node_modules/core-js/modules/esnext.map.update.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aCallable = require_a_callable();
      var aMap = require_a_map();
      var MapHelpers = require_map_helpers();
      var $TypeError = TypeError;
      var get = MapHelpers.get;
      var has = MapHelpers.has;
      var set = MapHelpers.set;
      $({ target: "Map", proto: true, real: true, forced: true }, {
        update: function update(key, callback) {
          var map = aMap(this);
          var length = arguments.length;
          aCallable(callback);
          var isPresentInMap = has(map, key);
          if (!isPresentInMap && length < 3) {
            throw new $TypeError("Updating absent value");
          }
          var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : void 0)(key, map);
          set(map, key, callback(value, key, map));
          return map;
        }
      });
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/isObject.js
  var require_isObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/isObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var isObject = (object) => typeof object === "object" && object !== null;
      var _default = exports.default = isObject;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/objectKeys.js
  var require_objectKeys = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/objectKeys.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isObject = _interopRequireDefault(require_isObject());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var objectKeys = (object, includeInherited = false) => {
        if (typeof object !== "function" && !(0, _isObject.default)(object)) {
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
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/isInstanceObject.js
  var require_isInstanceObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/isInstanceObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_es_array_includes();
      var _isObject = _interopRequireDefault(require_isObject());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isInstanceObject = (object) => {
        if (typeof object !== "function" && !(0, _isObject.default)(object)) {
          return false;
        }
        if (!["Array", "Function", "Object"].includes(object.constructor.name)) {
          return true;
        }
        return object.constructor.name !== "Array" && (0, _objectKeys.default)(object, true).length > (0, _objectKeys.default)(object).length;
      };
      var _default = exports.default = isInstanceObject;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/isCloneable.js
  var require_isCloneable = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/isCloneable.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isInstanceObject = _interopRequireDefault(require_isInstanceObject());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isCloneable = (value) => typeof value === "object" && value !== null && !(0, _isInstanceObject.default)(value);
      var _default = exports.default = isCloneable;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/callWithParams.js
  var require_callWithParams = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/callWithParams.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var callWithParams = (fn, params = [], minimum = 2) => fn(...params.slice(0, fn.length || minimum));
      var _default = exports.default = callWithParams;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/reduceObject.js
  var require_reduceObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/reduceObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _callWithParams = _interopRequireDefault(require_callWithParams());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var reduceObject = (obj, fn, initialValue = obj[(0, _objectKeys.default)(obj)[0]] || obj[0]) => Array.isArray(obj) ? obj.reduce(fn, initialValue) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => (0, _callWithParams.default)(fn, [newObj, obj[curr], curr, obj], 2), initialValue);
      var _default = exports.default = reduceObject;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/setValue.js
  var require_setValue = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/setValue.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var setValue = (key, value, item) => {
        item[key] = value;
        return item;
      };
      var _default = exports.default = setValue;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/mergeObjectsBase.js
  var require_mergeObjectsBase = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/mergeObjectsBase.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      require_esnext_iterator_reduce();
      require_esnext_map_delete_all();
      require_esnext_map_every();
      require_esnext_map_filter();
      require_esnext_map_find();
      require_esnext_map_find_key();
      require_esnext_map_includes();
      require_esnext_map_key_of();
      require_esnext_map_map_keys();
      require_esnext_map_map_values();
      require_esnext_map_merge();
      require_esnext_map_reduce();
      require_esnext_map_some();
      require_esnext_map_update();
      var _isCloneable = _interopRequireDefault(require_isCloneable());
      var _reduceObject = _interopRequireDefault(require_reduceObject());
      var _setValue = _interopRequireDefault(require_setValue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var mergeObjectsBase = ({
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
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/cloneObject.js
  var require_cloneObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/cloneObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _mergeObjectsBase = _interopRequireDefault(require_mergeObjectsBase());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var cloneObject = (object, {
        mapLimit = 100,
        depthLimit = -1,
        relevancyRange = 1e3
      } = {}) => (0, _mergeObjectsBase.default)({
        mapLimit,
        depthLimit,
        relevancyRange,
        useClone: true
      })(object);
      var _default = exports.default = cloneObject;
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/buildArray.js
  var require_buildArray = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/buildArray.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _cloneObject = _interopRequireDefault(require_cloneObject());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var buildArray = (item, length) => {
        const arr = [];
        while (arr.length < length) {
          const cloned = (0, _cloneObject.default)(item);
          arr.push(cloned);
        }
        return arr;
      };
      var _default = exports.default = buildArray;
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/buildArrayOfReferences.js
  var require_buildArrayOfReferences = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/buildArrayOfReferences.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var buildArrayOfReferences = (item, length) => {
        const arr = [];
        while (arr.length < length) {
          arr.push(item);
        }
        return arr;
      };
      var _default = exports.default = buildArrayOfReferences;
    }
  });

  // node_modules/core-js/modules/es.iterator.every.js
  var require_es_iterator_every = __commonJS({
    "node_modules/core-js/modules/es.iterator.every.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var iterate = require_iterate();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var iteratorClose = require_iterator_close();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var everyWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("every", TypeError);
      $({ target: "Iterator", proto: true, real: true, forced: everyWithoutClosingOnEarlyError }, {
        every: function every(predicate) {
          anObject(this);
          try {
            aCallable(predicate);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (everyWithoutClosingOnEarlyError) return call(everyWithoutClosingOnEarlyError, this, predicate);
          var record = getIteratorDirect(this);
          var counter = 0;
          return !iterate(record, function(value, stop) {
            if (!predicate(value, counter++)) return stop();
          }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.every.js
  var require_esnext_iterator_every = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.every.js"() {
      "use strict";
      init_process();
      require_es_iterator_every();
    }
  });

  // node_modules/core-js/modules/es.iterator.filter.js
  var require_es_iterator_filter = __commonJS({
    "node_modules/core-js/modules/es.iterator.filter.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var createIteratorProxy = require_iterator_create_proxy();
      var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
      var IS_PURE = require_is_pure();
      var iteratorClose = require_iterator_close();
      var iteratorHelperThrowsOnInvalidIterator = require_iterator_helper_throws_on_invalid_iterator();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator("filter", function() {
      });
      var filterWithoutClosingOnEarlyError = !IS_PURE && !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR && iteratorHelperWithoutClosingOnEarlyError("filter", TypeError);
      var FORCED = IS_PURE || FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;
      var IteratorProxy = createIteratorProxy(function() {
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
      $({ target: "Iterator", proto: true, real: true, forced: FORCED }, {
        filter: function filter(predicate) {
          anObject(this);
          try {
            aCallable(predicate);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (filterWithoutClosingOnEarlyError) return call(filterWithoutClosingOnEarlyError, this, predicate);
          return new IteratorProxy(getIteratorDirect(this), {
            predicate
          });
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.filter.js
  var require_esnext_iterator_filter = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.filter.js"() {
      "use strict";
      init_process();
      require_es_iterator_filter();
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/uniqueArray.js
  var require_uniqueArray = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/uniqueArray.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_filter();
      var uniqueArray = (array) => array.filter((item, index) => array.indexOf(item) === index);
      var _default = exports.default = uniqueArray;
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/mergeArrays.js
  var require_mergeArrays = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/mergeArrays.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_es_array_includes();
      require_esnext_iterator_constructor();
      require_esnext_iterator_filter();
      require_esnext_iterator_map();
      require_esnext_iterator_reduce();
      var _uniqueArray = _interopRequireDefault(require_uniqueArray());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var mergeArrays = (...arrays) => arrays.map(_uniqueArray.default).reduce((merged, arr) => [...merged, ...arr.filter((attr) => !merged.includes(attr))], []);
      var _default = exports.default = mergeArrays;
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays/compareArrays.js
  var require_compareArrays = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays/compareArrays.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      require_esnext_iterator_map();
      require_esnext_iterator_reduce();
      var _isObject = _interopRequireDefault(require_isObject());
      var _mergeArrays = _interopRequireDefault(require_mergeArrays());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var compareArrays = (...arrays) => (0, _mergeArrays.default)(...arrays).reduce((results, attr) => {
        const attrType = typeof attr;
        const useArray = Array.isArray(attr);
        const keys = arrays.map((array) => array.reduce((results2, current, key) => {
          const currentType = typeof current;
          if (attrType !== currentType) {
            return results2;
          }
          if (!(0, _isObject.default)(attr)) {
            return current === attr ? [...results2, key] : results2;
          }
          if (useArray !== Array.isArray(current)) {
            return results2;
          }
          const compareKeys = useArray ? compareArrays(attr, current) : compareArrays((0, _objectKeys.default)(attr), (0, _objectKeys.default)(current));
          return compareKeys.every((compare) => compare.result.every((result) => result === 0)) ? [...results2, key] : results2;
        }, []));
        const arrayResults = keys.map((array) => array.length ? 1 : -1);
        return [...results, {
          value: attr,
          keys,
          result: arrayResults.every((result) => result === 1) ? arrayResults.map((result) => 0) : arrayResults
        }];
      }, []);
      var _default = exports.default = compareArrays;
    }
  });

  // node_modules/si-funciona/dist/helpers/arrays.js
  var require_arrays = __commonJS({
    "node_modules/si-funciona/dist/helpers/arrays.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "BasicQueue", {
        enumerable: true,
        get: function() {
          return _BasicQueue.default;
        }
      });
      Object.defineProperty(exports, "addUniqueToArray", {
        enumerable: true,
        get: function() {
          return _addUniqueToArray.default;
        }
      });
      Object.defineProperty(exports, "buildArray", {
        enumerable: true,
        get: function() {
          return _buildArray.default;
        }
      });
      Object.defineProperty(exports, "buildArrayOfReferences", {
        enumerable: true,
        get: function() {
          return _buildArrayOfReferences.default;
        }
      });
      Object.defineProperty(exports, "compareArrays", {
        enumerable: true,
        get: function() {
          return _compareArrays.default;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "mergeArrays", {
        enumerable: true,
        get: function() {
          return _mergeArrays.default;
        }
      });
      Object.defineProperty(exports, "uniqueArray", {
        enumerable: true,
        get: function() {
          return _uniqueArray.default;
        }
      });
      var _addUniqueToArray = _interopRequireDefault(require_addUniqueToArray());
      var _BasicQueue = _interopRequireDefault(require_BasicQueue());
      var _buildArray = _interopRequireDefault(require_buildArray());
      var _buildArrayOfReferences = _interopRequireDefault(require_buildArrayOfReferences());
      var _compareArrays = _interopRequireDefault(require_compareArrays());
      var _mergeArrays = _interopRequireDefault(require_mergeArrays());
      var _uniqueArray = _interopRequireDefault(require_uniqueArray());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var _default = exports.default = {
        addUniqueToArray: _addUniqueToArray.default,
        BasicQueue: _BasicQueue.default,
        buildArray: _buildArray.default,
        buildArrayOfReferences: _buildArrayOfReferences.default,
        compareArrays: _compareArrays.default,
        mergeArrays: _mergeArrays.default,
        uniqueArray: _uniqueArray.default
      };
    }
  });

  // node_modules/core-js/modules/es.iterator.find.js
  var require_es_iterator_find = __commonJS({
    "node_modules/core-js/modules/es.iterator.find.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var iterate = require_iterate();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var iteratorClose = require_iterator_close();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("find", TypeError);
      $({ target: "Iterator", proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
        find: function find(predicate) {
          anObject(this);
          try {
            aCallable(predicate);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);
          var record = getIteratorDirect(this);
          var counter = 0;
          return iterate(record, function(value, stop) {
            if (predicate(value, counter++)) return stop(value);
          }, { IS_RECORD: true, INTERRUPTED: true }).result;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.find.js
  var require_esnext_iterator_find = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.find.js"() {
      "use strict";
      init_process();
      require_es_iterator_find();
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/cloneDescriptorDetail.js
  var require_cloneDescriptorDetail = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/cloneDescriptorDetail.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      require_esnext_iterator_map();
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var cloneDescriptorDetail = (originalDetail) => {
        const copyDetail = {};
        (0, _objectKeys.default)(originalDetail).forEach((key) => {
          copyDetail[key] = Array.isArray(originalDetail[key]) ? originalDetail[key].map((value) => value) : originalDetail[key];
        });
        return copyDetail;
      };
      var _default = exports.default = cloneDescriptorDetail;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/assignDescriptorDetail.js
  var require_assignDescriptorDetail = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/assignDescriptorDetail.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _cloneDescriptorDetail = _interopRequireDefault(require_cloneDescriptorDetail());
      var _uniqueArray = _interopRequireDefault(require_uniqueArray());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var assignDescriptorDetail = (originalDetail, ...details) => details.reduce((existingDetail, newDetail) => {
        existingDetail.type = (0, _uniqueArray.default)([...existingDetail.type, ...newDetail.type]);
        existingDetail.value = (0, _uniqueArray.default)([...existingDetail.value, ...newDetail.value]);
        existingDetail.nullable = existingDetail.nullable || newDetail.nullable;
        existingDetail.optional = existingDetail.optional || newDetail.optional;
        existingDetail.circular = existingDetail.circular || newDetail.circular;
        existingDetail.isReference = existingDetail.isReference || newDetail.isReference;
        existingDetail.isInstance = existingDetail.isInstance || newDetail.isInstance;
        existingDetail.arrayReference = [existingDetail.arrayReference, newDetail.arrayReference].find((ref) => typeof ref === "number");
        existingDetail.objectReference = [existingDetail.objectReference, newDetail.objectReference].find((ref) => typeof ref === "number");
        existingDetail.arrayReference = typeof existingDetail.arrayReference === "undefined" ? null : existingDetail.arrayReference;
        existingDetail.objectReference = typeof existingDetail.objectReference === "undefined" ? null : existingDetail.objectReference;
        return existingDetail;
      }, (0, _cloneDescriptorDetail.default)(originalDetail));
      var _default = exports.default = assignDescriptorDetail;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/cloneDescriptor.js
  var require_cloneDescriptor = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/cloneDescriptor.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var _cloneDescriptorDetail = _interopRequireDefault(require_cloneDescriptorDetail());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var cloneDescriptor = (originalMap) => {
        const copyMap = {};
        copyMap["index"] = originalMap.index || 0;
        copyMap["details"] = originalMap.details.map(_cloneDescriptorDetail.default);
        copyMap["length"] = originalMap.length;
        copyMap["keys"] = originalMap.keys.map((key) => key);
        copyMap["references"] = originalMap.references.map((reference) => reference);
        copyMap["isArray"] = originalMap.isArray;
        copyMap["complete"] = originalMap.complete;
        return copyMap;
      };
      var _default = exports.default = cloneDescriptor;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/assignDescriptor.js
  var require_assignDescriptor = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/assignDescriptor.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      require_esnext_iterator_filter();
      require_esnext_iterator_find();
      require_esnext_iterator_for_each();
      require_esnext_iterator_map();
      require_esnext_iterator_reduce();
      var _assignDescriptorDetail = _interopRequireDefault(require_assignDescriptorDetail());
      var _cloneDescriptor = _interopRequireDefault(require_cloneDescriptor());
      var _compareArrays = _interopRequireDefault(require_compareArrays());
      var _uniqueArray = _interopRequireDefault(require_uniqueArray());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var assignDescriptor = (originalMap, ...descriptors) => descriptors.reduce((assignedDescriptor, descriptor) => {
        const detailsDiff = (0, _compareArrays.default)(assignedDescriptor.keys, descriptor.keys);
        detailsDiff.forEach((diff) => {
          const existingDetail = assignedDescriptor.details.find((detail) => detail.key === diff.value);
          const newDetail = descriptor.details.find((detail) => detail.key === diff.value);
          if (diff.result.every((result) => result === 0)) {
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
        assignedDescriptor.keys = (0, _uniqueArray.default)(assignedDescriptor.details.map((detail) => detail.key));
        assignedDescriptor.references = (0, _uniqueArray.default)(assignedDescriptor.details.filter((detail) => detail.isReference).map((detail) => detail.index));
        assignedDescriptor.isArray = assignedDescriptor.length ? assignedDescriptor.details.every((detail) => typeof detail.key === "number") : assignedDescriptor.isArray;
        assignedDescriptor.complete = !assignedDescriptor.references.length || assignedDescriptor.complete || descriptor.complete;
        return assignedDescriptor;
      }, (0, _cloneDescriptor.default)(originalMap));
      var _default = exports.default = assignDescriptor;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/checkClearValues.js
  var require_checkClearValues = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/checkClearValues.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var _setValue = _interopRequireDefault(require_setValue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var checkClearValues = (descriptor, keepValues = false) => (0, _setValue.default)("details", descriptor.complete && !keepValues ? descriptor.details.map((detail) => (0, _setValue.default)("value", [], detail)) : descriptor.details, descriptor);
      var _default = exports.default = checkClearValues;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/checkDescriptorComplete.js
  var require_checkDescriptorComplete = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/checkDescriptorComplete.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      var _setValue = _interopRequireDefault(require_setValue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var checkDescriptorComplete = (descriptor) => (0, _setValue.default)("complete", descriptor.references.every((refId) => [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some((ref) => typeof ref === "number")), descriptor);
      var _default = exports.default = checkDescriptorComplete;
    }
  });

  // node_modules/core-js/modules/es.iterator.some.js
  var require_es_iterator_some = __commonJS({
    "node_modules/core-js/modules/es.iterator.some.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var iterate = require_iterate();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var iteratorClose = require_iterator_close();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var someWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("some", TypeError);
      $({ target: "Iterator", proto: true, real: true, forced: someWithoutClosingOnEarlyError }, {
        some: function some(predicate) {
          anObject(this);
          try {
            aCallable(predicate);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (someWithoutClosingOnEarlyError) return call(someWithoutClosingOnEarlyError, this, predicate);
          var record = getIteratorDirect(this);
          var counter = 0;
          return iterate(record, function(value, stop) {
            if (predicate(value, counter++)) return stop();
          }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.some.js
  var require_esnext_iterator_some = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.some.js"() {
      "use strict";
      init_process();
      require_es_iterator_some();
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/compareDescriptor.js
  var require_compareDescriptor = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/compareDescriptor.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_es_array_includes();
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      require_esnext_iterator_find();
      require_esnext_iterator_some();
      var compareDescriptor = (descriptor1, descriptor2) => {
        if (descriptor1.isArray !== descriptor2.isArray) {
          return false;
        }
        if (descriptor1.length === 0 || descriptor2.length === 0) {
          return descriptor1.length === descriptor2.length;
        }
        const smallerDescriptor = descriptor1.length <= descriptor2.length ? descriptor1 : descriptor2;
        const largerDescriptor = descriptor2.length >= descriptor1.length ? descriptor2 : descriptor1;
        return smallerDescriptor.keys.every((key) => largerDescriptor.keys.includes(key)) ? smallerDescriptor.details.every((detail) => detail.type.some((type) => largerDescriptor.details.find((foundDetail) => foundDetail.key === detail.key).type.includes(type))) : false;
      };
      var _default = exports.default = compareDescriptor;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/emptyObject.js
  var require_emptyObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/emptyObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isObject = _interopRequireDefault(require_isObject());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var emptyObject = (item) => (typeof item === "function" || (0, _isObject.default)(item)) && !(0, _objectKeys.default)(item).length;
      var _default = exports.default = emptyObject;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/describeObjectDetail.js
  var require_describeObjectDetail = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/describeObjectDetail.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _emptyObject = _interopRequireDefault(require_emptyObject());
      var _isCloneable = _interopRequireDefault(require_isCloneable());
      var _isInstanceObject = _interopRequireDefault(require_isInstanceObject());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var describeObjectDetail = (value, key = 0, index = 0) => {
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
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/describeObject.js
  var require_describeObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/describeObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _assignDescriptorDetail = _interopRequireDefault(require_assignDescriptorDetail());
      var _describeObjectDetail = _interopRequireDefault(require_describeObjectDetail());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var describeObject = (object) => {
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
          const newDetail = (0, _describeObjectDetail.default)(object[key], key, descriptor.length++);
          if (typeof key === "number" && descriptor.details.length) {
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
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/nextReference.js
  var require_nextReference = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/nextReference.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var nextReference = (descriptor, currentReference) => descriptor.references.find((nextRef) => {
        if (nextRef <= currentReference) {
          return false;
        }
        const val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1];
        if (typeof val !== "object" || val === null || typeof val === "undefined" || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
          return false;
        }
        return !!(0, _objectKeys.default)(val).length;
      });
      var _default = exports.default = nextReference;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/sameDescriptor.js
  var require_sameDescriptor = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/sameDescriptor.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_es_array_includes();
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      require_esnext_iterator_some();
      var sameDescriptor = (descriptor1, descriptor2) => descriptor1.details.every((detail, index) => detail.value.some((dVal) => descriptor2.details[index].value.includes(dVal)));
      var _default = exports.default = sameDescriptor;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors/describeObjectMap.js
  var require_describeObjectMap = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors/describeObjectMap.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      require_esnext_iterator_for_each();
      var _assignDescriptor = _interopRequireDefault(require_assignDescriptor());
      var _checkClearValues = _interopRequireDefault(require_checkClearValues());
      var _checkDescriptorComplete = _interopRequireDefault(require_checkDescriptorComplete());
      var _compareDescriptor = _interopRequireDefault(require_compareDescriptor());
      var _describeObject = _interopRequireDefault(require_describeObject());
      var _nextReference = _interopRequireDefault(require_nextReference());
      var _sameDescriptor = _interopRequireDefault(require_sameDescriptor());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var describeObjectMap = (object, {
        mapLimit = 1e9,
        depthLimit = -1,
        keepValues = false
      } = {}) => {
        const descriptorMap = [(0, _describeObject.default)(object)];
        descriptorMap[0].index = 0;
        const describeReferences = (descriptor2, currentDetail, limit = -1, returnCallback = (returnMap) => returnMap) => {
          let index = descriptorMap.length;
          const nextRef = currentDetail ? (0, _nextReference.default)(descriptor2, currentDetail.index) : void 0;
          const nextDetail = typeof nextRef !== "undefined" ? descriptor2.details[nextRef] : null;
          if (currentDetail) {
            const vals = descriptor2.isArray ? currentDetail.value : [currentDetail.value[currentDetail.value.length - 1]];
            vals.forEach((val) => {
              const tempDescriptor = (0, _describeObject.default)(val);
              const existingDescriptorIndex = descriptorMap.findIndex((existingDescriptor) => (0, _compareDescriptor.default)(tempDescriptor, existingDescriptor));
              if (existingDescriptorIndex >= 0) {
                index = existingDescriptorIndex;
                if (tempDescriptor.length && (0, _sameDescriptor.default)(tempDescriptor, descriptorMap[existingDescriptorIndex])) {
                  currentDetail.circular = true;
                  descriptor2.details[currentDetail.index] = currentDetail;
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
                descriptor2.details[currentDetail.index].arrayReference = index;
              } else {
                index = currentDetail.objectReference ?? index;
                descriptor2.details[currentDetail.index].objectReference = index;
              }
              tempDescriptor.index = index;
              if (existingDescriptorIndex < 0) {
                descriptorMap[index] = descriptorMap[index] ? (0, _assignDescriptor.default)(descriptorMap[index], tempDescriptor) : tempDescriptor;
              }
              descriptorMap[descriptor2.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor2.index], descriptor2);
              currentDetail = descriptorMap[descriptor2.index].details.find((detail) => detail.key === currentDetail.key);
              if (!currentDetail.circular) {
                const newReference = (0, _nextReference.default)(tempDescriptor, -1);
                const newDetail = typeof newReference !== "undefined" ? tempDescriptor.details[newReference] : null;
                return describeReferences(tempDescriptor, newDetail, --limit, (returnMap) => describeReferences(descriptor2, nextDetail, --limit));
              }
            });
          }
          descriptorMap[descriptor2.index] = (0, _assignDescriptor.default)(descriptorMap[descriptor2.index], (0, _checkDescriptorComplete.default)(descriptor2));
          descriptorMap[descriptor2.index] = (0, _checkClearValues.default)(descriptorMap[descriptor2.index], keepValues);
          return nextDetail ? describeReferences(descriptor2, nextDetail, --limit) : returnCallback(descriptorMap);
        };
        const descriptor = descriptorMap[0];
        const currentReference = (0, _nextReference.default)(descriptor, -1);
        if (typeof currentReference === "undefined") {
          descriptorMap[0] = (0, _assignDescriptor.default)(descriptorMap[0], (0, _checkDescriptorComplete.default)(descriptor));
          descriptorMap[0] = (0, _checkClearValues.default)(descriptorMap[0], keepValues);
          return descriptorMap;
        }
        return describeReferences(descriptor, descriptor.details[currentReference], depthLimit);
      };
      var _default = exports.default = describeObjectMap;
    }
  });

  // node_modules/si-funciona/dist/helpers/descriptors.js
  var require_descriptors2 = __commonJS({
    "node_modules/si-funciona/dist/helpers/descriptors.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "assignDescriptor", {
        enumerable: true,
        get: function() {
          return _assignDescriptor.default;
        }
      });
      Object.defineProperty(exports, "assignDescriptorDetail", {
        enumerable: true,
        get: function() {
          return _assignDescriptorDetail.default;
        }
      });
      Object.defineProperty(exports, "checkClearValues", {
        enumerable: true,
        get: function() {
          return _checkClearValues.default;
        }
      });
      Object.defineProperty(exports, "checkDescriptorComplete", {
        enumerable: true,
        get: function() {
          return _checkDescriptorComplete.default;
        }
      });
      Object.defineProperty(exports, "cloneDescriptor", {
        enumerable: true,
        get: function() {
          return _cloneDescriptor.default;
        }
      });
      Object.defineProperty(exports, "cloneDescriptorDetail", {
        enumerable: true,
        get: function() {
          return _cloneDescriptorDetail.default;
        }
      });
      Object.defineProperty(exports, "compareDescriptor", {
        enumerable: true,
        get: function() {
          return _compareDescriptor.default;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "describeObject", {
        enumerable: true,
        get: function() {
          return _describeObject.default;
        }
      });
      Object.defineProperty(exports, "describeObjectDetail", {
        enumerable: true,
        get: function() {
          return _describeObjectDetail.default;
        }
      });
      Object.defineProperty(exports, "describeObjectMap", {
        enumerable: true,
        get: function() {
          return _describeObjectMap.default;
        }
      });
      Object.defineProperty(exports, "nextReference", {
        enumerable: true,
        get: function() {
          return _nextReference.default;
        }
      });
      Object.defineProperty(exports, "sameDescriptor", {
        enumerable: true,
        get: function() {
          return _sameDescriptor.default;
        }
      });
      var _assignDescriptor = _interopRequireDefault(require_assignDescriptor());
      var _assignDescriptorDetail = _interopRequireDefault(require_assignDescriptorDetail());
      var _checkClearValues = _interopRequireDefault(require_checkClearValues());
      var _checkDescriptorComplete = _interopRequireDefault(require_checkDescriptorComplete());
      var _cloneDescriptor = _interopRequireDefault(require_cloneDescriptor());
      var _cloneDescriptorDetail = _interopRequireDefault(require_cloneDescriptorDetail());
      var _compareDescriptor = _interopRequireDefault(require_compareDescriptor());
      var _describeObject = _interopRequireDefault(require_describeObject());
      var _describeObjectMap = _interopRequireDefault(require_describeObjectMap());
      var _describeObjectDetail = _interopRequireDefault(require_describeObjectDetail());
      var _nextReference = _interopRequireDefault(require_nextReference());
      var _sameDescriptor = _interopRequireDefault(require_sameDescriptor());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/curry.js
  var require_curry = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/curry.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var curry = (fn) => (...args) => args.length >= fn.length ? fn(...args) : (...a) => curry(fn)(...[...args, ...a]);
      var _default = exports.default = curry;
    }
  });

  // node_modules/regenerator-runtime/runtime.js
  var require_runtime = __commonJS({
    "node_modules/regenerator-runtime/runtime.js"(exports, module) {
      init_process();
      var runtime = (function(exports2) {
        "use strict";
        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var defineProperty = Object.defineProperty || function(obj, key, desc) {
          obj[key] = desc.value;
        };
        var undefined2;
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return obj[key];
        }
        try {
          define({}, "");
        } catch (err) {
          define = function(obj, key, value) {
            return obj[key] = value;
          };
        }
        function wrap(innerFn, outerFn, self2, tryLocsList) {
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);
          defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self2, context) });
          return generator;
        }
        exports2.wrap = wrap;
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
        var ContinueSentinel = {};
        function Generator() {
        }
        function GeneratorFunction() {
        }
        function GeneratorFunctionPrototype() {
        }
        var IteratorPrototype = {};
        define(IteratorPrototype, iteratorSymbol, function() {
          return this;
        });
        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          IteratorPrototype = NativeIteratorPrototype;
        }
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
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
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
              return this._invoke(method, arg);
            });
          });
        }
        exports2.isGeneratorFunction = function(genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };
        exports2.mark = function(genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };
        exports2.awrap = function(arg) {
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
              if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
                return PromiseImpl.resolve(value.__await).then(function(value2) {
                  invoke("next", value2, resolve, reject);
                }, function(err) {
                  invoke("throw", err, resolve, reject);
                });
              }
              return PromiseImpl.resolve(value).then(function(unwrapped) {
                result.value = unwrapped;
                resolve(result);
              }, function(error) {
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
            return previousPromise = // If enqueue has been called before, then we want to wait until
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
          defineProperty(this, "_invoke", { value: enqueue });
        }
        defineIteratorMethods(AsyncIterator.prototype);
        define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
          return this;
        });
        exports2.AsyncIterator = AsyncIterator;
        exports2.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
          if (PromiseImpl === void 0) PromiseImpl = Promise;
          var iter = new AsyncIterator(
            wrap(innerFn, outerFn, self2, tryLocsList),
            PromiseImpl
          );
          return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
        };
        function makeInvokeMethod(innerFn, self2, context) {
          var state = GenStateSuspendedStart;
          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }
            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }
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
              var record = tryCatch(innerFn, self2, context);
              if (record.type === "normal") {
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                if (record.arg === ContinueSentinel) {
                  continue;
                }
                return {
                  value: record.arg,
                  done: context.done
                };
              } else if (record.type === "throw") {
                state = GenStateCompleted;
                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }
        function maybeInvokeDelegate(delegate, context) {
          var methodName = context.method;
          var method = delegate.iterator[methodName];
          if (method === undefined2) {
            context.delegate = null;
            if (methodName === "throw" && delegate.iterator["return"]) {
              context.method = "return";
              context.arg = undefined2;
              maybeInvokeDelegate(delegate, context);
              if (context.method === "throw") {
                return ContinueSentinel;
              }
            }
            if (methodName !== "return") {
              context.method = "throw";
              context.arg = new TypeError(
                "The iterator does not provide a '" + methodName + "' method"
              );
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
          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined2;
            }
          } else {
            return info;
          }
          context.delegate = null;
          return ContinueSentinel;
        }
        defineIteratorMethods(Gp);
        define(Gp, toStringTagSymbol, "Generator");
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
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }
        exports2.keys = function(val) {
          var object = Object(val);
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();
          return function next() {
            while (keys.length) {
              var key2 = keys.pop();
              if (key2 in object) {
                next.value = key2;
                next.done = false;
                return next;
              }
            }
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
              var i = -1, next = function next2() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next2.value = iterable[i];
                    next2.done = false;
                    return next2;
                  }
                }
                next2.value = undefined2;
                next2.done = true;
                return next2;
              };
              return next.next = next;
            }
          }
          throw new TypeError(typeof iterable + " is not iterable");
        }
        exports2.values = values;
        function doneResult() {
          return { value: undefined2, done: true };
        }
        Context.prototype = {
          constructor: Context,
          reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            this.sent = this._sent = undefined2;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined2;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
              for (var name in this) {
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined2;
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
                context.method = "next";
                context.arg = undefined2;
              }
              return !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;
              if (entry.tryLoc === "root") {
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
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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
            if (record.type === "break" || record.type === "continue") {
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
            throw new Error("illegal catch attempt");
          },
          delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName,
              nextLoc
            };
            if (this.method === "next") {
              this.arg = undefined2;
            }
            return ContinueSentinel;
          }
        };
        return exports2;
      })(
        // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        typeof module === "object" ? module.exports : {}
      );
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        if (typeof globalThis === "object") {
          globalThis.regeneratorRuntime = runtime;
        } else {
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      }
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/delay.js
  var require_delay = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/delay.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_runtime();
      var delay = (time = 0) => {
        let cancel = () => void 0;
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
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/makeBasicQueue.js
  var require_makeBasicQueue = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/makeBasicQueue.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _BasicQueue = _interopRequireDefault(require_BasicQueue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var makeBasicQueue = (initialQueue = []) => {
        return new _BasicQueue.default(initialQueue);
      };
      var _default = exports.default = makeBasicQueue;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/queueManager.js
  var require_queueManager = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/queueManager.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      require_runtime();
      var _makeBasicQueue = _interopRequireDefault(require_makeBasicQueue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var queueManager = (queue = null) => {
        let isRunning = false;
        let isPaused = true;
        const makeQueuedRunnable = (resolve, reject, fn, ...args) => {
          const generator = (function* () {
            const item = yield;
            if (typeof item.fn !== "function") {
              return reject(item);
            }
            try {
              return resolve(item.fn(...item.args));
            } catch (error) {
              return reject(error);
            }
          })();
          generator.next();
          return {
            item: {
              fn,
              args
            },
            generator
          };
        };
        const postRun = (result) => {
          isRunning = false;
          runNextItem();
          return result;
        };
        const postFailedRun = (error) => {
          isRunning = false;
          runNextItem();
          throw error;
        };
        const runNextItem = () => {
          if (!isPaused && !queue.empty() && !isRunning) {
            isRunning = true;
            let toRun = queue.dequeue();
            if (typeof toRun === "undefined" || toRun === null) {
              return null;
            }
            if (typeof toRun === "function") {
              new Promise((resolve, reject) => {
                toRun = makeQueuedRunnable(resolve, reject, toRun);
                runNextItem();
              }).then(postRun, postFailedRun);
            }
            if ("success" in toRun) {
              console.info(toRun.success);
              return null;
            }
            if (!toRun.generator || "error" in toRun) {
              let errorMessage = 'Verify queued function implements "done()" state.';
              if ("error" in toRun && toRun.error) {
                errorMessage = `[${toRun.error}]: ${errorMessage}`;
              }
              throw new Error(errorMessage);
            }
            if (toRun.generator && toRun.item) {
              return toRun.generator.next(toRun.item);
            }
          }
          return null;
        };
        const pushAnother = (fn, ...args) => new Promise((resolve, reject) => {
          queue.enqueue(makeQueuedRunnable(resolve, reject, fn, ...args));
          runNextItem();
        }).then(postRun, postFailedRun);
        if (Array.isArray(queue)) {
          const queueArray = queue;
          queue = (0, _makeBasicQueue.default)();
          queueArray.forEach((queued) => pushAnother(queued));
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
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/onBodyLoad.js
  var require_onBodyLoad = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/onBodyLoad.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _queueManager = _interopRequireDefault(require_queueManager());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var queue = [];
      var manager = (0, _queueManager.default)();
      manager.start();
      var observer = null;
      var doReset = () => {
        observer = null;
      };
      var initializeObserver = async () => {
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
      var onBodyLoad = (callback, reset = false) => {
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
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/pipe.js
  var require_pipe = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/pipe.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
      var _default = exports.default = pipe;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/preloadParams.js
  var require_preloadParams = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/preloadParams.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var preloadParams = (fn, params = [], unassignedParam = 0) => (missing) => {
        params.splice(unassignedParam, 0, missing);
        return fn(...params);
      };
      var _default = exports.default = preloadParams;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/queueTimeout.js
  var require_queueTimeout = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/queueTimeout.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_runtime();
      var _delay = _interopRequireDefault(require_delay());
      var _queueManager = _interopRequireDefault(require_queueManager());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var queueTimeout = (queueManagerHandle = null) => {
        const manager = queueManagerHandle || (0, _queueManager.default)();
        manager.start();
        return (fn, time = 0, ...args) => manager.push(() => (0, _delay.default)(time).resolver.then(() => fn(...args)));
      };
      var _default = exports.default = queueTimeout;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/relevancyFilter.js
  var require_relevancyFilter = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/relevancyFilter.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_filter();
      require_esnext_iterator_map();
      var relevancyFilter = (map, {
        mapLimit = 1e3,
        relevancyRange = 100
      } = {}) => {
        if (map.length <= mapLimit) {
          return map;
        }
        const minRelevance = map.length - relevancyRange;
        const filtered = map.filter((reference) => reference.relevance >= minRelevance);
        return filtered.map((reference) => {
          reference.relevance = reference.relevance > filtered.length ? filtered.length : reference.relevance;
          return reference;
        });
      };
      var _default = exports.default = relevancyFilter;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions/trace.js
  var require_trace = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions/trace.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_runtime();
      var _cloneObject = _interopRequireDefault(require_cloneObject());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var trace = (label, useClone = true) => (value) => {
        console.info(`${label}: `, useClone ? (0, _cloneObject.default)(value) : value);
        return value;
      };
      var _default = exports.default = trace;
    }
  });

  // node_modules/si-funciona/dist/helpers/functions.js
  var require_functions = __commonJS({
    "node_modules/si-funciona/dist/helpers/functions.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "callWithParams", {
        enumerable: true,
        get: function() {
          return _callWithParams.default;
        }
      });
      Object.defineProperty(exports, "curry", {
        enumerable: true,
        get: function() {
          return _curry.default;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "delay", {
        enumerable: true,
        get: function() {
          return _delay.default;
        }
      });
      Object.defineProperty(exports, "makeBasicQueue", {
        enumerable: true,
        get: function() {
          return _makeBasicQueue.default;
        }
      });
      Object.defineProperty(exports, "onBodyLoad", {
        enumerable: true,
        get: function() {
          return _onBodyLoad.default;
        }
      });
      Object.defineProperty(exports, "pipe", {
        enumerable: true,
        get: function() {
          return _pipe.default;
        }
      });
      Object.defineProperty(exports, "preloadParams", {
        enumerable: true,
        get: function() {
          return _preloadParams.default;
        }
      });
      Object.defineProperty(exports, "queueManager", {
        enumerable: true,
        get: function() {
          return _queueManager.default;
        }
      });
      Object.defineProperty(exports, "queueTimeout", {
        enumerable: true,
        get: function() {
          return _queueTimeout.default;
        }
      });
      Object.defineProperty(exports, "relevancyFilter", {
        enumerable: true,
        get: function() {
          return _relevancyFilter.default;
        }
      });
      Object.defineProperty(exports, "trace", {
        enumerable: true,
        get: function() {
          return _trace.default;
        }
      });
      var _callWithParams = _interopRequireDefault(require_callWithParams());
      var _curry = _interopRequireDefault(require_curry());
      var _delay = _interopRequireDefault(require_delay());
      var _makeBasicQueue = _interopRequireDefault(require_makeBasicQueue());
      var _onBodyLoad = _interopRequireDefault(require_onBodyLoad());
      var _pipe = _interopRequireDefault(require_pipe());
      var _preloadParams = _interopRequireDefault(require_preloadParams());
      var _queueManager = _interopRequireDefault(require_queueManager());
      var _queueTimeout = _interopRequireDefault(require_queueTimeout());
      var _relevancyFilter = _interopRequireDefault(require_relevancyFilter());
      var _trace = _interopRequireDefault(require_trace());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/absoluteMax.js
  var require_absoluteMax = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/absoluteMax.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var absoluteMax = (num1, num2) => Math.abs(num1) > Math.abs(num2) ? num1 : num2;
      var _default = exports.default = absoluteMax;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/absoluteMin.js
  var require_absoluteMin = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/absoluteMin.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var absoluteMin = (num1, num2) => Math.abs(num1) < Math.abs(num2) ? num1 : num2;
      var _default = exports.default = absoluteMin;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/compare.js
  var require_compare = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/compare.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var compare = (val1, val2) => val1 === val2 ? 0 : val1 > val2 ? 1 : -1;
      var _default = exports.default = compare;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/greatestCommonDivisor.js
  var require_greatestCommonDivisor = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/greatestCommonDivisor.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var greatestCommonDivisor = (num1, num2) => num2 === 0 ? num1 : greatestCommonDivisor(num2, num1 % num2);
      var _default = exports.default = greatestCommonDivisor;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/leastCommonMultiple.js
  var require_leastCommonMultiple = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/leastCommonMultiple.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _greatestCommonDivisor = _interopRequireDefault(require_greatestCommonDivisor());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var leastCommonMultiple = (num1, num2) => num1 === 0 || num2 === 0 ? 0 : num1 * num2 / (0, _greatestCommonDivisor.default)(num1, num2);
      var _default = exports.default = leastCommonMultiple;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/lowestCommonDenominator.js
  var require_lowestCommonDenominator = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/lowestCommonDenominator.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _leastCommonMultiple = _interopRequireDefault(require_leastCommonMultiple());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var lowestCommonDenominator = (...numbers) => numbers.reduce((num1, num2) => (0, _leastCommonMultiple.default)(num1, num2), 1);
      var _default = exports.default = lowestCommonDenominator;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/randomInteger.js
  var require_randomInteger = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/randomInteger.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var randomInteger = (range, offset = 0, interval = 1) => (Math.floor(Math.random() * range) + offset) * interval;
      var _default = exports.default = randomInteger;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/randomNumber.js
  var require_randomNumber = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/randomNumber.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var randomNumber = (range, offset = 0, interval = 1) => (Math.random() * range + offset) * interval;
      var _default = exports.default = randomNumber;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers/simplestRatio.js
  var require_simplestRatio = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers/simplestRatio.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      require_esnext_iterator_reduce();
      var _greatestCommonDivisor = _interopRequireDefault(require_greatestCommonDivisor());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var simplestRatio = (...numbers) => {
        if (numbers.length === 0) {
          return [];
        }
        let commonDivisor = numbers.reduce((num1, num2) => (0, _greatestCommonDivisor.default)(num1, num2), 0);
        commonDivisor = Math.abs(commonDivisor);
        return numbers.map((num) => commonDivisor === 0 ? 0 : num / commonDivisor);
      };
      var _default = exports.default = simplestRatio;
    }
  });

  // node_modules/si-funciona/dist/helpers/numbers.js
  var require_numbers = __commonJS({
    "node_modules/si-funciona/dist/helpers/numbers.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "absoluteMax", {
        enumerable: true,
        get: function() {
          return _absoluteMax.default;
        }
      });
      Object.defineProperty(exports, "absoluteMin", {
        enumerable: true,
        get: function() {
          return _absoluteMin.default;
        }
      });
      Object.defineProperty(exports, "compare", {
        enumerable: true,
        get: function() {
          return _compare.default;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "greatestCommonDivisor", {
        enumerable: true,
        get: function() {
          return _greatestCommonDivisor.default;
        }
      });
      Object.defineProperty(exports, "leastCommonMultiple", {
        enumerable: true,
        get: function() {
          return _leastCommonMultiple.default;
        }
      });
      Object.defineProperty(exports, "lowestCommonDenominator", {
        enumerable: true,
        get: function() {
          return _lowestCommonDenominator.default;
        }
      });
      Object.defineProperty(exports, "randomInteger", {
        enumerable: true,
        get: function() {
          return _randomInteger.default;
        }
      });
      Object.defineProperty(exports, "randomNumber", {
        enumerable: true,
        get: function() {
          return _randomNumber.default;
        }
      });
      Object.defineProperty(exports, "simplestRatio", {
        enumerable: true,
        get: function() {
          return _simplestRatio.default;
        }
      });
      var _absoluteMax = _interopRequireDefault(require_absoluteMax());
      var _absoluteMin = _interopRequireDefault(require_absoluteMin());
      var _compare = _interopRequireDefault(require_compare());
      var _greatestCommonDivisor = _interopRequireDefault(require_greatestCommonDivisor());
      var _leastCommonMultiple = _interopRequireDefault(require_leastCommonMultiple());
      var _lowestCommonDenominator = _interopRequireDefault(require_lowestCommonDenominator());
      var _randomInteger = _interopRequireDefault(require_randomInteger());
      var _randomNumber = _interopRequireDefault(require_randomNumber());
      var _simplestRatio = _interopRequireDefault(require_simplestRatio());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/strAfter.js
  var require_strAfter = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/strAfter.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var strAfter = (str, search) => {
        const index = str.indexOf(search);
        return index === -1 ? "" : str.substring(index + search.length);
      };
      var _default = exports.default = strAfter;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/strBefore.js
  var require_strBefore = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/strBefore.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var strBefore = (str, search) => {
        const index = str.indexOf(search);
        return index === -1 ? "" : str.slice(0, index);
      };
      var _default = exports.default = strBefore;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/dotGet.js
  var require_dotGet = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/dotGet.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isObject = _interopRequireDefault(require_isObject());
      var _strAfter = _interopRequireDefault(require_strAfter());
      var _strBefore = _interopRequireDefault(require_strBefore());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var dotGet = (arrayObject, dotNotation, defaultValue = null) => {
        let key = (0, _strBefore.default)(dotNotation, ".");
        const lastKey = !key;
        if (lastKey) {
          key = dotNotation;
        }
        if (key === "*") {
          const result = [];
          for (const wildKey in arrayObject) {
            const wildValue = arrayObject[wildKey];
            if (lastKey) {
              result[wildKey] = wildValue;
              continue;
            }
            if (!(0, _isObject.default)(wildValue)) {
              continue;
            }
            result[wildKey] = dotGet(wildValue, (0, _strAfter.default)(dotNotation, "."), defaultValue);
          }
          return result;
        }
        if (lastKey) {
          return arrayObject[dotNotation] ?? defaultValue;
        }
        if (typeof arrayObject[key] === "undefined") {
          return defaultValue;
        }
        const next = arrayObject[key];
        if (!(0, _isObject.default)(next)) {
          return defaultValue;
        }
        return dotGet(next, (0, _strAfter.default)(dotNotation, "."), defaultValue);
      };
      var _default = exports.default = dotGet;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/regexEscape.js
  var require_regexEscape = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/regexEscape.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.regexEscape = exports.default = void 0;
      var regexEscape = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      exports.regexEscape = regexEscape;
      var _default = exports.default = regexEscape;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/dotNotate.js
  var require_dotNotate = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/dotNotate.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var _emptyObject = _interopRequireDefault(require_emptyObject());
      var _isObject = _interopRequireDefault(require_isObject());
      var _regexEscape = _interopRequireDefault(require_regexEscape());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var handleRetainObjects = (retainObjects = []) => {
        if (!retainObjects.length) {
          return (currentKey, value, results) => false;
        }
        retainObjects = retainObjects.map(_regexEscape.default);
        const retainRegex = new RegExp(`(${retainObjects.join("|")})$`);
        return (currentKey, value, results) => {
          if (!currentKey.match(retainRegex)) {
            return false;
          }
          results[currentKey] = value;
          return true;
        };
      };
      var performDotNotate = (arrayObject, didRetain, prepend = "", results = {}) => {
        for (const key in arrayObject) {
          const value = arrayObject[key];
          const currentKey = `${prepend}${key}`;
          if (didRetain(currentKey, value, results)) {
            continue;
          }
          if ((0, _isObject.default)(value) && !(0, _emptyObject.default)(value)) {
            performDotNotate(value, didRetain, `${currentKey}.`, results);
            continue;
          }
          results[currentKey] = value;
        }
        return results;
      };
      var dotNotate = (arrayObject, retainObjects = []) => performDotNotate(arrayObject, handleRetainObjects(retainObjects));
      var _default = exports.default = dotNotate;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/dotSet.js
  var require_dotSet = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/dotSet.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isObject = _interopRequireDefault(require_isObject());
      var _strAfter = _interopRequireDefault(require_strAfter());
      var _strBefore = _interopRequireDefault(require_strBefore());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var dotSet = (arrayObject, dotNotation, value = null) => {
        let key = (0, _strBefore.default)(dotNotation, ".");
        const lastKey = !key;
        if (lastKey) {
          key = dotNotation;
        }
        if (key === "*") {
          for (const wildKey in arrayObject) {
            if (lastKey) {
              arrayObject[wildKey] = value;
              continue;
            }
            if (!(0, _isObject.default)(arrayObject[wildKey])) {
              continue;
            }
            dotSet(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, "."), value);
          }
          return arrayObject;
        }
        if (lastKey) {
          arrayObject[dotNotation] = value;
          return arrayObject;
        }
        const next = arrayObject[key] ?? [];
        arrayObject[key] = dotSet(next, (0, _strAfter.default)(dotNotation, "."), value);
        return arrayObject;
      };
      var _default = exports.default = dotSet;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/dotUnset.js
  var require_dotUnset = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/dotUnset.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isObject = _interopRequireDefault(require_isObject());
      var _strAfter = _interopRequireDefault(require_strAfter());
      var _strBefore = _interopRequireDefault(require_strBefore());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var dotUnset = (arrayObject, dotNotation) => {
        let key = (0, _strBefore.default)(dotNotation, ".");
        const lastKey = !key;
        if (lastKey) {
          key = dotNotation;
        }
        if (key === "*") {
          for (const wildKey in arrayObject) {
            if (lastKey) {
              delete arrayObject[wildKey];
              continue;
            }
            if (!(0, _isObject.default)(arrayObject[wildKey])) {
              continue;
            }
            dotUnset(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, "."));
          }
          return arrayObject;
        }
        if (lastKey) {
          delete arrayObject[dotNotation];
          return arrayObject;
        }
        const next = arrayObject[key] ?? [];
        arrayObject[key] = dotUnset(next, (0, _strAfter.default)(dotNotation, "."));
        return arrayObject;
      };
      var _default = exports.default = dotUnset;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/filterObject.js
  var require_filterObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/filterObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_filter();
      require_esnext_iterator_reduce();
      var _callWithParams = _interopRequireDefault(require_callWithParams());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var filterObject = (obj, fn, thisArg = void 0) => Array.isArray(obj) ? obj.filter(fn, thisArg) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => {
        if ((0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
          newObj[curr] = obj[curr];
        } else {
          delete newObj[curr];
        }
        return newObj;
      }, {});
      var _default = exports.default = filterObject;
    }
  });

  // node_modules/core-js/internals/regexp-flags-detection.js
  var require_regexp_flags_detection = __commonJS({
    "node_modules/core-js/internals/regexp-flags-detection.js"(exports, module) {
      "use strict";
      init_process();
      var globalThis2 = require_global_this();
      var fails = require_fails();
      var RegExp2 = globalThis2.RegExp;
      var FLAGS_GETTER_IS_CORRECT = !fails(function() {
        var INDICES_SUPPORT = true;
        try {
          RegExp2(".", "d");
        } catch (error) {
          INDICES_SUPPORT = false;
        }
        var O = {};
        var calls = "";
        var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
        var addGetter = function(key2, chr) {
          Object.defineProperty(O, key2, { get: function() {
            calls += chr;
            return true;
          } });
        };
        var pairs = {
          dotAll: "s",
          global: "g",
          ignoreCase: "i",
          multiline: "m",
          sticky: "y"
        };
        if (INDICES_SUPPORT) pairs.hasIndices = "d";
        for (var key in pairs) addGetter(key, pairs[key]);
        var result = Object.getOwnPropertyDescriptor(RegExp2.prototype, "flags").get.call(O);
        return result !== expected || calls !== expected;
      });
      module.exports = { correct: FLAGS_GETTER_IS_CORRECT };
    }
  });

  // node_modules/core-js/internals/regexp-flags.js
  var require_regexp_flags = __commonJS({
    "node_modules/core-js/internals/regexp-flags.js"(exports, module) {
      "use strict";
      init_process();
      var anObject = require_an_object();
      module.exports = function() {
        var that = anObject(this);
        var result = "";
        if (that.hasIndices) result += "d";
        if (that.global) result += "g";
        if (that.ignoreCase) result += "i";
        if (that.multiline) result += "m";
        if (that.dotAll) result += "s";
        if (that.unicode) result += "u";
        if (that.unicodeSets) result += "v";
        if (that.sticky) result += "y";
        return result;
      };
    }
  });

  // node_modules/core-js/modules/es.regexp.flags.js
  var require_es_regexp_flags = __commonJS({
    "node_modules/core-js/modules/es.regexp.flags.js"() {
      "use strict";
      init_process();
      var DESCRIPTORS = require_descriptors();
      var defineBuiltInAccessor = require_define_built_in_accessor();
      var regExpFlagsDetection = require_regexp_flags_detection();
      var regExpFlagsGetterImplementation = require_regexp_flags();
      if (DESCRIPTORS && !regExpFlagsDetection.correct) {
        defineBuiltInAccessor(RegExp.prototype, "flags", {
          configurable: true,
          get: regExpFlagsGetterImplementation
        });
        regExpFlagsDetection.correct = true;
      }
    }
  });

  // node_modules/core-js/internals/set-helpers.js
  var require_set_helpers = __commonJS({
    "node_modules/core-js/internals/set-helpers.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var SetPrototype = Set.prototype;
      module.exports = {
        // eslint-disable-next-line es/no-set -- safe
        Set,
        add: uncurryThis(SetPrototype.add),
        has: uncurryThis(SetPrototype.has),
        remove: uncurryThis(SetPrototype["delete"]),
        proto: SetPrototype
      };
    }
  });

  // node_modules/core-js/internals/a-set.js
  var require_a_set = __commonJS({
    "node_modules/core-js/internals/a-set.js"(exports, module) {
      "use strict";
      init_process();
      var has = require_set_helpers().has;
      module.exports = function(it) {
        has(it);
        return it;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.add-all.js
  var require_esnext_set_add_all = __commonJS({
    "node_modules/core-js/modules/esnext.set.add-all.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aSet = require_a_set();
      var add = require_set_helpers().add;
      $({ target: "Set", proto: true, real: true, forced: true }, {
        addAll: function addAll() {
          var set = aSet(this);
          for (var k = 0, len = arguments.length; k < len; k++) {
            add(set, arguments[k]);
          }
          return set;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.delete-all.js
  var require_esnext_set_delete_all = __commonJS({
    "node_modules/core-js/modules/esnext.set.delete-all.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aSet = require_a_set();
      var remove = require_set_helpers().remove;
      $({ target: "Set", proto: true, real: true, forced: true }, {
        deleteAll: function deleteAll() {
          var collection = aSet(this);
          var allDeleted = true;
          var wasDeleted;
          for (var k = 0, len = arguments.length; k < len; k++) {
            wasDeleted = remove(collection, arguments[k]);
            allDeleted = allDeleted && wasDeleted;
          }
          return !!allDeleted;
        }
      });
    }
  });

  // node_modules/core-js/internals/is-iterable.js
  var require_is_iterable = __commonJS({
    "node_modules/core-js/internals/is-iterable.js"(exports, module) {
      "use strict";
      init_process();
      var classof = require_classof_raw();
      var wellKnownSymbol = require_well_known_symbol();
      var ITERATOR = wellKnownSymbol("iterator");
      module.exports = function(it) {
        return it[ITERATOR] !== void 0 || it["@@iterator"] !== void 0 || classof(it) === "Arguments";
      };
    }
  });

  // node_modules/core-js/internals/to-set-like.js
  var require_to_set_like = __commonJS({
    "node_modules/core-js/internals/to-set-like.js"(exports, module) {
      "use strict";
      init_process();
      var getBuiltIn = require_get_built_in();
      var isCallable = require_is_callable();
      var isIterable = require_is_iterable();
      var isObject = require_is_object();
      var Set2 = getBuiltIn("Set");
      var isSetLike = function(it) {
        return isObject(it) && typeof it.size == "number" && isCallable(it.has) && isCallable(it.keys);
      };
      module.exports = function(it) {
        if (isSetLike(it)) return it;
        return isIterable(it) ? new Set2(it) : it;
      };
    }
  });

  // node_modules/core-js/internals/set-iterate.js
  var require_set_iterate = __commonJS({
    "node_modules/core-js/internals/set-iterate.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var iterateSimple = require_iterate_simple();
      var SetHelpers = require_set_helpers();
      var Set2 = SetHelpers.Set;
      var SetPrototype = SetHelpers.proto;
      var forEach = uncurryThis(SetPrototype.forEach);
      var keys = uncurryThis(SetPrototype.keys);
      var next = keys(new Set2()).next;
      module.exports = function(set, fn, interruptible) {
        return interruptible ? iterateSimple({ iterator: keys(set), next }, fn) : forEach(set, fn);
      };
    }
  });

  // node_modules/core-js/internals/set-clone.js
  var require_set_clone = __commonJS({
    "node_modules/core-js/internals/set-clone.js"(exports, module) {
      "use strict";
      init_process();
      var SetHelpers = require_set_helpers();
      var iterate = require_set_iterate();
      var Set2 = SetHelpers.Set;
      var add = SetHelpers.add;
      module.exports = function(set) {
        var result = new Set2();
        iterate(set, function(it) {
          add(result, it);
        });
        return result;
      };
    }
  });

  // node_modules/core-js/internals/function-uncurry-this-accessor.js
  var require_function_uncurry_this_accessor = __commonJS({
    "node_modules/core-js/internals/function-uncurry-this-accessor.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var aCallable = require_a_callable();
      module.exports = function(object, key, method) {
        try {
          return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
        } catch (error) {
        }
      };
    }
  });

  // node_modules/core-js/internals/set-size.js
  var require_set_size = __commonJS({
    "node_modules/core-js/internals/set-size.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThisAccessor = require_function_uncurry_this_accessor();
      var SetHelpers = require_set_helpers();
      module.exports = uncurryThisAccessor(SetHelpers.proto, "size", "get") || function(set) {
        return set.size;
      };
    }
  });

  // node_modules/core-js/internals/get-set-record.js
  var require_get_set_record = __commonJS({
    "node_modules/core-js/internals/get-set-record.js"(exports, module) {
      "use strict";
      init_process();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var call = require_function_call();
      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var getIteratorDirect = require_get_iterator_direct();
      var INVALID_SIZE = "Invalid size";
      var $RangeError = RangeError;
      var $TypeError = TypeError;
      var max = Math.max;
      var SetRecord = function(set, intSize) {
        this.set = set;
        this.size = max(intSize, 0);
        this.has = aCallable(set.has);
        this.keys = aCallable(set.keys);
      };
      SetRecord.prototype = {
        getIterator: function() {
          return getIteratorDirect(anObject(call(this.keys, this.set)));
        },
        includes: function(it) {
          return call(this.has, this.set, it);
        }
      };
      module.exports = function(obj) {
        anObject(obj);
        var numSize = +obj.size;
        if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
        var intSize = toIntegerOrInfinity(numSize);
        if (intSize < 0) throw new $RangeError(INVALID_SIZE);
        return new SetRecord(obj, intSize);
      };
    }
  });

  // node_modules/core-js/internals/set-difference.js
  var require_set_difference = __commonJS({
    "node_modules/core-js/internals/set-difference.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var SetHelpers = require_set_helpers();
      var clone = require_set_clone();
      var size = require_set_size();
      var getSetRecord = require_get_set_record();
      var iterateSet = require_set_iterate();
      var iterateSimple = require_iterate_simple();
      var has = SetHelpers.has;
      var remove = SetHelpers.remove;
      module.exports = function difference(other) {
        var O = aSet(this);
        var otherRec = getSetRecord(other);
        var result = clone(O);
        if (size(result) <= otherRec.size) iterateSet(result, function(e) {
          if (otherRec.includes(e)) remove(result, e);
        });
        else iterateSimple(otherRec.getIterator(), function(e) {
          if (has(result, e)) remove(result, e);
        });
        return result;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.difference.js
  var require_esnext_set_difference = __commonJS({
    "node_modules/core-js/modules/esnext.set.difference.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $difference = require_set_difference();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        difference: function difference(other) {
          return call($difference, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.every.js
  var require_esnext_set_every = __commonJS({
    "node_modules/core-js/modules/esnext.set.every.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aSet = require_a_set();
      var iterate = require_set_iterate();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        every: function every(callbackfn) {
          var set = aSet(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          return iterate(set, function(value) {
            if (!boundFunction(value, value, set)) return false;
          }, true) !== false;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.filter.js
  var require_esnext_set_filter = __commonJS({
    "node_modules/core-js/modules/esnext.set.filter.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aSet = require_a_set();
      var SetHelpers = require_set_helpers();
      var iterate = require_set_iterate();
      var Set2 = SetHelpers.Set;
      var add = SetHelpers.add;
      $({ target: "Set", proto: true, real: true, forced: true }, {
        filter: function filter(callbackfn) {
          var set = aSet(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var newSet = new Set2();
          iterate(set, function(value) {
            if (boundFunction(value, value, set)) add(newSet, value);
          });
          return newSet;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.find.js
  var require_esnext_set_find = __commonJS({
    "node_modules/core-js/modules/esnext.set.find.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aSet = require_a_set();
      var iterate = require_set_iterate();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        find: function find(callbackfn) {
          var set = aSet(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var result = iterate(set, function(value) {
            if (boundFunction(value, value, set)) return { value };
          }, true);
          return result && result.value;
        }
      });
    }
  });

  // node_modules/core-js/internals/set-intersection.js
  var require_set_intersection = __commonJS({
    "node_modules/core-js/internals/set-intersection.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var SetHelpers = require_set_helpers();
      var size = require_set_size();
      var getSetRecord = require_get_set_record();
      var iterateSet = require_set_iterate();
      var iterateSimple = require_iterate_simple();
      var Set2 = SetHelpers.Set;
      var add = SetHelpers.add;
      var has = SetHelpers.has;
      module.exports = function intersection(other) {
        var O = aSet(this);
        var otherRec = getSetRecord(other);
        var result = new Set2();
        if (size(O) > otherRec.size) {
          iterateSimple(otherRec.getIterator(), function(e) {
            if (has(O, e)) add(result, e);
          });
        } else {
          iterateSet(O, function(e) {
            if (otherRec.includes(e)) add(result, e);
          });
        }
        return result;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.intersection.js
  var require_esnext_set_intersection = __commonJS({
    "node_modules/core-js/modules/esnext.set.intersection.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $intersection = require_set_intersection();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        intersection: function intersection(other) {
          return call($intersection, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/internals/set-is-disjoint-from.js
  var require_set_is_disjoint_from = __commonJS({
    "node_modules/core-js/internals/set-is-disjoint-from.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var has = require_set_helpers().has;
      var size = require_set_size();
      var getSetRecord = require_get_set_record();
      var iterateSet = require_set_iterate();
      var iterateSimple = require_iterate_simple();
      var iteratorClose = require_iterator_close();
      module.exports = function isDisjointFrom(other) {
        var O = aSet(this);
        var otherRec = getSetRecord(other);
        if (size(O) <= otherRec.size) return iterateSet(O, function(e) {
          if (otherRec.includes(e)) return false;
        }, true) !== false;
        var iterator = otherRec.getIterator();
        return iterateSimple(iterator, function(e) {
          if (has(O, e)) return iteratorClose(iterator.iterator, "normal", false);
        }) !== false;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.is-disjoint-from.js
  var require_esnext_set_is_disjoint_from = __commonJS({
    "node_modules/core-js/modules/esnext.set.is-disjoint-from.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $isDisjointFrom = require_set_is_disjoint_from();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        isDisjointFrom: function isDisjointFrom(other) {
          return call($isDisjointFrom, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/internals/set-is-subset-of.js
  var require_set_is_subset_of = __commonJS({
    "node_modules/core-js/internals/set-is-subset-of.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var size = require_set_size();
      var iterate = require_set_iterate();
      var getSetRecord = require_get_set_record();
      module.exports = function isSubsetOf(other) {
        var O = aSet(this);
        var otherRec = getSetRecord(other);
        if (size(O) > otherRec.size) return false;
        return iterate(O, function(e) {
          if (!otherRec.includes(e)) return false;
        }, true) !== false;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.is-subset-of.js
  var require_esnext_set_is_subset_of = __commonJS({
    "node_modules/core-js/modules/esnext.set.is-subset-of.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $isSubsetOf = require_set_is_subset_of();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        isSubsetOf: function isSubsetOf(other) {
          return call($isSubsetOf, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/internals/set-is-superset-of.js
  var require_set_is_superset_of = __commonJS({
    "node_modules/core-js/internals/set-is-superset-of.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var has = require_set_helpers().has;
      var size = require_set_size();
      var getSetRecord = require_get_set_record();
      var iterateSimple = require_iterate_simple();
      var iteratorClose = require_iterator_close();
      module.exports = function isSupersetOf(other) {
        var O = aSet(this);
        var otherRec = getSetRecord(other);
        if (size(O) < otherRec.size) return false;
        var iterator = otherRec.getIterator();
        return iterateSimple(iterator, function(e) {
          if (!has(O, e)) return iteratorClose(iterator.iterator, "normal", false);
        }) !== false;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.is-superset-of.js
  var require_esnext_set_is_superset_of = __commonJS({
    "node_modules/core-js/modules/esnext.set.is-superset-of.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $isSupersetOf = require_set_is_superset_of();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        isSupersetOf: function isSupersetOf(other) {
          return call($isSupersetOf, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/internals/to-string-tag-support.js
  var require_to_string_tag_support = __commonJS({
    "node_modules/core-js/internals/to-string-tag-support.js"(exports, module) {
      "use strict";
      init_process();
      var wellKnownSymbol = require_well_known_symbol();
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      var test = {};
      test[TO_STRING_TAG] = "z";
      module.exports = String(test) === "[object z]";
    }
  });

  // node_modules/core-js/internals/classof.js
  var require_classof = __commonJS({
    "node_modules/core-js/internals/classof.js"(exports, module) {
      "use strict";
      init_process();
      var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
      var isCallable = require_is_callable();
      var classofRaw = require_classof_raw();
      var wellKnownSymbol = require_well_known_symbol();
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      var $Object = Object;
      var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ (function() {
        return arguments;
      })()) === "Arguments";
      var tryGet = function(it, key) {
        try {
          return it[key];
        } catch (error) {
        }
      };
      module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
        var O, tag, result;
        return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable(O.callee) ? "Arguments" : result;
      };
    }
  });

  // node_modules/core-js/internals/to-string.js
  var require_to_string = __commonJS({
    "node_modules/core-js/internals/to-string.js"(exports, module) {
      "use strict";
      init_process();
      var classof = require_classof();
      var $String = String;
      module.exports = function(argument) {
        if (classof(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return $String(argument);
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.join.js
  var require_esnext_set_join = __commonJS({
    "node_modules/core-js/modules/esnext.set.join.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var uncurryThis = require_function_uncurry_this();
      var aSet = require_a_set();
      var iterate = require_set_iterate();
      var toString = require_to_string();
      var arrayJoin = uncurryThis([].join);
      var push = uncurryThis([].push);
      $({ target: "Set", proto: true, real: true, forced: true }, {
        join: function join(separator) {
          var set = aSet(this);
          var sep = separator === void 0 ? "," : toString(separator);
          var array = [];
          iterate(set, function(value) {
            push(array, value);
          });
          return arrayJoin(array, sep);
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.map.js
  var require_esnext_set_map = __commonJS({
    "node_modules/core-js/modules/esnext.set.map.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aSet = require_a_set();
      var SetHelpers = require_set_helpers();
      var iterate = require_set_iterate();
      var Set2 = SetHelpers.Set;
      var add = SetHelpers.add;
      $({ target: "Set", proto: true, real: true, forced: true }, {
        map: function map(callbackfn) {
          var set = aSet(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          var newSet = new Set2();
          iterate(set, function(value) {
            add(newSet, boundFunction(value, value, set));
          });
          return newSet;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.reduce.js
  var require_esnext_set_reduce = __commonJS({
    "node_modules/core-js/modules/esnext.set.reduce.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aCallable = require_a_callable();
      var aSet = require_a_set();
      var iterate = require_set_iterate();
      var $TypeError = TypeError;
      $({ target: "Set", proto: true, real: true, forced: true }, {
        reduce: function reduce(callbackfn) {
          var set = aSet(this);
          var noInitial = arguments.length < 2;
          var accumulator = noInitial ? void 0 : arguments[1];
          aCallable(callbackfn);
          iterate(set, function(value) {
            if (noInitial) {
              noInitial = false;
              accumulator = value;
            } else {
              accumulator = callbackfn(accumulator, value, value, set);
            }
          });
          if (noInitial) throw new $TypeError("Reduce of empty set with no initial value");
          return accumulator;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.set.some.js
  var require_esnext_set_some = __commonJS({
    "node_modules/core-js/modules/esnext.set.some.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var bind = require_function_bind_context();
      var aSet = require_a_set();
      var iterate = require_set_iterate();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        some: function some(callbackfn) {
          var set = aSet(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          return iterate(set, function(value) {
            if (boundFunction(value, value, set)) return true;
          }, true) === true;
        }
      });
    }
  });

  // node_modules/core-js/internals/set-symmetric-difference.js
  var require_set_symmetric_difference = __commonJS({
    "node_modules/core-js/internals/set-symmetric-difference.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var SetHelpers = require_set_helpers();
      var clone = require_set_clone();
      var getSetRecord = require_get_set_record();
      var iterateSimple = require_iterate_simple();
      var add = SetHelpers.add;
      var has = SetHelpers.has;
      var remove = SetHelpers.remove;
      module.exports = function symmetricDifference(other) {
        var O = aSet(this);
        var keysIter = getSetRecord(other).getIterator();
        var result = clone(O);
        iterateSimple(keysIter, function(e) {
          if (has(O, e)) remove(result, e);
          else add(result, e);
        });
        return result;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.symmetric-difference.js
  var require_esnext_set_symmetric_difference = __commonJS({
    "node_modules/core-js/modules/esnext.set.symmetric-difference.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $symmetricDifference = require_set_symmetric_difference();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        symmetricDifference: function symmetricDifference(other) {
          return call($symmetricDifference, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/internals/set-union.js
  var require_set_union = __commonJS({
    "node_modules/core-js/internals/set-union.js"(exports, module) {
      "use strict";
      init_process();
      var aSet = require_a_set();
      var add = require_set_helpers().add;
      var clone = require_set_clone();
      var getSetRecord = require_get_set_record();
      var iterateSimple = require_iterate_simple();
      module.exports = function union(other) {
        var O = aSet(this);
        var keysIter = getSetRecord(other).getIterator();
        var result = clone(O);
        iterateSimple(keysIter, function(it) {
          add(result, it);
        });
        return result;
      };
    }
  });

  // node_modules/core-js/modules/esnext.set.union.js
  var require_esnext_set_union = __commonJS({
    "node_modules/core-js/modules/esnext.set.union.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var toSetLike = require_to_set_like();
      var $union = require_set_union();
      $({ target: "Set", proto: true, real: true, forced: true }, {
        union: function union(other) {
          return call($union, this, toSetLike(other));
        }
      });
    }
  });

  // node_modules/core-js/internals/weak-set-helpers.js
  var require_weak_set_helpers = __commonJS({
    "node_modules/core-js/internals/weak-set-helpers.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var WeakSetPrototype = WeakSet.prototype;
      module.exports = {
        // eslint-disable-next-line es/no-weak-set -- safe
        WeakSet,
        add: uncurryThis(WeakSetPrototype.add),
        has: uncurryThis(WeakSetPrototype.has),
        remove: uncurryThis(WeakSetPrototype["delete"])
      };
    }
  });

  // node_modules/core-js/internals/a-weak-set.js
  var require_a_weak_set = __commonJS({
    "node_modules/core-js/internals/a-weak-set.js"(exports, module) {
      "use strict";
      init_process();
      var has = require_weak_set_helpers().has;
      module.exports = function(it) {
        has(it);
        return it;
      };
    }
  });

  // node_modules/core-js/modules/esnext.weak-set.add-all.js
  var require_esnext_weak_set_add_all = __commonJS({
    "node_modules/core-js/modules/esnext.weak-set.add-all.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aWeakSet = require_a_weak_set();
      var add = require_weak_set_helpers().add;
      $({ target: "WeakSet", proto: true, real: true, forced: true }, {
        addAll: function addAll() {
          var set = aWeakSet(this);
          for (var k = 0, len = arguments.length; k < len; k++) {
            add(set, arguments[k]);
          }
          return set;
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.weak-set.delete-all.js
  var require_esnext_weak_set_delete_all = __commonJS({
    "node_modules/core-js/modules/esnext.weak-set.delete-all.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var aWeakSet = require_a_weak_set();
      var remove = require_weak_set_helpers().remove;
      $({ target: "WeakSet", proto: true, real: true, forced: true }, {
        deleteAll: function deleteAll() {
          var collection = aWeakSet(this);
          var allDeleted = true;
          var wasDeleted;
          for (var k = 0, len = arguments.length; k < len; k++) {
            wasDeleted = remove(collection, arguments[k]);
            allDeleted = allDeleted && wasDeleted;
          }
          return !!allDeleted;
        }
      });
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/isEqual.js
  var require_isEqual = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/isEqual.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_es_regexp_flags();
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      require_esnext_iterator_some();
      require_esnext_map_delete_all();
      require_esnext_map_every();
      require_esnext_map_filter();
      require_esnext_map_find();
      require_esnext_map_find_key();
      require_esnext_map_includes();
      require_esnext_map_key_of();
      require_esnext_map_map_keys();
      require_esnext_map_map_values();
      require_esnext_map_merge();
      require_esnext_map_reduce();
      require_esnext_map_some();
      require_esnext_map_update();
      require_esnext_set_add_all();
      require_esnext_set_delete_all();
      require_esnext_set_difference();
      require_esnext_set_every();
      require_esnext_set_filter();
      require_esnext_set_find();
      require_esnext_set_intersection();
      require_esnext_set_is_disjoint_from();
      require_esnext_set_is_subset_of();
      require_esnext_set_is_superset_of();
      require_esnext_set_join();
      require_esnext_set_map();
      require_esnext_set_reduce();
      require_esnext_set_some();
      require_esnext_set_symmetric_difference();
      require_esnext_set_union();
      require_esnext_weak_map_delete_all();
      require_esnext_weak_set_add_all();
      require_esnext_weak_set_delete_all();
      var sameValueZero = (first, second) => first === second || Number.isNaN(first) && Number.isNaN(second);
      var compare = (first, second, seen) => {
        if (sameValueZero(first, second)) {
          return true;
        }
        if (typeof first !== "object" || typeof second !== "object" || first === null || second === null) {
          return false;
        }
        if (Object.getPrototypeOf(first) !== Object.getPrototypeOf(second)) {
          return false;
        }
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
          return first.size === second.size && Array.from(first.values()).every((value) => others.some((other) => compare(value, other, seen)));
        }
        if (Array.isArray(first) && first.length !== second.length) {
          return false;
        }
        const firstKeys = Object.keys(first);
        const secondKeys = Object.keys(second);
        return firstKeys.length === secondKeys.length && firstKeys.every((key) => Object.prototype.hasOwnProperty.call(second, key) && compare(first[key], second[key], seen));
      };
      var isEqual = (first, second) => compare(first, second, /* @__PURE__ */ new WeakMap());
      var _default = exports.default = isEqual;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/mapObject.js
  var require_mapObject = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/mapObject.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      require_esnext_iterator_reduce();
      var _callWithParams = _interopRequireDefault(require_callWithParams());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      var _setValue = _interopRequireDefault(require_setValue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var mapObject = (obj, fn, thisArg = void 0) => Array.isArray(obj) ? obj.map(fn, thisArg) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => (0, _setValue.default)(curr, (0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2), newObj), {});
      var _default = exports.default = mapObject;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/mergeObjects.js
  var require_mergeObjects = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/mergeObjects.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _mergeObjectsBase = _interopRequireDefault(require_mergeObjectsBase());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var mergeObjects = (0, _mergeObjectsBase.default)({
        useClone: true
      });
      var _default = exports.default = mergeObjects;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/mergeObjectsMutable.js
  var require_mergeObjectsMutable = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/mergeObjectsMutable.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _mergeObjectsBase = _interopRequireDefault(require_mergeObjectsBase());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var mergeObjectsMutable = (0, _mergeObjectsBase.default)();
      var _default = exports.default = mergeObjectsMutable;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/objectValues.js
  var require_objectValues = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/objectValues.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var objectValues = (object, includeInherited = false) => (0, _objectKeys.default)(object, includeInherited).map((key) => object[key]);
      var _default = exports.default = objectValues;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects/setAndReturnValue.js
  var require_setAndReturnValue = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects/setAndReturnValue.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var setAndReturnValue = (item, key, value) => {
        item[key] = value;
        return value;
      };
      var _default = exports.default = setAndReturnValue;
    }
  });

  // node_modules/si-funciona/dist/helpers/objects.js
  var require_objects = __commonJS({
    "node_modules/si-funciona/dist/helpers/objects.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "cloneObject", {
        enumerable: true,
        get: function() {
          return _cloneObject.default;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "dotGet", {
        enumerable: true,
        get: function() {
          return _dotGet.default;
        }
      });
      Object.defineProperty(exports, "dotNotate", {
        enumerable: true,
        get: function() {
          return _dotNotate.default;
        }
      });
      Object.defineProperty(exports, "dotSet", {
        enumerable: true,
        get: function() {
          return _dotSet.default;
        }
      });
      Object.defineProperty(exports, "dotUnset", {
        enumerable: true,
        get: function() {
          return _dotUnset.default;
        }
      });
      Object.defineProperty(exports, "emptyObject", {
        enumerable: true,
        get: function() {
          return _emptyObject.default;
        }
      });
      Object.defineProperty(exports, "filterObject", {
        enumerable: true,
        get: function() {
          return _filterObject.default;
        }
      });
      Object.defineProperty(exports, "isCloneable", {
        enumerable: true,
        get: function() {
          return _isCloneable.default;
        }
      });
      Object.defineProperty(exports, "isEqual", {
        enumerable: true,
        get: function() {
          return _isEqual.default;
        }
      });
      Object.defineProperty(exports, "isInstanceObject", {
        enumerable: true,
        get: function() {
          return _isInstanceObject.default;
        }
      });
      Object.defineProperty(exports, "isObject", {
        enumerable: true,
        get: function() {
          return _isObject.default;
        }
      });
      Object.defineProperty(exports, "mapObject", {
        enumerable: true,
        get: function() {
          return _mapObject.default;
        }
      });
      Object.defineProperty(exports, "mergeObjects", {
        enumerable: true,
        get: function() {
          return _mergeObjects.default;
        }
      });
      Object.defineProperty(exports, "mergeObjectsBase", {
        enumerable: true,
        get: function() {
          return _mergeObjectsBase.default;
        }
      });
      Object.defineProperty(exports, "mergeObjectsMutable", {
        enumerable: true,
        get: function() {
          return _mergeObjectsMutable.default;
        }
      });
      Object.defineProperty(exports, "objectKeys", {
        enumerable: true,
        get: function() {
          return _objectKeys.default;
        }
      });
      Object.defineProperty(exports, "objectValues", {
        enumerable: true,
        get: function() {
          return _objectValues.default;
        }
      });
      Object.defineProperty(exports, "reduceObject", {
        enumerable: true,
        get: function() {
          return _reduceObject.default;
        }
      });
      Object.defineProperty(exports, "setAndReturnValue", {
        enumerable: true,
        get: function() {
          return _setAndReturnValue.default;
        }
      });
      Object.defineProperty(exports, "setValue", {
        enumerable: true,
        get: function() {
          return _setValue.default;
        }
      });
      var _cloneObject = _interopRequireDefault(require_cloneObject());
      var _dotGet = _interopRequireDefault(require_dotGet());
      var _dotNotate = _interopRequireDefault(require_dotNotate());
      var _dotSet = _interopRequireDefault(require_dotSet());
      var _dotUnset = _interopRequireDefault(require_dotUnset());
      var _emptyObject = _interopRequireDefault(require_emptyObject());
      var _filterObject = _interopRequireDefault(require_filterObject());
      var _isCloneable = _interopRequireDefault(require_isCloneable());
      var _isEqual = _interopRequireDefault(require_isEqual());
      var _isInstanceObject = _interopRequireDefault(require_isInstanceObject());
      var _isObject = _interopRequireDefault(require_isObject());
      var _mapObject = _interopRequireDefault(require_mapObject());
      var _mergeObjects = _interopRequireDefault(require_mergeObjects());
      var _mergeObjectsBase = _interopRequireDefault(require_mergeObjectsBase());
      var _mergeObjectsMutable = _interopRequireDefault(require_mergeObjectsMutable());
      var _objectKeys = _interopRequireDefault(require_objectKeys());
      var _objectValues = _interopRequireDefault(require_objectValues());
      var _reduceObject = _interopRequireDefault(require_reduceObject());
      var _setAndReturnValue = _interopRequireDefault(require_setAndReturnValue());
      var _setValue = _interopRequireDefault(require_setValue());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/ucFirst.js
  var require_ucFirst = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/ucFirst.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      var _default = exports.default = ucFirst;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/words.js
  var require_words = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/words.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var words = (str) => str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g);
      var _default = exports.default = words;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/camelCase.js
  var require_camelCase = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/camelCase.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _ucFirst = _interopRequireDefault(require_ucFirst());
      var _words = _interopRequireDefault(require_words());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var camelCase = (str) => (0, _words.default)(str).reduce((camel, part) => camel ? camel.concat((0, _ucFirst.default)(part)) : part.toLowerCase(), "");
      var _default = exports.default = camelCase;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/kabobCase.js
  var require_kabobCase = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/kabobCase.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _words = _interopRequireDefault(require_words());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var kabobCase = (str) => (0, _words.default)(str).reduce((kabob, part) => kabob ? kabob.concat("-" + part.toLowerCase()) : part.toLowerCase(), "");
      var _default = exports.default = kabobCase;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/strBeforeLast.js
  var require_strBeforeLast = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/strBeforeLast.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var strBeforeLast = (str, search) => {
        const index = str.lastIndexOf(search);
        return index === -1 ? "" : str.substring(0, index);
      };
      var _default = exports.default = strBeforeLast;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/makeFilepath.js
  var require_makeFilepath = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/makeFilepath.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeFilepath = exports.default = void 0;
      var _strBeforeLast = _interopRequireDefault(require_strBeforeLast());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var makeFilepath = (root, append = "") => {
        if (root.startsWith("./")) {
          root = root.slice(2);
        }
        if (root.startsWith("/")) {
          root = root.slice(1);
        }
        if (root.endsWith("/")) {
          root = root.slice(0, -1);
        }
        if (append.startsWith("/")) {
          append = append.slice(1);
        }
        if (append.startsWith("./")) {
          append = append.slice(2);
        }
        if (append.startsWith("../")) {
          if (!root) {
            return append.endsWith("/") ? append.slice(0, -1) : append;
          }
          append = append.slice(3);
          root = (0, _strBeforeLast.default)(root, "/");
          return makeFilepath(root, append);
        }
        if (append.endsWith("/")) {
          append = append.slice(0, -1);
        }
        if (!root) {
          return append;
        }
        return append ? `${root}/${append}` : root;
      };
      exports.makeFilepath = makeFilepath;
      var _default = exports.default = makeFilepath;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/makeRelativePath.js
  var require_makeRelativePath = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/makeRelativePath.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeRelativePath = exports.default = void 0;
      var _strBefore = _interopRequireDefault(require_strBefore());
      var _strAfter = _interopRequireDefault(require_strAfter());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var makeRelativePath = (fromFile, toFile) => {
        let relativePath = toFile;
        let nextPart = fromFile;
        let firstPart = (0, _strBefore.default)(nextPart, "/");
        let hasMatches = false;
        while (firstPart && relativePath.startsWith(firstPart)) {
          relativePath = (0, _strAfter.default)(relativePath, `${firstPart}/`);
          nextPart = (0, _strAfter.default)(nextPart, `${firstPart}/`);
          firstPart = (0, _strBefore.default)(nextPart, "/");
          hasMatches = true;
        }
        if (!hasMatches) {
          return relativePath;
        }
        let relativePrefix = "";
        const nextParts = nextPart.split("/");
        if (nextParts.length < 2) {
          relativePrefix = "./";
        }
        for (let i = 1; i < nextParts.length; ++i) {
          relativePrefix += "../";
        }
        return relativePrefix + relativePath;
      };
      exports.makeRelativePath = makeRelativePath;
      var _default = exports.default = makeRelativePath;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/snakeCase.js
  var require_snakeCase = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/snakeCase.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _words = _interopRequireDefault(require_words());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var snakeCase = (str) => (0, _words.default)(str).reduce((snake, part) => snake ? snake.concat("_" + part.toLowerCase()) : part.toLowerCase(), "");
      var _default = exports.default = snakeCase;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/strAfterLast.js
  var require_strAfterLast = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/strAfterLast.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var strAfterLast = (str, search) => {
        const index = str.lastIndexOf(search);
        return index === -1 ? "" : str.substring(index + search.length);
      };
      var _default = exports.default = strAfterLast;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings/titleCase.js
  var require_titleCase = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings/titleCase.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _ucFirst = _interopRequireDefault(require_ucFirst());
      var _words = _interopRequireDefault(require_words());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var titleCase = (str) => (0, _words.default)(str).reduce((title, part) => title ? title.concat(" " + (0, _ucFirst.default)(part)) : (0, _ucFirst.default)(part), "");
      var _default = exports.default = titleCase;
    }
  });

  // node_modules/si-funciona/dist/helpers/strings.js
  var require_strings = __commonJS({
    "node_modules/si-funciona/dist/helpers/strings.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "camelCase", {
        enumerable: true,
        get: function() {
          return _camelCase.default;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "kabobCase", {
        enumerable: true,
        get: function() {
          return _kabobCase.default;
        }
      });
      Object.defineProperty(exports, "makeFilepath", {
        enumerable: true,
        get: function() {
          return _makeFilepath.default;
        }
      });
      Object.defineProperty(exports, "makeRelativePath", {
        enumerable: true,
        get: function() {
          return _makeRelativePath.default;
        }
      });
      Object.defineProperty(exports, "regexEscape", {
        enumerable: true,
        get: function() {
          return _regexEscape.default;
        }
      });
      Object.defineProperty(exports, "snakeCase", {
        enumerable: true,
        get: function() {
          return _snakeCase.default;
        }
      });
      Object.defineProperty(exports, "strAfter", {
        enumerable: true,
        get: function() {
          return _strAfter.default;
        }
      });
      Object.defineProperty(exports, "strAfterLast", {
        enumerable: true,
        get: function() {
          return _strAfterLast.default;
        }
      });
      Object.defineProperty(exports, "strBefore", {
        enumerable: true,
        get: function() {
          return _strBefore.default;
        }
      });
      Object.defineProperty(exports, "strBeforeLast", {
        enumerable: true,
        get: function() {
          return _strBeforeLast.default;
        }
      });
      Object.defineProperty(exports, "titleCase", {
        enumerable: true,
        get: function() {
          return _titleCase.default;
        }
      });
      Object.defineProperty(exports, "ucFirst", {
        enumerable: true,
        get: function() {
          return _ucFirst.default;
        }
      });
      Object.defineProperty(exports, "words", {
        enumerable: true,
        get: function() {
          return _words.default;
        }
      });
      var _camelCase = _interopRequireDefault(require_camelCase());
      var _kabobCase = _interopRequireDefault(require_kabobCase());
      var _makeFilepath = _interopRequireDefault(require_makeFilepath());
      var _makeRelativePath = _interopRequireDefault(require_makeRelativePath());
      var _regexEscape = _interopRequireDefault(require_regexEscape());
      var _snakeCase = _interopRequireDefault(require_snakeCase());
      var _strAfter = _interopRequireDefault(require_strAfter());
      var _strAfterLast = _interopRequireDefault(require_strAfterLast());
      var _strBefore = _interopRequireDefault(require_strBefore());
      var _strBeforeLast = _interopRequireDefault(require_strBeforeLast());
      var _titleCase = _interopRequireDefault(require_titleCase());
      var _ucFirst = _interopRequireDefault(require_ucFirst());
      var _words = _interopRequireDefault(require_words());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
    }
  });

  // node_modules/si-funciona/dist/main.js
  var require_main = __commonJS({
    "node_modules/si-funciona/dist/main.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      require_esnext_weak_map_delete_all();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _exportNames = {};
      exports.default = void 0;
      var _arrays = _interopRequireWildcard(require_arrays());
      Object.keys(_arrays).forEach(function(key) {
        if (key === "default" || key === "__esModule") return;
        if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
        if (key in exports && exports[key] === _arrays[key]) return;
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function() {
            return _arrays[key];
          }
        });
      });
      var _descriptors = _interopRequireWildcard(require_descriptors2());
      Object.keys(_descriptors).forEach(function(key) {
        if (key === "default" || key === "__esModule") return;
        if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
        if (key in exports && exports[key] === _descriptors[key]) return;
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function() {
            return _descriptors[key];
          }
        });
      });
      var _functions = _interopRequireWildcard(require_functions());
      Object.keys(_functions).forEach(function(key) {
        if (key === "default" || key === "__esModule") return;
        if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
        if (key in exports && exports[key] === _functions[key]) return;
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function() {
            return _functions[key];
          }
        });
      });
      var _numbers = _interopRequireWildcard(require_numbers());
      Object.keys(_numbers).forEach(function(key) {
        if (key === "default" || key === "__esModule") return;
        if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
        if (key in exports && exports[key] === _numbers[key]) return;
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function() {
            return _numbers[key];
          }
        });
      });
      var _objects = _interopRequireWildcard(require_objects());
      Object.keys(_objects).forEach(function(key) {
        if (key === "default" || key === "__esModule") return;
        if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
        if (key in exports && exports[key] === _objects[key]) return;
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function() {
            return _objects[key];
          }
        });
      });
      var _strings = _interopRequireWildcard(require_strings());
      Object.keys(_strings).forEach(function(key) {
        if (key === "default" || key === "__esModule") return;
        if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
        if (key in exports && exports[key] === _strings[key]) return;
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function() {
            return _strings[key];
          }
        });
      });
      function _interopRequireWildcard(e, t) {
        if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
        return (_interopRequireWildcard = function(e2, t2) {
          if (!t2 && e2 && e2.__esModule) return e2;
          var o, i, f = { __proto__: null, default: e2 };
          if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
          if (o = t2 ? n : r) {
            if (o.has(e2)) return o.get(e2);
            o.set(e2, f);
          }
          for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
          return f;
        })(e, t);
      }
      var siFunciona = Object.assign({}, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default, _strings.default);
      var _default = exports.default = siFunciona;
      if (void 0) {
        (void 0)["siFunciona"] = siFunciona;
      } else if (typeof window !== "undefined") {
        window["siFunciona"] = siFunciona;
      }
    }
  });

  // node_modules/json-dom/dist/domItem/tree/getTopParentItem.js
  var require_getTopParentItem = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/getTopParentItem.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getTopParentItem = (item) => {
        if (item.parentItem === null) {
          if (item.nodeName === "#document") {
            throw new Error("Root parent item must be an empty object, null reference found.");
          }
          throw new Error("Detached child, missing parentItem reference. Use empty object if this is the root item.");
        }
        return si_funciona_1.default.emptyObject(item.parentItem) ? item : getTopParentItem(item.parentItem);
      };
      exports.default = getTopParentItem;
    }
  });

  // node_modules/json-dom/dist/events/functions/makeEventHandler.js
  var require_makeEventHandler = __commonJS({
    "node_modules/json-dom/dist/events/functions/makeEventHandler.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var makeEventHandler = (listener, item, ...args) => {
        return (event) => {
          if (!event || event.immediatePropagationStopped) {
            return event;
          }
          return listener(event, item, ...args);
        };
      };
      exports.default = makeEventHandler;
    }
  });

  // node_modules/json-dom/dist/events/objects/createEventResponder.js
  var require_createEventResponder = __commonJS({
    "node_modules/json-dom/dist/events/objects/createEventResponder.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createEventResponder = (eventHandler, abort = null) => {
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
    }
  });

  // node_modules/json-dom/dist/events/objects/options/getListenerOptions.js
  var require_getListenerOptions = __commonJS({
    "node_modules/json-dom/dist/events/objects/options/getListenerOptions.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var CAPTURE = 1;
      var ONCE = 2;
      var PASSIVE = 4;
      var SIGNAL = 8;
      var getListenerOptions = () => ({
        capture: CAPTURE,
        once: ONCE,
        passive: PASSIVE,
        signal: SIGNAL
      });
      exports.default = getListenerOptions;
    }
  });

  // node_modules/json-dom/dist/events/objects/options/optionsToNumber.js
  var require_optionsToNumber = __commonJS({
    "node_modules/json-dom/dist/events/objects/options/optionsToNumber.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var optionsToNumber = (optionsTemplate, listenerOptions) => {
        if (!listenerOptions) {
          return 0;
        }
        return si_funciona_1.default.reduceObject(optionsTemplate, (binaryOptions, flag, name) => listenerOptions[name] ? binaryOptions | flag : binaryOptions, 0);
      };
      exports.default = optionsToNumber;
    }
  });

  // node_modules/json-dom/dist/domItem/tree/appendChild.js
  var require_appendChild = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/appendChild.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var appendChild = (parent, child) => {
        parent.children.push(child);
        child.parentItem = parent;
        return parent;
      };
      exports.default = appendChild;
    }
  });

  // node_modules/collect-your-stuff/dist/collections/arrayable/ArrayElement.js
  var require_ArrayElement = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/arrayable/ArrayElement.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ArrayElement = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var ArrayElement = class _ArrayElement {
        /**
         * Create the new Element instance, provide the data and optionally configure the type of Element.
         * @param data The data to be stored in this element.
         */
        constructor(data = null) {
          this.classType = _ArrayElement;
          this.data = null;
          this.data = data;
        }
      };
      exports.ArrayElement = ArrayElement;
      ArrayElement.make = (element, classType = ArrayElement) => {
        if (element === null || typeof element !== "object") {
          return new classType(element);
        }
        if (element.classType) {
          return element;
        }
        return new classType(element);
      };
      ArrayElement.fromArray = (values = [], classType = ArrayElement) => values.reduce((references, element) => {
        const newElement = classType.make(element, classType);
        if (!references.head.length) {
          return {
            head: [newElement],
            tail: newElement
          };
        }
        references.head.push(newElement);
        references.tail = newElement;
        return references;
      }, {
        head: [],
        tail: null
      });
    }
  });

  // node_modules/collect-your-stuff/dist/recipes/ArrayIterator.js
  var require_ArrayIterator = __commonJS({
    "node_modules/collect-your-stuff/dist/recipes/ArrayIterator.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ArrayIterator = void 0;
      var ArrayIterator = class {
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
            value: void 0,
            done: true
          };
        }
      };
      exports.ArrayIterator = ArrayIterator;
    }
  });

  // node_modules/collect-your-stuff/dist/collections/arrayable/Arrayable.js
  var require_Arrayable = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/arrayable/Arrayable.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Arrayable = void 0;
      var _ArrayElement = require_ArrayElement();
      var _ArrayIterator = require_ArrayIterator();
      var Arrayable = class _Arrayable {
        /**
         * Create the new Arrayable instance, configure the Arrayable class.
         * @param elementClass The class used to wrap given data as elements.
         */
        constructor(elementClass = _ArrayElement.ArrayElement) {
          this.classType = _Arrayable;
          this.innerList = [];
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
            throw new Error("The reference element is not in this list.");
          }
          return index;
        }
        /**
         * Initialize the inner list, should only run once.
         * @param initialList Give the array of elements to start in this Arrayable.
         */
        initialize(initialList) {
          if (this.initialized) {
            console.warn("Attempt to initialize non-empty list.");
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
          const insertAt = node === null || typeof node === "undefined" ? -1 : this.indexOfElement(node);
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
          const insertAt = node === null || typeof node === "undefined" ? this.length : this.indexOfElement(node);
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
            return null;
          }
          if (index >= 0) {
            return this.innerList[index];
          }
          const calculatedIndex = this.length + index;
          if (calculatedIndex < 0) {
            return null;
          }
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
      };
      exports.Arrayable = Arrayable;
      Arrayable.fromArray = (values = [], elementClass = _ArrayElement.ArrayElement, classType = Arrayable) => {
        const list = new classType(elementClass);
        return list.initialize(elementClass.fromArray(values).head);
      };
    }
  });

  // node_modules/collect-your-stuff/dist/collections/linked-list/Linker.js
  var require_Linker = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/linked-list/Linker.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Linker = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _ArrayElement = require_ArrayElement();
      var Linker = class _Linker {
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
          this.classType = _Linker;
          this.data = null;
          this.next = null;
          this.data = data;
          this.next = next;
        }
      };
      exports.Linker = Linker;
      Linker.make = (linker, classType = Linker) => {
        if (linker === null || typeof linker !== "object") {
          return new classType({
            data: linker
          });
        }
        if (linker.classType) {
          return linker;
        }
        if (!("data" in linker)) {
          linker = {
            data: linker
          };
        }
        return _ArrayElement.ArrayElement.make(linker, classType);
      };
      Linker.fromArray = (values = [], classType = Linker) => values.reduce((references, linker) => {
        const newLinker = classType.make(linker, classType);
        if (references.head === null) {
          return {
            head: newLinker,
            tail: newLinker
          };
        }
        references.tail.next = newLinker;
        references.tail = newLinker;
        return references;
      }, {
        head: null,
        tail: null
      });
    }
  });

  // node_modules/collect-your-stuff/dist/collections/doubly-linked-list/DoubleLinker.js
  var require_DoubleLinker = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/doubly-linked-list/DoubleLinker.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DoubleLinker = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var _Linker = require_Linker();
      var DoubleLinker = class _DoubleLinker {
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
          this.classType = _DoubleLinker;
          this.data = null;
          this.next = null;
          this.prev = null;
          this.data = data;
          this.next = next;
          this.prev = prev;
        }
      };
      exports.DoubleLinker = DoubleLinker;
      DoubleLinker.make = (linker, classType = DoubleLinker) => {
        return _Linker.Linker.make(linker, classType);
      };
      DoubleLinker.fromArray = (values = [], classType = DoubleLinker) => values.reduce((references, linker) => {
        const newLinker = classType.make(linker, classType);
        if (references.head === null) {
          return {
            head: newLinker,
            tail: newLinker
          };
        }
        newLinker.prev = references.tail;
        references.tail.next = newLinker;
        references.tail = newLinker;
        return references;
      }, {
        head: null,
        tail: null
      });
    }
  });

  // node_modules/collect-your-stuff/dist/recipes/DoubleLinkerIterator.js
  var require_DoubleLinkerIterator = __commonJS({
    "node_modules/collect-your-stuff/dist/recipes/DoubleLinkerIterator.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DoubleLinkerIterator = void 0;
      var DoubleLinkerIterator = class {
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
      };
      exports.DoubleLinkerIterator = DoubleLinkerIterator;
    }
  });

  // node_modules/collect-your-stuff/dist/recipes/LinkerIterator.js
  var require_LinkerIterator = __commonJS({
    "node_modules/collect-your-stuff/dist/recipes/LinkerIterator.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LinkerIterator = void 0;
      var LinkerIterator = class {
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
      };
      exports.LinkerIterator = LinkerIterator;
    }
  });

  // node_modules/collect-your-stuff/dist/collections/linked-list/LinkedList.js
  var require_LinkedList = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/linked-list/LinkedList.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LinkedList = void 0;
      var _Linker = require_Linker();
      var _LinkerIterator = require_LinkerIterator();
      var _Arrayable = require_Arrayable();
      var LinkedList = class _LinkedList {
        /**
         * Create the new LinkedList instance.
         * @param linkerClass The class used to wrap given data as linkers.
         */
        constructor(linkerClass = _Linker.Linker) {
          this.classType = _LinkedList;
          this.innerList = null;
          this.initialized = false;
          this.tailCache = null;
          this.countCache = null;
          this.linkerClass = linkerClass;
        }
        /**
         * Initialize the inner list, should only run once.
         * @param initialList Give the list of linkers to start in this linked-list.
         */
        initialize(initialList) {
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
          if (node === null || typeof node === "undefined") {
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
          if (node === null || typeof node === "undefined") {
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
              throw new Error("The reference node is not in this list.");
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
          if (node === null || typeof node === "undefined") {
            return null;
          }
          let prevNode = null;
          let currentNode = this.first;
          while (currentNode !== null && currentNode !== node) {
            prevNode = currentNode;
            currentNode = currentNode.next;
          }
          if (currentNode === null) {
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
            let current2 = this.first;
            let currentIndex2 = -1;
            while (++currentIndex2 < index && current2 !== null) {
              current2 = current2.next;
            }
            return currentIndex2 === index ? current2 : null;
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
      };
      exports.LinkedList = LinkedList;
      LinkedList.fromArray = (values = [], linkerClass = _Linker.Linker, classType = LinkedList) => {
        const list = new classType(linkerClass);
        return list.initialize(linkerClass.fromArray(values).head);
      };
    }
  });

  // node_modules/collect-your-stuff/dist/collections/doubly-linked-list/DoublyLinkedList.js
  var require_DoublyLinkedList = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/doubly-linked-list/DoublyLinkedList.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DoublyLinkedList = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var _DoubleLinker = require_DoubleLinker();
      var _DoubleLinkerIterator = require_DoubleLinkerIterator();
      var _LinkedList = require_LinkedList();
      var DoublyLinkedList = class _DoublyLinkedList {
        /**
         * Create the new DoublyLinkedList instance.
         * @param linkerClass The class used to wrap given data as linkers.
         */
        constructor(linkerClass = _DoubleLinker.DoubleLinker) {
          this.classType = _DoublyLinkedList;
          this.innerList = null;
          this.initialized = false;
          this.tailCache = null;
          this.countCache = null;
          this.linkerClass = linkerClass;
        }
        /**
         * Initialize the inner list, should only run once.
         * @param initialList Give the list of double-linkers to start in this doubly linked-list.
         */
        initialize(initialList) {
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
          if (node === null || typeof node === "undefined") {
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
            newNode.next = node.next;
            newNode.prev = node;
            node.next = newNode;
            if (newNode.next) {
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
          if (node === null || typeof node === "undefined") {
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
            newNode.prev = node.prev;
            newNode.next = node;
            node.prev = newNode;
            if (newNode.prev) {
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
          if (node === null || typeof node === "undefined") {
            return null;
          }
          if (node.prev) {
            node.prev.next = node.next;
          }
          if (node.next) {
            node.next.prev = node.prev;
          }
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
          let pointer = this.innerList;
          if (pointer === null) {
            this.countCache = 0;
            this.tailCache = null;
            return null;
          }
          while (pointer.prev !== null) {
            pointer = pointer.prev;
          }
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
            let current2 = this.first;
            let currentIndex2 = -1;
            while (++currentIndex2 < index && current2 !== null) {
              current2 = current2.next;
            }
            return currentIndex2 === index ? current2 : null;
          }
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
      };
      exports.DoublyLinkedList = DoublyLinkedList;
      DoublyLinkedList.fromArray = (values = [], linkerClass = _DoubleLinker.DoubleLinker, classType = DoublyLinkedList) => {
        return _LinkedList.LinkedList.fromArray(values, linkerClass, classType);
      };
    }
  });

  // node_modules/collect-your-stuff/dist/services/parseTreeNext.js
  var require_parseTreeNext = __commonJS({
    "node_modules/collect-your-stuff/dist/services/parseTreeNext.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.parseTreeNext = void 0;
      var parseTreeNext = (treeNode, boundaryParent) => {
        if (!treeNode) {
          return null;
        }
        if (treeNode.children && treeNode.children.length) {
          return treeNode.children.first;
        }
        if (treeNode.next) {
          return treeNode.next;
        }
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
    }
  });

  // node_modules/collect-your-stuff/dist/recipes/TreeLinkerIterator.js
  var require_TreeLinkerIterator = __commonJS({
    "node_modules/collect-your-stuff/dist/recipes/TreeLinkerIterator.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TreeLinkerIterator = void 0;
      var _parseTreeNext = require_parseTreeNext();
      var TreeLinkerIterator = class {
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
      };
      exports.TreeLinkerIterator = TreeLinkerIterator;
    }
  });

  // node_modules/collect-your-stuff/dist/collections/linked-tree-list/LinkedTreeList.js
  var require_LinkedTreeList = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/linked-tree-list/LinkedTreeList.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LinkedTreeList = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var _TreeLinker = require_TreeLinker();
      var _TreeLinkerIterator = require_TreeLinkerIterator();
      var _DoublyLinkedList = require_DoublyLinkedList();
      var borrowedGetter = (name, list) => Object.getOwnPropertyDescriptor(_DoublyLinkedList.DoublyLinkedList.prototype, name).get.call(list);
      var LinkedTreeList = class _LinkedTreeList {
        /**
         * Create the new LinkedTreeList instance, configure the list class.
         * @param linkerClass The class used to wrap given data as tree linkers.
         */
        constructor(linkerClass = _TreeLinker.TreeLinker) {
          this.classType = _LinkedTreeList;
          this.innerList = null;
          this.initialized = false;
          this.tailCache = null;
          this.countCache = null;
          this.ownerNode = void 0;
          this.linkerClass = linkerClass;
        }
        /**
         * Initialize the inner list, should only run once.
         * @param initialList Give the list of tree-linkers to start in this linked-tree-list.
         */
        initialize(initialList) {
          if (this.initialized) {
            console.warn("Attempt to initialize LinkedTreeList which is not empty.");
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
          return borrowedGetter("first", this);
        }
        /**
         * Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.
         */
        get last() {
          return borrowedGetter("last", this);
        }
        /**
         * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
         * (call reset() after linkers were changed directly).
         */
        get length() {
          return borrowedGetter("length", this);
        }
        /**
         * Get the parent of this tree list: the node these linkers are the children of (remembered even while the list is
         * empty), or null for the linkers at the top of a tree.
         */
        get parent() {
          if (this.ownerNode !== void 0) {
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
          let isChild = false;
          this.forEach((linker) => {
            if (linker === item) {
              isChild = true;
            }
          });
          if (!isChild) {
            throw new Error("The item is not one of the linkers of this list.");
          }
          if (children === null || typeof children === "undefined") {
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
          return new _TreeLinkerIterator.TreeLinkerIterator(this.first, this.parent);
        }
      };
      exports.LinkedTreeList = LinkedTreeList;
      LinkedTreeList.fromArray = (values = [], linkerClass = _TreeLinker.TreeLinker, classType = LinkedTreeList) => {
        const list = new classType(linkerClass);
        return list.initialize(linkerClass.fromArray(values).head);
      };
    }
  });

  // node_modules/collect-your-stuff/dist/collections/linked-tree-list/TreeLinker.js
  var require_TreeLinker = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/linked-tree-list/TreeLinker.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TreeLinker = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var _DoubleLinker = require_DoubleLinker();
      var _LinkedTreeList = require_LinkedTreeList();
      var TreeLinker = class _TreeLinker {
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
          this.classType = _TreeLinker;
          this.data = null;
          this.next = null;
          this.prev = null;
          this.parent = null;
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
          const nodes = children.map((child) => {
            const linker = this.classType.make(child, this.classType);
            linker.parent = this;
            return linker;
          });
          const list = listClass.fromArray(nodes, this.classType);
          list.parent = this;
          return list;
        }
      };
      exports.TreeLinker = TreeLinker;
      TreeLinker.make = (linker, classType = TreeLinker) => {
        return _DoubleLinker.DoubleLinker.make(linker, classType);
      };
      TreeLinker.fromArray = (values = [], classType = TreeLinker) => _DoubleLinker.DoubleLinker.fromArray(values, classType);
    }
  });

  // node_modules/collect-your-stuff/dist/collections/queue/Queueable.js
  var require_Queueable = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/queue/Queueable.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Queueable = void 0;
      var _Linker = require_Linker();
      var Queueable = class _Queueable {
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
          this.data = null;
          this.next = null;
          this.complete = false;
          this.ready = false;
          this.running = false;
          this.classType = _Queueable;
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
          return typeof this.ready === "function" ? this.ready() : this.ready;
        }
        /**
         * Retrieve the data which should be formed as a task.
         */
        get task() {
          if (typeof this.data === "function") {
            return this.data;
          }
          return (complete) => typeof complete === "function" ? complete({
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
            return {
              success: false,
              error: "Task is not ready",
              context: this.data
            };
          }
          if (this.running) {
            return {
              success: false,
              error: "Queued task is already running, possible missing 'complete' callback",
              context: this.data
            };
          }
          this.running = true;
          return this.task(this.markCompleted.bind(this));
        }
      };
      exports.Queueable = Queueable;
      Queueable.make = (queueable, classType = Queueable) => {
        if (queueable === null || typeof queueable !== "object") {
          return new classType({
            task: queueable,
            ready: true
          });
        }
        if (queueable.classType) {
          return queueable;
        }
        if (!("task" in queueable)) {
          queueable = {
            task: queueable,
            ready: true
          };
        }
        return new classType(queueable);
      };
      Queueable.fromArray = (values = [], classType = Queueable) => _Linker.Linker.fromArray(values, classType);
    }
  });

  // node_modules/collect-your-stuff/dist/collections/queue/Queue.js
  var require_Queue = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/queue/Queue.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Queue = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var _LinkedList = require_LinkedList();
      var _Linker = require_Linker();
      var Queue = class {
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
          if (front === null || typeof front === "undefined") {
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
          return front === null || typeof front === "undefined" ? null : front.data;
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
                value: void 0
              } : {
                done: false,
                value: result.value.data
              };
            }
          };
        }
      };
      exports.Queue = Queue;
      Queue.fromArray = (values = [], listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) => {
        const queue = new Queue(null, listClass, linkerClass);
        values.forEach((value) => queue.enqueue(value));
        return queue;
      };
    }
  });

  // node_modules/collect-your-stuff/dist/collections/queue/TaskQueue.js
  var require_TaskQueue = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/queue/TaskQueue.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TaskQueue = void 0;
      var _Queueable = require_Queueable();
      var _LinkedList = require_LinkedList();
      var TaskQueue = class {
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
          while (next && next.complete) {
            next = this.remove();
          }
          if (!next) {
            return {
              success: "No more queueable tasks in the queue",
              error: false,
              context: this.queuedList
            };
          }
          if (next.running) {
            return {
              success: false,
              error: "The queue has been blocked by an unfinished task.",
              context: next
            };
          }
          if (!next.isReady) {
            this.enqueue(next);
            return {
              success: false,
              error: "Unable to find ready task.",
              context: next
            };
          }
          if (!this.empty()) {
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
      };
      exports.TaskQueue = TaskQueue;
      TaskQueue.fromArray = (values = [], queueableClass = _Queueable.Queueable, listClass = _LinkedList.LinkedList) => {
        const list = new listClass(queueableClass);
        list.initialize(queueableClass.fromArray(values, queueableClass).head);
        return new TaskQueue(list, listClass, queueableClass);
      };
    }
  });

  // node_modules/collect-your-stuff/dist/collections/scoped-collection/ScopedCollection.js
  var require_ScopedCollection = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/scoped-collection/ScopedCollection.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ScopedCollection = void 0;
      require_esnext_map_delete_all();
      require_esnext_map_every();
      require_esnext_map_filter();
      require_esnext_map_find();
      require_esnext_map_find_key();
      require_esnext_map_includes();
      require_esnext_map_key_of();
      require_esnext_map_map_keys();
      require_esnext_map_map_values();
      require_esnext_map_merge();
      require_esnext_map_reduce();
      require_esnext_map_some();
      require_esnext_map_update();
      require_esnext_weak_map_delete_all();
      var ScopedCollection = class {
        constructor() {
          this.scopes = /* @__PURE__ */ new WeakMap();
        }
        /**
         * Remove a key from a scope's key space.
         * @param scope The scope to remove the key from
         * @param key The key to remove
         * @returns Whether a value was actually removed
         */
        delete(scope, key) {
          const keyedValues = this.scopes.get(scope);
          return typeof keyedValues === "undefined" ? false : keyedValues.delete(key);
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
          if (typeof keyedValues === "undefined") {
            keyedValues = /* @__PURE__ */ new Map();
            this.scopes.set(scope, keyedValues);
          }
          keyedValues.set(key, value);
          return this;
        }
      };
      exports.ScopedCollection = ScopedCollection;
    }
  });

  // node_modules/collect-your-stuff/dist/collections/stack/Stackable.js
  var require_Stackable = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/stack/Stackable.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Stackable = void 0;
      var _Linker = require_Linker();
      var Stackable = class _Stackable {
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
          this.data = null;
          this.next = null;
          this.classType = _Stackable;
          this.data = task;
          this.next = next;
        }
        /**
         * Retrieve the data which should be formed as a task.
         */
        get task() {
          if (typeof this.data === "function") {
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
      };
      exports.Stackable = Stackable;
      Stackable.make = (stackable, classType = Stackable) => {
        if (stackable === null || typeof stackable !== "object") {
          return new classType({
            task: stackable
          });
        }
        if (stackable.classType) {
          return stackable;
        }
        if (!("task" in stackable)) {
          stackable = {
            task: stackable
          };
        }
        return new classType(stackable);
      };
      Stackable.fromArray = (values = [], classType = Stackable) => _Linker.Linker.fromArray(values, classType);
    }
  });

  // node_modules/collect-your-stuff/dist/collections/stack/Stack.js
  var require_Stack = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/stack/Stack.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Stack = void 0;
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var _LinkedList = require_LinkedList();
      var _Linker = require_Linker();
      var Stack = class {
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
          return top === null || typeof top === "undefined" ? null : top.data;
        }
        /**
         * Take the item from the top of the stack.
         * @returns The item, or null when the stack is empty
         */
        pop() {
          const top = this.stackedList.first;
          if (top === null || typeof top === "undefined") {
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
                value: void 0
              } : {
                done: false,
                value: result.value.data
              };
            }
          };
        }
      };
      exports.Stack = Stack;
      Stack.fromArray = (values = [], listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) => {
        const stack = new Stack(null, listClass, linkerClass);
        values.forEach((value) => stack.push(value));
        return stack;
      };
    }
  });

  // node_modules/collect-your-stuff/dist/collections/stack/TaskStack.js
  var require_TaskStack = __commonJS({
    "node_modules/collect-your-stuff/dist/collections/stack/TaskStack.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TaskStack = void 0;
      var _Stackable = require_Stackable();
      var _LinkedList = require_LinkedList();
      var TaskStack = class {
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
              success: "No more stackable tasks in the stack",
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
      };
      exports.TaskStack = TaskStack;
      TaskStack.fromArray = (values = [], stackableClass = _Stackable.Stackable, listClass = _LinkedList.LinkedList) => {
        const list = new listClass(stackableClass);
        list.initialize(stackableClass.fromArray(values, stackableClass).head);
        return new TaskStack(list, listClass, stackableClass);
      };
    }
  });

  // node_modules/collect-your-stuff/dist/recipes/Runnable.js
  var require_Runnable = __commonJS({
    "node_modules/collect-your-stuff/dist/recipes/Runnable.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Runnable = void 0;
      var Runnable = class _Runnable {
        /**
         * Instantiate a Runnable class.
         * @param data The task (a function) or the data which the task returns.
         */
        constructor(data = null) {
          this.data = null;
          this.data = data;
        }
        /**
         * Retrieve the data which should be formed as a task.
         */
        get task() {
          if (typeof this.data === "function") {
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
          if (typeof thing === "undefined") {
            return this instanceof _Runnable;
          }
          if (typeof thing !== "object") {
            return false;
          }
          if (typeof thing.task !== "function") {
            return false;
          }
          return typeof thing.run === "function";
        }
      };
      exports.Runnable = Runnable;
    }
  });

  // node_modules/collect-your-stuff/dist/recipes/recipes.js
  var require_recipes = __commonJS({
    "node_modules/collect-your-stuff/dist/recipes/recipes.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.recipes = void 0;
      var _ArrayIterator = require_ArrayIterator();
      var _Runnable = require_Runnable();
      var recipes = exports.recipes = {
        ArrayIterator: _ArrayIterator.ArrayIterator,
        Runnable: _Runnable.Runnable
      };
    }
  });

  // node_modules/collect-your-stuff/dist/services/parseTree.js
  var require_parseTree = __commonJS({
    "node_modules/collect-your-stuff/dist/services/parseTree.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.parseTree = void 0;
      var _parseTreeNext = require_parseTreeNext();
      var parseTree = (tree, callback) => {
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
    }
  });

  // node_modules/collect-your-stuff/dist/services/services.js
  var require_services = __commonJS({
    "node_modules/collect-your-stuff/dist/services/services.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.services = void 0;
      var _parseTree = require_parseTree();
      var _parseTreeNext = require_parseTreeNext();
      var services = exports.services = {
        parseTree: _parseTree.parseTree,
        parseTreeNext: _parseTreeNext.parseTreeNext
      };
    }
  });

  // node_modules/collect-your-stuff/dist/main.js
  var require_main2 = __commonJS({
    "node_modules/collect-your-stuff/dist/main.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "ArrayElement", {
        enumerable: true,
        get: function() {
          return _ArrayElement.ArrayElement;
        }
      });
      Object.defineProperty(exports, "Arrayable", {
        enumerable: true,
        get: function() {
          return _Arrayable.Arrayable;
        }
      });
      Object.defineProperty(exports, "DoubleLinker", {
        enumerable: true,
        get: function() {
          return _DoubleLinker.DoubleLinker;
        }
      });
      Object.defineProperty(exports, "DoublyLinkedList", {
        enumerable: true,
        get: function() {
          return _DoublyLinkedList.DoublyLinkedList;
        }
      });
      Object.defineProperty(exports, "LinkedList", {
        enumerable: true,
        get: function() {
          return _LinkedList.LinkedList;
        }
      });
      Object.defineProperty(exports, "LinkedTreeList", {
        enumerable: true,
        get: function() {
          return _LinkedTreeList.LinkedTreeList;
        }
      });
      Object.defineProperty(exports, "Linker", {
        enumerable: true,
        get: function() {
          return _Linker.Linker;
        }
      });
      Object.defineProperty(exports, "Queue", {
        enumerable: true,
        get: function() {
          return _Queue.Queue;
        }
      });
      Object.defineProperty(exports, "Queueable", {
        enumerable: true,
        get: function() {
          return _Queueable.Queueable;
        }
      });
      Object.defineProperty(exports, "ScopedCollection", {
        enumerable: true,
        get: function() {
          return _ScopedCollection.ScopedCollection;
        }
      });
      Object.defineProperty(exports, "Stack", {
        enumerable: true,
        get: function() {
          return _Stack.Stack;
        }
      });
      Object.defineProperty(exports, "Stackable", {
        enumerable: true,
        get: function() {
          return _Stackable.Stackable;
        }
      });
      Object.defineProperty(exports, "TaskQueue", {
        enumerable: true,
        get: function() {
          return _TaskQueue.TaskQueue;
        }
      });
      Object.defineProperty(exports, "TaskStack", {
        enumerable: true,
        get: function() {
          return _TaskStack.TaskStack;
        }
      });
      Object.defineProperty(exports, "TreeLinker", {
        enumerable: true,
        get: function() {
          return _TreeLinker.TreeLinker;
        }
      });
      exports.default = void 0;
      Object.defineProperty(exports, "recipes", {
        enumerable: true,
        get: function() {
          return _recipes.recipes;
        }
      });
      Object.defineProperty(exports, "services", {
        enumerable: true,
        get: function() {
          return _services.services;
        }
      });
      var _ArrayElement = require_ArrayElement();
      var _Arrayable = require_Arrayable();
      var _DoubleLinker = require_DoubleLinker();
      var _DoublyLinkedList = require_DoublyLinkedList();
      var _Linker = require_Linker();
      var _LinkedList = require_LinkedList();
      var _TreeLinker = require_TreeLinker();
      var _LinkedTreeList = require_LinkedTreeList();
      var _Queueable = require_Queueable();
      var _Queue = require_Queue();
      var _TaskQueue = require_TaskQueue();
      var _ScopedCollection = require_ScopedCollection();
      var _Stackable = require_Stackable();
      var _Stack = require_Stack();
      var _TaskStack = require_TaskStack();
      var _recipes = require_recipes();
      var _services = require_services();
      var collectYourStuff = {
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
        (void 0).collectYourStuff = collectYourStuff;
      } else if (typeof window !== "undefined") {
        window.collectYourStuff = collectYourStuff;
      }
    }
  });

  // node_modules/json-dom/dist/domItem/tree/itemIdIndex.js
  var require_itemIdIndex = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/itemIdIndex.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getItemById = exports.unregisterItemIds = exports.registerItemIds = exports.generateItemId = void 0;
      var si_funciona_1 = __importDefault(require_main());
      var collect_your_stuff_1 = require_main2();
      var itemsById = new collect_your_stuff_1.ScopedCollection();
      var nextItemId = 0;
      var generateItemId = () => nextItemId++;
      exports.generateItemId = generateItemId;
      var tryGetRoot = (item) => {
        let current = item;
        while (current.parentItem != null) {
          if (si_funciona_1.default.emptyObject(current.parentItem)) {
            return current;
          }
          current = current.parentItem;
        }
        return null;
      };
      var registerItemIds = (item) => {
        const root = tryGetRoot(item);
        if (!root) {
          return;
        }
        const alreadyThere = typeof item.id === "number" ? itemsById.get(root, item.id) : void 0;
        if (typeof item.id !== "number" || alreadyThere && alreadyThere !== item) {
          item.id = (0, exports.generateItemId)();
        }
        itemsById.set(root, item.id, item);
        (item.children || []).forEach(exports.registerItemIds);
      };
      exports.registerItemIds = registerItemIds;
      var unregisterItemIds = (item) => {
        const root = tryGetRoot(item);
        if (!root) {
          return;
        }
        itemsById.delete(root, item.id);
        (item.children || []).forEach(exports.unregisterItemIds);
      };
      exports.unregisterItemIds = unregisterItemIds;
      var getItemById = (root, id) => {
        const item = itemsById.get(root, id);
        if (!item) {
          throw new Error(`No item with id ${id} in this tree - it may have been removed, or never belonged to it.`);
        }
        return item;
      };
      exports.getItemById = getItemById;
    }
  });

  // node_modules/json-dom/dist/domItem/tree/removeChild.js
  var require_removeChild = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/removeChild.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var itemIdIndex_1 = require_itemIdIndex();
      var removeChild = (parent, child) => {
        (0, itemIdIndex_1.unregisterItemIds)(child);
        parent.element.removeChild(child.element);
        return parent.children.splice(parent.children.indexOf(child), 1);
      };
      exports.default = removeChild;
    }
  });

  // node_modules/json-dom/dist/domItem/objects/createCoreItem.js
  var require_createCoreItem = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/createCoreItem.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var appendChild_1 = __importDefault(require_appendChild());
      var removeChild_1 = __importDefault(require_removeChild());
      var itemIdIndex_1 = require_itemIdIndex();
      var createCoreItem = (item = {}) => {
        if (Array.isArray(item.children)) {
          item.children.forEach((child) => {
            if (typeof child === "object" && child !== null && !child.has) {
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
          nodeName: "div",
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
    }
  });

  // node_modules/json-dom/dist/domItem/traits/definitions.js
  var require_definitions = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/definitions.js"(exports) {
      "use strict";
      init_process();
      require_esnext_map_delete_all();
      require_esnext_map_every();
      require_esnext_map_filter();
      require_esnext_map_find();
      require_esnext_map_find_key();
      require_esnext_map_includes();
      require_esnext_map_key_of();
      require_esnext_map_map_keys();
      require_esnext_map_map_values();
      require_esnext_map_merge();
      require_esnext_map_reduce();
      require_esnext_map_some();
      require_esnext_map_update();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var definitions = /* @__PURE__ */ new Map([["render", {
        keys: ["element", "activeListeners"],
        serializable: false,
        defaults: () => ({
          element: null
        })
      }]]);
      exports.default = definitions;
    }
  });

  // node_modules/json-dom/dist/domItem/traits/withTrait.js
  var require_withTrait = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/withTrait.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var definitions_1 = __importDefault(require_definitions());
      var withTrait = (item, trait, data) => {
        Object.assign(item, definitions_1.default.get(trait)?.defaults?.(), data);
        item.has = Object.assign(item.has ?? {}, {
          [trait]: true
        });
        return item;
      };
      exports.default = withTrait;
    }
  });

  // node_modules/json-dom/dist/domItem/objects/createDomItem.js
  var require_createDomItem = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/createDomItem.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createCoreItem_1 = __importDefault(require_createCoreItem());
      var withTrait_1 = __importDefault(require_withTrait());
      var isPlainChild = (child) => typeof child === "object" && child !== null && !child.has;
      var createDomItem = (item = {}) => {
        if (Array.isArray(item.children)) {
          item.children.forEach((child) => {
            if (isPlainChild(child)) {
              createDomItem(child);
            }
          });
        }
        return (0, withTrait_1.default)((0, createCoreItem_1.default)(item), "render", {
          element: item.element ?? null
        });
      };
      exports.default = createDomItem;
    }
  });

  // node_modules/json-dom/dist/domItem/objects/initChildren.js
  var require_initChildren = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/initChildren.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createDomItem_1 = __importDefault(require_createDomItem());
      var onBodyLoad_1 = __importDefault(require_onBodyLoad());
      var initChildren = () => {
        const head = document.head;
        const body = document.body;
        const children = [(0, createDomItem_1.default)({
          nodeName: "head",
          attributes: {},
          element: head,
          children: []
        }), (0, createDomItem_1.default)({
          nodeName: "body",
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
    }
  });

  // node_modules/json-dom/dist/domItem/objects/initRoot.js
  var require_initRoot = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/initRoot.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createDomItem_1 = __importDefault(require_createDomItem());
      var initRoot = (children = [{}, {}], listeners = {}) => (0, createDomItem_1.default)({
        nodeName: "#document",
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
    }
  });

  // node_modules/json-dom/dist/sync/updateChildren.js
  var require_updateChildren = __commonJS({
    "node_modules/json-dom/dist/sync/updateChildren.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createDomItem_1 = __importDefault(require_createDomItem());
      var updateChildren = (domItem) => {
        if (!domItem.element) {
          domItem.children = [];
          return domItem;
        }
        const previousChildren = domItem.children;
        domItem.children = [];
        domItem.element.childNodes.forEach((childNode, index) => {
          const existing = previousChildren.find((child2) => child2.element === childNode);
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
    }
  });

  // node_modules/json-dom/dist/diff/getAssignedStyles.js
  var require_getAssignedStyles = __commonJS({
    "node_modules/json-dom/dist/diff/getAssignedStyles.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getAssignedStyles = (elementStyles) => si_funciona_1.default.reduceObject(elementStyles, (styles, attr, key) => Number.isNaN(Number(key)) ? styles : si_funciona_1.default.setValue(attr, elementStyles[attr], styles), {});
      exports.default = getAssignedStyles;
    }
  });

  // node_modules/json-dom/dist/diff/domItemHasAttribute.js
  var require_domItemHasAttribute = __commonJS({
    "node_modules/json-dom/dist/diff/domItemHasAttribute.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getAssignedStyles_1 = __importDefault(require_getAssignedStyles());
      var checkStyles = (domItem, attr = {}) => {
        const assignedStyles = domItem.attributes.style ?? {};
        if (si_funciona_1.default.emptyObject(assignedStyles)) {
          return 1;
        }
        return si_funciona_1.default.compareArrays(Object.keys((0, getAssignedStyles_1.default)(attr)).map(si_funciona_1.default.camelCase), Object.keys(assignedStyles));
      };
      var checkClasses = (domItem, attr = "") => {
        const assignedClasses = domItem.attributes.className ?? "";
        if (!assignedClasses.length) {
          return 1;
        }
        return si_funciona_1.default.compareArrays(attr.split(" "), assignedClasses.split(" "));
      };
      var domItemHasAttribute = (domItem, key, attr) => {
        if (key === "style") {
          return checkStyles(domItem, attr);
        }
        if (key === "className") {
          return checkClasses(domItem, attr);
        }
        const camelKey = si_funciona_1.default.camelCase(key);
        if (typeof domItem.attributes[camelKey] === "undefined") {
          return 1;
        }
        if (domItem.attributes[camelKey] === attr) {
          return 0;
        }
        return 1;
      };
      exports.default = domItemHasAttribute;
    }
  });

  // node_modules/json-dom/dist/diff/createChangeList.js
  var require_createChangeList = __commonJS({
    "node_modules/json-dom/dist/diff/createChangeList.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var appendChangesTo = (changeList) => (changeType, changes) => {
        if (!["added", "removed"].includes(changeType)) {
          throw Error(`Method appendChanges change type must be 'added' or 'removed'; ${changeType} given.`);
        }
        return si_funciona_1.default.mergeObjects(changeList[changeType], changes);
      };
      var createChangeList = ({
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
    }
  });

  // node_modules/json-dom/dist/diff/elementChanges.js
  var require_elementChanges = __commonJS({
    "node_modules/json-dom/dist/diff/elementChanges.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var domItemHasAttribute_1 = __importDefault(require_domItemHasAttribute());
      var createChangeList_1 = __importDefault(require_createChangeList());
      var checkAttribute = (domItem) => (attr, key) => {
        if (key === "className") {
          const diff = (0, domItemHasAttribute_1.default)(domItem, key, attr);
          if (Array.isArray(diff) && diff.length === 1 && diff[0].result[0] === 0) {
            return 0;
          }
          return si_funciona_1.default.filterObject(diff, (arrayDiff) => arrayDiff.result[0] !== 0);
        }
        if (key === "style") {
          const diff = (0, domItemHasAttribute_1.default)(domItem, key, attr);
          const styles = attr;
          const itemStyle = () => domItem.attributes.style;
          if (Array.isArray(diff) && diff.length === 1 && diff[0].result[0] === 0 && itemStyle()[diff[0].value] === styles[diff[0].value]) {
            return 0;
          }
          return si_funciona_1.default.filterObject(diff, (arrayDiff) => arrayDiff.result[0] !== 0 || itemStyle()[arrayDiff.value] !== styles[arrayDiff.value]);
        }
        return (0, domItemHasAttribute_1.default)(domItem, key, attr);
      };
      var camelCaseAttributes = (domItem) => domItem.element ? si_funciona_1.default.reduceObject(domItem.element.attributes, (attributes, attr) => {
        if (!attr.name) {
          return attributes;
        }
        const camelKey = attr.name === "class" ? "className" : si_funciona_1.default.camelCase(attr.name);
        const attributeValue = domItem.element[attr.name] ?? attr.value;
        if (typeof attributeValue === "undefined") {
          return attributes;
        }
        attributes[camelKey] = attributeValue;
        return attributes;
      }, {}) : {};
      var elementChanges = (domItem) => {
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
            changeList.removed = changeList.appendChanges("removed", si_funciona_1.default.dotNotate({
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
            changeList.removed = changeList.appendChanges("removed", si_funciona_1.default.dotNotate({
              attributes: domItem.attributes
            }));
          }
          return changeList;
        }
        if (!(domItem.element && domItem.element.hasAttributes()) && !si_funciona_1.default.emptyObject(domItem.attributes)) {
          changeList.removed = changeList.appendChanges("removed", si_funciona_1.default.dotNotate({
            attributes: domItem.attributes
          }));
          return changeList;
        }
        const elementAttributes = camelCaseAttributes(domItem);
        const diffMap = si_funciona_1.default.mapObject(elementAttributes, (attr, key) => checkAttribute(domItem)(attr, key));
        return si_funciona_1.default.reduceObject(diffMap, (changed, result, key) => {
          const isArray = Array.isArray(result);
          if (!isArray && !result) {
            return changed;
          }
          if (!isArray) {
            changed.added[`attributes.${key}`] = domItem.element[key] ?? domItem.element.getAttribute(si_funciona_1.default.kabobCase(key));
            return changed;
          }
          if (key !== "className" && key !== "style") {
            return changed;
          }
          if (key === "className") {
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
    }
  });

  // node_modules/json-dom/dist/sync/updateDomItem.js
  var require_updateDomItem = __commonJS({
    "node_modules/json-dom/dist/sync/updateDomItem.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var elementChanges_1 = __importDefault(require_elementChanges());
      var updateDomItem = (config) => {
        if (!config.element) {
          return config;
        }
        const changes = (0, elementChanges_1.default)(config);
        for (const dotKey in changes.removed) {
          const attributeKey = si_funciona_1.default.strAfter(dotKey, ".");
          if (si_funciona_1.default.strBefore(attributeKey, ".") === "className") {
            const classList = config.attributes.className.split(" ");
            classList.splice(si_funciona_1.default.strAfterLast(attributeKey, "."), 1);
            config.attributes.className = classList.join(" ");
            continue;
          }
          si_funciona_1.default.dotUnset(config, dotKey);
        }
        for (const dotKey in changes.added) {
          const attributeKey = si_funciona_1.default.strAfter(dotKey, ".");
          if (si_funciona_1.default.strBefore(attributeKey, ".") === "className") {
            const classList = config.attributes.className.split(" ");
            classList.push(changes.added[dotKey]);
            config.attributes.className = classList.join(" ");
            continue;
          }
          si_funciona_1.default.dotSet(config, dotKey, changes.added[dotKey]);
        }
        return config;
      };
      exports.default = updateDomItem;
    }
  });

  // node_modules/json-dom/dist/sync/updateDomItems.js
  var require_updateDomItems = __commonJS({
    "node_modules/json-dom/dist/sync/updateDomItems.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var updateChildren_1 = __importDefault(require_updateChildren());
      var updateDomItem_1 = __importDefault(require_updateDomItem());
      var updateDomItems = (config) => {
        if (config.nodeName === "#document") {
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
    }
  });

  // node_modules/json-dom/dist/domItem/objects/documentDomItem.js
  var require_documentDomItem = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/documentDomItem.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createDomItem_1 = __importDefault(require_createDomItem());
      var initChildren_1 = __importDefault(require_initChildren());
      var initRoot_1 = __importDefault(require_initRoot());
      var updateDomItems_1 = __importDefault(require_updateDomItems());
      var documentDomItem = (listeners = {}, rootItem = (0, initRoot_1.default)((0, initChildren_1.default)(), listeners)) => {
        rootItem.children = rootItem.children.map((child) => (0, createDomItem_1.default)(child));
        rootItem.children.map((child) => {
          child.parentItem = rootItem;
          return child;
        });
        rootItem.head = rootItem.children[0];
        rootItem.body = rootItem.children[1];
        return (0, updateDomItems_1.default)((0, createDomItem_1.default)(rootItem));
      };
      exports.default = documentDomItem;
    }
  });

  // node_modules/json-dom/dist/domItem/objects/documentItem.js
  var require_documentItem = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/documentItem.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentDomItem_1 = __importDefault(require_documentDomItem());
      var existingItem = null;
      var documentItem = (() => {
        if (existingItem === null) {
          existingItem = (0, documentDomItem_1.default)();
        }
        return existingItem;
      })();
      exports.default = documentItem;
    }
  });

  // node_modules/json-dom/dist/events/functions/makeForwardingListener.js
  var require_makeForwardingListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/makeForwardingListener.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var FORM_CONTROL_TAGS = ["INPUT", "SELECT", "TEXTAREA"];
      var captureTargetState = (target) => {
        const element = target;
        if (!element || !FORM_CONTROL_TAGS.includes(element.tagName)) {
          return void 0;
        }
        return element.type === "checkbox" || element.type === "radio" ? {
          checked: element.checked
        } : {
          value: element.value
        };
      };
      var makeForwardingListener = (listenerName, transport) => (event, item, ...args) => transport({
        itemId: (event.domItemTarget ?? item).id,
        eventType: event.type,
        listenerFunc: listenerName,
        data: args,
        targetState: captureTargetState(event.target)
      });
      exports.default = makeForwardingListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/retrieveListener.js
  var require_retrieveListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/retrieveListener.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var makeForwardingListener_1 = __importDefault(require_makeForwardingListener());
      var retrieveListener = (listenerName, parent = documentItem_1.default) => {
        if (typeof listenerName === "function") {
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
    }
  });

  // node_modules/json-dom/dist/events/functions/activateListener.js
  var require_activateListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/activateListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getTopParentItem_1 = __importDefault(require_getTopParentItem());
      var makeEventHandler_1 = __importDefault(require_makeEventHandler());
      var createEventResponder_1 = __importDefault(require_createEventResponder());
      var getListenerOptions_1 = __importDefault(require_getListenerOptions());
      var optionsToNumber_1 = __importDefault(require_optionsToNumber());
      var retrieveListener_1 = __importDefault(require_retrieveListener());
      var activateListener = (eventName, eventListener, item) => {
        const listenerOptions = (0, getListenerOptions_1.default)();
        if (typeof item.activeListeners === "undefined") {
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
    }
  });

  // node_modules/json-dom/dist/events/objects/createEventListener.js
  var require_createEventListener = __commonJS({
    "node_modules/json-dom/dist/events/objects/createEventListener.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createEventListener = ({
        listenerFunc,
        listenerArgs = null,
        listenerOptions = false,
        listenerActive = false
      } = {}) => ({
        listenerFunc,
        listenerArgs,
        listenerOptions,
        listenerActive
      });
      exports.default = createEventListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/addEventListener.js
  var require_addEventListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/addEventListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createEventListener_1 = __importDefault(require_createEventListener());
      var addEventListener = (eventName, listenerFunction, customArgs, options, item) => {
        customArgs = customArgs ?? null;
        options = options ?? false;
        if (typeof listenerFunction === "function") {
          console.warn(`addEventListener: attaching a raw function directly for "${eventName}" instead of a name registered via registerListener. This works, but the listener will not be discoverable via eventActions, cannot be shared by name across DomItems, and will be silently dropped by domItemToJson (JSON.stringify omits function values). Prefer fullAddEventListener with a name unless this one-off behavior is intentional.`);
        }
        if (typeof item.eventListeners === "undefined") {
          item.eventListeners = {};
        }
        if (typeof item.eventListeners[eventName] === "undefined") {
          item.eventListeners[eventName] = [];
        }
        item.eventListeners[eventName].push((0, createEventListener_1.default)({
          listenerFunc: listenerFunction,
          listenerArgs: customArgs,
          listenerOptions: options
        }));
        return item;
      };
      exports.default = addEventListener;
    }
  });

  // node_modules/json-dom/dist/events/objects/options/numberToOptions.js
  var require_numberToOptions = __commonJS({
    "node_modules/json-dom/dist/events/objects/options/numberToOptions.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var numberToOptions = (optionsTemplate, binaryOptions) => si_funciona_1.default.mapObject(optionsTemplate, (flag) => !!(binaryOptions & flag));
      exports.default = numberToOptions;
    }
  });

  // node_modules/json-dom/dist/events/functions/listenerOptions.js
  var require_listenerOptions = __commonJS({
    "node_modules/json-dom/dist/events/functions/listenerOptions.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var listenerOptions = (options) => {
        if (typeof listenerOptions.supportsOptions === "undefined") {
          listenerOptions.supportsOptions = true;
          try {
            window.addEventListener("test", null, {
              capture: false,
              once: false,
              passive: false
            });
          } catch (err) {
            listenerOptions.supportsOptions = false;
          }
        }
        return typeof options === "object" && listenerOptions.supportsOptions ? options : false;
      };
      exports.default = listenerOptions;
    }
  });

  // node_modules/json-dom/dist/events/functions/assignListener.js
  var require_assignListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/assignListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var listenerOptions_1 = __importDefault(require_listenerOptions());
      var assignListener = (trigger, elem, fn, options = false) => {
        if (elem.addEventListener) {
          elem.addEventListener(trigger, fn, (0, listenerOptions_1.default)(options));
        } else if (elem.attachEvent) {
          elem.attachEvent(`on${trigger}`, fn);
        } else {
          ;
          elem[`on${trigger}`] = fn;
        }
        return fn;
      };
      exports.default = assignListener;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getItemByElement.js
  var require_getItemByElement = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getItemByElement.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getItemByElement = (item, element) => {
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
    }
  });

  // node_modules/json-dom/dist/events/objects/createEventProxy.js
  var require_createEventProxy = __commonJS({
    "node_modules/json-dom/dist/events/objects/createEventProxy.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getItemByElement_1 = __importDefault(require_getItemByElement());
      var createEventProxy = (event, item) => new Proxy(Object.defineProperties(event, {
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
          if (prop === "stopImmediatePropagation") {
            thisEvent.immediatePropagationStopped = true;
          }
          const value = Reflect.get(thisEvent, prop);
          return typeof value === "function" && prop !== "constructor" ? value.bind(thisEvent) : value;
        }
      });
      exports.default = createEventProxy;
    }
  });

  // node_modules/json-dom/dist/events/functions/applyActiveListeners.js
  var require_applyActiveListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/applyActiveListeners.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getListenerOptions_1 = __importDefault(require_getListenerOptions());
      var numberToOptions_1 = __importDefault(require_numberToOptions());
      var assignListener_1 = __importDefault(require_assignListener());
      var createEventProxy_1 = __importDefault(require_createEventProxy());
      var applyActiveListeners = (eventName, item) => {
        const listenerOptions = (0, getListenerOptions_1.default)();
        const eventOptions = si_funciona_1.default.dotGet(item, `activeListeners.${eventName}`);
        if (eventOptions === null) {
          return item;
        }
        si_funciona_1.default.objectKeys(eventOptions).forEach((binaryOptions) => {
          const optionsToUse = (0, numberToOptions_1.default)(listenerOptions, parseInt(binaryOptions));
          const usesSignal = !!optionsToUse.signal;
          if (!usesSignal) {
            delete optionsToUse.signal;
          }
          ;
          item.activeListeners[eventName][Number(binaryOptions)].forEach((eventResponder) => {
            if (eventResponder.assignedHandler) {
              return;
            }
            const finalOptions = usesSignal ? Object.assign({}, optionsToUse, {
              signal: eventResponder.abort.signal
            }) : optionsToUse;
            eventResponder.assignedHandler = (e) => eventResponder.handler((0, createEventProxy_1.default)(e, item));
            (0, assignListener_1.default)(eventName, item.element, eventResponder.assignedHandler, finalOptions);
          });
        });
        return item;
      };
      exports.default = applyActiveListeners;
    }
  });

  // node_modules/json-dom/dist/events/functions/bindElementListeners.js
  var require_bindElementListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/bindElementListeners.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var activateListener_1 = __importDefault(require_activateListener());
      var applyActiveListeners_1 = __importDefault(require_applyActiveListeners());
      var bindElementListeners = (item) => {
        for (const eventName in item.eventListeners) {
          const listeners = item.eventListeners[eventName];
          listeners.forEach((eventAttributes) => {
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
    }
  });

  // node_modules/json-dom/dist/events/functions/bindListeners.js
  var require_bindListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/bindListeners.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var bindElementListeners_1 = __importDefault(require_bindElementListeners());
      var si_funciona_1 = __importDefault(require_main());
      var bindListeners = (item) => !si_funciona_1.default.emptyObject(item.eventListeners) && item.element ? (0, bindElementListeners_1.default)(item) : item;
      exports.default = bindListeners;
    }
  });

  // node_modules/json-dom/dist/events/functions/bindAllListeners.js
  var require_bindAllListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/bindAllListeners.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var bindListeners_1 = __importDefault(require_bindListeners());
      var bindAllListeners = (item) => {
        for (const child of item.children) {
          bindAllListeners(child);
        }
        return (0, bindListeners_1.default)(item);
      };
      exports.default = bindAllListeners;
    }
  });

  // node_modules/json-dom/dist/events/functions/unassignListener.js
  var require_unassignListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/unassignListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var listenerOptions_1 = __importDefault(require_listenerOptions());
      var unassignListener = (trigger, elem, fn, options = false) => {
        if (elem.removeEventListener) {
          elem.removeEventListener(trigger, fn, (0, listenerOptions_1.default)(options));
        }
        return fn;
      };
      exports.default = unassignListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/deactivateListener.js
  var require_deactivateListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/deactivateListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getListenerOptions_1 = __importDefault(require_getListenerOptions());
      var optionsToNumber_1 = __importDefault(require_optionsToNumber());
      var numberToOptions_1 = __importDefault(require_numberToOptions());
      var unassignListener_1 = __importDefault(require_unassignListener());
      var deactivateListener = (eventName, eventListener, item) => {
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
    }
  });

  // node_modules/json-dom/dist/events/functions/deactivateListeners.js
  var require_deactivateListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/deactivateListeners.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var deactivateListeners = (item) => {
        for (const eventName in item.eventListeners) {
          item.eventListeners[eventName].forEach((eventListener) => {
            eventListener.listenerActive = false;
          });
        }
        delete item.activeListeners;
        return item;
      };
      exports.default = deactivateListeners;
    }
  });

  // node_modules/json-dom/dist/events/functions/findEventListener.js
  var require_findEventListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/findEventListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getListenerOptions_1 = __importDefault(require_getListenerOptions());
      var optionsToNumber_1 = __importDefault(require_optionsToNumber());
      var capturing = (options) => {
        const template = (0, getListenerOptions_1.default)();
        return ((0, optionsToNumber_1.default)(template, options) & template.capture) !== 0;
      };
      var findEventListener = (eventName, listenerFunction, customArgs, options, item) => {
        customArgs = customArgs ?? null;
        if (!si_funciona_1.default.isObject(item.eventListeners)) {
          return [-1, void 0];
        }
        if (typeof item.eventListeners[eventName] === "undefined") {
          return [-1, void 0];
        }
        const findListener = {
          listenerFunc: listenerFunction,
          listenerArgs: si_funciona_1.default.describeObject(customArgs)
        };
        const listenerIndex = item.eventListeners[eventName].findIndex((eventListener) => {
          const argDescriptor = si_funciona_1.default.describeObject(eventListener.listenerArgs);
          return eventListener.listenerFunc === findListener.listenerFunc && si_funciona_1.default.sameDescriptor(findListener.listenerArgs, argDescriptor) && capturing(eventListener.listenerOptions) === capturing(options);
        });
        return [listenerIndex, item.eventListeners[eventName][listenerIndex]];
      };
      exports.default = findEventListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/registerListener.js
  var require_registerListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/registerListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var registerListener = (listener, name = listener.name, parent = documentItem_1.default) => Object.assign(parent.eventActions, {
        [name]: listener
      });
      exports.default = registerListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/fullAddEventListener.js
  var require_fullAddEventListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/fullAddEventListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var curry_1 = __importDefault(require_curry());
      var pipe_1 = __importDefault(require_pipe());
      var getTopParentItem_1 = __importDefault(require_getTopParentItem());
      var registerListener_1 = __importDefault(require_registerListener());
      var addEventListener_1 = __importDefault(require_addEventListener());
      var bindListeners_1 = __importDefault(require_bindListeners());
      var fullAddEventListener = (eventName, listener, name, customArgs, options, item) => {
        const listenerName = name ?? listener.name;
        customArgs = customArgs ?? null;
        options = options ?? false;
        return (0, pipe_1.default)((currentItem) => {
          (0, registerListener_1.default)(listener, listenerName, (0, getTopParentItem_1.default)(currentItem));
          return currentItem;
        }, (0, curry_1.default)(addEventListener_1.default)(eventName, listenerName, customArgs, options), bindListeners_1.default)(item);
      };
      exports.default = fullAddEventListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/removeEventListener.js
  var require_removeEventListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/removeEventListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var findEventListener_1 = __importDefault(require_findEventListener());
      var deactivateListener_1 = __importDefault(require_deactivateListener());
      var removeEventListener = (eventName, listenerFunction, customArgs, options, item) => {
        const [listenerIndex, foundListener] = (0, findEventListener_1.default)(eventName, listenerFunction, customArgs, options, item);
        if (listenerIndex < 0 || typeof foundListener === "undefined") {
          return item;
        }
        if (foundListener.listenerActive === true) {
          item = (0, deactivateListener_1.default)(eventName, foundListener, item);
        }
        item.eventListeners[eventName].splice(listenerIndex, 1);
        return item;
      };
      exports.default = removeEventListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/fullRemoveEventListener.js
  var require_fullRemoveEventListener = __commonJS({
    "node_modules/json-dom/dist/events/functions/fullRemoveEventListener.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var removeEventListener_1 = __importDefault(require_removeEventListener());
      var fullRemoveEventListener = (eventName, listener, name, customArgs, options, item) => {
        const listenerName = name ?? listener.name;
        return (0, removeEventListener_1.default)(eventName, listenerName, customArgs, options, item);
      };
      exports.default = fullRemoveEventListener;
    }
  });

  // node_modules/json-dom/dist/events/functions/receiveForwardedEvent.js
  var require_receiveForwardedEvent = __commonJS({
    "node_modules/json-dom/dist/events/functions/receiveForwardedEvent.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var itemIdIndex_1 = require_itemIdIndex();
      var receiveForwardedEvent = (root, envelope, validator) => {
        const resolvedItem = (0, itemIdIndex_1.getItemById)(root, envelope.itemId);
        if (validator && !validator(resolvedItem, envelope)) {
          return;
        }
        const element = resolvedItem.element;
        if (!element) {
          throw new Error("The resolved item has no element to dispatch the event on.");
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
    }
  });

  // node_modules/json-dom/dist/events/functions/registerListeners.js
  var require_registerListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/registerListeners.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var documentItem_1 = __importDefault(require_documentItem());
      var registerListeners = (listeners, parent = documentItem_1.default) => {
        si_funciona_1.default.mergeObjectsMutable(parent.eventActions, listeners);
        return parent;
      };
      exports.default = registerListeners;
    }
  });

  // node_modules/json-dom/dist/events/functions/revokeActiveListeners.js
  var require_revokeActiveListeners = __commonJS({
    "node_modules/json-dom/dist/events/functions/revokeActiveListeners.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getListenerOptions_1 = __importDefault(require_getListenerOptions());
      var numberToOptions_1 = __importDefault(require_numberToOptions());
      var unassignListener_1 = __importDefault(require_unassignListener());
      var revokeActiveListeners = (eventName, item) => {
        const listenerOptions = (0, getListenerOptions_1.default)();
        const eventOptions = si_funciona_1.default.dotGet(item, `activeListeners.${eventName}`);
        if (eventOptions === null) {
          return item;
        }
        si_funciona_1.default.objectKeys(eventOptions).forEach((binaryOptions) => {
          const optionsToUse = (0, numberToOptions_1.default)(listenerOptions, parseInt(binaryOptions));
          const usesSignal = !!optionsToUse.signal;
          if (!usesSignal) {
            delete optionsToUse.signal;
          }
          ;
          item.activeListeners[eventName][Number(binaryOptions)].forEach((eventResponder) => {
            if (!eventResponder.assignedHandler) {
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
    }
  });

  // node_modules/json-dom/dist/events/functions/setForwardEvents.js
  var require_setForwardEvents = __commonJS({
    "node_modules/json-dom/dist/events/functions/setForwardEvents.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var setForwardEvents = (transport, parent = documentItem_1.default) => {
        parent.forwardEvents = transport;
        return parent;
      };
      exports.default = setForwardEvents;
    }
  });

  // node_modules/json-dom/dist/events/objects/options.js
  var require_options = __commonJS({
    "node_modules/json-dom/dist/events/objects/options.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getListenerOptions_1 = __importDefault(require_getListenerOptions());
      var numberToOptions_1 = __importDefault(require_numberToOptions());
      var optionsToNumber_1 = __importDefault(require_optionsToNumber());
      exports.default = {
        getListenerOptions: getListenerOptions_1.default,
        numberToOptions: numberToOptions_1.default,
        optionsToNumber: optionsToNumber_1.default
      };
    }
  });

  // node_modules/json-dom/dist/events/index.js
  var require_events = __commonJS({
    "node_modules/json-dom/dist/events/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var activateListener_1 = __importDefault(require_activateListener());
      var addEventListener_1 = __importDefault(require_addEventListener());
      var applyActiveListeners_1 = __importDefault(require_applyActiveListeners());
      var assignListener_1 = __importDefault(require_assignListener());
      var bindAllListeners_1 = __importDefault(require_bindAllListeners());
      var bindElementListeners_1 = __importDefault(require_bindElementListeners());
      var bindListeners_1 = __importDefault(require_bindListeners());
      var deactivateListener_1 = __importDefault(require_deactivateListener());
      var deactivateListeners_1 = __importDefault(require_deactivateListeners());
      var findEventListener_1 = __importDefault(require_findEventListener());
      var fullAddEventListener_1 = __importDefault(require_fullAddEventListener());
      var fullRemoveEventListener_1 = __importDefault(require_fullRemoveEventListener());
      var listenerOptions_1 = __importDefault(require_listenerOptions());
      var makeEventHandler_1 = __importDefault(require_makeEventHandler());
      var makeForwardingListener_1 = __importDefault(require_makeForwardingListener());
      var receiveForwardedEvent_1 = __importDefault(require_receiveForwardedEvent());
      var registerListener_1 = __importDefault(require_registerListener());
      var registerListeners_1 = __importDefault(require_registerListeners());
      var removeEventListener_1 = __importDefault(require_removeEventListener());
      var retrieveListener_1 = __importDefault(require_retrieveListener());
      var revokeActiveListeners_1 = __importDefault(require_revokeActiveListeners());
      var setForwardEvents_1 = __importDefault(require_setForwardEvents());
      var unassignListener_1 = __importDefault(require_unassignListener());
      var createEventListener_1 = __importDefault(require_createEventListener());
      var createEventProxy_1 = __importDefault(require_createEventProxy());
      var createEventResponder_1 = __importDefault(require_createEventResponder());
      var options_1 = __importDefault(require_options());
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
    }
  });

  // node_modules/json-dom/dist/domItem/objects/addDomItemProperties.js
  var require_addDomItemProperties = __commonJS({
    "node_modules/json-dom/dist/domItem/objects/addDomItemProperties.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createDomItem_1 = __importDefault(require_createDomItem());
      var addDomItemProperties = (item) => {
        if (typeof item.children !== "undefined") {
          item.children.forEach((child) => {
            addDomItemProperties(child);
          });
        }
        return (0, createDomItem_1.default)(item);
      };
      exports.default = addDomItemProperties;
    }
  });

  // node_modules/json-dom/dist/domItem/traits/defineTrait.js
  var require_defineTrait = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/defineTrait.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var definitions_1 = __importDefault(require_definitions());
      var defineTrait = (name, definition) => {
        definitions_1.default.set(name, definition);
        return definition;
      };
      exports.default = defineTrait;
    }
  });

  // node_modules/json-dom/dist/domItem/query/gatherChildItems.js
  var require_gatherChildItems = __commonJS({
    "node_modules/json-dom/dist/domItem/query/gatherChildItems.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var gatherChildItems = (item, test) => test(item, item.children.reduce((a, b) => a.concat(gatherChildItems(b, test)), []));
      exports.default = gatherChildItems;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getChildrenByClass.js
  var require_getChildrenByClass = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getChildrenByClass.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var gatherChildItems_1 = __importDefault(require_gatherChildItems());
      var getChildrenByClass = (className, item = documentItem_1.default.body) => (0, gatherChildItems_1.default)(item, (child, gatheredResults) => (child.attributes.className ?? "").split(" ").includes(className) ? gatheredResults.concat([child]) : gatheredResults);
      exports.default = getChildrenByClass;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getChildTest.js
  var require_getChildTest = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getChildTest.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getChildTest = (attr, value) => (item, gatheredResults) => item.attributes[attr] && item.attributes[attr] === value ? gatheredResults.concat([item]) : gatheredResults;
      exports.default = getChildTest;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getChildrenFromAttribute.js
  var require_getChildrenFromAttribute = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getChildrenFromAttribute.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var gatherChildItems_1 = __importDefault(require_gatherChildItems());
      var getChildTest_1 = __importDefault(require_getChildTest());
      var getChildrenFromAttribute = (attr, value, item = documentItem_1.default.body) => (0, gatherChildItems_1.default)(item, (0, getChildTest_1.default)(attr, value));
      exports.default = getChildrenFromAttribute;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getChildrenByName.js
  var require_getChildrenByName = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getChildrenByName.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getChildrenFromAttribute_1 = __importDefault(require_getChildrenFromAttribute());
      var getChildrenByName = si_funciona_1.default.curry(getChildrenFromAttribute_1.default)("name");
      exports.default = getChildrenByName;
    }
  });

  // node_modules/json-dom/dist/domItem/tree/getItemByPath.js
  var require_getItemByPath = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/getItemByPath.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_reduce();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getItemByPath = (root, path) => path.reduce((item, index) => {
        const child = item.children[index];
        if (!child) {
          throw new Error(`No item at index ${index} of path [${path.join(", ")}] - the tree may have changed shape since this path was built.`);
        }
        return child;
      }, root);
      exports.default = getItemByPath;
    }
  });

  // node_modules/json-dom/dist/domItem/tree/getItemPath.js
  var require_getItemPath = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/getItemPath.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getItemPath = (item) => {
        if (item.parentItem === null) {
          throw new Error("Detached child, missing parentItem reference. Use empty object if this is the root item.");
        }
        if (si_funciona_1.default.emptyObject(item.parentItem)) {
          return [];
        }
        const parent = item.parentItem;
        return [...getItemPath(parent), parent.children.indexOf(item)];
      };
      exports.default = getItemPath;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getParentsByClass.js
  var require_getParentsByClass = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getParentsByClass.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var si_funciona_1 = __importDefault(require_main());
      var getParentsByClass = (className, item = documentItem_1.default.body) => {
        if (item.parentItem === null) {
          if (item.nodeName === "#document") {
            throw new Error("Root parent item must be an empty object, null reference found.");
          }
          throw new Error("Detached child, missing parentItem reference. Use empty object if this is the root item.");
        }
        if (si_funciona_1.default.emptyObject(item.parentItem)) {
          return [];
        }
        const parent = item.parentItem;
        const carriesClass = (parent.attributes.className ?? "").split(" ").includes(className);
        return carriesClass ? getParentsByClass(className, parent).concat([parent]) : getParentsByClass(className, parent);
      };
      exports.default = getParentsByClass;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getParentsFromAttribute.js
  var require_getParentsFromAttribute = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getParentsFromAttribute.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var si_funciona_1 = __importDefault(require_main());
      var getParentsFromAttribute = (attr, value, item = documentItem_1.default.body) => {
        if (item.parentItem === null) {
          if (item.nodeName === "#document") {
            throw new Error("Root parent item must be an empty object, null reference found.");
          }
          throw new Error("Detached child, missing parentItem reference. Use empty object if this is the root item.");
        }
        if (si_funciona_1.default.emptyObject(item.parentItem)) {
          return [];
        }
        const parent = item.parentItem;
        return (parent.attributes[attr] || item[attr] || false) === value ? getParentsFromAttribute(attr, value, parent).concat([parent]) : getParentsFromAttribute(attr, value, parent);
      };
      exports.default = getParentsFromAttribute;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getParentsByName.js
  var require_getParentsByName = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getParentsByName.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getParentsFromAttribute_1 = __importDefault(require_getParentsFromAttribute());
      var getParentsByName = si_funciona_1.default.curry(getParentsFromAttribute_1.default)("name");
      exports.default = getParentsByName;
    }
  });

  // node_modules/json-dom/dist/domItem/query/getParentsByTagName.js
  var require_getParentsByTagName = __commonJS({
    "node_modules/json-dom/dist/domItem/query/getParentsByTagName.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getParentsFromAttribute_1 = __importDefault(require_getParentsFromAttribute());
      var getParentsByTagName = si_funciona_1.default.curry(getParentsFromAttribute_1.default)("nodeName");
      exports.default = getParentsByTagName;
    }
  });

  // node_modules/json-dom/dist/domItem/traits/getTraitDefinition.js
  var require_getTraitDefinition = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/getTraitDefinition.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var definitions_1 = __importDefault(require_definitions());
      var getTraitDefinition = (name) => definitions_1.default.get(name);
      exports.default = getTraitDefinition;
    }
  });

  // node_modules/json-dom/dist/domItem/traits/hasTrait.js
  var require_hasTrait = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/hasTrait.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var hasTrait = (item, trait) => (item.has ?? {})[trait] === true;
      exports.default = hasTrait;
    }
  });

  // node_modules/json-dom/dist/domItem/traits/hasTraits.js
  var require_hasTraits = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/hasTraits.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var hasTraits = (item, ...traits) => traits.every((trait) => (item.has ?? {})[trait] === true);
      exports.default = hasTraits;
    }
  });

  // node_modules/json-dom/dist/domItem/tree/insertChild.js
  var require_insertChild = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/insertChild.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var insertChild = (parent, child, index) => {
        parent.children.splice(index, 0, child);
        child.parentItem = parent;
        return parent;
      };
      exports.default = insertChild;
    }
  });

  // node_modules/json-dom/dist/domItem/traits/isDomItem.js
  var require_isDomItem = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/isDomItem.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_every();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var hasTrait_1 = __importDefault(require_hasTrait());
      var isDomItem = (item) => (0, hasTrait_1.default)(item, "render") && item.children.every(isDomItem);
      exports.default = isDomItem;
    }
  });

  // node_modules/json-dom/dist/domItem/tree/setParentItemReferences.js
  var require_setParentItemReferences = __commonJS({
    "node_modules/json-dom/dist/domItem/tree/setParentItemReferences.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var setParentItemReferences = (item) => {
        if (!item.children || !item.children.length) {
          item.children = [];
          return item;
        }
        item.children.forEach((child) => {
          child.parentItem = item;
          setParentItemReferences(child);
        });
        return item;
      };
      exports.default = setParentItemReferences;
    }
  });

  // node_modules/json-dom/dist/domItem/index.js
  var require_domItem = __commonJS({
    "node_modules/json-dom/dist/domItem/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var addDomItemProperties_1 = __importDefault(require_addDomItemProperties());
      var appendChild_1 = __importDefault(require_appendChild());
      var createCoreItem_1 = __importDefault(require_createCoreItem());
      var createDomItem_1 = __importDefault(require_createDomItem());
      var defineTrait_1 = __importDefault(require_defineTrait());
      var documentDomItem_1 = __importDefault(require_documentDomItem());
      var documentItem_1 = __importDefault(require_documentItem());
      var gatherChildItems_1 = __importDefault(require_gatherChildItems());
      var getChildrenByClass_1 = __importDefault(require_getChildrenByClass());
      var getChildrenByName_1 = __importDefault(require_getChildrenByName());
      var getChildrenFromAttribute_1 = __importDefault(require_getChildrenFromAttribute());
      var getChildTest_1 = __importDefault(require_getChildTest());
      var getItemByElement_1 = __importDefault(require_getItemByElement());
      var itemIdIndex_1 = require_itemIdIndex();
      var getItemByPath_1 = __importDefault(require_getItemByPath());
      var getItemPath_1 = __importDefault(require_getItemPath());
      var getParentsByClass_1 = __importDefault(require_getParentsByClass());
      var getParentsByName_1 = __importDefault(require_getParentsByName());
      var getParentsByTagName_1 = __importDefault(require_getParentsByTagName());
      var getParentsFromAttribute_1 = __importDefault(require_getParentsFromAttribute());
      var getTopParentItem_1 = __importDefault(require_getTopParentItem());
      var getTraitDefinition_1 = __importDefault(require_getTraitDefinition());
      var hasTrait_1 = __importDefault(require_hasTrait());
      var hasTraits_1 = __importDefault(require_hasTraits());
      var initChildren_1 = __importDefault(require_initChildren());
      var initRoot_1 = __importDefault(require_initRoot());
      var insertChild_1 = __importDefault(require_insertChild());
      var isDomItem_1 = __importDefault(require_isDomItem());
      var removeChild_1 = __importDefault(require_removeChild());
      var setParentItemReferences_1 = __importDefault(require_setParentItemReferences());
      var withTrait_1 = __importDefault(require_withTrait());
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
    }
  });

  // node_modules/json-dom/dist/inflate/jsonToDomItem.js
  var require_jsonToDomItem = __commonJS({
    "node_modules/json-dom/dist/inflate/jsonToDomItem.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var setParentItemReferences_1 = __importDefault(require_setParentItemReferences());
      var addDomItemProperties_1 = __importDefault(require_addDomItemProperties());
      var jsonToDomItem = (jsonString) => {
        const parsedJson = (0, setParentItemReferences_1.default)((0, addDomItemProperties_1.default)(JSON.parse(jsonString)));
        if (parsedJson.nodeName === "#document") {
          const root = parsedJson;
          root.element = document;
          root.head = root.children[0];
          root.body = root.children[1];
        }
        return parsedJson;
      };
      exports.default = jsonToDomItem;
    }
  });

  // node_modules/json-dom/dist/inflate/index.js
  var require_inflate = __commonJS({
    "node_modules/json-dom/dist/inflate/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var jsonToDomItem_1 = __importDefault(require_jsonToDomItem());
      exports.default = {
        jsonToDomItem: jsonToDomItem_1.default
      };
    }
  });

  // node_modules/core-js/internals/is-array.js
  var require_is_array = __commonJS({
    "node_modules/core-js/internals/is-array.js"(exports, module) {
      "use strict";
      init_process();
      var classof = require_classof_raw();
      module.exports = Array.isArray || function isArray(argument) {
        return classof(argument) === "Array";
      };
    }
  });

  // node_modules/core-js/internals/is-raw-json.js
  var require_is_raw_json = __commonJS({
    "node_modules/core-js/internals/is-raw-json.js"(exports, module) {
      "use strict";
      init_process();
      var isObject = require_is_object();
      var getInternalState = require_internal_state().get;
      module.exports = function isRawJSON(O) {
        if (!isObject(O)) return false;
        var state = getInternalState(O);
        return !!state && state.type === "RawJSON";
      };
    }
  });

  // node_modules/core-js/internals/this-number-value.js
  var require_this_number_value = __commonJS({
    "node_modules/core-js/internals/this-number-value.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      module.exports = uncurryThis(1.1.valueOf);
    }
  });

  // node_modules/core-js/internals/parse-json-string.js
  var require_parse_json_string = __commonJS({
    "node_modules/core-js/internals/parse-json-string.js"(exports, module) {
      "use strict";
      init_process();
      var uncurryThis = require_function_uncurry_this();
      var hasOwn = require_has_own_property();
      var $SyntaxError = SyntaxError;
      var $parseInt = parseInt;
      var fromCharCode = String.fromCharCode;
      var at = uncurryThis("".charAt);
      var slice = uncurryThis("".slice);
      var exec = uncurryThis(/./.exec);
      var codePoints = {
        '\\"': '"',
        "\\\\": "\\",
        "\\/": "/",
        "\\b": "\b",
        "\\f": "\f",
        "\\n": "\n",
        "\\r": "\r",
        "\\t": "	"
      };
      var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
      var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;
      module.exports = function(source, i) {
        var unterminated = true;
        var value = "";
        while (i < source.length) {
          var chr = at(source, i);
          if (chr === "\\") {
            var twoChars = slice(source, i, i + 2);
            if (hasOwn(codePoints, twoChars)) {
              value += codePoints[twoChars];
              i += 2;
            } else if (twoChars === "\\u") {
              i += 2;
              var fourHexDigits = slice(source, i, i + 4);
              if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError("Bad Unicode escape at: " + i);
              value += fromCharCode($parseInt(fourHexDigits, 16));
              i += 4;
            } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
          } else if (chr === '"') {
            unterminated = false;
            i++;
            break;
          } else {
            if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError("Bad control character in string literal at: " + i);
            value += chr;
            i++;
          }
        }
        if (unterminated) throw new $SyntaxError("Unterminated string at: " + i);
        return { value, end: i };
      };
    }
  });

  // node_modules/core-js/internals/native-raw-json.js
  var require_native_raw_json = __commonJS({
    "node_modules/core-js/internals/native-raw-json.js"(exports, module) {
      "use strict";
      init_process();
      var fails = require_fails();
      module.exports = !fails(function() {
        var unsafeInt = "9007199254740993";
        var raw = JSON.rawJSON(unsafeInt);
        return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
      });
    }
  });

  // node_modules/core-js/modules/es.json.stringify.js
  var require_es_json_stringify = __commonJS({
    "node_modules/core-js/modules/es.json.stringify.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var getBuiltIn = require_get_built_in();
      var call = require_function_call();
      var uncurryThis = require_function_uncurry_this();
      var fails = require_fails();
      var isArray = require_is_array();
      var isCallable = require_is_callable();
      var isObject = require_is_object();
      var create = require_object_create();
      var isRawJSON = require_is_raw_json();
      var isSymbol = require_is_symbol();
      var classof = require_classof_raw();
      var thisNumberValue = require_this_number_value();
      var includes = require_array_includes().includes;
      var hasOwn = require_has_own_property();
      var toString = require_to_string();
      var parseJSONString = require_parse_json_string();
      var uid = require_uid();
      var NATIVE_SYMBOL = require_symbol_constructor_detection();
      var NATIVE_RAW_JSON = require_native_raw_json();
      var $String = String;
      var $TypeError = TypeError;
      var $stringify = getBuiltIn("JSON", "stringify");
      var $BigInt = getBuiltIn("BigInt");
      var stringValueOf = uncurryThis("".valueOf);
      var booleanValueOf = uncurryThis(true.valueOf);
      var bigIntValueOf = $BigInt && uncurryThis($BigInt.prototype.valueOf);
      var exec = uncurryThis(/./.exec);
      var charAt = uncurryThis("".charAt);
      var charCodeAt = uncurryThis("".charCodeAt);
      var replace = uncurryThis("".replace);
      var slice = uncurryThis("".slice);
      var push = uncurryThis([].push);
      var pop = uncurryThis([].pop);
      var numberToString = uncurryThis(1.1.toString);
      var surrogates = /[\uD800-\uDFFF]/g;
      var leadingSurrogates = /^[\uD800-\uDBFF]$/;
      var trailingSurrogates = /^[\uDC00-\uDFFF]$/;
      var digits = /^\d+$/;
      var RAW_MARK = uid();
      var KEY_MARK = uid();
      var END_MARK = uid();
      var RAW_MARK_LENGTH = RAW_MARK.length;
      var KEY_MARK_LENGTH = KEY_MARK.length;
      var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function() {
        var symbol = getBuiltIn("Symbol")("stringify detection");
        return $stringify([symbol]) !== "[null]" || $stringify({ a: symbol }) !== "{}" || $stringify(Object(symbol)) !== "{}";
      });
      var ILL_FORMED_UNICODE = fails(function() {
        return $stringify("\uDF06\uD834") !== '"\\udf06\\ud834"' || $stringify("\uDEAD") !== '"\\udead"';
      });
      var isRawJSONValue = NATIVE_RAW_JSON ? getBuiltIn("JSON", "isRawJSON") : isRawJSON;
      var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function(it, replacer, space) {
        return $stringify(it, function(key, value) {
          var replaced = call(replacer, this, key, value);
          if (!isSymbol(replaced)) return replaced;
        }, space);
      } : $stringify;
      var fixIllFormedJSON = function(match, offset, string) {
        var prev = charAt(string, offset - 1);
        var next = charAt(string, offset + 1);
        if (exec(leadingSurrogates, match) && !exec(trailingSurrogates, next) || exec(trailingSurrogates, match) && !exec(leadingSurrogates, prev)) {
          return "\\u" + numberToString(charCodeAt(match, 0), 16);
        }
        return match;
      };
      var getPropertyList = function(replacer) {
        if (!isArray(replacer)) return;
        var rawLength = replacer.length;
        var propertyList = [];
        var addedKeys = create(null);
        for (var i = 0; i < rawLength; i++) {
          var element = replacer[i];
          var key;
          if (typeof element == "string") key = element;
          else if (typeof element == "number" || classof(element) === "Number" || classof(element) === "String") key = toString(element);
          else continue;
          if (!hasOwn(addedKeys, key)) {
            addedKeys[key] = true;
            push(propertyList, key);
          }
        }
        return propertyList;
      };
      var hasInternalSlot = function(valueOf, it) {
        try {
          valueOf(it);
          return true;
        } catch (error) {
          return false;
        }
      };
      var isBoxedPrimitive = function(it) {
        var kind = classof(it);
        return kind === "Number" && hasInternalSlot(thisNumberValue, it) || kind === "String" && hasInternalSlot(stringValueOf, it) || kind === "Boolean" && hasInternalSlot(booleanValueOf, it) || !!bigIntValueOf && kind === "BigInt" && hasInternalSlot(bigIntValueOf, it);
      };
      var isSerializedAsObject = function(it) {
        if (!isObject(it) || isCallable(it) || isArray(it)) return false;
        try {
          return !isBoxedPrimitive(it);
        } catch (error) {
          return true;
        }
      };
      var createElementHolder = function(holder, key) {
        return {
          toJSON: function() {
            var element = holder[key];
            if (isObject(element) || typeof element == "bigint") {
              var elementToJSON = element.toJSON;
              if (isCallable(elementToJSON)) element = call(elementToJSON, element, key);
            }
            return element;
          }
        };
      };
      var getKeyPrefix = function(propertyList) {
        for (var i = 0, length = propertyList.length; i < length; i++) {
          if (exec(digits, propertyList[i])) return KEY_MARK;
        }
        return "";
      };
      var createOrderedObject = function(value, propertyList, keyPrefix) {
        var ordered = create(null);
        for (var i = 0, length = propertyList.length; i < length; i++) {
          var key = propertyList[i];
          ordered[keyPrefix + key] = createElementHolder(value, key);
        }
        ordered[END_MARK] = null;
        return ordered;
      };
      if ($stringify) $({ target: "JSON", stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {
        stringify: function stringify(text, replacer, space) {
          var replacerFunction = isCallable(replacer) ? replacer : void 0;
          var propertyList = replacerFunction ? void 0 : getPropertyList(replacer);
          var keyPrefix = propertyList && getKeyPrefix(propertyList);
          var rawStrings = [];
          var openObjects = [];
          var parentOrdered = [];
          var currentOrdered;
          var marked = false;
          var root = true;
          var json = stringifyWithProperSymbolsConversion(text, function(key, value) {
            key = $String(key);
            if (propertyList) {
              if (key === END_MARK) {
                pop(openObjects);
                currentOrdered = pop(parentOrdered);
                return;
              }
              if (root) root = false;
              else if (this !== currentOrdered && !isArray(this) && !includes(propertyList, key)) return;
            } else if (replacerFunction) value = call(replacerFunction, this, key, value);
            if (isRawJSONValue(value)) {
              if (NATIVE_RAW_JSON) return value;
              marked = true;
              return RAW_MARK + (push(rawStrings, value.rawJSON) - 1);
            }
            if (propertyList && isSerializedAsObject(value)) {
              if (includes(openObjects, value)) throw new $TypeError("Converting circular structure to JSON");
              var ordered = createOrderedObject(value, propertyList, keyPrefix);
              push(openObjects, value);
              push(parentOrdered, currentOrdered);
              currentOrdered = ordered;
              if (keyPrefix) marked = true;
              return ordered;
            }
            return value;
          }, space);
          if (typeof json != "string") return json;
          if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);
          if (!marked) return json;
          var result = "";
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
    }
  });

  // node_modules/core-js/internals/get-iterator-flattenable.js
  var require_get_iterator_flattenable = __commonJS({
    "node_modules/core-js/internals/get-iterator-flattenable.js"(exports, module) {
      "use strict";
      init_process();
      var call = require_function_call();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var getIteratorMethod = require_get_iterator_method_internal();
      module.exports = function(obj, stringHandling) {
        if (!stringHandling || typeof obj !== "string") anObject(obj);
        var method = getIteratorMethod(obj);
        return getIteratorDirect(anObject(method !== void 0 ? call(method, obj) : obj));
      };
    }
  });

  // node_modules/core-js/modules/es.iterator.flat-map.js
  var require_es_iterator_flat_map = __commonJS({
    "node_modules/core-js/modules/es.iterator.flat-map.js"() {
      "use strict";
      init_process();
      var $ = require_export();
      var call = require_function_call();
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var getIteratorDirect = require_get_iterator_direct();
      var getIteratorFlattenable = require_get_iterator_flattenable();
      var createIteratorProxy = require_iterator_create_proxy();
      var iteratorClose = require_iterator_close();
      var fails = require_fails();
      var IS_PURE = require_is_pure();
      var iteratorHelperThrowsOnInvalidIterator = require_iterator_helper_throws_on_invalid_iterator();
      var iteratorHelperWithoutClosingOnEarlyError = require_iterator_helper_without_closing_on_early_error();
      var THROWS_ON_ITERATOR_WITHOUT_RETURN = !IS_PURE && fails(function() {
        return [1].values().flatMap(function() {
          return [1];
        }).find(function() {
          return true;
        }) !== 1;
      });
      var FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !THROWS_ON_ITERATOR_WITHOUT_RETURN && !iteratorHelperThrowsOnInvalidIterator("flatMap", function() {
      });
      var flatMapWithoutClosingOnEarlyError = !IS_PURE && !THROWS_ON_ITERATOR_WITHOUT_RETURN && !FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR && iteratorHelperWithoutClosingOnEarlyError("flatMap", TypeError);
      var FORCED = IS_PURE || THROWS_ON_ITERATOR_WITHOUT_RETURN || FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || flatMapWithoutClosingOnEarlyError;
      var IteratorProxy = createIteratorProxy(function() {
        var iterator = this.iterator;
        var mapper = this.mapper;
        var result, inner;
        while (true) {
          if (inner = this.inner) try {
            result = anObject(call(inner.next, inner.iterator));
            if (!result.done) return result.value;
            this.inner = null;
          } catch (error) {
            iteratorClose(iterator, "throw", error);
          }
          result = anObject(call(this.next, iterator));
          if (this.done = !!result.done) return;
          try {
            this.inner = getIteratorFlattenable(mapper(result.value, this.counter++), false);
          } catch (error) {
            iteratorClose(iterator, "throw", error);
          }
        }
      });
      $({ target: "Iterator", proto: true, real: true, forced: FORCED }, {
        flatMap: function flatMap(mapper) {
          anObject(this);
          try {
            aCallable(mapper);
          } catch (error) {
            iteratorClose(this, "throw", error);
          }
          if (flatMapWithoutClosingOnEarlyError) return call(flatMapWithoutClosingOnEarlyError, this, mapper);
          return new IteratorProxy(getIteratorDirect(this), {
            mapper,
            inner: null
          });
        }
      });
    }
  });

  // node_modules/core-js/modules/esnext.iterator.flat-map.js
  var require_esnext_iterator_flat_map = __commonJS({
    "node_modules/core-js/modules/esnext.iterator.flat-map.js"() {
      "use strict";
      init_process();
      require_es_iterator_flat_map();
    }
  });

  // node_modules/json-dom/dist/domItem/traits/getNonSerializableKeys.js
  var require_getNonSerializableKeys = __commonJS({
    "node_modules/json-dom/dist/domItem/traits/getNonSerializableKeys.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_flat_map();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var definitions_1 = __importDefault(require_definitions());
      var getNonSerializableKeys = (item) => Object.keys(item.has ?? {}).flatMap((trait) => {
        const definition = definitions_1.default.get(trait);
        return definition && definition.serializable === false ? definition.keys : [];
      });
      exports.default = getNonSerializableKeys;
    }
  });

  // node_modules/json-dom/dist/deflate/removeEmptyProperties.js
  var require_removeEmptyProperties = __commonJS({
    "node_modules/json-dom/dist/deflate/removeEmptyProperties.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var getNonSerializableKeys_1 = __importDefault(require_getNonSerializableKeys());
      var isEmpty = (propertyValue) => si_funciona_1.default.emptyObject(propertyValue) || propertyValue === null || typeof propertyValue === "undefined";
      var removeEmptyProperties = (item, propertiesToDelete = []) => {
        item.children.forEach((child) => {
          removeEmptyProperties(child, propertiesToDelete);
        });
        const properties = item;
        const toDelete = propertiesToDelete.concat((0, getNonSerializableKeys_1.default)(item));
        si_funciona_1.default.objectKeys(item).forEach((property) => {
          const propertyValue = properties[property];
          if (isEmpty(propertyValue) || toDelete.includes(property)) {
            delete properties[property];
          }
        });
        return item;
      };
      exports.default = removeEmptyProperties;
    }
  });

  // node_modules/json-dom/dist/deflate/domItemToJson.js
  var require_domItemToJson = __commonJS({
    "node_modules/json-dom/dist/deflate/domItemToJson.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      require_es_json_stringify();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var removeEmptyProperties_1 = __importDefault(require_removeEmptyProperties());
      var useExclusions = /* @__PURE__ */ (function makeExclusions() {
        let jsonExclusions = [];
        return (key, value) => {
          if (key === "jsonExclusions") {
            jsonExclusions = value;
            return value;
          }
          if (jsonExclusions.includes(key)) {
            return void 0;
          }
          return value;
        };
      })();
      var domItemToJson = (item, {
        propertiesToDelete = []
      } = {}) => JSON.stringify((0, removeEmptyProperties_1.default)(si_funciona_1.default.cloneObject(item), ["activeListeners", "element", "parentItem", "body", "head", ...propertiesToDelete]), useExclusions);
      exports.default = domItemToJson;
    }
  });

  // node_modules/json-dom/dist/deflate/index.js
  var require_deflate = __commonJS({
    "node_modules/json-dom/dist/deflate/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var domItemToJson_1 = __importDefault(require_domItemToJson());
      var removeEmptyProperties_1 = __importDefault(require_removeEmptyProperties());
      exports.default = {
        domItemToJson: domItemToJson_1.default,
        removeEmptyProperties: removeEmptyProperties_1.default
      };
    }
  });

  // node_modules/json-dom/dist/diff/elementHasAttribute.js
  var require_elementHasAttribute = __commonJS({
    "node_modules/json-dom/dist/diff/elementHasAttribute.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_map();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getAssignedStyles_1 = __importDefault(require_getAssignedStyles());
      var si_funciona_1 = __importDefault(require_main());
      var checkStyles = (element, attr = {}) => {
        const assignedStyles = (0, getAssignedStyles_1.default)(element.style) ?? {};
        if (si_funciona_1.default.emptyObject(assignedStyles)) {
          return 1;
        }
        return si_funciona_1.default.compareArrays(Object.keys(attr).map(si_funciona_1.default.kabobCase), Object.keys(assignedStyles));
      };
      var checkClasses = (element, attr = "") => {
        if (typeof attr !== "string") {
          attr = "";
        }
        const assignedClasses = Array.from(element.classList);
        if (!assignedClasses.length) {
          return 1;
        }
        return si_funciona_1.default.compareArrays(attr.split(" "), assignedClasses);
      };
      var elementHasAttribute = (element, key, attr) => {
        if (!element) {
          return 1;
        }
        if (key === "style") {
          return checkStyles(element, attr);
        }
        if (key === "class") {
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
    }
  });

  // node_modules/json-dom/dist/diff/domItemChanges.js
  var require_domItemChanges = __commonJS({
    "node_modules/json-dom/dist/diff/domItemChanges.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      require_esnext_iterator_reduce();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var si_funciona_1 = __importDefault(require_main());
      var elementHasAttribute_1 = __importDefault(require_elementHasAttribute());
      var createChangeList_1 = __importDefault(require_createChangeList());
      var checkAttribute = (element) => (attr, key) => {
        if (typeof attr === "object") {
          const styles = attr;
          const elementStyle = () => element.style;
          const styleDiff = (0, elementHasAttribute_1.default)(element, key, attr);
          if (Array.isArray(styleDiff) && styleDiff.length === 1 && styleDiff[0].result[0] === 0 && elementStyle()[styleDiff[0].value] === styles[styleDiff[0].value]) {
            return 0;
          }
          return si_funciona_1.default.filterObject(styleDiff, (arrayDiff) => arrayDiff.result[0] !== 0 || elementStyle()[arrayDiff.value] !== styles[arrayDiff.value]);
        }
        if (key === "class") {
          const classDiff = (0, elementHasAttribute_1.default)(element, key, attr);
          if (Array.isArray(classDiff) && classDiff.length === 1 && classDiff[0].result[0] === 0) {
            return 0;
          }
          return si_funciona_1.default.filterObject(classDiff, (arrayDiff) => arrayDiff.result[0] !== 0);
        }
        return (0, elementHasAttribute_1.default)(element, key, attr);
      };
      var kabobCaseAttributes = (attributesToSet) => si_funciona_1.default.reduceObject(attributesToSet, (attributes, value, name) => {
        let attrValue = attributesToSet[name] ?? value;
        if (si_funciona_1.default.isObject(attrValue)) {
          attrValue = kabobCaseAttributes(attrValue);
        }
        const kabobKey = name === "className" ? "class" : si_funciona_1.default.kabobCase(name);
        attributes[kabobKey] = attrValue;
        return attributes;
      }, {});
      var attributeName = (attributes, kabobKey) => Object.keys(attributes).find((name) => (name === "className" ? "class" : si_funciona_1.default.kabobCase(name)) === kabobKey) ?? si_funciona_1.default.camelCase(kabobKey);
      var domItemChanges = (domItem) => {
        const changeList = (0, createChangeList_1.default)();
        if (!domItem.element) {
          changeList.added.nodeName = domItem.nodeName.toLowerCase();
        }
        if (domItem.element && domItem.element.nodeName.toLowerCase() !== domItem.nodeName.toLowerCase()) {
          changeList.removed.nodeName = domItem.element.nodeName.toLowerCase();
          changeList.added.nodeName = domItem.nodeName.toLowerCase();
        }
        if (domItem.nodeValue !== null) {
          if (!si_funciona_1.default.emptyObject(domItem.attributes)) {
            changeList.added = changeList.appendChanges("added", si_funciona_1.default.dotNotate(domItem.attributes));
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
            return changed;
          }
          if (!isArray && key === "class") {
            changed.added.className = domItem.attributes.className;
            return changed;
          }
          if (!isArray) {
            const name = attributeName(domItem.attributes, key);
            const element = domItem.element;
            changed.added[element && name in element && name !== "form" ? name : key] = domItem.attributes[name];
            return changed;
          }
          if (key !== "class" && key !== "style") {
            return changed;
          }
          if (key === "class") {
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
    }
  });

  // node_modules/json-dom/dist/render/updateChildNodes.js
  var require_updateChildNodes = __commonJS({
    "node_modules/json-dom/dist/render/updateChildNodes.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      require_esnext_iterator_for_each();
      require_esnext_iterator_map();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var updateElement_1 = __importDefault(require_updateElement());
      var updateChildNodes = (domItem) => {
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
          const existing = previousChildNodes.find((childNode2) => childNode2 === child.element);
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
    }
  });

  // node_modules/json-dom/dist/render/updateElement.js
  var require_updateElement = __commonJS({
    "node_modules/json-dom/dist/render/updateElement.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var bindListeners_1 = __importDefault(require_bindListeners());
      var deactivateListeners_1 = __importDefault(require_deactivateListeners());
      var domItemChanges_1 = __importDefault(require_domItemChanges());
      var si_funciona_1 = __importDefault(require_main());
      var generateElement_1 = __importDefault(require_generateElement());
      var updateChildNodes_1 = __importDefault(require_updateChildNodes());
      var updateElement = (domItem) => {
        if (!domItem.element) {
          return (0, updateChildNodes_1.default)((0, generateElement_1.default)((0, deactivateListeners_1.default)(domItem)));
        }
        const changes = (0, domItemChanges_1.default)(domItem);
        const element = domItem.element;
        const properties = element;
        if (changes.removed.nodeName || changes.added.nodeName) {
          element.remove();
          return (0, updateChildNodes_1.default)((0, generateElement_1.default)((0, deactivateListeners_1.default)(domItem)));
        }
        for (const dotKey in changes.removed) {
          const value = changes.removed[dotKey];
          if (!dotKey.includes(".")) {
            if (dotKey in element) {
              delete properties[dotKey];
              continue;
            }
            element.removeAttribute(dotKey);
            continue;
          }
          const baseKey = si_funciona_1.default.strBefore(dotKey, ".");
          if (baseKey !== "class" && baseKey !== "style") {
            throw new Error("Unhandled dotKey: " + dotKey);
          }
          if (baseKey === "class") {
            element.classList.remove(value);
            continue;
          }
          element.style.removeProperty(si_funciona_1.default.kabobCase(si_funciona_1.default.strAfter(dotKey, ".")));
        }
        for (const dotKey in changes.added) {
          const value = changes.added[dotKey];
          if (dotKey === "className") {
            element.className = value;
            continue;
          }
          if (dotKey === "style") {
            for (const style in value) {
              element.style.setProperty(si_funciona_1.default.kabobCase(style), value[style]);
            }
            continue;
          }
          if (!dotKey.includes(".")) {
            if (dotKey in element && dotKey !== "form") {
              properties[dotKey] = value;
              continue;
            }
            element.setAttribute(dotKey, value);
            continue;
          }
          const baseKey = si_funciona_1.default.strBefore(dotKey, ".");
          if (baseKey !== "class" && baseKey !== "style") {
            throw new Error("Unhandled dotKey: " + dotKey);
          }
          if (baseKey === "class" && (/\s/.test(value) || !value)) {
            continue;
          }
          if (baseKey === "class") {
            element.classList.add(value);
            continue;
          }
          element.style.setProperty(si_funciona_1.default.kabobCase(si_funciona_1.default.strAfter(dotKey, ".")), value);
        }
        return (0, bindListeners_1.default)(domItem);
      };
      exports.default = updateElement;
    }
  });

  // node_modules/json-dom/dist/render/generateElement.js
  var require_generateElement = __commonJS({
    "node_modules/json-dom/dist/render/generateElement.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var updateElement_1 = __importDefault(require_updateElement());
      var makeElementType = (nodeName, data = null, is) => {
        switch (nodeName) {
          case "#text":
            return document.createTextNode(data);
          case "#comment":
            return document.createComment(data);
          default:
            return is ? document.createElement(nodeName, {
              is
            }) : document.createElement(nodeName);
        }
      };
      var generateElement = (domItem) => {
        domItem.element = makeElementType(domItem.nodeName, domItem.nodeValue, typeof domItem.attributes.is === "string" ? domItem.attributes.is : void 0);
        return (0, updateElement_1.default)(domItem);
      };
      exports.default = generateElement;
    }
  });

  // node_modules/json-dom/dist/render/updateElements.js
  var require_updateElements = __commonJS({
    "node_modules/json-dom/dist/render/updateElements.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var updateChildNodes_1 = __importDefault(require_updateChildNodes());
      var updateElement_1 = __importDefault(require_updateElement());
      var updateElements = (config) => {
        if (config.nodeName === "#document") {
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
    }
  });

  // node_modules/json-dom/dist/render/renderHtml.js
  var require_renderHtml = __commonJS({
    "node_modules/json-dom/dist/render/renderHtml.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var documentItem_1 = __importDefault(require_documentItem());
      var insertChild_1 = __importDefault(require_insertChild());
      var itemIdIndex_1 = require_itemIdIndex();
      var setParentItemReferences_1 = __importDefault(require_setParentItemReferences());
      var updateChildNodes_1 = __importDefault(require_updateChildNodes());
      var updateElements_1 = __importDefault(require_updateElements());
      var renderHtml = (item = null, parent = documentItem_1.default.body, index = parent.children.length) => {
        const itemToRender = item === null ? documentItem_1.default : item;
        (0, setParentItemReferences_1.default)(itemToRender);
        if (itemToRender.parentItem === null) {
          (0, insertChild_1.default)(parent, item, index);
          (0, updateChildNodes_1.default)(parent);
        }
        (0, itemIdIndex_1.registerItemIds)(itemToRender);
        const updatedItem = (0, updateElements_1.default)(itemToRender);
        return item ?? updatedItem;
      };
      exports.default = renderHtml;
    }
  });

  // node_modules/json-dom/dist/render/index.js
  var require_render = __commonJS({
    "node_modules/json-dom/dist/render/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var generateElement_1 = __importDefault(require_generateElement());
      var renderHtml_1 = __importDefault(require_renderHtml());
      var updateChildNodes_1 = __importDefault(require_updateChildNodes());
      var updateElement_1 = __importDefault(require_updateElement());
      var updateElements_1 = __importDefault(require_updateElements());
      exports.default = {
        generateElement: generateElement_1.default,
        renderHtml: renderHtml_1.default,
        updateChildNodes: updateChildNodes_1.default,
        updateElement: updateElement_1.default,
        updateElements: updateElements_1.default
      };
    }
  });

  // node_modules/json-dom/dist/sync/index.js
  var require_sync = __commonJS({
    "node_modules/json-dom/dist/sync/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var updateChildren_1 = __importDefault(require_updateChildren());
      var updateDomItem_1 = __importDefault(require_updateDomItem());
      var updateDomItems_1 = __importDefault(require_updateDomItems());
      exports.default = {
        updateChildren: updateChildren_1.default,
        updateDomItem: updateDomItem_1.default,
        updateDomItems: updateDomItems_1.default
      };
    }
  });

  // node_modules/json-dom/dist/diff/index.js
  var require_diff = __commonJS({
    "node_modules/json-dom/dist/diff/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createChangeList_1 = __importDefault(require_createChangeList());
      var domItemChanges_1 = __importDefault(require_domItemChanges());
      var domItemHasAttribute_1 = __importDefault(require_domItemHasAttribute());
      var elementChanges_1 = __importDefault(require_elementChanges());
      var elementHasAttribute_1 = __importDefault(require_elementHasAttribute());
      var getAssignedStyles_1 = __importDefault(require_getAssignedStyles());
      exports.default = {
        createChangeList: createChangeList_1.default,
        domItemChanges: domItemChanges_1.default,
        domItemHasAttribute: domItemHasAttribute_1.default,
        elementChanges: elementChanges_1.default,
        elementHasAttribute: elementHasAttribute_1.default,
        getAssignedStyles: getAssignedStyles_1.default
      };
    }
  });

  // node_modules/json-dom/dist/main.js
  var require_main3 = __commonJS({
    "node_modules/json-dom/dist/main.js"(exports, module) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      var index_1 = __importDefault(require_events());
      var index_2 = __importDefault(require_domItem());
      var index_3 = __importDefault(require_inflate());
      var index_4 = __importDefault(require_deflate());
      var index_5 = __importDefault(require_render());
      var index_6 = __importDefault(require_sync());
      var index_7 = __importDefault(require_diff());
      var jsonDom = Object.assign({}, index_1.default, index_2.default, index_3.default, index_4.default, index_5.default, index_6.default, index_7.default);
      module.exports = jsonDom;
    }
  });

  // dist/components/node.js
  var require_node = __commonJS({
    "dist/components/node.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var json_dom_1 = __importDefault(require_main3());
      var node = (nodeName, nodeValue = null, children = [], attributes = {}) => json_dom_1.default.createDomItem({
        nodeName,
        nodeValue,
        attributes,
        children
      });
      exports.default = node;
    }
  });

  // dist/components/element.js
  var require_element = __commonJS({
    "dist/components/element.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var node_1 = __importDefault(require_node());
      var element = (nodeName, children = [], className, attributes = {}) => {
        if (className !== void 0) {
          attributes.className = className;
        }
        return (0, node_1.default)(nodeName, null, children, attributes);
      };
      exports.default = element;
    }
  });

  // dist/components/text.js
  var require_text = __commonJS({
    "dist/components/text.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var node_1 = __importDefault(require_node());
      var text = (nodeValue = "") => (0, node_1.default)("#text", nodeValue);
      exports.default = text;
    }
  });

  // dist/components/button.js
  var require_button = __commonJS({
    "dist/components/button.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var text_1 = __importDefault(require_text());
      var button = (label, className, attributes = {}) => (0, element_1.default)("button", [(0, text_1.default)(label)], className, Object.assign({
        type: "button"
      }, attributes));
      exports.default = button;
    }
  });

  // dist/components/div.js
  var require_div = __commonJS({
    "dist/components/div.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var div = (children = [], className, attributes = {}) => (0, element_1.default)("div", children, className, attributes);
      exports.default = div;
    }
  });

  // dist/components/input.js
  var require_input = __commonJS({
    "dist/components/input.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var input = (type = "text", name = "", value = null, children = [], className, attributes = {}) => {
        attributes.type = type;
        if (name) {
          attributes.name = name;
        }
        if (value !== null) {
          attributes.value = value;
        }
        return (0, element_1.default)("input", children, className, attributes);
      };
      exports.default = input;
    }
  });

  // dist/clearableInput/toggleClearButton.js
  var require_toggleClearButton = __commonJS({
    "dist/clearableInput/toggleClearButton.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeToggleClearButton = void 0;
      var toggleClearButton = (hasValue, clearButton) => {
        clearButton.attributes.hidden = !hasValue;
        if (clearButton.element) {
          clearButton.element.hidden = !hasValue;
        }
      };
      var makeToggleClearButton = (clearButton) => (event) => toggleClearButton(event.target.value.length > 0, clearButton);
      exports.makeToggleClearButton = makeToggleClearButton;
      exports.default = toggleClearButton;
    }
  });

  // dist/clearableInput/clearInput.js
  var require_clearInput = __commonJS({
    "dist/clearableInput/clearInput.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeClearInput = void 0;
      var toggleClearButton_1 = __importDefault(require_toggleClearButton());
      var clearInput = (inputItem, clearButton) => {
        inputItem.attributes.value = "";
        if (inputItem.element) {
          const element = inputItem.element;
          element.value = "";
          element.focus();
        }
        (0, toggleClearButton_1.default)(false, clearButton);
      };
      var makeClearInput = (inputItem, clearButton) => () => clearInput(inputItem, clearButton);
      exports.makeClearInput = makeClearInput;
      exports.default = clearInput;
    }
  });

  // dist/clearableInput/createClearableInput.js
  var require_createClearableInput = __commonJS({
    "dist/clearableInput/createClearableInput.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var button_1 = __importDefault(require_button());
      var div_1 = __importDefault(require_div());
      var input_1 = __importDefault(require_input());
      var clearInput_1 = require_clearInput();
      var toggleClearButton_1 = require_toggleClearButton();
      var createClearableInput = (config) => {
        const {
          name,
          value = "",
          placeholder = "",
          className,
          readonly = false
        } = config;
        const inputItem = (0, input_1.default)("text", name, value || null, [], "clearable-input-field", {
          placeholder,
          ...readonly ? {
            readonly: true
          } : {}
        });
        const clearButton = (0, button_1.default)("\xD7", "clearable-input-clear", {
          "aria-label": "Clear",
          hidden: value.length === 0,
          ...readonly ? {
            hidden: true,
            disabled: true
          } : {}
        });
        if (!readonly) {
          inputItem.eventListeners.input = [{
            listenerFunc: (0, toggleClearButton_1.makeToggleClearButton)(clearButton)
          }];
          clearButton.eventListeners.click = [{
            listenerFunc: (0, clearInput_1.makeClearInput)(inputItem, clearButton)
          }];
        }
        return (0, div_1.default)([inputItem, clearButton], className ?? "clearable-input");
      };
      exports.default = createClearableInput;
    }
  });

  // dist/clearableInput/index.js
  var require_clearableInput = __commonJS({
    "dist/clearableInput/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createClearableInput_1 = __importDefault(require_createClearableInput());
      exports.default = {
        createClearableInput: createClearableInput_1.default
      };
    }
  });

  // dist/components/anchor.js
  var require_anchor = __commonJS({
    "dist/components/anchor.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var anchor = (href = "#", children = [], className, attributes = {}) => (0, element_1.default)("a", children, className, Object.assign({
        href
      }, attributes));
      exports.default = anchor;
    }
  });

  // dist/components/legend.js
  var require_legend = __commonJS({
    "dist/components/legend.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var text_1 = __importDefault(require_text());
      var legend = (content = "", children = [], className, attributes = {}) => (0, element_1.default)("legend", content ? [(0, text_1.default)(content), ...children] : children, className, attributes);
      exports.default = legend;
    }
  });

  // dist/components/fieldset.js
  var require_fieldset = __commonJS({
    "dist/components/fieldset.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var legend_1 = __importDefault(require_legend());
      var fieldset = (content = "", children = [], className, attributes = {}) => (0, element_1.default)("fieldset", content ? [(0, legend_1.default)(content), ...children] : children, className, attributes);
      exports.default = fieldset;
    }
  });

  // dist/components/footer.js
  var require_footer = __commonJS({
    "dist/components/footer.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var footer = (children = [], className, attributes = {}) => (0, element_1.default)("footer", children, className, attributes);
      exports.default = footer;
    }
  });

  // dist/components/form.js
  var require_form = __commonJS({
    "dist/components/form.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var form = (action = "", method = "", children = [], className, attributes = {}) => {
        if (action) {
          attributes.action = action;
        }
        if (method) {
          attributes.method = method;
        }
        return (0, element_1.default)("form", children, className, attributes);
      };
      exports.default = form;
    }
  });

  // dist/components/header.js
  var require_header = __commonJS({
    "dist/components/header.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var header = (children = [], className, attributes = {}) => (0, element_1.default)("header", children, className, attributes);
      exports.default = header;
    }
  });

  // dist/components/heading.js
  var require_heading = __commonJS({
    "dist/components/heading.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var heading = (level = 1, children = [], className, attributes = {}) => (0, element_1.default)(`h${level}`, children, className, attributes);
      exports.default = heading;
    }
  });

  // dist/components/label.js
  var require_label = __commonJS({
    "dist/components/label.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var text_1 = __importDefault(require_text());
      var label = (content = "", labelFor = "", children = [], className, attributes = {}) => (0, element_1.default)("label", content ? [(0, text_1.default)(content), ...children] : children, className, Object.assign({
        for: labelFor
      }, attributes));
      exports.default = label;
    }
  });

  // dist/components/listItem.js
  var require_listItem = __commonJS({
    "dist/components/listItem.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var listItem = (children = [], className, attributes = {}) => (0, element_1.default)("li", children, className, attributes);
      exports.default = listItem;
    }
  });

  // dist/components/main.js
  var require_main4 = __commonJS({
    "dist/components/main.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var main = (children = [], className, attributes = {}) => (0, element_1.default)("main", children, className, attributes);
      exports.default = main;
    }
  });

  // dist/components/nav.js
  var require_nav = __commonJS({
    "dist/components/nav.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var nav = (children = [], className, attributes = {}) => (0, element_1.default)("nav", children, className, attributes);
      exports.default = nav;
    }
  });

  // dist/components/option.js
  var require_option = __commonJS({
    "dist/components/option.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var text_1 = __importDefault(require_text());
      var option = (value, label, className, attributes = {}) => (0, element_1.default)("option", [(0, text_1.default)(label)], className, Object.assign({
        value
      }, attributes));
      exports.default = option;
    }
  });

  // dist/components/paragraph.js
  var require_paragraph = __commonJS({
    "dist/components/paragraph.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var text_1 = __importDefault(require_text());
      var paragraph = (content = "", children = [], className, attributes = {}) => (0, element_1.default)("p", content ? [(0, text_1.default)(content), ...children] : children, className, attributes);
      exports.default = paragraph;
    }
  });

  // dist/components/radio.js
  var require_radio = __commonJS({
    "dist/components/radio.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var input_1 = __importDefault(require_input());
      var radio = (name = "", value = "", checked = false, children = [], className, attributes = {}) => {
        attributes.value = value;
        if (checked) {
          attributes.checked = true;
        }
        return (0, input_1.default)("radio", name, null, children, className, attributes);
      };
      exports.default = radio;
    }
  });

  // dist/components/select.js
  var require_select = __commonJS({
    "dist/components/select.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var select = (children = [], className, attributes = {}) => (0, element_1.default)("select", children, className, attributes);
      exports.default = select;
    }
  });

  // dist/components/span.js
  var require_span = __commonJS({
    "dist/components/span.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var span = (children = [], className, attributes = {}) => (0, element_1.default)("span", children, className, attributes);
      exports.default = span;
    }
  });

  // dist/components/style.js
  var require_style = __commonJS({
    "dist/components/style.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var node_1 = __importDefault(require_node());
      var text_1 = __importDefault(require_text());
      var style = (styleContent = "") => (0, node_1.default)("style", null, [(0, text_1.default)(styleContent)]);
      exports.default = style;
    }
  });

  // dist/components/submit.js
  var require_submit = __commonJS({
    "dist/components/submit.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var input_1 = __importDefault(require_input());
      var submit = (name = "", label = "Submit", className, attributes = {}) => {
        attributes.value = label;
        return (0, input_1.default)("submit", name, null, [], className, attributes);
      };
      exports.default = submit;
    }
  });

  // dist/components/table.js
  var require_table = __commonJS({
    "dist/components/table.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var table = (children = [], className, attributes = {}) => (0, element_1.default)("table", children, className, attributes);
      exports.default = table;
    }
  });

  // dist/components/tableBody.js
  var require_tableBody = __commonJS({
    "dist/components/tableBody.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var tableBody = (children = [], className, attributes = {}) => (0, element_1.default)("tbody", children, className, attributes);
      exports.default = tableBody;
    }
  });

  // dist/components/tableData.js
  var require_tableData = __commonJS({
    "dist/components/tableData.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var tableData = (children = [], className, attributes = {}) => (0, element_1.default)("td", children, className, attributes);
      exports.default = tableData;
    }
  });

  // dist/components/tableHead.js
  var require_tableHead = __commonJS({
    "dist/components/tableHead.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var tableHead = (children = [], className, attributes = {}) => (0, element_1.default)("thead", children, className, attributes);
      exports.default = tableHead;
    }
  });

  // dist/components/tableHeading.js
  var require_tableHeading = __commonJS({
    "dist/components/tableHeading.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var tableHeading = (children = [], className, attributes = {}) => (0, element_1.default)("th", children, className, attributes);
      exports.default = tableHeading;
    }
  });

  // dist/components/tableRow.js
  var require_tableRow = __commonJS({
    "dist/components/tableRow.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var tableRow = (children = [], className, attributes = {}) => (0, element_1.default)("tr", children, className, attributes);
      exports.default = tableRow;
    }
  });

  // dist/components/textArea.js
  var require_textArea = __commonJS({
    "dist/components/textArea.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var textArea = (name = "", children = [], className, attributes = {}) => {
        if (name) {
          attributes.name = name;
        }
        return (0, element_1.default)("textarea", children, className, attributes);
      };
      exports.default = textArea;
    }
  });

  // dist/components/unorderedList.js
  var require_unorderedList = __commonJS({
    "dist/components/unorderedList.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var element_1 = __importDefault(require_element());
      var unorderedList = (children = [], className, attributes = {}) => (0, element_1.default)("ul", children, className, attributes);
      exports.default = unorderedList;
    }
  });

  // dist/components/index.js
  var require_components = __commonJS({
    "dist/components/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var anchor_1 = __importDefault(require_anchor());
      var button_1 = __importDefault(require_button());
      var div_1 = __importDefault(require_div());
      var element_1 = __importDefault(require_element());
      var fieldset_1 = __importDefault(require_fieldset());
      var footer_1 = __importDefault(require_footer());
      var form_1 = __importDefault(require_form());
      var header_1 = __importDefault(require_header());
      var heading_1 = __importDefault(require_heading());
      var input_1 = __importDefault(require_input());
      var label_1 = __importDefault(require_label());
      var legend_1 = __importDefault(require_legend());
      var listItem_1 = __importDefault(require_listItem());
      var main_1 = __importDefault(require_main4());
      var nav_1 = __importDefault(require_nav());
      var node_1 = __importDefault(require_node());
      var option_1 = __importDefault(require_option());
      var paragraph_1 = __importDefault(require_paragraph());
      var radio_1 = __importDefault(require_radio());
      var select_1 = __importDefault(require_select());
      var span_1 = __importDefault(require_span());
      var style_1 = __importDefault(require_style());
      var submit_1 = __importDefault(require_submit());
      var table_1 = __importDefault(require_table());
      var tableBody_1 = __importDefault(require_tableBody());
      var tableData_1 = __importDefault(require_tableData());
      var tableHead_1 = __importDefault(require_tableHead());
      var tableHeading_1 = __importDefault(require_tableHeading());
      var tableRow_1 = __importDefault(require_tableRow());
      var text_1 = __importDefault(require_text());
      var textArea_1 = __importDefault(require_textArea());
      var unorderedList_1 = __importDefault(require_unorderedList());
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
    }
  });

  // dist/typeahead/filterOptions.js
  var require_filterOptions = __commonJS({
    "dist/typeahead/filterOptions.js"(exports) {
      "use strict";
      init_process();
      require_es_array_includes();
      require_esnext_iterator_constructor();
      require_esnext_iterator_for_each();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeFilterOptions = void 0;
      var filterOptions = (searchTerm, optionItems, selectItem) => {
        const term = searchTerm.trim().toLowerCase();
        let visibleCount = 0;
        optionItems.forEach((optionItem) => {
          const label = (optionItem.children[0]?.nodeValue ?? "").toLowerCase();
          const value = String(optionItem.attributes.value ?? "").toLowerCase();
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
      var makeFilterOptions = (optionItems, selectItem) => (event) => filterOptions(event.target.value, optionItems, selectItem);
      exports.makeFilterOptions = makeFilterOptions;
      exports.default = filterOptions;
    }
  });

  // dist/typeahead/hideList.js
  var require_hideList = __commonJS({
    "dist/typeahead/hideList.js"(exports) {
      "use strict";
      init_process();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeHideList = void 0;
      var hideList = (selectItem) => {
        selectItem.attributes.hidden = true;
        selectItem.attributes.size = 1;
        if (selectItem.element) {
          const element = selectItem.element;
          element.hidden = true;
          element.size = 1;
        }
      };
      var makeHideList = (selectItem) => () => hideList(selectItem);
      exports.makeHideList = makeHideList;
      exports.default = hideList;
    }
  });

  // dist/typeahead/selectOption.js
  var require_selectOption = __commonJS({
    "dist/typeahead/selectOption.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeSelectOption = void 0;
      var hideList_1 = __importDefault(require_hideList());
      var selectOption = (selectedValue, options, freeTypeInput, selectItem) => {
        const matched = options.find((candidate) => candidate.value === selectedValue);
        const displayValue = matched ? matched.label : "";
        freeTypeInput.attributes.value = displayValue;
        if (freeTypeInput.element) {
          freeTypeInput.element.value = displayValue;
        }
        (0, hideList_1.default)(selectItem);
      };
      var makeSelectOption = (options, freeTypeInput, selectItem) => (event) => selectOption(event.target.value, options, freeTypeInput, selectItem);
      exports.makeSelectOption = makeSelectOption;
      exports.default = selectOption;
    }
  });

  // dist/typeahead/createTypeahead.js
  var require_createTypeahead = __commonJS({
    "dist/typeahead/createTypeahead.js"(exports) {
      "use strict";
      init_process();
      require_esnext_iterator_constructor();
      require_esnext_iterator_find();
      require_esnext_iterator_map();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var div_1 = __importDefault(require_div());
      var input_1 = __importDefault(require_input());
      var option_1 = __importDefault(require_option());
      var select_1 = __importDefault(require_select());
      var filterOptions_1 = require_filterOptions();
      var hideList_1 = require_hideList();
      var selectOption_1 = require_selectOption();
      var createTypeahead = (config) => {
        const {
          name,
          options,
          value = "",
          placeholder = "",
          className,
          readonly = false
        } = config;
        const selected = options.find((candidate) => candidate.value === value);
        const optionItems = options.map((choice) => (0, option_1.default)(choice.value, choice.label, void 0, choice.value === value ? {
          selected: true
        } : {}));
        const freeTypeInput = (0, input_1.default)("text", `${name}-search`, selected ? selected.label : "", [], "typeahead-search", {
          placeholder,
          ...readonly ? {
            readonly: true
          } : {}
        });
        const selectItem = (0, select_1.default)(optionItems, "typeahead-options", {
          name,
          hidden: true,
          size: 1,
          ...value ? {
            value
          } : {},
          ...readonly ? {
            disabled: true
          } : {}
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
        return (0, div_1.default)([freeTypeInput, selectItem], className ?? "typeahead");
      };
      exports.default = createTypeahead;
    }
  });

  // dist/typeahead/index.js
  var require_typeahead = __commonJS({
    "dist/typeahead/index.js"(exports) {
      "use strict";
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var createTypeahead_1 = __importDefault(require_createTypeahead());
      exports.default = {
        createTypeahead: createTypeahead_1.default
      };
    }
  });

  // dist/main.js
  var require_main5 = __commonJS({
    "dist/main.js"(exports, module) {
      init_process();
      var __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      var index_1 = __importDefault(require_clearableInput());
      var index_2 = __importDefault(require_components());
      var index_3 = __importDefault(require_typeahead());
      var root = typeof window !== "undefined" ? window : {};
      var jsonDomComponents = {
        ...index_2.default,
        ...index_3.default,
        ...index_1.default
      };
      root.jsonDomComponents = jsonDomComponents;
      module.exports = jsonDomComponents;
    }
  });
  return require_main5();
})();
if (typeof module === 'object' && module && module.exports) { module.exports = jsonDomComponents }
