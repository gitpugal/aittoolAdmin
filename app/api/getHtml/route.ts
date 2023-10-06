import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const { url } = await new Response(re.body).json();
    const tools = await fetch(url);
    const data = await tools.text();
    console.log(data);
    return new Response(JSON.stringify({ html: data }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
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
