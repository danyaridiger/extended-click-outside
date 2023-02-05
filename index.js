import {
  alreadyHasListener,
  invalidElement,
  invalidListener,
  missingElement,
  outsideDocument,
} from "./sets/warnings";

import { 
  setListener,
  setListenerOnce,
} from "./utils/listeners";

import frameworks from "./utils/frameworks";

/**
 * ExtendedClickOutside instance constructor
 * @author Ridiger Daniil Dmitrievich, 2023
 * @class
 * @version 1.0.0
 */
export default class ExtendedClickOutside {

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
      handler = setListenerOnce(
        element,
        listener,
        capture,
        selfOnly,
        blockKeys,
        this._clickName,
      );
    } else {
      handler = setListener(
        element,
        listener,
        capture,
        selfOnly,
        blockKeys,
        this._clickName,
      );
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