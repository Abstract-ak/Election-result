const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/elections", require("./routes/election.routes"));
// app.use("/api/results", require("./routes/result.routes"));
// app.use("/api/analytics", require("./routes/analytics.routes"));
// app.use("/api/upload", require("./routes/upload.routes"));

module.exports = app;
