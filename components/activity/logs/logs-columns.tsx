"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { LogsDeleteButton } from "./logs-delete-button"

export type LogsType = {
  id: string
  date: Date
  count: number
  activity: {
    id: string
    name: string
  }
}

export const logColumns: ColumnDef<LogsType>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <Icon name="sort" className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => {
      const date = new Date(row.getValue() as string)
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const formattedDate = Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date)
      return <div className="min-w-[5rem] md:px-4">{formattedDate}</div>
    },
  },
  {
    accessorKey: "activity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity
          <Icon name="sort" className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => {
      const activity = row.row.original.activity
      const name = activity.name
      const id = activity.id

      return (
        <Link
          href={`/dashboard/activities/${id}`}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          {name}
        </Link>
      )
    },
  },
  {
    accessorKey: "count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Count
          <Icon name="sort" className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = row.original.count
      return <div className="px-4">{value}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const logs = row.original
      return <LogsDeleteButton logs={logs} />
    },
  },
]
