import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "../ui/card";

const chartData = [
  { month: "24", views: 186 },
  { month: "23", views: 305 },
  { month: "22", views: 321 },
  { month: "21", views: 245 },
  { month: "20", views: 275 },
  { month: "19", views: 285 },
  { month: "18", views: 310 },
  { month: "17", views: 234 },
  { month: "16", views: 263 },
  { month: "15", views: 287 },
  { month: "14", views: 312 },
  { month: "13", views: 291 },
  { month: "12", views: 292 },
  { month: "11", views: 310 },
  { month: "10", views: 234 },
];

const chartConfig = {
  views: {
    label: "Visitors",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const MainChart = () => {
  return (
    <Card className="col-span-2 row-span-2">
      <CardHeader>
        <h2 className="text-lg font-semibold">Visitors</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[580px]">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value > 1000 ? `${value / 1000}k` : value
              }
            />
            <Area
              dataKey="views"
              fill="var(--color-views)"
              type="natural"
              fillOpacity={0.4}
              stroke="var(--color-views)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MainChart;
