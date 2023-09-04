import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const { id } = await new Response(re.body).json();
    const categories = await db
      .none("DELETE FROM category_tools where tool_id = $1", [id])
      .then(async () => {
        const tools = await db.none("DELETE FROM tools where id = $1", [id]);
      });
    return new Response(JSON.stringify("deleted sucessfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response("Cannot delete!", {
      status: 400,
    });
  }
}
