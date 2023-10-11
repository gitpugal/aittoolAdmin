import db from "../db";
import captureWebsite from "capture-website";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(re: Request, res: Request) {
  let bol;
  try {
    console.log(
      "------------------------------------------------------------------------------------"
    );
    const { slug, url } = await new Response(re.body).json();
    // console.log(slug + " " + url);
    try{

      await captureWebsite.base64(url).then((res) => {
       bol = res
       console.log(bol)
      });
    }catch(err){
      return new Response(
        JSON.stringify({
          blerrovbb: err,
          imageURL: `https://gitlab.com/pugalarasan_git/test/-/raw/main/public/assets/${slug}.png`,
        }),
        {
          status: 200,
        }
      );
    }
  
    return new Response(
      JSON.stringify({
        blovbb: bol,
        imageURL: `https://gitlab.com/pugalarasan_git/test/-/raw/main/public/assets/${slug}.png`,
      }),
      {
        status: 200,
      }
    );

    //       res: response,
    //       imageURL: `https://gitlab.com/pugalarasan_git/test/-/raw/main/public/assets/${slug}.png`,
    //     }),
    //     {
    //       status: 200,
    //     }
    //   );
    // }
    // const data = await response.json();
    // // console.log(data);
    // return new Response(
    //   JSON.stringify({
    //     imageURL: `https://gitlab.com/pugalarasan_git/test/-/raw/main/public/assets/${slug}.png`,
    //   }),
    //   {
    //     status: 200,
    //   }
    // );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 404,
    });
  }
}
