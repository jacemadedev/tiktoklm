import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await prisma.scheduledPost.findMany();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { tiktokUrl, scheduledTime, status } = req.body;
    const post = await prisma.scheduledPost.create({
      data: { tiktokUrl, scheduledTime, status },
    });
    res.status(201).json(post);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}