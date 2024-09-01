import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AnalyticsOverTime } from "@/assets/types/totalAnalytics";
import { useState, useEffect } from "react";
import FormatDataToInteractions from "@/assets/functions/formatDataToInteractions";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "#2563eb",
  },
} as ChartConfig;

interface ChartdataType {
  day: string;
  interactions: number;
}

interface InteractionsChartProps {
  data: AnalyticsOverTime[];
  startDate: Date;
  endDate: Date;
}

const InteractionsChart = ({
  data,
  startDate,
  endDate,
}: InteractionsChartProps) => {
  const [chartData, setChartData] = useState<ChartdataType[]>([]);

  useEffect(() => {
    if (data && startDate && endDate) {
      const formattedData = FormatDataToInteractions(data, startDate, endDate);
      setChartData(formattedData);
    }
  }, [data, startDate, endDate]);

  return (
    <Card className="col-span-1 row-span-1 md:col-span-6 lg:col-span-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">Interactions</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[230px]">
          <BarChart
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
              tickFormatter={(value) => value.slice(0, 5).replace("-", ".")}
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
            <Bar
              dataKey="interactions"
              fill="var(--color-clicks)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InteractionsChart;
