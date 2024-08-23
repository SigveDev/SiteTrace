import React, { useEffect } from "react";
import { addDays, format, subDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  EyeIcon,
  MousePointer,
  Globe,
  TabletSmartphoneIcon,
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
    from: subDays(new Date(), 14),
    to: new Date(),
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
                "Error"
              ) : (
                <>
                  {totalProjectData?.views}{" "}
                  <span className="text-sm text-slate-600">
                    (+
                    {
                      totalProjectData?.analyticsOverTime.sort(
                        (a, b) =>
                          new Date(b.datetime).getTime() -
                          new Date(a.datetime).getTime()
                      )[0].views
                    }
                    )
                  </span>
                </>
              )}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Total Interactions</CardTitle>
            <CardDescription>
              <MousePointer className="w-5 h-5" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {projectLoading ? (
                <Skeleton className="w-2/5 h-5" />
              ) : projectError ? (
                "Error"
              ) : (
                <>
                  {totalProjectData?.interactions}{" "}
                  <span className="text-sm text-slate-600">
                    (+
                    {
                      totalProjectData?.analyticsOverTime.sort(
                        (a, b) =>
                          new Date(b.datetime).getTime() -
                          new Date(a.datetime).getTime()
                      )[0].interactions
                    }
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
                "Error"
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
                "Error"
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
          <p className="text-red-500">Error loading projects</p>
        ) : (
          totalProjectData && (
            <>
              {dateDataLoading ? (
                <>
                  <Skeleton className="w-full h-full col-span-7 row-span-2" />
                </>
              ) : dateDataError ? (
                <p className="text-red-500">Error loading date data</p>
              ) : (
                <MainChart
                  data={dataOverTime}
                  startDate={date?.from ?? subDays(new Date(), 14)}
                  endDate={date?.to || new Date()}
                />
              )}
              <LiveUsers url={projectUrl} />
              {dateDataLoading ? (
                <>
                  <Skeleton className="w-full col-span-6 row-span-1 h-80" />
                </>
              ) : dateDataError ? (
                <p className="text-red-500">Error loading date data</p>
              ) : (
                <InteractionsChart
                  data={dataOverTime}
                  startDate={date?.from ?? subDays(new Date(), 14)}
                  endDate={date?.to || new Date()}
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
