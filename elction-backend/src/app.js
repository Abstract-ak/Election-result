const express = require("express");
const cors = require("cors");

const app = express();

// --------------------
// Global Middlewares
// --------------------
app.use(cors());
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// --------------------
// Health Check
// --------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// --------------------
// Routes
// --------------------
app.use("/api/constituencies", require("./routes/constituency.routes"));
app.use("/api/parties", require("./routes/party.routes"));
app.use("/api/candidates", require("./routes/candidate.routes"));
app.use("/api/elections", require("./routes/election.routes"));
app.use("/api/results", require("./routes/result.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
