const { defineConfig } = require('@playwright/test')
require('dotenv').config()

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.HOST_NAME || 'https://aajamusic.com',
  },
})
