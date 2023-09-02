'use client'
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const metadata = {
//   title: "Login",
//   description: "Login admin panel",
// };
export default function RegisterPage() {
  const user = useSession();
  const router = useRouter();
 
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      <div className="hidden h-screen  items-center justify-center bg-muted lg:flex" >
        <h1 className="text-7xl font-semibold text-black  text-center">AITools Admin</h1>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
