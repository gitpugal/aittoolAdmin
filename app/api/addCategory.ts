// api/addCategory.ts

import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, description, slug, imageURL } = req.body;

  if (!name || !description || !slug) {
    return res.status(400).json({ message: 'Name, description, and slug are required.' });
  }

  try {
    const result = await db.one(
      `INSERT INTO categories (name, description, slug, image) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`, 
      [name, description, slug, imageURL]
    );

    return res.status(200).json({ id: result.id });

  } catch (error) {
    console.error('Error inserting data: ', error);
    return res.status(500).json({ message: 'An error occurred while inserting the data.' });
  }
}
