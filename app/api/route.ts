import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const result = await someAsyncOperation()
    res.status(200).send("hi")
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}