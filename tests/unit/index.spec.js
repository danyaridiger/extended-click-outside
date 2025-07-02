import userEvent from '@testing-library/user-event';

import ExtendedClickOutside from "../../index";

import { 
  INVALID_ELEMENT, 
  INVALID_LISTENER,
  MISSING_ELEMENT,
} from "../../sets/warnings";

import { 
  wrapperCreator,
  initSelectors,
  handler,
  passiveHandler,
} from "../utils/wrappers";

let instance;
const snapshots = ['<div>', '<section style="width: 175px; height: 175px;">'];

console.warn = (warning) => {
  globalThis.warning = warning;
}

describe("extended-click-outside", () => {
  beforeEach(() => {
    if (instance) instance.removeAllListeners();

    instance = new ExtendedClickOutside();

    wrapperCreator();

    globalThis.DEFAULT_PREVENTED = false;
    globalThis.EVENT_PHASE = 0;
    globalThis.HANDLE_RESULT = false;
  });


  it('correctly initializes click listener', async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler);

    await userEvent.click(div);

    expect(globalThis.HANDLE_RESULT).toBeFalsy();

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();
  });


  it('correctly initializes click listener with capturing of the event', async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler, { capture: true });

    await userEvent.click(section);

    expect(globalThis.EVENT_PHASE).toEqual(1);
  });


  it("correctly initializes passive click listener", async () => {
    const { div, section } = initSelectors();

    instance.init(div, passiveHandler, { passive: true });

    await userEvent.click(section);

    expect(globalThis.DEFAULT_PREVENTED).toBeFalsy();
  });


  it('correctly initializes disposable click listener', async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler, { once: true });

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();

    globalThis.HANDLE_RESULT = false;

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeFalsy();
  });


  it('correctly restricts click listener by key combinations', async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler, { blockKeys: ["alt", "shift"] });
    
    await userEvent.pointer({keys: '[/MouseLeft][AltLeft>]'});

    expect(globalThis.HANDLE_RESULT).toBeFalsy();

    await userEvent.pointer({keys: '[/ShiftLeft]'});
    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();

    globalThis.HANDLE_RESULT = false;

    await userEvent.pointer({keys: '[/MouseLeft][ShiftLeft>]'});

    expect(globalThis.HANDLE_RESULT).toBeFalsy();
  });

  
  it('correctly handles child elements', async () => {
    const div = document.querySelector("div");
    const span = document.querySelector("span");

    instance.init(div, handler);

    await userEvent.click(span);

    expect(globalThis.HANDLE_RESULT).toBeFalsy();

    instance.removeAllListeners();
    instance.init(div, handler, { selfOnly: true });

    await userEvent.click(span);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();
  });


  it('correctly displays useful warnings in console', async () => {
    const { div, section } = initSelectors();

    instance.init(null, handler, { useWarnings: true });

    await userEvent.click(section);

    expect(globalThis.warning).toEqual(INVALID_ELEMENT);

    instance.init(div, null, { useWarnings: true });

    await userEvent.click(section);

    expect(globalThis.warning).toEqual(INVALID_LISTENER);
  });


  it("correctly removes click listener", async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler, { useWarnings: true });
    instance.remove(null, true);

    expect(globalThis.warning).toEqual(MISSING_ELEMENT);

    instance.remove(div);

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeFalsy();
  });


  it("corectly removes all click listeners", async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler);
    instance.init(section, handler);

    expect(instance.getListenersCount()).toEqual(2);

    instance.removeAllListeners();

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeFalsy();
    expect(instance.getListenersCount()).toEqual(0);
  });


  it("correctly extracts listener from given element", async () => {
    const { div, section } = initSelectors();

    instance.init(div, handler);

    expect(instance.isListenerExisting(div)).toBeTruthy();
    expect(instance.isListenerExisting(section)).toBeFalsy();
  });

  
  it("correctly gets all current snapshots", () => {
    const { div, section } = initSelectors();

    instance.init(div, handler);
    instance.init(section, handler);

    expect(instance.getCurrentSnapshots()).toEqual(snapshots);
  });


  it("correctly creates an instance on a DOMref element", async () => {
    const { div, section } = initSelectors();
    const reactRef = { current: div };

    instance.init(reactRef.current, handler);

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();
  });
 

  it("correctly creates an instance on a Vue ref element", async () => {
    const { div, section } = initSelectors();
    const vueRef = { 
      value: {
        $el: div,
      },
    }

    instance.init(vueRef.value.$el, handler);

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();
  });


  it("correctly handles JQuery selectors", async () => {
    const { div, section } = initSelectors();
    const jQuerySelector = {
      0: div,
      context: document,
      length: 1,
      prevObject: {
        0: document,
        context: document,
        length: 1,
      },
      selector: "div",
    };

    instance.init(jQuerySelector[0], handler);

    await userEvent.click(section);

    expect(globalThis.HANDLE_RESULT).toBeTruthy();
  });
});