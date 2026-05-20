const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.HOST_NAME || 'https://aajamusic.com',
  },
})
