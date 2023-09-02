import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ message: 'Category id is required.' });
    }
  
    try {
      const category = await db.oneOrNone('SELECT * FROM categories WHERE id = $1', [id]);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
  
      const tools = await db.any(
        `SELECT categories.*, tools.* 
         FROM categories 
         INNER JOIN category_tools ON categories.id = category_tools.category_id
         INNER JOIN tools ON category_tools.tool_id = tools.id
         WHERE categories.id = $1`,
        [id]
      );
  
      return res.status(200).json({ category, tools });
    } catch (error) {
      console.error('Error getting data: ', error);
      return res.status(500).json({ message: 'An error occurred while getting the data.' });
    }
  }
  