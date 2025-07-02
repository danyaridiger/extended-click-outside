'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

/**
 * @overview Console warnings
 */
const INITIAL = "extended-click-outside:";
const ALREADY_HAS_LISTENER = `${INITIAL} element already has extended click outside listener`;
const INVALID_ELEMENT = `${INITIAL} element must be a valid HTMLElement`;
const INVALID_LISTENER = `${INITIAL} listener must be a function`;
const MISSING_ELEMENT = `${INITIAL} element has no click outside listener`;
const OUTSIDE_OF_DOCUMENT = `${INITIAL} can not run outside a document`;

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
 * @param {Array} [blockKeys] - list of keys
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
const setListener = function (element, listener, capture, passive, selfOnly, blockKeys, eventName) {
  const handler = function (event) {
    const target = event.target;
    if (target === element) return;
    if (!selfOnly && isParentElement(element, target)) return;
    if (blockByKeys(event, blockKeys)) return;
    listener(event);
  };
  document.documentElement.addEventListener(eventName, handler, {
    capture,
    passive
  });
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
 * @param {Function} callback - removal of listener
 * @returns {Function} handler
 */
const setListenerOnce = function (element, listener, capture, passive, selfOnly, blockKeys, eventName, callback) {
  const handler = function (event) {
    const target = event.target;
    if (target === element) return;
    if (!selfOnly && isParentElement(element, target)) return;
    if (blockByKeys(event, blockKeys)) return;
    listener(event);
    document.documentElement.removeEventListener(eventName, handler, {
      capture,
      passive
    });
    callback();
  };
  document.documentElement.addEventListener(eventName, handler, {
    capture,
    passive
  });
  return handler;
};

/**
 * ExtendedClickOutside instance constructor
 * @author Ridiger Daniil Dmitrievich, 2023
 * @class
 * @version 2.0.1
 */
let ExtendedClickOutside = /*#__PURE__*/function () {
  function ExtendedClickOutside() {
    _classCallCheck(this, ExtendedClickOutside);
    _defineProperty(this, "_clickName", !document.ontouchstart ? "click" : "touchstart");
    _defineProperty(this, "_outsideListeners", new Map());
  }
  return _createClass(ExtendedClickOutside, [{
    key: "init",
    value:
    /**
     * Initializes ExtendedClickOutside listener
     * @method
     * @param {HTMLElement} element - ExtendedClickOutside root element
     * @param {Function} listener - ExtendedClickOutside listener
     * @param {Object} [config={}] - configuration
     */
    function init(element, listener, config = {}) {
      var _this = this;
      let handler;
      const blockKeys = config.blockKeys || [];
      const capture = config.capture || false;
      const passive = config.passive || false;
      const once = config.once || false;
      const selfOnly = config.selfOnly || false;
      const useWarnings = config.useWarnings || false;
      if (!element || typeof element !== "object") {
        useWarnings && console.warn(INVALID_ELEMENT);
        return;
      }
      if (!listener || typeof listener !== "function") {
        useWarnings && console.warn(INVALID_LISTENER);
        return;
      }
      if (!window || !document || !document.documentElement) {
        useWarnings && console.warn(OUTSIDE_OF_DOCUMENT);
        return;
      }
      if (this._outsideListeners.has(element)) {
        useWarnings && console.warn(ALREADY_HAS_LISTENER);
        return;
      }
      if (!element || !(element instanceof HTMLElement)) {
        useWarnings && console.warn(INVALID_ELEMENT);
        return;
      }
      if (once) {
        handler = setListenerOnce(element, listener, capture, passive, selfOnly, blockKeys, this._clickName, function () {
          return _this._outsideListeners.delete(element);
        });
      } else {
        handler = setListener(element, listener, capture, passive, selfOnly, blockKeys, this._clickName);
      }
      this._outsideListeners.set(element, {
        handler,
        options: {
          capture,
          passive
        }
      });
    }

    /**
     * Removes ExtendedClickOutside listener
     * @method
     * @param {HTMLElement} element - ExtendedClickOutside root element
     * @param {boolean} [useWarnings=false] - console warnings flag
     */
  }, {
    key: "remove",
    value: function remove(element, useWarnings = false) {
      if (!this._outsideListeners.has(element)) {
        useWarnings && console.warn(MISSING_ELEMENT);
        return;
      }
      const listener = this._outsideListeners.get(element);
      document.documentElement.removeEventListener("click", listener.handler, listener.options);
      this._outsideListeners.delete(element);
    }

    /**
     * Removes all ExtendedClickOutside listeners
     * @method
     */
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      for (let listener of this._outsideListeners.values()) {
        document.documentElement.removeEventListener("click", listener.handler, listener.options);
      }
      this._outsideListeners.clear();
    }

    /**
     * Checks if a listener exists for the given element
     * @method
     * @param {HTMLElement} element - ExtendedClickOutside root element
     * @returns {boolean} listener existenсe flag
     */
  }, {
    key: "isListenerExisting",
    value: function isListenerExisting(element) {
      return this._outsideListeners.has(element);
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
    key: "getListenersCount",
    value: function getListenersCount() {
      return this._outsideListeners.size;
    }
  }]);
}();

exports.default = ExtendedClickOutside;
//# sourceMappingURL=cjs.js.map
