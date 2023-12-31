import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const { id, tools } = await new Response(re.body).json();
    let res;
    const categories = await db
      .none("UPDATE tools SET secondarycategories = $1 where id = $2", [
        tools,
        id,
      ])
      .then(async () => {
        res = await db.one("SELECT * FROM tools where id = $1", [id]);
      });

    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Cannot add!", {
      status: 400,
    });
  }
}
