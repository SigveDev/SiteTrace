import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLiveAnalyticsDataFromUrl } from "@/lib/appwrite";
import { Analytics } from "@/assets/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { differenceInMinutes, formatDistance } from "date-fns";

interface LiveUsersProps {
  url: string | null;
}

const LiveUsers = ({ url }: LiveUsersProps) => {
  const {
    isLoading: liveuserLoading,
    data: liveUserData,
    isError: liveUserError,
  } = useQuery<Analytics[]>({
    queryKey: ["liveUserData", url],
    queryFn: () =>
      getLiveAnalyticsDataFromUrl(url) as unknown as Promise<Analytics[]>,
    refetchInterval: 30000,
  });

  return (
    <Card className="col-span-1 row-span-2 md:col-span-6 lg:col-span-3">
      <CardHeader>
        <h2 className="text-lg font-semibold">Live Users</h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[560px]">
          {liveuserLoading ? (
            Array.from({ length: 11 }).map((_, index) => (
              <div
                className="grid items-center justify-center w-full grid-cols-12 mb-4"
                key={index}
              >
                <Skeleton className="w-3 h-3 rounded-full" />
                <div className="flex flex-col col-span-11 gap-2">
                  <span>
                    <Skeleton className="w-full h-4" />
                  </span>
                  <p className="text-sm text-slate-600">
                    <Skeleton className="w-1/2 h-3" />
                  </p>
                </div>
              </div>
            ))
          ) : liveUserError ? (
            <p className="text-destructive">Error loading live users</p>
          ) : (
            liveUserData?.map((analytics) => (
              <a
                key={analytics.sessionId}
                className="grid items-center justify-center grid-cols-12 px-2 mb-4 rounded-lg cursor-pointer hover:bg-muted"
                href={`/session/${analytics.$id}`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    differenceInMinutes(
                      new Date(),
                      new Date(analytics.timestamp)
                    ) < 5
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <div className="flex flex-col col-span-11 gap-2">
                  <span>Session: {analytics.sessionId}</span>
                  <p className="text-sm text-slate-600">
                    Last contact:{" "}
                    {formatDistance(new Date(analytics.timestamp), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </a>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiveUsers;
