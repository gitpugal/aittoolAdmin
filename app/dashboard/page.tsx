'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const user =  useSession();
  const router = useRouter();
  useEffect(() => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
  }, [user.status]);

  useEffect(() => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
  },[])
  return (
    <div className="py-10 flex flex-col h-screen w-screen items-center justify-center text-black">
      <h1>Welcome to Dashboard</h1>
      <p>username: {user?.data?.user?.email}</p>
      <Button onClick={() => router.push("/dashboard")}>DashBoard</Button>
    </div>
  );
}
