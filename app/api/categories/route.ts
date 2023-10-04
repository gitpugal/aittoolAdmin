import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export  async function POST(re: Request, res: Request) {
  try {
    const categories = await db.any("SELECT categories.*, seocategories.title as seotitle, seocategories.description as seodescription, seocategories.keywords as seokeywords FROM categories JOIN seocategories ON categories.id = seocategories.id;");
    return new Response(JSON.stringify({categories: categories}), {
      status: 200,

    });
  } catch (error) {
    return new Response("No Categories!", {
      status: 400,
    });
  }
}