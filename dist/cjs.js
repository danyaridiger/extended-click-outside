'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * @overview Console warnings
 */
const initial = "extended-click-outside:";
const alreadyHasListener = `${initial} element already has extended click outside listener`;
const invalidElement = `${initial} element must be a valid HTMLElement`;
const invalidListener = `${initial} listener must be a function`;
const missingElement = `${initial} element has no click outside listener`;
const outsideDocument = `${initial} can not run outside a document`;

/**
 * Determines whether given element is inside
 * root ExtendedClickOutside instance element
 * @function
 * @param {HTMLElement} element - ExtendedClickOutside root element
 * @param {HTMLElement} target - target of "click/touchstart" event
 * @returns {boolean} location
 */
const isParentElement = function (element, target) {
  let currentTarget = target.parentNode;
  while (currentTarget) {
    if (currentTarget === element) return true;
    if (currentTarget === document.documentElement || !currentTarget) return false;
    currentTarget = currentTarget.parentNode;
  }
};

/**
 * Determines whether to block ExtendedClickOutside
 * listener by special keys combination
 * @function
 * @param {MouseEvent} event - MouseEvent instance
 * @param {Array} blockKeys - list of keys
 * @returns {boolean} restriction
 */
const blockByKeys = function (event, blockKeys) {
  switch (true) {
    case !blockKeys || !blockKeys.length:
      return false;
    case event.altKey && blockKeys.includes("alt"):
      return true;
    case event.ctrlKey && blockKeys.includes("ctrl"):
      return true;
    case event.shiftKey && blockKeys.includes("shift"):
      return true;
    default:
      return false;
  }
};

/**
 * Sets reusable ExtendedClickOutside listener
 * @function
 * @param {HTMLElement} element - ExtendedClickOutside root element
 * @param {Function} listener - ExtendedClickOutside listener
 * @param {boolean} capture - event "capture" flag
 * @param {boolean} selfOnly - only current element flag
 * @param {Array} blockKeys - list of keys
 * @param {string} eventName - type of event
 * @returns {Function} handler
 */
const setListener = function (element, listener, capture, selfOnly, blockKeys, eventName) {
  const handler = function (event) {
    const target = event.target;
    if (target === element) return;
    if (!selfOnly && isParentElement(element, target)) return;
    if (blockByKeys(event, blockKeys)) return;
    listener();
  };
  document.documentElement.addEventListener(eventName, handler, capture ? capture : false);
  return handler;
};

/**
 * Sets disposable ExtendedClickOutside listener
 * @function
 * @param {HTMLElement} element - ExtendedClickOutside root element
 * @param {Function} listener - ExtendedClickOutside listener
 * @param {boolean} capture - event "capture" flag
 * @param {boolean} selfOnly - only current element flag
 * @param {Array} blockKeys - list of keys
 * @param {string} eventName - type of event
 * @returns {Function} handler
 */
const setListenerOnce = function (element, listener, capture, selfOnly, blockKeys, eventName) {
  const handler = function (event) {
    const target = event.target;
    if (target === element) return;
    if (!selfOnly && isParentElement(element, target)) return;
    if (blockByKeys(event, blockKeys)) return;
    listener();
    document.documentElement.removeEventListener(eventName, handler);
  };
  document.documentElement.addEventListener(eventName, handler, capture ? capture : false);
  return handler;
};

/**
 * Extracts element from Angular refs
 * @function
 * @param {Object} element - Angular ref
 * @returns {HTMLElement|null} - element
 */
const angularHandler = function (element) {
  if (element.nativeElement) return element.nativeElement;
  if (element.elementRef && element.elementRef.nativeElement) {
    return element.nativeElement;
  }
  if (element.element && element.element.nativeElement) {
    return element.element.nativeElement;
  }
  return null;
};

/**
 * Extracts element from JQuery selectors
 * @function
 * @param {Object} element - JQuery selector
 * @returns {HTMLElement|null} - element
 */
const jQueryHandler = function (element) {
  if (element[0]) return element[0];
  return null;
};

/**
 * Extracts element from React refs
 * @function
 * @param {Object} element - React ref
 * @returns {HTMLElement|null} - element
 */
const reactHandler = function (element) {
  if (element.current) return element.current;
  return null;
};

