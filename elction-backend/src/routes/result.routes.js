const router = require("express").Router();
const prisma = require("../config/db");

// Create Result
router.post("/", async (req, res) => {
  try {
    const {
      electionId,
      candidateName,
      partyName,
      votes,
      votePercentage,
      marginPercentage,
      rank,
    } = req.body;

    if (
      !electionId ||
      !candidateName ||
      !partyName ||
      votes == null ||
      votePercentage == null ||
      marginPercentage == null ||
      rank == null
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 1️⃣ Find or create party
    let party = await prisma.party.findUnique({
      where: { name: partyName },
    });

    if (!party) {
      party = await prisma.party.create({
        data: { name: partyName },
      });
    }

    // 2️⃣ Create candidate
    const candidate = await prisma.candidate.create({
      data: {
        name: candidateName,
        partyId: party.id,
      },
    });

    // 3️⃣ Create result
    const result = await prisma.result.create({
      data: {
        electionId: Number(electionId),
        candidateId: candidate.id,
        votes: Number(votes),
        votePercentage: Number(votePercentage),
        marginPercentage: Number(marginPercentage),
        rank: Number(rank),
      },
    });

    return res.json(result);
  } catch (error) {
    console.error("Create result failed:", error);
    return res.status(500).json({ message: "Failed to create result" });
  }
});

// Get Results by Election
router.get("/election/:electionId", async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      where: {
        electionId: Number(req.params.electionId),
      },
      include: {
        candidate: {
          include: {
            party: true,
          },
        },
      },
    });

    return res.json(results);
  } catch (error) {
    console.error("Fetch results failed:", error);
    return res.status(500).json({ message: "Failed to fetch results" });
  }
});

// Delete Result
router.delete("/:id", async (req, res) => {
  try {
    await prisma.result.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Delete result failed:", error);
    return res.status(500).json({ message: "Failed to delete result" });
  }
});

module.exports = router;
