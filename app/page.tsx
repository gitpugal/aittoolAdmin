"use client";

import CardList from "@/components/CardList";
import { TableDemo } from "@/components/CardTable";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useSession();
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isActive, setIsactive] = useState("1");
  const sideBarLinks = [
    {
      id: 1,
      name: "Categories",
    },
    {
      id: 2,
      name: "Tools",
    },
    {
      id: 3,
      name: "Settings",
    },
  ];
  // useEffect(() => {
  //   if (user.status == "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [user.status]);

  useEffect(() => {
    // if (user.status == "unauthenticated") {
    //   router.push("/login");
    // }
    const toolRes = fetch("https://aitoolsnext-admin-gray.vercel.app/api/tools");
    const categoryRes = fetch("https://aitoolsnext-admin-gray.vercel.app/api/categories");
    categoryRes.then((val) => {
      const dat = val.json();
      dat.then((res) => {
        setCategories(res.categories);
      });
    });
    toolRes.then((val) => {
      const dat = val.json();
      dat.then((res) => {
        setTools(res.tools);
      });
    });
  }, []);
  function changeMenu(e) {
    e.preventDefault();
    setIsactive(e.target.id);
  }
  return (
    <div className="pt-12  flex flex-col  h-screen w-full items-center justify-start text-black">
      {/* navbar */}
      <div className="w-screen bg-white px-10 absolute flex flex-row items-center justify-between top-0  p-2 border-b-2 bor">
        <h1 className="text-bold text-xl">AIToolsNext</h1>
        <Button onClick={() => router.push("/dashboard")}>Logout</Button>
      </div>

      <div className="w-screen h-screen overflow-hidden  flex flex-row items-start justify-center">
        {/* sidebar */}
        <div className="w-[20%] text-white gap-7 px-3 py-10 font-semibold text-3xl items-center justify-start left-0 h-screen  bg-slate-900 flex flex-col">
          {sideBarLinks.map((link) => (
            <h1
              id={link.id.toString()}
              onClick={changeMenu}
              className={`${
                isActive == link.id.toString() ? "bg-white/20" : ""
              } cursor-pointer w-full px-10 py-4 rounded-3xl text-center`}
            >
              {link.name}
            </h1>
          ))}
        </div>

        {/* cardlist */}
        <div className="w-[80%] px-10 flex flex-col items-start text-black h-full overflow-y-auto pt-10">
          <h1 className="w-full pb-20  text-center text-5xl font-light ">{sideBarLinks[parseInt(isActive)-1].name}</h1>
          <TableDemo data={isActive == "1" ? categories : tools}/>
        </div>
      </div>
    </div>
  );
}
