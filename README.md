# extended-click-outside v1.0.3

***

### Brief annotation

"extended-click-outside" is an utility that can help developers with outer click-events handlers registration. To create a handler, it is enough to pass a valid selector to its "init" instance method. Selector also can be an object of type element reference from different frameworks and libraries. This utility can automatically extract element from given references. Different ways of configuration will help to create customized handlers for specific needs. Such hanlders often used with form controls and interactive shells to specify their properties and behavior depending on their state inactivity. 
An important feature is that one DOM-element can have only single "extended-click-outside" listener. This is done to prevent the web-application from being overloaded with excess handlers. Utility works correctly in jsdom-environment, so it can be useful in web-applications.

### Installation with npm

``npm install --save extended-click-outside``

### Installation with yarn

``yarn install --production extended-click-outside``

### Importing

```js
import ExtendedClickOutside from "extended-click-outside"
```

### Importing types

```js
import ExtendedClickOutside from "extended-click-outside/types"
```

## Table of contents
* [Simple example](#simple-example)
* [Example with config](#example-with-config)
* [Example with framework](#example-with-framework)
* [Removal of handler](#removal-of-handler)
* [Removal of all handlers](#removal-of-all-handlers)
* [Quantity information](#quantity-information)
* [Config list](#config-list)
* [License](#license)

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
    extendedClickOutside.init(simpleRef, handler);
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

// Setting of handler...

extendedClickOutside.remove(div, true);

// Second argument works like "useWarnings" flag in config.
```

## Removal of all handlers

Removal of all registered handlers from all elements.

```js
import ExtendedClickOutside from "extended-click-outside";

const extendedClickOutside = new ExtendedClickOutside();
const div = document.querySelector("div");
const span = document.querySelector("span");

// Setting of handlers...

extendedClickOutside.removeAllListeners();
```

## Quantity information

Getting information about the quantuty of handlers.

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

const quantity = extendedClickOutside.getClickOutsidesCount();
const snapshotsList = extendedClickOutside.getCurrentSnapshots();
```

## Config list
Config name | Config type | Config appointment | Config values
------------|-------------|--------------------|--------------
**blockKeys**|Array|List of keys combined with "click" event to block the listener.|"alt", "ctrl", "shift"|
**capture**|Boolean|Event "capture" flag in event listener.|&mdash;|
**once**|Boolean|Registers disposable handler for element.|&mdash;|
**selfOnly**|Boolean|Handler will be registered only on current element (except children).|&mdash;|
**useWarnings**|Boolean|Usefull internal warnings will be shown in console.|&mdash;|

## License

[MIT](LICENSE)