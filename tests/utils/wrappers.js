/**
 * Creates html-wrapper for unit-tests
 * @function
 */
export const wrapperCreator = () => {
  const prevSection = document.querySelector("section");
  const section = document.createElement("section");
  const div = document.createElement("div");
  const span = document.createElement("span");

  section.style.width = "175px";
  section.style.height = "175px";
  span.textContent = "Test";

  div.append(span);
  section.append(div);
  
  if (prevSection) document.body.removeChild(prevSection);
  
  document.body.append(section);
};

/**
 * Initializes the main testable element selectors for unit-tests
 * @param {HTMLElement|null} div - selector for listener
 * @param {HTMLElement|null} section - selector for handler
 * @returns {Object} selectors
 */
export const initSelectors = () => {
  const div = document.querySelector("div");
  const section = document.querySelector("section");

  return { div, section };
};

/**
 * Test listener handler
 * @function
 */
export const handler = (event) => {
  globalThis.EVENT_PHASE = event.eventPhase;
  globalThis.HANDLE_RESULT = true;
};

/**
 * Test listener passive handler
 * @function
 */
export const passiveHandler = (event) => {
  event.preventDefault();
  
  globalThis.DEFAULT_PREVENTED = event.defaultPrevented;
};

