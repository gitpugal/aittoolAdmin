import { NextApiRequest, NextApiResponse } from 'next';
import db from '../db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { slug } = req.query;
  
    if (!slug) {
      return res.status(400).json({ message: 'Slug must be provided' });
    }
  
    try {
      const category = await db.one('SELECT * FROM tools WHERE slug = $1', slug);
      // console.log(category)
  
      res.status(200).json(category);
    } catch (error) {
      console.error('Error getting category: ', error);
      res.status(500).json(error);
    }
  }
  