import { parse } from "url";

import matchRoute from "./matchRoute";

/**
 * Given a URL, will return the Next page and query that matches
 */
export default function resolve(routes, requestUrl) {
  const { pathname: requestPath, query } = parse(requestUrl, true);

  if (routes.length === 0) {
    return null;
  }

  const matches = routes.reduce((acc, route) => {
    const params = matchRoute(route, requestPath);
    if (params) {
      acc.push({
        route,
        params,
      });
      return acc;
    }
    return acc;
  }, []);

  if (matches.length === 0) {
    return null;
  }

  const { route, params } = matches[0];

  return {
    page: route.page,
    query: { ...params, ...query },
  };
}
