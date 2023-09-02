import { NextApiRequest, NextApiResponse } from 'next';
import db from './db'; // Adjust the path as needed
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { name, email } = req.body;
  
    try {
      const result = await db.one(
        'INSERT INTO subscribers( email) ' +
        'VALUES($1 ) returning email',
        [email]
      );
  
    //   const toolId = result.id;
    //   await db.none('INSERT INTO category_tools(category_id, tool_id) VALUES($1, $2)', [categoryId, toolId]);
  
      res.status(200).json({ status: 'success', message:result});
    } catch (error) {
      console.error('Error subscribing: ', error);
      res.status(202).json({message: error.detail });
    }
  }
  