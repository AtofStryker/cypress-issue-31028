const pages = {
  "https://github.com": {
    a: "/cypress-io/cypress",
  },
  "https://example.cypress.io": {
    a: "/commands/viewport",
  },
  "https://www.electronjs.org": {
    a: "/docs/latest/api/app",
  },
};

let testingUrl = "";
before(() => {
  cy.task("getTestUrl").then((url) => {
    testingUrl = url;
  });
});

after(() => {
  cy.task("resetTestUrl");
});

  
/**
 * this test will NOT run into the issue as the state is stored in `cy.task()`
 */
it("tests page A", () => {
  const url = testingUrl + pages[testingUrl].a;
  cy.visit(url);
});