/**
 * Extracts element from Vue refs
 * @function
 * @param {Object} element - Vue ref
 * @returns {HTMLElement|null} - element
 */
const vueHandler = function (element) {
  if (element.$el) return element.$el;
  return null;
};

/**
 * Tries to extract element using all handlers
 * @function
 * @param {Object} element - any ref
 * @returns {HTMLElement|null} - element
 */
var frameworks = (function (element) {
  let elementFromHandler;
  const handlers = [angularHandler, jQueryHandler, reactHandler, vueHandler];
  for (let counter = 0; counter < handlers.length; counter++) {
    elementFromHandler = handlers[counter](element);
    if (elementFromHandler) return elementFromHandler;
  }
  return null;
});

/**
 * ExtendedClickOutside instance constructor
 * @author Ridiger Daniil Dmitrievich, 2023
 * @class
 * @version 1.0.3
 */
let ExtendedClickOutside = /*#__PURE__*/function () {
  function ExtendedClickOutside() {
    _classCallCheck(this, ExtendedClickOutside);
    _defineProperty(this, "_clickName", !document.ontouchstart ? "click" : "touchstart");
    _defineProperty(this, "_outsideListeners", new Map());
  }
  _createClass(ExtendedClickOutside, [{
    key: "init",
    value:
    /**
     * Initializes ExtendedClickOutside listener
     * @method
     * @param {HTMLElement} element - ExtendedClickOutside root element
     * @param {Function} listener - ExtendedClickOutside listener
     * @param {Object} config - configuration
     */
    function init(element, listener, config = {}) {
      let handler;
      const blockKeys = config.blockKeys;
      const capture = config.capture;
      const once = config.once;
      const selfOnly = config.selfOnly;
      const useWarnings = config.useWarnings;
      if (!element || typeof element !== "object") {
        useWarnings && console.warn(invalidElement);
        return;
      }
      if (!listener || typeof listener !== "function") {
        useWarnings && console.warn(invalidListener);
        return;
      }
      if (!window || !document || !document.documentElement) {
        useWarnings && console.warn(outsideDocument);
        return;
      }
      if (this._outsideListeners.has(element)) {
        useWarnings && console.warn(alreadyHasListener);
        return;
      }
      if (!(element instanceof HTMLElement)) {
        element = frameworks(element);
        if (!element) {
          useWarnings && console.warn(invalidElement);
          return;
        }
      }
      if (once) {
        handler = setListenerOnce(element, listener, capture, selfOnly, blockKeys, this._clickName);
      } else {
        handler = setListener(element, listener, capture, selfOnly, blockKeys, this._clickName);
      }
      this._outsideListeners.set(element, handler);
    }

    /**
     * Removes ExtendedClickOutside listener
     * @method
     * @param {HTMLElement} element - ExtendedClickOutside root element
     * @param {boolean} useWarnings - console warnings flag
     */
  }, {
    key: "remove",
    value: function remove(element, useWarnings = false) {
      if (!this._outsideListeners.has(element)) {
        useWarnings && console.warn(missingElement);
        return;
      }
      const handler = this._outsideListeners.get(element);
      document.documentElement.removeEventListener("click", handler);
      this._outsideListeners.delete(element);
    }

    /**
     * Removes all ExtendedClickOutside listeners
     * @method
     */
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      for (let handler of this._outsideListeners.values()) {
        document.documentElement.removeEventListener("click", handler);
      }
      this._outsideListeners.clear();
    }

    /**
     * Writes root ExtendedClickOutside elements to snapshots list
     * @method
     * @returns {Array} snapshots
     */
  }, {
    key: "getCurrentSnapshots",
    value: function getCurrentSnapshots() {
      let output = [];
      for (let element of this._outsideListeners.keys()) {
        const snapshot = element.outerHTML.match(/^(<.+?>)/is)[0];
        output.push(snapshot);
      }
      return output;
    }

    /**
     * Writes current ExtendedClickOutside listeners count
     * @method
     * @returns {number} count
     */
  }, {
    key: "getClickOutsidesCount",
    value: function getClickOutsidesCount() {
      return this._outsideListeners.size;
    }
  }]);
  return ExtendedClickOutside;
}();

exports.default = ExtendedClickOutside;
//# sourceMappingURL=cjs.js.map
