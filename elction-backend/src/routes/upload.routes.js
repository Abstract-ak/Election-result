const router = require("express").Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const prisma = require("../config/db");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      return res.json({
        message: "CSV received",
        rows: results.length,
      });
    });
});

module.exports = router;
