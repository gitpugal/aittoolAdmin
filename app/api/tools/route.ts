import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const tools = await db.manyOrNone(
      "SELECT tools.*, seotools.title as seotitle, seotools.description as seodescription, seotools.keywords as seokeywords FROM tools join seotools on tools.id = seotools.id where tools.status != 'draft'"
    );
    return new Response(JSON.stringify({ tools: tools.length <=0 ? [] : tools }), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response("No Tools!", {
      status: 505,
    });
  }
}
