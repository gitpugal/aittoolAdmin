"use client";

import CardList from "@/components/CardList";
import { TableDemo } from "@/components/CardTable";
import {
  categoryColumns,
  toolColumns,
  userToolsColumns,
} from "@/components/Columns";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [userTools, setUserTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsactive] = useState("1");
  // const [categoryTools, setCategoryTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [isAddToolOpen, setisAddToolOpen] = useState(false);
  const [openAddToolDialog, setOpenAddToolDialog] = useState(false);

  const [toolName, setToolName] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [toolFeatures, setToolFeatures] = useState("");
  const [toolPricing, setToolPricing] = useState("");
  const [toolImageUrl, setToolImageUrl] = useState("");
  const [toolSlug, setToolSlug] = useState("");
  const [toolPrimaryCategory, setToolprimaryCategory] = useState(null);
  const [toolStatus, setToolStatus] = useState("");
  const [seokey, setseokey] = useState("");
  const pricingOptions = ["Free", "Premium"];
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
      name: "Submitted Tools",
    },
  ];
  useEffect(() => {
    if (user.status == "unauthenticated") {
      router.push("/login");
    }
  }, [user.status]);
  async function fetchData() {
    const toolRes = await fetch(`https://admin.aitoolsnext.comapi/tools`, {
      method: "POST",
      cache: "no-cache",
    });
    // const categorytoolRes = await fetch(
    //   "https://admin.aitoolsnext.comapi/categoryTools",
    //   {
    //     cache: "no-cache",
    //     method: "POST",
    //   }
    // );
    const categoryRes = await fetch("https://admin.aitoolsnext.comapi/categories", {
      method: "POST",
      cache: "no-cache",
    });

    const userToolRes = await fetch(`https://admin.aitoolsnext.comapi/getUserTools`, {
      method: "POST",
      cache: "no-cache",
    });

    const catDat = await categoryRes.json();
    setCategories(catDat.categories);
    const dat = await toolRes.json();
    setTools(dat.tools);
    // const catToolDat = await categorytoolRes.json();
    // setCategoryTools(catToolDat.tools);
    const userToolData = await userToolRes.json();
    setUserTools(userToolData.tools);
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
    setDialogData({
      ...data.original,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
    });
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

  function seokeywordsChangeHandler(e) {
    setseokey(e.target.value);
  }

  function updateTools() {
    setIsUpdating(true);
    console.log(dialogData);
    const res = fetch(
      `https://admin.aitoolsnext.comapi/${
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
      `https://admin.aitoolsnext.comapi/${
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
    const res = fetch(`https://admin.aitoolsnext.comapi/addCategory2Tool`, {
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

  const handleCloseAddToolDialog = () => {
    setOpenAddToolDialog((prev) => !prev);
  };

  const handleAddToolChange = (content, delta, source, editor) => {
    setToolDescription(editor.getHTML());
  };

  const handleSaveTool = async () => {
    console.log("adding//");
    if (toolName === null || toolName === "" || !toolName) {
      return "No Tools Found.";
    }

    if (
      toolDescription === null ||
      toolDescription === "" ||
      !toolDescription
    ) {
      return "No Tools Description Found.";
    }

    if (toolImageUrl === null || toolImageUrl === "" || !toolImageUrl) {
      return "No Tools Image URL Found.";
    }

    if (toolSlug === null || toolSlug === "" || !toolSlug) {
      return "No Tools Slug Found.";
    }

    // console.log(toolPricing)

    const toolsData = {
      name: toolName,
      description: toolDescription,
      features: toolFeatures,
      pricing: toolPricing.length > 0 ? toolPricing : "Free",
      upvotes: 0,
      imageURL: toolImageUrl,
      slug: toolSlug,
      primarycategory:
        toolPrimaryCategory != null && toolPrimaryCategory.length > 0
          ? toolPrimaryCategory
          : "",
      status: toolStatus,
    };

    console.log(JSON.stringify(toolsData));
    const response = await fetch("https://admin.aitoolsnext.comapi/addTool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toolsData),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(message);
      return;
    }
    console.log(response.json());
    setToolName("");
    setToolDescription("");
    setToolFeatures("");
    setToolPricing("");
    setToolImageUrl("");
    setToolSlug("");
    setToolprimaryCategory("");
    setToolStatus("");

    // Update the UI as necessary
    setOpenAddToolDialog(false);

    // fetch the updated tools and categories
    fetchData();
  };

  const handleSaveCategory = async () => {
    if (toolName === null || toolName === "" || !toolName) {
      return "No Tools Found.";
    }

    if (
      toolDescription === null ||
      toolDescription === "" ||
      !toolDescription
    ) {
      return "No Tools Description Found.";
    }

    if (toolImageUrl === null || toolImageUrl === "" || !toolImageUrl) {
      return "No Tools Image URL Found.";
    }

    if (toolSlug === null || toolSlug === "" || !toolSlug) {
      return "No Tools Slug Found.";
    }
    const categoryData = {
      name: toolName,
      description: toolDescription,
      imageURL: toolImageUrl,
      slug: toolSlug,
      status: toolStatus,
    };

    console.log(JSON.stringify(categoryData));
    const response = await fetch("https://admin.aitoolsnext.comapi/addCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(message);
      return;
    }
    setToolName("");
    setToolDescription("");
    setToolImageUrl("");
    setToolSlug("");
    setToolStatus("");

    console.log(response.json());

    // Update the UI as necessary
    setOpenAddToolDialog(false);

    // fetch the updated tools and categories
    fetchData();
  };

  async function addDraftToTools(id) {
    const response = await fetch("https://admin.aitoolsnext.comapi/addDraftToTools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    console.log(response);
    fetchData();
  }

  function addkeywords() {
    if (seokey.length >= 2) {
      if (
        dialogData.seokeywords == null ||
        !dialogData.seokeywords.includes(seokey)
      ) {
        const newkeywords =
          dialogData.seokeywords != null && dialogData.seokeywords.length > 0
            ? [...dialogData.seokeywords, seokey]
            : [seokey];
        console.log(newkeywords);
        setDialogData((prev) => ({ ...prev, seokeywords: newkeywords }));
      }

      setseokey("");
    }
  }

  useEffect(() => {
    if (isActive != "1" && isOpen == true) {
      // console.log(dialogData?.secondarycategories);
      if (dialogData?.secondarycategories != null) {
        setSelectedTools([...dialogData?.secondarycategories]);
      }
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
          <DialogContent className="h-[80vh] overflow-y-scroll">
            <Tabs defaultValue="content" className="w-full focus:border-none">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              <TabsContent
                className=" focus-visible:outline-none focus:outline-none  focus-visible:border-none focus-visible:ring-transparent"
                value="content"
              >
                <DialogHeader>
                  <DialogTitle>
                    Edit {isActive != "1" ? " tool " : " category"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Name" className="text-left">
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
                    <Label htmlFor="description" className="text-left">
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
                    <Label htmlFor="slug" className="text-left">
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
                      <Label htmlFor="category" className="text-left">
                        Primary category
                      </Label>
                      <Select
                        name="primarycategpry"
                        onValueChange={selectPrimaryChangeHandler}
                        onOpenChange={selectPrimaryChangeHandler}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder={dialogData.primarycategory}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {dialogData.primarycategory}
                            </SelectLabel>
                            {categories.map((cat, index) => (
                              <SelectItem value={cat.name}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {isActive != "1" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-left">
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
                      {dialogData?.secondarycategories
                        ?.slice(0, 3)
                        .map((el) => (
                          <p
                            key={el}
                            className={`bg-slate-100 w-fit px-3 cursor-pointer py-2 rounded-lg`}
                          >
                            {el}
                            <span className="text-2xl ml-2 font-light inline">
                              +
                            </span>
                          </p>
                        ))}
                    </div>
                  )}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-left">
                      Status
                    </Label>
                    <Select
                      name="status"
                      onValueChange={(e) => {
                        setDialogData((prev) => ({ ...prev, status: e }));
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={dialogData.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{dialogData.status}</SelectLabel>
                          <SelectItem value="draft">draft</SelectItem>
                          <SelectItem value="published">published</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
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
                                    setSelectedTools((prev) => [
                                      ...prev,
                                      el.name,
                                    ]);
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
              </TabsContent>

              <TabsContent
                className=" focus-visible:outline-none focus:outline-none  focus-visible:border-none focus-visible:ring-transparent"
                value="seo"
              >
                <DialogHeader>
                  <DialogTitle>SEO</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Name" className="text-left">
                      Title
                    </Label>
                    <Input
                      onChange={changeHandler}
                      id="seoTitle"
                      name="seotitle"
                      value={dialogData.seotitle}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-left">
                      Description
                    </Label>
                    <Input
                      className="col-span-3"
                      name="seodescription"
                      onChange={changeHandler}
                      value={dialogData.seodescription}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Name" className="text-left">
                      Keywords
                    </Label>
                      <Input
                        onChange={seokeywordsChangeHandler}
                        id="seoKeywords"
                        name="seoKeywords"
                        value={seokey}
                        className="col-span-3"
                      />
                      <button className=" bg-black col-span-2 whitespace-nowrap text-white px-3 py-1 rounded-xl" onClick={addkeywords}>Add Keyword</button>
                  </div>
                  <div className="w-full flex flex-row flex-wrap gap-2 items-stretch justify-start">
                    {dialogData.seokeywords != null &&
                      dialogData.seokeywords.length > 0 &&
                      dialogData.seokeywords.map((keyword) => (
                        <p
                          onClick={() => {
                            const newkeywords = dialogData.seokeywords.filter(
                              (it) => it != keyword
                            );
                            console.log(newkeywords);
                            setDialogData((prev) => ({
                              ...prev,
                              seokeywords: newkeywords,
                            }));
                            setseokey("");
                          }}
                          className="bg-slate-200 px-2 py-1 text-black rounded-xl"
                        >
                          {keyword}
                        </p>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
          <Dialog
            open={openAddToolDialog}
            onOpenChange={handleCloseAddToolDialog}
          >
            <DialogTrigger className="bg-black mb-5 px-4 py-2 rounded-xl text-white">
              Add {isActive != "1" ? "Tool" : "Category"}
            </DialogTrigger>
            <DialogContent className="flex flex-col h-screen  overflow-y-scroll justify-start items-start gap-5">
              <DialogTitle className="bg-black mb-5 px-4 py-2 rounded-xl text-white">
                Add {isActive != "1" ? "Tool" : "Category"}
              </DialogTitle>
              <>
                <Label htmlFor="toolName" className="text-left">
                  Name
                </Label>
                <Input
                  id="toolName"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                />
              </>
              <>
                {" "}
                <Label htmlFor="Description" className="text-left">
                  Description
                </Label>
                <ReactQuill
                  value={toolDescription}
                  onChange={handleAddToolChange}
                />
              </>
              {isActive != "1" && (
                <>
                  {" "}
                  <Label htmlFor="Features" className="text-left">
                    Features
                  </Label>
                  <Input
                    id="toolFeatuers"
                    value={toolFeatures}
                    onChange={(e) => setToolFeatures(e.target.value)}
                  />
                </>
              )}
              {isActive != "1" && (
                <div className="">
                  <Label htmlFor="category" className="text-left">
                    Pricing
                  </Label>
                  <Select
                    name="pricing"
                    onValueChange={(e) => {
                      setToolPricing(e);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={""} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {dialogData && dialogData.pricing != null
                            ? dialogData.pricing
                            : ""}
                        </SelectLabel>
                        <SelectItem value={"Free"}>Free</SelectItem>
                        <SelectItem value={"Premium"}>Premium</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {isActive != "1" && (
                <div className="">
                  <Label htmlFor="category" className="text-left">
                    Primary category
                  </Label>
                  <Select
                    name="primarycategpry"
                    onValueChange={(e) => {
                      setToolprimaryCategory(e);
                    }}
                    onOpenChange={(e) => {
                      setToolprimaryCategory(e);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          dialogData && dialogData.primarycategory != null
                            ? dialogData.primarycategory
                            : ""
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {dialogData && dialogData.primarycategory != null
                            ? dialogData.primarycategory
                            : ""}
                        </SelectLabel>
                        {categories.map((cat, index) => (
                          <SelectItem value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="">
                <Label htmlFor="category" className="text-left">
                  Status
                </Label>
                <Select
                  name="status"
                  onValueChange={(e) => {
                    setToolStatus(e);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={""} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>draft</SelectLabel>
                      <SelectItem value={"draft"}>draft</SelectItem>
                      <SelectItem value={"published"}>published</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <>
                {" "}
                <Label htmlFor="Slug" className="text-left">
                  Slug
                </Label>
                <Input
                  value={toolSlug}
                  id="toolSlug"
                  onChange={(e) => setToolSlug(e.target.value)}
                />
              </>

              <>
                {" "}
                <Label htmlFor="Image" className="text-left">
                  Image
                </Label>
                <Input
                  id="toolImageUrl"
                  value={toolImageUrl}
                  onChange={(e) => setToolImageUrl(e.target.value)}
                />
              </>
              <DialogFooter>
                <Button onClick={handleCloseAddToolDialog}>Cancel</Button>
                <Button
                  onClick={
                    isActive != "1" ? handleSaveTool : handleSaveCategory
                  }
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DataTable
            id={0}
            openDialog={openDialog}
            deleteTool={deleteTool}
            addDraftToTools={addDraftToTools}
            isCategory={isActive == "1" ? true : false}
            data={
              isActive == "1" ? categories : isActive == "2" ? tools : userTools
            }
            columns={
              isActive == "1"
                ? categoryColumns
                : isActive == "2"
                ? toolColumns
                : userToolsColumns
            }
          />
        </div>
      </div>
    </div>
  );
}
