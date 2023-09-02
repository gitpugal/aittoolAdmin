import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    try {
      const result = await db.any('SELECT * FROM categories ORDER BY id ASC');
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error getting data: ', error);
      return res.status(500).json({ message: 'An error occurred while getting the data.' });
    }
  }
  