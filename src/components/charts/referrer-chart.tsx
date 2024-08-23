import { TopReferrer } from "@/assets/types/totalAnalytics";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface ReferrerChartProps {
  data: TopReferrer[];
}

const ReferrerChart = ({ data }: ReferrerChartProps) => {
  return (
    <Card className="col-span-2 row-span-1">
      <CardHeader>
        <h2 className="text-lg font-semibold">Top Referrers</h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          {data
            .sort((a, b) => b.amount - a.amount)
            .map((referrer, index) => (
              <div
                key={index}
                className="flex flex-row items-center max-w-[90%] justify-between mb-3"
              >
                <p className="text-base font-semibold">
                  {referrer.name.length > 22
                    ? `${referrer.name.slice(0, 22)}...`
                    : referrer.name === ""
                    ? "Unknown"
                    : referrer.name}
                </p>
                <span className="text-sm font-bold">+{referrer.amount}</span>
              </div>
            ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReferrerChart;
