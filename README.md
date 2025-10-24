# extended-click-outside v3.2.0

---

### Brief annotation

**extended-click-outside** is a utility that assists developers in registering `click-outside` event handlers. To create a handler, simply pass a valid selector to its `init` instance method. This selector can also be an object, such as an element reference from various frameworks and libraries. Multiple configuration options allow you to create customized handlers for specific needs. These handlers are commonly used with form controls and interactive shells to define their properties and behavior based on their inactive state.

An important feature is that a single DOM element can have only one Extended Click Outside listener. This design prevents web applications from being overloaded with redundant handlers. The utility works correctly in all standard browser environments, making it suitable for a wide range of web applications.

### Installation with npm

`npm install --save extended-click-outside`

### Installation with yarn

`yarn add --production extended-click-outside`

### Importing

```js
import ExtendedClickOutside from "extended-click-outside";
```

### Importing types

```js
import type { ExtendedClickOutsideConfig } from "extended-click-outside";
```

### Usage with UMD

_Somewhere in your markup..._

```html
<script src="./public/scripts/extended-click-outside/index.umd.js"></script>
```

_Somewhere in your script below..._

```js
const intance = new window.ExtendedClickOutside();
```

## Table of contents

- [Simple example](#simple-example)
- [Example with config](#example-with-config)
- [Example with framework](#example-with-framework)
- [Removal of handler](#removal-of-handler)
- [Removal of all handlers](#removal-of-all-handlers)
- [Quantity information](#quantity-information)
- [Config list](#config-list)
- [License](#license)

## Simple example

Creating extended click outside handler on "div" element.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");
const handler = () => console.log("extended-click-outside: handler");

extendedClickOutside.init(div, handler);
```

## Example with config

Creating disposal handler on "div" element with "capture" flag.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");
const handler = () => console.log("extended-click-outside: disposal handler");
const config = {
  once: true,
  capture: true,
};

extendedClickOutside.init(div, handler, config);
```

## Example with framework

Creating handler on React DOMRef.

```js
import { useRef, useEffect } from "react";
import ExtendedClickOutside from "extended-click-outside";

export default function ComponentWithRef() {
  const simpleRef = useRef();
  const extendedClickOutside = new ExtendedClickOutside();
  const handler = () => console.log("extended-click-outside: DOMRef handler");

  useEffect(() => {
    extendedClickOutside.init(simpleRef.current, handler);
  }, []);

  return (
    <div className="with-ref">
      <h3 ref={simpleRef}>Simple DOMRef</h3>
    </div>
  );
}
```

## Removal of handler

Removal of registered handler from element.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");

// Setting up handler...

extendedClickOutside.remove(div, true);

// Second argument works like "useWarnings" flag from config.
```

## Removal of all handlers

Removal of all registered handlers from all elements.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");
const span = document.querySelector("span");

// Setting up handlers...

extendedClickOutside.removeAllListeners();
```

## Check listener for a given element

Checking if a listener exists for the given element.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");

// Setting up handler...

const presence = extendedClickOutside.isListenerExisting(div);
```

## Quantity information

Get information about the quantuty of handlers.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");
const span = document.querySelector("span");
const handler = () => console.log("extended-click-outside: handler");

extendedClickOutside.init(div, handler);
extendedClickOutside.init(span, handler, {
  useWarnings: true,
});

const quantity = extendedClickOutside.getListenersCount();
const snapshotsList = extendedClickOutside.getCurrentSnapshots();
```

## Config list

| Config name     | Config type | Config appointment                                                    | Config values          |
| --------------- | ----------- | --------------------------------------------------------------------- | ---------------------- |
| **blockKeys**   | Array       | List of keys combined with "click" event to block the listener.       | "alt", "ctrl", "shift" |
| **capture**     | Boolean     | Event "capture" flag for listener.                                    | &mdash;                |
| **passive**     | Boolean     | Event "passive" flag for listener.                                    | &mdash;                |
| **once**        | Boolean     | Registers disposable handler for element.                             | &mdash;                |
| **selfOnly**    | Boolean     | Handler will be registered only on current element (except children). | &mdash;                |
| **useWarnings** | Boolean     | Usefull internal warnings will be shown in console.                   | &mdash;                |

## License

[MIT](LICENSE)
