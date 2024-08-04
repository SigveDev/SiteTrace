import { TopReferrer } from "@/assets/types/totalAnalytics";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
        <div className="flex flex-col gap-3">
          {data
            .sort((a, b) => b.amount - a.amount)
            .map((referrer, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <p className="text-base font-semibold">
                  {referrer.name === "" ? "Unknown" : referrer.name}
                </p>
                <span className="text-sm font-bold">+{referrer.amount}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferrerChart;
