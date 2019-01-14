import resolve from "../resolve";
import compileRoutes from "../compileRoutes";

describe("resolve", () => {
  it("should return null when routes are empty", () => {
    expect(resolve([], "/foo/")).toEqual(null);
  });

  it("should return null when there isn't a match", () => {
    const routes = compileRoutes([
      {
        path: "/bar/",
        name: "bar",
        page: "Bar",
      },
      {
        path: "/baz/",
        name: "baz",
        page: "Baz",
      },
    ]);

    expect(resolve(routes, "/foo/")).toEqual(null);
  });

  it("should return params for simple matches", () => {
    const routes = compileRoutes([
      {
        path: "/bar/",
        name: "bar",
        page: "Bar",
      },
      {
        path: "/foo/",
        name: "foo",
        page: "Foo",
      },
    ]);

    expect(resolve(routes, "/foo/")).toEqual({
      page: "/Foo",
      query: {},
    });
  });

  it("returned params should include any explicit params", () => {
    const routes = compileRoutes([
      {
        path: "/foo/",
        name: "foo",
        page: "Foo",
        params: { country: "gb", language: "en" },
      },
    ]);

    expect(resolve(routes, "/foo/")).toEqual({
      page: "/Foo",
      query: { country: "gb", language: "en" },
    });
  });

  it("should match parameterised segments", () => {
    const routes = compileRoutes([
      {
        path: "/:slug/",
        name: "foo",
        page: "Foo",
        params: { country: "gb", language: "en" },
      },
    ]);

    expect(resolve(routes, "/foo/")).toEqual({
      page: "/Foo",
      query: { country: "gb", language: "en", slug: "foo" },
    });
  });

  it("routes defined first take precedence", () => {
    const routes = compileRoutes([
      {
        path: "/foo/",
        name: "foo",
        page: "Foo",
      },
      {
        path: "/:slug/",
        name: "bar",
        page: "Bar",
      },
    ]);

    expect(resolve(routes, "/foo/")).toEqual({
      page: "/Foo",
      query: {},
    });
  });

  it("query strings are added to return query", () => {
    const routes = compileRoutes([
      {
        path: "/:slug/",
        name: "foo",
        page: "Foo",
      },
    ]);

    expect(resolve(routes, "/foo/?bar=baz")).toEqual({
      page: "/Foo",
      query: { slug: "foo", bar: "baz" },
    });
  });

  it("repeated query strings are turned to arrays", () => {
    const routes = compileRoutes([
      {
        path: "/foo/",
        name: "foo",
        page: "Foo",
      },
    ]);

    expect(resolve(routes, "/foo/?bar=baz&bar=buzz")).toEqual({
      page: "/Foo",
      query: { bar: ["baz", "buzz"] },
    });
  });
});
