import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLiveAnalyticsDataFromUrl } from "@/lib/appwrite";
import { Analytics } from "@/assets/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <Card className="col-span-3 row-span-2">
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
            <p className="text-red-500">Error loading live users</p>
          ) : (
            liveUserData?.map((analytics) => {
              const lastContactms =
                new Date().getTime() - new Date(analytics.timestamp).getTime();

              const minutesSinceLastContact = Math.floor(
                lastContactms / 1000 / 60
              );

              return (
                <div
                  key={analytics.sessionId}
                  className="grid items-center justify-center grid-cols-12 mb-4"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      minutesSinceLastContact < 5
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <div className="flex flex-col col-span-11 gap-2">
                    <span>Session: {analytics.sessionId}</span>
                    <p className="text-sm text-slate-600">
                      Last contact:{" "}
                      {minutesSinceLastContact > 60 * 24
                        ? `${Math.floor(
                            minutesSinceLastContact / (60 * 24)
                          )} day${
                            Math.floor(minutesSinceLastContact / (60 * 24)) > 1
                              ? "s"
                              : ""
                          } ago`
                        : minutesSinceLastContact > 60
                        ? `${Math.floor(minutesSinceLastContact / 60)} hour${
                            Math.floor(minutesSinceLastContact / 60) > 1
                              ? "s"
                              : ""
                          } ago`
                        : `${minutesSinceLastContact} minute${
                            minutesSinceLastContact > 1 ? "s" : ""
                          } ago`}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiveUsers;
