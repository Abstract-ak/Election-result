const router = require("express").Router();
const prisma = require("../config/db");

// Create Election
router.post("/", async (req, res) => {
  try {
    const { year, type, constituencyId } = req.body;

    if (!year || !type || !constituencyId) {
      return res
        .status(400)
        .json({ message: "year, type, and constituencyId are required" });
    }

    const election = await prisma.election.create({
      data: {
        year: Number(year),
        type,
        constituencyId: Number(constituencyId),
      },
    });

    return res.json(election);
  } catch (error) {
    console.error("Create election failed:", error);
    return res.status(500).json({ message: "Failed to create election" });
  }
});

// Get All Elections
router.get("/", async (req, res) => {
  try {
    const elections = await prisma.election.findMany({
      include: { constituency: true },
    });

    return res.json(elections);
  } catch (error) {
    console.error("Fetch elections failed:", error);
    return res.status(500).json({ message: "Failed to fetch elections" });
  }
});

module.exports = router;
