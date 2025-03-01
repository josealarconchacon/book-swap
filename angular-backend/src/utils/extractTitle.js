function extractTitleFromUrl(url) {
  try {
    const match = url.match(/\/item\/([^\/]+)/);
    if (match) {
      return decodeURIComponent(match[1]).replace(/[-_]/g, " ");
    }
  } catch (error) {
    console.error("⚠️ Title extraction failed:", error.message);
  }
  return null;
}

module.exports = extractTitleFromUrl;
