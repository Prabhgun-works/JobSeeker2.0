const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllUsers() {
  return prisma.user.findMany();
}

async function createUser(data) {
  return prisma.user.create({ data });
}

module.exports = { getAllUsers, createUser };