const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative URL
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Invalid relative url: ${err.message}`);
      }
    } else {
      // absolute URL
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Invalid absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let urlNorm = `${urlObj.host}${urlObj.pathname}`;
  if (urlNorm.length > 0 && urlNorm.slice(-1) === "/") {
    return urlNorm.slice(0, -1);
  }
  return urlNorm;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
