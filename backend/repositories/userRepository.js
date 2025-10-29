const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function findByEmail(email) { return prisma.user.findUnique({ where: { email } }); }
async function create(user) { return prisma.user.create({ data: user }); }
module.exports = { findByEmail, create };
