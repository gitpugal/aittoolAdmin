import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    try {
      const tools = await db.any('SELECT * FROM tools ORDER BY upvotes DESC LIMIT 20');
      res.status(200).json({ tools });
    } catch (error) {
      console.error('Error retrieving data: ', error);
      res.status(500).json({ message: 'An error occurred while retrieving the data.' });
    }
  }
  