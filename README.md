# Based on the Example Below with the following flow

### if req has cookie
- use sessionId to get token from db in getInitialProps
- use token to get playlists from soundsort api

### if req does not have cookie
- redirect to login

### if user clicks login
- and clicks authorise
- spotify sends call back to api/callback
- api/callback generates sessionId
- saves sessionId in cookie
- saves sessionId and token in db
- redirects to select

---
# API routes with middleware

Next.js ships with [API routes](https://github.com/zeit/next.js#api-routes), which provide an easy solution to build your own `API`. This example shows how to implement simple `middleware` to wrap around your `API` endpoints.

## Deploy your own

Deploy the example using [ZEIT Now](https://zeit.co/now):

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/zeit/next.js/tree/canary/examples/api-routes-middleware)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example api-routes-middleware api-routes-middleware-app
# or
yarn create next-app --example api-routes-middleware api-routes-middleware-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/api-routes-middleware
cd api-routes-middleware
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [ZEIT Now](https://zeit.co/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
