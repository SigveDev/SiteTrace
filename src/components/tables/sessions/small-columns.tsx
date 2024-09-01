import { ColumnDef } from "@tanstack/react-table";
import { Analytics } from "@/assets/types/analytics";

import { format } from "date-fns";

export const smallColumns: ColumnDef<Analytics>[] = [
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      return <p className="underline">{row.getValue("url")}</p>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => {
      return format(new Date(row.getValue("timestamp")), "Pp");
    },
  },
];
