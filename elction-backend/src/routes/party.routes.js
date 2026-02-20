const router = require("express").Router();
const prisma = require("../config/db");

// Create Party
router.post("/", async (req, res) => {
  try {
    const { name, colorCode } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const party = await prisma.party.create({
      data: { name, colorCode },
    });

    return res.json(party);
  } catch (error) {
    console.error("Create party failed:", error);
    return res.status(500).json({ message: "Failed to create party" });
  }
});

// Get All Parties
router.get("/", async (req, res) => {
  try {
    const parties = await prisma.party.findMany({
      include: { candidates: true },
    });

    return res.json(parties);
  } catch (error) {
    console.error("Fetch parties failed:", error);
    return res.status(500).json({ message: "Failed to fetch parties" });
  }
});

module.exports = router;
