import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export  async function POST(re: Request, res: Request) {
  try {
    const categories = await db.any("SELECT * FROM categories");
    return new Response(JSON.stringify({categories: categories}), {
      status: 200,

    });
  } catch (error) {
    return new Response("No Categories!", {
      status: 400,
    });
  }
}