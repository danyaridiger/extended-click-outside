/**
 * Determines whether given element is inside
 * root ExtendedClickOutside instance element
 * @function
 * @param {HTMLElement} element - ExtendedClickOutside root element
 * @param {HTMLElement} target - target of "click/touchstart" event
 * @returns {boolean} location
 */
const isParentElement = (element, target) => {
  let currentTarget = target.parentNode;

  while (currentTarget) {
    if (currentTarget === element) return true;
    if (
      currentTarget === document.documentElement 
      || !currentTarget
    ) return false;

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
const blockByKeys = (event, blockKeys) => {
  switch(true) {
    case !blockKeys || !blockKeys.length:
      return false;
    case event.altKey && blockKeys.includes("alt"):
      return true;
    case event.ctrlKey && blockKeys.includes("ctrl"):
      return true;
    case event.shiftKey && blockKeys.includes("shift"):
      return true;
    default: return false;
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
export const setListener = (
  element,
  listener,
  capture,
  selfOnly,
  blockKeys,
  eventName,
) => {
  const handler = (event) => {
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
export const setListenerOnce = (
  element,
  listener,
  capture,
  selfOnly,
  blockKeys,
  eventName,
) => {
  const handler = (event) => {
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