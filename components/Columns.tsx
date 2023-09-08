"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: number;
  name: string;
  description: string;
  slug: string;
  category: string;
  createdAt: string;
  pricing: string;
};

export const toolColumns: ColumnDef<Payment>[] = [

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "primarycategory",
    header: "Category",
  },
  {
    accessorKey: "created_at",
    header: "created At",
  },
  {
    accessorKey: "pricing",
    header: "Pricing",
  },
];

export const categoryColumns: ColumnDef<Payment>[] = [
 
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "created_at",
    header: "created at",
  },
];
