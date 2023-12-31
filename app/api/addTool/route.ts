import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: Request) {
  try {
    const {
      name,
      description,
      features,
      upvotes,
      imageURL,
      slug,
      pricing,
      primarycategory,
      status,
    } = await new Response(req.body).json();
    let res;
    const result = await db
      .one(
        "INSERT INTO tools(name, short_description, description, alternative_description, features, faq, upvotes, image, slug, pricing, primarycategory, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id",
        [
          name,
          description,
          description?.toString(),
          "Alternative description for the dummy tool.",
          features || "Features of the dummy tool.",
          "Frequently asked questions about the dummy tool.",
          upvotes || 0,
          imageURL || "Unkwon.jpg",
          slug,
          pricing || "Not Specified",
          primarycategory,
          status.length <= 0 ? "draft" : status == "draft" ? "draft" : status,
        ]
      )
      .then(async () => {
        res = await db.one("SELECT * FROM tools where slug = $1", [slug]);
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
