"use client";

import CardList from "@/components/CardList";
import { TableDemo } from "@/components/CardTable";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const user = useSession();
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsactive] = useState("1");
  const [categoryTools, setCategoryTools] = useState([]);
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
  useEffect(() => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
  }, [user.status]);

  function fetchData() {
    const toolRes = fetch("https://admin.aitoolsnext.com/api/tools");
    const categorytoolRes = fetch("https://admin.aitoolsnext.com/api/categoryTools");
    const categoryRes = fetch("https://admin.aitoolsnext.com/api/categories");
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
    categorytoolRes.then((val) => {
      const dat = val.json();
      dat.then((res) => {
        setCategoryTools(res.tools);
      });
    });
  }
  useEffect(() => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
    fetchData();
  }, []);
  function changeMenu(e) {
    e.preventDefault();
    setIsactive(e.target.id);
  }
  function openDialog(data) {
    setDialogData(data);
    setIsOpen((prev) => !prev);
  }
  function changeHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
    setDialogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function updateTools() {
    setIsUpdating(true);
    console.log(dialogData);
    const res = fetch(`https://admin.aitoolsnext.com/api/${isActive == "1"?"updateCategory" :"updateTool"}`, {
      method: "POST",
      body: JSON.stringify(dialogData),
    });
    res.then((dat) => {
      console.log(dat.status);
      setIsUpdating(false);
      setIsOpen(false);
      toast({
        title: "Tool updated successfully!",
      });
      fetchData();
    });
  }

  function deleteTool(id) {
    setIsUpdating(true);
    const res = fetch(`https://admin.aitoolsnext.com/api/${isActive == "1" ? "deleteCategory" :"deleteTool"}`, {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    res.then((dat) => {
      console.log(dat.status);
      setIsUpdating(false);
      setIsOpen(false);
      toast({
        title: "Tool deleted successfully!",
      });
      fetchData();
    });
  }
  return (
    <div className="pt-12  flex flex-col  h-screen w-full items-center justify-start text-black">
      {/* navbar */}
      <div className="w-screen bg-white px-10 absolute flex flex-row items-center justify-between top-0  p-2 border-b-2 bor">
        <h1 className="text-bold text-xl">AIToolsNext</h1>
        <Button onClick={() => router.push("/dashboard")}>Logout</Button>
      </div>

      {/* edit dialog */}
      {dialogData && (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Edit {isActive != "1" ? " tool " : " category"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Name" className="text-right">
                  Name
                </Label>
                <Input
                  onChange={changeHandler}
                  id="Name"
                  name="name"
                  value={dialogData.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  onChange={changeHandler}
                  id="description"
                  name="description"
                  value={dialogData.description}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <Input
                  onChange={changeHandler}
                  id="slug"
                  name="slug"
                  value={dialogData.slug}
                  className="col-span-3"
                />
              </div>
              {isActive != "1" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Primary category
                  </Label>
                  <select name="primarycategpry" onCanPlay={changeHandler}>
                    <option value={dialogData.primarycategory}>
                      {dialogData.primarycategory}
                    </option>
                    {categories.map((cat, index) => (

                      <option key={cat.name+""+index} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              )}
              {isActive != "1" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <select name="pricing" onChange={changeHandler}>
                    <option value={dialogData.pricing}>
                      {dialogData.pricing}
                    </option>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              )}
              {
                <div className="grid grid-cols-3">
                  {tools.map((el) => {
                    if (el.id == dialogData.id) {
                      return <p key={el.id+""+el.name} className="bg-slate-100 w-fit px-3 py-2 rounded-lg">{el.name}</p>;
                    }
                  })}
                </div>
              }
            </div>
            <DialogFooter>
              <Button
                className={`${
                  isUpdating && " pointer-events-none opacity-75 "
                }`}
                onClick={updateTools}
              >
                {isUpdating && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save chages
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="w-screen h-screen overflow-hidden  flex flex-row items-start justify-center">
        {/* sidebar */}
        <div className="w-[20%] text-white gap-7 px-3 py-10 font-semibold text-3xl items-center justify-start left-0 h-screen  bg-slate-900 flex flex-col">
          {sideBarLinks.map((link) => (
            <Button
              key={link.id}
              id={link.id.toString()}
              onClick={changeMenu}
              className={`${
                isActive == link.id.toString() ? "bg-white/20" : ""
              } cursor-pointer text-xl w-full px-10 py-4 rounded-xl text-center`}
            >
              {link.name}
            </Button>
          ))}
        </div>

        {/* cardlist */}
        <div className="w-[80%] px-10 flex flex-col items-start text-black h-full overflow-y-auto pt-10">
          <h1 className="w-full pb-20  text-center text-5xl font-light ">
            {sideBarLinks[parseInt(isActive) - 1].name}
          </h1>
          <TableDemo
            openDialog={openDialog}
            deleteTool={deleteTool}
            isCategory={isActive == "1" ? true : false}
            data={isActive == "1" ? categories : tools}
          />
        </div>
      </div>
    </div>
  );
}
