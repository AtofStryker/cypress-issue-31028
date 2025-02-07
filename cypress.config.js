const { defineConfig } = require("cypress");
const _ = require('lodash')

const pages = {
  'https://github.com' : {
    a: '/cypress-io/cypress',
  },
  'https://example.cypress.io' : {
    a: '/commands/viewport',
  },
  'https://www.electronjs.org' : {
    a: '/docs/latest/api/app',
  }
}

const baseUrls = Object.keys(pages)

let previousRandomBaseUrl = null

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    // NOTE: reload problem does not occur when injecting document.domain for urls of same superdomain
    injectDocumentDomain: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        getTestUrl() {
          if(previousRandomBaseUrl === null){
            previousRandomBaseUrl = _.random(2)
          }

          return baseUrls[previousRandomBaseUrl]
        },
        resetTestUrl() {
          previousRandomBaseUrl = null

          return null
        },
      })
    },
  },
});
