import React, { useEffect } from "react";
import { addDays, format, subDays, startOfDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  EyeIcon,
  MousePointer,
  Globe,
  TabletSmartphoneIcon,
  Info,
} from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import MainChart from "@/components/charts/main-chart";
import LiveUsers from "@/components/charts/live-users";
import InteractionsChart from "@/components/charts/interactions-chart";
import ReferrerChart from "@/components/charts/referrer-chart";
import BrowserChart from "@/components/charts/browser-chart";
import { useLocation } from "react-router-dom";
import { getDataFromUrl, getDataFromUrlAndDate } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AnalyticsOverTime,
  TotalAnalytics,
} from "@/assets/types/totalAnalytics";
import mergeAllDataFromTotalData from "@/assets/functions/mergeAllDataFromTotalData";

const Home = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfDay(subDays(new Date(), 14)),
    to: startOfDay(new Date()),
  });
  const [projectUrl, setProjectUrl] = React.useState<string | null>(null);
  const [totalProjectData, setTotalProjectData] =
    React.useState<TotalAnalytics>();
  const [dataOverTime, setDataOverTime] = React.useState<AnalyticsOverTime[]>(
    []
  );
  const {
    isLoading: projectLoading,
    data: projectsData,
    isError: projectError,
  } = useQuery<TotalAnalytics[]>({
    queryKey: ["projectData", projectUrl],
    queryFn: () =>
      getDataFromUrl(projectUrl || "") as unknown as Promise<TotalAnalytics[]>,
  });
  const {
    isLoading: dateDataLoading,
    data: dateData,
    isError: dateDataError,
  } = useQuery({
    queryKey: ["dateData", date, projectUrl],
    queryFn: () =>
      getDataFromUrlAndDate(
        projectUrl || "",
        date?.from ?? subDays(new Date(), 14),
        date?.to || new Date()
      ) as unknown as Promise<AnalyticsOverTime[]>,
  });
  const location = useLocation();

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

  useEffect(() => {
    if (dateData) {
      setDataOverTime(dateData);
    }
  }, [dateData]);

  useEffect(() => {
    if (projectsData) {
      const mergedData = mergeAllDataFromTotalData(projectsData);
      setTotalProjectData(mergedData);
    }
  }, [projectsData]);

  return (
    <div className="w-[95%] h-fit mt-8 flex flex-col">
      <div className="flex items-center justify-between w-full h-fit">
        <h1 className="text-4xl font-semibold">Overview</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid w-full grid-cols-4 gap-3 mt-4 h-fit">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Total Visitors</CardTitle>
            <CardDescription>
              <EyeIcon className="w-5 h-5" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {projectLoading ? (
                <Skeleton className="w-2/5 h-5" />
              ) : projectError ? (
                <p className="text-destructive">Error</p>
              ) : (
                <>
                  {totalProjectData?.views}{" "}
                  <span className="text-sm text-slate-600">
                    (+
                    {dateData?.find(
                      (data) =>
                        startOfDay(new Date(data.datetime)).getTime() ===
                        startOfDay(new Date()).getTime()
                    )?.views ?? 0}
                    )
                  </span>
                </>
              )}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex flex-row text-xl">
              Total Interactions
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center justify-center h-full ml-2">
                    <Info className="w-5 h-5 mt-[5px] text-secondary" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm text-primary">
                    Interactions isnt always tracked by default. Users must
                    agree to share interaction data.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
            <CardDescription>
              <MousePointer className="w-5 h-5" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {projectLoading ? (
                <Skeleton className="w-2/5 h-5" />
              ) : projectError ? (
                <p className="text-destructive">Error</p>
              ) : (
                <>
                  {totalProjectData?.interactions}{" "}
                  <span className="text-sm text-slate-600">
                    (+
                    {dateData?.find(
                      (data) =>
                        startOfDay(new Date(data.datetime)).getTime() ===
                        startOfDay(new Date()).getTime()
                    )?.interactions ?? 0}
                    )
                  </span>
                </>
              )}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Most Popular Browser</CardTitle>
            <CardDescription>
              <Globe className="w-5 h-5" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {projectLoading ? (
                <Skeleton className="w-2/5 h-5" />
              ) : projectError ? (
                <p className="text-destructive">Error</p>
              ) : (
                projectsData?.map((analytics) => {
                  return analytics.topBrowser.sort(
                    (a, b) => b.amount - a.amount
                  )[0].name;
                })[0]
              )}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Most Popular Device</CardTitle>
            <CardDescription>
              <TabletSmartphoneIcon className="w-5 h-5" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {projectLoading ? (
                <Skeleton className="w-2/5 h-5" />
              ) : projectError ? (
                <p className="text-destructive">Error</p>
              ) : (
                projectsData?.map((analytics) => {
                  return analytics.topDevice.sort(
                    (a, b) => b.amount - a.amount
                  )[0].name;
                })[0]
              )}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="grid w-full grid-cols-10 grid-rows-3 gap-4 mt-6 mb-4 grow h-[1000px]">
        {projectLoading ? (
          <>
            <Skeleton className="w-full h-full col-span-7 row-span-2" />
            <Skeleton className="w-full h-full col-span-3 row-span-2" />
            <Skeleton className="w-full col-span-6 row-span-1 h-80" />
            <Skeleton className="w-full col-span-2 row-span-1 h-80" />
            <Skeleton className="w-full col-span-2 row-span-1 h-80" />
          </>
        ) : projectError ? (
          <p className="text-destructive">Error loading projects</p>
        ) : (
          totalProjectData && (
            <>
              {dateDataLoading ? (
                <>
                  <Skeleton className="w-full h-full col-span-7 row-span-2" />
                </>
              ) : dateDataError ? (
                <p className="text-destructive">Error loading date data</p>
              ) : (
                <MainChart
                  data={dataOverTime}
                  startDate={date?.from ?? startOfDay(subDays(new Date(), 14))}
                  endDate={
                    date && date.to
                      ? startOfDay(addDays(date.to, 1))
                      : startOfDay(new Date())
                  }
                />
              )}
              <LiveUsers url={projectUrl} />
              {dateDataLoading ? (
                <>
                  <Skeleton className="w-full col-span-6 row-span-1 h-80" />
                </>
              ) : dateDataError ? (
                <p className="text-destructive">Error loading date data</p>
              ) : (
                <InteractionsChart
                  data={dataOverTime}
                  startDate={date?.from ?? startOfDay(subDays(new Date(), 14))}
                  endDate={
                    date && date.to
                      ? startOfDay(addDays(date.to, 1))
                      : startOfDay(new Date())
                  }
                />
              )}
              <ReferrerChart data={totalProjectData.topReferrer} />
              <BrowserChart data={totalProjectData.topBrowser} />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
