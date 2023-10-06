import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    // const [name, description, slug, primarycategory, pricing, id] = re.body;
    const {
      name,
      id,
      slug,
      description,
      pricing,
      primarycategory,
      status,
      seotitle,
      seodescription,
      seokeywords,
    } = await new Response(re.body).json();
    const tools = await db.one(
      `UPDATE tools  SET name = $1, description = $2, slug = $3, primarycategory = $4, pricing = $5, status = $7  WHERE id = $6 returning name`,
      [
        name,
        description,
        slug,
        primarycategory,
        pricing,
        id,
        status.length <= 0 || status == "draft" ? "draft" : status,
      ]
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
