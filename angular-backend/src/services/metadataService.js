const axios = require("axios");
const bookSchema = require("./bookSchema");
const extractTitleFromUrl = require("../utils/extractTitle");

const axiosInstance = axios.create({
  timeout: 5000, // Set timeout to prevent freezing
});

async function fetchMetadata(url) {
  if (!url) throw new Error("Missing URL parameter");

  console.log(`🔍 Fetching metadata for URL: ${url}`);
  let metadata = null;

  // Try jsonlink.io (Open Graph Metadata)
  metadata = await fetchFromJsonlink(url);

  // Try Microlink.io if jsonlink.io fails
  if (!metadata) metadata = await fetchFromMicrolink(url);

  // Try Google Books API if all else fails
  if (!metadata) metadata = await fetchFromGoogleBooks(url);

  if (!metadata) throw new Error("No book data found from any source.");

  // Validate book data
  const { error } = bookSchema.validate(metadata);
  if (error) throw new Error(`Invalid book data: ${error.details[0].message}`);

  return metadata;
}

async function fetchFromJsonlink(url) {
  try {
    const response = await axiosInstance.get(
      `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`
    );
    if (response.data?.title) {
      return {
        title: response.data.title || "Unknown Title",
        author: response.data.author || "Unknown Author",
        image: response.data.images?.[0] || "",
        source: "jsonlink.io",
      };
    }
  } catch (error) {
    console.warn("⚠️ jsonlink.io failed:", error.message);
  }
  return null;
}

async function fetchFromMicrolink(url) {
  try {
    const response = await axiosInstance.get(
      `https://api.microlink.io/?url=${encodeURIComponent(
        url
      )}&filter=title,author,image`
    );
    if (response.data?.data) {
      return {
        title: response.data.data.title || "Unknown Title",
        author: response.data.data.author || "Unknown Author",
        image: response.data.data.image?.url || "",
        source: "Microlink.io",
      };
    }
  } catch (error) {
    console.warn("⚠️ Microlink.io failed:", error.message);
  }
  return null;
}

async function fetchFromGoogleBooks(url) {
  const extractedTitle = extractTitleFromUrl(url);
  if (!extractedTitle) return null;

  try {
    console.log(`🔍 Extracted Title: ${extractedTitle}`);
    const response = await axiosInstance.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        extractedTitle
      )}`
    );
    if (response.data.items?.length > 0) {
      const bookInfo = response.data.items[0].volumeInfo;
      return {
        title: bookInfo.title || "Unknown Title",
        author: bookInfo.authors?.join(", ") || "Unknown Author",
        image: bookInfo.imageLinks?.thumbnail || "",
        source: "Google Books API",
      };
    }
  } catch (error) {
    console.warn("⚠️ Google Books API failed:", error.message);
  }
  return null;
}

module.exports = fetchMetadata;
