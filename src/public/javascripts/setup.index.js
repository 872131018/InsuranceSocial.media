/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 396);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5);
var isBuffer = __webpack_require__(19);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(22);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(6);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(6);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(25);
var parseHeaders = __webpack_require__(26);
var isURLSameOrigin = __webpack_require__(27);
var createError = __webpack_require__(7);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(28);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(29);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(24);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.4.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (true) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (true) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "development" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (true) {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "development" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (true) {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  "development" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if ("development" !== 'production' && !hasOwn(result, key)) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (true) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (true) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (true) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  var isComponentRoot = isDef(vnode.componentOptions);
  var oldOn = isComponentRoot ? oldVnode.data.nativeOn : oldVnode.data.on;
  var on = isComponentRoot ? vnode.data.nativeOn : vnode.data.on;
  if (isUndef(oldOn) && isUndef(on)) {
    return
  }
  on = on || {};
  oldOn = oldOn || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1 && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1 && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\"/>";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      if (shouldIgnoreFirstNewline(lastTag, html)) {
        advance(1);
      }
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (!el.component && (
          isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el, state) || 'void 0'
      : genElement(el, state)) + "}}"
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e('" + (comment.text) + "')")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v2.7.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (true) {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef.default) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(47);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(41);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(5);
var Axios = __webpack_require__(20);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(9);
axios.CancelToken = __webpack_require__(35);
axios.isCancel = __webpack_require__(8);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(36);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(30);
var dispatchRequest = __webpack_require__(31);
var isAbsoluteURL = __webpack_require__(33);
var combineURLs = __webpack_require__(34);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(7);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(32);
var isCancel = __webpack_require__(8);
var defaults = __webpack_require__(4);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(9);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(44);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(42);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(14);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(46);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(50);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(37)(module)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(15);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(16);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(410),
  /* template */
  __webpack_require__(411),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/Progress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Progress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fcf0226e", Component.options)
  } else {
    hotAPI.reload("data-v-fcf0226e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(412),
  /* template */
  __webpack_require__(413),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/QuickNavigation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] QuickNavigation.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a68ecf5", Component.options)
  } else {
    hotAPI.reload("data-v-2a68ecf5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(458),
  /* template */
  __webpack_require__(459),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/inputs/Check.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Check.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-99543b86", Component.options)
  } else {
    hotAPI.reload("data-v-99543b86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(460),
  /* template */
  __webpack_require__(461),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/inputs/Cross.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cross.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22438d16", Component.options)
  } else {
    hotAPI.reload("data-v-22438d16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(397);


/***/ }),
/* 397 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_redux__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_App__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__vue_App__);
window.axios = __webpack_require__(17);
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + document.querySelector('meta[name="api-token"]').content;


window.store = __WEBPACK_IMPORTED_MODULE_0__root_redux__["a" /* default */];






__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]);

var router = new __WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]({
    mode: 'history',
    routes: __WEBPACK_IMPORTED_MODULE_3__routes__["a" /* default */]
});

var Site = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
    el: '#app',
    components: {
        App: __WEBPACK_IMPORTED_MODULE_4__vue_App___default.a
    },
    router: router
}).$mount('#app');

/***/ }),
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_user_reducer__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_user_reducer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__redux_user_reducer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__redux_option_reducer__ = __webpack_require__(400);




var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* combineReducers */])({
    UserStore: __WEBPACK_IMPORTED_MODULE_1__redux_user_reducer___default.a,
    OptionStore: __WEBPACK_IMPORTED_MODULE_2__redux_option_reducer__["a" /* default */]
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_redux__["b" /* createStore */])(reducers));

/***/ }),
/* 399 */
/***/ (function(module, exports) {

var initialState = {
    id: '',
    name: '',
    email: '',
    api_token: '',
    discount: '',
    plan: {},
    facebook: false,
    twitter: false,
    phone: '',
    title: '',
    principal_name: '',
    principal_email: '',
    organization_name: '',
    website: '',
    staff_size: '',
    year_founded: '',
    multi_generation: '',
    notification_frequency: '',
    notify_email: false,
    notify_text: false,
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    marketing_regions: [],
    marketing_states: [],
    marketing_counties: [],
    carriers: [],
    coverage_lines: [],
    coverage_targets: [],
    industry_currents: [],
    industry_targets: [],
    commercial_mix: '',
    personal_mix: '',
    engagement_mix: '',
    engagement_tone: '',
    special_topics: [],
    causes: [],
    posting_days: [],
    posting_time: ''
};

module.exports = function () {
    var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'SET_USER':
            user.id = action.data.id;
            user.name = action.data.name;
            user.email = action.data.email;
            user.api_token = action.data.api_token;
            user.discount = action.data.discount;
            break;
        case 'SET_PLAN':
            user.plan = action.data;
            break;
        case 'SET_SOCIAL_MEDIA':
            user.facebook = action.data.facebook;
            user.twitter = action.data.twitter;
            break;
        case 'SET_PROPERTIES':
            user.phone = action.data.phone;
            user.title = action.data.title;
            user.principal_name = action.data.principal_name;
            user.principal_email = action.data.principal_email;
            user.organization_name = action.data.organization_name;
            user.website = action.data.website;
            user.staff_size = action.data.staff_size;
            user.year_founded = action.data.year_founded;
            user.multi_generation = action.data.multi_generation;
            user.notification_frequency = action.data.notification_frequency;
            user.notify_email = action.data.notify_email;
            user.notify_text = action.data.notify_text;
            break;
        case 'SET_LOCATION':
            user.address_1 = action.data.address_1;
            user.address_2 = action.data.address_2;
            user.city = action.data.city;
            user.state = action.data.state;
            user.zip = action.data.zip;
            user.marketing_regions = action.data.marketing_regions;
            user.marketing_states = action.data.marketing_states;
            user.marketing_counties = action.data.marketing_counties;
            break;
        case 'SET_COVERAGE':
            user.carriers = action.data.carriers;
            user.coverage_lines = action.data.coverage_lines;
            user.coverage_targets = action.data.coverage_targets;
            user.industry_currents = action.data.industry_currents;
            user.industry_targets = action.data.industry_targets;
            user.commercial_mix = action.data.commercial_mix;
            user.personal_mix = action.data.personal_mix;
            break;
        case 'SET_OUTREACH':
            user.engagement_mix = action.data.engagement_mix;
            user.engagement_tone = action.data.engagement_tone;
            user.special_topics = action.data.special_topics;
            user.causes = action.data.causes;
            user.posting_days = action.data.posting_days;
            user.posting_time = action.data.posting_time;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(user));
};

/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__states_json__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__states_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__states_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__counties_json__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__counties_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__counties_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__regions_json__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__regions_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__regions_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coverages_json__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coverages_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__coverages_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__industries_json__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__industries_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__industries_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__causes_json__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__causes_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__causes_json__);







var initialState = {
    titles: [{ "code": "OW", "desc": "Owner" }, { "code": "OM", "desc": "Operations Manager" }, { "code": "MM", "desc": "Marketing Manager" }, { "code": "PR", "desc": "Principle" }, { "code": "SM", "desc": "Sales Manager" }, { "code": "OT", "desc": "Other" }],
    sizes: [{ "code": "SP", "desc": "Sole Proprietor" }, { "code": "2-5", "desc": "2-5 Employees" }, { "code": "6-10", "desc": "6-10 Employees" }, { "code": "11-15", "desc": "11-15 Employees" }, { "code": "16+", "desc": "16+ Employees" }],
    generations: [{ "code": "N", "desc": "No" }, { "code": "2", "desc": "2nd" }, { "code": "3", "desc": "3rd" }, { "code": "4", "desc": "5th" }, { "code": "5", "desc": "5th" }],
    frequencies: [{ "code": "D", "desc": "Daily" }, { "code": "W", "desc": "Weekly" }, { "code": "M", "desc": "Monthly" }, { "code": "Q", "desc": "Quarterly" }, { "code": "N", "desc": "Never" }],
    regions: __WEBPACK_IMPORTED_MODULE_2__regions_json___default.a.regions,
    states: __WEBPACK_IMPORTED_MODULE_0__states_json___default.a.states,
    counties: __WEBPACK_IMPORTED_MODULE_1__counties_json___default.a.counties,
    targets: [{
        "stateCd": "",
        "code": "R",
        "desc": "Region"
    }, {
        "stateCd": "",
        "code": "S",
        "desc": "State and Counties"
    }],
    carriers: [{ "code": "C", "desc": "Carrier" }, { "code": "F", "desc": "Farmer\'s Mutual Hail" }, { "code": "G", "desc": "Grinnell Mutual" }, { "code": "I", "desc": "IMT Group" }, { "code": "P", "desc": "Plymouth Rock Assurance" }],
    coverage_targets: __WEBPACK_IMPORTED_MODULE_3__coverages_json___default.a.coverages,
    industry_currents: __WEBPACK_IMPORTED_MODULE_4__industries_json___default.a.industries,
    industry_targets: __WEBPACK_IMPORTED_MODULE_4__industries_json___default.a.industries,
    engagement_mix: [{ "code": "EO", "desc": "Existing Clients Only" }, { "code": "ME", "desc": "Mostly Existinig Clients" }, { "code": "EN", "desc": "Existing and New Clients Equally" }, { "code": "MN", "desc": "Mostly New Clients" }, { "code": "NO", "desc": "New Clients Only" }],
    engagement_tone: [{ "code": "I", "desc": "Simply Informative" }, { "code": "C", "desc": "Conversational" }, { "code": "E", "desc": "Entertainingly Informative" }],
    special_topics: [{ "code": "NH", "desc": "Recognition of National Holidays" }, { "code": "IH", "desc": "Insurance Humor" }, { "code": "CN", "desc": "Current News" }],
    causes: __WEBPACK_IMPORTED_MODULE_5__causes_json___default.a.causes,
    days: [{ "code": "sunday", "desc": "Sunday" }, { "code": "monday", "desc": "Monday" }, { "code": "tuesday", "desc": "Tuesday" }, { "code": "wednesday", "desc": "Wednesday" }, { "code": "thursday", "desc": "Thursday" }, { "code": "friday", "desc": "Friday" }, { "code": "saturday", "desc": "Saturday" }],
    times: [{ "code": "system_chosen", "desc": "System Chosen" }, { "code": "2-5am", "desc": "2-5am" }, { "code": "5-8am", "desc": "5-8am" }, { "code": "8-11am", "desc": "8-11am" }, { "code": "11am-2pm", "desc": "11am-2pm" }, { "code": "2-5pm", "desc": "2-5pm" }, { "code": "8-11pm", "desc": "8-11pm" }, { "code": "11pm-2am", "desc": "11pm-2am" }]
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
});

/***/ }),
/* 401 */
/***/ (function(module, exports) {

module.exports = {
	"states": [
		{
			"stateCd": "AL",
			"desc": "Alabama",
			"code": 11168
		},
		{
			"stateCd": "AK",
			"desc": "Alaska",
			"code": 11169
		},
		{
			"stateCd": "AZ",
			"desc": "Arizona",
			"code": 11170
		},
		{
			"stateCd": "AR",
			"desc": "Arkansas",
			"code": 11171
		},
		{
			"stateCd": "CA",
			"desc": "California",
			"code": 11172
		},
		{
			"stateCd": "CO",
			"desc": "Colorado",
			"code": 11173
		},
		{
			"stateCd": "CT",
			"desc": "Connecticut",
			"code": 11174
		},
		{
			"stateCd": "DE",
			"desc": "Delaware",
			"code": 11175
		},
		{
			"stateCd": "DC",
			"desc": "District of Columbia",
			"code": 11176
		},
		{
			"stateCd": "FL",
			"desc": "Florida",
			"code": 11177
		},
		{
			"stateCd": "GA",
			"desc": "Georgia",
			"code": 11178
		},
		{
			"stateCd": "HI",
			"desc": "Hawaii",
			"code": 11179
		},
		{
			"stateCd": "ID",
			"desc": "Idaho",
			"code": 11180
		},
		{
			"stateCd": "IL",
			"desc": "Illinois",
			"code": 11181
		},
		{
			"stateCd": "IN",
			"desc": "Indiana",
			"code": 11182
		},
		{
			"stateCd": "IA",
			"desc": "Iowa",
			"code": 11183
		},
		{
			"stateCd": "KS",
			"desc": "Kansas",
			"code": 11184
		},
		{
			"stateCd": "KY",
			"desc": "Kentucky",
			"code": 11185
		},
		{
			"stateCd": "LA",
			"desc": "Louisiana",
			"code": 11186
		},
		{
			"stateCd": "ME",
			"desc": "Maine",
			"code": 11187
		},
		{
			"stateCd": "MD",
			"desc": "Maryland",
			"code": 11188
		},
		{
			"stateCd": "MA",
			"desc": "Massachusetts",
			"code": 11189
		},
		{
			"stateCd": "MI",
			"desc": "Michigan",
			"code": 11190
		},
		{
			"stateCd": "MN",
			"desc": "Minnesota",
			"code": 11191
		},
		{
			"stateCd": "MS",
			"desc": "Mississippi",
			"code": 11192
		},
		{
			"stateCd": "MO",
			"desc": "Missouri",
			"code": 11193
		},
		{
			"stateCd": "MT",
			"desc": "Montana",
			"code": 11194
		},
		{
			"stateCd": "NE",
			"desc": "Nebraska",
			"code": 11195
		},
		{
			"stateCd": "NV",
			"desc": "Nevada",
			"code": 11196
		},
		{
			"stateCd": "NH",
			"desc": "New Hampshire",
			"code": 11197
		},
		{
			"stateCd": "NJ",
			"desc": "New Jersey",
			"code": 11198
		},
		{
			"stateCd": "NM",
			"desc": "New Mexico",
			"code": 11199
		},
		{
			"stateCd": "NY",
			"desc": "New York",
			"code": 11200
		},
		{
			"stateCd": "NC",
			"desc": "North Carolina",
			"code": 11201
		},
		{
			"stateCd": "ND",
			"desc": "North Dakota",
			"code": 11202
		},
		{
			"stateCd": "OH",
			"desc": "Ohio",
			"code": 11203
		},
		{
			"stateCd": "OK",
			"desc": "Oklahoma",
			"code": 11204
		},
		{
			"stateCd": "OR",
			"desc": "Oregon",
			"code": 11205
		},
		{
			"stateCd": "PA",
			"desc": "Pennsylvania",
			"code": 11206
		},
		{
			"stateCd": "RH",
			"desc": "Rhode Island",
			"code": 11207
		},
		{
			"stateCd": "SC",
			"desc": "South Carolina",
			"code": 11208
		},
		{
			"stateCd": "SD",
			"desc": "South Dakota",
			"code": 11209
		},
		{
			"stateCd": "TN",
			"desc": "Tennessee",
			"code": 11210
		},
		{
			"stateCd": "TX",
			"desc": "Texas",
			"code": 11211
		},
		{
			"stateCd": "UT",
			"desc": "Utah",
			"code": 11212
		},
		{
			"stateCd": "VT",
			"desc": "Vermont",
			"code": 11213
		},
		{
			"stateCd": "VA",
			"desc": "Virginia",
			"code": 11214
		},
		{
			"stateCd": "WA",
			"desc": "Washington",
			"code": 11215
		},
		{
			"stateCd": "WV",
			"desc": "West Virginia",
			"code": 11216
		},
		{
			"stateCd": "WI",
			"desc": "Wisconsin",
			"code": 11217
		},
		{
			"stateCd": "WY",
			"desc": "Wyoming",
			"code": 11218
		}
	]
};

/***/ }),
/* 402 */
/***/ (function(module, exports) {

module.exports = {
	"counties": [
		{
			"stateCd": "AK",
			"desc": "Aleutians East Borough",
			"code": 1917
		},
		{
			"stateCd": "AK",
			"desc": "Aleutians West Census Area",
			"code": 1918
		},
		{
			"stateCd": "AK",
			"desc": "Anchorage Municipality",
			"code": 1919
		},
		{
			"stateCd": "AK",
			"desc": "Bethel Census Area",
			"code": 1920
		},
		{
			"stateCd": "AK",
			"desc": "Bristol Bay Borough",
			"code": 1921
		},
		{
			"stateCd": "AK",
			"desc": "Denali Borough",
			"code": 1922
		},
		{
			"stateCd": "AK",
			"desc": "Dillingham Census Area",
			"code": 1923
		},
		{
			"stateCd": "AK",
			"desc": "Fairbanks North Star Borough",
			"code": 1924
		},
		{
			"stateCd": "AK",
			"desc": "Haines Borough",
			"code": 1925
		},
		{
			"stateCd": "AK",
			"desc": "Hoonah-Angoon Census Area",
			"code": 1926
		},
		{
			"stateCd": "AK",
			"desc": "Juneau City and Borough",
			"code": 1927
		},
		{
			"stateCd": "AK",
			"desc": "Kenai Peninsula Borough",
			"code": 1928
		},
		{
			"stateCd": "AK",
			"desc": "Ketchikan Gateway Borough",
			"code": 1929
		},
		{
			"stateCd": "AK",
			"desc": "Kodiak Island Borough",
			"code": 1930
		},
		{
			"stateCd": "AK",
			"desc": "Lake and Peninsula Borough",
			"code": 1931
		},
		{
			"stateCd": "AK",
			"desc": "Matanuska-Susitna Borough",
			"code": 1932
		},
		{
			"stateCd": "AK",
			"desc": "Nome Census Area",
			"code": 1933
		},
		{
			"stateCd": "AK",
			"desc": "North Slope Borough",
			"code": 1934
		},
		{
			"stateCd": "AK",
			"desc": "Northwest Arctic Borough",
			"code": 1935
		},
		{
			"stateCd": "AK",
			"desc": "Petersburg Census Area",
			"code": 1936
		},
		{
			"stateCd": "AK",
			"desc": "Prince of Wales-Hyder Census Area",
			"code": 1937
		},
		{
			"stateCd": "AK",
			"desc": "Sitka City and Borough",
			"code": 1938
		},
		{
			"stateCd": "AK",
			"desc": "Skagway Municipality",
			"code": 1939
		},
		{
			"stateCd": "AK",
			"desc": "Southeast Fairbanks Census Area",
			"code": 1940
		},
		{
			"stateCd": "AK",
			"desc": "Valdez-Cordova Census Area",
			"code": 1941
		},
		{
			"stateCd": "AK",
			"desc": "Wade Hampton Census Area",
			"code": 1942
		},
		{
			"stateCd": "AK",
			"desc": "Wrangell City and Borough",
			"code": 1943
		},
		{
			"stateCd": "AK",
			"desc": "Yakutat City and Borough",
			"code": 1944
		},
		{
			"stateCd": "AK",
			"desc": "Yukon-Koyukuk Census Area",
			"code": 1945
		},
		{
			"stateCd": "AL",
			"desc": "Autauga County",
			"code": 1850
		},
		{
			"stateCd": "AL",
			"desc": "Baldwin County",
			"code": 1851
		},
		{
			"stateCd": "AL",
			"desc": "Barbour County",
			"code": 1852
		},
		{
			"stateCd": "AL",
			"desc": "Bibb County",
			"code": 1853
		},
		{
			"stateCd": "AL",
			"desc": "Blount County",
			"code": 1854
		},
		{
			"stateCd": "AL",
			"desc": "Bullock County",
			"code": 1855
		},
		{
			"stateCd": "AL",
			"desc": "Butler County",
			"code": 1856
		},
		{
			"stateCd": "AL",
			"desc": "Calhoun County",
			"code": 1857
		},
		{
			"stateCd": "AL",
			"desc": "Chambers County",
			"code": 1858
		},
		{
			"stateCd": "AL",
			"desc": "Cherokee County",
			"code": 1859
		},
		{
			"stateCd": "AL",
			"desc": "Chilton County",
			"code": 1860
		},
		{
			"stateCd": "AL",
			"desc": "Choctaw County",
			"code": 1861
		},
		{
			"stateCd": "AL",
			"desc": "Clarke County",
			"code": 1862
		},
		{
			"stateCd": "AL",
			"desc": "Clay County",
			"code": 1863
		},
		{
			"stateCd": "AL",
			"desc": "Cleburne County",
			"code": 1864
		},
		{
			"stateCd": "AL",
			"desc": "Coffee County",
			"code": 1865
		},
		{
			"stateCd": "AL",
			"desc": "Colbert County",
			"code": 1866
		},
		{
			"stateCd": "AL",
			"desc": "Conecuh County",
			"code": 1867
		},
		{
			"stateCd": "AL",
			"desc": "Coosa County",
			"code": 1868
		},
		{
			"stateCd": "AL",
			"desc": "Covington County",
			"code": 1869
		},
		{
			"stateCd": "AL",
			"desc": "Crenshaw County",
			"code": 1870
		},
		{
			"stateCd": "AL",
			"desc": "Cullman County",
			"code": 1871
		},
		{
			"stateCd": "AL",
			"desc": "Dale County",
			"code": 1872
		},
		{
			"stateCd": "AL",
			"desc": "Dallas County",
			"code": 1873
		},
		{
			"stateCd": "AL",
			"desc": "DeKalb County",
			"code": 1874
		},
		{
			"stateCd": "AL",
			"desc": "Elmore County",
			"code": 1875
		},
		{
			"stateCd": "AL",
			"desc": "Escambia County",
			"code": 1876
		},
		{
			"stateCd": "AL",
			"desc": "Etowah County",
			"code": 1877
		},
		{
			"stateCd": "AL",
			"desc": "Fayette County",
			"code": 1878
		},
		{
			"stateCd": "AL",
			"desc": "Franklin County",
			"code": 1879
		},
		{
			"stateCd": "AL",
			"desc": "Geneva County",
			"code": 1880
		},
		{
			"stateCd": "AL",
			"desc": "Greene County",
			"code": 1881
		},
		{
			"stateCd": "AL",
			"desc": "Hale County",
			"code": 1882
		},
		{
			"stateCd": "AL",
			"desc": "Henry County",
			"code": 1883
		},
		{
			"stateCd": "AL",
			"desc": "Houston County",
			"code": 1884
		},
		{
			"stateCd": "AL",
			"desc": "Jackson County",
			"code": 1885
		},
		{
			"stateCd": "AL",
			"desc": "Jefferson County",
			"code": 1886
		},
		{
			"stateCd": "AL",
			"desc": "Lamar County",
			"code": 1887
		},
		{
			"stateCd": "AL",
			"desc": "Lauderdale County",
			"code": 1888
		},
		{
			"stateCd": "AL",
			"desc": "Lawrence County",
			"code": 1889
		},
		{
			"stateCd": "AL",
			"desc": "Lee County",
			"code": 1890
		},
		{
			"stateCd": "AL",
			"desc": "Limestone County",
			"code": 1891
		},
		{
			"stateCd": "AL",
			"desc": "Lowndes County",
			"code": 1892
		},
		{
			"stateCd": "AL",
			"desc": "Macon County",
			"code": 1893
		},
		{
			"stateCd": "AL",
			"desc": "Madison County",
			"code": 1894
		},
		{
			"stateCd": "AL",
			"desc": "Marengo County",
			"code": 1895
		},
		{
			"stateCd": "AL",
			"desc": "Marion County",
			"code": 1896
		},
		{
			"stateCd": "AL",
			"desc": "Marshall County",
			"code": 1897
		},
		{
			"stateCd": "AL",
			"desc": "Mobile County",
			"code": 1898
		},
		{
			"stateCd": "AL",
			"desc": "Monroe County",
			"code": 1899
		},
		{
			"stateCd": "AL",
			"desc": "Montgomery County",
			"code": 1900
		},
		{
			"stateCd": "AL",
			"desc": "Morgan County",
			"code": 1901
		},
		{
			"stateCd": "AL",
			"desc": "Perry County",
			"code": 1902
		},
		{
			"stateCd": "AL",
			"desc": "Pickens County",
			"code": 1903
		},
		{
			"stateCd": "AL",
			"desc": "Pike County",
			"code": 1904
		},
		{
			"stateCd": "AL",
			"desc": "Randolph County",
			"code": 1905
		},
		{
			"stateCd": "AL",
			"desc": "Russell County",
			"code": 1906
		},
		{
			"stateCd": "AL",
			"desc": "Shelby County",
			"code": 1908
		},
		{
			"stateCd": "AL",
			"desc": "St. Clair County",
			"code": 1907
		},
		{
			"stateCd": "AL",
			"desc": "Sumter County",
			"code": 1909
		},
		{
			"stateCd": "AL",
			"desc": "Talladega County",
			"code": 1910
		},
		{
			"stateCd": "AL",
			"desc": "Tallapoosa County",
			"code": 1911
		},
		{
			"stateCd": "AL",
			"desc": "Tuscaloosa County",
			"code": 1912
		},
		{
			"stateCd": "AL",
			"desc": "Walker County",
			"code": 1913
		},
		{
			"stateCd": "AL",
			"desc": "Washington County",
			"code": 1914
		},
		{
			"stateCd": "AL",
			"desc": "Wilcox County",
			"code": 1915
		},
		{
			"stateCd": "AL",
			"desc": "Winston County",
			"code": 1916
		},
		{
			"stateCd": "AR",
			"desc": "Arkansas County",
			"code": 1961
		},
		{
			"stateCd": "AR",
			"desc": "Ashley County",
			"code": 1962
		},
		{
			"stateCd": "AR",
			"desc": "Baxter County",
			"code": 1963
		},
		{
			"stateCd": "AR",
			"desc": "Benton County",
			"code": 1964
		},
		{
			"stateCd": "AR",
			"desc": "Boone County",
			"code": 1965
		},
		{
			"stateCd": "AR",
			"desc": "Bradley County",
			"code": 1966
		},
		{
			"stateCd": "AR",
			"desc": "Calhoun County",
			"code": 1967
		},
		{
			"stateCd": "AR",
			"desc": "Carroll County",
			"code": 1968
		},
		{
			"stateCd": "AR",
			"desc": "Chicot County",
			"code": 1969
		},
		{
			"stateCd": "AR",
			"desc": "Clark County",
			"code": 1970
		},
		{
			"stateCd": "AR",
			"desc": "Clay County",
			"code": 1971
		},
		{
			"stateCd": "AR",
			"desc": "Cleburne County",
			"code": 1972
		},
		{
			"stateCd": "AR",
			"desc": "Cleveland County",
			"code": 1973
		},
		{
			"stateCd": "AR",
			"desc": "Columbia County",
			"code": 1974
		},
		{
			"stateCd": "AR",
			"desc": "Conway County",
			"code": 1975
		},
		{
			"stateCd": "AR",
			"desc": "Craighead County",
			"code": 1976
		},
		{
			"stateCd": "AR",
			"desc": "Crawford County",
			"code": 1977
		},
		{
			"stateCd": "AR",
			"desc": "Crittenden County",
			"code": 1978
		},
		{
			"stateCd": "AR",
			"desc": "Cross County",
			"code": 1979
		},
		{
			"stateCd": "AR",
			"desc": "Dallas County",
			"code": 1980
		},
		{
			"stateCd": "AR",
			"desc": "Desha County",
			"code": 1981
		},
		{
			"stateCd": "AR",
			"desc": "Drew County",
			"code": 1982
		},
		{
			"stateCd": "AR",
			"desc": "Faulkner County",
			"code": 1983
		},
		{
			"stateCd": "AR",
			"desc": "Franklin County",
			"code": 1984
		},
		{
			"stateCd": "AR",
			"desc": "Fulton County",
			"code": 1985
		},
		{
			"stateCd": "AR",
			"desc": "Garland County",
			"code": 1986
		},
		{
			"stateCd": "AR",
			"desc": "Grant County",
			"code": 1987
		},
		{
			"stateCd": "AR",
			"desc": "Greene County",
			"code": 1988
		},
		{
			"stateCd": "AR",
			"desc": "Hempstead County",
			"code": 1989
		},
		{
			"stateCd": "AR",
			"desc": "Hot Spring County",
			"code": 1990
		},
		{
			"stateCd": "AR",
			"desc": "Howard County",
			"code": 1991
		},
		{
			"stateCd": "AR",
			"desc": "Independence County",
			"code": 1992
		},
		{
			"stateCd": "AR",
			"desc": "Izard County",
			"code": 1993
		},
		{
			"stateCd": "AR",
			"desc": "Jackson County",
			"code": 1994
		},
		{
			"stateCd": "AR",
			"desc": "Jefferson County",
			"code": 1995
		},
		{
			"stateCd": "AR",
			"desc": "Johnson County",
			"code": 1996
		},
		{
			"stateCd": "AR",
			"desc": "Lafayette County",
			"code": 1997
		},
		{
			"stateCd": "AR",
			"desc": "Lawrence County",
			"code": 1998
		},
		{
			"stateCd": "AR",
			"desc": "Lee County",
			"code": 1999
		},
		{
			"stateCd": "AR",
			"desc": "Lincoln County",
			"code": 2000
		},
		{
			"stateCd": "AR",
			"desc": "Little River County",
			"code": 2001
		},
		{
			"stateCd": "AR",
			"desc": "Logan County",
			"code": 2002
		},
		{
			"stateCd": "AR",
			"desc": "Lonoke County",
			"code": 2003
		},
		{
			"stateCd": "AR",
			"desc": "Madison County",
			"code": 2004
		},
		{
			"stateCd": "AR",
			"desc": "Marion County",
			"code": 2005
		},
		{
			"stateCd": "AR",
			"desc": "Miller County",
			"code": 2006
		},
		{
			"stateCd": "AR",
			"desc": "Mississippi County",
			"code": 2007
		},
		{
			"stateCd": "AR",
			"desc": "Monroe County",
			"code": 2008
		},
		{
			"stateCd": "AR",
			"desc": "Montgomery County",
			"code": 2009
		},
		{
			"stateCd": "AR",
			"desc": "Nevada County",
			"code": 2010
		},
		{
			"stateCd": "AR",
			"desc": "Newton County",
			"code": 2011
		},
		{
			"stateCd": "AR",
			"desc": "Ouachita County",
			"code": 2012
		},
		{
			"stateCd": "AR",
			"desc": "Perry County",
			"code": 2013
		},
		{
			"stateCd": "AR",
			"desc": "Phillips County",
			"code": 2014
		},
		{
			"stateCd": "AR",
			"desc": "Pike County",
			"code": 2015
		},
		{
			"stateCd": "AR",
			"desc": "Poinsett County",
			"code": 2016
		},
		{
			"stateCd": "AR",
			"desc": "Polk County",
			"code": 2017
		},
		{
			"stateCd": "AR",
			"desc": "Pope County",
			"code": 2018
		},
		{
			"stateCd": "AR",
			"desc": "Prairie County",
			"code": 2019
		},
		{
			"stateCd": "AR",
			"desc": "Pulaski County",
			"code": 2020
		},
		{
			"stateCd": "AR",
			"desc": "Randolph County",
			"code": 2021
		},
		{
			"stateCd": "AR",
			"desc": "Saline County",
			"code": 2023
		},
		{
			"stateCd": "AR",
			"desc": "Scott County",
			"code": 2024
		},
		{
			"stateCd": "AR",
			"desc": "Searcy County",
			"code": 2025
		},
		{
			"stateCd": "AR",
			"desc": "Sebastian County",
			"code": 2026
		},
		{
			"stateCd": "AR",
			"desc": "Sevier County",
			"code": 2027
		},
		{
			"stateCd": "AR",
			"desc": "Sharp County",
			"code": 2028
		},
		{
			"stateCd": "AR",
			"desc": "St. Francis County",
			"code": 2022
		},
		{
			"stateCd": "AR",
			"desc": "Stone County",
			"code": 2029
		},
		{
			"stateCd": "AR",
			"desc": "Union County",
			"code": 2030
		},
		{
			"stateCd": "AR",
			"desc": "Van Buren County",
			"code": 2031
		},
		{
			"stateCd": "AR",
			"desc": "Washington County",
			"code": 2032
		},
		{
			"stateCd": "AR",
			"desc": "White County",
			"code": 2033
		},
		{
			"stateCd": "AR",
			"desc": "Woodruff County",
			"code": 2034
		},
		{
			"stateCd": "AR",
			"desc": "Yell County",
			"code": 2035
		},
		{
			"stateCd": "AZ",
			"desc": "Apache County",
			"code": 1946
		},
		{
			"stateCd": "AZ",
			"desc": "Cochise County",
			"code": 1947
		},
		{
			"stateCd": "AZ",
			"desc": "Coconino County",
			"code": 1948
		},
		{
			"stateCd": "AZ",
			"desc": "Gila County",
			"code": 1949
		},
		{
			"stateCd": "AZ",
			"desc": "Graham County",
			"code": 1950
		},
		{
			"stateCd": "AZ",
			"desc": "Greenlee County",
			"code": 1951
		},
		{
			"stateCd": "AZ",
			"desc": "La Paz County",
			"code": 1952
		},
		{
			"stateCd": "AZ",
			"desc": "Maricopa County",
			"code": 1953
		},
		{
			"stateCd": "AZ",
			"desc": "Mohave County",
			"code": 1954
		},
		{
			"stateCd": "AZ",
			"desc": "Navajo County",
			"code": 1955
		},
		{
			"stateCd": "AZ",
			"desc": "Pima County",
			"code": 1956
		},
		{
			"stateCd": "AZ",
			"desc": "Pinal County",
			"code": 1957
		},
		{
			"stateCd": "AZ",
			"desc": "Santa Cruz County",
			"code": 1958
		},
		{
			"stateCd": "AZ",
			"desc": "Yavapai County",
			"code": 1959
		},
		{
			"stateCd": "AZ",
			"desc": "Yuma County",
			"code": 1960
		},
		{
			"stateCd": "CA",
			"desc": "Alameda County",
			"code": 2036
		},
		{
			"stateCd": "CA",
			"desc": "Alpine County",
			"code": 2037
		},
		{
			"stateCd": "CA",
			"desc": "Amador County",
			"code": 2038
		},
		{
			"stateCd": "CA",
			"desc": "Butte County",
			"code": 2039
		},
		{
			"stateCd": "CA",
			"desc": "Calaveras County",
			"code": 2040
		},
		{
			"stateCd": "CA",
			"desc": "Colusa County",
			"code": 2041
		},
		{
			"stateCd": "CA",
			"desc": "Contra Costa County",
			"code": 2042
		},
		{
			"stateCd": "CA",
			"desc": "Del Norte County",
			"code": 2043
		},
		{
			"stateCd": "CA",
			"desc": "El Dorado County",
			"code": 2044
		},
		{
			"stateCd": "CA",
			"desc": "Fresno County",
			"code": 2045
		},
		{
			"stateCd": "CA",
			"desc": "Glenn County",
			"code": 2046
		},
		{
			"stateCd": "CA",
			"desc": "Humboldt County",
			"code": 2047
		},
		{
			"stateCd": "CA",
			"desc": "Imperial County",
			"code": 2048
		},
		{
			"stateCd": "CA",
			"desc": "Inyo County",
			"code": 2049
		},
		{
			"stateCd": "CA",
			"desc": "Kern County",
			"code": 2050
		},
		{
			"stateCd": "CA",
			"desc": "Kings County",
			"code": 2051
		},
		{
			"stateCd": "CA",
			"desc": "Lake County",
			"code": 2052
		},
		{
			"stateCd": "CA",
			"desc": "Lassen County",
			"code": 2053
		},
		{
			"stateCd": "CA",
			"desc": "Los Angeles County",
			"code": 2054
		},
		{
			"stateCd": "CA",
			"desc": "Madera County",
			"code": 2055
		},
		{
			"stateCd": "CA",
			"desc": "Marin County",
			"code": 2056
		},
		{
			"stateCd": "CA",
			"desc": "Mariposa County",
			"code": 2057
		},
		{
			"stateCd": "CA",
			"desc": "Mendocino County",
			"code": 2058
		},
		{
			"stateCd": "CA",
			"desc": "Merced County",
			"code": 2059
		},
		{
			"stateCd": "CA",
			"desc": "Modoc County",
			"code": 2060
		},
		{
			"stateCd": "CA",
			"desc": "Mono County",
			"code": 2061
		},
		{
			"stateCd": "CA",
			"desc": "Monterey County",
			"code": 2062
		},
		{
			"stateCd": "CA",
			"desc": "Napa County",
			"code": 2063
		},
		{
			"stateCd": "CA",
			"desc": "Nevada County",
			"code": 2064
		},
		{
			"stateCd": "CA",
			"desc": "Orange County",
			"code": 2065
		},
		{
			"stateCd": "CA",
			"desc": "Placer County",
			"code": 2066
		},
		{
			"stateCd": "CA",
			"desc": "Plumas County",
			"code": 2067
		},
		{
			"stateCd": "CA",
			"desc": "Riverside County",
			"code": 2068
		},
		{
			"stateCd": "CA",
			"desc": "Sacramento County",
			"code": 2069
		},
		{
			"stateCd": "CA",
			"desc": "San Benito County",
			"code": 2070
		},
		{
			"stateCd": "CA",
			"desc": "San Bernardino County",
			"code": 2071
		},
		{
			"stateCd": "CA",
			"desc": "San Diego County",
			"code": 2072
		},
		{
			"stateCd": "CA",
			"desc": "San Francisco County",
			"code": 2073
		},
		{
			"stateCd": "CA",
			"desc": "San Joaquin County",
			"code": 2074
		},
		{
			"stateCd": "CA",
			"desc": "San Luis Obispo County",
			"code": 2075
		},
		{
			"stateCd": "CA",
			"desc": "San Mateo County",
			"code": 2076
		},
		{
			"stateCd": "CA",
			"desc": "Santa Barbara County",
			"code": 2077
		},
		{
			"stateCd": "CA",
			"desc": "Santa Clara County",
			"code": 2078
		},
		{
			"stateCd": "CA",
			"desc": "Santa Cruz County",
			"code": 2079
		},
		{
			"stateCd": "CA",
			"desc": "Shasta County",
			"code": 2080
		},
		{
			"stateCd": "CA",
			"desc": "Sierra County",
			"code": 2081
		},
		{
			"stateCd": "CA",
			"desc": "Siskiyou County",
			"code": 2082
		},
		{
			"stateCd": "CA",
			"desc": "Solano County",
			"code": 2083
		},
		{
			"stateCd": "CA",
			"desc": "Sonoma County",
			"code": 2084
		},
		{
			"stateCd": "CA",
			"desc": "Stanislaus County",
			"code": 2085
		},
		{
			"stateCd": "CA",
			"desc": "Sutter County",
			"code": 2086
		},
		{
			"stateCd": "CA",
			"desc": "Tehama County",
			"code": 2087
		},
		{
			"stateCd": "CA",
			"desc": "Trinity County",
			"code": 2088
		},
		{
			"stateCd": "CA",
			"desc": "Tulare County",
			"code": 2089
		},
		{
			"stateCd": "CA",
			"desc": "Tuolumne County",
			"code": 2090
		},
		{
			"stateCd": "CA",
			"desc": "Ventura County",
			"code": 2091
		},
		{
			"stateCd": "CA",
			"desc": "Yolo County",
			"code": 2092
		},
		{
			"stateCd": "CA",
			"desc": "Yuba County",
			"code": 2093
		},
		{
			"stateCd": "CO",
			"desc": "Adams County",
			"code": 2094
		},
		{
			"stateCd": "CO",
			"desc": "Alamosa County",
			"code": 2095
		},
		{
			"stateCd": "CO",
			"desc": "Arapahoe County",
			"code": 2096
		},
		{
			"stateCd": "CO",
			"desc": "Archuleta County",
			"code": 2097
		},
		{
			"stateCd": "CO",
			"desc": "Baca County",
			"code": 2098
		},
		{
			"stateCd": "CO",
			"desc": "Bent County",
			"code": 2099
		},
		{
			"stateCd": "CO",
			"desc": "Boulder County",
			"code": 2100
		},
		{
			"stateCd": "CO",
			"desc": "Broomfield County",
			"code": 2101
		},
		{
			"stateCd": "CO",
			"desc": "Chaffee County",
			"code": 2102
		},
		{
			"stateCd": "CO",
			"desc": "Cheyenne County",
			"code": 2103
		},
		{
			"stateCd": "CO",
			"desc": "Clear Creek County",
			"code": 2104
		},
		{
			"stateCd": "CO",
			"desc": "Conejos County",
			"code": 2105
		},
		{
			"stateCd": "CO",
			"desc": "Costilla County",
			"code": 2106
		},
		{
			"stateCd": "CO",
			"desc": "Crowley County",
			"code": 2107
		},
		{
			"stateCd": "CO",
			"desc": "Custer County",
			"code": 2108
		},
		{
			"stateCd": "CO",
			"desc": "Delta County",
			"code": 2109
		},
		{
			"stateCd": "CO",
			"desc": "Denver County",
			"code": 2110
		},
		{
			"stateCd": "CO",
			"desc": "Dolores County",
			"code": 2111
		},
		{
			"stateCd": "CO",
			"desc": "Douglas County",
			"code": 2112
		},
		{
			"stateCd": "CO",
			"desc": "Eagle County",
			"code": 2113
		},
		{
			"stateCd": "CO",
			"desc": "El Paso County",
			"code": 2115
		},
		{
			"stateCd": "CO",
			"desc": "Elbert County",
			"code": 2114
		},
		{
			"stateCd": "CO",
			"desc": "Fremont County",
			"code": 2116
		},
		{
			"stateCd": "CO",
			"desc": "Garfield County",
			"code": 2117
		},
		{
			"stateCd": "CO",
			"desc": "Gilpin County",
			"code": 2118
		},
		{
			"stateCd": "CO",
			"desc": "Grand County",
			"code": 2119
		},
		{
			"stateCd": "CO",
			"desc": "Gunnison County",
			"code": 2120
		},
		{
			"stateCd": "CO",
			"desc": "Hinsdale County",
			"code": 2121
		},
		{
			"stateCd": "CO",
			"desc": "Huerfano County",
			"code": 2122
		},
		{
			"stateCd": "CO",
			"desc": "Jackson County",
			"code": 2123
		},
		{
			"stateCd": "CO",
			"desc": "Jefferson County",
			"code": 2124
		},
		{
			"stateCd": "CO",
			"desc": "Kiowa County",
			"code": 2125
		},
		{
			"stateCd": "CO",
			"desc": "Kit Carson County",
			"code": 2126
		},
		{
			"stateCd": "CO",
			"desc": "La Plata County",
			"code": 2128
		},
		{
			"stateCd": "CO",
			"desc": "Lake County",
			"code": 2127
		},
		{
			"stateCd": "CO",
			"desc": "Larimer County",
			"code": 2129
		},
		{
			"stateCd": "CO",
			"desc": "Las Animas County",
			"code": 2130
		},
		{
			"stateCd": "CO",
			"desc": "Lincoln County",
			"code": 2131
		},
		{
			"stateCd": "CO",
			"desc": "Logan County",
			"code": 2132
		},
		{
			"stateCd": "CO",
			"desc": "Mesa County",
			"code": 2133
		},
		{
			"stateCd": "CO",
			"desc": "Mineral County",
			"code": 2134
		},
		{
			"stateCd": "CO",
			"desc": "Moffat County",
			"code": 2135
		},
		{
			"stateCd": "CO",
			"desc": "Montezuma County",
			"code": 2136
		},
		{
			"stateCd": "CO",
			"desc": "Montrose County",
			"code": 2137
		},
		{
			"stateCd": "CO",
			"desc": "Morgan County",
			"code": 2138
		},
		{
			"stateCd": "CO",
			"desc": "Otero County",
			"code": 2139
		},
		{
			"stateCd": "CO",
			"desc": "Ouray County",
			"code": 2140
		},
		{
			"stateCd": "CO",
			"desc": "Park County",
			"code": 2141
		},
		{
			"stateCd": "CO",
			"desc": "Phillips County",
			"code": 2142
		},
		{
			"stateCd": "CO",
			"desc": "Pitkin County",
			"code": 2143
		},
		{
			"stateCd": "CO",
			"desc": "Prowers County",
			"code": 2144
		},
		{
			"stateCd": "CO",
			"desc": "Pueblo County",
			"code": 2145
		},
		{
			"stateCd": "CO",
			"desc": "Rio Blanco County",
			"code": 2146
		},
		{
			"stateCd": "CO",
			"desc": "Rio Grande County",
			"code": 2147
		},
		{
			"stateCd": "CO",
			"desc": "Routt County",
			"code": 2148
		},
		{
			"stateCd": "CO",
			"desc": "Saguache County",
			"code": 2149
		},
		{
			"stateCd": "CO",
			"desc": "San Juan County",
			"code": 2150
		},
		{
			"stateCd": "CO",
			"desc": "San Miguel County",
			"code": 2151
		},
		{
			"stateCd": "CO",
			"desc": "Sedgwick County",
			"code": 2152
		},
		{
			"stateCd": "CO",
			"desc": "Summit County",
			"code": 2153
		},
		{
			"stateCd": "CO",
			"desc": "Teller County",
			"code": 2154
		},
		{
			"stateCd": "CO",
			"desc": "Washington County",
			"code": 2155
		},
		{
			"stateCd": "CO",
			"desc": "Weld County",
			"code": 2156
		},
		{
			"stateCd": "CO",
			"desc": "Yuma County",
			"code": 2157
		},
		{
			"stateCd": "CT",
			"desc": "Fairfield County",
			"code": 2158
		},
		{
			"stateCd": "CT",
			"desc": "Hartford County",
			"code": 2159
		},
		{
			"stateCd": "CT",
			"desc": "Litchfield County",
			"code": 2160
		},
		{
			"stateCd": "CT",
			"desc": "Middlesex County",
			"code": 2161
		},
		{
			"stateCd": "CT",
			"desc": "New Haven County",
			"code": 2162
		},
		{
			"stateCd": "CT",
			"desc": "New London County",
			"code": 2163
		},
		{
			"stateCd": "CT",
			"desc": "Tolland County",
			"code": 2164
		},
		{
			"stateCd": "CT",
			"desc": "Windham County",
			"code": 2165
		},
		{
			"stateCd": "DC",
			"desc": "District of Columbia",
			"code": 2169
		},
		{
			"stateCd": "DE",
			"desc": "Kent County",
			"code": 2166
		},
		{
			"stateCd": "DE",
			"desc": "New Castle County",
			"code": 2167
		},
		{
			"stateCd": "DE",
			"desc": "Sussex County",
			"code": 2168
		},
		{
			"stateCd": "FL",
			"desc": "Alachua County",
			"code": 2170
		},
		{
			"stateCd": "FL",
			"desc": "Baker County",
			"code": 2171
		},
		{
			"stateCd": "FL",
			"desc": "Bay County",
			"code": 2172
		},
		{
			"stateCd": "FL",
			"desc": "Bradford County",
			"code": 2173
		},
		{
			"stateCd": "FL",
			"desc": "Brevard County",
			"code": 2174
		},
		{
			"stateCd": "FL",
			"desc": "Broward County",
			"code": 2175
		},
		{
			"stateCd": "FL",
			"desc": "Calhoun County",
			"code": 2176
		},
		{
			"stateCd": "FL",
			"desc": "Charlotte County",
			"code": 2177
		},
		{
			"stateCd": "FL",
			"desc": "Citrus County",
			"code": 2178
		},
		{
			"stateCd": "FL",
			"desc": "Clay County",
			"code": 2179
		},
		{
			"stateCd": "FL",
			"desc": "Collier County",
			"code": 2180
		},
		{
			"stateCd": "FL",
			"desc": "Columbia County",
			"code": 2181
		},
		{
			"stateCd": "FL",
			"desc": "DeSoto County",
			"code": 2182
		},
		{
			"stateCd": "FL",
			"desc": "Dixie County",
			"code": 2183
		},
		{
			"stateCd": "FL",
			"desc": "Duval County",
			"code": 2184
		},
		{
			"stateCd": "FL",
			"desc": "Escambia County",
			"code": 2185
		},
		{
			"stateCd": "FL",
			"desc": "Flagler County",
			"code": 2186
		},
		{
			"stateCd": "FL",
			"desc": "Franklin County",
			"code": 2187
		},
		{
			"stateCd": "FL",
			"desc": "Gadsden County",
			"code": 2188
		},
		{
			"stateCd": "FL",
			"desc": "Gilchrist County",
			"code": 2189
		},
		{
			"stateCd": "FL",
			"desc": "Glades County",
			"code": 2190
		},
		{
			"stateCd": "FL",
			"desc": "Gulf County",
			"code": 2191
		},
		{
			"stateCd": "FL",
			"desc": "Hamilton County",
			"code": 2192
		},
		{
			"stateCd": "FL",
			"desc": "Hardee County",
			"code": 2193
		},
		{
			"stateCd": "FL",
			"desc": "Hendry County",
			"code": 2194
		},
		{
			"stateCd": "FL",
			"desc": "Hernando County",
			"code": 2195
		},
		{
			"stateCd": "FL",
			"desc": "Highlands County",
			"code": 2196
		},
		{
			"stateCd": "FL",
			"desc": "Hillsborough County",
			"code": 2197
		},
		{
			"stateCd": "FL",
			"desc": "Holmes County",
			"code": 2198
		},
		{
			"stateCd": "FL",
			"desc": "Indian River County",
			"code": 2199
		},
		{
			"stateCd": "FL",
			"desc": "Jackson County",
			"code": 2200
		},
		{
			"stateCd": "FL",
			"desc": "Jefferson County",
			"code": 2201
		},
		{
			"stateCd": "FL",
			"desc": "Lafayette County",
			"code": 2202
		},
		{
			"stateCd": "FL",
			"desc": "Lake County",
			"code": 2203
		},
		{
			"stateCd": "FL",
			"desc": "Lee County",
			"code": 2204
		},
		{
			"stateCd": "FL",
			"desc": "Leon County",
			"code": 2205
		},
		{
			"stateCd": "FL",
			"desc": "Levy County",
			"code": 2206
		},
		{
			"stateCd": "FL",
			"desc": "Liberty County",
			"code": 2207
		},
		{
			"stateCd": "FL",
			"desc": "Madison County",
			"code": 2208
		},
		{
			"stateCd": "FL",
			"desc": "Manatee County",
			"code": 2209
		},
		{
			"stateCd": "FL",
			"desc": "Marion County",
			"code": 2210
		},
		{
			"stateCd": "FL",
			"desc": "Martin County",
			"code": 2211
		},
		{
			"stateCd": "FL",
			"desc": "Miami-Dade County",
			"code": 2212
		},
		{
			"stateCd": "FL",
			"desc": "Monroe County",
			"code": 2213
		},
		{
			"stateCd": "FL",
			"desc": "Nassau County",
			"code": 2214
		},
		{
			"stateCd": "FL",
			"desc": "Okaloosa County",
			"code": 2215
		},
		{
			"stateCd": "FL",
			"desc": "Okeechobee County",
			"code": 2216
		},
		{
			"stateCd": "FL",
			"desc": "Orange County",
			"code": 2217
		},
		{
			"stateCd": "FL",
			"desc": "Osceola County",
			"code": 2218
		},
		{
			"stateCd": "FL",
			"desc": "Palm Beach County",
			"code": 2219
		},
		{
			"stateCd": "FL",
			"desc": "Pasco County",
			"code": 2220
		},
		{
			"stateCd": "FL",
			"desc": "Pinellas County",
			"code": 2221
		},
		{
			"stateCd": "FL",
			"desc": "Polk County",
			"code": 2222
		},
		{
			"stateCd": "FL",
			"desc": "Putnam County",
			"code": 2223
		},
		{
			"stateCd": "FL",
			"desc": "Santa Rosa County",
			"code": 2226
		},
		{
			"stateCd": "FL",
			"desc": "Sarasota County",
			"code": 2227
		},
		{
			"stateCd": "FL",
			"desc": "Seminole County",
			"code": 2228
		},
		{
			"stateCd": "FL",
			"desc": "St. Johns County",
			"code": 2224
		},
		{
			"stateCd": "FL",
			"desc": "St. Lucie County",
			"code": 2225
		},
		{
			"stateCd": "FL",
			"desc": "Sumter County",
			"code": 2229
		},
		{
			"stateCd": "FL",
			"desc": "Suwannee County",
			"code": 2230
		},
		{
			"stateCd": "FL",
			"desc": "Taylor County",
			"code": 2231
		},
		{
			"stateCd": "FL",
			"desc": "Union County",
			"code": 2232
		},
		{
			"stateCd": "FL",
			"desc": "Volusia County",
			"code": 2233
		},
		{
			"stateCd": "FL",
			"desc": "Wakulla County",
			"code": 2234
		},
		{
			"stateCd": "FL",
			"desc": "Walton County",
			"code": 2235
		},
		{
			"stateCd": "FL",
			"desc": "Washington County",
			"code": 2236
		},
		{
			"stateCd": "GA",
			"desc": "Appling County",
			"code": 2237
		},
		{
			"stateCd": "GA",
			"desc": "Atkinson County",
			"code": 2238
		},
		{
			"stateCd": "GA",
			"desc": "Bacon County",
			"code": 2239
		},
		{
			"stateCd": "GA",
			"desc": "Baker County",
			"code": 2240
		},
		{
			"stateCd": "GA",
			"desc": "Baldwin County",
			"code": 2241
		},
		{
			"stateCd": "GA",
			"desc": "Banks County",
			"code": 2242
		},
		{
			"stateCd": "GA",
			"desc": "Barrow County",
			"code": 2243
		},
		{
			"stateCd": "GA",
			"desc": "Bartow County",
			"code": 2244
		},
		{
			"stateCd": "GA",
			"desc": "Ben Hill County",
			"code": 2245
		},
		{
			"stateCd": "GA",
			"desc": "Berrien County",
			"code": 2246
		},
		{
			"stateCd": "GA",
			"desc": "Bibb County",
			"code": 2247
		},
		{
			"stateCd": "GA",
			"desc": "Bleckley County",
			"code": 2248
		},
		{
			"stateCd": "GA",
			"desc": "Brantley County",
			"code": 2249
		},
		{
			"stateCd": "GA",
			"desc": "Brooks County",
			"code": 2250
		},
		{
			"stateCd": "GA",
			"desc": "Bryan County",
			"code": 2251
		},
		{
			"stateCd": "GA",
			"desc": "Bulloch County",
			"code": 2252
		},
		{
			"stateCd": "GA",
			"desc": "Burke County",
			"code": 2253
		},
		{
			"stateCd": "GA",
			"desc": "Butts County",
			"code": 2254
		},
		{
			"stateCd": "GA",
			"desc": "Calhoun County",
			"code": 2255
		},
		{
			"stateCd": "GA",
			"desc": "Camden County",
			"code": 2256
		},
		{
			"stateCd": "GA",
			"desc": "Candler County",
			"code": 2257
		},
		{
			"stateCd": "GA",
			"desc": "Carroll County",
			"code": 2258
		},
		{
			"stateCd": "GA",
			"desc": "Catoosa County",
			"code": 2259
		},
		{
			"stateCd": "GA",
			"desc": "Charlton County",
			"code": 2260
		},
		{
			"stateCd": "GA",
			"desc": "Chatham County",
			"code": 2261
		},
		{
			"stateCd": "GA",
			"desc": "Chattahoochee County",
			"code": 2262
		},
		{
			"stateCd": "GA",
			"desc": "Chattooga County",
			"code": 2263
		},
		{
			"stateCd": "GA",
			"desc": "Cherokee County",
			"code": 2264
		},
		{
			"stateCd": "GA",
			"desc": "Clarke County",
			"code": 2265
		},
		{
			"stateCd": "GA",
			"desc": "Clay County",
			"code": 2266
		},
		{
			"stateCd": "GA",
			"desc": "Clayton County",
			"code": 2267
		},
		{
			"stateCd": "GA",
			"desc": "Clinch County",
			"code": 2268
		},
		{
			"stateCd": "GA",
			"desc": "Cobb County",
			"code": 2269
		},
		{
			"stateCd": "GA",
			"desc": "Coffee County",
			"code": 2270
		},
		{
			"stateCd": "GA",
			"desc": "Colquitt County",
			"code": 2271
		},
		{
			"stateCd": "GA",
			"desc": "Columbia County",
			"code": 2272
		},
		{
			"stateCd": "GA",
			"desc": "Cook County",
			"code": 2273
		},
		{
			"stateCd": "GA",
			"desc": "Coweta County",
			"code": 2274
		},
		{
			"stateCd": "GA",
			"desc": "Crawford County",
			"code": 2275
		},
		{
			"stateCd": "GA",
			"desc": "Crisp County",
			"code": 2276
		},
		{
			"stateCd": "GA",
			"desc": "Dade County",
			"code": 2277
		},
		{
			"stateCd": "GA",
			"desc": "Dawson County",
			"code": 2278
		},
		{
			"stateCd": "GA",
			"desc": "Decatur County",
			"code": 2279
		},
		{
			"stateCd": "GA",
			"desc": "DeKalb County",
			"code": 2280
		},
		{
			"stateCd": "GA",
			"desc": "Dodge County",
			"code": 2281
		},
		{
			"stateCd": "GA",
			"desc": "Dooly County",
			"code": 2282
		},
		{
			"stateCd": "GA",
			"desc": "Dougherty County",
			"code": 2283
		},
		{
			"stateCd": "GA",
			"desc": "Douglas County",
			"code": 2284
		},
		{
			"stateCd": "GA",
			"desc": "Early County",
			"code": 2285
		},
		{
			"stateCd": "GA",
			"desc": "Echols County",
			"code": 2286
		},
		{
			"stateCd": "GA",
			"desc": "Effingham County",
			"code": 2287
		},
		{
			"stateCd": "GA",
			"desc": "Elbert County",
			"code": 2288
		},
		{
			"stateCd": "GA",
			"desc": "Emanuel County",
			"code": 2289
		},
		{
			"stateCd": "GA",
			"desc": "Evans County",
			"code": 2290
		},
		{
			"stateCd": "GA",
			"desc": "Fannin County",
			"code": 2291
		},
		{
			"stateCd": "GA",
			"desc": "Fayette County",
			"code": 2292
		},
		{
			"stateCd": "GA",
			"desc": "Floyd County",
			"code": 2293
		},
		{
			"stateCd": "GA",
			"desc": "Forsyth County",
			"code": 2294
		},
		{
			"stateCd": "GA",
			"desc": "Franklin County",
			"code": 2295
		},
		{
			"stateCd": "GA",
			"desc": "Fulton County",
			"code": 2296
		},
		{
			"stateCd": "GA",
			"desc": "Gilmer County",
			"code": 2297
		},
		{
			"stateCd": "GA",
			"desc": "Glascock County",
			"code": 2298
		},
		{
			"stateCd": "GA",
			"desc": "Glynn County",
			"code": 2299
		},
		{
			"stateCd": "GA",
			"desc": "Gordon County",
			"code": 2300
		},
		{
			"stateCd": "GA",
			"desc": "Grady County",
			"code": 2301
		},
		{
			"stateCd": "GA",
			"desc": "Greene County",
			"code": 2302
		},
		{
			"stateCd": "GA",
			"desc": "Gwinnett County",
			"code": 2303
		},
		{
			"stateCd": "GA",
			"desc": "Habersham County",
			"code": 2304
		},
		{
			"stateCd": "GA",
			"desc": "Hall County",
			"code": 2305
		},
		{
			"stateCd": "GA",
			"desc": "Hancock County",
			"code": 2306
		},
		{
			"stateCd": "GA",
			"desc": "Haralson County",
			"code": 2307
		},
		{
			"stateCd": "GA",
			"desc": "Harris County",
			"code": 2308
		},
		{
			"stateCd": "GA",
			"desc": "Hart County",
			"code": 2309
		},
		{
			"stateCd": "GA",
			"desc": "Heard County",
			"code": 2310
		},
		{
			"stateCd": "GA",
			"desc": "Henry County",
			"code": 2311
		},
		{
			"stateCd": "GA",
			"desc": "Houston County",
			"code": 2312
		},
		{
			"stateCd": "GA",
			"desc": "Irwin County",
			"code": 2313
		},
		{
			"stateCd": "GA",
			"desc": "Jackson County",
			"code": 2314
		},
		{
			"stateCd": "GA",
			"desc": "Jasper County",
			"code": 2315
		},
		{
			"stateCd": "GA",
			"desc": "Jeff Davis County",
			"code": 2316
		},
		{
			"stateCd": "GA",
			"desc": "Jefferson County",
			"code": 2317
		},
		{
			"stateCd": "GA",
			"desc": "Jenkins County",
			"code": 2318
		},
		{
			"stateCd": "GA",
			"desc": "Johnson County",
			"code": 2319
		},
		{
			"stateCd": "GA",
			"desc": "Jones County",
			"code": 2320
		},
		{
			"stateCd": "GA",
			"desc": "Lamar County",
			"code": 2321
		},
		{
			"stateCd": "GA",
			"desc": "Lanier County",
			"code": 2322
		},
		{
			"stateCd": "GA",
			"desc": "Laurens County",
			"code": 2323
		},
		{
			"stateCd": "GA",
			"desc": "Lee County",
			"code": 2324
		},
		{
			"stateCd": "GA",
			"desc": "Liberty County",
			"code": 2325
		},
		{
			"stateCd": "GA",
			"desc": "Lincoln County",
			"code": 2326
		},
		{
			"stateCd": "GA",
			"desc": "Long County",
			"code": 2327
		},
		{
			"stateCd": "GA",
			"desc": "Lowndes County",
			"code": 2328
		},
		{
			"stateCd": "GA",
			"desc": "Lumpkin County",
			"code": 2329
		},
		{
			"stateCd": "GA",
			"desc": "Macon County",
			"code": 2332
		},
		{
			"stateCd": "GA",
			"desc": "Madison County",
			"code": 2333
		},
		{
			"stateCd": "GA",
			"desc": "Marion County",
			"code": 2334
		},
		{
			"stateCd": "GA",
			"desc": "McDuffie County",
			"code": 2330
		},
		{
			"stateCd": "GA",
			"desc": "McIntosh County",
			"code": 2331
		},
		{
			"stateCd": "GA",
			"desc": "Meriwether County",
			"code": 2335
		},
		{
			"stateCd": "GA",
			"desc": "Miller County",
			"code": 2336
		},
		{
			"stateCd": "GA",
			"desc": "Mitchell County",
			"code": 2337
		},
		{
			"stateCd": "GA",
			"desc": "Monroe County",
			"code": 2338
		},
		{
			"stateCd": "GA",
			"desc": "Montgomery County",
			"code": 2339
		},
		{
			"stateCd": "GA",
			"desc": "Morgan County",
			"code": 2340
		},
		{
			"stateCd": "GA",
			"desc": "Murray County",
			"code": 2341
		},
		{
			"stateCd": "GA",
			"desc": "Muscogee County",
			"code": 2342
		},
		{
			"stateCd": "GA",
			"desc": "Newton County",
			"code": 2343
		},
		{
			"stateCd": "GA",
			"desc": "Oconee County",
			"code": 2344
		},
		{
			"stateCd": "GA",
			"desc": "Oglethorpe County",
			"code": 2345
		},
		{
			"stateCd": "GA",
			"desc": "Paulding County",
			"code": 2346
		},
		{
			"stateCd": "GA",
			"desc": "Peach County",
			"code": 2347
		},
		{
			"stateCd": "GA",
			"desc": "Pickens County",
			"code": 2348
		},
		{
			"stateCd": "GA",
			"desc": "Pierce County",
			"code": 2349
		},
		{
			"stateCd": "GA",
			"desc": "Pike County",
			"code": 2350
		},
		{
			"stateCd": "GA",
			"desc": "Polk County",
			"code": 2351
		},
		{
			"stateCd": "GA",
			"desc": "Pulaski County",
			"code": 2352
		},
		{
			"stateCd": "GA",
			"desc": "Putnam County",
			"code": 2353
		},
		{
			"stateCd": "GA",
			"desc": "Quitman County",
			"code": 2354
		},
		{
			"stateCd": "GA",
			"desc": "Rabun County",
			"code": 2355
		},
		{
			"stateCd": "GA",
			"desc": "Randolph County",
			"code": 2356
		},
		{
			"stateCd": "GA",
			"desc": "Richmond County",
			"code": 2357
		},
		{
			"stateCd": "GA",
			"desc": "Rockdale County",
			"code": 2358
		},
		{
			"stateCd": "GA",
			"desc": "Schley County",
			"code": 2359
		},
		{
			"stateCd": "GA",
			"desc": "Screven County",
			"code": 2360
		},
		{
			"stateCd": "GA",
			"desc": "Seminole County",
			"code": 2361
		},
		{
			"stateCd": "GA",
			"desc": "Spalding County",
			"code": 2362
		},
		{
			"stateCd": "GA",
			"desc": "Stephens County",
			"code": 2363
		},
		{
			"stateCd": "GA",
			"desc": "Stewart County",
			"code": 2364
		},
		{
			"stateCd": "GA",
			"desc": "Sumter County",
			"code": 2365
		},
		{
			"stateCd": "GA",
			"desc": "Talbot County",
			"code": 2366
		},
		{
			"stateCd": "GA",
			"desc": "Taliaferro County",
			"code": 2367
		},
		{
			"stateCd": "GA",
			"desc": "Tattnall County",
			"code": 2368
		},
		{
			"stateCd": "GA",
			"desc": "Taylor County",
			"code": 2369
		},
		{
			"stateCd": "GA",
			"desc": "Telfair County",
			"code": 2370
		},
		{
			"stateCd": "GA",
			"desc": "Terrell County",
			"code": 2371
		},
		{
			"stateCd": "GA",
			"desc": "Thomas County",
			"code": 2372
		},
		{
			"stateCd": "GA",
			"desc": "Tift County",
			"code": 2373
		},
		{
			"stateCd": "GA",
			"desc": "Toombs County",
			"code": 2374
		},
		{
			"stateCd": "GA",
			"desc": "Towns County",
			"code": 2375
		},
		{
			"stateCd": "GA",
			"desc": "Treutlen County",
			"code": 2376
		},
		{
			"stateCd": "GA",
			"desc": "Troup County",
			"code": 2377
		},
		{
			"stateCd": "GA",
			"desc": "Turner County",
			"code": 2378
		},
		{
			"stateCd": "GA",
			"desc": "Twiggs County",
			"code": 2379
		},
		{
			"stateCd": "GA",
			"desc": "Union County",
			"code": 2380
		},
		{
			"stateCd": "GA",
			"desc": "Upson County",
			"code": 2381
		},
		{
			"stateCd": "GA",
			"desc": "Walker County",
			"code": 2382
		},
		{
			"stateCd": "GA",
			"desc": "Walton County",
			"code": 2383
		},
		{
			"stateCd": "GA",
			"desc": "Ware County",
			"code": 2384
		},
		{
			"stateCd": "GA",
			"desc": "Warren County",
			"code": 2385
		},
		{
			"stateCd": "GA",
			"desc": "Washington County",
			"code": 2386
		},
		{
			"stateCd": "GA",
			"desc": "Wayne County",
			"code": 2387
		},
		{
			"stateCd": "GA",
			"desc": "Webster County",
			"code": 2388
		},
		{
			"stateCd": "GA",
			"desc": "Wheeler County",
			"code": 2389
		},
		{
			"stateCd": "GA",
			"desc": "White County",
			"code": 2390
		},
		{
			"stateCd": "GA",
			"desc": "Whitfield County",
			"code": 2391
		},
		{
			"stateCd": "GA",
			"desc": "Wilcox County",
			"code": 2392
		},
		{
			"stateCd": "GA",
			"desc": "Wilkes County",
			"code": 2393
		},
		{
			"stateCd": "GA",
			"desc": "Wilkinson County",
			"code": 2394
		},
		{
			"stateCd": "GA",
			"desc": "Worth County",
			"code": 2395
		},
		{
			"stateCd": "HI",
			"desc": "Hawaii County",
			"code": 2396
		},
		{
			"stateCd": "HI",
			"desc": "Honolulu County",
			"code": 2397
		},
		{
			"stateCd": "HI",
			"desc": "Kalawao County",
			"code": 2398
		},
		{
			"stateCd": "HI",
			"desc": "Kauai County",
			"code": 2399
		},
		{
			"stateCd": "HI",
			"desc": "Maui County",
			"code": 2400
		},
		{
			"stateCd": "IA",
			"desc": "Adair County",
			"code": 2638
		},
		{
			"stateCd": "IA",
			"desc": "Adams County",
			"code": 2639
		},
		{
			"stateCd": "IA",
			"desc": "Allamakee County",
			"code": 2640
		},
		{
			"stateCd": "IA",
			"desc": "Appanoose County",
			"code": 2641
		},
		{
			"stateCd": "IA",
			"desc": "Audubon County",
			"code": 2642
		},
		{
			"stateCd": "IA",
			"desc": "Benton County",
			"code": 2643
		},
		{
			"stateCd": "IA",
			"desc": "Black Hawk County",
			"code": 2644
		},
		{
			"stateCd": "IA",
			"desc": "Boone County",
			"code": 2645
		},
		{
			"stateCd": "IA",
			"desc": "Bremer County",
			"code": 2646
		},
		{
			"stateCd": "IA",
			"desc": "Buchanan County",
			"code": 2647
		},
		{
			"stateCd": "IA",
			"desc": "Buena Vista County",
			"code": 2648
		},
		{
			"stateCd": "IA",
			"desc": "Butler County",
			"code": 2649
		},
		{
			"stateCd": "IA",
			"desc": "Calhoun County",
			"code": 2650
		},
		{
			"stateCd": "IA",
			"desc": "Carroll County",
			"code": 2651
		},
		{
			"stateCd": "IA",
			"desc": "Cass County",
			"code": 2652
		},
		{
			"stateCd": "IA",
			"desc": "Cedar County",
			"code": 2653
		},
		{
			"stateCd": "IA",
			"desc": "Cerro Gordo County",
			"code": 2654
		},
		{
			"stateCd": "IA",
			"desc": "Cherokee County",
			"code": 2655
		},
		{
			"stateCd": "IA",
			"desc": "Chickasaw County",
			"code": 2656
		},
		{
			"stateCd": "IA",
			"desc": "Clarke County",
			"code": 2657
		},
		{
			"stateCd": "IA",
			"desc": "Clay County",
			"code": 2658
		},
		{
			"stateCd": "IA",
			"desc": "Clayton County",
			"code": 2659
		},
		{
			"stateCd": "IA",
			"desc": "Clinton County",
			"code": 2660
		},
		{
			"stateCd": "IA",
			"desc": "Crawford County",
			"code": 2661
		},
		{
			"stateCd": "IA",
			"desc": "Dallas County",
			"code": 2662
		},
		{
			"stateCd": "IA",
			"desc": "Davis County",
			"code": 2663
		},
		{
			"stateCd": "IA",
			"desc": "Decatur County",
			"code": 2664
		},
		{
			"stateCd": "IA",
			"desc": "Delaware County",
			"code": 2665
		},
		{
			"stateCd": "IA",
			"desc": "Des Moines County",
			"code": 2666
		},
		{
			"stateCd": "IA",
			"desc": "Dickinson County",
			"code": 2667
		},
		{
			"stateCd": "IA",
			"desc": "Dubuque County",
			"code": 2668
		},
		{
			"stateCd": "IA",
			"desc": "Emmet County",
			"code": 2669
		},
		{
			"stateCd": "IA",
			"desc": "Fayette County",
			"code": 2670
		},
		{
			"stateCd": "IA",
			"desc": "Floyd County",
			"code": 2671
		},
		{
			"stateCd": "IA",
			"desc": "Franklin County",
			"code": 2672
		},
		{
			"stateCd": "IA",
			"desc": "Fremont County",
			"code": 2673
		},
		{
			"stateCd": "IA",
			"desc": "Greene County",
			"code": 2674
		},
		{
			"stateCd": "IA",
			"desc": "Grundy County",
			"code": 2675
		},
		{
			"stateCd": "IA",
			"desc": "Guthrie County",
			"code": 2676
		},
		{
			"stateCd": "IA",
			"desc": "Hamilton County",
			"code": 2677
		},
		{
			"stateCd": "IA",
			"desc": "Hancock County",
			"code": 2678
		},
		{
			"stateCd": "IA",
			"desc": "Hardin County",
			"code": 2679
		},
		{
			"stateCd": "IA",
			"desc": "Harrison County",
			"code": 2680
		},
		{
			"stateCd": "IA",
			"desc": "Henry County",
			"code": 2681
		},
		{
			"stateCd": "IA",
			"desc": "Howard County",
			"code": 2682
		},
		{
			"stateCd": "IA",
			"desc": "Humboldt County",
			"code": 2683
		},
		{
			"stateCd": "IA",
			"desc": "Ida County",
			"code": 2684
		},
		{
			"stateCd": "IA",
			"desc": "Iowa County",
			"code": 2685
		},
		{
			"stateCd": "IA",
			"desc": "Jackson County",
			"code": 2686
		},
		{
			"stateCd": "IA",
			"desc": "Jasper County",
			"code": 2687
		},
		{
			"stateCd": "IA",
			"desc": "Jefferson County",
			"code": 2688
		},
		{
			"stateCd": "IA",
			"desc": "Johnson County",
			"code": 2689
		},
		{
			"stateCd": "IA",
			"desc": "Jones County",
			"code": 2690
		},
		{
			"stateCd": "IA",
			"desc": "Keokuk County",
			"code": 2691
		},
		{
			"stateCd": "IA",
			"desc": "Kossuth County",
			"code": 2692
		},
		{
			"stateCd": "IA",
			"desc": "Lee County",
			"code": 2693
		},
		{
			"stateCd": "IA",
			"desc": "Linn County",
			"code": 2694
		},
		{
			"stateCd": "IA",
			"desc": "Louisa County",
			"code": 2695
		},
		{
			"stateCd": "IA",
			"desc": "Lucas County",
			"code": 2696
		},
		{
			"stateCd": "IA",
			"desc": "Lyon County",
			"code": 2697
		},
		{
			"stateCd": "IA",
			"desc": "Madison County",
			"code": 2698
		},
		{
			"stateCd": "IA",
			"desc": "Mahaska County",
			"code": 2699
		},
		{
			"stateCd": "IA",
			"desc": "Marion County",
			"code": 2700
		},
		{
			"stateCd": "IA",
			"desc": "Marshall County",
			"code": 2701
		},
		{
			"stateCd": "IA",
			"desc": "Mills County",
			"code": 2702
		},
		{
			"stateCd": "IA",
			"desc": "Mitchell County",
			"code": 2703
		},
		{
			"stateCd": "IA",
			"desc": "Monona County",
			"code": 2704
		},
		{
			"stateCd": "IA",
			"desc": "Monroe County",
			"code": 2705
		},
		{
			"stateCd": "IA",
			"desc": "Montgomery County",
			"code": 2706
		},
		{
			"stateCd": "IA",
			"desc": "Muscatine County",
			"code": 2707
		},
		{
			"stateCd": "IA",
			"desc": "O'Brien County",
			"code": 2708
		},
		{
			"stateCd": "IA",
			"desc": "Osceola County",
			"code": 2709
		},
		{
			"stateCd": "IA",
			"desc": "Page County",
			"code": 2710
		},
		{
			"stateCd": "IA",
			"desc": "Palo Alto County",
			"code": 2711
		},
		{
			"stateCd": "IA",
			"desc": "Plymouth County",
			"code": 2712
		},
		{
			"stateCd": "IA",
			"desc": "Pocahontas County",
			"code": 2713
		},
		{
			"stateCd": "IA",
			"desc": "Polk County",
			"code": 2714
		},
		{
			"stateCd": "IA",
			"desc": "Pottawattamie County",
			"code": 2715
		},
		{
			"stateCd": "IA",
			"desc": "Poweshiek County",
			"code": 2716
		},
		{
			"stateCd": "IA",
			"desc": "Ringgold County",
			"code": 2717
		},
		{
			"stateCd": "IA",
			"desc": "Sac County",
			"code": 2718
		},
		{
			"stateCd": "IA",
			"desc": "Scott County",
			"code": 2719
		},
		{
			"stateCd": "IA",
			"desc": "Shelby County",
			"code": 2720
		},
		{
			"stateCd": "IA",
			"desc": "Sioux County",
			"code": 2721
		},
		{
			"stateCd": "IA",
			"desc": "Story County",
			"code": 2722
		},
		{
			"stateCd": "IA",
			"desc": "Tama County",
			"code": 2723
		},
		{
			"stateCd": "IA",
			"desc": "Taylor County",
			"code": 2724
		},
		{
			"stateCd": "IA",
			"desc": "Union County",
			"code": 2725
		},
		{
			"stateCd": "IA",
			"desc": "Van Buren County",
			"code": 2726
		},
		{
			"stateCd": "IA",
			"desc": "Wapello County",
			"code": 2727
		},
		{
			"stateCd": "IA",
			"desc": "Warren County",
			"code": 2728
		},
		{
			"stateCd": "IA",
			"desc": "Washington County",
			"code": 2729
		},
		{
			"stateCd": "IA",
			"desc": "Wayne County",
			"code": 2730
		},
		{
			"stateCd": "IA",
			"desc": "Webster County",
			"code": 2731
		},
		{
			"stateCd": "IA",
			"desc": "Winnebago County",
			"code": 2732
		},
		{
			"stateCd": "IA",
			"desc": "Winneshiek County",
			"code": 2733
		},
		{
			"stateCd": "IA",
			"desc": "Woodbury County",
			"code": 2734
		},
		{
			"stateCd": "IA",
			"desc": "Worth County",
			"code": 2735
		},
		{
			"stateCd": "IA",
			"desc": "Wright County",
			"code": 2736
		},
		{
			"stateCd": "ID",
			"desc": "Ada County",
			"code": 2401
		},
		{
			"stateCd": "ID",
			"desc": "Adams County",
			"code": 2402
		},
		{
			"stateCd": "ID",
			"desc": "Bannock County",
			"code": 2403
		},
		{
			"stateCd": "ID",
			"desc": "Bear Lake County",
			"code": 2404
		},
		{
			"stateCd": "ID",
			"desc": "Benewah County",
			"code": 2405
		},
		{
			"stateCd": "ID",
			"desc": "Bingham County",
			"code": 2406
		},
		{
			"stateCd": "ID",
			"desc": "Blaine County",
			"code": 2407
		},
		{
			"stateCd": "ID",
			"desc": "Boise County",
			"code": 2408
		},
		{
			"stateCd": "ID",
			"desc": "Bonner County",
			"code": 2409
		},
		{
			"stateCd": "ID",
			"desc": "Bonneville County",
			"code": 2410
		},
		{
			"stateCd": "ID",
			"desc": "Boundary County",
			"code": 2411
		},
		{
			"stateCd": "ID",
			"desc": "Butte County",
			"code": 2412
		},
		{
			"stateCd": "ID",
			"desc": "Camas County",
			"code": 2413
		},
		{
			"stateCd": "ID",
			"desc": "Canyon County",
			"code": 2414
		},
		{
			"stateCd": "ID",
			"desc": "Caribou County",
			"code": 2415
		},
		{
			"stateCd": "ID",
			"desc": "Cassia County",
			"code": 2416
		},
		{
			"stateCd": "ID",
			"desc": "Clark County",
			"code": 2417
		},
		{
			"stateCd": "ID",
			"desc": "Clearwater County",
			"code": 2418
		},
		{
			"stateCd": "ID",
			"desc": "Custer County",
			"code": 2419
		},
		{
			"stateCd": "ID",
			"desc": "Elmore County",
			"code": 2420
		},
		{
			"stateCd": "ID",
			"desc": "Franklin County",
			"code": 2421
		},
		{
			"stateCd": "ID",
			"desc": "Fremont County",
			"code": 2422
		},
		{
			"stateCd": "ID",
			"desc": "Gem County",
			"code": 2423
		},
		{
			"stateCd": "ID",
			"desc": "Gooding County",
			"code": 2424
		},
		{
			"stateCd": "ID",
			"desc": "Idaho County",
			"code": 2425
		},
		{
			"stateCd": "ID",
			"desc": "Jefferson County",
			"code": 2426
		},
		{
			"stateCd": "ID",
			"desc": "Jerome County",
			"code": 2427
		},
		{
			"stateCd": "ID",
			"desc": "Kootenai County",
			"code": 2428
		},
		{
			"stateCd": "ID",
			"desc": "Latah County",
			"code": 2429
		},
		{
			"stateCd": "ID",
			"desc": "Lemhi County",
			"code": 2430
		},
		{
			"stateCd": "ID",
			"desc": "Lewis County",
			"code": 2431
		},
		{
			"stateCd": "ID",
			"desc": "Lincoln County",
			"code": 2432
		},
		{
			"stateCd": "ID",
			"desc": "Madison County",
			"code": 2433
		},
		{
			"stateCd": "ID",
			"desc": "Minidoka County",
			"code": 2434
		},
		{
			"stateCd": "ID",
			"desc": "Nez Perce County",
			"code": 2435
		},
		{
			"stateCd": "ID",
			"desc": "Oneida County",
			"code": 2436
		},
		{
			"stateCd": "ID",
			"desc": "Owyhee County",
			"code": 2437
		},
		{
			"stateCd": "ID",
			"desc": "Payette County",
			"code": 2438
		},
		{
			"stateCd": "ID",
			"desc": "Power County",
			"code": 2439
		},
		{
			"stateCd": "ID",
			"desc": "Shoshone County",
			"code": 2440
		},
		{
			"stateCd": "ID",
			"desc": "Teton County",
			"code": 2441
		},
		{
			"stateCd": "ID",
			"desc": "Twin Falls County",
			"code": 2442
		},
		{
			"stateCd": "ID",
			"desc": "Valley County",
			"code": 2443
		},
		{
			"stateCd": "ID",
			"desc": "Washington County",
			"code": 2444
		},
		{
			"stateCd": "IL",
			"desc": "Adams County",
			"code": 2445
		},
		{
			"stateCd": "IL",
			"desc": "Alexander County",
			"code": 2446
		},
		{
			"stateCd": "IL",
			"desc": "Bond County",
			"code": 2447
		},
		{
			"stateCd": "IL",
			"desc": "Boone County",
			"code": 2448
		},
		{
			"stateCd": "IL",
			"desc": "Brown County",
			"code": 2449
		},
		{
			"stateCd": "IL",
			"desc": "Bureau County",
			"code": 2450
		},
		{
			"stateCd": "IL",
			"desc": "Calhoun County",
			"code": 2451
		},
		{
			"stateCd": "IL",
			"desc": "Carroll County",
			"code": 2452
		},
		{
			"stateCd": "IL",
			"desc": "Cass County",
			"code": 2453
		},
		{
			"stateCd": "IL",
			"desc": "Champaign County",
			"code": 2454
		},
		{
			"stateCd": "IL",
			"desc": "Christian County",
			"code": 2455
		},
		{
			"stateCd": "IL",
			"desc": "Clark County",
			"code": 2456
		},
		{
			"stateCd": "IL",
			"desc": "Clay County",
			"code": 2457
		},
		{
			"stateCd": "IL",
			"desc": "Clinton County",
			"code": 2458
		},
		{
			"stateCd": "IL",
			"desc": "Coles County",
			"code": 2459
		},
		{
			"stateCd": "IL",
			"desc": "Cook County",
			"code": 2460
		},
		{
			"stateCd": "IL",
			"desc": "Crawford County",
			"code": 2461
		},
		{
			"stateCd": "IL",
			"desc": "Cumberland County",
			"code": 2462
		},
		{
			"stateCd": "IL",
			"desc": "De Witt County",
			"code": 2464
		},
		{
			"stateCd": "IL",
			"desc": "DeKalb County",
			"code": 2463
		},
		{
			"stateCd": "IL",
			"desc": "Douglas County",
			"code": 2465
		},
		{
			"stateCd": "IL",
			"desc": "DuPage County",
			"code": 2466
		},
		{
			"stateCd": "IL",
			"desc": "Edgar County",
			"code": 2467
		},
		{
			"stateCd": "IL",
			"desc": "Edwards County",
			"code": 2468
		},
		{
			"stateCd": "IL",
			"desc": "Effingham County",
			"code": 2469
		},
		{
			"stateCd": "IL",
			"desc": "Fayette County",
			"code": 2470
		},
		{
			"stateCd": "IL",
			"desc": "Ford County",
			"code": 4987
		},
		{
			"stateCd": "IL",
			"desc": "Franklin County",
			"code": 2471
		},
		{
			"stateCd": "IL",
			"desc": "Fulton County",
			"code": 2472
		},
		{
			"stateCd": "IL",
			"desc": "Gallatin County",
			"code": 2473
		},
		{
			"stateCd": "IL",
			"desc": "Greene County",
			"code": 2474
		},
		{
			"stateCd": "IL",
			"desc": "Grundy County",
			"code": 2475
		},
		{
			"stateCd": "IL",
			"desc": "Hamilton County",
			"code": 2476
		},
		{
			"stateCd": "IL",
			"desc": "Hancock County",
			"code": 2477
		},
		{
			"stateCd": "IL",
			"desc": "Hardin County",
			"code": 2478
		},
		{
			"stateCd": "IL",
			"desc": "Henderson County",
			"code": 2479
		},
		{
			"stateCd": "IL",
			"desc": "Henry County",
			"code": 2480
		},
		{
			"stateCd": "IL",
			"desc": "Iroquois County",
			"code": 2481
		},
		{
			"stateCd": "IL",
			"desc": "Jackson County",
			"code": 2482
		},
		{
			"stateCd": "IL",
			"desc": "Jasper County",
			"code": 2483
		},
		{
			"stateCd": "IL",
			"desc": "Jefferson County",
			"code": 2484
		},
		{
			"stateCd": "IL",
			"desc": "Jersey County",
			"code": 2485
		},
		{
			"stateCd": "IL",
			"desc": "Jo Daviess County",
			"code": 2486
		},
		{
			"stateCd": "IL",
			"desc": "Johnson County",
			"code": 2487
		},
		{
			"stateCd": "IL",
			"desc": "Kane County",
			"code": 2488
		},
		{
			"stateCd": "IL",
			"desc": "Kankakee County",
			"code": 2489
		},
		{
			"stateCd": "IL",
			"desc": "Kendall County",
			"code": 2490
		},
		{
			"stateCd": "IL",
			"desc": "Knox County",
			"code": 2491
		},
		{
			"stateCd": "IL",
			"desc": "Lake County",
			"code": 2492
		},
		{
			"stateCd": "IL",
			"desc": "LaSalle County",
			"code": 2493
		},
		{
			"stateCd": "IL",
			"desc": "Lawrence County",
			"code": 2494
		},
		{
			"stateCd": "IL",
			"desc": "Lee County",
			"code": 2495
		},
		{
			"stateCd": "IL",
			"desc": "Livingston County",
			"code": 2496
		},
		{
			"stateCd": "IL",
			"desc": "Logan County",
			"code": 2497
		},
		{
			"stateCd": "IL",
			"desc": "Macon County",
			"code": 2501
		},
		{
			"stateCd": "IL",
			"desc": "Macoupin County",
			"code": 2502
		},
		{
			"stateCd": "IL",
			"desc": "Madison County",
			"code": 2503
		},
		{
			"stateCd": "IL",
			"desc": "Marion County",
			"code": 2504
		},
		{
			"stateCd": "IL",
			"desc": "Marshall County",
			"code": 2505
		},
		{
			"stateCd": "IL",
			"desc": "Mason County",
			"code": 2506
		},
		{
			"stateCd": "IL",
			"desc": "Massac County",
			"code": 2507
		},
		{
			"stateCd": "IL",
			"desc": "McDonough County",
			"code": 2498
		},
		{
			"stateCd": "IL",
			"desc": "McHenry County",
			"code": 2499
		},
		{
			"stateCd": "IL",
			"desc": "McLean County",
			"code": 2500
		},
		{
			"stateCd": "IL",
			"desc": "Menard County",
			"code": 2508
		},
		{
			"stateCd": "IL",
			"desc": "Mercer County",
			"code": 2509
		},
		{
			"stateCd": "IL",
			"desc": "Monroe County",
			"code": 2510
		},
		{
			"stateCd": "IL",
			"desc": "Montgomery County",
			"code": 2511
		},
		{
			"stateCd": "IL",
			"desc": "Morgan County",
			"code": 2512
		},
		{
			"stateCd": "IL",
			"desc": "Moultrie County",
			"code": 2513
		},
		{
			"stateCd": "IL",
			"desc": "Ogle County",
			"code": 2514
		},
		{
			"stateCd": "IL",
			"desc": "Peoria County",
			"code": 2515
		},
		{
			"stateCd": "IL",
			"desc": "Perry County",
			"code": 2516
		},
		{
			"stateCd": "IL",
			"desc": "Piatt County",
			"code": 2517
		},
		{
			"stateCd": "IL",
			"desc": "Pike County",
			"code": 2518
		},
		{
			"stateCd": "IL",
			"desc": "Pope County",
			"code": 2519
		},
		{
			"stateCd": "IL",
			"desc": "Pulaski County",
			"code": 2520
		},
		{
			"stateCd": "IL",
			"desc": "Putnam County",
			"code": 2521
		},
		{
			"stateCd": "IL",
			"desc": "Randolph County",
			"code": 2522
		},
		{
			"stateCd": "IL",
			"desc": "Richland County",
			"code": 2523
		},
		{
			"stateCd": "IL",
			"desc": "Rock Island County",
			"code": 2524
		},
		{
			"stateCd": "IL",
			"desc": "Saline County",
			"code": 2526
		},
		{
			"stateCd": "IL",
			"desc": "Sangamon County",
			"code": 2527
		},
		{
			"stateCd": "IL",
			"desc": "Schuyler County",
			"code": 2528
		},
		{
			"stateCd": "IL",
			"desc": "Scott County",
			"code": 2529
		},
		{
			"stateCd": "IL",
			"desc": "Shelby County",
			"code": 2530
		},
		{
			"stateCd": "IL",
			"desc": "St. Clair County",
			"code": 2525
		},
		{
			"stateCd": "IL",
			"desc": "Stark County",
			"code": 2531
		},
		{
			"stateCd": "IL",
			"desc": "Stephenson County",
			"code": 2532
		},
		{
			"stateCd": "IL",
			"desc": "Tazewell County",
			"code": 2533
		},
		{
			"stateCd": "IL",
			"desc": "Union County",
			"code": 2534
		},
		{
			"stateCd": "IL",
			"desc": "Vermilion County",
			"code": 2535
		},
		{
			"stateCd": "IL",
			"desc": "Wabash County",
			"code": 2536
		},
		{
			"stateCd": "IL",
			"desc": "Warren County",
			"code": 2537
		},
		{
			"stateCd": "IL",
			"desc": "Washington County",
			"code": 2538
		},
		{
			"stateCd": "IL",
			"desc": "Wayne County",
			"code": 2539
		},
		{
			"stateCd": "IL",
			"desc": "White County",
			"code": 2540
		},
		{
			"stateCd": "IL",
			"desc": "Whiteside County",
			"code": 2541
		},
		{
			"stateCd": "IL",
			"desc": "Will County",
			"code": 2542
		},
		{
			"stateCd": "IL",
			"desc": "Williamson County",
			"code": 2543
		},
		{
			"stateCd": "IL",
			"desc": "Winnebago County",
			"code": 2544
		},
		{
			"stateCd": "IL",
			"desc": "Woodford County",
			"code": 2545
		},
		{
			"stateCd": "IN",
			"desc": "Adams County",
			"code": 2546
		},
		{
			"stateCd": "IN",
			"desc": "Allen County",
			"code": 2547
		},
		{
			"stateCd": "IN",
			"desc": "Bartholomew County",
			"code": 2548
		},
		{
			"stateCd": "IN",
			"desc": "Benton County",
			"code": 2549
		},
		{
			"stateCd": "IN",
			"desc": "Blackford County",
			"code": 2550
		},
		{
			"stateCd": "IN",
			"desc": "Boone County",
			"code": 2551
		},
		{
			"stateCd": "IN",
			"desc": "Brown County",
			"code": 2552
		},
		{
			"stateCd": "IN",
			"desc": "Carroll County",
			"code": 2553
		},
		{
			"stateCd": "IN",
			"desc": "Cass County",
			"code": 2554
		},
		{
			"stateCd": "IN",
			"desc": "Clark County",
			"code": 2555
		},
		{
			"stateCd": "IN",
			"desc": "Clay County",
			"code": 2556
		},
		{
			"stateCd": "IN",
			"desc": "Clinton County",
			"code": 2557
		},
		{
			"stateCd": "IN",
			"desc": "Crawford County",
			"code": 2558
		},
		{
			"stateCd": "IN",
			"desc": "Daviess County",
			"code": 2559
		},
		{
			"stateCd": "IN",
			"desc": "Dearborn County",
			"code": 2560
		},
		{
			"stateCd": "IN",
			"desc": "Decatur County",
			"code": 2561
		},
		{
			"stateCd": "IN",
			"desc": "DeKalb County",
			"code": 2562
		},
		{
			"stateCd": "IN",
			"desc": "Delaware County",
			"code": 2563
		},
		{
			"stateCd": "IN",
			"desc": "Dubois County",
			"code": 2564
		},
		{
			"stateCd": "IN",
			"desc": "Elkhart County",
			"code": 2565
		},
		{
			"stateCd": "IN",
			"desc": "Fayette County",
			"code": 2566
		},
		{
			"stateCd": "IN",
			"desc": "Floyd County",
			"code": 2567
		},
		{
			"stateCd": "IN",
			"desc": "Fountain County",
			"code": 2568
		},
		{
			"stateCd": "IN",
			"desc": "Franklin County",
			"code": 2569
		},
		{
			"stateCd": "IN",
			"desc": "Fulton County",
			"code": 2570
		},
		{
			"stateCd": "IN",
			"desc": "Gibson County",
			"code": 2571
		},
		{
			"stateCd": "IN",
			"desc": "Grant County",
			"code": 2572
		},
		{
			"stateCd": "IN",
			"desc": "Greene County",
			"code": 2573
		},
		{
			"stateCd": "IN",
			"desc": "Hamilton County",
			"code": 2574
		},
		{
			"stateCd": "IN",
			"desc": "Hancock County",
			"code": 2575
		},
		{
			"stateCd": "IN",
			"desc": "Harrison County",
			"code": 2576
		},
		{
			"stateCd": "IN",
			"desc": "Hendricks County",
			"code": 2577
		},
		{
			"stateCd": "IN",
			"desc": "Henry County",
			"code": 2578
		},
		{
			"stateCd": "IN",
			"desc": "Howard County",
			"code": 2579
		},
		{
			"stateCd": "IN",
			"desc": "Huntington County",
			"code": 2580
		},
		{
			"stateCd": "IN",
			"desc": "Jackson County",
			"code": 2581
		},
		{
			"stateCd": "IN",
			"desc": "Jasper County",
			"code": 2582
		},
		{
			"stateCd": "IN",
			"desc": "Jay County",
			"code": 2583
		},
		{
			"stateCd": "IN",
			"desc": "Jefferson County",
			"code": 2584
		},
		{
			"stateCd": "IN",
			"desc": "Jennings County",
			"code": 2585
		},
		{
			"stateCd": "IN",
			"desc": "Johnson County",
			"code": 2586
		},
		{
			"stateCd": "IN",
			"desc": "Knox County",
			"code": 2587
		},
		{
			"stateCd": "IN",
			"desc": "Kosciusko County",
			"code": 2588
		},
		{
			"stateCd": "IN",
			"desc": "LaGrange County",
			"code": 2589
		},
		{
			"stateCd": "IN",
			"desc": "Lake County",
			"code": 2590
		},
		{
			"stateCd": "IN",
			"desc": "LaPorte County",
			"code": 2591
		},
		{
			"stateCd": "IN",
			"desc": "Lawrence County",
			"code": 2592
		},
		{
			"stateCd": "IN",
			"desc": "Madison County",
			"code": 2593
		},
		{
			"stateCd": "IN",
			"desc": "Marion County",
			"code": 2594
		},
		{
			"stateCd": "IN",
			"desc": "Marshall County",
			"code": 2595
		},
		{
			"stateCd": "IN",
			"desc": "Martin County",
			"code": 2596
		},
		{
			"stateCd": "IN",
			"desc": "Miami County",
			"code": 2597
		},
		{
			"stateCd": "IN",
			"desc": "Monroe County",
			"code": 2598
		},
		{
			"stateCd": "IN",
			"desc": "Montgomery County",
			"code": 2599
		},
		{
			"stateCd": "IN",
			"desc": "Morgan County",
			"code": 2600
		},
		{
			"stateCd": "IN",
			"desc": "Newton County",
			"code": 2601
		},
		{
			"stateCd": "IN",
			"desc": "Noble County",
			"code": 2602
		},
		{
			"stateCd": "IN",
			"desc": "Ohio County",
			"code": 2603
		},
		{
			"stateCd": "IN",
			"desc": "Orange County",
			"code": 2604
		},
		{
			"stateCd": "IN",
			"desc": "Owen County",
			"code": 2605
		},
		{
			"stateCd": "IN",
			"desc": "Parke County",
			"code": 2606
		},
		{
			"stateCd": "IN",
			"desc": "Perry County",
			"code": 2607
		},
		{
			"stateCd": "IN",
			"desc": "Pike County",
			"code": 2608
		},
		{
			"stateCd": "IN",
			"desc": "Porter County",
			"code": 2609
		},
		{
			"stateCd": "IN",
			"desc": "Posey County",
			"code": 2610
		},
		{
			"stateCd": "IN",
			"desc": "Pulaski County",
			"code": 2611
		},
		{
			"stateCd": "IN",
			"desc": "Putnam County",
			"code": 2612
		},
		{
			"stateCd": "IN",
			"desc": "Randolph County",
			"code": 2613
		},
		{
			"stateCd": "IN",
			"desc": "Ripley County",
			"code": 2614
		},
		{
			"stateCd": "IN",
			"desc": "Rush County",
			"code": 2615
		},
		{
			"stateCd": "IN",
			"desc": "Scott County",
			"code": 2617
		},
		{
			"stateCd": "IN",
			"desc": "Shelby County",
			"code": 2618
		},
		{
			"stateCd": "IN",
			"desc": "Spencer County",
			"code": 2619
		},
		{
			"stateCd": "IN",
			"desc": "St. Joseph County",
			"code": 2616
		},
		{
			"stateCd": "IN",
			"desc": "Starke County",
			"code": 2620
		},
		{
			"stateCd": "IN",
			"desc": "Steuben County",
			"code": 2621
		},
		{
			"stateCd": "IN",
			"desc": "Sullivan County",
			"code": 2622
		},
		{
			"stateCd": "IN",
			"desc": "Switzerland County",
			"code": 2623
		},
		{
			"stateCd": "IN",
			"desc": "Tippecanoe County",
			"code": 2624
		},
		{
			"stateCd": "IN",
			"desc": "Tipton County",
			"code": 2625
		},
		{
			"stateCd": "IN",
			"desc": "Union County",
			"code": 2626
		},
		{
			"stateCd": "IN",
			"desc": "Vanderburgh County",
			"code": 2627
		},
		{
			"stateCd": "IN",
			"desc": "Vermillion County",
			"code": 2628
		},
		{
			"stateCd": "IN",
			"desc": "Vigo County",
			"code": 2629
		},
		{
			"stateCd": "IN",
			"desc": "Wabash County",
			"code": 2630
		},
		{
			"stateCd": "IN",
			"desc": "Warren County",
			"code": 2631
		},
		{
			"stateCd": "IN",
			"desc": "Warrick County",
			"code": 2632
		},
		{
			"stateCd": "IN",
			"desc": "Washington County",
			"code": 2633
		},
		{
			"stateCd": "IN",
			"desc": "Wayne County",
			"code": 2634
		},
		{
			"stateCd": "IN",
			"desc": "Wells County",
			"code": 2635
		},
		{
			"stateCd": "IN",
			"desc": "White County",
			"code": 2636
		},
		{
			"stateCd": "IN",
			"desc": "Whitley County",
			"code": 2637
		},
		{
			"stateCd": "KS",
			"desc": "Allen County",
			"code": 2737
		},
		{
			"stateCd": "KS",
			"desc": "Anderson County",
			"code": 2738
		},
		{
			"stateCd": "KS",
			"desc": "Atchison County",
			"code": 2739
		},
		{
			"stateCd": "KS",
			"desc": "Barber County",
			"code": 2740
		},
		{
			"stateCd": "KS",
			"desc": "Barton County",
			"code": 2741
		},
		{
			"stateCd": "KS",
			"desc": "Bourbon County",
			"code": 2742
		},
		{
			"stateCd": "KS",
			"desc": "Brown County",
			"code": 2743
		},
		{
			"stateCd": "KS",
			"desc": "Butler County",
			"code": 2744
		},
		{
			"stateCd": "KS",
			"desc": "Chase County",
			"code": 2745
		},
		{
			"stateCd": "KS",
			"desc": "Chautauqua County",
			"code": 2746
		},
		{
			"stateCd": "KS",
			"desc": "Cherokee County",
			"code": 2747
		},
		{
			"stateCd": "KS",
			"desc": "Cheyenne County",
			"code": 2748
		},
		{
			"stateCd": "KS",
			"desc": "Clark County",
			"code": 2749
		},
		{
			"stateCd": "KS",
			"desc": "Clay County",
			"code": 2750
		},
		{
			"stateCd": "KS",
			"desc": "Cloud County",
			"code": 2751
		},
		{
			"stateCd": "KS",
			"desc": "Coffey County",
			"code": 2752
		},
		{
			"stateCd": "KS",
			"desc": "Comanche County",
			"code": 2753
		},
		{
			"stateCd": "KS",
			"desc": "Cowley County",
			"code": 2754
		},
		{
			"stateCd": "KS",
			"desc": "Crawford County",
			"code": 2755
		},
		{
			"stateCd": "KS",
			"desc": "Decatur County",
			"code": 2756
		},
		{
			"stateCd": "KS",
			"desc": "Dickinson County",
			"code": 2757
		},
		{
			"stateCd": "KS",
			"desc": "Doniphan County",
			"code": 2758
		},
		{
			"stateCd": "KS",
			"desc": "Douglas County",
			"code": 2759
		},
		{
			"stateCd": "KS",
			"desc": "Edwards County",
			"code": 2760
		},
		{
			"stateCd": "KS",
			"desc": "Elk County",
			"code": 2761
		},
		{
			"stateCd": "KS",
			"desc": "Ellis County",
			"code": 2762
		},
		{
			"stateCd": "KS",
			"desc": "Ellsworth County",
			"code": 2763
		},
		{
			"stateCd": "KS",
			"desc": "Finney County",
			"code": 2764
		},
		{
			"stateCd": "KS",
			"desc": "Ford County",
			"code": 4988
		},
		{
			"stateCd": "KS",
			"desc": "Franklin County",
			"code": 2765
		},
		{
			"stateCd": "KS",
			"desc": "Geary County",
			"code": 2766
		},
		{
			"stateCd": "KS",
			"desc": "Gove County",
			"code": 2767
		},
		{
			"stateCd": "KS",
			"desc": "Graham County",
			"code": 2768
		},
		{
			"stateCd": "KS",
			"desc": "Grant County",
			"code": 2769
		},
		{
			"stateCd": "KS",
			"desc": "Gray County",
			"code": 2770
		},
		{
			"stateCd": "KS",
			"desc": "Greeley County",
			"code": 2771
		},
		{
			"stateCd": "KS",
			"desc": "Greenwood County",
			"code": 2772
		},
		{
			"stateCd": "KS",
			"desc": "Hamilton County",
			"code": 2773
		},
		{
			"stateCd": "KS",
			"desc": "Harper County",
			"code": 2774
		},
		{
			"stateCd": "KS",
			"desc": "Harvey County",
			"code": 2775
		},
		{
			"stateCd": "KS",
			"desc": "Haskell County",
			"code": 2776
		},
		{
			"stateCd": "KS",
			"desc": "Hodgeman County",
			"code": 2777
		},
		{
			"stateCd": "KS",
			"desc": "Jackson County",
			"code": 2778
		},
		{
			"stateCd": "KS",
			"desc": "Jefferson County",
			"code": 2779
		},
		{
			"stateCd": "KS",
			"desc": "Jewell County",
			"code": 2780
		},
		{
			"stateCd": "KS",
			"desc": "Johnson County",
			"code": 2781
		},
		{
			"stateCd": "KS",
			"desc": "Kearny County",
			"code": 2782
		},
		{
			"stateCd": "KS",
			"desc": "Kingman County",
			"code": 2783
		},
		{
			"stateCd": "KS",
			"desc": "Kiowa County",
			"code": 2784
		},
		{
			"stateCd": "KS",
			"desc": "Labette County",
			"code": 2785
		},
		{
			"stateCd": "KS",
			"desc": "Lane County",
			"code": 2786
		},
		{
			"stateCd": "KS",
			"desc": "Leavenworth County",
			"code": 2787
		},
		{
			"stateCd": "KS",
			"desc": "Lincoln County",
			"code": 2788
		},
		{
			"stateCd": "KS",
			"desc": "Linn County",
			"code": 2789
		},
		{
			"stateCd": "KS",
			"desc": "Logan County",
			"code": 2790
		},
		{
			"stateCd": "KS",
			"desc": "Lyon County",
			"code": 2791
		},
		{
			"stateCd": "KS",
			"desc": "Marion County",
			"code": 2793
		},
		{
			"stateCd": "KS",
			"desc": "Marshall County",
			"code": 2794
		},
		{
			"stateCd": "KS",
			"desc": "McPherson County",
			"code": 2792
		},
		{
			"stateCd": "KS",
			"desc": "Meade County",
			"code": 2795
		},
		{
			"stateCd": "KS",
			"desc": "Miami County",
			"code": 2796
		},
		{
			"stateCd": "KS",
			"desc": "Mitchell County",
			"code": 2797
		},
		{
			"stateCd": "KS",
			"desc": "Montgomery County",
			"code": 2798
		},
		{
			"stateCd": "KS",
			"desc": "Morris County",
			"code": 2799
		},
		{
			"stateCd": "KS",
			"desc": "Morton County",
			"code": 2800
		},
		{
			"stateCd": "KS",
			"desc": "Nemaha County",
			"code": 2801
		},
		{
			"stateCd": "KS",
			"desc": "Neosho County",
			"code": 2802
		},
		{
			"stateCd": "KS",
			"desc": "Ness County",
			"code": 2803
		},
		{
			"stateCd": "KS",
			"desc": "Norton County",
			"code": 2804
		},
		{
			"stateCd": "KS",
			"desc": "Osage County",
			"code": 2805
		},
		{
			"stateCd": "KS",
			"desc": "Osborne County",
			"code": 2806
		},
		{
			"stateCd": "KS",
			"desc": "Ottawa County",
			"code": 2807
		},
		{
			"stateCd": "KS",
			"desc": "Pawnee County",
			"code": 2808
		},
		{
			"stateCd": "KS",
			"desc": "Phillips County",
			"code": 2809
		},
		{
			"stateCd": "KS",
			"desc": "Pottawatomie County",
			"code": 2810
		},
		{
			"stateCd": "KS",
			"desc": "Pratt County",
			"code": 2811
		},
		{
			"stateCd": "KS",
			"desc": "Rawlins County",
			"code": 2812
		},
		{
			"stateCd": "KS",
			"desc": "Reno County",
			"code": 2813
		},
		{
			"stateCd": "KS",
			"desc": "Republic County",
			"code": 2814
		},
		{
			"stateCd": "KS",
			"desc": "Rice County",
			"code": 2815
		},
		{
			"stateCd": "KS",
			"desc": "Riley County",
			"code": 2816
		},
		{
			"stateCd": "KS",
			"desc": "Rooks County",
			"code": 2817
		},
		{
			"stateCd": "KS",
			"desc": "Rush County",
			"code": 2818
		},
		{
			"stateCd": "KS",
			"desc": "Russell County",
			"code": 2819
		},
		{
			"stateCd": "KS",
			"desc": "Saline County",
			"code": 2820
		},
		{
			"stateCd": "KS",
			"desc": "Scott County",
			"code": 2821
		},
		{
			"stateCd": "KS",
			"desc": "Sedgwick County",
			"code": 2822
		},
		{
			"stateCd": "KS",
			"desc": "Seward County",
			"code": 2823
		},
		{
			"stateCd": "KS",
			"desc": "Shawnee County",
			"code": 2824
		},
		{
			"stateCd": "KS",
			"desc": "Sheridan County",
			"code": 2825
		},
		{
			"stateCd": "KS",
			"desc": "Sherman County",
			"code": 2826
		},
		{
			"stateCd": "KS",
			"desc": "Smith County",
			"code": 2827
		},
		{
			"stateCd": "KS",
			"desc": "Stafford County",
			"code": 2828
		},
		{
			"stateCd": "KS",
			"desc": "Stanton County",
			"code": 2829
		},
		{
			"stateCd": "KS",
			"desc": "Stevens County",
			"code": 2830
		},
		{
			"stateCd": "KS",
			"desc": "Sumner County",
			"code": 2831
		},
		{
			"stateCd": "KS",
			"desc": "Thomas County",
			"code": 2832
		},
		{
			"stateCd": "KS",
			"desc": "Trego County",
			"code": 2833
		},
		{
			"stateCd": "KS",
			"desc": "Wabaunsee County",
			"code": 2834
		},
		{
			"stateCd": "KS",
			"desc": "Wallace County",
			"code": 2835
		},
		{
			"stateCd": "KS",
			"desc": "Washington County",
			"code": 2836
		},
		{
			"stateCd": "KS",
			"desc": "Wichita County",
			"code": 2837
		},
		{
			"stateCd": "KS",
			"desc": "Wilson County",
			"code": 2838
		},
		{
			"stateCd": "KS",
			"desc": "Woodson County",
			"code": 2839
		},
		{
			"stateCd": "KS",
			"desc": "Wyandotte County",
			"code": 2840
		},
		{
			"stateCd": "KY",
			"desc": "Adair County",
			"code": 2841
		},
		{
			"stateCd": "KY",
			"desc": "Allen County",
			"code": 2842
		},
		{
			"stateCd": "KY",
			"desc": "Anderson County",
			"code": 2843
		},
		{
			"stateCd": "KY",
			"desc": "Ballard County",
			"code": 2844
		},
		{
			"stateCd": "KY",
			"desc": "Barren County",
			"code": 2845
		},
		{
			"stateCd": "KY",
			"desc": "Bath County",
			"code": 2846
		},
		{
			"stateCd": "KY",
			"desc": "Bell County",
			"code": 2847
		},
		{
			"stateCd": "KY",
			"desc": "Boone County",
			"code": 2848
		},
		{
			"stateCd": "KY",
			"desc": "Bourbon County",
			"code": 2849
		},
		{
			"stateCd": "KY",
			"desc": "Boyd County",
			"code": 2850
		},
		{
			"stateCd": "KY",
			"desc": "Boyle County",
			"code": 2851
		},
		{
			"stateCd": "KY",
			"desc": "Bracken County",
			"code": 2852
		},
		{
			"stateCd": "KY",
			"desc": "Breathitt County",
			"code": 2853
		},
		{
			"stateCd": "KY",
			"desc": "Breckinridge County",
			"code": 2854
		},
		{
			"stateCd": "KY",
			"desc": "Bullitt County",
			"code": 2855
		},
		{
			"stateCd": "KY",
			"desc": "Butler County",
			"code": 2856
		},
		{
			"stateCd": "KY",
			"desc": "Caldwell County",
			"code": 2857
		},
		{
			"stateCd": "KY",
			"desc": "Calloway County",
			"code": 2858
		},
		{
			"stateCd": "KY",
			"desc": "Campbell County",
			"code": 2859
		},
		{
			"stateCd": "KY",
			"desc": "Carlisle County",
			"code": 2860
		},
		{
			"stateCd": "KY",
			"desc": "Carroll County",
			"code": 2861
		},
		{
			"stateCd": "KY",
			"desc": "Carter County",
			"code": 2862
		},
		{
			"stateCd": "KY",
			"desc": "Casey County",
			"code": 2863
		},
		{
			"stateCd": "KY",
			"desc": "Christian County",
			"code": 2864
		},
		{
			"stateCd": "KY",
			"desc": "Clark County",
			"code": 2865
		},
		{
			"stateCd": "KY",
			"desc": "Clay County",
			"code": 2866
		},
		{
			"stateCd": "KY",
			"desc": "Clinton County",
			"code": 2867
		},
		{
			"stateCd": "KY",
			"desc": "Crittenden County",
			"code": 2868
		},
		{
			"stateCd": "KY",
			"desc": "Cumberland County",
			"code": 2869
		},
		{
			"stateCd": "KY",
			"desc": "Daviess County",
			"code": 2870
		},
		{
			"stateCd": "KY",
			"desc": "Edmonson County",
			"code": 2871
		},
		{
			"stateCd": "KY",
			"desc": "Elliott County",
			"code": 2872
		},
		{
			"stateCd": "KY",
			"desc": "Estill County",
			"code": 2873
		},
		{
			"stateCd": "KY",
			"desc": "Fayette County",
			"code": 2874
		},
		{
			"stateCd": "KY",
			"desc": "Fleming County",
			"code": 2875
		},
		{
			"stateCd": "KY",
			"desc": "Floyd County",
			"code": 2876
		},
		{
			"stateCd": "KY",
			"desc": "Franklin County",
			"code": 2877
		},
		{
			"stateCd": "KY",
			"desc": "Fulton County",
			"code": 2878
		},
		{
			"stateCd": "KY",
			"desc": "Gallatin County",
			"code": 2879
		},
		{
			"stateCd": "KY",
			"desc": "Garrard County",
			"code": 2880
		},
		{
			"stateCd": "KY",
			"desc": "Grant County",
			"code": 2881
		},
		{
			"stateCd": "KY",
			"desc": "Graves County",
			"code": 2882
		},
		{
			"stateCd": "KY",
			"desc": "Grayson County",
			"code": 2883
		},
		{
			"stateCd": "KY",
			"desc": "Green County",
			"code": 2884
		},
		{
			"stateCd": "KY",
			"desc": "Greenup County",
			"code": 2885
		},
		{
			"stateCd": "KY",
			"desc": "Hancock County",
			"code": 2886
		},
		{
			"stateCd": "KY",
			"desc": "Hardin County",
			"code": 2887
		},
		{
			"stateCd": "KY",
			"desc": "Harlan County",
			"code": 2888
		},
		{
			"stateCd": "KY",
			"desc": "Harrison County",
			"code": 2889
		},
		{
			"stateCd": "KY",
			"desc": "Hart County",
			"code": 2890
		},
		{
			"stateCd": "KY",
			"desc": "Henderson County",
			"code": 2891
		},
		{
			"stateCd": "KY",
			"desc": "Henry County",
			"code": 2892
		},
		{
			"stateCd": "KY",
			"desc": "Hickman County",
			"code": 2893
		},
		{
			"stateCd": "KY",
			"desc": "Hopkins County",
			"code": 2894
		},
		{
			"stateCd": "KY",
			"desc": "Jackson County",
			"code": 2895
		},
		{
			"stateCd": "KY",
			"desc": "Jefferson County",
			"code": 2896
		},
		{
			"stateCd": "KY",
			"desc": "Jessamine County",
			"code": 2897
		},
		{
			"stateCd": "KY",
			"desc": "Johnson County",
			"code": 2898
		},
		{
			"stateCd": "KY",
			"desc": "Kenton County",
			"code": 2899
		},
		{
			"stateCd": "KY",
			"desc": "Knott County",
			"code": 2900
		},
		{
			"stateCd": "KY",
			"desc": "Knox County",
			"code": 2901
		},
		{
			"stateCd": "KY",
			"desc": "Larue County",
			"code": 2902
		},
		{
			"stateCd": "KY",
			"desc": "Laurel County",
			"code": 2903
		},
		{
			"stateCd": "KY",
			"desc": "Lawrence County",
			"code": 2904
		},
		{
			"stateCd": "KY",
			"desc": "Lee County",
			"code": 2905
		},
		{
			"stateCd": "KY",
			"desc": "Leslie County",
			"code": 2906
		},
		{
			"stateCd": "KY",
			"desc": "Letcher County",
			"code": 2907
		},
		{
			"stateCd": "KY",
			"desc": "Lewis County",
			"code": 2908
		},
		{
			"stateCd": "KY",
			"desc": "Lincoln County",
			"code": 2909
		},
		{
			"stateCd": "KY",
			"desc": "Livingston County",
			"code": 2910
		},
		{
			"stateCd": "KY",
			"desc": "Logan County",
			"code": 2911
		},
		{
			"stateCd": "KY",
			"desc": "Lyon County",
			"code": 2912
		},
		{
			"stateCd": "KY",
			"desc": "Madison County",
			"code": 2916
		},
		{
			"stateCd": "KY",
			"desc": "Magoffin County",
			"code": 2917
		},
		{
			"stateCd": "KY",
			"desc": "Marion County",
			"code": 2918
		},
		{
			"stateCd": "KY",
			"desc": "Marshall County",
			"code": 2919
		},
		{
			"stateCd": "KY",
			"desc": "Martin County",
			"code": 2920
		},
		{
			"stateCd": "KY",
			"desc": "Mason County",
			"code": 2921
		},
		{
			"stateCd": "KY",
			"desc": "McCracken County",
			"code": 2913
		},
		{
			"stateCd": "KY",
			"desc": "McCreary County",
			"code": 2914
		},
		{
			"stateCd": "KY",
			"desc": "McLean County",
			"code": 2915
		},
		{
			"stateCd": "KY",
			"desc": "Meade County",
			"code": 2922
		},
		{
			"stateCd": "KY",
			"desc": "Menifee County",
			"code": 2923
		},
		{
			"stateCd": "KY",
			"desc": "Mercer County",
			"code": 2924
		},
		{
			"stateCd": "KY",
			"desc": "Metcalfe County",
			"code": 2925
		},
		{
			"stateCd": "KY",
			"desc": "Monroe County",
			"code": 2926
		},
		{
			"stateCd": "KY",
			"desc": "Montgomery County",
			"code": 2927
		},
		{
			"stateCd": "KY",
			"desc": "Morgan County",
			"code": 2928
		},
		{
			"stateCd": "KY",
			"desc": "Muhlenberg County",
			"code": 2929
		},
		{
			"stateCd": "KY",
			"desc": "Nelson County",
			"code": 2930
		},
		{
			"stateCd": "KY",
			"desc": "Nicholas County",
			"code": 2931
		},
		{
			"stateCd": "KY",
			"desc": "Ohio County",
			"code": 2932
		},
		{
			"stateCd": "KY",
			"desc": "Oldham County",
			"code": 2933
		},
		{
			"stateCd": "KY",
			"desc": "Owen County",
			"code": 2934
		},
		{
			"stateCd": "KY",
			"desc": "Owsley County",
			"code": 2935
		},
		{
			"stateCd": "KY",
			"desc": "Pendleton County",
			"code": 2936
		},
		{
			"stateCd": "KY",
			"desc": "Perry County",
			"code": 2937
		},
		{
			"stateCd": "KY",
			"desc": "Pike County",
			"code": 2938
		},
		{
			"stateCd": "KY",
			"desc": "Powell County",
			"code": 2939
		},
		{
			"stateCd": "KY",
			"desc": "Pulaski County",
			"code": 2940
		},
		{
			"stateCd": "KY",
			"desc": "Robertson County",
			"code": 2941
		},
		{
			"stateCd": "KY",
			"desc": "Rockcastle County",
			"code": 2942
		},
		{
			"stateCd": "KY",
			"desc": "Rowan County",
			"code": 2943
		},
		{
			"stateCd": "KY",
			"desc": "Russell County",
			"code": 2944
		},
		{
			"stateCd": "KY",
			"desc": "Scott County",
			"code": 2945
		},
		{
			"stateCd": "KY",
			"desc": "Shelby County",
			"code": 2946
		},
		{
			"stateCd": "KY",
			"desc": "Simpson County",
			"code": 2947
		},
		{
			"stateCd": "KY",
			"desc": "Spencer County",
			"code": 2948
		},
		{
			"stateCd": "KY",
			"desc": "Taylor County",
			"code": 2949
		},
		{
			"stateCd": "KY",
			"desc": "Todd County",
			"code": 2950
		},
		{
			"stateCd": "KY",
			"desc": "Trigg County",
			"code": 2951
		},
		{
			"stateCd": "KY",
			"desc": "Trimble County",
			"code": 2952
		},
		{
			"stateCd": "KY",
			"desc": "Union County",
			"code": 2953
		},
		{
			"stateCd": "KY",
			"desc": "Warren County",
			"code": 2954
		},
		{
			"stateCd": "KY",
			"desc": "Washington County",
			"code": 2955
		},
		{
			"stateCd": "KY",
			"desc": "Wayne County",
			"code": 2956
		},
		{
			"stateCd": "KY",
			"desc": "Webster County",
			"code": 2957
		},
		{
			"stateCd": "KY",
			"desc": "Whitley County",
			"code": 2958
		},
		{
			"stateCd": "KY",
			"desc": "Wolfe County",
			"code": 2959
		},
		{
			"stateCd": "KY",
			"desc": "Woodford County",
			"code": 2960
		},
		{
			"stateCd": "LA",
			"desc": "Acadia Parish",
			"code": 2961
		},
		{
			"stateCd": "LA",
			"desc": "Allen Parish",
			"code": 2962
		},
		{
			"stateCd": "LA",
			"desc": "Ascension Parish",
			"code": 2963
		},
		{
			"stateCd": "LA",
			"desc": "Assumption Parish",
			"code": 2964
		},
		{
			"stateCd": "LA",
			"desc": "Avoyelles Parish",
			"code": 2965
		},
		{
			"stateCd": "LA",
			"desc": "Beauregard Parish",
			"code": 2966
		},
		{
			"stateCd": "LA",
			"desc": "Bienville Parish",
			"code": 2967
		},
		{
			"stateCd": "LA",
			"desc": "Bossier Parish",
			"code": 2968
		},
		{
			"stateCd": "LA",
			"desc": "Caddo Parish",
			"code": 2969
		},
		{
			"stateCd": "LA",
			"desc": "Calcasieu Parish",
			"code": 2970
		},
		{
			"stateCd": "LA",
			"desc": "Caldwell Parish",
			"code": 2971
		},
		{
			"stateCd": "LA",
			"desc": "Cameron Parish",
			"code": 2972
		},
		{
			"stateCd": "LA",
			"desc": "Catahoula Parish",
			"code": 2973
		},
		{
			"stateCd": "LA",
			"desc": "Claiborne Parish",
			"code": 2974
		},
		{
			"stateCd": "LA",
			"desc": "Concordia Parish",
			"code": 2975
		},
		{
			"stateCd": "LA",
			"desc": "De Soto Parish",
			"code": 2976
		},
		{
			"stateCd": "LA",
			"desc": "East Baton Rouge Parish",
			"code": 2977
		},
		{
			"stateCd": "LA",
			"desc": "East Carroll Parish",
			"code": 2978
		},
		{
			"stateCd": "LA",
			"desc": "East Feliciana Parish",
			"code": 2979
		},
		{
			"stateCd": "LA",
			"desc": "Evangeline Parish",
			"code": 2980
		},
		{
			"stateCd": "LA",
			"desc": "Franklin Parish",
			"code": 2981
		},
		{
			"stateCd": "LA",
			"desc": "Grant Parish",
			"code": 2982
		},
		{
			"stateCd": "LA",
			"desc": "Iberia Parish",
			"code": 2983
		},
		{
			"stateCd": "LA",
			"desc": "Iberville Parish",
			"code": 2984
		},
		{
			"stateCd": "LA",
			"desc": "Jackson Parish",
			"code": 2985
		},
		{
			"stateCd": "LA",
			"desc": "Jefferson Davis Parish",
			"code": 2987
		},
		{
			"stateCd": "LA",
			"desc": "Jefferson Parish",
			"code": 2986
		},
		{
			"stateCd": "LA",
			"desc": "La Salle Parish",
			"code": 2990
		},
		{
			"stateCd": "LA",
			"desc": "Lafayette Parish",
			"code": 2988
		},
		{
			"stateCd": "LA",
			"desc": "Lafourche Parish",
			"code": 2989
		},
		{
			"stateCd": "LA",
			"desc": "Lincoln Parish",
			"code": 2991
		},
		{
			"stateCd": "LA",
			"desc": "Livingston Parish",
			"code": 2992
		},
		{
			"stateCd": "LA",
			"desc": "Madison Parish",
			"code": 2993
		},
		{
			"stateCd": "LA",
			"desc": "Morehouse Parish",
			"code": 2994
		},
		{
			"stateCd": "LA",
			"desc": "Natchitoches Parish",
			"code": 2995
		},
		{
			"stateCd": "LA",
			"desc": "Orleans Parish",
			"code": 2996
		},
		{
			"stateCd": "LA",
			"desc": "Ouachita Parish",
			"code": 2997
		},
		{
			"stateCd": "LA",
			"desc": "Plaquemines Parish",
			"code": 2998
		},
		{
			"stateCd": "LA",
			"desc": "Pointe Coupee Parish",
			"code": 2999
		},
		{
			"stateCd": "LA",
			"desc": "Rapides Parish",
			"code": 3000
		},
		{
			"stateCd": "LA",
			"desc": "Red River Parish",
			"code": 3001
		},
		{
			"stateCd": "LA",
			"desc": "Richland Parish",
			"code": 3002
		},
		{
			"stateCd": "LA",
			"desc": "Sabine Parish",
			"code": 3003
		},
		{
			"stateCd": "LA",
			"desc": "St. Bernard Parish",
			"code": 3004
		},
		{
			"stateCd": "LA",
			"desc": "St. Charles Parish",
			"code": 3005
		},
		{
			"stateCd": "LA",
			"desc": "St. Helena Parish",
			"code": 3006
		},
		{
			"stateCd": "LA",
			"desc": "St. James Parish",
			"code": 3007
		},
		{
			"stateCd": "LA",
			"desc": "St. John the Baptist Parish",
			"code": 3008
		},
		{
			"stateCd": "LA",
			"desc": "St. Landry Parish",
			"code": 3009
		},
		{
			"stateCd": "LA",
			"desc": "St. Martin Parish",
			"code": 3010
		},
		{
			"stateCd": "LA",
			"desc": "St. Mary Parish",
			"code": 3011
		},
		{
			"stateCd": "LA",
			"desc": "St. Tammany Parish",
			"code": 3012
		},
		{
			"stateCd": "LA",
			"desc": "Tangipahoa Parish",
			"code": 3013
		},
		{
			"stateCd": "LA",
			"desc": "Tensas Parish",
			"code": 3014
		},
		{
			"stateCd": "LA",
			"desc": "Terrebonne Parish",
			"code": 3015
		},
		{
			"stateCd": "LA",
			"desc": "Union Parish",
			"code": 3016
		},
		{
			"stateCd": "LA",
			"desc": "Vermilion Parish",
			"code": 3017
		},
		{
			"stateCd": "LA",
			"desc": "Vernon Parish",
			"code": 3018
		},
		{
			"stateCd": "LA",
			"desc": "Washington Parish",
			"code": 3019
		},
		{
			"stateCd": "LA",
			"desc": "Webster Parish",
			"code": 3020
		},
		{
			"stateCd": "LA",
			"desc": "West Baton Rouge Parish",
			"code": 3021
		},
		{
			"stateCd": "LA",
			"desc": "West Carroll Parish",
			"code": 3022
		},
		{
			"stateCd": "LA",
			"desc": "West Feliciana Parish",
			"code": 3023
		},
		{
			"stateCd": "LA",
			"desc": "Winn Parish",
			"code": 3024
		},
		{
			"stateCd": "MA",
			"desc": "Barnstable County",
			"code": 3065
		},
		{
			"stateCd": "MA",
			"desc": "Berkshire County",
			"code": 3066
		},
		{
			"stateCd": "MA",
			"desc": "Bristol County",
			"code": 3067
		},
		{
			"stateCd": "MA",
			"desc": "Dukes County",
			"code": 3068
		},
		{
			"stateCd": "MA",
			"desc": "Essex County",
			"code": 3069
		},
		{
			"stateCd": "MA",
			"desc": "Franklin County",
			"code": 3070
		},
		{
			"stateCd": "MA",
			"desc": "Hampden County",
			"code": 3071
		},
		{
			"stateCd": "MA",
			"desc": "Hampshire County",
			"code": 3072
		},
		{
			"stateCd": "MA",
			"desc": "Middlesex County",
			"code": 3073
		},
		{
			"stateCd": "MA",
			"desc": "Nantucket County",
			"code": 3074
		},
		{
			"stateCd": "MA",
			"desc": "Norfolk County",
			"code": 3075
		},
		{
			"stateCd": "MA",
			"desc": "Plymouth County",
			"code": 3076
		},
		{
			"stateCd": "MA",
			"desc": "Suffolk County",
			"code": 3077
		},
		{
			"stateCd": "MA",
			"desc": "Worcester County",
			"code": 3078
		},
		{
			"stateCd": "MD",
			"desc": "Allegany County",
			"code": 3041
		},
		{
			"stateCd": "MD",
			"desc": "Anne Arundel County",
			"code": 3042
		},
		{
			"stateCd": "MD",
			"desc": "Baltimore city",
			"code": 3064
		},
		{
			"stateCd": "MD",
			"desc": "Baltimore County",
			"code": 3043
		},
		{
			"stateCd": "MD",
			"desc": "Calvert County",
			"code": 3044
		},
		{
			"stateCd": "MD",
			"desc": "Caroline County",
			"code": 3045
		},
		{
			"stateCd": "MD",
			"desc": "Carroll County",
			"code": 3046
		},
		{
			"stateCd": "MD",
			"desc": "Cecil County",
			"code": 3047
		},
		{
			"stateCd": "MD",
			"desc": "Charles County",
			"code": 3048
		},
		{
			"stateCd": "MD",
			"desc": "Dorchester County",
			"code": 3049
		},
		{
			"stateCd": "MD",
			"desc": "Frederick County",
			"code": 3050
		},
		{
			"stateCd": "MD",
			"desc": "Garrett County",
			"code": 3051
		},
		{
			"stateCd": "MD",
			"desc": "Harford County",
			"code": 3052
		},
		{
			"stateCd": "MD",
			"desc": "Howard County",
			"code": 3053
		},
		{
			"stateCd": "MD",
			"desc": "Kent County",
			"code": 3054
		},
		{
			"stateCd": "MD",
			"desc": "Montgomery County",
			"code": 3055
		},
		{
			"stateCd": "MD",
			"desc": "Prince George's County",
			"code": 3056
		},
		{
			"stateCd": "MD",
			"desc": "Queen Anne's County",
			"code": 3057
		},
		{
			"stateCd": "MD",
			"desc": "Somerset County",
			"code": 3059
		},
		{
			"stateCd": "MD",
			"desc": "St. Mary's County",
			"code": 3058
		},
		{
			"stateCd": "MD",
			"desc": "Talbot County",
			"code": 3060
		},
		{
			"stateCd": "MD",
			"desc": "Washington County",
			"code": 3061
		},
		{
			"stateCd": "MD",
			"desc": "Wicomico County",
			"code": 3062
		},
		{
			"stateCd": "MD",
			"desc": "Worcester County",
			"code": 3063
		},
		{
			"stateCd": "ME",
			"desc": "Androscoggin County",
			"code": 3025
		},
		{
			"stateCd": "ME",
			"desc": "Aroostook County",
			"code": 3026
		},
		{
			"stateCd": "ME",
			"desc": "Cumberland County",
			"code": 3027
		},
		{
			"stateCd": "ME",
			"desc": "Franklin County",
			"code": 3028
		},
		{
			"stateCd": "ME",
			"desc": "Hancock County",
			"code": 3029
		},
		{
			"stateCd": "ME",
			"desc": "Kennebec County",
			"code": 3030
		},
		{
			"stateCd": "ME",
			"desc": "Knox County",
			"code": 3031
		},
		{
			"stateCd": "ME",
			"desc": "Lincoln County",
			"code": 3032
		},
		{
			"stateCd": "ME",
			"desc": "Oxford County",
			"code": 3033
		},
		{
			"stateCd": "ME",
			"desc": "Penobscot County",
			"code": 3034
		},
		{
			"stateCd": "ME",
			"desc": "Piscataquis County",
			"code": 3035
		},
		{
			"stateCd": "ME",
			"desc": "Sagadahoc County",
			"code": 3036
		},
		{
			"stateCd": "ME",
			"desc": "Somerset County",
			"code": 3037
		},
		{
			"stateCd": "ME",
			"desc": "Waldo County",
			"code": 3038
		},
		{
			"stateCd": "ME",
			"desc": "Washington County",
			"code": 3039
		},
		{
			"stateCd": "ME",
			"desc": "York County",
			"code": 3040
		},
		{
			"stateCd": "MI",
			"desc": "Alcona County",
			"code": 3079
		},
		{
			"stateCd": "MI",
			"desc": "Alger County",
			"code": 3080
		},
		{
			"stateCd": "MI",
			"desc": "Allegan County",
			"code": 3081
		},
		{
			"stateCd": "MI",
			"desc": "Alpena County",
			"code": 3082
		},
		{
			"stateCd": "MI",
			"desc": "Antrim County",
			"code": 3083
		},
		{
			"stateCd": "MI",
			"desc": "Arenac County",
			"code": 3084
		},
		{
			"stateCd": "MI",
			"desc": "Baraga County",
			"code": 3085
		},
		{
			"stateCd": "MI",
			"desc": "Barry County",
			"code": 3086
		},
		{
			"stateCd": "MI",
			"desc": "Bay County",
			"code": 3087
		},
		{
			"stateCd": "MI",
			"desc": "Benzie County",
			"code": 3088
		},
		{
			"stateCd": "MI",
			"desc": "Berrien County",
			"code": 3089
		},
		{
			"stateCd": "MI",
			"desc": "Branch County",
			"code": 3090
		},
		{
			"stateCd": "MI",
			"desc": "Calhoun County",
			"code": 3091
		},
		{
			"stateCd": "MI",
			"desc": "Cass County",
			"code": 3092
		},
		{
			"stateCd": "MI",
			"desc": "Charlevoix County",
			"code": 3093
		},
		{
			"stateCd": "MI",
			"desc": "Cheboygan County",
			"code": 3094
		},
		{
			"stateCd": "MI",
			"desc": "Chippewa County",
			"code": 3095
		},
		{
			"stateCd": "MI",
			"desc": "Clare County",
			"code": 3096
		},
		{
			"stateCd": "MI",
			"desc": "Clinton County",
			"code": 3097
		},
		{
			"stateCd": "MI",
			"desc": "Crawford County",
			"code": 3098
		},
		{
			"stateCd": "MI",
			"desc": "Delta County",
			"code": 3099
		},
		{
			"stateCd": "MI",
			"desc": "Dickinson County",
			"code": 3100
		},
		{
			"stateCd": "MI",
			"desc": "Eaton County",
			"code": 3101
		},
		{
			"stateCd": "MI",
			"desc": "Emmet County",
			"code": 3102
		},
		{
			"stateCd": "MI",
			"desc": "Genesee County",
			"code": 3103
		},
		{
			"stateCd": "MI",
			"desc": "Gladwin County",
			"code": 3104
		},
		{
			"stateCd": "MI",
			"desc": "Gogebic County",
			"code": 3105
		},
		{
			"stateCd": "MI",
			"desc": "Grand Traverse County",
			"code": 3106
		},
		{
			"stateCd": "MI",
			"desc": "Gratiot County",
			"code": 3107
		},
		{
			"stateCd": "MI",
			"desc": "Hillsdale County",
			"code": 3108
		},
		{
			"stateCd": "MI",
			"desc": "Houghton County",
			"code": 3109
		},
		{
			"stateCd": "MI",
			"desc": "Huron County",
			"code": 3110
		},
		{
			"stateCd": "MI",
			"desc": "Ingham County",
			"code": 3111
		},
		{
			"stateCd": "MI",
			"desc": "Ionia County",
			"code": 3112
		},
		{
			"stateCd": "MI",
			"desc": "Iosco County",
			"code": 3113
		},
		{
			"stateCd": "MI",
			"desc": "Iron County",
			"code": 3114
		},
		{
			"stateCd": "MI",
			"desc": "Isabella County",
			"code": 3115
		},
		{
			"stateCd": "MI",
			"desc": "Jackson County",
			"code": 3116
		},
		{
			"stateCd": "MI",
			"desc": "Kalamazoo County",
			"code": 3117
		},
		{
			"stateCd": "MI",
			"desc": "Kalkaska County",
			"code": 3118
		},
		{
			"stateCd": "MI",
			"desc": "Kent County",
			"code": 3119
		},
		{
			"stateCd": "MI",
			"desc": "Keweenaw County",
			"code": 3120
		},
		{
			"stateCd": "MI",
			"desc": "Lake County",
			"code": 3121
		},
		{
			"stateCd": "MI",
			"desc": "Lapeer County",
			"code": 3122
		},
		{
			"stateCd": "MI",
			"desc": "Leelanau County",
			"code": 3123
		},
		{
			"stateCd": "MI",
			"desc": "Lenawee County",
			"code": 3124
		},
		{
			"stateCd": "MI",
			"desc": "Livingston County",
			"code": 3125
		},
		{
			"stateCd": "MI",
			"desc": "Luce County",
			"code": 3126
		},
		{
			"stateCd": "MI",
			"desc": "Mackinac County",
			"code": 3127
		},
		{
			"stateCd": "MI",
			"desc": "Macomb County",
			"code": 3128
		},
		{
			"stateCd": "MI",
			"desc": "Manistee County",
			"code": 3129
		},
		{
			"stateCd": "MI",
			"desc": "Marquette County",
			"code": 3130
		},
		{
			"stateCd": "MI",
			"desc": "Mason County",
			"code": 3131
		},
		{
			"stateCd": "MI",
			"desc": "Mecosta County",
			"code": 3132
		},
		{
			"stateCd": "MI",
			"desc": "Menominee County",
			"code": 3133
		},
		{
			"stateCd": "MI",
			"desc": "Midland County",
			"code": 3134
		},
		{
			"stateCd": "MI",
			"desc": "Missaukee County",
			"code": 3135
		},
		{
			"stateCd": "MI",
			"desc": "Monroe County",
			"code": 3136
		},
		{
			"stateCd": "MI",
			"desc": "Montcalm County",
			"code": 3137
		},
		{
			"stateCd": "MI",
			"desc": "Montmorency County",
			"code": 3138
		},
		{
			"stateCd": "MI",
			"desc": "Muskegon County",
			"code": 3139
		},
		{
			"stateCd": "MI",
			"desc": "Newaygo County",
			"code": 3140
		},
		{
			"stateCd": "MI",
			"desc": "Oakland County",
			"code": 3141
		},
		{
			"stateCd": "MI",
			"desc": "Oceana County",
			"code": 3142
		},
		{
			"stateCd": "MI",
			"desc": "Ogemaw County",
			"code": 3143
		},
		{
			"stateCd": "MI",
			"desc": "Ontonagon County",
			"code": 3144
		},
		{
			"stateCd": "MI",
			"desc": "Osceola County",
			"code": 3145
		},
		{
			"stateCd": "MI",
			"desc": "Oscoda County",
			"code": 3146
		},
		{
			"stateCd": "MI",
			"desc": "Otsego County",
			"code": 3147
		},
		{
			"stateCd": "MI",
			"desc": "Ottawa County",
			"code": 3148
		},
		{
			"stateCd": "MI",
			"desc": "Presque Isle County",
			"code": 3149
		},
		{
			"stateCd": "MI",
			"desc": "Roscommon County",
			"code": 3150
		},
		{
			"stateCd": "MI",
			"desc": "Saginaw County",
			"code": 3151
		},
		{
			"stateCd": "MI",
			"desc": "Sanilac County",
			"code": 3154
		},
		{
			"stateCd": "MI",
			"desc": "Schoolcraft County",
			"code": 3155
		},
		{
			"stateCd": "MI",
			"desc": "Shiawassee County",
			"code": 3156
		},
		{
			"stateCd": "MI",
			"desc": "St. Clair County",
			"code": 3152
		},
		{
			"stateCd": "MI",
			"desc": "St. Joseph County",
			"code": 3153
		},
		{
			"stateCd": "MI",
			"desc": "Tuscola County",
			"code": 3157
		},
		{
			"stateCd": "MI",
			"desc": "Van Buren County",
			"code": 3158
		},
		{
			"stateCd": "MI",
			"desc": "Washtenaw County",
			"code": 3159
		},
		{
			"stateCd": "MI",
			"desc": "Wayne County",
			"code": 3160
		},
		{
			"stateCd": "MI",
			"desc": "Wexford County",
			"code": 3161
		},
		{
			"stateCd": "MN",
			"desc": "Aitkin County",
			"code": 3162
		},
		{
			"stateCd": "MN",
			"desc": "Anoka County",
			"code": 3163
		},
		{
			"stateCd": "MN",
			"desc": "Becker County",
			"code": 3164
		},
		{
			"stateCd": "MN",
			"desc": "Beltrami County",
			"code": 3165
		},
		{
			"stateCd": "MN",
			"desc": "Benton County",
			"code": 3166
		},
		{
			"stateCd": "MN",
			"desc": "Big Stone County",
			"code": 3167
		},
		{
			"stateCd": "MN",
			"desc": "Blue Earth County",
			"code": 3168
		},
		{
			"stateCd": "MN",
			"desc": "Brown County",
			"code": 3169
		},
		{
			"stateCd": "MN",
			"desc": "Carlton County",
			"code": 3170
		},
		{
			"stateCd": "MN",
			"desc": "Carver County",
			"code": 3171
		},
		{
			"stateCd": "MN",
			"desc": "Cass County",
			"code": 3172
		},
		{
			"stateCd": "MN",
			"desc": "Chippewa County",
			"code": 3173
		},
		{
			"stateCd": "MN",
			"desc": "Chisago County",
			"code": 3174
		},
		{
			"stateCd": "MN",
			"desc": "Clay County",
			"code": 3175
		},
		{
			"stateCd": "MN",
			"desc": "Clearwater County",
			"code": 3176
		},
		{
			"stateCd": "MN",
			"desc": "Cook County",
			"code": 3177
		},
		{
			"stateCd": "MN",
			"desc": "Cottonwood County",
			"code": 3178
		},
		{
			"stateCd": "MN",
			"desc": "Crow Wing County",
			"code": 3179
		},
		{
			"stateCd": "MN",
			"desc": "Dakota County",
			"code": 3180
		},
		{
			"stateCd": "MN",
			"desc": "Dodge County",
			"code": 3181
		},
		{
			"stateCd": "MN",
			"desc": "Douglas County",
			"code": 3182
		},
		{
			"stateCd": "MN",
			"desc": "Faribault County",
			"code": 3183
		},
		{
			"stateCd": "MN",
			"desc": "Fillmore County",
			"code": 3184
		},
		{
			"stateCd": "MN",
			"desc": "Freeborn County",
			"code": 3185
		},
		{
			"stateCd": "MN",
			"desc": "Goodhue County",
			"code": 3186
		},
		{
			"stateCd": "MN",
			"desc": "Grant County",
			"code": 3187
		},
		{
			"stateCd": "MN",
			"desc": "Hennepin County",
			"code": 3188
		},
		{
			"stateCd": "MN",
			"desc": "Houston County",
			"code": 3189
		},
		{
			"stateCd": "MN",
			"desc": "Hubbard County",
			"code": 3190
		},
		{
			"stateCd": "MN",
			"desc": "Isanti County",
			"code": 3191
		},
		{
			"stateCd": "MN",
			"desc": "Itasca County",
			"code": 3192
		},
		{
			"stateCd": "MN",
			"desc": "Jackson County",
			"code": 3193
		},
		{
			"stateCd": "MN",
			"desc": "Kanabec County",
			"code": 3194
		},
		{
			"stateCd": "MN",
			"desc": "Kandiyohi County",
			"code": 3195
		},
		{
			"stateCd": "MN",
			"desc": "Kittson County",
			"code": 3196
		},
		{
			"stateCd": "MN",
			"desc": "Koochiching County",
			"code": 3197
		},
		{
			"stateCd": "MN",
			"desc": "Lac qui Parle County",
			"code": 3198
		},
		{
			"stateCd": "MN",
			"desc": "Lake County",
			"code": 3199
		},
		{
			"stateCd": "MN",
			"desc": "Lake of the Woods County",
			"code": 3200
		},
		{
			"stateCd": "MN",
			"desc": "Le Sueur County",
			"code": 3201
		},
		{
			"stateCd": "MN",
			"desc": "Lincoln County",
			"code": 3202
		},
		{
			"stateCd": "MN",
			"desc": "Lyon County",
			"code": 3203
		},
		{
			"stateCd": "MN",
			"desc": "Mahnomen County",
			"code": 3205
		},
		{
			"stateCd": "MN",
			"desc": "Marshall County",
			"code": 3206
		},
		{
			"stateCd": "MN",
			"desc": "Martin County",
			"code": 3207
		},
		{
			"stateCd": "MN",
			"desc": "McLeod County",
			"code": 3204
		},
		{
			"stateCd": "MN",
			"desc": "Meeker County",
			"code": 3208
		},
		{
			"stateCd": "MN",
			"desc": "Mille Lacs County",
			"code": 3209
		},
		{
			"stateCd": "MN",
			"desc": "Morrison County",
			"code": 3210
		},
		{
			"stateCd": "MN",
			"desc": "Mower County",
			"code": 3211
		},
		{
			"stateCd": "MN",
			"desc": "Murray County",
			"code": 3212
		},
		{
			"stateCd": "MN",
			"desc": "Nicollet County",
			"code": 3213
		},
		{
			"stateCd": "MN",
			"desc": "Nobles County",
			"code": 3214
		},
		{
			"stateCd": "MN",
			"desc": "Norman County",
			"code": 3215
		},
		{
			"stateCd": "MN",
			"desc": "Olmsted County",
			"code": 3216
		},
		{
			"stateCd": "MN",
			"desc": "Otter Tail County",
			"code": 3217
		},
		{
			"stateCd": "MN",
			"desc": "Pennington County",
			"code": 3218
		},
		{
			"stateCd": "MN",
			"desc": "Pine County",
			"code": 3219
		},
		{
			"stateCd": "MN",
			"desc": "Pipestone County",
			"code": 3220
		},
		{
			"stateCd": "MN",
			"desc": "Polk County",
			"code": 3221
		},
		{
			"stateCd": "MN",
			"desc": "Pope County",
			"code": 3222
		},
		{
			"stateCd": "MN",
			"desc": "Ramsey County",
			"code": 3223
		},
		{
			"stateCd": "MN",
			"desc": "Red Lake County",
			"code": 3224
		},
		{
			"stateCd": "MN",
			"desc": "Redwood County",
			"code": 3225
		},
		{
			"stateCd": "MN",
			"desc": "Renville County",
			"code": 3226
		},
		{
			"stateCd": "MN",
			"desc": "Rice County",
			"code": 3227
		},
		{
			"stateCd": "MN",
			"desc": "Rock County",
			"code": 3228
		},
		{
			"stateCd": "MN",
			"desc": "Roseau County",
			"code": 3229
		},
		{
			"stateCd": "MN",
			"desc": "Scott County",
			"code": 3231
		},
		{
			"stateCd": "MN",
			"desc": "Sherburne County",
			"code": 3232
		},
		{
			"stateCd": "MN",
			"desc": "Sibley County",
			"code": 3233
		},
		{
			"stateCd": "MN",
			"desc": "St. Louis County",
			"code": 3230
		},
		{
			"stateCd": "MN",
			"desc": "Stearns County",
			"code": 3234
		},
		{
			"stateCd": "MN",
			"desc": "Steele County",
			"code": 3235
		},
		{
			"stateCd": "MN",
			"desc": "Stevens County",
			"code": 3236
		},
		{
			"stateCd": "MN",
			"desc": "Swift County",
			"code": 3237
		},
		{
			"stateCd": "MN",
			"desc": "Todd County",
			"code": 3238
		},
		{
			"stateCd": "MN",
			"desc": "Traverse County",
			"code": 3239
		},
		{
			"stateCd": "MN",
			"desc": "Wabasha County",
			"code": 3240
		},
		{
			"stateCd": "MN",
			"desc": "Wadena County",
			"code": 3241
		},
		{
			"stateCd": "MN",
			"desc": "Waseca County",
			"code": 3242
		},
		{
			"stateCd": "MN",
			"desc": "Washington County",
			"code": 3243
		},
		{
			"stateCd": "MN",
			"desc": "Watonwan County",
			"code": 3244
		},
		{
			"stateCd": "MN",
			"desc": "Wilkin County",
			"code": 3245
		},
		{
			"stateCd": "MN",
			"desc": "Winona County",
			"code": 3246
		},
		{
			"stateCd": "MN",
			"desc": "Wright County",
			"code": 3247
		},
		{
			"stateCd": "MN",
			"desc": "Yellow Medicine County",
			"code": 3248
		},
		{
			"stateCd": "MO",
			"desc": "Adair County",
			"code": 3331
		},
		{
			"stateCd": "MO",
			"desc": "Andrew County",
			"code": 3332
		},
		{
			"stateCd": "MO",
			"desc": "Atchison County",
			"code": 3333
		},
		{
			"stateCd": "MO",
			"desc": "Audrain County",
			"code": 3334
		},
		{
			"stateCd": "MO",
			"desc": "Barry County",
			"code": 3335
		},
		{
			"stateCd": "MO",
			"desc": "Barton County",
			"code": 3336
		},
		{
			"stateCd": "MO",
			"desc": "Bates County",
			"code": 3337
		},
		{
			"stateCd": "MO",
			"desc": "Benton County",
			"code": 3338
		},
		{
			"stateCd": "MO",
			"desc": "Bollinger County",
			"code": 3339
		},
		{
			"stateCd": "MO",
			"desc": "Boone County",
			"code": 3340
		},
		{
			"stateCd": "MO",
			"desc": "Buchanan County",
			"code": 3341
		},
		{
			"stateCd": "MO",
			"desc": "Butler County",
			"code": 3342
		},
		{
			"stateCd": "MO",
			"desc": "Caldwell County",
			"code": 3343
		},
		{
			"stateCd": "MO",
			"desc": "Callaway County",
			"code": 3344
		},
		{
			"stateCd": "MO",
			"desc": "Camden County",
			"code": 3345
		},
		{
			"stateCd": "MO",
			"desc": "Cape Girardeau County",
			"code": 3346
		},
		{
			"stateCd": "MO",
			"desc": "Carroll County",
			"code": 3347
		},
		{
			"stateCd": "MO",
			"desc": "Carter County",
			"code": 3348
		},
		{
			"stateCd": "MO",
			"desc": "Cass County",
			"code": 3349
		},
		{
			"stateCd": "MO",
			"desc": "Cedar County",
			"code": 3350
		},
		{
			"stateCd": "MO",
			"desc": "Chariton County",
			"code": 3351
		},
		{
			"stateCd": "MO",
			"desc": "Christian County",
			"code": 3352
		},
		{
			"stateCd": "MO",
			"desc": "Clark County",
			"code": 3353
		},
		{
			"stateCd": "MO",
			"desc": "Clay County",
			"code": 3354
		},
		{
			"stateCd": "MO",
			"desc": "Clinton County",
			"code": 3355
		},
		{
			"stateCd": "MO",
			"desc": "Cole County",
			"code": 3356
		},
		{
			"stateCd": "MO",
			"desc": "Cooper County",
			"code": 3357
		},
		{
			"stateCd": "MO",
			"desc": "Crawford County",
			"code": 3358
		},
		{
			"stateCd": "MO",
			"desc": "Dade County",
			"code": 3359
		},
		{
			"stateCd": "MO",
			"desc": "Dallas County",
			"code": 3360
		},
		{
			"stateCd": "MO",
			"desc": "Daviess County",
			"code": 3361
		},
		{
			"stateCd": "MO",
			"desc": "DeKalb County",
			"code": 3362
		},
		{
			"stateCd": "MO",
			"desc": "Dent County",
			"code": 3363
		},
		{
			"stateCd": "MO",
			"desc": "Douglas County",
			"code": 3364
		},
		{
			"stateCd": "MO",
			"desc": "Dunklin County",
			"code": 3365
		},
		{
			"stateCd": "MO",
			"desc": "Franklin County",
			"code": 3366
		},
		{
			"stateCd": "MO",
			"desc": "Gasconade County",
			"code": 3367
		},
		{
			"stateCd": "MO",
			"desc": "Gentry County",
			"code": 3368
		},
		{
			"stateCd": "MO",
			"desc": "Greene County",
			"code": 3369
		},
		{
			"stateCd": "MO",
			"desc": "Grundy County",
			"code": 3370
		},
		{
			"stateCd": "MO",
			"desc": "Harrison County",
			"code": 3371
		},
		{
			"stateCd": "MO",
			"desc": "Henry County",
			"code": 3372
		},
		{
			"stateCd": "MO",
			"desc": "Hickory County",
			"code": 3373
		},
		{
			"stateCd": "MO",
			"desc": "Holt County",
			"code": 3374
		},
		{
			"stateCd": "MO",
			"desc": "Howard County",
			"code": 3375
		},
		{
			"stateCd": "MO",
			"desc": "Howell County",
			"code": 3376
		},
		{
			"stateCd": "MO",
			"desc": "Iron County",
			"code": 3377
		},
		{
			"stateCd": "MO",
			"desc": "Jackson County",
			"code": 3378
		},
		{
			"stateCd": "MO",
			"desc": "Jasper County",
			"code": 3379
		},
		{
			"stateCd": "MO",
			"desc": "Jefferson County",
			"code": 3380
		},
		{
			"stateCd": "MO",
			"desc": "Johnson County",
			"code": 3381
		},
		{
			"stateCd": "MO",
			"desc": "Knox County",
			"code": 3382
		},
		{
			"stateCd": "MO",
			"desc": "Laclede County",
			"code": 3383
		},
		{
			"stateCd": "MO",
			"desc": "Lafayette County",
			"code": 3384
		},
		{
			"stateCd": "MO",
			"desc": "Lawrence County",
			"code": 3385
		},
		{
			"stateCd": "MO",
			"desc": "Lewis County",
			"code": 3386
		},
		{
			"stateCd": "MO",
			"desc": "Lincoln County",
			"code": 3387
		},
		{
			"stateCd": "MO",
			"desc": "Linn County",
			"code": 3388
		},
		{
			"stateCd": "MO",
			"desc": "Livingston County",
			"code": 3389
		},
		{
			"stateCd": "MO",
			"desc": "Macon County",
			"code": 3391
		},
		{
			"stateCd": "MO",
			"desc": "Madison County",
			"code": 3392
		},
		{
			"stateCd": "MO",
			"desc": "Maries County",
			"code": 3393
		},
		{
			"stateCd": "MO",
			"desc": "Marion County",
			"code": 3394
		},
		{
			"stateCd": "MO",
			"desc": "McDonald County",
			"code": 3390
		},
		{
			"stateCd": "MO",
			"desc": "Mercer County",
			"code": 3395
		},
		{
			"stateCd": "MO",
			"desc": "Miller County",
			"code": 3396
		},
		{
			"stateCd": "MO",
			"desc": "Mississippi County",
			"code": 3397
		},
		{
			"stateCd": "MO",
			"desc": "Moniteau County",
			"code": 3398
		},
		{
			"stateCd": "MO",
			"desc": "Monroe County",
			"code": 3399
		},
		{
			"stateCd": "MO",
			"desc": "Montgomery County",
			"code": 3400
		},
		{
			"stateCd": "MO",
			"desc": "Morgan County",
			"code": 3401
		},
		{
			"stateCd": "MO",
			"desc": "New Madrid County",
			"code": 3402
		},
		{
			"stateCd": "MO",
			"desc": "Newton County",
			"code": 3403
		},
		{
			"stateCd": "MO",
			"desc": "Nodaway County",
			"code": 3404
		},
		{
			"stateCd": "MO",
			"desc": "Oregon County",
			"code": 3405
		},
		{
			"stateCd": "MO",
			"desc": "Osage County",
			"code": 3406
		},
		{
			"stateCd": "MO",
			"desc": "Ozark County",
			"code": 3407
		},
		{
			"stateCd": "MO",
			"desc": "Pemiscot County",
			"code": 3408
		},
		{
			"stateCd": "MO",
			"desc": "Perry County",
			"code": 3409
		},
		{
			"stateCd": "MO",
			"desc": "Pettis County",
			"code": 3410
		},
		{
			"stateCd": "MO",
			"desc": "Phelps County",
			"code": 3411
		},
		{
			"stateCd": "MO",
			"desc": "Pike County",
			"code": 3412
		},
		{
			"stateCd": "MO",
			"desc": "Platte County",
			"code": 3413
		},
		{
			"stateCd": "MO",
			"desc": "Polk County",
			"code": 3414
		},
		{
			"stateCd": "MO",
			"desc": "Pulaski County",
			"code": 3415
		},
		{
			"stateCd": "MO",
			"desc": "Putnam County",
			"code": 3416
		},
		{
			"stateCd": "MO",
			"desc": "Ralls County",
			"code": 3417
		},
		{
			"stateCd": "MO",
			"desc": "Randolph County",
			"code": 3418
		},
		{
			"stateCd": "MO",
			"desc": "Ray County",
			"code": 3419
		},
		{
			"stateCd": "MO",
			"desc": "Reynolds County",
			"code": 3420
		},
		{
			"stateCd": "MO",
			"desc": "Ripley County",
			"code": 3421
		},
		{
			"stateCd": "MO",
			"desc": "Saline County",
			"code": 3427
		},
		{
			"stateCd": "MO",
			"desc": "Schuyler County",
			"code": 3428
		},
		{
			"stateCd": "MO",
			"desc": "Scotland County",
			"code": 3429
		},
		{
			"stateCd": "MO",
			"desc": "Scott County",
			"code": 3430
		},
		{
			"stateCd": "MO",
			"desc": "Shannon County",
			"code": 3431
		},
		{
			"stateCd": "MO",
			"desc": "Shelby County",
			"code": 3432
		},
		{
			"stateCd": "MO",
			"desc": "St. Charles County",
			"code": 3422
		},
		{
			"stateCd": "MO",
			"desc": "St. Clair County",
			"code": 3423
		},
		{
			"stateCd": "MO",
			"desc": "St. Francois County",
			"code": 3425
		},
		{
			"stateCd": "MO",
			"desc": "St. Louis city",
			"code": 3445
		},
		{
			"stateCd": "MO",
			"desc": "St. Louis County",
			"code": 3426
		},
		{
			"stateCd": "MO",
			"desc": "Ste. Genevieve County",
			"code": 3424
		},
		{
			"stateCd": "MO",
			"desc": "Stoddard County",
			"code": 3433
		},
		{
			"stateCd": "MO",
			"desc": "Stone County",
			"code": 3434
		},
		{
			"stateCd": "MO",
			"desc": "Sullivan County",
			"code": 3435
		},
		{
			"stateCd": "MO",
			"desc": "Taney County",
			"code": 3436
		},
		{
			"stateCd": "MO",
			"desc": "Texas County",
			"code": 3437
		},
		{
			"stateCd": "MO",
			"desc": "Vernon County",
			"code": 3438
		},
		{
			"stateCd": "MO",
			"desc": "Warren County",
			"code": 3439
		},
		{
			"stateCd": "MO",
			"desc": "Washington County",
			"code": 3440
		},
		{
			"stateCd": "MO",
			"desc": "Wayne County",
			"code": 3441
		},
		{
			"stateCd": "MO",
			"desc": "Webster County",
			"code": 3442
		},
		{
			"stateCd": "MO",
			"desc": "Worth County",
			"code": 3443
		},
		{
			"stateCd": "MO",
			"desc": "Wright County",
			"code": 3444
		},
		{
			"stateCd": "MS",
			"desc": "Adams County",
			"code": 3249
		},
		{
			"stateCd": "MS",
			"desc": "Alcorn County",
			"code": 3250
		},
		{
			"stateCd": "MS",
			"desc": "Amite County",
			"code": 3251
		},
		{
			"stateCd": "MS",
			"desc": "Attala County",
			"code": 3252
		},
		{
			"stateCd": "MS",
			"desc": "Benton County",
			"code": 3253
		},
		{
			"stateCd": "MS",
			"desc": "Bolivar County",
			"code": 3254
		},
		{
			"stateCd": "MS",
			"desc": "Calhoun County",
			"code": 3255
		},
		{
			"stateCd": "MS",
			"desc": "Carroll County",
			"code": 3256
		},
		{
			"stateCd": "MS",
			"desc": "Chickasaw County",
			"code": 3257
		},
		{
			"stateCd": "MS",
			"desc": "Choctaw County",
			"code": 3258
		},
		{
			"stateCd": "MS",
			"desc": "Claiborne County",
			"code": 3259
		},
		{
			"stateCd": "MS",
			"desc": "Clarke County",
			"code": 3260
		},
		{
			"stateCd": "MS",
			"desc": "Clay County",
			"code": 3261
		},
		{
			"stateCd": "MS",
			"desc": "Coahoma County",
			"code": 3262
		},
		{
			"stateCd": "MS",
			"desc": "Copiah County",
			"code": 3263
		},
		{
			"stateCd": "MS",
			"desc": "Covington County",
			"code": 3264
		},
		{
			"stateCd": "MS",
			"desc": "DeSoto County",
			"code": 3265
		},
		{
			"stateCd": "MS",
			"desc": "Forrest County",
			"code": 3266
		},
		{
			"stateCd": "MS",
			"desc": "Franklin County",
			"code": 3267
		},
		{
			"stateCd": "MS",
			"desc": "George County",
			"code": 3268
		},
		{
			"stateCd": "MS",
			"desc": "Greene County",
			"code": 3269
		},
		{
			"stateCd": "MS",
			"desc": "Grenada County",
			"code": 3270
		},
		{
			"stateCd": "MS",
			"desc": "Hancock County",
			"code": 3271
		},
		{
			"stateCd": "MS",
			"desc": "Harrison County",
			"code": 3272
		},
		{
			"stateCd": "MS",
			"desc": "Hinds County",
			"code": 3273
		},
		{
			"stateCd": "MS",
			"desc": "Holmes County",
			"code": 3274
		},
		{
			"stateCd": "MS",
			"desc": "Humphreys County",
			"code": 3275
		},
		{
			"stateCd": "MS",
			"desc": "Issaquena County",
			"code": 3276
		},
		{
			"stateCd": "MS",
			"desc": "Itawamba County",
			"code": 3277
		},
		{
			"stateCd": "MS",
			"desc": "Jackson County",
			"code": 3278
		},
		{
			"stateCd": "MS",
			"desc": "Jasper County",
			"code": 3279
		},
		{
			"stateCd": "MS",
			"desc": "Jefferson County",
			"code": 3280
		},
		{
			"stateCd": "MS",
			"desc": "Jefferson Davis County",
			"code": 3281
		},
		{
			"stateCd": "MS",
			"desc": "Jones County",
			"code": 3282
		},
		{
			"stateCd": "MS",
			"desc": "Kemper County",
			"code": 3283
		},
		{
			"stateCd": "MS",
			"desc": "Lafayette County",
			"code": 3284
		},
		{
			"stateCd": "MS",
			"desc": "Lamar County",
			"code": 3285
		},
		{
			"stateCd": "MS",
			"desc": "Lauderdale County",
			"code": 3286
		},
		{
			"stateCd": "MS",
			"desc": "Lawrence County",
			"code": 3287
		},
		{
			"stateCd": "MS",
			"desc": "Leake County",
			"code": 3288
		},
		{
			"stateCd": "MS",
			"desc": "Lee County",
			"code": 3289
		},
		{
			"stateCd": "MS",
			"desc": "Leflore County",
			"code": 3290
		},
		{
			"stateCd": "MS",
			"desc": "Lincoln County",
			"code": 3291
		},
		{
			"stateCd": "MS",
			"desc": "Lowndes County",
			"code": 3292
		},
		{
			"stateCd": "MS",
			"desc": "Madison County",
			"code": 3293
		},
		{
			"stateCd": "MS",
			"desc": "Marion County",
			"code": 3294
		},
		{
			"stateCd": "MS",
			"desc": "Marshall County",
			"code": 3295
		},
		{
			"stateCd": "MS",
			"desc": "Monroe County",
			"code": 3296
		},
		{
			"stateCd": "MS",
			"desc": "Montgomery County",
			"code": 3297
		},
		{
			"stateCd": "MS",
			"desc": "Neshoba County",
			"code": 3298
		},
		{
			"stateCd": "MS",
			"desc": "Newton County",
			"code": 3299
		},
		{
			"stateCd": "MS",
			"desc": "Noxubee County",
			"code": 3300
		},
		{
			"stateCd": "MS",
			"desc": "Oktibbeha County",
			"code": 3301
		},
		{
			"stateCd": "MS",
			"desc": "Panola County",
			"code": 3302
		},
		{
			"stateCd": "MS",
			"desc": "Pearl River County",
			"code": 3303
		},
		{
			"stateCd": "MS",
			"desc": "Perry County",
			"code": 3304
		},
		{
			"stateCd": "MS",
			"desc": "Pike County",
			"code": 3305
		},
		{
			"stateCd": "MS",
			"desc": "Pontotoc County",
			"code": 3306
		},
		{
			"stateCd": "MS",
			"desc": "Prentiss County",
			"code": 3307
		},
		{
			"stateCd": "MS",
			"desc": "Quitman County",
			"code": 3308
		},
		{
			"stateCd": "MS",
			"desc": "Rankin County",
			"code": 3309
		},
		{
			"stateCd": "MS",
			"desc": "Scott County",
			"code": 3310
		},
		{
			"stateCd": "MS",
			"desc": "Sharkey County",
			"code": 3311
		},
		{
			"stateCd": "MS",
			"desc": "Simpson County",
			"code": 3312
		},
		{
			"stateCd": "MS",
			"desc": "Smith County",
			"code": 3313
		},
		{
			"stateCd": "MS",
			"desc": "Stone County",
			"code": 3314
		},
		{
			"stateCd": "MS",
			"desc": "Sunflower County",
			"code": 3315
		},
		{
			"stateCd": "MS",
			"desc": "Tallahatchie County",
			"code": 3316
		},
		{
			"stateCd": "MS",
			"desc": "Tate County",
			"code": 3317
		},
		{
			"stateCd": "MS",
			"desc": "Tippah County",
			"code": 3318
		},
		{
			"stateCd": "MS",
			"desc": "Tishomingo County",
			"code": 3319
		},
		{
			"stateCd": "MS",
			"desc": "Tunica County",
			"code": 3320
		},
		{
			"stateCd": "MS",
			"desc": "Union County",
			"code": 3321
		},
		{
			"stateCd": "MS",
			"desc": "Walthall County",
			"code": 3322
		},
		{
			"stateCd": "MS",
			"desc": "Warren County",
			"code": 3323
		},
		{
			"stateCd": "MS",
			"desc": "Washington County",
			"code": 3324
		},
		{
			"stateCd": "MS",
			"desc": "Wayne County",
			"code": 3325
		},
		{
			"stateCd": "MS",
			"desc": "Webster County",
			"code": 3326
		},
		{
			"stateCd": "MS",
			"desc": "Wilkinson County",
			"code": 3327
		},
		{
			"stateCd": "MS",
			"desc": "Winston County",
			"code": 3328
		},
		{
			"stateCd": "MS",
			"desc": "Yalobusha County",
			"code": 3329
		},
		{
			"stateCd": "MS",
			"desc": "Yazoo County",
			"code": 3330
		},
		{
			"stateCd": "MT",
			"desc": "Beaverhead County",
			"code": 3446
		},
		{
			"stateCd": "MT",
			"desc": "Big Horn County",
			"code": 3447
		},
		{
			"stateCd": "MT",
			"desc": "Blaine County",
			"code": 3448
		},
		{
			"stateCd": "MT",
			"desc": "Broadwater County",
			"code": 3449
		},
		{
			"stateCd": "MT",
			"desc": "Carbon County",
			"code": 3450
		},
		{
			"stateCd": "MT",
			"desc": "Carter County",
			"code": 3451
		},
		{
			"stateCd": "MT",
			"desc": "Cascade County",
			"code": 3452
		},
		{
			"stateCd": "MT",
			"desc": "Chouteau County",
			"code": 3453
		},
		{
			"stateCd": "MT",
			"desc": "Custer County",
			"code": 3454
		},
		{
			"stateCd": "MT",
			"desc": "Daniels County",
			"code": 3455
		},
		{
			"stateCd": "MT",
			"desc": "Dawson County",
			"code": 3456
		},
		{
			"stateCd": "MT",
			"desc": "Deer Lodge County",
			"code": 3457
		},
		{
			"stateCd": "MT",
			"desc": "Fallon County",
			"code": 3458
		},
		{
			"stateCd": "MT",
			"desc": "Fergus County",
			"code": 3459
		},
		{
			"stateCd": "MT",
			"desc": "Flathead County",
			"code": 3460
		},
		{
			"stateCd": "MT",
			"desc": "Gallatin County",
			"code": 3461
		},
		{
			"stateCd": "MT",
			"desc": "Garfield County",
			"code": 3462
		},
		{
			"stateCd": "MT",
			"desc": "Glacier County",
			"code": 3463
		},
		{
			"stateCd": "MT",
			"desc": "Golden Valley County",
			"code": 3464
		},
		{
			"stateCd": "MT",
			"desc": "Granite County",
			"code": 3465
		},
		{
			"stateCd": "MT",
			"desc": "Hill County",
			"code": 3466
		},
		{
			"stateCd": "MT",
			"desc": "Jefferson County",
			"code": 3467
		},
		{
			"stateCd": "MT",
			"desc": "Judith Basin County",
			"code": 3468
		},
		{
			"stateCd": "MT",
			"desc": "Lake County",
			"code": 3469
		},
		{
			"stateCd": "MT",
			"desc": "Lewis and Clark County",
			"code": 3470
		},
		{
			"stateCd": "MT",
			"desc": "Liberty County",
			"code": 3471
		},
		{
			"stateCd": "MT",
			"desc": "Lincoln County",
			"code": 3472
		},
		{
			"stateCd": "MT",
			"desc": "Madison County",
			"code": 3474
		},
		{
			"stateCd": "MT",
			"desc": "McCone County",
			"code": 3473
		},
		{
			"stateCd": "MT",
			"desc": "Meagher County",
			"code": 3475
		},
		{
			"stateCd": "MT",
			"desc": "Mineral County",
			"code": 3476
		},
		{
			"stateCd": "MT",
			"desc": "Missoula County",
			"code": 3477
		},
		{
			"stateCd": "MT",
			"desc": "Musselshell County",
			"code": 3478
		},
		{
			"stateCd": "MT",
			"desc": "Park County",
			"code": 3479
		},
		{
			"stateCd": "MT",
			"desc": "Petroleum County",
			"code": 3480
		},
		{
			"stateCd": "MT",
			"desc": "Phillips County",
			"code": 3481
		},
		{
			"stateCd": "MT",
			"desc": "Pondera County",
			"code": 3482
		},
		{
			"stateCd": "MT",
			"desc": "Powder River County",
			"code": 3483
		},
		{
			"stateCd": "MT",
			"desc": "Powell County",
			"code": 3484
		},
		{
			"stateCd": "MT",
			"desc": "Prairie County",
			"code": 3485
		},
		{
			"stateCd": "MT",
			"desc": "Ravalli County",
			"code": 3486
		},
		{
			"stateCd": "MT",
			"desc": "Richland County",
			"code": 3487
		},
		{
			"stateCd": "MT",
			"desc": "Roosevelt County",
			"code": 3488
		},
		{
			"stateCd": "MT",
			"desc": "Rosebud County",
			"code": 3489
		},
		{
			"stateCd": "MT",
			"desc": "Sanders County",
			"code": 3490
		},
		{
			"stateCd": "MT",
			"desc": "Sheridan County",
			"code": 3491
		},
		{
			"stateCd": "MT",
			"desc": "Silver Bow County",
			"code": 3492
		},
		{
			"stateCd": "MT",
			"desc": "Stillwater County",
			"code": 3493
		},
		{
			"stateCd": "MT",
			"desc": "Sweet Grass County",
			"code": 3494
		},
		{
			"stateCd": "MT",
			"desc": "Teton County",
			"code": 3495
		},
		{
			"stateCd": "MT",
			"desc": "Toole County",
			"code": 3496
		},
		{
			"stateCd": "MT",
			"desc": "Treasure County",
			"code": 3497
		},
		{
			"stateCd": "MT",
			"desc": "Valley County",
			"code": 4989
		},
		{
			"stateCd": "MT",
			"desc": "Wheatland County",
			"code": 3498
		},
		{
			"stateCd": "MT",
			"desc": "Wibaux County",
			"code": 3499
		},
		{
			"stateCd": "MT",
			"desc": "Yellowstone County",
			"code": 3500
		},
		{
			"stateCd": "NC",
			"desc": "Alamance County",
			"code": 3737
		},
		{
			"stateCd": "NC",
			"desc": "Alexander County",
			"code": 3738
		},
		{
			"stateCd": "NC",
			"desc": "Alleghany County",
			"code": 3739
		},
		{
			"stateCd": "NC",
			"desc": "Anson County",
			"code": 3740
		},
		{
			"stateCd": "NC",
			"desc": "Ashe County",
			"code": 3741
		},
		{
			"stateCd": "NC",
			"desc": "Avery County",
			"code": 3742
		},
		{
			"stateCd": "NC",
			"desc": "Beaufort County",
			"code": 3743
		},
		{
			"stateCd": "NC",
			"desc": "Bertie County",
			"code": 3744
		},
		{
			"stateCd": "NC",
			"desc": "Bladen County",
			"code": 3745
		},
		{
			"stateCd": "NC",
			"desc": "Brunswick County",
			"code": 3746
		},
		{
			"stateCd": "NC",
			"desc": "Buncombe County",
			"code": 3747
		},
		{
			"stateCd": "NC",
			"desc": "Burke County",
			"code": 3748
		},
		{
			"stateCd": "NC",
			"desc": "Cabarrus County",
			"code": 3749
		},
		{
			"stateCd": "NC",
			"desc": "Caldwell County",
			"code": 3750
		},
		{
			"stateCd": "NC",
			"desc": "Camden County",
			"code": 3751
		},
		{
			"stateCd": "NC",
			"desc": "Carteret County",
			"code": 3752
		},
		{
			"stateCd": "NC",
			"desc": "Caswell County",
			"code": 3753
		},
		{
			"stateCd": "NC",
			"desc": "Catawba County",
			"code": 3754
		},
		{
			"stateCd": "NC",
			"desc": "Chatham County",
			"code": 3755
		},
		{
			"stateCd": "NC",
			"desc": "Cherokee County",
			"code": 3756
		},
		{
			"stateCd": "NC",
			"desc": "Chowan County",
			"code": 3757
		},
		{
			"stateCd": "NC",
			"desc": "Clay County",
			"code": 3758
		},
		{
			"stateCd": "NC",
			"desc": "Cleveland County",
			"code": 3759
		},
		{
			"stateCd": "NC",
			"desc": "Columbus County",
			"code": 3760
		},
		{
			"stateCd": "NC",
			"desc": "Craven County",
			"code": 3761
		},
		{
			"stateCd": "NC",
			"desc": "Cumberland County",
			"code": 3762
		},
		{
			"stateCd": "NC",
			"desc": "Currituck County",
			"code": 3763
		},
		{
			"stateCd": "NC",
			"desc": "Dare County",
			"code": 3764
		},
		{
			"stateCd": "NC",
			"desc": "Davidson County",
			"code": 3765
		},
		{
			"stateCd": "NC",
			"desc": "Davie County",
			"code": 3766
		},
		{
			"stateCd": "NC",
			"desc": "Duplin County",
			"code": 3767
		},
		{
			"stateCd": "NC",
			"desc": "Durham County",
			"code": 3768
		},
		{
			"stateCd": "NC",
			"desc": "Edgecombe County",
			"code": 3769
		},
		{
			"stateCd": "NC",
			"desc": "Forsyth County",
			"code": 3770
		},
		{
			"stateCd": "NC",
			"desc": "Franklin County",
			"code": 3771
		},
		{
			"stateCd": "NC",
			"desc": "Gaston County",
			"code": 3772
		},
		{
			"stateCd": "NC",
			"desc": "Gates County",
			"code": 3773
		},
		{
			"stateCd": "NC",
			"desc": "Graham County",
			"code": 3774
		},
		{
			"stateCd": "NC",
			"desc": "Granville County",
			"code": 3775
		},
		{
			"stateCd": "NC",
			"desc": "Greene County",
			"code": 3776
		},
		{
			"stateCd": "NC",
			"desc": "Guilford County",
			"code": 3777
		},
		{
			"stateCd": "NC",
			"desc": "Halifax County",
			"code": 3778
		},
		{
			"stateCd": "NC",
			"desc": "Harnett County",
			"code": 3779
		},
		{
			"stateCd": "NC",
			"desc": "Haywood County",
			"code": 3780
		},
		{
			"stateCd": "NC",
			"desc": "Henderson County",
			"code": 3781
		},
		{
			"stateCd": "NC",
			"desc": "Hertford County",
			"code": 3782
		},
		{
			"stateCd": "NC",
			"desc": "Hoke County",
			"code": 3783
		},
		{
			"stateCd": "NC",
			"desc": "Hyde County",
			"code": 3784
		},
		{
			"stateCd": "NC",
			"desc": "Iredell County",
			"code": 3785
		},
		{
			"stateCd": "NC",
			"desc": "Jackson County",
			"code": 3786
		},
		{
			"stateCd": "NC",
			"desc": "Johnston County",
			"code": 3787
		},
		{
			"stateCd": "NC",
			"desc": "Jones County",
			"code": 3788
		},
		{
			"stateCd": "NC",
			"desc": "Lee County",
			"code": 3789
		},
		{
			"stateCd": "NC",
			"desc": "Lenoir County",
			"code": 3790
		},
		{
			"stateCd": "NC",
			"desc": "Lincoln County",
			"code": 3791
		},
		{
			"stateCd": "NC",
			"desc": "Macon County",
			"code": 3793
		},
		{
			"stateCd": "NC",
			"desc": "Madison County",
			"code": 3794
		},
		{
			"stateCd": "NC",
			"desc": "Martin County",
			"code": 3795
		},
		{
			"stateCd": "NC",
			"desc": "McDowell County",
			"code": 3792
		},
		{
			"stateCd": "NC",
			"desc": "Mecklenburg County",
			"code": 3796
		},
		{
			"stateCd": "NC",
			"desc": "Mitchell County",
			"code": 3797
		},
		{
			"stateCd": "NC",
			"desc": "Montgomery County",
			"code": 3798
		},
		{
			"stateCd": "NC",
			"desc": "Moore County",
			"code": 3799
		},
		{
			"stateCd": "NC",
			"desc": "Nash County",
			"code": 3800
		},
		{
			"stateCd": "NC",
			"desc": "New Hanover County",
			"code": 3801
		},
		{
			"stateCd": "NC",
			"desc": "Northampton County",
			"code": 3802
		},
		{
			"stateCd": "NC",
			"desc": "Onslow County",
			"code": 3803
		},
		{
			"stateCd": "NC",
			"desc": "Orange County",
			"code": 3804
		},
		{
			"stateCd": "NC",
			"desc": "Pamlico County",
			"code": 3805
		},
		{
			"stateCd": "NC",
			"desc": "Pasquotank County",
			"code": 3806
		},
		{
			"stateCd": "NC",
			"desc": "Pender County",
			"code": 3807
		},
		{
			"stateCd": "NC",
			"desc": "Perquimans County",
			"code": 3808
		},
		{
			"stateCd": "NC",
			"desc": "Person County",
			"code": 3809
		},
		{
			"stateCd": "NC",
			"desc": "Pitt County",
			"code": 3810
		},
		{
			"stateCd": "NC",
			"desc": "Polk County",
			"code": 3811
		},
		{
			"stateCd": "NC",
			"desc": "Randolph County",
			"code": 3812
		},
		{
			"stateCd": "NC",
			"desc": "Richmond County",
			"code": 3813
		},
		{
			"stateCd": "NC",
			"desc": "Robeson County",
			"code": 3814
		},
		{
			"stateCd": "NC",
			"desc": "Rockingham County",
			"code": 3815
		},
		{
			"stateCd": "NC",
			"desc": "Rowan County",
			"code": 3816
		},
		{
			"stateCd": "NC",
			"desc": "Rutherford County",
			"code": 3817
		},
		{
			"stateCd": "NC",
			"desc": "Sampson County",
			"code": 3818
		},
		{
			"stateCd": "NC",
			"desc": "Scotland County",
			"code": 3819
		},
		{
			"stateCd": "NC",
			"desc": "Stanly County",
			"code": 3820
		},
		{
			"stateCd": "NC",
			"desc": "Stokes County",
			"code": 3821
		},
		{
			"stateCd": "NC",
			"desc": "Surry County",
			"code": 3822
		},
		{
			"stateCd": "NC",
			"desc": "Swain County",
			"code": 3823
		},
		{
			"stateCd": "NC",
			"desc": "Transylvania County",
			"code": 3824
		},
		{
			"stateCd": "NC",
			"desc": "Tyrrell County",
			"code": 3825
		},
		{
			"stateCd": "NC",
			"desc": "Union County",
			"code": 3826
		},
		{
			"stateCd": "NC",
			"desc": "Vance County",
			"code": 3827
		},
		{
			"stateCd": "NC",
			"desc": "Wake County",
			"code": 3828
		},
		{
			"stateCd": "NC",
			"desc": "Warren County",
			"code": 3829
		},
		{
			"stateCd": "NC",
			"desc": "Washington County",
			"code": 3830
		},
		{
			"stateCd": "NC",
			"desc": "Watauga County",
			"code": 3831
		},
		{
			"stateCd": "NC",
			"desc": "Wayne County",
			"code": 3832
		},
		{
			"stateCd": "NC",
			"desc": "Wilkes County",
			"code": 3833
		},
		{
			"stateCd": "NC",
			"desc": "Wilson County",
			"code": 3834
		},
		{
			"stateCd": "NC",
			"desc": "Yadkin County",
			"code": 3835
		},
		{
			"stateCd": "NC",
			"desc": "Yancey County",
			"code": 3836
		},
		{
			"stateCd": "ND",
			"desc": "Adams County",
			"code": 3837
		},
		{
			"stateCd": "ND",
			"desc": "Barnes County",
			"code": 3838
		},
		{
			"stateCd": "ND",
			"desc": "Benson County",
			"code": 3839
		},
		{
			"stateCd": "ND",
			"desc": "Billings County",
			"code": 3840
		},
		{
			"stateCd": "ND",
			"desc": "Bottineau County",
			"code": 3841
		},
		{
			"stateCd": "ND",
			"desc": "Bowman County",
			"code": 3842
		},
		{
			"stateCd": "ND",
			"desc": "Burke County",
			"code": 3843
		},
		{
			"stateCd": "ND",
			"desc": "Burleigh County",
			"code": 3844
		},
		{
			"stateCd": "ND",
			"desc": "Cass County",
			"code": 3845
		},
		{
			"stateCd": "ND",
			"desc": "Cavalier County",
			"code": 3846
		},
		{
			"stateCd": "ND",
			"desc": "Dickey County",
			"code": 3847
		},
		{
			"stateCd": "ND",
			"desc": "Divide County",
			"code": 3848
		},
		{
			"stateCd": "ND",
			"desc": "Dunn County",
			"code": 3849
		},
		{
			"stateCd": "ND",
			"desc": "Eddy County",
			"code": 3850
		},
		{
			"stateCd": "ND",
			"desc": "Emmons County",
			"code": 3851
		},
		{
			"stateCd": "ND",
			"desc": "Foster County",
			"code": 3852
		},
		{
			"stateCd": "ND",
			"desc": "Golden Valley County",
			"code": 3853
		},
		{
			"stateCd": "ND",
			"desc": "Grand Forks County",
			"code": 3854
		},
		{
			"stateCd": "ND",
			"desc": "Grant County",
			"code": 3855
		},
		{
			"stateCd": "ND",
			"desc": "Griggs County",
			"code": 3856
		},
		{
			"stateCd": "ND",
			"desc": "Hettinger County",
			"code": 3857
		},
		{
			"stateCd": "ND",
			"desc": "Kidder County",
			"code": 3858
		},
		{
			"stateCd": "ND",
			"desc": "LaMoure County",
			"code": 3859
		},
		{
			"stateCd": "ND",
			"desc": "Logan County",
			"code": 3860
		},
		{
			"stateCd": "ND",
			"desc": "McHenry County",
			"code": 3861
		},
		{
			"stateCd": "ND",
			"desc": "McIntosh County",
			"code": 3862
		},
		{
			"stateCd": "ND",
			"desc": "McKenzie County",
			"code": 3863
		},
		{
			"stateCd": "ND",
			"desc": "McLean County",
			"code": 3864
		},
		{
			"stateCd": "ND",
			"desc": "Mercer County",
			"code": 3865
		},
		{
			"stateCd": "ND",
			"desc": "Morton County",
			"code": 3866
		},
		{
			"stateCd": "ND",
			"desc": "Mountrail County",
			"code": 3867
		},
		{
			"stateCd": "ND",
			"desc": "Nelson County",
			"code": 3868
		},
		{
			"stateCd": "ND",
			"desc": "Oliver County",
			"code": 3869
		},
		{
			"stateCd": "ND",
			"desc": "Pembina County",
			"code": 3870
		},
		{
			"stateCd": "ND",
			"desc": "Pierce County",
			"code": 3871
		},
		{
			"stateCd": "ND",
			"desc": "Ramsey County",
			"code": 3872
		},
		{
			"stateCd": "ND",
			"desc": "Ransom County",
			"code": 3873
		},
		{
			"stateCd": "ND",
			"desc": "Renville County",
			"code": 3874
		},
		{
			"stateCd": "ND",
			"desc": "Richland County",
			"code": 3875
		},
		{
			"stateCd": "ND",
			"desc": "Rolette County",
			"code": 3876
		},
		{
			"stateCd": "ND",
			"desc": "Sargent County",
			"code": 3877
		},
		{
			"stateCd": "ND",
			"desc": "Sheridan County",
			"code": 3878
		},
		{
			"stateCd": "ND",
			"desc": "Sioux County",
			"code": 3879
		},
		{
			"stateCd": "ND",
			"desc": "Slope County",
			"code": 3880
		},
		{
			"stateCd": "ND",
			"desc": "Stark County",
			"code": 3881
		},
		{
			"stateCd": "ND",
			"desc": "Steele County",
			"code": 3882
		},
		{
			"stateCd": "ND",
			"desc": "Stutsman County",
			"code": 3883
		},
		{
			"stateCd": "ND",
			"desc": "Towner County",
			"code": 3884
		},
		{
			"stateCd": "ND",
			"desc": "Traill County",
			"code": 3885
		},
		{
			"stateCd": "ND",
			"desc": "Walsh County",
			"code": 3886
		},
		{
			"stateCd": "ND",
			"desc": "Ward County",
			"code": 3887
		},
		{
			"stateCd": "ND",
			"desc": "Wells County",
			"code": 3888
		},
		{
			"stateCd": "ND",
			"desc": "Williams County",
			"code": 3889
		},
		{
			"stateCd": "NE",
			"desc": "Adams County",
			"code": 3501
		},
		{
			"stateCd": "NE",
			"desc": "Antelope County",
			"code": 3502
		},
		{
			"stateCd": "NE",
			"desc": "Arthur County",
			"code": 3503
		},
		{
			"stateCd": "NE",
			"desc": "Banner County",
			"code": 3504
		},
		{
			"stateCd": "NE",
			"desc": "Blaine County",
			"code": 3505
		},
		{
			"stateCd": "NE",
			"desc": "Boone County",
			"code": 3506
		},
		{
			"stateCd": "NE",
			"desc": "Box Butte County",
			"code": 3507
		},
		{
			"stateCd": "NE",
			"desc": "Boyd County",
			"code": 3508
		},
		{
			"stateCd": "NE",
			"desc": "Brown County",
			"code": 3509
		},
		{
			"stateCd": "NE",
			"desc": "Buffalo County",
			"code": 3510
		},
		{
			"stateCd": "NE",
			"desc": "Burt County",
			"code": 3511
		},
		{
			"stateCd": "NE",
			"desc": "Butler County",
			"code": 3512
		},
		{
			"stateCd": "NE",
			"desc": "Cass County",
			"code": 3513
		},
		{
			"stateCd": "NE",
			"desc": "Cedar County",
			"code": 3514
		},
		{
			"stateCd": "NE",
			"desc": "Chase County",
			"code": 3515
		},
		{
			"stateCd": "NE",
			"desc": "Cherry County",
			"code": 3516
		},
		{
			"stateCd": "NE",
			"desc": "Cheyenne County",
			"code": 3517
		},
		{
			"stateCd": "NE",
			"desc": "Clay County",
			"code": 3518
		},
		{
			"stateCd": "NE",
			"desc": "Colfax County",
			"code": 3519
		},
		{
			"stateCd": "NE",
			"desc": "Cuming County",
			"code": 3520
		},
		{
			"stateCd": "NE",
			"desc": "Custer County",
			"code": 3521
		},
		{
			"stateCd": "NE",
			"desc": "Dakota County",
			"code": 3522
		},
		{
			"stateCd": "NE",
			"desc": "Dawes County",
			"code": 3523
		},
		{
			"stateCd": "NE",
			"desc": "Dawson County",
			"code": 3524
		},
		{
			"stateCd": "NE",
			"desc": "Deuel County",
			"code": 3525
		},
		{
			"stateCd": "NE",
			"desc": "Dixon County",
			"code": 3526
		},
		{
			"stateCd": "NE",
			"desc": "Dodge County",
			"code": 3527
		},
		{
			"stateCd": "NE",
			"desc": "Douglas County",
			"code": 3528
		},
		{
			"stateCd": "NE",
			"desc": "Dundy County",
			"code": 3529
		},
		{
			"stateCd": "NE",
			"desc": "Fillmore County",
			"code": 3530
		},
		{
			"stateCd": "NE",
			"desc": "Franklin County",
			"code": 3531
		},
		{
			"stateCd": "NE",
			"desc": "Frontier County",
			"code": 3532
		},
		{
			"stateCd": "NE",
			"desc": "Furnas County",
			"code": 3533
		},
		{
			"stateCd": "NE",
			"desc": "Gage County",
			"code": 3534
		},
		{
			"stateCd": "NE",
			"desc": "Garden County",
			"code": 3535
		},
		{
			"stateCd": "NE",
			"desc": "Garfield County",
			"code": 3536
		},
		{
			"stateCd": "NE",
			"desc": "Gosper County",
			"code": 3537
		},
		{
			"stateCd": "NE",
			"desc": "Grant County",
			"code": 3538
		},
		{
			"stateCd": "NE",
			"desc": "Greeley County",
			"code": 3539
		},
		{
			"stateCd": "NE",
			"desc": "Hall County",
			"code": 3540
		},
		{
			"stateCd": "NE",
			"desc": "Hamilton County",
			"code": 3541
		},
		{
			"stateCd": "NE",
			"desc": "Harlan County",
			"code": 3542
		},
		{
			"stateCd": "NE",
			"desc": "Hayes County",
			"code": 3543
		},
		{
			"stateCd": "NE",
			"desc": "Hitchcock County",
			"code": 3544
		},
		{
			"stateCd": "NE",
			"desc": "Holt County",
			"code": 3545
		},
		{
			"stateCd": "NE",
			"desc": "Hooker County",
			"code": 3546
		},
		{
			"stateCd": "NE",
			"desc": "Howard County",
			"code": 3547
		},
		{
			"stateCd": "NE",
			"desc": "Jefferson County",
			"code": 3548
		},
		{
			"stateCd": "NE",
			"desc": "Johnson County",
			"code": 3549
		},
		{
			"stateCd": "NE",
			"desc": "Kearney County",
			"code": 3550
		},
		{
			"stateCd": "NE",
			"desc": "Keith County",
			"code": 3551
		},
		{
			"stateCd": "NE",
			"desc": "Keya Paha County",
			"code": 3552
		},
		{
			"stateCd": "NE",
			"desc": "Kimball County",
			"code": 3553
		},
		{
			"stateCd": "NE",
			"desc": "Knox County",
			"code": 3554
		},
		{
			"stateCd": "NE",
			"desc": "Lancaster County",
			"code": 3555
		},
		{
			"stateCd": "NE",
			"desc": "Lincoln County",
			"code": 3556
		},
		{
			"stateCd": "NE",
			"desc": "Logan County",
			"code": 3557
		},
		{
			"stateCd": "NE",
			"desc": "Loup County",
			"code": 3558
		},
		{
			"stateCd": "NE",
			"desc": "Madison County",
			"code": 3560
		},
		{
			"stateCd": "NE",
			"desc": "McPherson County",
			"code": 3559
		},
		{
			"stateCd": "NE",
			"desc": "Merrick County",
			"code": 3561
		},
		{
			"stateCd": "NE",
			"desc": "Morrill County",
			"code": 3562
		},
		{
			"stateCd": "NE",
			"desc": "Nance County",
			"code": 3563
		},
		{
			"stateCd": "NE",
			"desc": "Nemaha County",
			"code": 3564
		},
		{
			"stateCd": "NE",
			"desc": "Nuckolls County",
			"code": 3565
		},
		{
			"stateCd": "NE",
			"desc": "Otoe County",
			"code": 3566
		},
		{
			"stateCd": "NE",
			"desc": "Pawnee County",
			"code": 3567
		},
		{
			"stateCd": "NE",
			"desc": "Perkins County",
			"code": 3568
		},
		{
			"stateCd": "NE",
			"desc": "Phelps County",
			"code": 3569
		},
		{
			"stateCd": "NE",
			"desc": "Pierce County",
			"code": 3570
		},
		{
			"stateCd": "NE",
			"desc": "Platte County",
			"code": 3571
		},
		{
			"stateCd": "NE",
			"desc": "Polk County",
			"code": 3572
		},
		{
			"stateCd": "NE",
			"desc": "Red Willow County",
			"code": 3573
		},
		{
			"stateCd": "NE",
			"desc": "Richardson County",
			"code": 3574
		},
		{
			"stateCd": "NE",
			"desc": "Rock County",
			"code": 3575
		},
		{
			"stateCd": "NE",
			"desc": "Saline County",
			"code": 3576
		},
		{
			"stateCd": "NE",
			"desc": "Sarpy County",
			"code": 3577
		},
		{
			"stateCd": "NE",
			"desc": "Saunders County",
			"code": 3578
		},
		{
			"stateCd": "NE",
			"desc": "Scotts Bluff County",
			"code": 3579
		},
		{
			"stateCd": "NE",
			"desc": "Seward County",
			"code": 3580
		},
		{
			"stateCd": "NE",
			"desc": "Sheridan County",
			"code": 3581
		},
		{
			"stateCd": "NE",
			"desc": "Sherman County",
			"code": 3582
		},
		{
			"stateCd": "NE",
			"desc": "Sioux County",
			"code": 3583
		},
		{
			"stateCd": "NE",
			"desc": "Stanton County",
			"code": 3584
		},
		{
			"stateCd": "NE",
			"desc": "Thayer County",
			"code": 3585
		},
		{
			"stateCd": "NE",
			"desc": "Thomas County",
			"code": 3586
		},
		{
			"stateCd": "NE",
			"desc": "Thurston County",
			"code": 3587
		},
		{
			"stateCd": "NE",
			"desc": "Valley County",
			"code": 3588
		},
		{
			"stateCd": "NE",
			"desc": "Washington County",
			"code": 3589
		},
		{
			"stateCd": "NE",
			"desc": "Wayne County",
			"code": 3590
		},
		{
			"stateCd": "NE",
			"desc": "Webster County",
			"code": 3591
		},
		{
			"stateCd": "NE",
			"desc": "Wheeler County",
			"code": 3592
		},
		{
			"stateCd": "NE",
			"desc": "York County",
			"code": 3593
		},
		{
			"stateCd": "NH",
			"desc": "Belknap County",
			"code": 3611
		},
		{
			"stateCd": "NH",
			"desc": "Carroll County",
			"code": 3612
		},
		{
			"stateCd": "NH",
			"desc": "Cheshire County",
			"code": 3613
		},
		{
			"stateCd": "NH",
			"desc": "Coos County",
			"code": 3614
		},
		{
			"stateCd": "NH",
			"desc": "Grafton County",
			"code": 3615
		},
		{
			"stateCd": "NH",
			"desc": "Hillsborough County",
			"code": 3616
		},
		{
			"stateCd": "NH",
			"desc": "Merrimack County",
			"code": 3617
		},
		{
			"stateCd": "NH",
			"desc": "Rockingham County",
			"code": 3618
		},
		{
			"stateCd": "NH",
			"desc": "Strafford County",
			"code": 3619
		},
		{
			"stateCd": "NH",
			"desc": "Sullivan County",
			"code": 3620
		},
		{
			"stateCd": "NJ",
			"desc": "Atlantic County",
			"code": 3621
		},
		{
			"stateCd": "NJ",
			"desc": "Bergen County",
			"code": 3622
		},
		{
			"stateCd": "NJ",
			"desc": "Burlington County",
			"code": 3623
		},
		{
			"stateCd": "NJ",
			"desc": "Camden County",
			"code": 3624
		},
		{
			"stateCd": "NJ",
			"desc": "Cape May County",
			"code": 3625
		},
		{
			"stateCd": "NJ",
			"desc": "Cumberland County",
			"code": 3626
		},
		{
			"stateCd": "NJ",
			"desc": "Essex County",
			"code": 3627
		},
		{
			"stateCd": "NJ",
			"desc": "Gloucester County",
			"code": 3628
		},
		{
			"stateCd": "NJ",
			"desc": "Hudson County",
			"code": 3629
		},
		{
			"stateCd": "NJ",
			"desc": "Hunterdon County",
			"code": 3630
		},
		{
			"stateCd": "NJ",
			"desc": "Mercer County",
			"code": 3631
		},
		{
			"stateCd": "NJ",
			"desc": "Middlesex County",
			"code": 3632
		},
		{
			"stateCd": "NJ",
			"desc": "Monmouth County",
			"code": 3633
		},
		{
			"stateCd": "NJ",
			"desc": "Morris County",
			"code": 3634
		},
		{
			"stateCd": "NJ",
			"desc": "Ocean County",
			"code": 3635
		},
		{
			"stateCd": "NJ",
			"desc": "Passaic County",
			"code": 3636
		},
		{
			"stateCd": "NJ",
			"desc": "Salem County",
			"code": 3637
		},
		{
			"stateCd": "NJ",
			"desc": "Somerset County",
			"code": 3638
		},
		{
			"stateCd": "NJ",
			"desc": "Sussex County",
			"code": 3639
		},
		{
			"stateCd": "NJ",
			"desc": "Union County",
			"code": 3640
		},
		{
			"stateCd": "NJ",
			"desc": "Warren County",
			"code": 3641
		},
		{
			"stateCd": "NM",
			"desc": "Bernalillo County",
			"code": 3642
		},
		{
			"stateCd": "NM",
			"desc": "Catron County",
			"code": 3643
		},
		{
			"stateCd": "NM",
			"desc": "Chaves County",
			"code": 3644
		},
		{
			"stateCd": "NM",
			"desc": "Cibola County",
			"code": 3645
		},
		{
			"stateCd": "NM",
			"desc": "Colfax County",
			"code": 3646
		},
		{
			"stateCd": "NM",
			"desc": "Curry County",
			"code": 3647
		},
		{
			"stateCd": "NM",
			"desc": "De Baca County",
			"code": 3648
		},
		{
			"stateCd": "NM",
			"desc": "Do±a Ana County",
			"code": 3649
		},
		{
			"stateCd": "NM",
			"desc": "Eddy County",
			"code": 3650
		},
		{
			"stateCd": "NM",
			"desc": "Grant County",
			"code": 3651
		},
		{
			"stateCd": "NM",
			"desc": "Guadalupe County",
			"code": 3652
		},
		{
			"stateCd": "NM",
			"desc": "Harding County",
			"code": 3653
		},
		{
			"stateCd": "NM",
			"desc": "Hidalgo County",
			"code": 3654
		},
		{
			"stateCd": "NM",
			"desc": "Lea County",
			"code": 3655
		},
		{
			"stateCd": "NM",
			"desc": "Lincoln County",
			"code": 3656
		},
		{
			"stateCd": "NM",
			"desc": "Los Alamos County",
			"code": 3657
		},
		{
			"stateCd": "NM",
			"desc": "Luna County",
			"code": 3658
		},
		{
			"stateCd": "NM",
			"desc": "McKinley County",
			"code": 3659
		},
		{
			"stateCd": "NM",
			"desc": "Mora County",
			"code": 3660
		},
		{
			"stateCd": "NM",
			"desc": "Otero County",
			"code": 3661
		},
		{
			"stateCd": "NM",
			"desc": "Quay County",
			"code": 3662
		},
		{
			"stateCd": "NM",
			"desc": "Rio Arriba County",
			"code": 3663
		},
		{
			"stateCd": "NM",
			"desc": "Roosevelt County",
			"code": 3664
		},
		{
			"stateCd": "NM",
			"desc": "San Juan County",
			"code": 3666
		},
		{
			"stateCd": "NM",
			"desc": "San Miguel County",
			"code": 3667
		},
		{
			"stateCd": "NM",
			"desc": "Sandoval County",
			"code": 3665
		},
		{
			"stateCd": "NM",
			"desc": "Santa Fe County",
			"code": 3668
		},
		{
			"stateCd": "NM",
			"desc": "Sierra County",
			"code": 3669
		},
		{
			"stateCd": "NM",
			"desc": "Socorro County",
			"code": 3670
		},
		{
			"stateCd": "NM",
			"desc": "Taos County",
			"code": 3671
		},
		{
			"stateCd": "NM",
			"desc": "Torrance County",
			"code": 3672
		},
		{
			"stateCd": "NM",
			"desc": "Union County",
			"code": 3673
		},
		{
			"stateCd": "NM",
			"desc": "Valencia County",
			"code": 3674
		},
		{
			"stateCd": "NV",
			"desc": "Carson City",
			"code": 3610
		},
		{
			"stateCd": "NV",
			"desc": "Churchill County",
			"code": 3594
		},
		{
			"stateCd": "NV",
			"desc": "Clark County",
			"code": 3595
		},
		{
			"stateCd": "NV",
			"desc": "Douglas County",
			"code": 3596
		},
		{
			"stateCd": "NV",
			"desc": "Elko County",
			"code": 3597
		},
		{
			"stateCd": "NV",
			"desc": "Esmeralda County",
			"code": 3598
		},
		{
			"stateCd": "NV",
			"desc": "Eureka County",
			"code": 3599
		},
		{
			"stateCd": "NV",
			"desc": "Humboldt County",
			"code": 3600
		},
		{
			"stateCd": "NV",
			"desc": "Lander County",
			"code": 3601
		},
		{
			"stateCd": "NV",
			"desc": "Lincoln County",
			"code": 3602
		},
		{
			"stateCd": "NV",
			"desc": "Lyon County",
			"code": 3603
		},
		{
			"stateCd": "NV",
			"desc": "Mineral County",
			"code": 3604
		},
		{
			"stateCd": "NV",
			"desc": "Nye County",
			"code": 3605
		},
		{
			"stateCd": "NV",
			"desc": "Pershing County",
			"code": 3606
		},
		{
			"stateCd": "NV",
			"desc": "Storey County",
			"code": 3607
		},
		{
			"stateCd": "NV",
			"desc": "Washoe County",
			"code": 3608
		},
		{
			"stateCd": "NV",
			"desc": "White Pine County",
			"code": 3609
		},
		{
			"stateCd": "NY",
			"desc": "Albany County",
			"code": 3675
		},
		{
			"stateCd": "NY",
			"desc": "Allegany County",
			"code": 3676
		},
		{
			"stateCd": "NY",
			"desc": "Bronx County",
			"code": 3677
		},
		{
			"stateCd": "NY",
			"desc": "Broome County",
			"code": 3678
		},
		{
			"stateCd": "NY",
			"desc": "Cattaraugus County",
			"code": 3679
		},
		{
			"stateCd": "NY",
			"desc": "Cayuga County",
			"code": 3680
		},
		{
			"stateCd": "NY",
			"desc": "Chautauqua County",
			"code": 3681
		},
		{
			"stateCd": "NY",
			"desc": "Chemung County",
			"code": 3682
		},
		{
			"stateCd": "NY",
			"desc": "Chenango County",
			"code": 3683
		},
		{
			"stateCd": "NY",
			"desc": "Clinton County",
			"code": 3684
		},
		{
			"stateCd": "NY",
			"desc": "Columbia County",
			"code": 3685
		},
		{
			"stateCd": "NY",
			"desc": "Cortland County",
			"code": 3686
		},
		{
			"stateCd": "NY",
			"desc": "Delaware County",
			"code": 3687
		},
		{
			"stateCd": "NY",
			"desc": "Dutchess County",
			"code": 3688
		},
		{
			"stateCd": "NY",
			"desc": "Erie County",
			"code": 3689
		},
		{
			"stateCd": "NY",
			"desc": "Essex County",
			"code": 3690
		},
		{
			"stateCd": "NY",
			"desc": "Franklin County",
			"code": 3691
		},
		{
			"stateCd": "NY",
			"desc": "Fulton County",
			"code": 3692
		},
		{
			"stateCd": "NY",
			"desc": "Genesee County",
			"code": 3693
		},
		{
			"stateCd": "NY",
			"desc": "Greene County",
			"code": 3694
		},
		{
			"stateCd": "NY",
			"desc": "Hamilton County",
			"code": 3695
		},
		{
			"stateCd": "NY",
			"desc": "Herkimer County",
			"code": 3696
		},
		{
			"stateCd": "NY",
			"desc": "Jefferson County",
			"code": 3697
		},
		{
			"stateCd": "NY",
			"desc": "Kings County",
			"code": 3698
		},
		{
			"stateCd": "NY",
			"desc": "Lewis County",
			"code": 3699
		},
		{
			"stateCd": "NY",
			"desc": "Livingston County",
			"code": 3700
		},
		{
			"stateCd": "NY",
			"desc": "Madison County",
			"code": 3701
		},
		{
			"stateCd": "NY",
			"desc": "Monroe County",
			"code": 3702
		},
		{
			"stateCd": "NY",
			"desc": "Montgomery County",
			"code": 3703
		},
		{
			"stateCd": "NY",
			"desc": "Nassau County",
			"code": 3704
		},
		{
			"stateCd": "NY",
			"desc": "New York County",
			"code": 3705
		},
		{
			"stateCd": "NY",
			"desc": "Niagara County",
			"code": 3706
		},
		{
			"stateCd": "NY",
			"desc": "Oneida County",
			"code": 3707
		},
		{
			"stateCd": "NY",
			"desc": "Onondaga County",
			"code": 3708
		},
		{
			"stateCd": "NY",
			"desc": "Ontario County",
			"code": 3709
		},
		{
			"stateCd": "NY",
			"desc": "Orange County",
			"code": 3710
		},
		{
			"stateCd": "NY",
			"desc": "Orleans County",
			"code": 3711
		},
		{
			"stateCd": "NY",
			"desc": "Oswego County",
			"code": 3712
		},
		{
			"stateCd": "NY",
			"desc": "Otsego County",
			"code": 3713
		},
		{
			"stateCd": "NY",
			"desc": "Putnam County",
			"code": 3714
		},
		{
			"stateCd": "NY",
			"desc": "Queens County",
			"code": 3715
		},
		{
			"stateCd": "NY",
			"desc": "Rensselaer County",
			"code": 3716
		},
		{
			"stateCd": "NY",
			"desc": "Richmond County",
			"code": 3717
		},
		{
			"stateCd": "NY",
			"desc": "Rockland County",
			"code": 3718
		},
		{
			"stateCd": "NY",
			"desc": "Saratoga County",
			"code": 3720
		},
		{
			"stateCd": "NY",
			"desc": "Schenectady County",
			"code": 3721
		},
		{
			"stateCd": "NY",
			"desc": "Schoharie County",
			"code": 3722
		},
		{
			"stateCd": "NY",
			"desc": "Schuyler County",
			"code": 3723
		},
		{
			"stateCd": "NY",
			"desc": "Seneca County",
			"code": 3724
		},
		{
			"stateCd": "NY",
			"desc": "St. Lawrence County",
			"code": 3719
		},
		{
			"stateCd": "NY",
			"desc": "Steuben County",
			"code": 3725
		},
		{
			"stateCd": "NY",
			"desc": "Suffolk County",
			"code": 3726
		},
		{
			"stateCd": "NY",
			"desc": "Sullivan County",
			"code": 3727
		},
		{
			"stateCd": "NY",
			"desc": "Tioga County",
			"code": 3728
		},
		{
			"stateCd": "NY",
			"desc": "Tompkins County",
			"code": 3729
		},
		{
			"stateCd": "NY",
			"desc": "Ulster County",
			"code": 3730
		},
		{
			"stateCd": "NY",
			"desc": "Warren County",
			"code": 3731
		},
		{
			"stateCd": "NY",
			"desc": "Washington County",
			"code": 3732
		},
		{
			"stateCd": "NY",
			"desc": "Wayne County",
			"code": 3733
		},
		{
			"stateCd": "NY",
			"desc": "Westchester County",
			"code": 3734
		},
		{
			"stateCd": "NY",
			"desc": "Wyoming County",
			"code": 3735
		},
		{
			"stateCd": "NY",
			"desc": "Yates County",
			"code": 3736
		},
		{
			"stateCd": "OH",
			"desc": "Adams County",
			"code": 3890
		},
		{
			"stateCd": "OH",
			"desc": "Allen County",
			"code": 3891
		},
		{
			"stateCd": "OH",
			"desc": "Ashland County",
			"code": 3892
		},
		{
			"stateCd": "OH",
			"desc": "Ashtabula County",
			"code": 3893
		},
		{
			"stateCd": "OH",
			"desc": "Athens County",
			"code": 3894
		},
		{
			"stateCd": "OH",
			"desc": "Auglaize County",
			"code": 3895
		},
		{
			"stateCd": "OH",
			"desc": "Belmont County",
			"code": 3896
		},
		{
			"stateCd": "OH",
			"desc": "Brown County",
			"code": 3897
		},
		{
			"stateCd": "OH",
			"desc": "Butler County",
			"code": 3898
		},
		{
			"stateCd": "OH",
			"desc": "Carroll County",
			"code": 3899
		},
		{
			"stateCd": "OH",
			"desc": "Champaign County",
			"code": 3900
		},
		{
			"stateCd": "OH",
			"desc": "Clark County",
			"code": 3901
		},
		{
			"stateCd": "OH",
			"desc": "Clermont County",
			"code": 3902
		},
		{
			"stateCd": "OH",
			"desc": "Clinton County",
			"code": 3903
		},
		{
			"stateCd": "OH",
			"desc": "Columbiana County",
			"code": 3904
		},
		{
			"stateCd": "OH",
			"desc": "Coshocton County",
			"code": 3905
		},
		{
			"stateCd": "OH",
			"desc": "Crawford County",
			"code": 3906
		},
		{
			"stateCd": "OH",
			"desc": "Cuyahoga County",
			"code": 3907
		},
		{
			"stateCd": "OH",
			"desc": "Darke County",
			"code": 3908
		},
		{
			"stateCd": "OH",
			"desc": "Defiance County",
			"code": 3909
		},
		{
			"stateCd": "OH",
			"desc": "Delaware County",
			"code": 3910
		},
		{
			"stateCd": "OH",
			"desc": "Erie County",
			"code": 3911
		},
		{
			"stateCd": "OH",
			"desc": "Fairfield County",
			"code": 3912
		},
		{
			"stateCd": "OH",
			"desc": "Fayette County",
			"code": 3913
		},
		{
			"stateCd": "OH",
			"desc": "Franklin County",
			"code": 3914
		},
		{
			"stateCd": "OH",
			"desc": "Fulton County",
			"code": 3915
		},
		{
			"stateCd": "OH",
			"desc": "Gallia County",
			"code": 3916
		},
		{
			"stateCd": "OH",
			"desc": "Geauga County",
			"code": 3917
		},
		{
			"stateCd": "OH",
			"desc": "Greene County",
			"code": 3918
		},
		{
			"stateCd": "OH",
			"desc": "Guernsey County",
			"code": 3919
		},
		{
			"stateCd": "OH",
			"desc": "Hamilton County",
			"code": 3920
		},
		{
			"stateCd": "OH",
			"desc": "Hancock County",
			"code": 3921
		},
		{
			"stateCd": "OH",
			"desc": "Hardin County",
			"code": 3922
		},
		{
			"stateCd": "OH",
			"desc": "Harrison County",
			"code": 3923
		},
		{
			"stateCd": "OH",
			"desc": "Henry County",
			"code": 3924
		},
		{
			"stateCd": "OH",
			"desc": "Highland County",
			"code": 3925
		},
		{
			"stateCd": "OH",
			"desc": "Hocking County",
			"code": 3926
		},
		{
			"stateCd": "OH",
			"desc": "Holmes County",
			"code": 3927
		},
		{
			"stateCd": "OH",
			"desc": "Huron County",
			"code": 3928
		},
		{
			"stateCd": "OH",
			"desc": "Jackson County",
			"code": 3929
		},
		{
			"stateCd": "OH",
			"desc": "Jefferson County",
			"code": 3930
		},
		{
			"stateCd": "OH",
			"desc": "Knox County",
			"code": 3931
		},
		{
			"stateCd": "OH",
			"desc": "Lake County",
			"code": 3932
		},
		{
			"stateCd": "OH",
			"desc": "Lawrence County",
			"code": 3933
		},
		{
			"stateCd": "OH",
			"desc": "Licking County",
			"code": 3934
		},
		{
			"stateCd": "OH",
			"desc": "Logan County",
			"code": 3935
		},
		{
			"stateCd": "OH",
			"desc": "Lorain County",
			"code": 3936
		},
		{
			"stateCd": "OH",
			"desc": "Lucas County",
			"code": 3937
		},
		{
			"stateCd": "OH",
			"desc": "Madison County",
			"code": 3938
		},
		{
			"stateCd": "OH",
			"desc": "Mahoning County",
			"code": 3939
		},
		{
			"stateCd": "OH",
			"desc": "Marion County",
			"code": 3940
		},
		{
			"stateCd": "OH",
			"desc": "Medina County",
			"code": 3941
		},
		{
			"stateCd": "OH",
			"desc": "Meigs County",
			"code": 3942
		},
		{
			"stateCd": "OH",
			"desc": "Mercer County",
			"code": 3943
		},
		{
			"stateCd": "OH",
			"desc": "Miami County",
			"code": 3944
		},
		{
			"stateCd": "OH",
			"desc": "Monroe County",
			"code": 3945
		},
		{
			"stateCd": "OH",
			"desc": "Montgomery County",
			"code": 3946
		},
		{
			"stateCd": "OH",
			"desc": "Morgan County",
			"code": 3947
		},
		{
			"stateCd": "OH",
			"desc": "Morrow County",
			"code": 3948
		},
		{
			"stateCd": "OH",
			"desc": "Muskingum County",
			"code": 3949
		},
		{
			"stateCd": "OH",
			"desc": "Noble County",
			"code": 3950
		},
		{
			"stateCd": "OH",
			"desc": "Ottawa County",
			"code": 3951
		},
		{
			"stateCd": "OH",
			"desc": "Paulding County",
			"code": 3952
		},
		{
			"stateCd": "OH",
			"desc": "Perry County",
			"code": 3953
		},
		{
			"stateCd": "OH",
			"desc": "Pickaway County",
			"code": 3954
		},
		{
			"stateCd": "OH",
			"desc": "Pike County",
			"code": 3955
		},
		{
			"stateCd": "OH",
			"desc": "Portage County",
			"code": 3956
		},
		{
			"stateCd": "OH",
			"desc": "Preble County",
			"code": 3957
		},
		{
			"stateCd": "OH",
			"desc": "Putnam County",
			"code": 3958
		},
		{
			"stateCd": "OH",
			"desc": "Richland County",
			"code": 3959
		},
		{
			"stateCd": "OH",
			"desc": "Ross County",
			"code": 3960
		},
		{
			"stateCd": "OH",
			"desc": "Sandusky County",
			"code": 3961
		},
		{
			"stateCd": "OH",
			"desc": "Scioto County",
			"code": 3962
		},
		{
			"stateCd": "OH",
			"desc": "Seneca County",
			"code": 3963
		},
		{
			"stateCd": "OH",
			"desc": "Shelby County",
			"code": 3964
		},
		{
			"stateCd": "OH",
			"desc": "Stark County",
			"code": 3965
		},
		{
			"stateCd": "OH",
			"desc": "Summit County",
			"code": 3966
		},
		{
			"stateCd": "OH",
			"desc": "Trumbull County",
			"code": 3967
		},
		{
			"stateCd": "OH",
			"desc": "Tuscarawas County",
			"code": 3968
		},
		{
			"stateCd": "OH",
			"desc": "Union County",
			"code": 3969
		},
		{
			"stateCd": "OH",
			"desc": "Van Wert County",
			"code": 3970
		},
		{
			"stateCd": "OH",
			"desc": "Vinton County",
			"code": 3971
		},
		{
			"stateCd": "OH",
			"desc": "Warren County",
			"code": 3972
		},
		{
			"stateCd": "OH",
			"desc": "Washington County",
			"code": 3973
		},
		{
			"stateCd": "OH",
			"desc": "Wayne County",
			"code": 3974
		},
		{
			"stateCd": "OH",
			"desc": "Williams County",
			"code": 3975
		},
		{
			"stateCd": "OH",
			"desc": "Wood County",
			"code": 3976
		},
		{
			"stateCd": "OH",
			"desc": "Wyandot County",
			"code": 3977
		},
		{
			"stateCd": "OK",
			"desc": "Adair County",
			"code": 3978
		},
		{
			"stateCd": "OK",
			"desc": "Alfalfa County",
			"code": 3979
		},
		{
			"stateCd": "OK",
			"desc": "Atoka County",
			"code": 3980
		},
		{
			"stateCd": "OK",
			"desc": "Beaver County",
			"code": 3981
		},
		{
			"stateCd": "OK",
			"desc": "Beckham County",
			"code": 3982
		},
		{
			"stateCd": "OK",
			"desc": "Blaine County",
			"code": 3983
		},
		{
			"stateCd": "OK",
			"desc": "Bryan County",
			"code": 3984
		},
		{
			"stateCd": "OK",
			"desc": "Caddo County",
			"code": 3985
		},
		{
			"stateCd": "OK",
			"desc": "Canadian County",
			"code": 3986
		},
		{
			"stateCd": "OK",
			"desc": "Carter County",
			"code": 3987
		},
		{
			"stateCd": "OK",
			"desc": "Cherokee County",
			"code": 3988
		},
		{
			"stateCd": "OK",
			"desc": "Choctaw County",
			"code": 3989
		},
		{
			"stateCd": "OK",
			"desc": "Cimarron County",
			"code": 3990
		},
		{
			"stateCd": "OK",
			"desc": "Cleveland County",
			"code": 3991
		},
		{
			"stateCd": "OK",
			"desc": "Coal County",
			"code": 3992
		},
		{
			"stateCd": "OK",
			"desc": "Comanche County",
			"code": 3993
		},
		{
			"stateCd": "OK",
			"desc": "Cotton County",
			"code": 3994
		},
		{
			"stateCd": "OK",
			"desc": "Craig County",
			"code": 3995
		},
		{
			"stateCd": "OK",
			"desc": "Creek County",
			"code": 3996
		},
		{
			"stateCd": "OK",
			"desc": "Custer County",
			"code": 3997
		},
		{
			"stateCd": "OK",
			"desc": "Delaware County",
			"code": 3998
		},
		{
			"stateCd": "OK",
			"desc": "Dewey County",
			"code": 3999
		},
		{
			"stateCd": "OK",
			"desc": "Ellis County",
			"code": 4000
		},
		{
			"stateCd": "OK",
			"desc": "Garfield County",
			"code": 4001
		},
		{
			"stateCd": "OK",
			"desc": "Garvin County",
			"code": 4002
		},
		{
			"stateCd": "OK",
			"desc": "Grady County",
			"code": 4003
		},
		{
			"stateCd": "OK",
			"desc": "Grant County",
			"code": 4004
		},
		{
			"stateCd": "OK",
			"desc": "Greer County",
			"code": 4005
		},
		{
			"stateCd": "OK",
			"desc": "Harmon County",
			"code": 4006
		},
		{
			"stateCd": "OK",
			"desc": "Harper County",
			"code": 4007
		},
		{
			"stateCd": "OK",
			"desc": "Haskell County",
			"code": 4008
		},
		{
			"stateCd": "OK",
			"desc": "Hughes County",
			"code": 4009
		},
		{
			"stateCd": "OK",
			"desc": "Jackson County",
			"code": 4010
		},
		{
			"stateCd": "OK",
			"desc": "Jefferson County",
			"code": 4011
		},
		{
			"stateCd": "OK",
			"desc": "Johnston County",
			"code": 4012
		},
		{
			"stateCd": "OK",
			"desc": "Kay County",
			"code": 4013
		},
		{
			"stateCd": "OK",
			"desc": "Kingfisher County",
			"code": 4014
		},
		{
			"stateCd": "OK",
			"desc": "Kiowa County",
			"code": 4015
		},
		{
			"stateCd": "OK",
			"desc": "Latimer County",
			"code": 4016
		},
		{
			"stateCd": "OK",
			"desc": "Le Flore County",
			"code": 4017
		},
		{
			"stateCd": "OK",
			"desc": "Lincoln County",
			"code": 4018
		},
		{
			"stateCd": "OK",
			"desc": "Logan County",
			"code": 4019
		},
		{
			"stateCd": "OK",
			"desc": "Love County",
			"code": 4020
		},
		{
			"stateCd": "OK",
			"desc": "Major County",
			"code": 4024
		},
		{
			"stateCd": "OK",
			"desc": "Marshall County",
			"code": 4025
		},
		{
			"stateCd": "OK",
			"desc": "Mayes County",
			"code": 4026
		},
		{
			"stateCd": "OK",
			"desc": "McClain County",
			"code": 4021
		},
		{
			"stateCd": "OK",
			"desc": "McCurtain County",
			"code": 4022
		},
		{
			"stateCd": "OK",
			"desc": "McIntosh County",
			"code": 4023
		},
		{
			"stateCd": "OK",
			"desc": "Murray County",
			"code": 4027
		},
		{
			"stateCd": "OK",
			"desc": "Muskogee County",
			"code": 4028
		},
		{
			"stateCd": "OK",
			"desc": "Noble County",
			"code": 4029
		},
		{
			"stateCd": "OK",
			"desc": "Nowata County",
			"code": 4030
		},
		{
			"stateCd": "OK",
			"desc": "Okfuskee County",
			"code": 4031
		},
		{
			"stateCd": "OK",
			"desc": "Oklahoma County",
			"code": 4032
		},
		{
			"stateCd": "OK",
			"desc": "Okmulgee County",
			"code": 4033
		},
		{
			"stateCd": "OK",
			"desc": "Osage County",
			"code": 4034
		},
		{
			"stateCd": "OK",
			"desc": "Ottawa County",
			"code": 4035
		},
		{
			"stateCd": "OK",
			"desc": "Pawnee County",
			"code": 4036
		},
		{
			"stateCd": "OK",
			"desc": "Payne County",
			"code": 4037
		},
		{
			"stateCd": "OK",
			"desc": "Pittsburg County",
			"code": 4038
		},
		{
			"stateCd": "OK",
			"desc": "Pontotoc County",
			"code": 4039
		},
		{
			"stateCd": "OK",
			"desc": "Pottawatomie County",
			"code": 4040
		},
		{
			"stateCd": "OK",
			"desc": "Pushmataha County",
			"code": 4041
		},
		{
			"stateCd": "OK",
			"desc": "Roger Mills County",
			"code": 4042
		},
		{
			"stateCd": "OK",
			"desc": "Rogers County",
			"code": 4043
		},
		{
			"stateCd": "OK",
			"desc": "Seminole County",
			"code": 4044
		},
		{
			"stateCd": "OK",
			"desc": "Sequoyah County",
			"code": 4045
		},
		{
			"stateCd": "OK",
			"desc": "Stephens County",
			"code": 4046
		},
		{
			"stateCd": "OK",
			"desc": "Texas County",
			"code": 4047
		},
		{
			"stateCd": "OK",
			"desc": "Tillman County",
			"code": 4048
		},
		{
			"stateCd": "OK",
			"desc": "Tulsa County",
			"code": 4049
		},
		{
			"stateCd": "OK",
			"desc": "Wagoner County",
			"code": 4050
		},
		{
			"stateCd": "OK",
			"desc": "Washington County",
			"code": 4051
		},
		{
			"stateCd": "OK",
			"desc": "Washita County",
			"code": 4052
		},
		{
			"stateCd": "OK",
			"desc": "Woods County",
			"code": 4053
		},
		{
			"stateCd": "OK",
			"desc": "Woodward County",
			"code": 4054
		},
		{
			"stateCd": "OR",
			"desc": "Baker County",
			"code": 4055
		},
		{
			"stateCd": "OR",
			"desc": "Benton County",
			"code": 4056
		},
		{
			"stateCd": "OR",
			"desc": "Clackamas County",
			"code": 4057
		},
		{
			"stateCd": "OR",
			"desc": "Clatsop County",
			"code": 4058
		},
		{
			"stateCd": "OR",
			"desc": "Columbia County",
			"code": 4059
		},
		{
			"stateCd": "OR",
			"desc": "Coos County",
			"code": 4060
		},
		{
			"stateCd": "OR",
			"desc": "Crook County",
			"code": 4061
		},
		{
			"stateCd": "OR",
			"desc": "Curry County",
			"code": 4062
		},
		{
			"stateCd": "OR",
			"desc": "Deschutes County",
			"code": 4063
		},
		{
			"stateCd": "OR",
			"desc": "Douglas County",
			"code": 4064
		},
		{
			"stateCd": "OR",
			"desc": "Gilliam County",
			"code": 4065
		},
		{
			"stateCd": "OR",
			"desc": "Grant County",
			"code": 4066
		},
		{
			"stateCd": "OR",
			"desc": "Harney County",
			"code": 4067
		},
		{
			"stateCd": "OR",
			"desc": "Hood River County",
			"code": 4068
		},
		{
			"stateCd": "OR",
			"desc": "Jackson County",
			"code": 4069
		},
		{
			"stateCd": "OR",
			"desc": "Jefferson County",
			"code": 4070
		},
		{
			"stateCd": "OR",
			"desc": "Josephine County",
			"code": 4071
		},
		{
			"stateCd": "OR",
			"desc": "Klamath County",
			"code": 4072
		},
		{
			"stateCd": "OR",
			"desc": "Lake County",
			"code": 4073
		},
		{
			"stateCd": "OR",
			"desc": "Lane County",
			"code": 4074
		},
		{
			"stateCd": "OR",
			"desc": "Lincoln County",
			"code": 4075
		},
		{
			"stateCd": "OR",
			"desc": "Linn County",
			"code": 4076
		},
		{
			"stateCd": "OR",
			"desc": "Malheur County",
			"code": 4077
		},
		{
			"stateCd": "OR",
			"desc": "Marion County",
			"code": 4078
		},
		{
			"stateCd": "OR",
			"desc": "Morrow County",
			"code": 4079
		},
		{
			"stateCd": "OR",
			"desc": "Multnomah County",
			"code": 4080
		},
		{
			"stateCd": "OR",
			"desc": "Polk County",
			"code": 4081
		},
		{
			"stateCd": "OR",
			"desc": "Sherman County",
			"code": 4082
		},
		{
			"stateCd": "OR",
			"desc": "Tillamook County",
			"code": 4083
		},
		{
			"stateCd": "OR",
			"desc": "Umatilla County",
			"code": 4084
		},
		{
			"stateCd": "OR",
			"desc": "Union County",
			"code": 4085
		},
		{
			"stateCd": "OR",
			"desc": "Wallowa County",
			"code": 4086
		},
		{
			"stateCd": "OR",
			"desc": "Wasco County",
			"code": 4087
		},
		{
			"stateCd": "OR",
			"desc": "Washington County",
			"code": 4088
		},
		{
			"stateCd": "OR",
			"desc": "Wheeler County",
			"code": 4089
		},
		{
			"stateCd": "OR",
			"desc": "Yamhill County",
			"code": 4090
		},
		{
			"stateCd": "PA",
			"desc": "Adams County",
			"code": 4091
		},
		{
			"stateCd": "PA",
			"desc": "Allegheny County",
			"code": 4092
		},
		{
			"stateCd": "PA",
			"desc": "Armstrong County",
			"code": 4093
		},
		{
			"stateCd": "PA",
			"desc": "Beaver County",
			"code": 4094
		},
		{
			"stateCd": "PA",
			"desc": "Bedford County",
			"code": 4095
		},
		{
			"stateCd": "PA",
			"desc": "Berks County",
			"code": 4096
		},
		{
			"stateCd": "PA",
			"desc": "Blair County",
			"code": 4097
		},
		{
			"stateCd": "PA",
			"desc": "Bradford County",
			"code": 4098
		},
		{
			"stateCd": "PA",
			"desc": "Bucks County",
			"code": 4099
		},
		{
			"stateCd": "PA",
			"desc": "Butler County",
			"code": 4100
		},
		{
			"stateCd": "PA",
			"desc": "Cambria County",
			"code": 4101
		},
		{
			"stateCd": "PA",
			"desc": "Cameron County",
			"code": 4102
		},
		{
			"stateCd": "PA",
			"desc": "Carbon County",
			"code": 4103
		},
		{
			"stateCd": "PA",
			"desc": "Centre County",
			"code": 4104
		},
		{
			"stateCd": "PA",
			"desc": "Chester County",
			"code": 4105
		},
		{
			"stateCd": "PA",
			"desc": "Clarion County",
			"code": 4106
		},
		{
			"stateCd": "PA",
			"desc": "Clearfield County",
			"code": 4107
		},
		{
			"stateCd": "PA",
			"desc": "Clinton County",
			"code": 4108
		},
		{
			"stateCd": "PA",
			"desc": "Columbia County",
			"code": 4109
		},
		{
			"stateCd": "PA",
			"desc": "Crawford County",
			"code": 4110
		},
		{
			"stateCd": "PA",
			"desc": "Cumberland County",
			"code": 4111
		},
		{
			"stateCd": "PA",
			"desc": "Dauphin County",
			"code": 4112
		},
		{
			"stateCd": "PA",
			"desc": "Delaware County",
			"code": 4113
		},
		{
			"stateCd": "PA",
			"desc": "Elk County",
			"code": 4114
		},
		{
			"stateCd": "PA",
			"desc": "Erie County",
			"code": 4115
		},
		{
			"stateCd": "PA",
			"desc": "Fayette County",
			"code": 4116
		},
		{
			"stateCd": "PA",
			"desc": "Forest County",
			"code": 4117
		},
		{
			"stateCd": "PA",
			"desc": "Franklin County",
			"code": 4118
		},
		{
			"stateCd": "PA",
			"desc": "Fulton County",
			"code": 4119
		},
		{
			"stateCd": "PA",
			"desc": "Greene County",
			"code": 4120
		},
		{
			"stateCd": "PA",
			"desc": "Huntingdon County",
			"code": 4121
		},
		{
			"stateCd": "PA",
			"desc": "Indiana County",
			"code": 4122
		},
		{
			"stateCd": "PA",
			"desc": "Jefferson County",
			"code": 4123
		},
		{
			"stateCd": "PA",
			"desc": "Juniata County",
			"code": 4124
		},
		{
			"stateCd": "PA",
			"desc": "Lackawanna County",
			"code": 4125
		},
		{
			"stateCd": "PA",
			"desc": "Lancaster County",
			"code": 4126
		},
		{
			"stateCd": "PA",
			"desc": "Lawrence County",
			"code": 4127
		},
		{
			"stateCd": "PA",
			"desc": "Lebanon County",
			"code": 4128
		},
		{
			"stateCd": "PA",
			"desc": "Lehigh County",
			"code": 4129
		},
		{
			"stateCd": "PA",
			"desc": "Luzerne County",
			"code": 4130
		},
		{
			"stateCd": "PA",
			"desc": "Lycoming County",
			"code": 4131
		},
		{
			"stateCd": "PA",
			"desc": "McKean County",
			"code": 4132
		},
		{
			"stateCd": "PA",
			"desc": "Mercer County",
			"code": 4133
		},
		{
			"stateCd": "PA",
			"desc": "Mifflin County",
			"code": 4134
		},
		{
			"stateCd": "PA",
			"desc": "Monroe County",
			"code": 4135
		},
		{
			"stateCd": "PA",
			"desc": "Montgomery County",
			"code": 4136
		},
		{
			"stateCd": "PA",
			"desc": "Montour County",
			"code": 4137
		},
		{
			"stateCd": "PA",
			"desc": "Northampton County",
			"code": 4138
		},
		{
			"stateCd": "PA",
			"desc": "Northumberland County",
			"code": 4139
		},
		{
			"stateCd": "PA",
			"desc": "Perry County",
			"code": 4140
		},
		{
			"stateCd": "PA",
			"desc": "Philadelphia County",
			"code": 4141
		},
		{
			"stateCd": "PA",
			"desc": "Pike County",
			"code": 4142
		},
		{
			"stateCd": "PA",
			"desc": "Potter County",
			"code": 4143
		},
		{
			"stateCd": "PA",
			"desc": "Schuylkill County",
			"code": 4144
		},
		{
			"stateCd": "PA",
			"desc": "Snyder County",
			"code": 4145
		},
		{
			"stateCd": "PA",
			"desc": "Somerset County",
			"code": 4146
		},
		{
			"stateCd": "PA",
			"desc": "Sullivan County",
			"code": 4147
		},
		{
			"stateCd": "PA",
			"desc": "Susquehanna County",
			"code": 4148
		},
		{
			"stateCd": "PA",
			"desc": "Tioga County",
			"code": 4149
		},
		{
			"stateCd": "PA",
			"desc": "Union County",
			"code": 4150
		},
		{
			"stateCd": "PA",
			"desc": "Venango County",
			"code": 4151
		},
		{
			"stateCd": "PA",
			"desc": "Warren County",
			"code": 4152
		},
		{
			"stateCd": "PA",
			"desc": "Washington County",
			"code": 4153
		},
		{
			"stateCd": "PA",
			"desc": "Wayne County",
			"code": 4154
		},
		{
			"stateCd": "PA",
			"desc": "Westmoreland County",
			"code": 4155
		},
		{
			"stateCd": "PA",
			"desc": "Wyoming County",
			"code": 4156
		},
		{
			"stateCd": "PA",
			"desc": "York County",
			"code": 4157
		},
		{
			"stateCd": "RI",
			"desc": "Bristol County",
			"code": 4158
		},
		{
			"stateCd": "RI",
			"desc": "Kent County",
			"code": 4159
		},
		{
			"stateCd": "RI",
			"desc": "Newport County",
			"code": 4160
		},
		{
			"stateCd": "RI",
			"desc": "Providence County",
			"code": 4161
		},
		{
			"stateCd": "RI",
			"desc": "Washington County",
			"code": 4162
		},
		{
			"stateCd": "SC",
			"desc": "Abbeville County",
			"code": 4163
		},
		{
			"stateCd": "SC",
			"desc": "Aiken County",
			"code": 4164
		},
		{
			"stateCd": "SC",
			"desc": "Allendale County",
			"code": 4165
		},
		{
			"stateCd": "SC",
			"desc": "Anderson County",
			"code": 4166
		},
		{
			"stateCd": "SC",
			"desc": "Bamberg County",
			"code": 4167
		},
		{
			"stateCd": "SC",
			"desc": "Barnwell County",
			"code": 4168
		},
		{
			"stateCd": "SC",
			"desc": "Beaufort County",
			"code": 4169
		},
		{
			"stateCd": "SC",
			"desc": "Berkeley County",
			"code": 4170
		},
		{
			"stateCd": "SC",
			"desc": "Calhoun County",
			"code": 4171
		},
		{
			"stateCd": "SC",
			"desc": "Charleston County",
			"code": 4172
		},
		{
			"stateCd": "SC",
			"desc": "Cherokee County",
			"code": 4173
		},
		{
			"stateCd": "SC",
			"desc": "Chester County",
			"code": 4174
		},
		{
			"stateCd": "SC",
			"desc": "Chesterfield County",
			"code": 4175
		},
		{
			"stateCd": "SC",
			"desc": "Clarendon County",
			"code": 4176
		},
		{
			"stateCd": "SC",
			"desc": "Colleton County",
			"code": 4177
		},
		{
			"stateCd": "SC",
			"desc": "Darlington County",
			"code": 4178
		},
		{
			"stateCd": "SC",
			"desc": "Dillon County",
			"code": 4179
		},
		{
			"stateCd": "SC",
			"desc": "Dorchester County",
			"code": 4180
		},
		{
			"stateCd": "SC",
			"desc": "Edgefield County",
			"code": 4181
		},
		{
			"stateCd": "SC",
			"desc": "Fairfield County",
			"code": 4182
		},
		{
			"stateCd": "SC",
			"desc": "Florence County",
			"code": 4183
		},
		{
			"stateCd": "SC",
			"desc": "Georgetown County",
			"code": 4184
		},
		{
			"stateCd": "SC",
			"desc": "Greenville County",
			"code": 4185
		},
		{
			"stateCd": "SC",
			"desc": "Greenwood County",
			"code": 4186
		},
		{
			"stateCd": "SC",
			"desc": "Hampton County",
			"code": 4187
		},
		{
			"stateCd": "SC",
			"desc": "Horry County",
			"code": 4188
		},
		{
			"stateCd": "SC",
			"desc": "Jasper County",
			"code": 4189
		},
		{
			"stateCd": "SC",
			"desc": "Kershaw County",
			"code": 4190
		},
		{
			"stateCd": "SC",
			"desc": "Lancaster County",
			"code": 4191
		},
		{
			"stateCd": "SC",
			"desc": "Laurens County",
			"code": 4192
		},
		{
			"stateCd": "SC",
			"desc": "Lee County",
			"code": 4193
		},
		{
			"stateCd": "SC",
			"desc": "Lexington County",
			"code": 4194
		},
		{
			"stateCd": "SC",
			"desc": "Marion County",
			"code": 4196
		},
		{
			"stateCd": "SC",
			"desc": "Marlboro County",
			"code": 4197
		},
		{
			"stateCd": "SC",
			"desc": "McCormick County",
			"code": 4195
		},
		{
			"stateCd": "SC",
			"desc": "Newberry County",
			"code": 4198
		},
		{
			"stateCd": "SC",
			"desc": "Oconee County",
			"code": 4199
		},
		{
			"stateCd": "SC",
			"desc": "Orangeburg County",
			"code": 4200
		},
		{
			"stateCd": "SC",
			"desc": "Pickens County",
			"code": 4201
		},
		{
			"stateCd": "SC",
			"desc": "Richland County",
			"code": 4202
		},
		{
			"stateCd": "SC",
			"desc": "Saluda County",
			"code": 4203
		},
		{
			"stateCd": "SC",
			"desc": "Spartanburg County",
			"code": 4204
		},
		{
			"stateCd": "SC",
			"desc": "Sumter County",
			"code": 4205
		},
		{
			"stateCd": "SC",
			"desc": "Union County",
			"code": 4206
		},
		{
			"stateCd": "SC",
			"desc": "Williamsburg County",
			"code": 4207
		},
		{
			"stateCd": "SC",
			"desc": "York County",
			"code": 4208
		},
		{
			"stateCd": "SD",
			"desc": "Aurora County",
			"code": 4209
		},
		{
			"stateCd": "SD",
			"desc": "Beadle County",
			"code": 4210
		},
		{
			"stateCd": "SD",
			"desc": "Bennett County",
			"code": 4211
		},
		{
			"stateCd": "SD",
			"desc": "Bon Homme County",
			"code": 4212
		},
		{
			"stateCd": "SD",
			"desc": "Brookings County",
			"code": 4213
		},
		{
			"stateCd": "SD",
			"desc": "Brown County",
			"code": 4214
		},
		{
			"stateCd": "SD",
			"desc": "Brule County",
			"code": 4215
		},
		{
			"stateCd": "SD",
			"desc": "Buffalo County",
			"code": 4216
		},
		{
			"stateCd": "SD",
			"desc": "Butte County",
			"code": 4217
		},
		{
			"stateCd": "SD",
			"desc": "Campbell County",
			"code": 4218
		},
		{
			"stateCd": "SD",
			"desc": "Charles Mix County",
			"code": 4219
		},
		{
			"stateCd": "SD",
			"desc": "Clark County",
			"code": 4220
		},
		{
			"stateCd": "SD",
			"desc": "Clay County",
			"code": 4221
		},
		{
			"stateCd": "SD",
			"desc": "Codington County",
			"code": 4222
		},
		{
			"stateCd": "SD",
			"desc": "Corson County",
			"code": 4223
		},
		{
			"stateCd": "SD",
			"desc": "Custer County",
			"code": 4224
		},
		{
			"stateCd": "SD",
			"desc": "Davison County",
			"code": 4225
		},
		{
			"stateCd": "SD",
			"desc": "Day County",
			"code": 4226
		},
		{
			"stateCd": "SD",
			"desc": "Deuel County",
			"code": 4227
		},
		{
			"stateCd": "SD",
			"desc": "Dewey County",
			"code": 4228
		},
		{
			"stateCd": "SD",
			"desc": "Douglas County",
			"code": 4229
		},
		{
			"stateCd": "SD",
			"desc": "Edmunds County",
			"code": 4230
		},
		{
			"stateCd": "SD",
			"desc": "Fall River County",
			"code": 4231
		},
		{
			"stateCd": "SD",
			"desc": "Faulk County",
			"code": 4232
		},
		{
			"stateCd": "SD",
			"desc": "Grant County",
			"code": 4233
		},
		{
			"stateCd": "SD",
			"desc": "Gregory County",
			"code": 4234
		},
		{
			"stateCd": "SD",
			"desc": "Haakon County",
			"code": 4235
		},
		{
			"stateCd": "SD",
			"desc": "Hamlin County",
			"code": 4236
		},
		{
			"stateCd": "SD",
			"desc": "Hand County",
			"code": 4237
		},
		{
			"stateCd": "SD",
			"desc": "Hanson County",
			"code": 4238
		},
		{
			"stateCd": "SD",
			"desc": "Harding County",
			"code": 4239
		},
		{
			"stateCd": "SD",
			"desc": "Hughes County",
			"code": 4240
		},
		{
			"stateCd": "SD",
			"desc": "Hutchinson County",
			"code": 4241
		},
		{
			"stateCd": "SD",
			"desc": "Hyde County",
			"code": 4242
		},
		{
			"stateCd": "SD",
			"desc": "Jackson County",
			"code": 4243
		},
		{
			"stateCd": "SD",
			"desc": "Jerauld County",
			"code": 4244
		},
		{
			"stateCd": "SD",
			"desc": "Jones County",
			"code": 4245
		},
		{
			"stateCd": "SD",
			"desc": "Kingsbury County",
			"code": 4246
		},
		{
			"stateCd": "SD",
			"desc": "Lake County",
			"code": 4247
		},
		{
			"stateCd": "SD",
			"desc": "Lawrence County",
			"code": 4248
		},
		{
			"stateCd": "SD",
			"desc": "Lincoln County",
			"code": 4249
		},
		{
			"stateCd": "SD",
			"desc": "Lyman County",
			"code": 4250
		},
		{
			"stateCd": "SD",
			"desc": "Marshall County",
			"code": 4253
		},
		{
			"stateCd": "SD",
			"desc": "McCook County",
			"code": 4251
		},
		{
			"stateCd": "SD",
			"desc": "McPherson County",
			"code": 4252
		},
		{
			"stateCd": "SD",
			"desc": "Meade County",
			"code": 4254
		},
		{
			"stateCd": "SD",
			"desc": "Mellette County",
			"code": 4255
		},
		{
			"stateCd": "SD",
			"desc": "Miner County",
			"code": 4256
		},
		{
			"stateCd": "SD",
			"desc": "Minnehaha County",
			"code": 4257
		},
		{
			"stateCd": "SD",
			"desc": "Moody County",
			"code": 4258
		},
		{
			"stateCd": "SD",
			"desc": "Pennington County",
			"code": 4259
		},
		{
			"stateCd": "SD",
			"desc": "Perkins County",
			"code": 4260
		},
		{
			"stateCd": "SD",
			"desc": "Potter County",
			"code": 4261
		},
		{
			"stateCd": "SD",
			"desc": "Roberts County",
			"code": 4262
		},
		{
			"stateCd": "SD",
			"desc": "Sanborn County",
			"code": 4263
		},
		{
			"stateCd": "SD",
			"desc": "Shannon County",
			"code": 4264
		},
		{
			"stateCd": "SD",
			"desc": "Spink County",
			"code": 4265
		},
		{
			"stateCd": "SD",
			"desc": "Stanley County",
			"code": 4266
		},
		{
			"stateCd": "SD",
			"desc": "Sully County",
			"code": 4267
		},
		{
			"stateCd": "SD",
			"desc": "Todd County",
			"code": 4268
		},
		{
			"stateCd": "SD",
			"desc": "Tripp County",
			"code": 4269
		},
		{
			"stateCd": "SD",
			"desc": "Turner County",
			"code": 4270
		},
		{
			"stateCd": "SD",
			"desc": "Union County",
			"code": 4271
		},
		{
			"stateCd": "SD",
			"desc": "Walworth County",
			"code": 4272
		},
		{
			"stateCd": "SD",
			"desc": "Yankton County",
			"code": 4273
		},
		{
			"stateCd": "SD",
			"desc": "Ziebach County",
			"code": 4274
		},
		{
			"stateCd": "TN",
			"desc": "Anderson County",
			"code": 4275
		},
		{
			"stateCd": "TN",
			"desc": "Bedford County",
			"code": 4276
		},
		{
			"stateCd": "TN",
			"desc": "Benton County",
			"code": 4277
		},
		{
			"stateCd": "TN",
			"desc": "Bledsoe County",
			"code": 4278
		},
		{
			"stateCd": "TN",
			"desc": "Blount County",
			"code": 4279
		},
		{
			"stateCd": "TN",
			"desc": "Bradley County",
			"code": 4280
		},
		{
			"stateCd": "TN",
			"desc": "Campbell County",
			"code": 4281
		},
		{
			"stateCd": "TN",
			"desc": "Cannon County",
			"code": 4282
		},
		{
			"stateCd": "TN",
			"desc": "Carroll County",
			"code": 4283
		},
		{
			"stateCd": "TN",
			"desc": "Carter County",
			"code": 4284
		},
		{
			"stateCd": "TN",
			"desc": "Cheatham County",
			"code": 4285
		},
		{
			"stateCd": "TN",
			"desc": "Chester County",
			"code": 4286
		},
		{
			"stateCd": "TN",
			"desc": "Claiborne County",
			"code": 4287
		},
		{
			"stateCd": "TN",
			"desc": "Clay County",
			"code": 4288
		},
		{
			"stateCd": "TN",
			"desc": "Cocke County",
			"code": 4289
		},
		{
			"stateCd": "TN",
			"desc": "Coffee County",
			"code": 4290
		},
		{
			"stateCd": "TN",
			"desc": "Crockett County",
			"code": 4291
		},
		{
			"stateCd": "TN",
			"desc": "Cumberland County",
			"code": 4292
		},
		{
			"stateCd": "TN",
			"desc": "Davidson County",
			"code": 4293
		},
		{
			"stateCd": "TN",
			"desc": "Decatur County",
			"code": 4294
		},
		{
			"stateCd": "TN",
			"desc": "DeKalb County",
			"code": 4295
		},
		{
			"stateCd": "TN",
			"desc": "Dickson County",
			"code": 4296
		},
		{
			"stateCd": "TN",
			"desc": "Dyer County",
			"code": 4297
		},
		{
			"stateCd": "TN",
			"desc": "Fayette County",
			"code": 4298
		},
		{
			"stateCd": "TN",
			"desc": "Fentress County",
			"code": 4299
		},
		{
			"stateCd": "TN",
			"desc": "Franklin County",
			"code": 4300
		},
		{
			"stateCd": "TN",
			"desc": "Gibson County",
			"code": 4301
		},
		{
			"stateCd": "TN",
			"desc": "Giles County",
			"code": 4302
		},
		{
			"stateCd": "TN",
			"desc": "Grainger County",
			"code": 4303
		},
		{
			"stateCd": "TN",
			"desc": "Greene County",
			"code": 4304
		},
		{
			"stateCd": "TN",
			"desc": "Grundy County",
			"code": 4305
		},
		{
			"stateCd": "TN",
			"desc": "Hamblen County",
			"code": 4306
		},
		{
			"stateCd": "TN",
			"desc": "Hamilton County",
			"code": 4307
		},
		{
			"stateCd": "TN",
			"desc": "Hancock County",
			"code": 4308
		},
		{
			"stateCd": "TN",
			"desc": "Hardeman County",
			"code": 4309
		},
		{
			"stateCd": "TN",
			"desc": "Hardin County",
			"code": 4310
		},
		{
			"stateCd": "TN",
			"desc": "Hawkins County",
			"code": 4311
		},
		{
			"stateCd": "TN",
			"desc": "Haywood County",
			"code": 4312
		},
		{
			"stateCd": "TN",
			"desc": "Henderson County",
			"code": 4313
		},
		{
			"stateCd": "TN",
			"desc": "Henry County",
			"code": 4314
		},
		{
			"stateCd": "TN",
			"desc": "Hickman County",
			"code": 4315
		},
		{
			"stateCd": "TN",
			"desc": "Houston County",
			"code": 4316
		},
		{
			"stateCd": "TN",
			"desc": "Humphreys County",
			"code": 4317
		},
		{
			"stateCd": "TN",
			"desc": "Jackson County",
			"code": 4318
		},
		{
			"stateCd": "TN",
			"desc": "Jefferson County",
			"code": 4319
		},
		{
			"stateCd": "TN",
			"desc": "Johnson County",
			"code": 4320
		},
		{
			"stateCd": "TN",
			"desc": "Knox County",
			"code": 4321
		},
		{
			"stateCd": "TN",
			"desc": "Lake County",
			"code": 4322
		},
		{
			"stateCd": "TN",
			"desc": "Lauderdale County",
			"code": 4323
		},
		{
			"stateCd": "TN",
			"desc": "Lawrence County",
			"code": 4324
		},
		{
			"stateCd": "TN",
			"desc": "Lewis County",
			"code": 4325
		},
		{
			"stateCd": "TN",
			"desc": "Lincoln County",
			"code": 4326
		},
		{
			"stateCd": "TN",
			"desc": "Loudon County",
			"code": 4327
		},
		{
			"stateCd": "TN",
			"desc": "Macon County",
			"code": 4330
		},
		{
			"stateCd": "TN",
			"desc": "Madison County",
			"code": 4331
		},
		{
			"stateCd": "TN",
			"desc": "Marion County",
			"code": 4332
		},
		{
			"stateCd": "TN",
			"desc": "Marshall County",
			"code": 4333
		},
		{
			"stateCd": "TN",
			"desc": "Maury County",
			"code": 4334
		},
		{
			"stateCd": "TN",
			"desc": "McMinn County",
			"code": 4328
		},
		{
			"stateCd": "TN",
			"desc": "McNairy County",
			"code": 4329
		},
		{
			"stateCd": "TN",
			"desc": "Meigs County",
			"code": 4335
		},
		{
			"stateCd": "TN",
			"desc": "Monroe County",
			"code": 4336
		},
		{
			"stateCd": "TN",
			"desc": "Montgomery County",
			"code": 4337
		},
		{
			"stateCd": "TN",
			"desc": "Moore County",
			"code": 4338
		},
		{
			"stateCd": "TN",
			"desc": "Morgan County",
			"code": 4339
		},
		{
			"stateCd": "TN",
			"desc": "Obion County",
			"code": 4340
		},
		{
			"stateCd": "TN",
			"desc": "Overton County",
			"code": 4341
		},
		{
			"stateCd": "TN",
			"desc": "Perry County",
			"code": 4342
		},
		{
			"stateCd": "TN",
			"desc": "Pickett County",
			"code": 4343
		},
		{
			"stateCd": "TN",
			"desc": "Polk County",
			"code": 4344
		},
		{
			"stateCd": "TN",
			"desc": "Putnam County",
			"code": 4345
		},
		{
			"stateCd": "TN",
			"desc": "Rhea County",
			"code": 4346
		},
		{
			"stateCd": "TN",
			"desc": "Roane County",
			"code": 4347
		},
		{
			"stateCd": "TN",
			"desc": "Robertson County",
			"code": 4348
		},
		{
			"stateCd": "TN",
			"desc": "Rutherford County",
			"code": 4349
		},
		{
			"stateCd": "TN",
			"desc": "Scott County",
			"code": 4350
		},
		{
			"stateCd": "TN",
			"desc": "Sequatchie County",
			"code": 4351
		},
		{
			"stateCd": "TN",
			"desc": "Sevier County",
			"code": 4352
		},
		{
			"stateCd": "TN",
			"desc": "Shelby County",
			"code": 4353
		},
		{
			"stateCd": "TN",
			"desc": "Smith County",
			"code": 4354
		},
		{
			"stateCd": "TN",
			"desc": "Stewart County",
			"code": 4355
		},
		{
			"stateCd": "TN",
			"desc": "Sullivan County",
			"code": 4356
		},
		{
			"stateCd": "TN",
			"desc": "Sumner County",
			"code": 4357
		},
		{
			"stateCd": "TN",
			"desc": "Tipton County",
			"code": 4358
		},
		{
			"stateCd": "TN",
			"desc": "Trousdale County",
			"code": 4359
		},
		{
			"stateCd": "TN",
			"desc": "Unicoi County",
			"code": 4360
		},
		{
			"stateCd": "TN",
			"desc": "Union County",
			"code": 4361
		},
		{
			"stateCd": "TN",
			"desc": "Van Buren County",
			"code": 4362
		},
		{
			"stateCd": "TN",
			"desc": "Warren County",
			"code": 4363
		},
		{
			"stateCd": "TN",
			"desc": "Washington County",
			"code": 4364
		},
		{
			"stateCd": "TN",
			"desc": "Wayne County",
			"code": 4365
		},
		{
			"stateCd": "TN",
			"desc": "Weakley County",
			"code": 4366
		},
		{
			"stateCd": "TN",
			"desc": "White County",
			"code": 4367
		},
		{
			"stateCd": "TN",
			"desc": "Williamson County",
			"code": 4368
		},
		{
			"stateCd": "TN",
			"desc": "Wilson County",
			"code": 4369
		},
		{
			"stateCd": "TX",
			"desc": "Anderson County",
			"code": 4370
		},
		{
			"stateCd": "TX",
			"desc": "Andrews County",
			"code": 4371
		},
		{
			"stateCd": "TX",
			"desc": "Angelina County",
			"code": 4372
		},
		{
			"stateCd": "TX",
			"desc": "Aransas County",
			"code": 4373
		},
		{
			"stateCd": "TX",
			"desc": "Archer County",
			"code": 4374
		},
		{
			"stateCd": "TX",
			"desc": "Armstrong County",
			"code": 4375
		},
		{
			"stateCd": "TX",
			"desc": "Atascosa County",
			"code": 4376
		},
		{
			"stateCd": "TX",
			"desc": "Austin County",
			"code": 4377
		},
		{
			"stateCd": "TX",
			"desc": "Bailey County",
			"code": 4378
		},
		{
			"stateCd": "TX",
			"desc": "Bandera County",
			"code": 4379
		},
		{
			"stateCd": "TX",
			"desc": "Bastrop County",
			"code": 4380
		},
		{
			"stateCd": "TX",
			"desc": "Baylor County",
			"code": 4381
		},
		{
			"stateCd": "TX",
			"desc": "Bee County",
			"code": 4382
		},
		{
			"stateCd": "TX",
			"desc": "Bell County",
			"code": 4383
		},
		{
			"stateCd": "TX",
			"desc": "Bexar County",
			"code": 4384
		},
		{
			"stateCd": "TX",
			"desc": "Blanco County",
			"code": 4385
		},
		{
			"stateCd": "TX",
			"desc": "Borden County",
			"code": 4386
		},
		{
			"stateCd": "TX",
			"desc": "Bosque County",
			"code": 4387
		},
		{
			"stateCd": "TX",
			"desc": "Bowie County",
			"code": 4388
		},
		{
			"stateCd": "TX",
			"desc": "Brazoria County",
			"code": 4389
		},
		{
			"stateCd": "TX",
			"desc": "Brazos County",
			"code": 4390
		},
		{
			"stateCd": "TX",
			"desc": "Brewster County",
			"code": 4391
		},
		{
			"stateCd": "TX",
			"desc": "Briscoe County",
			"code": 4392
		},
		{
			"stateCd": "TX",
			"desc": "Brooks County",
			"code": 4393
		},
		{
			"stateCd": "TX",
			"desc": "Brown County",
			"code": 4394
		},
		{
			"stateCd": "TX",
			"desc": "Burleson County",
			"code": 4395
		},
		{
			"stateCd": "TX",
			"desc": "Burnet County",
			"code": 4396
		},
		{
			"stateCd": "TX",
			"desc": "Caldwell County",
			"code": 4397
		},
		{
			"stateCd": "TX",
			"desc": "Calhoun County",
			"code": 4398
		},
		{
			"stateCd": "TX",
			"desc": "Callahan County",
			"code": 4399
		},
		{
			"stateCd": "TX",
			"desc": "Cameron County",
			"code": 4400
		},
		{
			"stateCd": "TX",
			"desc": "Camp County",
			"code": 4401
		},
		{
			"stateCd": "TX",
			"desc": "Carson County",
			"code": 4402
		},
		{
			"stateCd": "TX",
			"desc": "Cass County",
			"code": 4403
		},
		{
			"stateCd": "TX",
			"desc": "Castro County",
			"code": 4404
		},
		{
			"stateCd": "TX",
			"desc": "Chambers County",
			"code": 4405
		},
		{
			"stateCd": "TX",
			"desc": "Cherokee County",
			"code": 4406
		},
		{
			"stateCd": "TX",
			"desc": "Childress County",
			"code": 4407
		},
		{
			"stateCd": "TX",
			"desc": "Clay County",
			"code": 4408
		},
		{
			"stateCd": "TX",
			"desc": "Cochran County",
			"code": 4409
		},
		{
			"stateCd": "TX",
			"desc": "Coke County",
			"code": 4410
		},
		{
			"stateCd": "TX",
			"desc": "Coleman County",
			"code": 4411
		},
		{
			"stateCd": "TX",
			"desc": "Collin County",
			"code": 4412
		},
		{
			"stateCd": "TX",
			"desc": "Collingsworth County",
			"code": 4413
		},
		{
			"stateCd": "TX",
			"desc": "Colorado County",
			"code": 4414
		},
		{
			"stateCd": "TX",
			"desc": "Comal County",
			"code": 4415
		},
		{
			"stateCd": "TX",
			"desc": "Comanche County",
			"code": 4416
		},
		{
			"stateCd": "TX",
			"desc": "Concho County",
			"code": 4417
		},
		{
			"stateCd": "TX",
			"desc": "Cooke County",
			"code": 4418
		},
		{
			"stateCd": "TX",
			"desc": "Coryell County",
			"code": 4419
		},
		{
			"stateCd": "TX",
			"desc": "Cottle County",
			"code": 4420
		},
		{
			"stateCd": "TX",
			"desc": "Crane County",
			"code": 4421
		},
		{
			"stateCd": "TX",
			"desc": "Crockett County",
			"code": 4422
		},
		{
			"stateCd": "TX",
			"desc": "Crosby County",
			"code": 4423
		},
		{
			"stateCd": "TX",
			"desc": "Culberson County",
			"code": 4424
		},
		{
			"stateCd": "TX",
			"desc": "Dallam County",
			"code": 4425
		},
		{
			"stateCd": "TX",
			"desc": "Dallas County",
			"code": 4426
		},
		{
			"stateCd": "TX",
			"desc": "Dawson County",
			"code": 4427
		},
		{
			"stateCd": "TX",
			"desc": "Deaf Smith County",
			"code": 4428
		},
		{
			"stateCd": "TX",
			"desc": "Delta County",
			"code": 4429
		},
		{
			"stateCd": "TX",
			"desc": "Denton County",
			"code": 4430
		},
		{
			"stateCd": "TX",
			"desc": "DeWitt County",
			"code": 4431
		},
		{
			"stateCd": "TX",
			"desc": "Dickens County",
			"code": 4432
		},
		{
			"stateCd": "TX",
			"desc": "Dimmit County",
			"code": 4433
		},
		{
			"stateCd": "TX",
			"desc": "Donley County",
			"code": 4434
		},
		{
			"stateCd": "TX",
			"desc": "Duval County",
			"code": 4435
		},
		{
			"stateCd": "TX",
			"desc": "Eastland County",
			"code": 4436
		},
		{
			"stateCd": "TX",
			"desc": "Ector County",
			"code": 4437
		},
		{
			"stateCd": "TX",
			"desc": "Edwards County",
			"code": 4438
		},
		{
			"stateCd": "TX",
			"desc": "El Paso County",
			"code": 4440
		},
		{
			"stateCd": "TX",
			"desc": "Ellis County",
			"code": 4439
		},
		{
			"stateCd": "TX",
			"desc": "Erath County",
			"code": 4441
		},
		{
			"stateCd": "TX",
			"desc": "Falls County",
			"code": 4442
		},
		{
			"stateCd": "TX",
			"desc": "Fannin County",
			"code": 4443
		},
		{
			"stateCd": "TX",
			"desc": "Fayette County",
			"code": 4444
		},
		{
			"stateCd": "TX",
			"desc": "Fisher County",
			"code": 4445
		},
		{
			"stateCd": "TX",
			"desc": "Floyd County",
			"code": 4446
		},
		{
			"stateCd": "TX",
			"desc": "Foard County",
			"code": 4447
		},
		{
			"stateCd": "TX",
			"desc": "Fort Bend County",
			"code": 4448
		},
		{
			"stateCd": "TX",
			"desc": "Franklin County",
			"code": 4449
		},
		{
			"stateCd": "TX",
			"desc": "Freestone County",
			"code": 4450
		},
		{
			"stateCd": "TX",
			"desc": "Frio County",
			"code": 4451
		},
		{
			"stateCd": "TX",
			"desc": "Gaines County",
			"code": 4452
		},
		{
			"stateCd": "TX",
			"desc": "Galveston County",
			"code": 4453
		},
		{
			"stateCd": "TX",
			"desc": "Garza County",
			"code": 4454
		},
		{
			"stateCd": "TX",
			"desc": "Gillespie County",
			"code": 4455
		},
		{
			"stateCd": "TX",
			"desc": "Glasscock County",
			"code": 4456
		},
		{
			"stateCd": "TX",
			"desc": "Goliad County",
			"code": 4457
		},
		{
			"stateCd": "TX",
			"desc": "Gonzales County",
			"code": 4458
		},
		{
			"stateCd": "TX",
			"desc": "Gray County",
			"code": 4459
		},
		{
			"stateCd": "TX",
			"desc": "Grayson County",
			"code": 4460
		},
		{
			"stateCd": "TX",
			"desc": "Gregg County",
			"code": 4461
		},
		{
			"stateCd": "TX",
			"desc": "Grimes County",
			"code": 4462
		},
		{
			"stateCd": "TX",
			"desc": "Guadalupe County",
			"code": 4463
		},
		{
			"stateCd": "TX",
			"desc": "Hale County",
			"code": 4464
		},
		{
			"stateCd": "TX",
			"desc": "Hall County",
			"code": 4465
		},
		{
			"stateCd": "TX",
			"desc": "Hamilton County",
			"code": 4466
		},
		{
			"stateCd": "TX",
			"desc": "Hansford County",
			"code": 4467
		},
		{
			"stateCd": "TX",
			"desc": "Hardeman County",
			"code": 4468
		},
		{
			"stateCd": "TX",
			"desc": "Hardin County",
			"code": 4469
		},
		{
			"stateCd": "TX",
			"desc": "Harris County",
			"code": 4470
		},
		{
			"stateCd": "TX",
			"desc": "Harrison County",
			"code": 4471
		},
		{
			"stateCd": "TX",
			"desc": "Hartley County",
			"code": 4472
		},
		{
			"stateCd": "TX",
			"desc": "Haskell County",
			"code": 4473
		},
		{
			"stateCd": "TX",
			"desc": "Hays County",
			"code": 4474
		},
		{
			"stateCd": "TX",
			"desc": "Hemphill County",
			"code": 4475
		},
		{
			"stateCd": "TX",
			"desc": "Henderson County",
			"code": 4476
		},
		{
			"stateCd": "TX",
			"desc": "Hidalgo County",
			"code": 4477
		},
		{
			"stateCd": "TX",
			"desc": "Hill County",
			"code": 4991
		},
		{
			"stateCd": "TX",
			"desc": "Hockley County",
			"code": 4478
		},
		{
			"stateCd": "TX",
			"desc": "Hood County",
			"code": 4479
		},
		{
			"stateCd": "TX",
			"desc": "Hopkins County",
			"code": 4480
		},
		{
			"stateCd": "TX",
			"desc": "Houston County",
			"code": 4481
		},
		{
			"stateCd": "TX",
			"desc": "Howard County",
			"code": 4482
		},
		{
			"stateCd": "TX",
			"desc": "Hudspeth County",
			"code": 4483
		},
		{
			"stateCd": "TX",
			"desc": "Hunt County",
			"code": 4484
		},
		{
			"stateCd": "TX",
			"desc": "Hutchinson County",
			"code": 4485
		},
		{
			"stateCd": "TX",
			"desc": "Irion County",
			"code": 4486
		},
		{
			"stateCd": "TX",
			"desc": "Jack County",
			"code": 4487
		},
		{
			"stateCd": "TX",
			"desc": "Jackson County",
			"code": 4488
		},
		{
			"stateCd": "TX",
			"desc": "Jasper County",
			"code": 4489
		},
		{
			"stateCd": "TX",
			"desc": "Jeff Davis County",
			"code": 4490
		},
		{
			"stateCd": "TX",
			"desc": "Jefferson County",
			"code": 4491
		},
		{
			"stateCd": "TX",
			"desc": "Jim Hogg County",
			"code": 4492
		},
		{
			"stateCd": "TX",
			"desc": "Jim Wells County",
			"code": 4493
		},
		{
			"stateCd": "TX",
			"desc": "Johnson County",
			"code": 4494
		},
		{
			"stateCd": "TX",
			"desc": "Jones County",
			"code": 4495
		},
		{
			"stateCd": "TX",
			"desc": "Karnes County",
			"code": 4496
		},
		{
			"stateCd": "TX",
			"desc": "Kaufman County",
			"code": 4497
		},
		{
			"stateCd": "TX",
			"desc": "Kendall County",
			"code": 4498
		},
		{
			"stateCd": "TX",
			"desc": "Kenedy County",
			"code": 4499
		},
		{
			"stateCd": "TX",
			"desc": "Kent County",
			"code": 4500
		},
		{
			"stateCd": "TX",
			"desc": "Kerr County",
			"code": 4501
		},
		{
			"stateCd": "TX",
			"desc": "Kimble County",
			"code": 4502
		},
		{
			"stateCd": "TX",
			"desc": "King County",
			"code": 4503
		},
		{
			"stateCd": "TX",
			"desc": "Kinney County",
			"code": 4504
		},
		{
			"stateCd": "TX",
			"desc": "Kleberg County",
			"code": 4505
		},
		{
			"stateCd": "TX",
			"desc": "Knox County",
			"code": 4506
		},
		{
			"stateCd": "TX",
			"desc": "La Salle County",
			"code": 4510
		},
		{
			"stateCd": "TX",
			"desc": "Lamar County",
			"code": 4507
		},
		{
			"stateCd": "TX",
			"desc": "Lamb County",
			"code": 4508
		},
		{
			"stateCd": "TX",
			"desc": "Lampasas County",
			"code": 4509
		},
		{
			"stateCd": "TX",
			"desc": "Lavaca County",
			"code": 4511
		},
		{
			"stateCd": "TX",
			"desc": "Lee County",
			"code": 4512
		},
		{
			"stateCd": "TX",
			"desc": "Leon County",
			"code": 4513
		},
		{
			"stateCd": "TX",
			"desc": "Liberty County",
			"code": 4514
		},
		{
			"stateCd": "TX",
			"desc": "Limestone County",
			"code": 4515
		},
		{
			"stateCd": "TX",
			"desc": "Lipscomb County",
			"code": 4516
		},
		{
			"stateCd": "TX",
			"desc": "Live Oak County",
			"code": 4517
		},
		{
			"stateCd": "TX",
			"desc": "Llano County",
			"code": 4518
		},
		{
			"stateCd": "TX",
			"desc": "Loving County",
			"code": 4519
		},
		{
			"stateCd": "TX",
			"desc": "Lubbock County",
			"code": 4520
		},
		{
			"stateCd": "TX",
			"desc": "Lynn County",
			"code": 4521
		},
		{
			"stateCd": "TX",
			"desc": "Madison County",
			"code": 4525
		},
		{
			"stateCd": "TX",
			"desc": "Marion County",
			"code": 4526
		},
		{
			"stateCd": "TX",
			"desc": "Martin County",
			"code": 4527
		},
		{
			"stateCd": "TX",
			"desc": "Mason County",
			"code": 4528
		},
		{
			"stateCd": "TX",
			"desc": "Matagorda County",
			"code": 4529
		},
		{
			"stateCd": "TX",
			"desc": "Maverick County",
			"code": 4530
		},
		{
			"stateCd": "TX",
			"desc": "McCulloch County",
			"code": 4522
		},
		{
			"stateCd": "TX",
			"desc": "McLennan County",
			"code": 4523
		},
		{
			"stateCd": "TX",
			"desc": "McMullen County",
			"code": 4524
		},
		{
			"stateCd": "TX",
			"desc": "Medina County",
			"code": 4531
		},
		{
			"stateCd": "TX",
			"desc": "Menard County",
			"code": 4532
		},
		{
			"stateCd": "TX",
			"desc": "Midland County",
			"code": 4533
		},
		{
			"stateCd": "TX",
			"desc": "Milam County",
			"code": 4534
		},
		{
			"stateCd": "TX",
			"desc": "Mills County",
			"code": 4535
		},
		{
			"stateCd": "TX",
			"desc": "Mitchell County",
			"code": 4536
		},
		{
			"stateCd": "TX",
			"desc": "Montague County",
			"code": 4537
		},
		{
			"stateCd": "TX",
			"desc": "Montgomery County",
			"code": 4538
		},
		{
			"stateCd": "TX",
			"desc": "Moore County",
			"code": 4539
		},
		{
			"stateCd": "TX",
			"desc": "Morris County",
			"code": 4540
		},
		{
			"stateCd": "TX",
			"desc": "Motley County",
			"code": 4541
		},
		{
			"stateCd": "TX",
			"desc": "Nacogdoches County",
			"code": 4542
		},
		{
			"stateCd": "TX",
			"desc": "Navarro County",
			"code": 4543
		},
		{
			"stateCd": "TX",
			"desc": "Newton County",
			"code": 4544
		},
		{
			"stateCd": "TX",
			"desc": "Nolan County",
			"code": 4545
		},
		{
			"stateCd": "TX",
			"desc": "Nueces County",
			"code": 4546
		},
		{
			"stateCd": "TX",
			"desc": "Ochiltree County",
			"code": 4547
		},
		{
			"stateCd": "TX",
			"desc": "Oldham County",
			"code": 4548
		},
		{
			"stateCd": "TX",
			"desc": "Orange County",
			"code": 4549
		},
		{
			"stateCd": "TX",
			"desc": "Palo Pinto County",
			"code": 4550
		},
		{
			"stateCd": "TX",
			"desc": "Panola County",
			"code": 4551
		},
		{
			"stateCd": "TX",
			"desc": "Parker County",
			"code": 4552
		},
		{
			"stateCd": "TX",
			"desc": "Parmer County",
			"code": 4553
		},
		{
			"stateCd": "TX",
			"desc": "Pecos County",
			"code": 4554
		},
		{
			"stateCd": "TX",
			"desc": "Polk County",
			"code": 4555
		},
		{
			"stateCd": "TX",
			"desc": "Potter County",
			"code": 4556
		},
		{
			"stateCd": "TX",
			"desc": "Presidio County",
			"code": 4557
		},
		{
			"stateCd": "TX",
			"desc": "Rains County",
			"code": 4558
		},
		{
			"stateCd": "TX",
			"desc": "Randall County",
			"code": 4559
		},
		{
			"stateCd": "TX",
			"desc": "Reagan County",
			"code": 4560
		},
		{
			"stateCd": "TX",
			"desc": "Real County",
			"code": 4561
		},
		{
			"stateCd": "TX",
			"desc": "Red River County",
			"code": 4562
		},
		{
			"stateCd": "TX",
			"desc": "Reeves County",
			"code": 4563
		},
		{
			"stateCd": "TX",
			"desc": "Refugio County",
			"code": 4564
		},
		{
			"stateCd": "TX",
			"desc": "Roberts County",
			"code": 4565
		},
		{
			"stateCd": "TX",
			"desc": "Robertson County",
			"code": 4566
		},
		{
			"stateCd": "TX",
			"desc": "Rockwall County",
			"code": 4567
		},
		{
			"stateCd": "TX",
			"desc": "Runnels County",
			"code": 4568
		},
		{
			"stateCd": "TX",
			"desc": "Rusk County",
			"code": 4569
		},
		{
			"stateCd": "TX",
			"desc": "Sabine County",
			"code": 4570
		},
		{
			"stateCd": "TX",
			"desc": "San Augustine County",
			"code": 4571
		},
		{
			"stateCd": "TX",
			"desc": "San Jacinto County",
			"code": 4572
		},
		{
			"stateCd": "TX",
			"desc": "San Patricio County",
			"code": 4573
		},
		{
			"stateCd": "TX",
			"desc": "San Saba County",
			"code": 4574
		},
		{
			"stateCd": "TX",
			"desc": "Schleicher County",
			"code": 4575
		},
		{
			"stateCd": "TX",
			"desc": "Scurry County",
			"code": 4576
		},
		{
			"stateCd": "TX",
			"desc": "Shackelford County",
			"code": 4577
		},
		{
			"stateCd": "TX",
			"desc": "Shelby County",
			"code": 4578
		},
		{
			"stateCd": "TX",
			"desc": "Sherman County",
			"code": 4579
		},
		{
			"stateCd": "TX",
			"desc": "Smith County",
			"code": 4992
		},
		{
			"stateCd": "TX",
			"desc": "Somervell County",
			"code": 4580
		},
		{
			"stateCd": "TX",
			"desc": "Starr County",
			"code": 4581
		},
		{
			"stateCd": "TX",
			"desc": "Stephens County",
			"code": 4582
		},
		{
			"stateCd": "TX",
			"desc": "Sterling County",
			"code": 4583
		},
		{
			"stateCd": "TX",
			"desc": "Stonewall County",
			"code": 4584
		},
		{
			"stateCd": "TX",
			"desc": "Sutton County",
			"code": 4585
		},
		{
			"stateCd": "TX",
			"desc": "Swisher County",
			"code": 4586
		},
		{
			"stateCd": "TX",
			"desc": "Tarrant County",
			"code": 4587
		},
		{
			"stateCd": "TX",
			"desc": "Taylor County",
			"code": 4588
		},
		{
			"stateCd": "TX",
			"desc": "Terrell County",
			"code": 4589
		},
		{
			"stateCd": "TX",
			"desc": "Terry County",
			"code": 4590
		},
		{
			"stateCd": "TX",
			"desc": "Throckmorton County",
			"code": 4591
		},
		{
			"stateCd": "TX",
			"desc": "Titus County",
			"code": 4592
		},
		{
			"stateCd": "TX",
			"desc": "Tom Green County",
			"code": 4593
		},
		{
			"stateCd": "TX",
			"desc": "Travis County",
			"code": 4594
		},
		{
			"stateCd": "TX",
			"desc": "Trinity County",
			"code": 4595
		},
		{
			"stateCd": "TX",
			"desc": "Tyler County",
			"code": 4596
		},
		{
			"stateCd": "TX",
			"desc": "Upshur County",
			"code": 4597
		},
		{
			"stateCd": "TX",
			"desc": "Upton County",
			"code": 4598
		},
		{
			"stateCd": "TX",
			"desc": "Uvalde County",
			"code": 4599
		},
		{
			"stateCd": "TX",
			"desc": "Val Verde County",
			"code": 4600
		},
		{
			"stateCd": "TX",
			"desc": "Van Zandt County",
			"code": 4601
		},
		{
			"stateCd": "TX",
			"desc": "Victoria County",
			"code": 4602
		},
		{
			"stateCd": "TX",
			"desc": "Walker County",
			"code": 4603
		},
		{
			"stateCd": "TX",
			"desc": "Waller County",
			"code": 4604
		},
		{
			"stateCd": "TX",
			"desc": "Ward County",
			"code": 4993
		},
		{
			"stateCd": "TX",
			"desc": "Washington County",
			"code": 4605
		},
		{
			"stateCd": "TX",
			"desc": "Webb County",
			"code": 4606
		},
		{
			"stateCd": "TX",
			"desc": "Wharton County",
			"code": 4607
		},
		{
			"stateCd": "TX",
			"desc": "Wheeler County",
			"code": 4608
		},
		{
			"stateCd": "TX",
			"desc": "Wichita County",
			"code": 4609
		},
		{
			"stateCd": "TX",
			"desc": "Wilbarger County",
			"code": 4610
		},
		{
			"stateCd": "TX",
			"desc": "Willacy County",
			"code": 4611
		},
		{
			"stateCd": "TX",
			"desc": "Williamson County",
			"code": 4612
		},
		{
			"stateCd": "TX",
			"desc": "Wilson County",
			"code": 4613
		},
		{
			"stateCd": "TX",
			"desc": "Winkler County",
			"code": 4614
		},
		{
			"stateCd": "TX",
			"desc": "Wise County",
			"code": 4615
		},
		{
			"stateCd": "TX",
			"desc": "Wood County",
			"code": 4616
		},
		{
			"stateCd": "TX",
			"desc": "Yoakum County",
			"code": 4617
		},
		{
			"stateCd": "TX",
			"desc": "Young County",
			"code": 4618
		},
		{
			"stateCd": "TX",
			"desc": "Zapata County",
			"code": 4619
		},
		{
			"stateCd": "TX",
			"desc": "Zavala County",
			"code": 4620
		},
		{
			"stateCd": "UT",
			"desc": "Beaver County",
			"code": 4621
		},
		{
			"stateCd": "UT",
			"desc": "Box Elder County",
			"code": 4622
		},
		{
			"stateCd": "UT",
			"desc": "Cache County",
			"code": 4623
		},
		{
			"stateCd": "UT",
			"desc": "Carbon County",
			"code": 4624
		},
		{
			"stateCd": "UT",
			"desc": "Daggett County",
			"code": 4625
		},
		{
			"stateCd": "UT",
			"desc": "Davis County",
			"code": 4626
		},
		{
			"stateCd": "UT",
			"desc": "Duchesne County",
			"code": 4627
		},
		{
			"stateCd": "UT",
			"desc": "Emery County",
			"code": 4628
		},
		{
			"stateCd": "UT",
			"desc": "Garfield County",
			"code": 4629
		},
		{
			"stateCd": "UT",
			"desc": "Grand County",
			"code": 4630
		},
		{
			"stateCd": "UT",
			"desc": "Iron County",
			"code": 4631
		},
		{
			"stateCd": "UT",
			"desc": "Juab County",
			"code": 4632
		},
		{
			"stateCd": "UT",
			"desc": "Kane County",
			"code": 4633
		},
		{
			"stateCd": "UT",
			"desc": "Millard County",
			"code": 4634
		},
		{
			"stateCd": "UT",
			"desc": "Morgan County",
			"code": 4635
		},
		{
			"stateCd": "UT",
			"desc": "Piute County",
			"code": 4636
		},
		{
			"stateCd": "UT",
			"desc": "Rich County",
			"code": 4637
		},
		{
			"stateCd": "UT",
			"desc": "Salt Lake County",
			"code": 4638
		},
		{
			"stateCd": "UT",
			"desc": "San Juan County",
			"code": 4639
		},
		{
			"stateCd": "UT",
			"desc": "Sanpete County",
			"code": 4640
		},
		{
			"stateCd": "UT",
			"desc": "Sevier County",
			"code": 4641
		},
		{
			"stateCd": "UT",
			"desc": "Summit County",
			"code": 4642
		},
		{
			"stateCd": "UT",
			"desc": "Tooele County",
			"code": 4643
		},
		{
			"stateCd": "UT",
			"desc": "Uintah County",
			"code": 4644
		},
		{
			"stateCd": "UT",
			"desc": "Utah County",
			"code": 4645
		},
		{
			"stateCd": "UT",
			"desc": "Wasatch County",
			"code": 4646
		},
		{
			"stateCd": "UT",
			"desc": "Washington County",
			"code": 4647
		},
		{
			"stateCd": "UT",
			"desc": "Wayne County",
			"code": 4648
		},
		{
			"stateCd": "UT",
			"desc": "Weber County",
			"code": 4649
		},
		{
			"stateCd": "VA",
			"desc": "Accomack County",
			"code": 4664
		},
		{
			"stateCd": "VA",
			"desc": "Albemarle County",
			"code": 4665
		},
		{
			"stateCd": "VA",
			"desc": "Alexandria city",
			"code": 4759
		},
		{
			"stateCd": "VA",
			"desc": "Alleghany County",
			"code": 4666
		},
		{
			"stateCd": "VA",
			"desc": "Amelia County",
			"code": 4667
		},
		{
			"stateCd": "VA",
			"desc": "Amherst County",
			"code": 4668
		},
		{
			"stateCd": "VA",
			"desc": "Appomattox County",
			"code": 4669
		},
		{
			"stateCd": "VA",
			"desc": "Arlington County",
			"code": 4670
		},
		{
			"stateCd": "VA",
			"desc": "Augusta County",
			"code": 4671
		},
		{
			"stateCd": "VA",
			"desc": "Bath County",
			"code": 4672
		},
		{
			"stateCd": "VA",
			"desc": "Bedford city",
			"code": 4760
		},
		{
			"stateCd": "VA",
			"desc": "Bedford County",
			"code": 4673
		},
		{
			"stateCd": "VA",
			"desc": "Bland County",
			"code": 4674
		},
		{
			"stateCd": "VA",
			"desc": "Botetourt County",
			"code": 4675
		},
		{
			"stateCd": "VA",
			"desc": "Bristol city",
			"code": 4761
		},
		{
			"stateCd": "VA",
			"desc": "Brunswick County",
			"code": 4676
		},
		{
			"stateCd": "VA",
			"desc": "Buchanan County",
			"code": 4677
		},
		{
			"stateCd": "VA",
			"desc": "Buckingham County",
			"code": 4678
		},
		{
			"stateCd": "VA",
			"desc": "Buena Vista city",
			"code": 4762
		},
		{
			"stateCd": "VA",
			"desc": "Campbell County",
			"code": 4679
		},
		{
			"stateCd": "VA",
			"desc": "Caroline County",
			"code": 4680
		},
		{
			"stateCd": "VA",
			"desc": "Carroll County",
			"code": 4681
		},
		{
			"stateCd": "VA",
			"desc": "Charles City County",
			"code": 4682
		},
		{
			"stateCd": "VA",
			"desc": "Charlotte County",
			"code": 4683
		},
		{
			"stateCd": "VA",
			"desc": "Charlottesville city",
			"code": 4763
		},
		{
			"stateCd": "VA",
			"desc": "Chesapeake city",
			"code": 4764
		},
		{
			"stateCd": "VA",
			"desc": "Chesterfield County",
			"code": 4684
		},
		{
			"stateCd": "VA",
			"desc": "Clarke County",
			"code": 4685
		},
		{
			"stateCd": "VA",
			"desc": "Colonial Heights city",
			"code": 4765
		},
		{
			"stateCd": "VA",
			"desc": "Covington city",
			"code": 4766
		},
		{
			"stateCd": "VA",
			"desc": "Craig County",
			"code": 4686
		},
		{
			"stateCd": "VA",
			"desc": "Culpeper County",
			"code": 4687
		},
		{
			"stateCd": "VA",
			"desc": "Cumberland County",
			"code": 4688
		},
		{
			"stateCd": "VA",
			"desc": "Danville city",
			"code": 4767
		},
		{
			"stateCd": "VA",
			"desc": "Dickenson County",
			"code": 4689
		},
		{
			"stateCd": "VA",
			"desc": "Dinwiddie County",
			"code": 4690
		},
		{
			"stateCd": "VA",
			"desc": "Emporia city",
			"code": 4768
		},
		{
			"stateCd": "VA",
			"desc": "Essex County",
			"code": 4691
		},
		{
			"stateCd": "VA",
			"desc": "Fairfax city",
			"code": 4769
		},
		{
			"stateCd": "VA",
			"desc": "Fairfax County",
			"code": 4692
		},
		{
			"stateCd": "VA",
			"desc": "Falls Church city",
			"code": 4770
		},
		{
			"stateCd": "VA",
			"desc": "Fauquier County",
			"code": 4693
		},
		{
			"stateCd": "VA",
			"desc": "Floyd County",
			"code": 4694
		},
		{
			"stateCd": "VA",
			"desc": "Fluvanna County",
			"code": 4695
		},
		{
			"stateCd": "VA",
			"desc": "Franklin city",
			"code": 4771
		},
		{
			"stateCd": "VA",
			"desc": "Franklin County",
			"code": 4696
		},
		{
			"stateCd": "VA",
			"desc": "Frederick County",
			"code": 4697
		},
		{
			"stateCd": "VA",
			"desc": "Fredericksburg city",
			"code": 4772
		},
		{
			"stateCd": "VA",
			"desc": "Galax city",
			"code": 4773
		},
		{
			"stateCd": "VA",
			"desc": "Giles County",
			"code": 4698
		},
		{
			"stateCd": "VA",
			"desc": "Gloucester County",
			"code": 4699
		},
		{
			"stateCd": "VA",
			"desc": "Goochland County",
			"code": 4700
		},
		{
			"stateCd": "VA",
			"desc": "Grayson County",
			"code": 4701
		},
		{
			"stateCd": "VA",
			"desc": "Greene County",
			"code": 4702
		},
		{
			"stateCd": "VA",
			"desc": "Greensville County",
			"code": 4703
		},
		{
			"stateCd": "VA",
			"desc": "Halifax County",
			"code": 4704
		},
		{
			"stateCd": "VA",
			"desc": "Hampton city",
			"code": 4774
		},
		{
			"stateCd": "VA",
			"desc": "Hanover County",
			"code": 4705
		},
		{
			"stateCd": "VA",
			"desc": "Harrisonburg city",
			"code": 4775
		},
		{
			"stateCd": "VA",
			"desc": "Henrico County",
			"code": 4706
		},
		{
			"stateCd": "VA",
			"desc": "Henry County",
			"code": 4707
		},
		{
			"stateCd": "VA",
			"desc": "Highland County",
			"code": 4708
		},
		{
			"stateCd": "VA",
			"desc": "Hopewell city",
			"code": 4776
		},
		{
			"stateCd": "VA",
			"desc": "Isle of Wight County",
			"code": 4709
		},
		{
			"stateCd": "VA",
			"desc": "James City County",
			"code": 4710
		},
		{
			"stateCd": "VA",
			"desc": "King and Queen County",
			"code": 4711
		},
		{
			"stateCd": "VA",
			"desc": "King George County",
			"code": 4712
		},
		{
			"stateCd": "VA",
			"desc": "King William County",
			"code": 4713
		},
		{
			"stateCd": "VA",
			"desc": "Lancaster County",
			"code": 4714
		},
		{
			"stateCd": "VA",
			"desc": "Lee County",
			"code": 4715
		},
		{
			"stateCd": "VA",
			"desc": "Lexington city",
			"code": 4777
		},
		{
			"stateCd": "VA",
			"desc": "Loudoun County",
			"code": 4716
		},
		{
			"stateCd": "VA",
			"desc": "Louisa County",
			"code": 4717
		},
		{
			"stateCd": "VA",
			"desc": "Lunenburg County",
			"code": 4718
		},
		{
			"stateCd": "VA",
			"desc": "Lynchburg city",
			"code": 4778
		},
		{
			"stateCd": "VA",
			"desc": "Madison County",
			"code": 4719
		},
		{
			"stateCd": "VA",
			"desc": "Manassas city",
			"code": 4779
		},
		{
			"stateCd": "VA",
			"desc": "Manassas Park city",
			"code": 4780
		},
		{
			"stateCd": "VA",
			"desc": "Martinsville city",
			"code": 4781
		},
		{
			"stateCd": "VA",
			"desc": "Mathews County",
			"code": 4720
		},
		{
			"stateCd": "VA",
			"desc": "Mecklenburg County",
			"code": 4721
		},
		{
			"stateCd": "VA",
			"desc": "Middlesex County",
			"code": 4722
		},
		{
			"stateCd": "VA",
			"desc": "Montgomery County",
			"code": 4723
		},
		{
			"stateCd": "VA",
			"desc": "Nelson County",
			"code": 4724
		},
		{
			"stateCd": "VA",
			"desc": "New Kent County",
			"code": 4725
		},
		{
			"stateCd": "VA",
			"desc": "Newport News city",
			"code": 4782
		},
		{
			"stateCd": "VA",
			"desc": "Norfolk city",
			"code": 4783
		},
		{
			"stateCd": "VA",
			"desc": "Northampton County",
			"code": 4726
		},
		{
			"stateCd": "VA",
			"desc": "Northumberland County",
			"code": 4727
		},
		{
			"stateCd": "VA",
			"desc": "Norton city",
			"code": 4784
		},
		{
			"stateCd": "VA",
			"desc": "Nottoway County",
			"code": 4728
		},
		{
			"stateCd": "VA",
			"desc": "Orange County",
			"code": 4729
		},
		{
			"stateCd": "VA",
			"desc": "Page County",
			"code": 4730
		},
		{
			"stateCd": "VA",
			"desc": "Patrick County",
			"code": 4731
		},
		{
			"stateCd": "VA",
			"desc": "Petersburg city",
			"code": 4785
		},
		{
			"stateCd": "VA",
			"desc": "Pittsylvania County",
			"code": 4732
		},
		{
			"stateCd": "VA",
			"desc": "Poquoson city",
			"code": 4786
		},
		{
			"stateCd": "VA",
			"desc": "Portsmouth city",
			"code": 4787
		},
		{
			"stateCd": "VA",
			"desc": "Powhatan County",
			"code": 4733
		},
		{
			"stateCd": "VA",
			"desc": "Prince Edward County",
			"code": 4734
		},
		{
			"stateCd": "VA",
			"desc": "Prince George County",
			"code": 4735
		},
		{
			"stateCd": "VA",
			"desc": "Prince William County",
			"code": 4736
		},
		{
			"stateCd": "VA",
			"desc": "Pulaski County",
			"code": 4737
		},
		{
			"stateCd": "VA",
			"desc": "Radford city",
			"code": 4788
		},
		{
			"stateCd": "VA",
			"desc": "Rappahannock County",
			"code": 4738
		},
		{
			"stateCd": "VA",
			"desc": "Richmond city",
			"code": 4789
		},
		{
			"stateCd": "VA",
			"desc": "Richmond County",
			"code": 4739
		},
		{
			"stateCd": "VA",
			"desc": "Roanoke city",
			"code": 4790
		},
		{
			"stateCd": "VA",
			"desc": "Roanoke County",
			"code": 4740
		},
		{
			"stateCd": "VA",
			"desc": "Rockbridge County",
			"code": 4741
		},
		{
			"stateCd": "VA",
			"desc": "Rockingham County",
			"code": 4742
		},
		{
			"stateCd": "VA",
			"desc": "Russell County",
			"code": 4743
		},
		{
			"stateCd": "VA",
			"desc": "Salem city",
			"code": 4791
		},
		{
			"stateCd": "VA",
			"desc": "Scott County",
			"code": 4744
		},
		{
			"stateCd": "VA",
			"desc": "Shenandoah County",
			"code": 4745
		},
		{
			"stateCd": "VA",
			"desc": "Smyth County",
			"code": 4746
		},
		{
			"stateCd": "VA",
			"desc": "Southampton County",
			"code": 4747
		},
		{
			"stateCd": "VA",
			"desc": "Spotsylvania County",
			"code": 4748
		},
		{
			"stateCd": "VA",
			"desc": "Stafford County",
			"code": 4749
		},
		{
			"stateCd": "VA",
			"desc": "Staunton city",
			"code": 4792
		},
		{
			"stateCd": "VA",
			"desc": "Suffolk city",
			"code": 4793
		},
		{
			"stateCd": "VA",
			"desc": "Surry County",
			"code": 4750
		},
		{
			"stateCd": "VA",
			"desc": "Sussex County",
			"code": 4751
		},
		{
			"stateCd": "VA",
			"desc": "Tazewell County",
			"code": 4752
		},
		{
			"stateCd": "VA",
			"desc": "Virginia Beach city",
			"code": 4794
		},
		{
			"stateCd": "VA",
			"desc": "Warren County",
			"code": 4753
		},
		{
			"stateCd": "VA",
			"desc": "Washington County",
			"code": 4754
		},
		{
			"stateCd": "VA",
			"desc": "Waynesboro city",
			"code": 4795
		},
		{
			"stateCd": "VA",
			"desc": "Westmoreland County",
			"code": 4755
		},
		{
			"stateCd": "VA",
			"desc": "Williamsburg city",
			"code": 4796
		},
		{
			"stateCd": "VA",
			"desc": "Winchester city",
			"code": 4797
		},
		{
			"stateCd": "VA",
			"desc": "Wise County",
			"code": 4756
		},
		{
			"stateCd": "VA",
			"desc": "Wythe County",
			"code": 4757
		},
		{
			"stateCd": "VA",
			"desc": "York County",
			"code": 4758
		},
		{
			"stateCd": "VT",
			"desc": "Addison County",
			"code": 4650
		},
		{
			"stateCd": "VT",
			"desc": "Bennington County",
			"code": 4651
		},
		{
			"stateCd": "VT",
			"desc": "Caledonia County",
			"code": 4652
		},
		{
			"stateCd": "VT",
			"desc": "Chittenden County",
			"code": 4653
		},
		{
			"stateCd": "VT",
			"desc": "Essex County",
			"code": 4654
		},
		{
			"stateCd": "VT",
			"desc": "Franklin County",
			"code": 4655
		},
		{
			"stateCd": "VT",
			"desc": "Grand Isle County",
			"code": 4656
		},
		{
			"stateCd": "VT",
			"desc": "Lamoille County",
			"code": 4657
		},
		{
			"stateCd": "VT",
			"desc": "Orange County",
			"code": 4658
		},
		{
			"stateCd": "VT",
			"desc": "Orleans County",
			"code": 4659
		},
		{
			"stateCd": "VT",
			"desc": "Rutland County",
			"code": 4660
		},
		{
			"stateCd": "VT",
			"desc": "Washington County",
			"code": 4661
		},
		{
			"stateCd": "VT",
			"desc": "Windham County",
			"code": 4662
		},
		{
			"stateCd": "VT",
			"desc": "Windsor County",
			"code": 4663
		},
		{
			"stateCd": "WA",
			"desc": "Adams County",
			"code": 4798
		},
		{
			"stateCd": "WA",
			"desc": "Asotin County",
			"code": 4799
		},
		{
			"stateCd": "WA",
			"desc": "Benton County",
			"code": 4800
		},
		{
			"stateCd": "WA",
			"desc": "Chelan County",
			"code": 4801
		},
		{
			"stateCd": "WA",
			"desc": "Clallam County",
			"code": 4802
		},
		{
			"stateCd": "WA",
			"desc": "Clark County",
			"code": 4803
		},
		{
			"stateCd": "WA",
			"desc": "Columbia County",
			"code": 4804
		},
		{
			"stateCd": "WA",
			"desc": "Cowlitz County",
			"code": 4805
		},
		{
			"stateCd": "WA",
			"desc": "Douglas County",
			"code": 4806
		},
		{
			"stateCd": "WA",
			"desc": "Ferry County",
			"code": 4807
		},
		{
			"stateCd": "WA",
			"desc": "Franklin County",
			"code": 4808
		},
		{
			"stateCd": "WA",
			"desc": "Garfield County",
			"code": 4809
		},
		{
			"stateCd": "WA",
			"desc": "Grant County",
			"code": 4810
		},
		{
			"stateCd": "WA",
			"desc": "Grays Harbor County",
			"code": 4811
		},
		{
			"stateCd": "WA",
			"desc": "Island County",
			"code": 4812
		},
		{
			"stateCd": "WA",
			"desc": "Jefferson County",
			"code": 4813
		},
		{
			"stateCd": "WA",
			"desc": "King County",
			"code": 4814
		},
		{
			"stateCd": "WA",
			"desc": "Kitsap County",
			"code": 4815
		},
		{
			"stateCd": "WA",
			"desc": "Kittitas County",
			"code": 4816
		},
		{
			"stateCd": "WA",
			"desc": "Klickitat County",
			"code": 4817
		},
		{
			"stateCd": "WA",
			"desc": "Lewis County",
			"code": 4818
		},
		{
			"stateCd": "WA",
			"desc": "Lincoln County",
			"code": 4819
		},
		{
			"stateCd": "WA",
			"desc": "Mason County",
			"code": 4820
		},
		{
			"stateCd": "WA",
			"desc": "Okanogan County",
			"code": 4821
		},
		{
			"stateCd": "WA",
			"desc": "Pacific County",
			"code": 4822
		},
		{
			"stateCd": "WA",
			"desc": "Pend Oreille County",
			"code": 4823
		},
		{
			"stateCd": "WA",
			"desc": "Pierce County",
			"code": 4824
		},
		{
			"stateCd": "WA",
			"desc": "San Juan County",
			"code": 4825
		},
		{
			"stateCd": "WA",
			"desc": "Skagit County",
			"code": 4826
		},
		{
			"stateCd": "WA",
			"desc": "Skamania County",
			"code": 4827
		},
		{
			"stateCd": "WA",
			"desc": "Snohomish County",
			"code": 4828
		},
		{
			"stateCd": "WA",
			"desc": "Spokane County",
			"code": 4829
		},
		{
			"stateCd": "WA",
			"desc": "Stevens County",
			"code": 4830
		},
		{
			"stateCd": "WA",
			"desc": "Thurston County",
			"code": 4831
		},
		{
			"stateCd": "WA",
			"desc": "Wahkiakum County",
			"code": 4832
		},
		{
			"stateCd": "WA",
			"desc": "Walla Walla County",
			"code": 4833
		},
		{
			"stateCd": "WA",
			"desc": "Whatcom County",
			"code": 4834
		},
		{
			"stateCd": "WA",
			"desc": "Whitman County",
			"code": 4835
		},
		{
			"stateCd": "WA",
			"desc": "Yakima County",
			"code": 4836
		},
		{
			"stateCd": "WI",
			"desc": "Adams County",
			"code": 4892
		},
		{
			"stateCd": "WI",
			"desc": "Ashland County",
			"code": 4893
		},
		{
			"stateCd": "WI",
			"desc": "Barron County",
			"code": 4894
		},
		{
			"stateCd": "WI",
			"desc": "Bayfield County",
			"code": 4895
		},
		{
			"stateCd": "WI",
			"desc": "Brown County",
			"code": 4896
		},
		{
			"stateCd": "WI",
			"desc": "Buffalo County",
			"code": 4897
		},
		{
			"stateCd": "WI",
			"desc": "Burnett County",
			"code": 4898
		},
		{
			"stateCd": "WI",
			"desc": "Calumet County",
			"code": 4899
		},
		{
			"stateCd": "WI",
			"desc": "Chippewa County",
			"code": 4900
		},
		{
			"stateCd": "WI",
			"desc": "Clark County",
			"code": 4901
		},
		{
			"stateCd": "WI",
			"desc": "Columbia County",
			"code": 4902
		},
		{
			"stateCd": "WI",
			"desc": "Crawford County",
			"code": 4903
		},
		{
			"stateCd": "WI",
			"desc": "Dane County",
			"code": 4904
		},
		{
			"stateCd": "WI",
			"desc": "Dodge County",
			"code": 4905
		},
		{
			"stateCd": "WI",
			"desc": "Door County",
			"code": 4906
		},
		{
			"stateCd": "WI",
			"desc": "Douglas County",
			"code": 4907
		},
		{
			"stateCd": "WI",
			"desc": "Dunn County",
			"code": 4908
		},
		{
			"stateCd": "WI",
			"desc": "Eau Claire County",
			"code": 4909
		},
		{
			"stateCd": "WI",
			"desc": "Florence County",
			"code": 4910
		},
		{
			"stateCd": "WI",
			"desc": "Fond du Lac County",
			"code": 4911
		},
		{
			"stateCd": "WI",
			"desc": "Forest County",
			"code": 4912
		},
		{
			"stateCd": "WI",
			"desc": "Grant County",
			"code": 4913
		},
		{
			"stateCd": "WI",
			"desc": "Green County",
			"code": 4914
		},
		{
			"stateCd": "WI",
			"desc": "Green Lake County",
			"code": 4915
		},
		{
			"stateCd": "WI",
			"desc": "Iowa County",
			"code": 4916
		},
		{
			"stateCd": "WI",
			"desc": "Iron County",
			"code": 4917
		},
		{
			"stateCd": "WI",
			"desc": "Jackson County",
			"code": 4918
		},
		{
			"stateCd": "WI",
			"desc": "Jefferson County",
			"code": 4919
		},
		{
			"stateCd": "WI",
			"desc": "Juneau County",
			"code": 4920
		},
		{
			"stateCd": "WI",
			"desc": "Kenosha County",
			"code": 4921
		},
		{
			"stateCd": "WI",
			"desc": "Kewaunee County",
			"code": 4922
		},
		{
			"stateCd": "WI",
			"desc": "La Crosse County",
			"code": 4923
		},
		{
			"stateCd": "WI",
			"desc": "Lafayette County",
			"code": 4924
		},
		{
			"stateCd": "WI",
			"desc": "Langlade County",
			"code": 4925
		},
		{
			"stateCd": "WI",
			"desc": "Lincoln County",
			"code": 4926
		},
		{
			"stateCd": "WI",
			"desc": "Manitowoc County",
			"code": 4927
		},
		{
			"stateCd": "WI",
			"desc": "Marathon County",
			"code": 4928
		},
		{
			"stateCd": "WI",
			"desc": "Marinette County",
			"code": 4929
		},
		{
			"stateCd": "WI",
			"desc": "Marquette County",
			"code": 4930
		},
		{
			"stateCd": "WI",
			"desc": "Menominee County",
			"code": 4931
		},
		{
			"stateCd": "WI",
			"desc": "Milwaukee County",
			"code": 4932
		},
		{
			"stateCd": "WI",
			"desc": "Monroe County",
			"code": 4933
		},
		{
			"stateCd": "WI",
			"desc": "Oconto County",
			"code": 4934
		},
		{
			"stateCd": "WI",
			"desc": "Oneida County",
			"code": 4935
		},
		{
			"stateCd": "WI",
			"desc": "Outagamie County",
			"code": 4936
		},
		{
			"stateCd": "WI",
			"desc": "Ozaukee County",
			"code": 4937
		},
		{
			"stateCd": "WI",
			"desc": "Pepin County",
			"code": 4938
		},
		{
			"stateCd": "WI",
			"desc": "Pierce County",
			"code": 4939
		},
		{
			"stateCd": "WI",
			"desc": "Polk County",
			"code": 4940
		},
		{
			"stateCd": "WI",
			"desc": "Portage County",
			"code": 4941
		},
		{
			"stateCd": "WI",
			"desc": "Price County",
			"code": 4942
		},
		{
			"stateCd": "WI",
			"desc": "Racine County",
			"code": 4943
		},
		{
			"stateCd": "WI",
			"desc": "Richland County",
			"code": 4944
		},
		{
			"stateCd": "WI",
			"desc": "Rock County",
			"code": 4945
		},
		{
			"stateCd": "WI",
			"desc": "Rusk County",
			"code": 4946
		},
		{
			"stateCd": "WI",
			"desc": "Sauk County",
			"code": 4948
		},
		{
			"stateCd": "WI",
			"desc": "Sawyer County",
			"code": 4949
		},
		{
			"stateCd": "WI",
			"desc": "Shawano County",
			"code": 4950
		},
		{
			"stateCd": "WI",
			"desc": "Sheboygan County",
			"code": 4951
		},
		{
			"stateCd": "WI",
			"desc": "St. Croix County",
			"code": 4947
		},
		{
			"stateCd": "WI",
			"desc": "Taylor County",
			"code": 4952
		},
		{
			"stateCd": "WI",
			"desc": "Trempealeau County",
			"code": 4953
		},
		{
			"stateCd": "WI",
			"desc": "Vernon County",
			"code": 4954
		},
		{
			"stateCd": "WI",
			"desc": "Vilas County",
			"code": 4955
		},
		{
			"stateCd": "WI",
			"desc": "Walworth County",
			"code": 4956
		},
		{
			"stateCd": "WI",
			"desc": "Washburn County",
			"code": 4957
		},
		{
			"stateCd": "WI",
			"desc": "Washington County",
			"code": 4958
		},
		{
			"stateCd": "WI",
			"desc": "Waukesha County",
			"code": 4959
		},
		{
			"stateCd": "WI",
			"desc": "Waupaca County",
			"code": 4960
		},
		{
			"stateCd": "WI",
			"desc": "Waushara County",
			"code": 4961
		},
		{
			"stateCd": "WI",
			"desc": "Winnebago County",
			"code": 4962
		},
		{
			"stateCd": "WI",
			"desc": "Wood County",
			"code": 4963
		},
		{
			"stateCd": "WV",
			"desc": "Barbour County",
			"code": 4837
		},
		{
			"stateCd": "WV",
			"desc": "Berkeley County",
			"code": 4838
		},
		{
			"stateCd": "WV",
			"desc": "Boone County",
			"code": 4839
		},
		{
			"stateCd": "WV",
			"desc": "Braxton County",
			"code": 4840
		},
		{
			"stateCd": "WV",
			"desc": "Brooke County",
			"code": 4841
		},
		{
			"stateCd": "WV",
			"desc": "Cabell County",
			"code": 4842
		},
		{
			"stateCd": "WV",
			"desc": "Calhoun County",
			"code": 4843
		},
		{
			"stateCd": "WV",
			"desc": "Clay County",
			"code": 4844
		},
		{
			"stateCd": "WV",
			"desc": "Doddridge County",
			"code": 4845
		},
		{
			"stateCd": "WV",
			"desc": "Fayette County",
			"code": 4846
		},
		{
			"stateCd": "WV",
			"desc": "Gilmer County",
			"code": 4847
		},
		{
			"stateCd": "WV",
			"desc": "Grant County",
			"code": 4848
		},
		{
			"stateCd": "WV",
			"desc": "Greenbrier County",
			"code": 4849
		},
		{
			"stateCd": "WV",
			"desc": "Hampshire County",
			"code": 4850
		},
		{
			"stateCd": "WV",
			"desc": "Hancock County",
			"code": 4851
		},
		{
			"stateCd": "WV",
			"desc": "Hardy County",
			"code": 4852
		},
		{
			"stateCd": "WV",
			"desc": "Harrison County",
			"code": 4853
		},
		{
			"stateCd": "WV",
			"desc": "Jackson County",
			"code": 4854
		},
		{
			"stateCd": "WV",
			"desc": "Jefferson County",
			"code": 4855
		},
		{
			"stateCd": "WV",
			"desc": "Kanawha County",
			"code": 4856
		},
		{
			"stateCd": "WV",
			"desc": "Lewis County",
			"code": 4857
		},
		{
			"stateCd": "WV",
			"desc": "Lincoln County",
			"code": 4858
		},
		{
			"stateCd": "WV",
			"desc": "Logan County",
			"code": 4859
		},
		{
			"stateCd": "WV",
			"desc": "Marion County",
			"code": 4861
		},
		{
			"stateCd": "WV",
			"desc": "Marshall County",
			"code": 4862
		},
		{
			"stateCd": "WV",
			"desc": "Mason County",
			"code": 4863
		},
		{
			"stateCd": "WV",
			"desc": "McDowell County",
			"code": 4860
		},
		{
			"stateCd": "WV",
			"desc": "Mercer County",
			"code": 4864
		},
		{
			"stateCd": "WV",
			"desc": "Mineral County",
			"code": 4865
		},
		{
			"stateCd": "WV",
			"desc": "Mingo County",
			"code": 4866
		},
		{
			"stateCd": "WV",
			"desc": "Monongalia County",
			"code": 4867
		},
		{
			"stateCd": "WV",
			"desc": "Monroe County",
			"code": 4868
		},
		{
			"stateCd": "WV",
			"desc": "Morgan County",
			"code": 4869
		},
		{
			"stateCd": "WV",
			"desc": "Nicholas County",
			"code": 4870
		},
		{
			"stateCd": "WV",
			"desc": "Ohio County",
			"code": 4871
		},
		{
			"stateCd": "WV",
			"desc": "Pendleton County",
			"code": 4872
		},
		{
			"stateCd": "WV",
			"desc": "Pleasants County",
			"code": 4873
		},
		{
			"stateCd": "WV",
			"desc": "Pocahontas County",
			"code": 4874
		},
		{
			"stateCd": "WV",
			"desc": "Preston County",
			"code": 4875
		},
		{
			"stateCd": "WV",
			"desc": "Putnam County",
			"code": 4876
		},
		{
			"stateCd": "WV",
			"desc": "Raleigh County",
			"code": 4877
		},
		{
			"stateCd": "WV",
			"desc": "Randolph County",
			"code": 4878
		},
		{
			"stateCd": "WV",
			"desc": "Ritchie County",
			"code": 4879
		},
		{
			"stateCd": "WV",
			"desc": "Roane County",
			"code": 4880
		},
		{
			"stateCd": "WV",
			"desc": "Summers County",
			"code": 4881
		},
		{
			"stateCd": "WV",
			"desc": "Taylor County",
			"code": 4882
		},
		{
			"stateCd": "WV",
			"desc": "Tucker County",
			"code": 4883
		},
		{
			"stateCd": "WV",
			"desc": "Tyler County",
			"code": 4884
		},
		{
			"stateCd": "WV",
			"desc": "Upshur County",
			"code": 4885
		},
		{
			"stateCd": "WV",
			"desc": "Wayne County",
			"code": 4886
		},
		{
			"stateCd": "WV",
			"desc": "Webster County",
			"code": 4887
		},
		{
			"stateCd": "WV",
			"desc": "Wetzel County",
			"code": 4888
		},
		{
			"stateCd": "WV",
			"desc": "Wirt County",
			"code": 4889
		},
		{
			"stateCd": "WV",
			"desc": "Wood County",
			"code": 4890
		},
		{
			"stateCd": "WV",
			"desc": "Wyoming County",
			"code": 4891
		},
		{
			"stateCd": "WY",
			"desc": "Albany County",
			"code": 4964
		},
		{
			"stateCd": "WY",
			"desc": "Big Horn County",
			"code": 4965
		},
		{
			"stateCd": "WY",
			"desc": "Campbell County",
			"code": 4966
		},
		{
			"stateCd": "WY",
			"desc": "Carbon County",
			"code": 4967
		},
		{
			"stateCd": "WY",
			"desc": "Converse County",
			"code": 4968
		},
		{
			"stateCd": "WY",
			"desc": "Crook County",
			"code": 4969
		},
		{
			"stateCd": "WY",
			"desc": "Fremont County",
			"code": 4970
		},
		{
			"stateCd": "WY",
			"desc": "Goshen County",
			"code": 4971
		},
		{
			"stateCd": "WY",
			"desc": "Hot Springs County",
			"code": 4972
		},
		{
			"stateCd": "WY",
			"desc": "Johnson County",
			"code": 4973
		},
		{
			"stateCd": "WY",
			"desc": "Laramie County",
			"code": 4974
		},
		{
			"stateCd": "WY",
			"desc": "Lincoln County",
			"code": 4975
		},
		{
			"stateCd": "WY",
			"desc": "Natrona County",
			"code": 4976
		},
		{
			"stateCd": "WY",
			"desc": "Niobrara County",
			"code": 4977
		},
		{
			"stateCd": "WY",
			"desc": "Park County",
			"code": 4978
		},
		{
			"stateCd": "WY",
			"desc": "Platte County",
			"code": 4979
		},
		{
			"stateCd": "WY",
			"desc": "Sheridan County",
			"code": 4980
		},
		{
			"stateCd": "WY",
			"desc": "Sublette County",
			"code": 4981
		},
		{
			"stateCd": "WY",
			"desc": "Sweetwater County",
			"code": 4982
		},
		{
			"stateCd": "WY",
			"desc": "Teton County",
			"code": 4983
		},
		{
			"stateCd": "WY",
			"desc": "Uinta County",
			"code": 4984
		},
		{
			"stateCd": "WY",
			"desc": "Washakie County",
			"code": 4985
		},
		{
			"stateCd": "WY",
			"desc": "Weston County",
			"code": 4986
		}
	]
};

/***/ }),
/* 403 */
/***/ (function(module, exports) {

module.exports = {
	"regions": [
		{
			"stateCd": "",
			"code": 11054,
			"desc": "Middle Atlantic"
		},
		{
			"stateCd": "",
			"code": 11055,
			"desc": "Midwest"
		},
		{
			"stateCd": "",
			"code": 11056,
			"desc": "New England"
		},
		{
			"stateCd": "",
			"code": 11057,
			"desc": "Northern California"
		},
		{
			"stateCd": "",
			"code": 11059,
			"desc": "South"
		},
		{
			"stateCd": "",
			"code": 11060,
			"desc": "Southern California"
		},
		{
			"stateCd": "",
			"code": 11061,
			"desc": "Southwest"
		},
		{
			"stateCd": "",
			"code": 11062,
			"desc": "West"
		}
	]
};

/***/ }),
/* 404 */
/***/ (function(module, exports) {

module.exports = {
	"coverages": [
		{
			"code": 11003,
			"desc": "Annuities"
		},
		{
			"code": 11004,
			"desc": "Auto Insurance - Commercial"
		},
		{
			"code": 11005,
			"desc": "Auto Insurance - Personal"
		},
		{
			"code": 11006,
			"desc": "Aviation Insurance"
		},
		{
			"code": 11007,
			"desc": "Boat Insurance"
		},
		{
			"code": 11008,
			"desc": "Boiler and Machinery Insurance"
		},
		{
			"code": 11009,
			"desc": "Builder's Risk Insurance"
		},
		{
			"code": 11010,
			"desc": "Business Interruption Insurance"
		},
		{
			"code": 11011,
			"desc": "Business Owners Policy"
		},
		{
			"code": 11284,
			"desc": "Cancer Insurance"
		},
		{
			"code": 11012,
			"desc": "Church Insurance"
		},
		{
			"code": 11013,
			"desc": "Classic Car Insurance"
		},
		{
			"code": 11264,
			"desc": "Commercial Property Insurance"
		},
		{
			"code": 11014,
			"desc": "Condo Insurance"
		},
		{
			"code": 11015,
			"desc": "Crime Insurance"
		},
		{
			"code": 11016,
			"desc": "Crop Insurance"
		},
		{
			"code": 11017,
			"desc": "Cyber Liability Insurance"
		},
		{
			"code": 11018,
			"desc": "Dental Insurance"
		},
		{
			"code": 11019,
			"desc": "Directors and Officers Insurance"
		},
		{
			"code": 11020,
			"desc": "Disability Insurance - Long-term"
		},
		{
			"code": 11021,
			"desc": "Disability Insurance - Short-term"
		},
		{
			"code": 11263,
			"desc": "Dwelling/ Fire Insurance"
		},
		{
			"code": 11022,
			"desc": "Earthquake Insurance"
		},
		{
			"code": 11243,
			"desc": "Employment Practices Liability"
		},
		{
			"code": 11023,
			"desc": "Errors and Omissions Insurance"
		},
		{
			"code": 11270,
			"desc": "Farm Insurance"
		},
		{
			"code": 11024,
			"desc": "Fidelity Bond"
		},
		{
			"code": 11025,
			"desc": "Flood Insurance"
		},
		{
			"code": 11026,
			"desc": "Gap Insurance"
		},
		{
			"code": 11260,
			"desc": "General Liability Insurance"
		},
		{
			"code": 11027,
			"desc": "Health Insurance - Group"
		},
		{
			"code": 11028,
			"desc": "Health Insurance - Individual"
		},
		{
			"code": 11029,
			"desc": "Home Insurance"
		},
		{
			"code": 11030,
			"desc": "Identity Theft Insurance"
		},
		{
			"code": 11031,
			"desc": "Individual Retirement Accounts"
		},
		{
			"code": 11032,
			"desc": "Landlord Insurance"
		},
		{
			"code": 11033,
			"desc": "Life Insurance - Group"
		},
		{
			"code": 11034,
			"desc": "Life Insurance - Individual"
		},
		{
			"code": 11035,
			"desc": "Long-term Care"
		},
		{
			"code": 11037,
			"desc": "Marine Cargo Insurance"
		},
		{
			"code": 11036,
			"desc": "Medicare Supplement Insurance"
		},
		{
			"code": 11262,
			"desc": "Mobile Home Insurance"
		},
		{
			"code": 11038,
			"desc": "Motorcycle Insurance"
		},
		{
			"code": 11039,
			"desc": "Mutual Funds"
		},
		{
			"code": 11261,
			"desc": "Personal Identity Theft Insurance"
		},
		{
			"code": 11040,
			"desc": "Pet Insurance"
		},
		{
			"code": 11041,
			"desc": "Professional Liability Insurance"
		},
		{
			"code": 11042,
			"desc": "Public Liability Insurance"
		},
		{
			"code": 11043,
			"desc": "Renters Insurance"
		},
		{
			"code": 11044,
			"desc": "RV Insurance"
		},
		{
			"code": 11045,
			"desc": "Snowmobile Insurance"
		},
		{
			"code": 11046,
			"desc": "Surety Bond"
		},
		{
			"code": 11047,
			"desc": "Travel Insurance"
		},
		{
			"code": 11048,
			"desc": "Umbrella Insurance"
		},
		{
			"code": 11049,
			"desc": "Vision Insurance"
		},
		{
			"code": 11050,
			"desc": "Workers' Compensation"
		},
		{
			"code": 11285,
			"desc": "Youth Sports Protection Insurance"
		}
	]
};

/***/ }),
/* 405 */
/***/ (function(module, exports) {

module.exports = {
	"industries": [
		{
			"code": 11228,
			"desc": "Agribusiness"
		},
		{
			"code": 11229,
			"desc": "Barber and beauty"
		},
		{
			"code": 11230,
			"desc": "Commercial trucking"
		},
		{
			"code": 11231,
			"desc": "Contractor"
		},
		{
			"code": 11232,
			"desc": "Convenience stores"
		},
		{
			"code": 11233,
			"desc": "Feed, seed, grain"
		},
		{
			"code": 11234,
			"desc": "Florist"
		},
		{
			"code": 11235,
			"desc": "Garage and auto"
		},
		{
			"code": 11236,
			"desc": "Golf"
		},
		{
			"code": 11237,
			"desc": "Photographer"
		},
		{
			"code": 11238,
			"desc": "Religious organization"
		},
		{
			"code": 11239,
			"desc": "Restaurant"
		},
		{
			"code": 11240,
			"desc": "Storage warehouse"
		},
		{
			"code": 11241,
			"desc": "Veterinarian"
		}
	]
};

/***/ }),
/* 406 */
/***/ (function(module, exports) {

module.exports = {
	"causes": [
		{
			"code": 6655,
			"desc": "Alzheimer's"
		},
		{
			"code": 6659,
			"desc": "American Red Cross"
		},
		{
			"code": 6671,
			"desc": "Amnesty International"
		},
		{
			"code": 6669,
			"desc": "Animal rescue"
		},
		{
			"code": 6657,
			"desc": "Arthritis"
		},
		{
			"code": 6656,
			"desc": "Asthma"
		},
		{
			"code": 6650,
			"desc": "Cancer"
		},
		{
			"code": 6666,
			"desc": "Child abuse"
		},
		{
			"code": 6670,
			"desc": "Chronic obstructive pulmonary disease (COPD)"
		},
		{
			"code": 6652,
			"desc": "Dental health"
		},
		{
			"code": 6667,
			"desc": "Depression"
		},
		{
			"code": 6651,
			"desc": "Diabetes"
		},
		{
			"code": 6662,
			"desc": "Environmental issues"
		},
		{
			"code": 6660,
			"desc": "Habitat for Humanity"
		},
		{
			"code": 6649,
			"desc": "Heart disease"
		},
		{
			"code": 6672,
			"desc": "Heifer International"
		},
		{
			"code": 6665,
			"desc": "Homelessness"
		},
		{
			"code": 6668,
			"desc": "Hunger"
		},
		{
			"code": 6658,
			"desc": "Kidney disease"
		},
		{
			"code": 6654,
			"desc": "Mental health"
		},
		{
			"code": 6663,
			"desc": "Military veterans"
		},
		{
			"code": 11283,
			"desc": "Mommy & Me Cancer Foundation"
		},
		{
			"code": 6661,
			"desc": "Multiple sclerosis"
		},
		{
			"code": 6664,
			"desc": "Poverty"
		},
		{
			"code": 6653,
			"desc": "Vision health"
		}
	]
};

/***/ }),
/* 407 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_profile_Profile__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_profile_Profile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vue_profile_Profile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_location_Location__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_location_Location___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_location_Location__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_coverage_Coverage__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_coverage_Coverage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_coverage_Coverage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_outreach_Outreach__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_outreach_Outreach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_outreach_Outreach__);





/* harmony default export */ __webpack_exports__["a"] = ([{
    path: '/profile',
    name: 'Profile',
    component: __WEBPACK_IMPORTED_MODULE_0__vue_profile_Profile___default.a
}, {
    path: '/location',
    name: 'Location',
    component: __WEBPACK_IMPORTED_MODULE_1__vue_location_Location___default.a
}, {
    path: '/coverage',
    name: 'Coverage',
    component: __WEBPACK_IMPORTED_MODULE_2__vue_coverage_Coverage___default.a
}, {
    path: '/outreach',
    name: 'Outreach',
    component: __WEBPACK_IMPORTED_MODULE_3__vue_outreach_Outreach___default.a
}]);

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(409),
  /* template */
  __webpack_require__(432),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/Profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Profile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05b69b57", Component.options)
  } else {
    hotAPI.reload("data-v-05b69b57", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 409 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__QuickNavigation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__inputs_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Notification__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Notification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Errors__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Errors__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            properties: {
                name: store.getState().UserStore.name,
                email: store.getState().UserStore.email,
                phone: store.getState().UserStore.phone,
                title: store.getState().UserStore.title,
                principal_name: store.getState().UserStore.principal_name,
                principal_email: store.getState().UserStore.principal_email,
                organization_name: store.getState().UserStore.organization_name,
                website: store.getState().UserStore.website,
                staff_size: store.getState().UserStore.staff_size,
                year_founded: store.getState().UserStore.year_founded,
                multi_generation: store.getState().UserStore.multi_generation,
                notification_frequency: store.getState().UserStore.notification_frequency,
                notify_email: store.getState().UserStore.notify_email,
                notify_text: store.getState().UserStore.notify_text
            },
            titles: store.getState().OptionStore.titles,
            sizes: store.getState().OptionStore.sizes,
            generations: store.getState().OptionStore.generations,
            frequencies: store.getState().OptionStore.frequencies,
            errors: []
        };
    },

    methods: {
        update: function update(route) {
            var _this = this;

            this.errors = [];
            if (this.properties.name == '') {
                this.errors.push('You must enter your full name.');
            }
            if (this.properties.email == '') {
                this.errors.push('You must enter your email.');
            }
            if (this.properties.phone == '') {
                this.errors.push('You must enter your phone.');
            }
            if (this.errors.length == 0) {
                axios.post(window.location, this.properties).then(function (response) {
                    store.dispatch({ type: 'SET_PROPERTIES', data: response.data });
                    _this.$router.push({ name: route });
                }).catch(function (error) {
                    _this.errors.push('An error has occured, please contact support.');
                });
            }
        }
    },
    components: {
        Progress: __WEBPACK_IMPORTED_MODULE_0__Progress___default.a,
        QuickNavigation: __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default.a,
        Field: __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default.a,
        Dropdown: __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default.a,
        Notification: __WEBPACK_IMPORTED_MODULE_4__Notification___default.a,
        Errors: __WEBPACK_IMPORTED_MODULE_5__Errors___default.a
    }
});

/***/ }),
/* 410 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        progress: {
            type: Number,
            default: 33
        }
    }
});

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress"
  }, [_c('div', {
    staticClass: "w3-section w3-light-gray"
  }, [_c('div', {
    staticClass: "secondary w3-center w3-padding w3-text-white",
    style: ({
      width: (_vm.progress + "%")
    })
  }, [_vm._v(_vm._s(_vm.progress) + "%")])]), _vm._v(" "), (_vm.progress == 33) ? _c('div', {
    staticClass: "w3-section w3-row w3-center"
  }, [_c('div', {
    staticClass: "secondary w3-col l4 m4 s12 w3-padding-large w3-text-white"
  }, [_vm._v("Registration")]), _vm._v(" "), _c('div', {
    staticClass: "primary w3-col l4 m4 s12 w3-padding-large w3-text-white"
  }, [_vm._v("Social Media")]), _vm._v(" "), _c('div', {
    staticClass: "primary w3-col l4 m4 s12 w3-padding-large w3-text-white"
  }, [_vm._v("Profile")])]) : _vm._e(), _vm._v(" "), (_vm.progress == 67) ? _c('div', {
    staticClass: "w3-section w3-row w3-center"
  }, [_c('div', {
    staticClass: "secondary w3-col l4 m4 s12 w3-padding-large w3-text-white"
  }, [_vm._v("Registration")]), _vm._v(" "), _c('div', {
    staticClass: "secondary w3-col l4 m4 s12 w3-padding-large w3-text-white"
  }, [_vm._v("Social Media")]), _vm._v(" "), _c('div', {
    staticClass: "primary w3-col l4 m4 s12 w3-padding-large w3-text-white"
  }, [_vm._v("Profile")])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fcf0226e", module.exports)
  }
}

/***/ }),
/* 412 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        isActive: function isActive(route) {
            return this.$route.path == "/" + route;
        }
    }
});

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-row w3-center form"
  }, [_c('div', {
    class: [{
      'primary': _vm.isActive('profile')
    }, {
      'w3-text-white': _vm.isActive('profile')
    }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding'],
    on: {
      "click": function($event) {
        _vm.$emit('route', 'Profile')
      }
    }
  }, [_vm._v("Profile\n    ")]), _vm._v(" "), _c('div', {
    class: [{
      'primary': _vm.isActive('location')
    }, {
      'w3-text-white': _vm.isActive('location')
    }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding'],
    on: {
      "click": function($event) {
        _vm.$emit('route', 'Location')
      }
    }
  }, [_vm._v("Location\n    ")]), _vm._v(" "), _c('div', {
    class: [{
      'primary': _vm.isActive('coverage')
    }, {
      'w3-text-white': _vm.isActive('coverage')
    }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding'],
    on: {
      "click": function($event) {
        _vm.$emit('route', 'Coverage')
      }
    }
  }, [_vm._v("Coverage\n    ")]), _vm._v(" "), _c('div', {
    class: [{
      'primary': _vm.isActive('outreach')
    }, {
      'w3-text-white': _vm.isActive('outreach')
    }, 'w3-col', 'l3', 'm3', 's12', 'w3-card-2', 'w3-padding'],
    on: {
      "click": function($event) {
        _vm.$emit('route', 'Outreach')
      }
    }
  }, [_vm._v("Outreach\n    ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a68ecf5", module.exports)
  }
}

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(415),
  /* template */
  __webpack_require__(422),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/inputs/Field.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Field.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24eb2854", Component.options)
  } else {
    hotAPI.reload("data-v-24eb2854", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Cross__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        default: {
            type: String
        },
        validation: {
            type: String
        }
    },
    data: function data() {
        return {
            value: '',
            isValid: false
        };
    },
    mounted: function mounted() {
        if (this.default) {
            this.value = this.default;
            this.validate();
        }
    },

    methods: {
        validate: function validate() {
            this.$emit('setValue', this.value);
            switch (this.validation) {
                case 'EMAIL':
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.value)) {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
                case 'PHONE':
                    if (this.value != '' && this.value.length == 10) {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
                case 'YEAR':
                    if (this.value != '' && this.value.length == 4) {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
                default:
                    if (this.value != '') {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
            }
        }
    },
    components: {
        Check: __WEBPACK_IMPORTED_MODULE_0__Check___default.a,
        Cross: __WEBPACK_IMPORTED_MODULE_1__Cross___default.a
    }
});

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(417),
  /* template */
  __webpack_require__(418),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/inputs/Check.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Check.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c3a0e38", Component.options)
  } else {
    hotAPI.reload("data-v-8c3a0e38", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 417 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-check fa-3x w3-show-inline-block w3-margin-left w3-text-green v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c3a0e38", module.exports)
  }
}

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(420),
  /* template */
  __webpack_require__(421),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/inputs/Cross.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cross.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15295fc8", Component.options)
  } else {
    hotAPI.reload("data-v-15295fc8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 420 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-times fa-3x w3-show-inline-block w3-margin-left w3-text-red v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-15295fc8", module.exports)
  }
}

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-section"
  }, [_c('label', {
    staticClass: "w3-show-block"
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.value),
      expression: "value"
    }],
    staticClass: "w3-input w3-show-inline-block eighty",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.value)
    },
    on: {
      "keyup": function($event) {
        _vm.validate()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.value = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isValid) ? _c('Check') : _c('Cross')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24eb2854", module.exports)
  }
}

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(424),
  /* template */
  __webpack_require__(425),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/inputs/Dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Dropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57822a65", Component.options)
  } else {
    hotAPI.reload("data-v-57822a65", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 424 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        options: {
            type: Array
        },
        default: {
            type: String
        }
    },
    data: function data() {
        return {
            selected: { code: 'DE', desc: 'Options' }
        };
    },
    mounted: function mounted() {
        if (this.default) {
            this.selected = this.default;
        }
    },

    methods: {
        setSelected: function setSelected(option) {
            this.selected = option;
            this.$emit('setOption', option);
        }
    }
});

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eighty v-align"
  }, [_c('div', [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-hover w3-grey"
  }, [_c('button', {
    staticClass: "w3-button"
  }, [_vm._v(_vm._s(_vm.selected.desc) + "\n            "), _c('i', {
    staticClass: "fa fa-caret-down"
  })]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-content w3-bar-block w3-border"
  }, _vm._l((_vm.options), function(option) {
    return _c('div', {
      staticClass: "w3-bar-item w3-button",
      on: {
        "click": function($event) {
          _vm.setSelected(option)
        }
      }
    }, [_vm._v(_vm._s(option.desc) + "\n            ")])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57822a65", module.exports)
  }
}

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(427),
  /* template */
  __webpack_require__(428),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/Notification.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Notification.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2bc4402d", Component.options)
  } else {
    hotAPI.reload("data-v-2bc4402d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 427 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        notify_email: {
            type: Boolean
        },
        notify_text: {
            type: Boolean
        }
    },
    data: function data() {
        return {
            email: false,
            text: false
        };
    },
    mounted: function mounted() {
        if (_typeof(this.notify_email) != undefined) {
            this.email = this.notify_email;
        }
        if (_typeof(this.notify_text) != undefined) {
            this.text = this.notify_text;
        }
    }
});

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-section"
  }, [_c('span', {
    staticClass: "w3-large"
  }, [_vm._v("Notification Method: ")]), _vm._v(" "), _c('div', {
    staticClass: "w3-show-inline-block w3-margin-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "type": "checkbox",
      "id": "check1"
    },
    domProps: {
      "checked": Array.isArray(_vm.email) ? _vm._i(_vm.email, null) > -1 : (_vm.email)
    },
    on: {
      "change": function($event) {
        _vm.$emit('setEmail', _vm.email)
      },
      "__c": function($event) {
        var $$a = _vm.email,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.email = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.email = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.email = $$c
        }
      }
    }
  }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "w3-show-inline-block w3-margin-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.text),
      expression: "text"
    }],
    attrs: {
      "type": "checkbox",
      "id": "check2"
    },
    domProps: {
      "checked": Array.isArray(_vm.text) ? _vm._i(_vm.text, null) > -1 : (_vm.text)
    },
    on: {
      "change": function($event) {
        _vm.$emit('setText', _vm.text)
      },
      "__c": function($event) {
        var $$a = _vm.text,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.text = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.text = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.text = $$c
        }
      }
    }
  }), _vm._v(" "), _vm._m(1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    attrs: {
      "for": "check1"
    }
  }, [_c('span', {
    staticClass: "w3-show-inline-block w3-margin-right v-align"
  }), _vm._v("Email\n        ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    attrs: {
      "for": "check2"
    }
  }, [_c('span', {
    staticClass: "w3-show-inline-block w3-margin-right v-align"
  }), _vm._v("Text\n        ")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2bc4402d", module.exports)
  }
}

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(430),
  /* template */
  __webpack_require__(431),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/profile/Errors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Errors.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a6a963a6", Component.options)
  } else {
    hotAPI.reload("data-v-a6a963a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 430 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        errors: {
            type: Array
        }
    }
});

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [(_vm.errors.length) ? _c('ul', {
    staticClass: "w3-ul"
  }, _vm._l((_vm.errors), function(error) {
    return _c('li', {
      staticClass: "w3-text-red"
    }, [_vm._v(_vm._s(error))])
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a6a963a6", module.exports)
  }
}

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Progress', {
    attrs: {
      "progress": 67
    }
  }), _vm._v(" "), _c('QuickNavigation', {
    on: {
      "route": function($event) {
        _vm.update($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "w3-container w3-card-2 form"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('Field', {
    attrs: {
      "label": 'Full Name',
      "default": _vm.properties.name
    },
    on: {
      "setValue": function (value) { return _vm.properties.name = value; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Email',
      "validation": 'EMAIL',
      "default": _vm.properties.email
    },
    on: {
      "setValue": function (value) { return _vm.properties.email = value; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Cell Phone',
      "validation": 'PHONE',
      "default": _vm.properties.phone
    },
    on: {
      "setValue": function (value) { return _vm.properties.phone = value; }
    }
  }), _vm._v(" "), _c('Dropdown', {
    attrs: {
      "label": 'What is your title?',
      "options": _vm.titles,
      "default": _vm.properties.title
    },
    on: {
      "setOption": function (option) { return _vm.properties.title = option.code; }
    }
  }), _vm._v(" "), (_vm.properties.title != 'PR' && _vm.properties.title != '') ? _c('div', [_c('Field', {
    attrs: {
      "label": 'Principal Name',
      "default": _vm.properties.principal_name
    },
    on: {
      "setValue": function (value) { return _vm.properties.principal_name = value; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Principal Email',
      "validation": 'EMAIL',
      "default": _vm.properties.principal_email
    },
    on: {
      "setValue": function (value) { return _vm.properties.principal_email = value; }
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Organization Name',
      "default": _vm.properties.organization_name
    },
    on: {
      "setValue": function (value) { return _vm.properties.organization_name = value; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Website',
      "default": _vm.properties.website
    },
    on: {
      "setValue": function (value) { return _vm.properties.website = value; }
    }
  }), _vm._v(" "), _c('Dropdown', {
    attrs: {
      "label": 'What is the size of your staff?',
      "options": _vm.sizes,
      "default": _vm.properties.staff_size
    },
    on: {
      "setOption": function (option) { return _vm.properties.staff_size = option.code; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Founding Year',
      "validation": 'YEAR',
      "default": _vm.properties.year_founded
    },
    on: {
      "setValue": function (value) { return _vm.properties.year_founded = value; }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Is this a multigenerational company?',
      "options": _vm.generations,
      "default": _vm.properties.multi_generation
    },
    on: {
      "setOption": function (option) { return _vm.properties.multi_generation = option.code; }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'How often would you like us to communicate with you?',
      "options": _vm.frequencies,
      "default": _vm.properties.notification_frequency
    },
    on: {
      "setOption": function (option) { return _vm.properties.notification_frequency = option.code; }
    }
  })], 1), _vm._v(" "), _c('Notification', {
    attrs: {
      "notify_email": _vm.properties.notify_email,
      "notify_text": _vm.properties.notify_text
    },
    on: {
      "setEmail": function (email) { return _vm.properties.notify_email = email; },
      "setText": function (text) { return _vm.properties.notify_text = text; }
    }
  })], 1), _vm._v(" "), (_vm.errors.length) ? _c('div', {
    staticClass: "w3-panel"
  }, [_c('Errors', {
    attrs: {
      "errors": _vm.errors
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('h5', [_vm._v("Please continue to fill out the geographic information for your profile.")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.update('Location')
      }
    }
  }, [_vm._v("Continue\n            ")])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [_c('h3', [_vm._v("Who are we?")]), _vm._v(" "), _c('h5', [_vm._v("Please complete this information so we may provide you the best service.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-05b69b57", module.exports)
  }
}

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(434),
  /* template */
  __webpack_require__(453),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/Location.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Location.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17d5f023", Component.options)
  } else {
    hotAPI.reload("data-v-17d5f023", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 434 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__QuickNavigation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__inputs_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Errors__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Errors__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            properties: {
                email: store.getState().UserStore.email,
                address_1: store.getState().UserStore.address_1,
                address_2: store.getState().UserStore.address_2,
                city: store.getState().UserStore.city,
                state: store.getState().UserStore.state,
                zip: store.getState().UserStore.zip,
                marketing_regions: store.getState().UserStore.marketing_regions,
                marketing_states: store.getState().UserStore.marketing_states,
                marketing_counties: store.getState().UserStore.marketing_counties
            },
            states: store.getState().OptionStore.states,
            targets: store.getState().OptionStore.targets,
            target: '',
            regions: store.getState().OptionStore.regions,
            counties: store.getState().OptionStore.counties,
            errors: []
        };
    },

    methods: {
        setState: function setState(state) {
            this.properties.marketing_states.push(state);
            var filtered_counties = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.properties.marketing_states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var filter = _step.value;

                    var stateCd = filter.stateCd;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = store.getState().OptionStore.counties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var county = _step2.value;

                            if (county.stateCd == stateCd) {
                                filtered_counties.push(county);
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.counties = filtered_counties;
        },
        previous: function previous() {
            store.dispatch({ type: 'SET_LOCATION', data: this.properties });
            this.$router.push({ name: 'Profile' });
        },
        update: function update(route) {
            var _this = this;

            this.errors = [];
            if (this.errors.length == 0) {
                axios.post(window.location, this.properties).then(function (response) {
                    store.dispatch({ type: 'SET_LOCATION', data: response.data });
                    _this.$router.push({ name: route });
                }).catch(function (error) {
                    _this.errors.push('An error has occured, please contact support.');
                });
            }
        }
    },
    components: {
        Progress: __WEBPACK_IMPORTED_MODULE_0__Progress___default.a,
        QuickNavigation: __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default.a,
        Field: __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default.a,
        Dropdown: __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default.a,
        Checkbox: __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox___default.a,
        Errors: __WEBPACK_IMPORTED_MODULE_5__Errors___default.a
    }
});

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(436),
  /* template */
  __webpack_require__(443),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/inputs/Field.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Field.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c4c141fc", Component.options)
  } else {
    hotAPI.reload("data-v-c4c141fc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 436 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Cross__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        default: {
            type: String
        },
        validation: {
            type: String
        }
    },
    data: function data() {
        return {
            value: '',
            isValid: false
        };
    },
    mounted: function mounted() {
        if (this.default) {
            this.value = this.default;
            this.validate();
        }
    },

    methods: {
        validate: function validate() {
            this.$emit('setValue', this.value);
            switch (this.validation) {
                case 'ZIP':
                    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.value)) {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
                default:
                    if (this.value != '') {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
            }
        }
    },
    components: {
        Check: __WEBPACK_IMPORTED_MODULE_0__Check___default.a,
        Cross: __WEBPACK_IMPORTED_MODULE_1__Cross___default.a
    }
});

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(438),
  /* template */
  __webpack_require__(439),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/inputs/Check.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Check.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69f7ec10", Component.options)
  } else {
    hotAPI.reload("data-v-69f7ec10", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 438 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-check fa-3x w3-show-inline-block w3-margin-left w3-text-green v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-69f7ec10", module.exports)
  }
}

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(441),
  /* template */
  __webpack_require__(442),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/inputs/Cross.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cross.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b4ff7970", Component.options)
  } else {
    hotAPI.reload("data-v-b4ff7970", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 441 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-times fa-3x w3-show-inline-block w3-margin-left w3-text-red v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b4ff7970", module.exports)
  }
}

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-section"
  }, [_c('label', {
    staticClass: "w3-show-block"
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.value),
      expression: "value"
    }],
    staticClass: "w3-input w3-show-inline-block eighty",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.value)
    },
    on: {
      "keyup": function($event) {
        _vm.validate()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.value = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isValid) ? _c('Check') : _c('Cross')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c4c141fc", module.exports)
  }
}

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(445),
  /* template */
  __webpack_require__(446),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/inputs/Dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Dropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d7857b9", Component.options)
  } else {
    hotAPI.reload("data-v-2d7857b9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 445 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        options: {
            type: Array
        },
        default: {
            type: String
        }
    },
    data: function data() {
        return {
            selected: { "stateCd": "00", "desc": "Options", "code": "00" }
        };
    },
    mounted: function mounted() {
        if (this.default) {
            this.selected = this.default;
        }
    },

    methods: {
        setSelected: function setSelected(option) {
            this.selected = option;
            this.$emit('setOption', option);
        }
    }
});

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eighty v-align"
  }, [_c('div', [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-hover w3-grey"
  }, [_c('button', {
    staticClass: "w3-button"
  }, [_vm._v(_vm._s(_vm.selected.desc) + "\n            "), _c('i', {
    staticClass: "fa fa-caret-down"
  })]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-content w3-bar-block w3-border dropdown"
  }, _vm._l((_vm.options), function(option) {
    return _c('div', {
      staticClass: "w3-bar-item w3-button",
      on: {
        "click": function($event) {
          _vm.setSelected(option)
        }
      }
    }, [_vm._v("\n                " + _vm._s(option.desc)), (option.stateCd) ? _c('span', [_vm._v(" - " + _vm._s(option.stateCd))]) : _vm._e()])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d7857b9", module.exports)
  }
}

/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(448),
  /* template */
  __webpack_require__(449),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/inputs/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5cdd066b", Component.options)
  } else {
    hotAPI.reload("data-v-5cdd066b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 448 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        id: {
            type: String
        },
        value: {
            type: String
        }
    },
    data: function data() {
        return {
            checked: false
        };
    }
});

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checked),
      expression: "checked"
    }],
    attrs: {
      "type": "checkbox",
      "id": _vm.id
    },
    domProps: {
      "value": _vm.value,
      "checked": Array.isArray(_vm.checked) ? _vm._i(_vm.checked, _vm.value) > -1 : (_vm.checked)
    },
    on: {
      "change": function($event) {
        _vm.$emit('setChecked', _vm.value)
      },
      "__c": function($event) {
        var $$a = _vm.checked,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = _vm.value,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.checked = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checked = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_c('span', {
    staticClass: "w3-show-inline-block w3-margin-right v-align"
  }), _vm._v(_vm._s(_vm.label) + "\n    ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5cdd066b", module.exports)
  }
}

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(451),
  /* template */
  __webpack_require__(452),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/location/Errors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Errors.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f911259", Component.options)
  } else {
    hotAPI.reload("data-v-7f911259", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 451 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        errors: {
            type: Array
        }
    }
});

/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [(_vm.errors.length) ? _c('ul', {
    staticClass: "w3-ul"
  }, _vm._l((_vm.errors), function(error) {
    return _c('li', {
      staticClass: "w3-text-red"
    }, [_vm._v(_vm._s(error))])
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7f911259", module.exports)
  }
}

/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Progress', {
    attrs: {
      "progress": 67
    }
  }), _vm._v(" "), _c('QuickNavigation', {
    on: {
      "route": function($event) {
        _vm.update($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "w3-container w3-card-2 form"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('Field', {
    attrs: {
      "label": 'Business Address 1',
      "default": _vm.properties.address_1
    },
    on: {
      "setValue": function (value) { return _vm.properties.address_1 = value; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Business Address 2',
      "default": _vm.properties.address_2
    },
    on: {
      "setValue": function (value) { return _vm.properties.address_2 = value; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'City',
      "default": _vm.properties.city
    },
    on: {
      "setValue": function (value) { return _vm.properties.city = value; }
    }
  }), _vm._v(" "), _c('Dropdown', {
    attrs: {
      "label": 'State',
      "options": _vm.states,
      "default": _vm.properties.state.desc
    },
    on: {
      "setOption": function (option) { return _vm.properties.state = option.code; }
    }
  }), _vm._v(" "), _c('Field', {
    attrs: {
      "label": 'Zip Code',
      "validation": 'ZIP',
      "default": _vm.properties.zip
    },
    on: {
      "setValue": function (value) { return _vm.properties.zip = value; }
    }
  }), _vm._v(" "), _c('Dropdown', {
    attrs: {
      "label": 'Marketing Geography',
      "options": _vm.targets
    },
    on: {
      "setOption": function (option) { return _vm.target = option; }
    }
  }), _vm._v(" "), (_vm.target.code == 'R') ? _c('div', [_c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Marketing Regions',
      "options": _vm.regions
    },
    on: {
      "setOption": function (region) { return _vm.properties.marketing_regions.push(region); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Regions (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.marketing_regions), function(region, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (region) { return _vm.properties.marketing_regions.splice(index, 1); }
      }
    }, [_vm._v("\n                            " + _vm._s(region.desc) + "\n                            "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))])]) : _vm._e(), _vm._v(" "), (_vm.target.code == 'S') ? _c('div', [_c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Marketing State',
      "options": _vm.states
    },
    on: {
      "setOption": function($event) {
        _vm.setState($event)
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected States (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.marketing_states), function(state, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (state) { return _vm.properties.marketing_states.splice(index, 1); }
      }
    }, [_vm._v("\n                            " + _vm._s(state.desc) + "\n                            "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Marketing Counties',
      "options": _vm.counties
    },
    on: {
      "setOption": function (county) { return _vm.properties.marketing_counties.push(county); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Counties (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.marketing_counties), function(counties, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (county) { return _vm.properties.marketing_counties.splice(index, 1); }
      }
    }, [_vm._v("\n                            " + _vm._s(counties.desc) + " - " + _vm._s(counties.stateCd) + "\n                            "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))])]) : _vm._e()], 1), _vm._v(" "), (_vm.errors.length) ? _c('div', {
    staticClass: "w3-panel"
  }, [_c('Errors', {
    attrs: {
      "errors": _vm.errors
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('h5', [_vm._v("Click continue to select the coverages you wish to write.")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.previous()
      }
    }
  }, [_vm._v("Previous\n            ")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.update('Coverage')
      }
    }
  }, [_vm._v("Continue\n            ")])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [_c('h3', [_vm._v("Where are we?")]), _vm._v(" "), _c('h5', [_vm._v("Please complete this information for geographic service marketing.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-17d5f023", module.exports)
  }
}

/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(455),
  /* template */
  __webpack_require__(475),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/Coverage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Coverage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37048983", Component.options)
  } else {
    hotAPI.reload("data-v-37048983", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 455 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__QuickNavigation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__inputs_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Ratio__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Ratio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Ratio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Errors__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Errors__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            properties: {
                email: store.getState().UserStore.email,
                carriers: store.getState().UserStore.carriers,
                commercial_coverage_lines: [],
                personal_coverage_lines: [],
                benefit_coverage_lines: [],
                industry_currents: [],
                industry_targets: [],
                commercial_mix: store.getState().UserStore.commercial_mix,
                personal_mix: store.getState().UserStore.personal_mix
            },
            carriers: store.getState().OptionStore.carriers,
            coverage_lines: store.getState().OptionStore.coverage_lines,
            coverage_targets: store.getState().OptionStore.coverage_targets,
            industry_currents: store.getState().OptionStore.industry_currents,
            industry_targets: store.getState().OptionStore.industry_targets,
            errors: []
        };
    },

    methods: {
        setRatio: function setRatio(ratio) {
            this.properties.commercial_mix = ratio.commercial;
            this.properties.personal_mix = ratio.personal;
        },
        previous: function previous() {
            store.dispatch({ type: 'SET_COVERAGE', data: this.properties });
            this.$router.push({ name: 'Location' });
        },
        update: function update(route) {
            var _this = this;

            this.errors = [];
            if (this.errors.length == 0) {
                axios.post(window.location, this.properties).then(function (response) {
                    store.dispatch({ type: 'SET_COVERAGE', data: response.data });
                    _this.$router.push({ name: route });
                }).catch(function (error) {
                    _this.errors.push('An error has occured, please contact support.');
                });
            }
        }
    },
    components: {
        Progress: __WEBPACK_IMPORTED_MODULE_0__Progress___default.a,
        QuickNavigation: __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default.a,
        Field: __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default.a,
        Dropdown: __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default.a,
        Checkbox: __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox___default.a,
        Ratio: __WEBPACK_IMPORTED_MODULE_5__Ratio___default.a,
        Errors: __WEBPACK_IMPORTED_MODULE_6__Errors___default.a
    }
});

/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(457),
  /* template */
  __webpack_require__(462),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/inputs/Field.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Field.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-320555a2", Component.options)
  } else {
    hotAPI.reload("data-v-320555a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 457 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Cross__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        default: {
            type: String
        },
        validation: {
            type: String
        }
    },
    data: function data() {
        return {
            value: '',
            isValid: false
        };
    },
    mounted: function mounted() {
        if (this.default) {
            this.value = this.default;
            this.validate();
        }
    },

    methods: {
        validate: function validate() {
            this.$emit('setValue', this.value);
            switch (this.validation) {
                case 'ZIP':
                    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.value)) {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
                default:
                    if (this.value != '') {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
            }
        }
    },
    components: {
        Check: __WEBPACK_IMPORTED_MODULE_0__Check___default.a,
        Cross: __WEBPACK_IMPORTED_MODULE_1__Cross___default.a
    }
});

/***/ }),
/* 458 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-check fa-3x w3-show-inline-block w3-margin-left w3-text-green v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-99543b86", module.exports)
  }
}

/***/ }),
/* 460 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-times fa-3x w3-show-inline-block w3-margin-left w3-text-red v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-22438d16", module.exports)
  }
}

/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-section"
  }, [_c('label', {
    staticClass: "w3-show-block"
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.value),
      expression: "value"
    }],
    staticClass: "w3-input w3-show-inline-block eighty",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.value)
    },
    on: {
      "keyup": function($event) {
        _vm.validate()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.value = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isValid) ? _c('Check') : _c('Cross')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-320555a2", module.exports)
  }
}

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(464),
  /* template */
  __webpack_require__(465),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/inputs/Dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Dropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a39d328", Component.options)
  } else {
    hotAPI.reload("data-v-0a39d328", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 464 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        options: {
            type: Array
        }
    },
    data: function data() {
        return {
            selected: { 'code': '00', 'desc': 'Options' }
        };
    },

    methods: {
        setSelected: function setSelected(option) {
            this.selected = option;
            this.$emit('setOption', option);
        }
    }
});

/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eighty v-align"
  }, [_c('div', [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-hover w3-grey"
  }, [_c('button', {
    staticClass: "w3-button"
  }, [_vm._v(_vm._s(_vm.selected.desc) + "\n            "), _c('i', {
    staticClass: "fa fa-caret-down"
  })]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-content w3-bar-block w3-border dropdown"
  }, _vm._l((_vm.options), function(option) {
    return _c('div', {
      staticClass: "w3-bar-item w3-button",
      on: {
        "click": function($event) {
          _vm.setSelected(option)
        }
      }
    }, [_vm._v(_vm._s(option.desc) + "\n            ")])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0a39d328", module.exports)
  }
}

/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(467),
  /* template */
  __webpack_require__(468),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/inputs/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a47c51e", Component.options)
  } else {
    hotAPI.reload("data-v-2a47c51e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 467 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        id: {
            type: String
        },
        value: {
            type: String
        }
    },
    data: function data() {
        return {
            checked: false
        };
    }
});

/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checked),
      expression: "checked"
    }],
    attrs: {
      "type": "checkbox",
      "id": _vm.id
    },
    domProps: {
      "value": _vm.value,
      "checked": Array.isArray(_vm.checked) ? _vm._i(_vm.checked, _vm.value) > -1 : (_vm.checked)
    },
    on: {
      "change": function($event) {
        _vm.$emit('setChecked', _vm.value)
      },
      "__c": function($event) {
        var $$a = _vm.checked,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = _vm.value,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.checked = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checked = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_c('span', {
    staticClass: "w3-show-inline-block w3-margin-right v-align"
  }), _vm._v(_vm._s(_vm.label) + "\n    ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a47c51e", module.exports)
  }
}

/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(470),
  /* template */
  __webpack_require__(471),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/Ratio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Ratio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-454c4700", Component.options)
  } else {
    hotAPI.reload("data-v-454c4700", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 470 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputs_Check__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputs_Check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__inputs_Check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inputs_Cross__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inputs_Cross___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__inputs_Cross__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        commercial_mix: {
            type: String
        },
        personal_mix: {
            type: String
        }
    },
    data: function data() {
        return {
            commercial: '',
            personal: '',
            isValid: false
        };
    },
    mounted: function mounted() {
        if (this.commercial_mix) {
            this.commercial = this.commercial_mix;
            this.isValid = true;
        }
        if (this.personal_mix) {
            this.personal = this.personal_mix;
            this.isValid = true;
        }
    },

    methods: {
        setCommercialMix: function setCommercialMix() {
            var result = 100 - parseInt(this.commercial);
            this.personal = result.toString();
            if (this.commercial != '' && this.personal != '') {
                this.isValid = true;
                this.$emit('setRatio', {
                    commercial: this.commercial,
                    personal: this.personal
                });
            }
        },
        setPersonalMix: function setPersonalMix() {
            var result = 100 - parseInt(this.personal);
            this.commercial = result.toString();
            if (this.commercial != '' && this.personal != '') {
                this.isValid = true;
                this.$emit('setRatio', {
                    commercial: this.commercial,
                    personal: this.personal
                });
            }
        }
    },
    components: {
        Check: __WEBPACK_IMPORTED_MODULE_0__inputs_Check___default.a,
        Cross: __WEBPACK_IMPORTED_MODULE_1__inputs_Cross___default.a
    }
});

/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Ratio of Commercial to Personal Business")]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('label', {
    staticClass: "w3-show-block"
  }, [_vm._v("% Commercial")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.commercial),
      expression: "commercial"
    }],
    staticClass: "w3-input w3-show-inline-block eighty",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.commercial)
    },
    on: {
      "blur": function($event) {
        _vm.setCommercialMix()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.commercial = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isValid) ? _c('Check') : _c('Cross')], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('label', {
    staticClass: "w3-show-block"
  }, [_vm._v("% Personal")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.personal),
      expression: "personal"
    }],
    staticClass: "w3-input w3-show-inline-block eighty",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.personal)
    },
    on: {
      "blur": function($event) {
        _vm.setPersonalMix()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.personal = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isValid) ? _c('Check') : _c('Cross')], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-454c4700", module.exports)
  }
}

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(473),
  /* template */
  __webpack_require__(474),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/coverage/Errors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Errors.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b7a6e46", Component.options)
  } else {
    hotAPI.reload("data-v-4b7a6e46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 473 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        errors: {
            type: Array
        }
    }
});

/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [(_vm.errors.length) ? _c('ul', {
    staticClass: "w3-ul"
  }, _vm._l((_vm.errors), function(error) {
    return _c('li', {
      staticClass: "w3-text-red"
    }, [_vm._v(_vm._s(error))])
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b7a6e46", module.exports)
  }
}

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Progress', {
    attrs: {
      "progress": 67
    }
  }), _vm._v(" "), _c('QuickNavigation', {
    on: {
      "route": function($event) {
        _vm.update($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "w3-container w3-card-2 form"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Carriers',
      "options": _vm.carriers
    },
    on: {
      "setOption": function (carriers) { return _vm.properties.carriers.push(carriers); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Carriers (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.carriers), function(carrier, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (carrier) { return _vm.properties.carriers.splice(index, 1); }
      }
    }, [_vm._v("\n                        " + _vm._s(carrier.desc) + "\n                        "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Commercial Lines of Coverage',
      "options": _vm.coverage_targets
    },
    on: {
      "setOption": function (coverage) { return _vm.properties.commercial_coverage_lines.push(coverage); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Coverage Lines (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.commercial_coverage_lines), function(coverage, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (coverage) { return _vm.properties.commercial_coverage_lines.splice(index, 1); }
      }
    }, [_vm._v("\n                        " + _vm._s(coverage.desc) + "\n                        "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Personal Lines of Coverage',
      "options": _vm.coverage_targets
    },
    on: {
      "setOption": function (coverage) { return _vm.properties.personal_coverage_lines.push(coverage); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Coverage Lines (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.personal_coverage_lines), function(coverage, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (coverage) { return _vm.properties.personal_coverage_lines.splice(index, 1); }
      }
    }, [_vm._v("\n                        " + _vm._s(coverage.desc) + "\n                        "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Benefit Lines of Coverage',
      "options": _vm.coverage_targets
    },
    on: {
      "setOption": function (coverage) { return _vm.properties.benefit_coverage_lines.push(coverage); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Coverage Lines (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.benefit_coverage_lines), function(coverage, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (coverage) { return _vm.properties.benefit_coverage_lines.splice(index, 1); }
      }
    }, [_vm._v("\n                        " + _vm._s(coverage.desc) + "\n                        "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Current industries you market to',
      "options": _vm.industry_currents
    },
    on: {
      "setOption": function (industry) { return _vm.properties.industry_currents.push(industry); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v("Selected Industries (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.industry_currents), function(industry, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (industry) { return _vm.properties.industry_currents.splice(index, 1); }
      }
    }, [_vm._v("\n                        " + _vm._s(industry.desc) + "\n                        "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Target industries for future marketing',
      "options": _vm.industry_targets
    },
    on: {
      "setOption": function (industry) { return _vm.properties.industry_targets.push(industry); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('div', [_vm._v(" Selected Industries (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.industry_targets), function(industry, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (industry) { return _vm.properties.industry_targets.splice(index, 1); }
      }
    }, [_vm._v("\n                        " + _vm._s(industry.desc) + "\n                        "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-section"
  }, [_c('Ratio', {
    attrs: {
      "commercial_mix": _vm.properties.commercial_mix,
      "personal_mix": _vm.properties.personal_mix
    },
    on: {
      "setRatio": function($event) {
        _vm.setRatio($event)
      }
    }
  })], 1)]), _vm._v(" "), (_vm.errors.length) ? _c('div', {
    staticClass: "w3-panel"
  }, [_c('Errors', {
    attrs: {
      "errors": _vm.errors
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('h5', [_vm._v("Click continue to select how you want to reach your followers.")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.previous()
      }
    }
  }, [_vm._v("Previous\n            ")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.update('Outreach')
      }
    }
  }, [_vm._v("Continue\n            ")])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [_c('h3', [_vm._v("What do we write?")]), _vm._v(" "), _c('h5', [_vm._v("Please tell us about the lines you write and any industries you market to.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-37048983", module.exports)
  }
}

/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(477),
  /* template */
  __webpack_require__(499),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/Outreach.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Outreach.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25cef3ba", Component.options)
  } else {
    hotAPI.reload("data-v-25cef3ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 477 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__QuickNavigation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__inputs_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inputs_Radio__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inputs_Radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__inputs_Radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Errors__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Errors__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            properties: {
                engagement_mix: {},
                engagement_tone: {},
                special_topics: store.getState().UserStore.special_topics,
                causes: store.getState().UserStore.causes,
                posting_days: store.getState().UserStore.posting_days,
                posting_time: {}
            },
            engagement_mix: store.getState().OptionStore.engagement_mix,
            engagement_tone: store.getState().OptionStore.engagement_tone,
            special_topics: store.getState().OptionStore.special_topics,
            causes: store.getState().OptionStore.causes,
            days: store.getState().OptionStore.days,
            times: store.getState().OptionStore.times,
            errors: []
        };
    },

    methods: {
        previous: function previous() {
            store.dispatch({ type: 'SET_OUTREACH', data: this.properties });
            this.$router.push({ name: 'Coverage' });
        },
        update: function update(route) {
            var _this = this;

            this.errors = [];
            if (this.errors.length == 0) {
                axios.post(window.location, this.properties).then(function (response) {
                    store.dispatch({ type: 'SET_OUTREACH', data: response.data });
                    if (route == 'Done') {
                        alert('success! info saved in database ' + store.getState().UserStore);
                    } else {
                        _this.$router.push({ name: route });
                    }
                }).catch(function (error) {
                    _this.errors.push('An error has occured, please contact support.');
                });
            }
        }
    },
    components: {
        Progress: __WEBPACK_IMPORTED_MODULE_0__Progress___default.a,
        QuickNavigation: __WEBPACK_IMPORTED_MODULE_1__QuickNavigation___default.a,
        Field: __WEBPACK_IMPORTED_MODULE_2__inputs_Field___default.a,
        Dropdown: __WEBPACK_IMPORTED_MODULE_3__inputs_Dropdown___default.a,
        Checkbox: __WEBPACK_IMPORTED_MODULE_4__inputs_Checkbox___default.a,
        Radio: __WEBPACK_IMPORTED_MODULE_5__inputs_Radio___default.a,
        Errors: __WEBPACK_IMPORTED_MODULE_6__Errors___default.a
    }
});

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(479),
  /* template */
  __webpack_require__(486),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/inputs/Field.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Field.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-960d8c5c", Component.options)
  } else {
    hotAPI.reload("data-v-960d8c5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 479 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cross___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Cross__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        default: {
            type: String
        },
        validation: {
            type: String
        }
    },
    data: function data() {
        return {
            value: '',
            isValid: false
        };
    },
    mounted: function mounted() {
        if (this.default) {
            this.value = this.default;
            this.validate();
        }
    },

    methods: {
        validate: function validate() {
            this.$emit('setValue', this.value);
            switch (this.validation) {
                case 'ZIP':
                    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.value)) {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
                default:
                    if (this.value != '') {
                        this.isValid = true;
                    } else {
                        this.isValid = false;
                    }
                    break;
            }
        }
    },
    components: {
        Check: __WEBPACK_IMPORTED_MODULE_0__Check___default.a,
        Cross: __WEBPACK_IMPORTED_MODULE_1__Cross___default.a
    }
});

/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(481),
  /* template */
  __webpack_require__(482),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/inputs/Check.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Check.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fd5c7240", Component.options)
  } else {
    hotAPI.reload("data-v-fd5c7240", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 481 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-check fa-3x w3-show-inline-block w3-margin-left w3-text-green v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fd5c7240", module.exports)
  }
}

/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(484),
  /* template */
  __webpack_require__(485),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/inputs/Cross.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cross.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-864bc3d0", Component.options)
  } else {
    hotAPI.reload("data-v-864bc3d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 484 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    //
});

/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "fa fa-times fa-3x w3-show-inline-block w3-margin-left w3-text-red v-align"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-864bc3d0", module.exports)
  }
}

/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-section"
  }, [_c('label', {
    staticClass: "w3-show-block"
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.value),
      expression: "value"
    }],
    staticClass: "w3-input w3-show-inline-block eighty",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.value)
    },
    on: {
      "keyup": function($event) {
        _vm.validate()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.value = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isValid) ? _c('Check') : _c('Cross')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-960d8c5c", module.exports)
  }
}

/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(488),
  /* template */
  __webpack_require__(489),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/inputs/Dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Dropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e2126a2e", Component.options)
  } else {
    hotAPI.reload("data-v-e2126a2e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 488 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        options: {
            type: Array
        }
    },
    data: function data() {
        return {
            selected: { code: '00', desc: 'Options' }
        };
    },

    methods: {
        setSelected: function setSelected(option) {
            this.selected = option;
            this.$emit('setOption', option);
        }
    }
});

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eighty v-align"
  }, [_c('div', [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-hover w3-grey"
  }, [_c('button', {
    staticClass: "w3-button"
  }, [_vm._v(_vm._s(_vm.selected.desc) + "\n            "), _c('i', {
    staticClass: "fa fa-caret-down"
  })]), _vm._v(" "), _c('div', {
    staticClass: "w3-dropdown-content w3-bar-block w3-border dropdown"
  }, _vm._l((_vm.options), function(option) {
    return _c('div', {
      staticClass: "w3-bar-item w3-button",
      on: {
        "click": function($event) {
          _vm.setSelected(option)
        }
      }
    }, [_vm._v(_vm._s(option.desc) + "\n            ")])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e2126a2e", module.exports)
  }
}

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(491),
  /* template */
  __webpack_require__(492),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/inputs/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-83490cca", Component.options)
  } else {
    hotAPI.reload("data-v-83490cca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 491 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String
        },
        id: {
            type: String
        },
        value: {
            type: String
        }
    },
    data: function data() {
        return {
            checked: false
        };
    }
});

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checked),
      expression: "checked"
    }],
    attrs: {
      "type": "checkbox",
      "id": _vm.id
    },
    domProps: {
      "value": _vm.value,
      "checked": Array.isArray(_vm.checked) ? _vm._i(_vm.checked, _vm.value) > -1 : (_vm.checked)
    },
    on: {
      "change": function($event) {
        _vm.$emit('setChecked', _vm.value)
      },
      "__c": function($event) {
        var $$a = _vm.checked,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = _vm.value,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.checked = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checked = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_c('span', {
    staticClass: "w3-show-inline-block w3-margin-right v-align"
  }), _vm._v(_vm._s(_vm.label) + "\n    ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-83490cca", module.exports)
  }
}

/***/ }),
/* 493 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(494),
  /* template */
  __webpack_require__(495),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/inputs/Radio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Radio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2fbb4453", Component.options)
  } else {
    hotAPI.reload("data-v-2fbb4453", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 494 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        options: {
            type: Array
        },
        default: {
            type: Object
        }
    },
    data: function data() {
        return {
            selected: { code: '00', desc: 'Options' }
        };
    },
    mounted: function mounted() {
        if (_typeof(this.default != undefined)) {
            this.selected = this.default;
        }
    }
});

/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.options), function(option, index) {
    return _c('li', {
      staticClass: "w3-section"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selected),
        expression: "selected"
      }],
      attrs: {
        "type": "radio",
        "id": ("" + (option.code) + index)
      },
      domProps: {
        "value": option,
        "checked": _vm._q(_vm.selected, option)
      },
      on: {
        "change": function($event) {
          _vm.$emit('setChecked', option)
        },
        "__c": function($event) {
          _vm.selected = option
        }
      }
    }), _vm._v(" "), _c('label', {
      attrs: {
        "for": ("" + (option.code) + index)
      }
    }, [_c('span', {
      staticClass: "w3-show-inline-block w3-margin-right v-align"
    }), _vm._v(_vm._s(option.desc) + "\n        ")])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2fbb4453", module.exports)
  }
}

/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(497),
  /* template */
  __webpack_require__(498),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/outreach/Errors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Errors.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2adb4929", Component.options)
  } else {
    hotAPI.reload("data-v-2adb4929", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 497 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        errors: {
            type: Array
        }
    }
});

/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [(_vm.errors.length) ? _c('ul', {
    staticClass: "w3-ul"
  }, _vm._l((_vm.errors), function(error) {
    return _c('li', {
      staticClass: "w3-text-red"
    }, [_vm._v(_vm._s(error))])
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2adb4929", module.exports)
  }
}

/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Progress', {
    attrs: {
      "progress": 67
    }
  }), _vm._v(" "), _c('QuickNavigation', {
    on: {
      "route": function($event) {
        _vm.update($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "w3-container w3-card-2 form"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', [_vm._v("Desired engagement mix")]), _vm._v(" "), _c('Radio', {
    attrs: {
      "options": _vm.engagement_mix,
      "default": _vm.properties.engagement_mix
    },
    on: {
      "setChecked": function (option) { return _vm.properties.engagement_mix = option; }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', [_vm._v("Desired engagement tone")]), _vm._v(" "), _c('Radio', {
    attrs: {
      "options": _vm.engagement_tone,
      "default": _vm.properties.engagement_tone
    },
    on: {
      "setChecked": function (option) { return _vm.properties.engagement_tone = option; }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Special Post Topics',
      "options": _vm.special_topics
    },
    on: {
      "setOption": function (topic) { return _vm.properties.special_topics.push(topic); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', [_vm._v("Selected Topics (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.special_topics), function(topic, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (topic) { return _vm.properties.special_topics.splice(index, 1); }
      }
    }, [_vm._v("\n                    " + _vm._s(topic.desc) + "\n                    "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Supported Causes',
      "options": _vm.causes
    },
    on: {
      "setOption": function (cause) { return _vm.properties.causes.push(cause); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', [_vm._v("Selected Causes (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.causes), function(cause, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (cause) { return _vm.properties.causes.splice(index, 1); }
      }
    }, [_vm._v("\n                    " + _vm._s(cause.desc) + "\n                    "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('Dropdown', {
    attrs: {
      "label": 'Days to Post',
      "options": _vm.days
    },
    on: {
      "setOption": function (day) { return _vm.properties.posting_days.push(day); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', [_vm._v("Selected Posting Days (click to remove)")]), _vm._v(" "), _c('ul', {
    staticClass: "w3-ul w3-hoverable"
  }, _vm._l((_vm.properties.posting_days), function(day, index) {
    return _c('li', {
      staticClass: "w3-section",
      on: {
        "click": function (day) { return _vm.properties.posting_days.splice(index, 1); }
      }
    }, [_vm._v("\n                    " + _vm._s(day.desc) + "\n                    "), _c('i', {
      staticClass: "fa fa-times w3-margin-left"
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('div', [_vm._v("Times to post(all times PST)")]), _vm._v(" "), _c('Radio', {
    attrs: {
      "options": _vm.times,
      "default": _vm.properties.posting_time
    },
    on: {
      "setChecked": function (option) { return _vm.properties.posting_time = option; }
    }
  })], 1), _vm._v(" "), (_vm.errors.length) ? _c('div', {
    staticClass: "w3-panel"
  }, [_c('Errors', {
    attrs: {
      "errors": _vm.errors
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "w3-panel"
  }, [_c('h5', [_vm._v("Congratulations! You have completed your profile. Click continue to go to your dashboard.")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.previous()
      }
    }
  }, [_vm._v("Previous\n            ")]), _vm._v(" "), _c('button', {
    staticClass: "w3-button w3-text-white primary",
    on: {
      "click": function($event) {
        _vm.update('Done')
      }
    }
  }, [_vm._v("Continue\n            ")])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w3-panel"
  }, [_c('h3', [_vm._v("How do we reach our customers?")]), _vm._v(" "), _c('h5', [_vm._v("Please set your preferences for the type of outreach you would like.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-25cef3ba", module.exports)
  }
}

/***/ }),
/* 500 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(501),
  /* template */
  __webpack_require__(517),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2326cd96", Component.options)
  } else {
    hotAPI.reload("data-v-2326cd96", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 501 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigation_Navigation__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigation_Navigation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__navigation_Navigation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foot_Foot__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foot_Foot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__foot_Foot__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            loading: 0
        };
    },
    mounted: function mounted() {
        var _this = this;

        console.log('App mounted.');
        this.loading++;
        axios.get(window.base_url + '/api/user').then(function (response) {
            store.dispatch({ type: 'SET_USER', data: response.data });
            _this.loading--;
        });
    },

    components: {
        Navigation: __WEBPACK_IMPORTED_MODULE_0__navigation_Navigation___default.a,
        Foot: __WEBPACK_IMPORTED_MODULE_1__foot_Foot___default.a
    }
});

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(503),
  /* template */
  __webpack_require__(513),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/navigation/Navigation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Navigation.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55bc2a43", Component.options)
  } else {
    hotAPI.reload("data-v-55bc2a43", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 503 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Desktop__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Desktop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Desktop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mobile__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mobile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Mobile__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        Desktop: __WEBPACK_IMPORTED_MODULE_0__Desktop___default.a,
        Mobile: __WEBPACK_IMPORTED_MODULE_1__Mobile___default.a
    }
});

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(505),
  /* template */
  __webpack_require__(506),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/navigation/Desktop.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Desktop.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4edc3c7d", Component.options)
  } else {
    hotAPI.reload("data-v-4edc3c7d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 505 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        //
    }
});

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Home")]), _vm._v(" "), _c('div', {
    staticClass: "w3-right"
  }, [_c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Link 1")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Link 2")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Link 3")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Link 4")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4edc3c7d", module.exports)
  }
}

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(508),
  /* template */
  __webpack_require__(512),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/navigation/Mobile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Mobile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58501d51", Component.options)
  } else {
    hotAPI.reload("data-v-58501d51", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 508 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toggle__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toggle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Toggle__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            toggled: false
        };
    },

    methods: {
        toggle: function toggle() {
            this.toggled = !this.toggled;
        }
    },
    components: {
        Toggle: __WEBPACK_IMPORTED_MODULE_0__Toggle___default.a
    }
});

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(510),
  /* template */
  __webpack_require__(511),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/navigation/Toggle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Toggle.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b828c1fa", Component.options)
  } else {
    hotAPI.reload("data-v-b828c1fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 510 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    // Nothing to see here
});

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "w3-bar-item w3-button w3-right",
    on: {
      "click": function($event) {
        _vm.$emit('toggle')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bars"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b828c1fa", module.exports)
  }
}

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "w3-bar"
  }, [_c('a', {
    staticClass: "w3-bar-item w3-button"
  }, [_vm._v("Home")]), _vm._v(" "), _c('Toggle', {
    on: {
      "toggle": function($event) {
        _vm.toggle()
      }
    }
  })], 1), _vm._v(" "), (_vm.toggled) ? _c('div', {
    staticClass: "w3-bar-block"
  }, [_c('a', {
    staticClass: "w3-bar-item w3-button"
  }, [_vm._v("Link 1")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button"
  }, [_vm._v("Link 2")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button"
  }, [_vm._v("Link 3")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button"
  }, [_vm._v("Link 4")])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-58501d51", module.exports)
  }
}

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "w3-container w3-bar w3-card-2 w3-xlarge w3-text-white w3-padding-16 primary header-logo"
  }, [_c('div', {
    staticClass: "w3-hide-small"
  }, [_c('Desktop')], 1), _vm._v(" "), _c('div', {
    staticClass: "w3-hide-medium w3-hide-large"
  }, [_c('Mobile')], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-55bc2a43", module.exports)
  }
}

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(515),
  /* template */
  __webpack_require__(516),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/johnhuffman/Sites/InsuranceSocial.media/src/resources/javascripts/frontend/setup/vue/foot/Foot.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Foot.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-467e34c3", Component.options)
  } else {
    hotAPI.reload("data-v-467e34c3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 515 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        //
    }
});

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "w3-container w3-bar w3-medium w3-text-white w3-padding-16 secondary footer-logo"
  }, [_c('div', {
    staticClass: "w3-left"
  }, [_c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Link 1")]), _vm._v(" "), _c('a', {
    staticClass: "w3-bar-item w3-button w3-hover-white"
  }, [_vm._v("Link 2")])]), _vm._v(" "), _c('div', {
    staticClass: "w3-right"
  }, [_c('a', {
    staticClass: "w3-button w3-circle w3-large w3-hover-white primary"
  }, [_c('i', {
    staticClass: "fa fa-twitter"
  })]), _vm._v(" "), _c('a', {
    staticClass: "w3-button w3-circle w3-large w3-hover-white primary"
  }, [_c('i', {
    staticClass: "fa fa-facebook"
  })]), _vm._v(" "), _c('a', {
    staticClass: "w3-button w3-circle w3-large w3-hover-white primary"
  }, [_c('i', {
    staticClass: "fa fa-instagram"
  })]), _vm._v(" "), _c('a', {
    staticClass: "w3-button w3-circle w3-large w3-hover-white primary"
  }, [_c('i', {
    staticClass: "fa fa-linkedin"
  })])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-467e34c3", module.exports)
  }
}

/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Navigation'), _vm._v(" "), (_vm.loading == 0) ? _c('div', {
    staticClass: "w3-container w3-padding-32 bgimg2"
  }, [_c('router-view')], 1) : _vm._e(), _vm._v(" "), _c('Foot')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2326cd96", module.exports)
  }
}

/***/ })
/******/ ]);