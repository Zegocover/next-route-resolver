# next-route-resolver

## Declarative route definition for Next.js

Allows you to define the routes for your Next.js website, to decouple them from the pages folder convention. The API is partly inspired by Django's URL configuration.

### Motivation

1. The default Next.js convention of mapping folder structures to URLs didn't fit our mental model of how websites should be structured.
2. The facility for "masking" routes to bypass the pages convention is functional, but is lacking in the necessary abstractions to make it ergonomic.
3. Existing solutions such as `next-routes` partially solve the problem, but use a chainable API that can be hard to compose and enable more advanced functionality.

### Installation

```
npm install next-route-resolver
```

or

```
yarn add next-route-resolver
```

### Basic usage

#### Define some routes

```
import { compileRoutes } from "next-route-resolver";

const routes = compileRoutes([
  {
    path: "/",
    name: "homepage",
    page: "Homepage",
  },
  {
    path: "/posts/",
    name: "blog-index",
    page: "BlogIndex",
  },
  {
    path: "/posts/:slug/",
    name: "blog-post",
    page: "BlogPost",
  },
]);
```

#### Resolving URLs to a page and query

The returned object from the `resolve` function can be used to tell Next.js what page to render. You'll most likely use this as part of a request handler in your server code.

```javascript
import { resolve } from "next-route-resolver";

import routes from "./routes";

resolve(routes, "/posts/my-first-blog-post/");
// { page: "./BlogPost", query: { slug: "my-first-blog-post"}}
```

### Creating Link configuration

You'll also want to be able to create links to pages within your app. We've provided a function that will return necessary parameters for use with the `Link`
component as well as the imperative API.

```javascript
import { reverse } from "next-route-resolver";

import routes from "./routes";

reverse(routes, "blog-post", { slug: "my-first-blog-post" });
// { as: "/posts/my-first-blog-post/", href: { pathname: "/BlogPost", query: { slug: "my-first-blog-post" }}}
```

### Includes and nesting

TODO
