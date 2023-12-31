import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    // const [name, description, slug, primarycategory, pricing, id] = re.body;
    const { name, id, slug, description, status, seokeywords } =
      await new Response(re.body).json();
    const tools = await db.one(
      `UPDATE categories 
         SET name = $1, description = $2, slug = $3, status = $5, seokeywords = $6
         WHERE id = $4 returning name`,
      [
        name,
        description,
        slug,
        id,
        status.length <= 0 || status == "draft" ? "draft" : status,
        seokeywords.length <= 0 ? [] : seokeywords,
      ]
    );
    console.log(tools);
    return new Response(JSON.stringify({ tools: tools }), {
      status: 200,
    });
  } catch (error) {
    return new Response("No catgeory!", {
      status: 505,
    });
  }
}
