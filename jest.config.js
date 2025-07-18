module.exports = {
  expand: true,
  displayName: {
    name: "extended-click-outside",
    color: "bgGreen",
  },
  sandboxInjectedGlobals: [],
  globals: {
    DEFAULT_PREVENTED: false,
    EVENT_PHASE: 0,
    HANDLE_RESULT: false,
  },
  injectGlobals: true,
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx",
    "mjs",
    "node",
  ],
  resetModules: true,
  resetMocks: true,
  rootDir: "./",
  slowTestThreshold: 20,
  testEnvironment: "jsdom",
  testLocationInResults: true,
  testMatch: [
    "**/tests/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "tests/utils"
  ],
  fakeTimers: {
    legacyFakeTimers: true,
  },
}