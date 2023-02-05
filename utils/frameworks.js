/**
 * Extracts element from Angular refs
 * @function
 * @param {Object} element - Angular ref
 * @returns {HTMLElement|null} - element
 */
const angularHandler = (element) => {
  if (element.nativeElement) return element.nativeElement;
  if (element.elementRef && element.elementRef.nativeElement) {
    return element.nativeElement;
  }
  if (element.element && element.element.nativeElement) {
    return element.element.nativeElement;
  }

  return null
}

/**
 * Extracts element from JQuery selectors
 * @function
 * @param {Object} element - JQuery selector
 * @returns {HTMLElement|null} - element
 */
const jQueryHandler = (element) => {
  if (element[0]) return element[0];

  return null;
}

/**
 * Extracts element from React refs
 * @function
 * @param {Object} element - React ref
 * @returns {HTMLElement|null} - element
 */
const reactHandler = (element) => {
  if (element.current) return element.current;

  return null;
}

/**
 * Extracts element from Vue refs
 * @function
 * @param {Object} element - Vue ref
 * @returns {HTMLElement|null} - element
 */
const vueHandler = (element) => {
  if (element.$el) return element.$el;

  return null;
}

/**
 * Tries to extract element using all handlers
 * @function
 * @param {Object} element - any ref
 * @returns {HTMLElement|null} - element
 */
export default (element) => {
  let elementFromHandler;
  const handlers = [
    angularHandler,
    jQueryHandler,
    reactHandler,
    vueHandler,
  ];

  for (let counter = 0; counter < handlers.length; counter++) {
    elementFromHandler = handlers[counter](element);

    if (elementFromHandler) return elementFromHandler;
  }
  
  return null;
}