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
};
