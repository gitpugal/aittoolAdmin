import db from "../db";

export async function POST(req: Request, res: Request) {
  try {
    const { name, description, imageURL, slug, status } = await new Response(
      req.body
    ).json();
    let res;
    const result = await db
      .one(
        `INSERT INTO categories (name, description, slug, image, status) 
           VALUES ($1, $2, $3, $4, $5) 
           RETURNING id`,
        [
          name,
          description,
          slug,
          imageURL,
          (status.length <= 0 || status == "draft") ? "draft" : status,
        ]
      )

      .then(async () => {
        res = await db.one("SELECT * FROM categories where slug = $1", [slug]);
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
