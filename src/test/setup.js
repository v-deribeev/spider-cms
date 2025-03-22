import { vi } from 'vitest' // or use `jest` depending on your setup

// import { useI18n, createI18n } from 'vue-i18n'
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key,
  }),
}))
vi.mock('vue-i18n', () => ({
  useI18n: vi.fn(() => ({
    t: (key) => key, // Mock `t` function to return the key
    // You can add other methods like `te`, `tm` as needed
  })),
  createI18n: vi.fn(() => ({
    global: {
      t: (key) => key, // Mock global `t` method
    },
  })),
}))
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  globals: { useHead: () => ({}) },
  setupFiles: ['<rootDir>/tests/unit/setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^quasar$': 'quasar/dist/quasar.esm.prod.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!quasar|vue-router)'],
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)', '**/__tests__/*.spec.(js|jsx|ts|tsx)'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,vue}',
    '!**/*.cy.{js,jsx,ts,vue}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
}
