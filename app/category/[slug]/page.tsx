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
import { Trash } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [tool, setTool] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsactive] = useState("0");
  const [categories, setCategories] = useState(null);
  const [isDeleting, setDeleting] = useState(false);
  const [tools, setTools] = useState(null);
  const [noTools, setNoTools] = useState(true);
  useEffect(() => {
    const toolRes = fetch("https://admin.aitoolsnext.com/api/tools");
    toolRes.then((val) => {
      const dat = val.json();
      dat.then((res) => {
        setTools(res.tools);
      });
    });
    const tool = fetch("https://admin.aitoolsnext.com/api/getCategory", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug }),
    });
    tool.then(async (dat) => {
      const data = await dat.json();
      const dataTool = data.tools;
      setTool(dataTool);
      setDialogData(dataTool);
    });
    const categoryRes = fetch("https://admin.aitoolsnext.com/api/categories");
    categoryRes.then((val) => {
      const dat = val.json();
      dat.then((res) => {
        setCategories(res.categories);
      });
    });
  }, []);
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
    const res = fetch(
      `https://admin.aitoolsnext.com/api/${
        isActive == "1" ? "updateCategory" : "updateTool"
      }`,
      {
        method: "POST",
        body: JSON.stringify(dialogData),
      }
    );
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
    setDeleting(true);
    const res = fetch(
      `https://admin.aitoolsnext.com/api/${
        isActive == "1" ? "deleteCategory" : "deleteTool"
      }`,
      {
        method: "POST",
        body: JSON.stringify({ id: id }),
      }
    );
    res.then((dat) => {
      console.log(dat.status);
      setDeleting(false);
      setIsOpen(false);
      toast({
        title: "Tool deleted successfully!",
      });
      router.push("/");
      fetchData();
    });
  }

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
    const tools = fetch("https://admin.aitoolsnext.com/api/getCategory", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug }),
    });
    tools.then(async (dat) => {
      const data = await dat.json();
      const dataTool = data.tools;
      setTool(dataTool);
      setDialogData(dataTool);
    });
  }
  return (
    <div className="p-20 flex relative items-center justify-center  h-screen">
      <button
        className="absolute inline top-5 left-5"
        onClick={() => router.back()}
      >
        <ArrowLeft className="inline" />
        back
      </button>
      {tool ? (
        <div className="w-full h-full">
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
                  {isActive != "1" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Primary category
                      </Label>
                      <select name="primarycategpry" onCanPlay={changeHandler}>
                        <option value={dialogData.primarycategory}>
                          {dialogData.primarycategory}
                        </option>
                        {categories &&
                          categories.map((cat, index) => (
                            <option
                              key={cat.name + "" + index}
                              value={cat.name}
                            >
                              {cat.name}
                            </option>
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
          {tool && (
            <div className="flex flex-col gap-10">
              <h1 className="text-5xl font-bold ">{tool.name}</h1>
              <p className="text-3xl font-semibold">
                Description:
                <p className="text-3xl ml-5  font-light">{tool.description}</p>
              </p>
              <p className="text-3xl font-semibold">Tools:</p>

              <div className="grid w-fit gap-5 grid-cols-3">
                {tools &&
                  tools.map((el) => {
                    if (el.id == tool.id) {
                      setNoTools(false);
                      return (
                        <p
                          key={el.id + "" + el.name}
                          className="bg-slate-100 w-fit px-3 py-2 rounded-lg"
                        >
                          {el.name}
                        </p>
                      );
                    }
                  })}
                  {noTools == true &&  <h1 className="text-black">no tools in this category.</h1>}
              </div>

              <div className="flex flex-row gap-5 items-center justify-center w-fit">
                <Button
                  onClick={() => setIsOpen(true)}
                  className="w-fit text-3xl px-10 py-5"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteTool(tool.id)}
                  className="w-fit text-3xl px-10 py-5"
                >
                  {isDeleting ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash color="red" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Icons.spinner
          size={100}
          className="mr-2 text-9xl h-4 w-4 animate-spin"
        />
      )}
    </div>
  );
};

export default page;
