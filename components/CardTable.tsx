import { Icons } from "./icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Eye, PencilIcon } from "lucide-react";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function TableDemo(props) {
  const [deletingId, setDeletingId] = useState(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Slug</TableHead>
          {!props.isCategory && (
            <TableHead className="text-right">Category</TableHead>
          )}
          <TableHead className="text-right">Created At</TableHead>
          {!props.isCategory && (
            <TableHead className="text-right">Pricing</TableHead>
          )}
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data &&
          props.data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.slug}</TableCell>
              {!props.isCategory && (
                <TableCell className="text-right">
                  {item.primarycategory}
                </TableCell>
              )}
              <TableCell className="text-right">{item.created_at}</TableCell>
              {!props.isCategory && (
                <TableCell className="text-right">{item.pricing}</TableCell>
              )}
              <TableCell
                className="cursor-pointer"
                onClick={() => props.openDialog(item)}
              >
                <PencilIcon color="gray" />
              </TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => {
                  if (item.id != deletingId) {
                    setDeletingId(item.id);
                    props.deleteTool(item.id);
                  }
                }}
              >
                {item.id == deletingId ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash color="red" />
                )}
              </TableCell>
              <Link className="cursor-pointer" href={`/${props.isCategory ?"category" : "tool"}/${item.slug}`}>
                <TableCell>
                  <Eye color="gray" />
                </TableCell>
              </Link>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
