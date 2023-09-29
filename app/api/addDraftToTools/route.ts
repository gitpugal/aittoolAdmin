import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const { id, tools } = await new Response(re.body).json();
    let res;
    const categories = await db
      .none(
        "INSERT INTO tools (id, name, short_description, description, alternative_description, features, faq, upvotes, image, created_at, updated_at, seo_title, seo_description, slug, pricing, secondarycategories, primarycategory, upvotedusers) SELECT id, name, short_description, description, alternative_description, features, faq, upvotes, image, created_at, updated_at, seo_title, seo_description, slug, pricing, secondarycategories, primarycategory, upvotedusers FROM drafttools WHERE id = $1",[
          id
        ]
      )
      .then(async () => {
        res = await db.one("UPDATE drafttools SET approved = true where id = $1 returning id", [id]);
      });
    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Cannot add!", {
      status: 400,
    });
  }
}
