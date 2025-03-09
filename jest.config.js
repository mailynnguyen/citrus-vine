/** @type {import('jest').Config} */
const nextJest = require('next/jest')
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
      '@/(.*)': '<rootDir>/src/$1',
    },
  };
  
module.exports = config;