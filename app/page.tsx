"use client";

import CardList from "@/components/CardList";
import { TableDemo } from "@/components/CardTable";
import { categoryColumns, toolColumns } from "@/components/Columns";
import DemoPage from "@/components/Table";
import { DataTable } from "@/components/data-table";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const [selectedTools, setSelectedTools] = useState([]);
  const [isAddToolOpen, setisAddToolOpen] = useState(false);

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
  // function renderHTML(htmlString) {
  //   return { __html: htmlString };
  // }

  async function fetchData() {
    const toolRes = await fetch(`https://admin.aitoolsnext.com/api/tools`, {
      method: "POST",
      cache: "no-cache",
    });
    const categorytoolRes = await fetch(
      "https://admin.aitoolsnext.com/api/categoryTools",
      {
        cache: "no-cache",
      }
    );
    const categoryRes = await fetch("https://admin.aitoolsnext.com/api/categories", {
      cache: "no-cache",
    });

    const catDat = await categoryRes.json();
    setCategories(catDat.categories);
    const dat = await toolRes.json();
    setTools(dat.tools);
    const catToolDat = await categorytoolRes.json();
    setCategoryTools(catToolDat.tools);
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
    console.log(data.original);
    setDialogData(data.original);
    setIsOpen((prev) => !prev);
  }
  function changeHandler(e) {
    e.preventDefault();
    setDialogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function selectPrimaryChangeHandler(e) {
    console.log(e);
    setDialogData((prev) => ({ ...prev, primarycategory: e }));
  }
  function selectPriceChangeHandler(e) {
    console.log(e);
    setDialogData((prev) => ({ ...prev, pricing: e }));
  }
  function quilChangeHandler(val) {
    // e.preventDefault();
    setDialogData((prev) => ({ ...prev, description: val }));
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
    setIsUpdating(true);
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
      setIsUpdating(false);
      setIsOpen(false);
      toast({
        title: "Tool deleted successfully!",
      });
      fetchData();
    });
  }

  function addTools2Category(tool) {
    setIsUpdating(true);
    console.log(selectedTools);
    const newArraya = [...selectedTools];
    console.log(newArraya);
    // console.log(tool)
    // dialogData?.secondarycategories?.map((el) => {
    //   if (!newArraya.includes(el)) {
    //     newArraya.push(el);
    //   }
    // });
    // console.log(newArraya)

    // console.log(newArraya)
    // setSelectedTools((prev) => [...prev, ...tool?.secondarycategories]);
    const res = fetch(`https://admin.aitoolsnext.com/api/addCategory2Tool`, {
      method: "POST",
      body: JSON.stringify({ id: tool, tools: newArraya }),
    });
    res.then((dat) => {
      console.log(dat.status);
      setIsUpdating(false);
      setisAddToolOpen(false);
      toast({
        title: "Tool updated successfully!",
      });
      setIsOpen(false);
      fetchData();
    });
    setisAddToolOpen(false);
    setIsUpdating(false);
    setSelectedTools([]);
  }
  useEffect(() => {
    if (isActive != "1" && isOpen == true) {
      setSelectedTools([...dialogData?.secondarycategories]);
    } else {
      setSelectedTools([]);
    }
  }, [isOpen]);

  return (
    <div className="pt-12  flex flex-col  h-screen w-full items-center justify-start text-black">
      {/* navbar */}
      <div className="w-screen bg-white px-10 absolute flex flex-row items-center justify-between top-0  p-2 border-b-2 bor">
        <h1 className="text-bold text-xl">AIToolsNext</h1>
        <Button
          onClick={() => {
            signOut();
            router.push("/login");
          }}
        >
          Logout
        </Button>
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
                <ReactQuill
                  className="col-span-3"
                  theme="snow"
                  onChange={quilChangeHandler}
                  value={dialogData.description}
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
                  <Select
                    name="primarycategpry"
                    onValueChange={selectPrimaryChangeHandler}
                    onOpenChange={selectPrimaryChangeHandler}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={dialogData.primarycategory} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{dialogData.primarycategory}</SelectLabel>
                        {categories.map((cat, index) => (
                          <SelectItem value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {isActive != "1" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Select
                    name="pricing"
                    onValueChange={selectPriceChangeHandler}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={dialogData.pricing} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{dialogData.pricing}</SelectLabel>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {isActive != "1" && (
                <Label htmlFor="price" className="text-left mt-10">
                  Other categories
                </Label>
              )}
              {isActive != "1" && (
                <div className="grid grid-cols-3 gap-1">
                  {dialogData?.secondarycategories?.map((el) => (
                    <p
                      key={el}
                      className={`bg-slate-100 w-fit px-3 cursor-pointer py-2 rounded-lg`}
                    >
                      {el}
                      <span className="text-2xl ml-2 font-light inline">+</span>
                    </p>
                  ))}
                </div>
              )}
              <Dialog
                open={isAddToolOpen}
                onOpenChange={() => setisAddToolOpen(false)}
              >
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Add Other categories</DialogTitle>
                  </DialogHeader>
                  <div className="w-full flex flex-row flex-wrap gap-2">
                    {categories &&
                      categories.map((el) => {
                        return (
                          <p
                            key={el.id + "" + el.name}
                            className={`${
                              selectedTools &&
                              selectedTools.length > 0 &&
                              selectedTools.includes(el.name)
                                ? "bg-black text-white "
                                : "bg-slate-100"
                            } w-fit px-3 cursor-pointer py-2 rounded-lg`}
                            onClick={() => {
                              if (
                                selectedTools &&
                                selectedTools.length > 0 &&
                                selectedTools.includes(el.name)
                              ) {
                                const newArray = selectedTools.filter(
                                  (it) => it != el.name
                                );
                                setSelectedTools(newArray);
                              } else {
                                setSelectedTools((prev) => [...prev, el.name]);
                              }
                            }}
                          >
                            {el.name}
                            <span className="text-2xl ml-2 font-light inline">
                              +
                            </span>
                          </p>
                        );
                      })}
                  </div>
                  <DialogFooter>
                    <Button
                      className={`${
                        isUpdating && " pointer-events-none opacity-75 "
                      }`}
                      onClick={() => addTools2Category(dialogData.id)}
                    >
                      {isUpdating && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Add Tools
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <DialogFooter>
              {isActive != "1" && (
                <Button
                  onClick={() => setisAddToolOpen(true)}
                  className="w-fit"
                >
                  Add Other Category
                </Button>
              )}
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
          {/* <TableDemo
            openDialog={openDialog}
            deleteTool={deleteTool}
            isCategory={isActive == "1" ? true : false}
            data={isActive == "1" ? categories : tools}
          /> */}
          <DataTable
            id={0}
            openDialog={openDialog}
            deleteTool={deleteTool}
            isCategory={isActive == "1" ? true : false}
            data={isActive == "1" ? categories : tools}
            columns={isActive == "1" ? categoryColumns : toolColumns}
          />
        </div>
      </div>
    </div>
  );
}
