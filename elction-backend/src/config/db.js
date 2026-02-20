const { PrismaClient } = require("@prisma/client");

let prisma;

// Prevent multiple instances during development (hot reload issue)
if (process.env.NODE_ENV === "development") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
