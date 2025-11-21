# Patch notes

Current `extended-click-outside` version: **3.2.0**

---

### 0.0.1 (2022-02-05)

- Utility `extended-click-outside` was released.

### 0.0.2 (2022-02-05)

- Adding .github/workflows directory to automate deployment.

### 1.0.0 (2022-02-05)

- Adding "@babel/plugin-transform-arrow-functions" dev-dependency.
- Adding "@rollup/plugin-babel" dev-dependency.
- Adding "babel-plugin-transform-imports" dev-dependency.
- Adding "rollup" dev-dependency.
- Adding "rollup-plugin-dts" dev-dependency
- Adding rollup.config.mjs file as build configuration.
- Adding some new keywords in package.json file.
- Adding "dist" directory for current builds of package.
- Сhanging the location of types in package.json file.

### 1.0.1 (2022-02-05)

- Removal of "/dist" build directory from .gitignore and .npmignore files.

### 1.0.2 (2022-02-05)

- Adding main and module files location to package.json file.

### 1.0.3 (2022-02-05)

- Replacing nullish coalescing operators with ternary operators.

### 1.1.0 (2022-02-05)

- Adding "@babel/plugin-proposal-class-properties" dev-dependency.
- Adding "@babel/plugin-transform-classes" dev-dependency.
- Adding new plugins to rollup.config.mjs file.

### 1.1.1 (2023-09-01)

- Updating dev-dependencies.

### 2.0.0 (2025-07-01)

- Adding "isListenerExisting" method to allow checking if an ExtendedClickOutside listener exists for a given element.
- Adding "passive" config option to provide corresponding flag for event listener.
- Adding initial config options to prevent configuration mismatches.
- Fixing bug with incorrect removal of disposable ExtendedClickOutside listener.
- Renaming internal warning constants.
- Renaming method "getClickOutsidesCount" to "getListenersCount".
- Removal of internal "frameworks" utility to allow manual extraction of element from DOM reference in any framework.
- Updating dev-dependencies.

### 2.0.1 (2025-07-02)

- Changing documentation and some JSDoc blocks.

### 3.0.0 (2025-09-30)

- Added "@babel/eslint-parser", "@commitlint/cli", "@commitlint/config-conventional", "@rollup/plugin-commonjs",
  "@rollup/plugin-terser", "jest-environment-jsdom", "eslint-config-prettier", "eslint-plugin-jest" dev-dependencies.
- Added new workflows for dependency management and CI/CD goals.
- Added github issue templates.
- Added commitlint.
- Added bundlewatch tool.
- Added prettier formatter and its specific rules for eslint.
- Added lint-staged to perform linting and formatting tasks.
- Added husky with "pre-commit" and "commit-msg" hooks.
- Added SECURITY.md file for package security policy.
- Added editor configuration file.
- Added .gitattributes configuration file.
- Added some new scripts to package.json file.
- Added coverage configuration for unit testing.
- Changed rollup output format and added UMD output variant.
- Changed documentation for contributors.
- Changed package keywords.
- Changed Node.js platform version and added a treshold for the node platform versions.
- Changed eslint version and removed .eslintrc.js configuration file in favor of the new .eslintrc.json configuration file.
- Changed .gitignore and .npmignore configuration files and added .eslintignore configuration file.
- Removed "publish" workflow in favor of the new "release" workflow.
- Renamed "typings" directory to "types" and type declaration file to "index.d.ts".

### 3.1.0 (2025-10-04)

- Added "@typescript-eslint/eslint-plugin" and "rollup-plugin-banner2" dev-dependencies.
- Added banner with package information to all output variants.
- Corrected bundle size tresholds in bundlewatch tool.
- Expanded .eslintrc.json configuration file to provide TypeScript support.
- Removed excess "size" script from package.json file.
- Updated "release" workflow for automatically creating Github releases.

### 3.1.1 (2025-10-04)

- Fixed "release" workflow configuration for automatically creating Github tags.

### 3.1.2 (2025-10-04)

- Added needed permissions for "release" workflow.

### 3.1.3 (2025-10-04)

- Fixed some syntax of "release" workflow for automatically creating Github releases.

### 3.2.0 (2025-10-24)

- Added "@babel/plugin-transform-runtime" dev-dependency.
- Eliminated future runtime errors in UMD file output variant by reconfiguring the "babel" plugin for rollup.
- Fixed audit workflow to resolve errors and permission issues.
- Fixed dependency workflow to safely update dependencies while preventing hook-related errors.
- Fixed main documentation and documentation for contributors with more correct paragraphs.
- Fixed paths in bundlewatch and rollup configurations.
- Fixed list of extensions in jest, eslint and lint-staged configurations.
- Removed "@babel/plugin-proposal-class-properties", "@babel/plugin-transform-arrow-functions" and
  "@babel/plugin-transform-classes" dev-dependencies.
- Removed unnecessary duplicate blocks from the .eslintrc.json configuration file.
- Removed unnecessary extensions from Jest coverage configuration.

### 3.2.1 (draft)

- Changed line endings in .gitattributes configuration file.
- Changed coverage paths in jest configuration file.
- Fixed permission issues in dependency update workflow.
- Renamed unit-tests helper directory from "utils" to "tools".
- Renamed unit-tests tools with addition of the "tool" postfix.
