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

#### Creating Link configuration

You'll also want to be able to create links to pages within your app. We've provided a function that will return necessary parameters for use with the `Link`
component as well as the imperative API.

```javascript
import { reverse } from "next-route-resolver";

import routes from "./routes";

reverse(routes, "blog-post", { slug: "my-first-blog-post" });
// { as: "/posts/my-first-blog-post/", href: { pathname: "/BlogPost", query: { slug: "my-first-blog-post" }}}
```

#### Includes

If your routes are getting too long and unweirdly, you can split them up.

```javascript
import { compileRoutes, include } from "next-route-resolver";

const blogRoutes = [
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
];

const routes = compileRoutes([
  include({ routes: blogRoutes }),
  {
    path: "/",
    name: "homepage",
    page: "Homepage",
  },
]);
```

You can also add a prefix to paths to make included routes more portable.

```javascript
import { compileRoutes, include } from "next-route-resolver";

const blogRoutes = [
  {
    path: "/",
    name: "blog-index",
    page: "BlogIndex",
  },
  {
    path: "/:slug/",
    name: "blog-post",
    page: "BlogPost",
  },
];

const routes = compileRoutes([
  include({ routes: blogRoutes, prefix: "/posts/" }),
  {
    path: "/",
    name: "homepage",
    page: "Homepage",
  },
]);
```

#### Contextual includes

Let's say you want to make regional variants of your website. Perhaps under path
prefixes such as `/us/` and `/es/`. It's likely that you'll have some
pages that are unique to each country, and some that are shared (but translated).

You could configure your routes as follows:

```javascript
import { compileRoutes, include } from "next-route-resolver";

const usRoutes = [
  {
    path: "/contact-us/",
    name: "contact-us",
    page: "Contact",
  },
  {
    path: "/",
    name: "homepage",
    page: "HomepageUs",
  },
];

const esRoutes = [
  {
    path: "/contacto/",
    name: "contact-us",
    page: "Contact",
  },
  {
    path: "/",
    name: "homepage",
    page: "HomepageEs",
  },
];

const routes = compileRoutes([
  include({ routes: usRoutes, prefix: "/us/", params: { country: "us" } }),
  include({ routes: esRoutes, prefix: "/es/", params: { country: "es" } }),
]);
```

Now resolving and reversing are aware of the country parameter.

```javascript
resolve(routes, "/us/");
// { page: "./HomepageUs", query: { country: "us"}}

reverse(routes, "homepage", { country: "us" });
// { as: "/us/", href: { pathname: "/HomepageUs", query: { country: "us" }}}

resolve(routes, "/es/contacto/");
// { page: "./Contact", query: { country: "es"}}

reverse(routes, "contact-us", { country: "es" });
// { as: "/es/contacto/", href: { pathname: "/Contact", query: { country: "es" }}}
```

#### Nesting parameters

Perhaps with the previous example, you want the US website to be the default
rather than be scoped under a `/us/` path. This is possible, because any parameters
defined with `include` will override the same name parameters from higher up. So
you could define your routes like this:

```javascript
import { compileRoutes, include } from "next-route-resolver";

const usRoutes = [
  {
    path: "/contact-us/",
    name: "contact-us",
    page: "Contact",
  },
  {
    path: "/",
    name: "homepage",
    page: "HomepageUs",
  },
];

const esRoutes = [
  {
    path: "/contacto/",
    name: "contact-us",
    page: "Contact",
  },
  {
    path: "/",
    name: "homepage",
    page: "HomepageEs",
  },
];

const routes = compileRoutes(
  include({
    routes: [
      include({ routes: usRoutes }),
      include({ routes: esRoutes, prefix: "/es/", params: { country: "es" } }),
    ],
    params: { country: "us" },
  }),
);
```

You'd now be able to resolve and reverse like this:

```javascript
resolve(routes, "/");
// { page: "./HomepageUs", query: { country: "us"}}

reverse(routes, "homepage", { country: "us" });
// { as: "/", href: { pathname: "/HomepageUs", query: { country: "us" }}}

resolve(routes, "/es/contacto/");
// { page: "./Contact", query: { country: "es"}}

reverse(routes, "contact-us", { country: "es" });
// { as: "/es/contacto/", href: { pathname: "/Contact", query: { country: "es" }}}
```
