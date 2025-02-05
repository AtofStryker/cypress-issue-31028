const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    // NOTE: reload problem does not occur when injecting document.domain
    // injectDocumentDomain: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
