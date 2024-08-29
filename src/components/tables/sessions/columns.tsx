import { ColumnDef } from "@tanstack/react-table";
import { Analytics } from "@/assets/types/analytics";

import { format } from "date-fns";

export const columns: ColumnDef<Analytics>[] = [
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      return <p className="underline">{row.getValue("url")}</p>;
    },
  },
  {
    accessorKey: "referrer",
    header: "Origin",
    cell: ({ row }) => {
      if (row.getValue("referrer") === "") {
        return "Direct";
      }
      return <p className="underline">{row.getValue("referrer")}</p>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => {
      return format(new Date(row.getValue("timestamp")), "PPPppp");
    },
  },
  {
    accessorKey: "browser.name",
    header: "Browser",
  },
  {
    accessorKey: "device",
    header: "Device",
  },
  {
    accessorKey: "loadTime",
    header: "Load Time",
    cell: ({ row }) => {
      return row.getValue("loadTime") === null
        ? "-"
        : `${row.getValue("loadTime")}ms`;
    },
  },
];
