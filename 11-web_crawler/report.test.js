const { normalizeURL, getURLsFromHTML } = require("./report.js");
const { sortPages } = require("./report.js");

describe("sortPages", () => {
  it("should sort 2 pages", () => {
    const actual = sortPages({
      "https://wagslane.dev/path": 1,
      "https://wagslane.dev": 3,
    });
    const expected = [
      ["https://wagslane.dev", 3],
      ["https://wagslane.dev/path", 1],
    ];
    expect(actual).toEqual(expected);
  });
  it("should sort 5 pages", () => {
    const actual = sortPages({
      "https://wagslane.dev/path": 2,
      "https://wagslane.dev": 3,
      "https://wagslane.dev/path2": 7,
      "https://wagslane.dev/path3": 1,
      "https://wagslane.dev/path4": 12,
    });
    const expected = [
      ["https://wagslane.dev/path4", 12],
      ["https://wagslane.dev/path2", 7],
      ["https://wagslane.dev", 3],
      ["https://wagslane.dev/path", 2],
      ["https://wagslane.dev/path3", 1],
    ];
    expect(actual).toEqual(expected);
  });
});
