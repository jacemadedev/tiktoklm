import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const accounts = await prisma.tikTokAccount.findMany();
      res.status(200).json(accounts);
    } else if (req.method === 'POST') {
      const { username } = req.body;
      const account = await prisma.tikTokAccount.create({
        data: { username },
      });
      res.status(201).json(account);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}