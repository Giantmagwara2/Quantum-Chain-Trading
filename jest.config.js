const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}", "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/build/", "<rootDir>/dist/"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "server/**/*.{js,jsx,ts,tsx}",
    "shared/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/server/(.*)$": "<rootDir>/server/$1",
    "^@/shared/(.*)$": "<rootDir>/shared/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testTimeout: 30000,
  verbose: true,
  bail: false,
  maxWorkers: "50%",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironmentOptions: {
    url: "http://localhost:3000",
  },
  // Mock specific modules that cause issues in test environment
  moduleNameMapping: {
    ...require("next/jest")().moduleNameMapping,
    "^@/(.*)$": "<rootDir>/$1",
    // Mock WebSocket for testing
    "^ws$": "<rootDir>/__mocks__/ws.js",
    // Mock Canvas API for chart testing
    "^canvas$": "<rootDir>/__mocks__/canvas.js",
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
