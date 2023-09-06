import db from "../db";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  try {
    const { id, tools } = await new Response(re.body).json();
    const categories = await db
      .none("UPDATE tools SET secondarycategories = $1 where id = $2", [tools, id])
     
    return new Response(JSON.stringify("added sucessfully"), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response("Cannot add!", {
      status: 400,
    });
  }
}
