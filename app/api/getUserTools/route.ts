import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    console.log("hih");
    const tools = await db.many("SELECT * FROM drafttools");
    return new Response(JSON.stringify({ tools: tools }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving data: ", error);
    return new Response(JSON.stringify({ message: "Cannot retrieve data" }), {
      status: 404,
    });
  }
}
