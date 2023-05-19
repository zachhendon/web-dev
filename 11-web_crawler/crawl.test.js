const { normalizeURL } = require("./crawl.js");

describe("normalizeURL", () => {
  it("should strip protocol", () => {
    actual = normalizeURL("https://blog.boot.dev/path");
    expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });
  it("should strip the trailing slash", () => {
    actual = normalizeURL("https://blog.boot.dev/path/");
    expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });
  it("should make capitals lowercase", () => {
    actual = normalizeURL("https://BLOG.boot.DEV/path");
    expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });
  it("should strip http", () => {
    actual = normalizeURL("http://blog.boot.dev/path");
    expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });
});
