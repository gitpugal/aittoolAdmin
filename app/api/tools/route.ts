import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export  async function GET(re: Request, res: Request) {
  try {
    const tools = await db.any("SELECT * FROM tools");
    return new Response(JSON.stringify({tools: tools}), {
      status: 200,

    });
  } catch (error) {
    return new Response("No Tools!", {
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