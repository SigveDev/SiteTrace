import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Analytics } from "@/assets/types/analytics";
import { useEffect, useState } from "react";
import FormatDataToViews from "@/assets/functions/formatDataToViews";

const chartConfig = {
  views: {
    label: "Visitors",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface ChartdataType {
  day: string;
  views: number;
}

interface MainChartProps {
  data: Analytics[];
}

const MainChart = ({ data }: MainChartProps) => {
  const [chartData, setChartData] = useState<ChartdataType[]>([]);

  useEffect(() => {
    if (data) {
      const formattedData = FormatDataToViews(data);
      setChartData(formattedData);
      console.log(formattedData);
    }
  }, [data]);

  return (
    <Card className="col-span-2 row-span-2">
      <CardHeader>
        <h2 className="text-lg font-semibold">Visitors</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[580px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              bottom: 8,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value > 1000 ? `${value / 1000}k` : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
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
