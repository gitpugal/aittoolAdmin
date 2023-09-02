import pgp from "pg-promise";
import { NextApiRequest, NextApiResponse } from "next";

const connectionString =
  "postgres://sourcefreeze:k2NuUA4SsFMb@ep-divine-sound-318147-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";

const db = pgp()(connectionString);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body.name);
    let result = [];
    let catResult = [];

    try {
      result = await db.many(
        `select * from tools where name like  $1 `,
        [req.body.name+'%']
      );
    } catch (err) {
      console.error("Error querying tools:", err);
    }

    try {
      catResult = await db.many(
        `select * from categories where name like  $1 `,
        [req.body.name+'%']
      );
    } catch (err) {
      console.error("Error querying categories:", err);
    }

    // Check if at least one query was successful
    if (result.length === 0 && catResult.length === 0) {
      res.json({ message: [], catResult: [] });
    } else {
      res.json({ message: result, catResult: catResult });
    }
  } catch (err) {
    console.error("Error:", err);
    res.json({ message: [], catResult: [] });
  }
}
