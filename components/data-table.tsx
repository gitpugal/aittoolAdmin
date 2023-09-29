"use client";

import { Icons } from "./icons";
import { Switch } from "./ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@radix-ui/react-toggle";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: any;
  data: TData[];
  isCategory: boolean;
  openDialog: any;
  deleteTool: any;
  id: any;
  addDraftToTools:any;
}
interface MyData {
  id: number;
  slug: string;
  approved: boolean;
  // Add other properties here as needed
}

export function DataTable<TData extends MyData, TValue>({
  columns,
  data,
  isCategory,
  openDialog,
  deleteTool,
  addDraftToTools
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [hasUserColumn, setHasUserColumn] = useState(null);
  const [currentApprovingTool, setcurrentApprovingTool] = useState(null);

  useEffect(() => {
    const hasUserColumn = columns?.some(
      (column) => column.accessorKey === "user_id" && column.header === "User"
    );
    setHasUserColumn(hasUserColumn);
  }, [columns]);


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead key={"id"}>ID</TableHead>
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
              <TableHead></TableHead>
              <TableHead></TableHead>
              {hasUserColumn && <TableHead key={"approve"}>Approved</TableHead>}
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
                <TableCell>{index + 1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    dangerouslySetInnerHTML={{
                      __html: cell.renderValue()?.toString(),
                    }}
                  ></TableCell>
                ))}
                <TableCell
                  className="cursor-pointer"
                  onClick={() => {
                    openDialog(row);
                  }}
                >
                  <PencilIcon color="gray" />
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
                {hasUserColumn && (
                  <TableCell>
                    <Switch
                    onCheckedChange={() => {
                      addDraftToTools(row.original.id);
                    }}
                    />
                  </TableCell>
                )}
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
