import includeRoutes from "../includeRoutes";

describe("includeRoutes", () => {
  it("should return flattened version of provided routes", () => {
    const routes = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
      },
      [
        {
          path: "/es/",
          name: "homepage",
          page: "Homepage",
        },
      ],
    ];

    const expected = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
      },
      {
        path: "/es/",
        name: "homepage",
        page: "Homepage",
      },
    ];

    expect(includeRoutes({ routes })).toEqual(expected);
  });

  it("should add provided params to all included routes", () => {
    const routes = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
      },
    ];

    const expected = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
        params: { foo: "foo", bar: "bar" },
      },
    ];

    expect(
      includeRoutes({ routes, params: { foo: "foo", bar: "bar" } }),
    ).toEqual(expected);
  });

  it("should add allow route params to override included params", () => {
    const routes = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
        params: { foo: "overridden" },
      },
    ];

    const expected = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
        params: { foo: "overridden", bar: "bar" },
      },
    ];

    expect(
      includeRoutes({ routes, params: { foo: "foo", bar: "bar" } }),
    ).toEqual(expected);
  });

  it("should add allow prefixing of included route paths", () => {
    const routes = [
      {
        path: "/",
        name: "homepage",
        page: "Homepage",
        params: { foo: "overridden" },
      },
    ];

    const expected = [
      {
        path: "/es/",
        name: "homepage",
        page: "Homepage",
        params: { foo: "overridden", bar: "bar" },
      },
    ];

    expect(
      includeRoutes({
        routes,
        prefix: "/es/",
        params: { foo: "foo", bar: "bar" },
      }),
    ).toEqual(expected);
  });
});
