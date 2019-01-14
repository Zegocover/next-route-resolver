import pathToRegexp from "path-to-regexp";

import flattenRoutes from "./flattenRoutes";
import normalizePage from "./normalizePage";

/**
 * Given some route configuration, prepare them for use.
 */
export default function compileRoutes(routes) {
  return flattenRoutes(routes).map(route => {
    const keys = [];
    const matchPath = pathToRegexp(route.path, keys);
    const toPath = pathToRegexp.compile(route.path);
    const keyNames = keys.map(key => key.name);

    return {
      ...route,
      page: normalizePage(route.page),
      matchPath,
      toPath,
      keyNames,
      allKeyNames: [...keyNames, ...Object.keys(route.params || [])],
    };
  });
}
