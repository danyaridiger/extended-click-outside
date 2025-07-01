# Patch notes

Current `extended-click-outside` version: **2.0.0**

***

### 0.0.1 (2022-02-05)

* Utility `extended-click-outside` was released.

### 0.0.2 (2022-02-05)

* Adding .github/workflows directory to automate deployment.

### 1.0.0 (2022-02-05)

* Adding "@babel/plugin-transform-arrow-functions" dev-dependency.
* Adding "@rollup/plugin-babel" dev-dependency.
* Adding "babel-plugin-transform-imports" dev-dependency.
* Adding "rollup" dev-dependency.
* Adding "rollup-plugin-dts" dev-dependency
* Adding rollup.config.mjs file as build configuration.
* Adding some new keywords in package.json file.
* Adding "dist" directory for current builds of package.
* Сhanging the location of types in package.json file.

### 1.0.1 (2022-02-05)

* Removal of "/dist" build directory from .gitignore and .npmignore files.

### 1.0.2 (2022-02-05)

* Adding main and module files location to package.json file.

### 1.0.3 (2022-02-05)

* Replacing nullish coalescing operators with ternary operators.

### 1.1.0 (2022-02-05)

* Adding "@babel/plugin-proposal-class-properties" dev-dependency.
* Adding "@babel/plugin-transform-classes" dev-dependency.
* Adding new plugins to rollup.config.mjs file.

### 1.1.1 (2023-09-01)

* Updating dev-dependencies.

### 2.0.0 (2025-07-01)

* Adding "isListenerExisting" method to allow checking if an ExtendedClickOutside listener exists for a given element.
* Adding "passive" config option to provide corresponding flag for event listener.
* Adding initial config options to prevent configuration mismatches.
* Fixing bug with incorrect removal of disposable ExtendedClickOutside listener.
* Renaming internal warning constants.
* Renaming method "getClickOutsidesCount" to "getListenersCount".
* Removal of internal "frameworks" utility to allow manual extraction of element from DOM reference in any framework.
* Updating dev-dependencies.