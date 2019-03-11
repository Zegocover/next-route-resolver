import { every, isEqual, sortBy } from "lodash";

import normalizePage from "./normalizePage";

const isSubset = (candidate, test) =>
  every(candidate, (val, key) => isEqual(val, test[key]));

/**
 * Given a view name and params, will return both the Next route params and the
 * display URL
 */
export default function reverse(routes, name, params = {}) {
  if (routes.length === 0) {
    return null;
  }

  /*
   * For a match to occur, every dynamic parameter in the path must be supplied.
   * Additionally, we sort so that the routes with the *most* dynamic parameters
   * take priority, so that a more specific match wins over a generic one.
   */
  const candidateRoutes = sortBy(
    routes.filter(
      route =>
        route.name === name &&
        route.allKeyNames.every(keyName =>
          Object.keys(params).includes(keyName),
        ) &&
        isSubset(route.params, params),
    ),
    route => -route.allKeyNames.length,
  );

  if (candidateRoutes.length === 0) {
    return null;
  }

  const route = candidateRoutes[0];

  let path = route.toPath(params);

  const anonymousParams = Object.keys(params).reduce((acc, key) => {
    if (!route.allKeyNames.includes(key)) {
      acc[key] = params[key];
    }
    return acc;
  }, {});

  if (Object.keys(anonymousParams).length > 0) {
    path = `${path}?${new URLSearchParams(anonymousParams).toString()}`;
  }

  return {
    as: path,
    href: {
      pathname: normalizePage(route.page),
      query: { ...route.params, ...params },
    },
  };
}
