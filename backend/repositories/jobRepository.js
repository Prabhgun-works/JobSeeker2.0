const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function create(job) { return prisma.job.create({ data: job }); }
async function findAll() { return prisma.job.findMany({ orderBy: { createdAt: 'desc' } }); }
async function findById(id) { return prisma.job.findUnique({ where: { id: parseInt(id) } }); }
module.exports = { create, findAll, findById };
