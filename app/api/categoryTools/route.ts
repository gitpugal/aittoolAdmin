import db from "../db";

export async function GET(req: Request, res: Response) {
 try{
    const tools = await db.any("SELECT * FROM category_tools");
    return new Response(JSON.stringify({tools:tools}), {
        status:200
    })
 } catch(err){
    return new Response("No tools for this category", {
        status: 400,
      });
 }  
}