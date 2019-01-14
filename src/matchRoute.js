export default function matchRoute(route, requestPath) {
  const values = route.matchPath.exec(requestPath);

  if (!values) {
    return null;
  }

  return values.slice(1).reduce(
    (params, val, i) => {
      if (val === undefined) return params;

      return {
        ...params,
        ...{
          [route.keyNames[i]]: decodeURIComponent(val),
        },
      };
    },
    { ...route.params },
  );
}
