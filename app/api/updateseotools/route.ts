import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    // const [name, description, slug, primarycategory, pricing, id] = re.body;
    const { id, title, description, keywords } = await new Response(
      re.body
    ).json();
    const tools = await db.one(
      `UPDATE seotools SET title = $1, description = $2, keywords = $3 WHERE id = $4 returning title`,
      [ title, description, (keywords == null || keywords.length <= 0) ? [] : keywords, id]
    );
    console.log(tools);
    return new Response(JSON.stringify({ tools: tools }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
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
