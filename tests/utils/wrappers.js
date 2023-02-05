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
 * @returns {Object} - selectors
 */
export const initSelectors = () => {
  const div = document.querySelector("div");
  const section = document.querySelector("section");

  return { div, section };
};

/**
 * Listeners test handler
 * @function
 */
export const handler = () => {
  globalThis.HANDLE_RESULT = true;
};