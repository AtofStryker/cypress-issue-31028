## Setup

* `npm install`
* `npx cypress open`

## Issue

Even in open mode with a random `baseUrl`, Cypress gets into a reload loop that can be some arbitrary `N` times (I've seen as many as 10 and as low as 2). `injectDocumentDomain` set to `true` doesn't have this problem.

![](./reload-issue.mp4)

This is happening because a dynamic baseUrl is set and the test attempts to run, but cypress detects an origin change and therefor needs to reload top, along with the spec frame and the AUT frame. This means that the state is completely wiped out in the spec. The spec then tries to get another url for the baseUrl and unless they coincidentally happen to be the same, the test will infinitely reload until out of testing urls/pools. This does NOT happen with `injectDocumentDomain` set to `true` because the spec is not required to be reloaded because the superdomains match. However, if you write this test with baseUrls that are cross-site / cross-origin, the problem persists even pre Cypress 14.

## Solution

Since this really isn't something Cypress can fundamentally change since we need to do the reload in order for Cypress to work, the end user needs to change how state is being stored/set. One way to do this is with `cy.task()`, where the testing url can be calculated and saved within the node context and not the spec. This can be seen in the `loop-issue-cross-site` test.