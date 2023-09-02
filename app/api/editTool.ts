import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { tool, toolId } = req.body;
  
    try {
      await db.none(
        'UPDATE tools SET name=$1, description=$2, features=$3, pricing=$4, upvotes=$5, image=$6 WHERE id=$7',
        [tool.name, tool.description, tool.features, tool.pricing, tool.upvotes, tool.image, toolId]
      );
  
      return res.status(200).json({ message: 'Tool updated successfully' });
    } catch (error) {
      console.error('Error updating data: ', error);
      return res.status(500).json({ message: 'An error occurred while updating the tool.' });
    }
  }
  