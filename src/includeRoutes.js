import urlJoin from "url-join";

import flattenRoutes from "./flattenRoutes";

export default function includeRoutes({ routes = [], prefix, params } = {}) {
  const flattenedRoutes = flattenRoutes(routes);

  return flattenedRoutes.map(({ path, params: routeParams, ...other }) => ({
    path: prefix ? urlJoin(prefix, path) : path,
    ...other,
    ...(routeParams || params
      ? { params: { ...params, ...routeParams } }
      : {}),
  }));
}
