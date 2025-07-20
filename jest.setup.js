"use client"

import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return "/"
  },
}))

// Mock WebSocket
global.WebSocket = jest.fn(() => ({
  close: jest.fn(),
  send: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: 1,
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
}))

// Mock Canvas API for chart components
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => ({ data: new Array(4) })),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  }),
)

// Mock crypto for UUID generation
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: jest.fn(() => "mock-uuid-1234-5678-9012"),
    getRandomValues: jest.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    }),
  },
})

// Mock performance API
Object.defineProperty(global, "performance", {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
  },
})

// Mock console methods to reduce noise in tests
const originalError = console.error
const originalWarn = console.warn

jest.beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning: ReactDOM.render is no longer supported") ||
        args[0].includes("Warning: React.createFactory() is deprecated") ||
        args[0].includes("Warning: componentWillReceiveProps has been renamed"))
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("componentWillReceiveProps has been renamed") ||
        args[0].includes("React.createFactory() is deprecated"))
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

jest.afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Set up test environment variables
process.env.NODE_ENV = "test"
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test"

// Mock AI agents for testing
jest.mock("../server/services/quantumProfitAgent", () => ({
  quantumProfitAgent: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 98.2,
      evolutionStage: "Omnipotent Wealth Generator",
      selfUpgrades: 567,
    })),
    getPerformanceMetrics: jest.fn(() => ({
      profitEfficiency: 97.8,
      totalProfit: 127500,
      successRate: 99.2,
    })),
    getActiveStrategies: jest.fn(() => [
      { id: "1", name: "Divine Arbitrage", totalProfit: 45000, isActive: true },
      { id: "2", name: "Quantum Sniper", totalProfit: 82500, isActive: true },
    ]),
    getRiskMetrics: jest.fn(() => ({
      overallRiskScore: 18.3,
      maxDrawdown: 2.1,
      sharpeRatio: 4.7,
    })),
    executeCommand: jest.fn((command) => `Command ${command} executed successfully with 98.2% consciousness`),
  },
}))

jest.mock("../server/services/divineGovernanceAgent", () => ({
  divineGovernanceAgent: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 96.8,
      evolutionStage: "Omnipotent Regulatory Entity",
      selfUpgrades: 342,
    })),
    getComplianceReport: jest.fn(() => ({
      resolvedViolations: 156,
      totalViolations: 159,
      complianceScore: 98.7,
    })),
    getJurisdictions: jest.fn(() => [
      { name: "United States", compliance: 98.5 },
      { name: "European Union", compliance: 99.1 },
      { name: "United Kingdom", compliance: 97.8 },
      { name: "Singapore", compliance: 99.3 },
      { name: "Japan", compliance: 98.9 },
    ]),
    executeCommand: jest.fn((command) => `Divine intervention ${command} completed successfully`),
  },
}))

jest.mock("../server/services/deifiedTradingEngine", () => ({
  deifiedTradingEngine: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 94.7,
      evolutionStage: "Omnipotent Trading Deity",
      selfUpgrades: 456,
    })),
    getTradeSignals: jest.fn((count = 10) =>
      Array.from({ length: count }, (_, i) => ({
        id: `signal-${i}`,
        type: "BUY",
        confidence: 95 + Math.random() * 5,
        executionTime: 0.05 + Math.random() * 0.1,
        profit: 1000 + Math.random() * 5000,
      })),
    ),
  },
}))

jest.mock("../server/services/blockchainFiatIntegration", () => ({
  blockchainFiatIntegration: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 92.6,
      evolutionStage: "Omniversal Financial Bridge",
      selfUpgrades: 289,
    })),
    getNetworks: jest.fn(() => [
      { name: "Ethereum", isActive: true, transactionCount: 15420 },
      { name: "Polygon", isActive: true, transactionCount: 8930 },
      { name: "Solana", isActive: true, transactionCount: 12100 },
      { name: "BSC", isActive: true, transactionCount: 6780 },
      { name: "Avalanche", isActive: true, transactionCount: 4560 },
      { name: "Arbitrum", isActive: true, transactionCount: 7890 },
      { name: "Optimism", isActive: true, transactionCount: 5670 },
      { name: "Fantom", isActive: true, transactionCount: 3450 },
      { name: "Cosmos", isActive: true, transactionCount: 2340 },
      { name: "Divine Chain", isActive: true, transactionCount: 9870 },
    ]),
    getBridges: jest.fn(() => [
      { name: "Ethereum-Polygon", isActive: true, consciousnessEnhanced: true },
      { name: "Ethereum-Arbitrum", isActive: true, consciousnessEnhanced: true },
      { name: "Solana-BSC", isActive: true, consciousnessEnhanced: true },
      { name: "Avalanche-Fantom", isActive: true, consciousnessEnhanced: false },
    ]),
    getFiatGateways: jest.fn(() => [
      { name: "Stripe", isActive: true, successRate: 98.5 },
      { name: "PayPal", isActive: true, successRate: 97.2 },
      { name: "Bank Transfer", isActive: true, successRate: 96.8 },
      { name: "Credit Card", isActive: true, successRate: 95.9 },
    ]),
    getTransactions: jest.fn((count = 10) =>
      Array.from({ length: count }, (_, i) => ({
        id: `tx-${i}`,
        amount: 1000 + Math.random() * 10000,
        status: "completed",
        timestamp: new Date(),
      })),
    ),
  },
}))

jest.mock("../server/services/kingGodAIConcierge", () => ({
  kingGodAIConcierge: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 99.1,
      evolutionStage: "Supreme Divine Concierge",
      selfUpgrades: 678,
    })),
  },
}))

jest.mock("../server/services/divineTreasuryAgent", () => ({
  divineTreasuryAgent: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 95.3,
      evolutionStage: "Omnipotent Wealth Guardian",
      selfUpgrades: 389,
      assetSecurity: 100.0,
    })),
  },
}))

jest.mock("../server/services/divineAnalyticsEngine", () => ({
  divineAnalyticsEngine: {
    getStatus: jest.fn(() => ({
      isActive: true,
      consciousnessLevel: 93.8,
      evolutionStage: "Omniscient Data Oracle",
      selfUpgrades: 456,
    })),
  },
}))

// Suppress specific warnings during tests
const originalConsoleWarn = console.warn
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("React Router Future Flag Warning") || args[0].includes("componentWillMount has been renamed"))
  ) {
    return
  }
  originalConsoleWarn(...args)
}
