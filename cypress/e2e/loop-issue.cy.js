const pages = {
  'https://docs.cypress.io' : {
    a: '/app/get-started/why-cypress',
    b: '/app/references/changelog'
  },
  'https://example.cypress.io' : {
    a: '/commands/viewport',
    b: '/cypress-api'
  },
  'https://www.cypress.io/' : {
    a: '/blog',
    b: '/pricing'
  }
}
const baseUrls = Object.keys(pages)

let previousRandomBaseUrl = null

Cypress.Commands.add("getRandomBaseUrl", () => { 
  if(previousRandomBaseUrl === null){
    // get a random number between 0 and 2
    previousRandomBaseUrl = Cypress._.random(2)
  } else {
    // can't be the previous number as we need a new baseUrl each time
    let randomNum = Cypress._.random(2)
    while (randomNum !== previousRandomBaseUrl){
      randomNum = Cypress._.random(2)
    }
  }

  Cypress.config("baseUrl", baseUrls[previousRandomBaseUrl] )
  Cypress.log({ name: "getAccount" })
})

before(() => {
  cy.getRandomBaseUrl();
});

/**
 * tests only run into the issue when injectDocumentDomain is set to true
 */
it("tests page A", () => {
  cy.visit(baseUrls[previousRandomBaseUrl] + pages[baseUrls[previousRandomBaseUrl]].a);
});

it("tests page B", () => {
  cy.visit(pages[baseUrls[previousRandomBaseUrl]].b);
});