import { parse } from "url";

import resolve from "./resolve";

export default function getRequestHandlerForRoutes(
  routes,
  app,
  customHandler,
) {
  const nextHandler = app.getRequestHandler();

  return (req, res) => {
    const params = resolve(routes, req.url);

    if (!params) {
      nextHandler(req, res, parse(req.url));
      return;
    }

    const { page, query } = params;

    if (page) {
      if (customHandler) {
        customHandler({ req, res, page, query });
      } else {
        app.render(req, res, page, query);
      }
    } else {
      nextHandler(req, res, parse(req.url));
    }
  };
}
