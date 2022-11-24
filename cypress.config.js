const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    broser: 'chrome',
    baseUrl: 'https://marvel-qa-cademy.herokuapp.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
  },
});
