import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export  async function POST(re: Request, res: Request) {
  try {
    const tools = await db.many("SELECT * FROM tools");
    return new Response(JSON.stringify({tools: tools}), {
      status: 200,

    });
  } catch (error) {
    return new Response("No Tools!", {
      status: 505,
    });
  }
}
