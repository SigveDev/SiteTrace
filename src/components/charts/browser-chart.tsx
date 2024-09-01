import { TopBrowser } from "@/assets/types/totalAnalytics";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface BrowserChartProps {
  data: TopBrowser[];
}

const BrowserChart = ({ data }: BrowserChartProps) => {
  return (
    <Card className="col-span-1 row-span-1 md:col-span-3 lg:col-span-2">
      <CardHeader>
        <h2 className="text-lg font-semibold">Top Browsers</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {data
            .sort((a, b) => b.amount - a.amount)
            .map((browser, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <p className="text-base font-semibold">
                  {browser.name === "" ? "Unknown" : browser.name}
                </p>
                <span className="text-sm font-bold">+{browser.amount}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowserChart;
