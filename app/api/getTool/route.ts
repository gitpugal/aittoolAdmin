import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const {slug} = await new Response(re.body).json();
    console.log("hi")
    console.log(slug)
    const tools = await db.one("SELECT * FROM tools WHERE slug = $1", [slug]);
    return new Response(JSON.stringify({ tools: tools }), {
      status: 200,
    });
  } catch (error) {
    return new Response("No Tool!", {
      status: 505,
    });
  }
}