import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { tool, categoryId } = req.body;
  
    try {
      const result = await db.one(
        'INSERT INTO tools(name, description, upvotes, image, slug, pricing, features, short_description) ' +
        'VALUES(${name}, ${description},  ${upvotes}, ${imageURL}, ${slug}, ${pricing}, ${features}, ${description}) ' +
        'RETURNING id',
        tool
      );
  
      const toolId = result.id;
      await db.none('INSERT INTO category_tools(category_id, tool_id) VALUES($1, $2)', [categoryId, toolId]);
  
      res.status(200).json({ status: 'success', message: 'Tool added successfully' });
    } catch (error) {
      console.error('Error inserting data: ', error);
      res.status(500).json({ status: 'error', message: 'An error occurred while adding the tool.' });
    }
  }
  