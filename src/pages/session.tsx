import { Analytics } from "@/assets/types/analytics";
import { getSessionDataFromId } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Session = () => {
  const {
    isLoading: sessionLoading,
    data: sessionData,
    isError: sessionError,
  } = useQuery<Analytics>({
    queryKey: ["sessionData", window.location.pathname.split("/")[2]],
    queryFn: () =>
      getSessionDataFromId(
        window.location.pathname.split("/")[2]
      ) as unknown as Promise<Analytics>,
  });

  console.log(sessionData);

  return (
    <div className="w-[95%] max-w-[600px] h-fit mt-8 flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/sessions">Sessions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {sessionLoading ? (
                <Skeleton className="w-20 h-3" />
              ) : sessionError ? (
                "Session"
              ) : (
                sessionData && sessionData.sessionId
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row w-full h-20 gap-8 mx-6">
        <div className="h-20 aspect-square">
          {sessionLoading ? (
            <Skeleton className="w-20 h-20 rounded-full" />
          ) : sessionError ? (
            <div className="w-20 h-20 bg-red-500 rounded-full"></div>
          ) : (
            sessionData && (
              <img
                src={`https://api.dicebear.com/9.x/rings/svg?seed=${sessionData.sessionId}&ringFive=full,eighth,half,quarter&ringFour=half,quarter,full,eighth&ringOne=half,quarter,full,eighth&ringThree=half,quarter,full,eighth&ringTwo=half,quarter,full,eighth`}
                alt="Session Image"
                className="w-full h-full rounded-full"
              />
            )
          )}
        </div>
        <div className="flex flex-col gap-2 grow">
          <h1 className="text-xl font-bold">Session Info </h1>
          {sessionLoading ? (
            <Skeleton className="w-1/2 h-5" />
          ) : sessionError ? (
            "Error loading session data"
          ) : (
            sessionData && (
              <p className="text-muted-foreground">
                Session ID: {sessionData.sessionId}
              </p>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 h-fit">
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-lg font-semibold">Basic Info</h2>
          </CardHeader>
          <CardContent>
            {sessionLoading ? (
              <Skeleton className="w-full h-32" />
            ) : sessionError ? (
              <p className="text-red-500">Error loading session data</p>
            ) : (
              sessionData && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <span className="font-semibold">Last Contact:</span>
                    <span>
                      {format(new Date(sessionData.timestamp), "PPPppp")}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="font-semibold">Url:</span>
                    <span>
                      <a href={sessionData.url} className="underline">
                        {sessionData.url}
                      </a>
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="font-semibold">Referrer:</span>
                    <span>
                      {sessionData.referrer === "" ? (
                        "Unknown"
                      ) : (
                        <a href={sessionData.referrer} className="underline">
                          {sessionData.referrer}
                        </a>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="font-semibold">Browser:</span>
                    <span>{sessionData.browser.name}</span>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
        {sessionLoading ? (
          <>
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </>
        ) : sessionError ? (
          <p className="text-destructive">Error loading session data</p>
        ) : (
          sessionData &&
          (sessionData.loadTime === null ? null : (
            <Accordion type="multiple">
              <AccordionItem value="detailed-info">
                <AccordionTrigger>Advanced</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Visit Duration:</span>
                      <span>{sessionData.visitDuration}ms</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Load Time:</span>
                      <span>{sessionData.loadTime}ms</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Device:</span>
                      <span>{sessionData.device}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Clicks:</span>
                      <span>{sessionData.clicks}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Scroll depth:</span>
                      <span>{sessionData.scrollDepth}px</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Resolution:</span>
                      <span>{sessionData.screenResolution}px</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Viewport:</span>
                      <span>{sessionData.viewportSize}px</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Focused on page:</span>
                      <span>{sessionData.focus ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">User Agent:</span>
                    </div>
                    <span className="">{sessionData.userAgent}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="network-info">
                <AccordionTrigger>Network</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Effective Type:</span>
                      <span>{sessionData.network.effectiveType}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Downlink:</span>
                      <span>{sessionData.network.downlink}mbps</span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">Round Trip Time:</span>
                      <span>{sessionData.network.rtt}ms</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
};

export default Session;
