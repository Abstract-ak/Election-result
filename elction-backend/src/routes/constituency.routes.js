const router = require("express").Router();
const prisma = require("../config/db");

// Create Constituency
router.post("/", async (req, res) => {
  try {
    const { name, state } = req.body;

    if (!name || !state) {
      return res.status(400).json({ message: "name and state are required" });
    }

    const constituency = await prisma.constituency.create({
      data: { name, state },
    });

    return res.json(constituency);
  } catch (error) {
    console.error("Create constituency failed:", error);
    return res.status(500).json({ message: "Failed to create constituency" });
  }
});

// Get All Constituencies
router.get("/", async (req, res) => {
  try {
    const constituencies = await prisma.constituency.findMany({
      include: { elections: true },
    });

    return res.json(constituencies);
  } catch (error) {
    console.error("Fetch constituencies failed:", error);
    return res.status(500).json({ message: "Failed to fetch constituencies" });
  }
});

// Get Constituency by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const constituency = await prisma.constituency.findUnique({
      where: { id: Number(id) },
      include: { elections: true },
    });

    if (!constituency) {
      return res.status(404).json({ message: "Constituency not found" });
    }

    return res.json(constituency);
  } catch (error) {
    console.error("Fetch constituency failed:", error);
    return res.status(500).json({ message: "Failed to fetch constituency" });
  }
});

module.exports = router;
