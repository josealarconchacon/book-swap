require("dotenv").config();
const express = require("express");
const cors = require("cors");
const metadataRoutes = require("./src/routes/metadataRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", metadataRoutes);

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
