import {
  ALREADY_HAS_LISTENER,
  INVALID_ELEMENT,
  INVALID_LISTENER,
  MISSING_ELEMENT,
  OUTSIDE_OF_DOCUMENT,
} from "./sets/warnings";

import { setListener, setListenerOnce } from "./utils/listeners";

/**
 * ExtendedClickOutside instance constructor
 * @author Ridiger Daniil Dmitrievich, 2023
 * @class
 * @version 3.2.0
 */
export default class ExtendedClickOutside {
  _clickName = !document.ontouchstart ? "click" : "touchstart";
  _outsideListeners = new Map();

  /**
   * Initializes ExtendedClickOutside listener
   * @method
   * @param {HTMLElement} element - ExtendedClickOutside root element
   * @param {Function} listener - ExtendedClickOutside listener
   * @param {Object} [config={}] - configuration
   */
  init(element, listener, config = {}) {
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
      handler = setListenerOnce(
        element,
        listener,
        capture,
        passive,
        selfOnly,
        blockKeys,
        this._clickName,
        () => this._outsideListeners.delete(element),
      );
    } else {
      handler = setListener(
        element,
        listener,
        capture,
        passive,
        selfOnly,
        blockKeys,
        this._clickName,
      );
    }

    this._outsideListeners.set(element, {
      handler,
      options: {
        capture,
        passive,
      },
    });
  }

  /**
   * Removes ExtendedClickOutside listener
   * @method
   * @param {HTMLElement} element - ExtendedClickOutside root element
   * @param {boolean} [useWarnings=false] - console warnings flag
   */
  remove(element, useWarnings = false) {
    if (!this._outsideListeners.has(element)) {
      useWarnings && console.warn(MISSING_ELEMENT);

      return;
    }

    const listener = this._outsideListeners.get(element);

    document.documentElement.removeEventListener(
      "click",
      listener.handler,
      listener.options,
    );

    this._outsideListeners.delete(element);
  }

  /**
   * Removes all ExtendedClickOutside listeners
   * @method
   */
  removeAllListeners() {
    for (let listener of this._outsideListeners.values()) {
      document.documentElement.removeEventListener(
        "click",
        listener.handler,
        listener.options,
      );
    }

    this._outsideListeners.clear();
  }

  /**
   * Checks if a listener exists for the given element
   * @method
   * @param {HTMLElement} element - ExtendedClickOutside root element
   * @returns {boolean} listener existenсe flag
   */
  isListenerExisting(element) {
    return this._outsideListeners.has(element);
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
  getListenersCount() {
    return this._outsideListeners.size;
  }
}
