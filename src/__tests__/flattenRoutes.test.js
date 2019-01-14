import flattenRoutes from "../flattenRoutes";

describe("flattenRoutes", () => {
  it("flattens nested arrays", () => {
    const input = [
      [
        {
          path: "/",
          name: "homepage",
          page: "Homepage",
        },
      ],
      [
        [
          {
            path: "/es/",
            name: "homepage",
            page: "Homepage",
          },
        ],
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

    expect(flattenRoutes(input)).toEqual(expected);
  });

  it("should do nothing to already flattened routes", () => {
    const input = [
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

    expect(flattenRoutes(flattenRoutes(input))).toEqual(flattenRoutes(input));
  });
});
