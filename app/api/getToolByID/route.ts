import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const {id} = await new Response(re.body).json();
    // console.log("hi")
    // console.log(slug)
    const tools = await db.one("SELECT * FROM tools WHERE id = $1", [id]);
    return new Response(JSON.stringify({ tools: tools }), {
      status: 200,
    });
  } catch (error) {
    return new Response("No Tool!", {
      status: 505,
    });
  }
}
// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!', {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   })
// }
