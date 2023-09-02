import { NextApiRequest, NextApiResponse } from 'next';
import db from '../db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { slug } = req.query;
  
    if (!slug) {
      res.status(400).json({ message: 'Slug must be provided' });
      return;
    }
  
    try {
      const category = await db.one('SELECT * FROM categories WHERE slug = $1', slug);
      const tools = await db.any(
        'SELECT tools.* FROM tools INNER JOIN category_tools ON tools.id = category_tools.tool_id WHERE category_tools.category_id = $1',
        category.id
      );
  
      category.tools = tools;
  
      res.status(200).json(category);
    } catch (error) {
      console.error('Error getting category: ', error);
      res.status(500).json({ message: 'An error occurred while getting the category.' });
    }
  }
  