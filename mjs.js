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
  document.documentElement.addEventListener(eventName, handler, capture ?? false);
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
  document.documentElement.addEventListener(eventName, handler, capture ?? false);
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
 * @version 0.0.2
 */
class ExtendedClickOutside {
  _clickName = !document.ontouchstart ? "click" : "touchstart";
  _outsideListeners = new Map();

  /**
   * Initializes ExtendedClickOutside listener
   * @method
   * @param {HTMLElement} element - ExtendedClickOutside root element
   * @param {Function} listener - ExtendedClickOutside listener
   * @param {Object} config - configuration
   */
  init(element, listener, config = {}) {
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
  remove(element, useWarnings = false) {
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
  removeAllListeners() {
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
  getCurrentSnapshots() {
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
  getClickOutsidesCount() {
    return this._outsideListeners.size;
  }
}

export { ExtendedClickOutside as default };
//# sourceMappingURL=mjs.js.map
