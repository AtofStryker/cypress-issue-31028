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
  
  Cypress.Commands.add("getRandomBaseUrl", () => { 
    if(previousRandomBaseUrl === null) {
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
   * this test will always have the reload issue since state is stored in the spec and the spec WILL
   * reload unless the the url from the previous url coincidentally matches the new url
   */
  it("tests page A", () => {
    const url = baseUrls[previousRandomBaseUrl] + pages[baseUrls[previousRandomBaseUrl]].a
    cy.visit(url);
  });
  
  it("tests page B", () => {
    cy.visit(pages[baseUrls[previousRandomBaseUrl]].b);
  });