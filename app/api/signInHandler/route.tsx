import { NextApiRequest, NextApiResponse } from "next";
import pgp from "pg-promise";
import { json } from "stream/consumers";

const connectionString =
  "postgres://sourcefreeze:k2NuUA4SsFMb@ep-divine-sound-318147-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";

const db = pgp()(connectionString);

export async function POST(req: Request, res: Response) {
  // const data = JSON.parse(req.body);
  const formData = await req.json();
  console.log(formData.email)
  try {
    
    const result = await db.any(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [formData.email]
    );
    // const ee=  await db.any(
    //   "SELECT * FROM users");

    if (result.length == 0) {
      return new Response(JSON.stringify("ss"), {
        status: 201,
      });
    }
    if (result[0].password == formData.password) {
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } else {

      return new Response(formData, {
        status: 202,
      });
    }
  } catch (error) {
    console.error("Error getting data: ", error);
    return new Response(JSON.stringify("asdffd"), {
      status: 505,
    });
  }
}
