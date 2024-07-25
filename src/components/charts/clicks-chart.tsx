import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { day: "24", clicks: 186 },
  { day: "23", clicks: 305 },
  { day: "22", clicks: 237 },
  { day: "21", clicks: 73 },
  { day: "20", clicks: 209 },
  { day: "19", clicks: 214 },
  { day: "18", clicks: 310 },
  { day: "17", clicks: 234 },
  { day: "16", clicks: 263 },
  { day: "15", clicks: 287 },
  { day: "14", clicks: 312 },
  { day: "13", clicks: 291 },
  { day: "12", clicks: 292 },
  { day: "11", clicks: 310 },
  { day: "10", clicks: 234 },
];

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "#2563eb",
  },
} as ChartConfig;

const ClicksChart = () => {
  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader>
        <h2 className="text-lg font-semibold">Interactions</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[230px]">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar
              dataKey="clicks"
              fill="var(--color-clicks)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ClicksChart;
