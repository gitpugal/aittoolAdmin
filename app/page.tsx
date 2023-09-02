'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const user =  useSession();
  const router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
  }, [user.status]);

  useEffect( () => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
    const res = fetch("http://localhost:3000/api/tools");
    res.then((val) => {
      const dat = val.json();
      dat.then((res) => {
        setData(res.tools)
      })
    })
  },[])
  return (
    <div className="py-10 pt-28 flex flex-col h-screen w-screen items-center justify-start text-black">
      <div className="w-screen px-10 absolute flex flex-row items-center justify-between top-0 h-fit p-2 border-b-2 bor">
        <h1 className="text-bold text-xl">AIToolsNext</h1>
      <Button onClick={() => router.push("/dashboard")}>Logout</Button>
      </div>
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}
