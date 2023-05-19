const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

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

describe("getURLsFromHTML", () => {
  it("should extract a single absolute URL", () => {
    const html = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path/">
          Boot.dev Blog
        </a>
      </body>
    </html>
    `;
    const actual = getURLsFromHTML(html, "https://blog.boot.dev/path");
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
  });
  it("should extract relative URLs", () => {
    const html = `
    <html>
      <body>
        <a href="/path/">
          Boot.dev Blog
        </a>
      </body>
    </html>
    `;
    const actual = getURLsFromHTML(html, "https://blog.boot.dev");
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
  });
  it("should extract multiple URLs (relative and absolute)", () => {
    const html = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path1/">
          Boot.dev Blog
        </a>
        <a href="/path2/">
          Boot.dev Blog
        </a>
      </body>
    </html>
    `;
    const actual = getURLsFromHTML(html, "https://blog.boot.dev")
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected);
  });
  it("should not include a bad URL", () => {
    const html = `
    <html>
      <body>
        <a href="invalid">
          Invalid URL
        </a>
      </body>
    </html>
    `;
    const actual = getURLsFromHTML(html, "https://blog.boot.dev")
    const expected = [];
    expect(actual).toEqual(expected);
  })
});
