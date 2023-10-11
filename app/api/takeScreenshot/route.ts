import db from "../db";
import captureWebsite from "capture-website";
import { NextApiRequest, NextApiResponse } from "next";

// Adjust the path as needed
export async function POST(re: Request, res: Request) {
  // const gitlabApiUrl = "https://gitlab.com/api/v4"; // Update with your GitLab instance URL
  // const repoPath = "pugalarasan_git/test"; // Update with your GitLab namespace and repository name
  // const accessToken = "glpat-UAVvcVfY_vmnQCn5GLMJ";
  try {
    console.log(
      "------------------------------------------------------------------------------------"
    );
    const { slug, url } = await new Response(re.body).json();
    // console.log(slug + " " + url);

    // const buff = await captureWebsite.base64(url);

    // Commit and push the changes to the GitLab repository using GitLab API
    // const apiUrl = `https://gitlab.com/api/v4/projects/pugalarasan_git%2Ftest/repository/files/public%2Fassets%2F${slug}.png`;

    // const fileContent = require("fs")
    //   .readFileSync(`public/assets/${slug}.png`)
    //   .toString("base64");

    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "PRIVATE-TOKEN": "glpat-socyJu6y22yVJBWUmtoT",
    //   },
    //   body: JSON.stringify({
    //     branch: "main", // Update with your branch name
    //     content: buff.toString(),
    //     "PRIVATE-TOKEN": "glpat-socyJu6y22yVJBWUmtoT",
    //     encoding: "base64",
    //     commit_message: `Add ${slug}.png`,
    //     execute_filemode: true,
    //   }),
    // });

    // if (response.ok) {
    //   console.log("saved to git");
    return new Response(
      JSON.stringify({
        imageURL: `https://gitlab.com/pugalarasan_git/test/-/raw/main/public/assets/${slug}.png`,
      }),
      {
        status: 200,
      }
    );
    // } else {
    //   return new Response(
    //     JSON.stringify({
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
