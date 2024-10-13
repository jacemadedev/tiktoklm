import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const milestones = await prisma.engagementMilestone.findMany();
    res.status(200).json(milestones);
  } else if (req.method === 'POST') {
    const { metric, threshold } = req.body;
    const milestone = await prisma.engagementMilestone.create({
      data: { metric, threshold },
    });
    res.status(201).json(milestone);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}