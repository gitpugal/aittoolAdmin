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
  user_id: string;
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
    accessorKey: "status",
    header: "Status",
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
export const userToolsColumns: ColumnDef<Payment>[] = [
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
  {
    accessorKey: "user_id",
    header: "User",
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "created at",
  },
];
