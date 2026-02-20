const router = require("express").Router();
const prisma = require("../config/db");

router.get("/party-trend", async (req, res) => {
  try {
    const { type } = req.query;

    const data = await prisma.result.groupBy({
      by: ["electionId"],
      where: {
        election: { type },
      },
      _avg: {
        votePercentage: true,
      },
    });

    return res.json(data);
  } catch (error) {
    console.error("Fetch party trend failed:", error);
    return res.status(500).json({ message: "Failed to fetch party trend" });
  }
});

router.get("/winning-margin", async (req, res) => {
  try {
    const winners = await prisma.result.findMany({
      where: { rank: 1 },
      include: {
        election: true,
      },
      orderBy: {
        election: { year: "asc" },
      },
    });

    return res.json(winners);
  } catch (error) {
    console.error("Fetch winning margin failed:", error);
    return res.status(500).json({ message: "Failed to fetch winning margin" });
  }
});

module.exports = router;
const router = require("express").Router();
const prisma = require("../config/db");

// 1️⃣ Party-wise Trend (by type AE or GE)
router.get("/party-trend", async (req, res) => {
  try {
    const { type } = req.query;

    const data = await prisma.$queryRaw`
      SELECT e.year, p.name as party, SUM(r."votePercentage") as total_vote
      FROM "Result" r
      JOIN "Election" e ON r."electionId" = e.id
      JOIN "Candidate" c ON r."candidateId" = c.id
      JOIN "Party" p ON c."partyId" = p.id
      WHERE e.type = ${type}
      GROUP BY e.year, p.name
      ORDER BY e.year ASC
    `;

    return res.json(data);
  } catch (error) {
    console.error("Analytics failed:", error);
    return res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

// 2️⃣ Winning Margin Trend
router.get("/winning-margin", async (req, res) => {
  try {
    const data = await prisma.result.findMany({
      where: { rank: 1 },
      include: { election: true },
      orderBy: { election: { year: "asc" } },
    });

    return res.json(data);
  } catch (error) {
    console.error("Margin trend failed:", error);
    return res.status(500).json({ message: "Failed to fetch margin trend" });
  }
});

module.exports = router;
