import reverse from "../reverse";
import compileRoutes from "../compileRoutes";

describe("reverse", () => {
  it("should return null when routes are empty", () => {
    expect(reverse([], "foo")).toEqual(null);
  });

  it("should return null when there isn't a match", () => {
    const routes = compileRoutes([
      {
        path: "/bar/",
        name: "bar",
        page: "Bar",
      },
    ]);

    expect(reverse(routes, "foo")).toEqual(null);
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

    expect(reverse(routes, "foo")).toEqual({
      as: "/foo/",
      href: {
        pathname: "/Foo",
        query: {},
      },
    });
  });

  it("should return params for parameterised URLs", () => {
    const routes = compileRoutes([
      {
        path: "/:slug/",
        name: "foo",
        page: "Foo",
      },
    ]);

    expect(reverse(routes, "foo", { slug: "foo" })).toEqual({
      as: "/foo/",
      href: {
        pathname: "/Foo",
        query: { slug: "foo" },
      },
    });
  });

  it("should return the correct match if multiple routes have the same name", () => {
    const routes = compileRoutes([
      {
        path: "/fake-foo/",
        name: "foo",
        page: "FakeFoo",
      },
      {
        path: "/:slug/",
        name: "foo",
        page: "Foo",
      },
      {
        path: "/:slug/:another-slug/",
        name: "foo",
        page: "FooChild",
      },
    ]);

    expect(reverse(routes, "foo", { slug: "foo" })).toEqual({
      as: "/foo/",
      href: {
        pathname: "/Foo",
        query: { slug: "foo" },
      },
    });
  });

  it("should return the correct match if multiple routes have the same name and use explicit params", () => {
    const routes = compileRoutes([
      {
        path: "/fake-foo/",
        name: "foo",
        page: "FakeFoo",
      },
      {
        path: "/foo/",
        name: "foo",
        page: "Foo",
        params: { slug: "foo" },
      },
    ]);

    expect(reverse(routes, "foo", { slug: "foo" })).toEqual({
      as: "/foo/",
      href: {
        pathname: "/Foo",
        query: { slug: "foo" },
      },
    });
  });

  it("should include unused params in visible query string", () => {
    const routes = compileRoutes([
      {
        path: "/foo/",
        name: "foo",
        page: "Foo",
      },
    ]);

    expect(reverse(routes, "foo", { x: "y" })).toEqual({
      as: "/foo/?x=y",
      href: {
        pathname: "/Foo",
        query: { x: "y" },
      },
    });
  });
});
