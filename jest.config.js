module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js}",
    "src/**/index.js",
    "!src/**/*.test.{js}",
    "!src/**/*.tool.{js}",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  displayName: {
    name: "extended-click-outside",
    color: "bgGreen",
  },
  expand: true,
  fakeTimers: {
    legacyFakeTimers: true,
  },
  globals: {
    DEFAULT_PREVENTED: false,
    EVENT_PHASE: 0,
    HANDLE_RESULT: false,
  },
  injectGlobals: true,
  moduleFileExtensions: ["js", "ts", "json", "mjs", "node"],
  resetModules: true,
  resetMocks: true,
  rootDir: "./",
  sandboxInjectedGlobals: [],
  slowTestThreshold: 20,
  testEnvironment: "jsdom",
  testLocationInResults: true,
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["tests/tools/*"],
};
