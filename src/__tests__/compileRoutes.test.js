import compileRoutes from "../compileRoutes";

describe("compileRoutes", () => {
  it("should preserve arbitrary options", () => {
    const routes = compileRoutes([
      {
        path: "/bar/",
        name: "bar",
        page: "Bar",
        sitemapGenerator: () => {},
      },
      {
        path: "/baz/",
        name: "baz",
        page: "Baz",
      },
    ]);

    expect(typeof routes[0].sitemapGenerator).toEqual("function");
    expect(typeof routes[1].sitemapGenerator).toEqual("undefined");
  });
});
