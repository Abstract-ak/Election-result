const router = require("express").Router();
const prisma = require("../config/db");

// Create Candidate
router.post("/", async (req, res) => {
  try {
    const { name, partyId } = req.body;

    if (!name || !partyId) {
      return res.status(400).json({ message: "name and partyId are required" });
    }

    const candidate = await prisma.candidate.create({
      data: {
        name,
        partyId: Number(partyId),
      },
    });

    return res.json(candidate);
  } catch (error) {
    console.error("Create candidate failed:", error);
    return res.status(500).json({ message: "Failed to create candidate" });
  }
});

// Get All Candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: { party: true, results: true },
    });

    return res.json(candidates);
  } catch (error) {
    console.error("Fetch candidates failed:", error);
    return res.status(500).json({ message: "Failed to fetch candidates" });
  }
});

// Get Candidates by Party
router.get("/party/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;

    const candidates = await prisma.candidate.findMany({
      where: { partyId: Number(partyId) },
      include: { party: true },
    });

    return res.json(candidates);
  } catch (error) {
    console.error("Fetch candidates failed:", error);
    return res.status(500).json({ message: "Failed to fetch candidates" });
  }
});

module.exports = router;
