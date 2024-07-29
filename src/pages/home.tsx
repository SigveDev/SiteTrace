import React, { useEffect } from "react";
import { format, subDays } from "date-fns";
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
import ClicksChart from "@/components/charts/clicks-chart";
import ReferrerChart from "@/components/charts/referrer-chart";
import BrowserChart from "@/components/charts/browser-chart";
import { useLocation } from "react-router-dom";
import { getDataFromUrl } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import { Analytics } from "@/assets/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 14),
    to: new Date(),
  });
  const [projectUrl, setProjectUrl] = React.useState<string | null>(null);
  const {
    isLoading: projectLoading,
    data: projectsData,
    isError: projectError,
  } = useQuery<Analytics[]>({
    queryKey: ["projectData", projectUrl],
    queryFn: () =>
      getDataFromUrl(projectUrl || "") as unknown as Promise<Analytics[]>,
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
                  {projectsData?.length}{" "}
                  <span className="text-sm text-slate-600">
                    (+
                    {
                      projectsData?.filter(
                        (item: Analytics) =>
                          new Date(item.$updatedAt).getTime() >
                          new Date().getTime() - 24 * 60 * 60 * 1000
                      ).length
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
              12 785 <span className="text-sm text-slate-600">(+185)</span>
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
            <CardDescription>Chrome</CardDescription>
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
            <CardDescription>Desktop</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="grid w-full grid-cols-3 grid-rows-3 gap-4 mt-6 mb-4 grow">
        {projectLoading ? (
          <>
            <Skeleton className="w-full h-full col-span-2 row-span-2" />
            <Skeleton className="w-full h-full col-span-1 row-span-2" />
            <Skeleton className="w-full col-span-1 row-span-1 h-80" />
            <Skeleton className="w-full col-span-1 row-span-1 h-80" />
            <Skeleton className="w-full col-span-1 row-span-1 h-80" />
          </>
        ) : projectError ? (
          <p className="text-red-500">Error loading projects</p>
        ) : (
          <>
            <MainChart data={projectsData as Analytics[]} />
            <LiveUsers />
            <ClicksChart />
            <ReferrerChart />
            <BrowserChart />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
