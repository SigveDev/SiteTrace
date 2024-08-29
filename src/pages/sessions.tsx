import { DataTable } from "@/components/tables/sessions/data-table";
import { columns } from "@/components/tables/sessions/columns";
import { AnalyticsRequest } from "@/assets/types/analytics";
import { useQuery } from "@tanstack/react-query";
import { getSessionsDataWithOptions } from "@/lib/appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

const Sessions = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "timestamp", desc: true },
  ]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [projectUrl, setProjectUrl] = useState<string | null>(null);

  const handleSortingChange = (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState)
  ) => {
    if (typeof updaterOrValue === "function") {
      setSorting((prev) => updaterOrValue(prev));
    } else {
      setSorting(updaterOrValue);
    }
    setPageIndex(0);
  };

  const handlePageIndexChange = (
    newPageIndex: number | ((prevIndex: number) => number)
  ) => {
    if (typeof newPageIndex === "function") {
      setPageIndex((prev) => newPageIndex(prev));
    } else {
      setPageIndex(newPageIndex);
    }
  };

  const {
    isLoading: sessionsLoading,
    data: sessionsData,
    isError: sessionsError,
  } = useQuery<AnalyticsRequest>({
    queryKey: ["sessionsData", pageIndex, pageSize, sorting, projectUrl],
    queryFn: async () => {
      const sessions = (await getSessionsDataWithOptions(
        pageIndex,
        pageSize,
        sorting[0]?.id || "timestamp",
        sorting[0]?.desc === false ? "asc" : "desc",
        projectUrl
      )) as unknown as Promise<AnalyticsRequest>;
      return sessions;
    },
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const url = new URL(window.location.href);
      setProjectUrl(url.searchParams.get("project"));
    };
    handleUrlChange();

    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [location]);

  return (
    <div className="w-[95%] h-fit mt-8 flex flex-col">
      <div className="flex items-center justify-start w-full h-fit">
        <h1 className="text-4xl font-semibold">Sessions</h1>
        <div className="mt-auto mb-1 ml-2 w-fit h-fit">
          {sessionsLoading ? (
            <Skeleton className="w-20 h-6" />
          ) : sessionsError ? (
            <Badge variant="destructive">Error</Badge>
          ) : (
            sessionsData && (
              <Badge variant="secondary">{sessionsData.total} sessions</Badge>
            )
          )}
        </div>
      </div>
      <div className="my-4">
        {sessionsLoading ? (
          <Skeleton className="w-full h-[650px]" />
        ) : sessionsError ? (
          <p className="text-destructive">Error loading sessions</p>
        ) : (
          sessionsData && (
            <DataTable
              columns={columns}
              data={sessionsData.documents}
              getRowLink={(row) => `/session/${row.$id}`}
              sorting={sorting}
              onSortingChange={handleSortingChange}
              pageIndex={pageIndex}
              pageSize={pageSize}
              totalPages={Math.ceil(sessionsData.total / pageSize)}
              onPageIndexChange={handlePageIndexChange}
              onPageSizeChange={setPageSize}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Sessions;
