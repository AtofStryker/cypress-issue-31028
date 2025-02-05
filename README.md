## Setup

* `npm install`
* `npx cypress open`

## Issue

Even in open mode with a random `baseUrl`, Cypress gets into a reload loop that can be some arbitrary `N` times (I've seen as many as 10 and as low as 2). `injectDocumentDomain` set to `true` doesn't have this problem.

![](./reload-issue.mp4)