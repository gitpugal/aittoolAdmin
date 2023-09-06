"use client";

import { Icons } from "./icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: any;
  data: TData[];
  isCategory: boolean;
  openDialog: any;
  deleteTool: any;
  id: any;
}
interface MyData {
  id: number;
  slug: string;
  // Add other properties here as needed
}

export function DataTable<TData extends MyData, TValue>({
  columns,
  data,
  isCategory,
  openDialog,
  deleteTool,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [deletingId, setDeletingId] = useState(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                <TableHead key={"id"}>
                    ID
                  </TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <TableCell>{index+1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell
                  className="cursor-pointer"
                  onClick={() => {
                    openDialog(row);
                  }}
                >
                  <PencilIcon color="gray" />
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => {
                    if (row.original.id != deletingId) {
                      setDeletingId(row.original.id);
                      deleteTool(row.original.id);
                    }
                  }}
                >
                  {row.original.id == deletingId ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash color="red" />
                  )}
                </TableCell>
                <Link
                  className="cursor-pointer"
                  href={`/${isCategory ? "category" : "tool"}/${
                    row.original.slug
                  }`}
                >
                  <TableCell>
                    <Eye color="gray" />
                  </TableCell>
                </Link>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
