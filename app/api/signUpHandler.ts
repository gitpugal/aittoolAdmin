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
    const result = await db.any("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);
    if (result.length > 0) {
      return res.status(404).json({message: "Email already associated with an account."});
    }

    const SignUpResult = await db.one(
      "INSERT INTO users (username, uid, email, password, favorites) VALUES($1, $2, $3, $4, $5) returning uid",
      [req.body.email.split('@')[0], Math.round(Math.random() * 100000), req.body.email, req.body.password, []]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting data: ", error);
    return res
      .status(500)
      .json({ message: error });
  }
}
