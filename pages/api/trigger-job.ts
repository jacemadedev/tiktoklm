import { NextApiRequest, NextApiResponse } from 'next';
import { runBackgroundJob } from '../../lib/backgroundJob';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await runBackgroundJob();
      res.status(200).json({ message: 'Background job triggered successfully' });
    } catch (error) {
      console.error('Error triggering background job:', error);
      res.status(500).json({ message: 'Error triggering background job' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}