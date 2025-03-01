const express = require("express");
const fetchMetadata = require("../services/metadataService");

const router = express.Router();

router.get("/fetch-metadata", async (req, res) => {
  try {
    const metadata = await fetchMetadata(req.query.url);
    res.json(metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
