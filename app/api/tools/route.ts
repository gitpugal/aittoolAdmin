import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const tools = await db.many(
      "SELECT tools.*, seotools.title as seotitle, seotools.description as seodescription, seotools.keywords as seokeywords FROM tools JOIN seotools ON tools.id = seotools.id; "
    );
    return new Response(JSON.stringify({ tools: tools }), {
      status: 200,
    });
  } catch (error) {
    return new Response("No Tools!", {
      status: 505,
    });
  }
}
