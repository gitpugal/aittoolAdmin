import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { id } = req.query;
    const { name, description, slug, imageURL } = req.body;
  
    if (!id || !name || !description || !slug) {
      return res.status(400).json({ message: 'ID, name, description, and slug are required.' });
    }
  
    try {
      await db.none(
        `UPDATE categories 
         SET name = $1, description = $2, slug = $3, image = $4
         WHERE id = $5`,
        [name, description, slug, imageURL, id]
      );
  
      res.status(200).json({ message: 'Category updated successfully.' });
    } catch (error) {
      console.error('Error updating data: ', error);
      res.status(500).json({ message: 'An error occurred while updating the data.' });
    }
  }
  