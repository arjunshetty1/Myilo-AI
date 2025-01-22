"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/shadcn-ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/UI/shadcn-ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

// Helper function to generate the date range label
const getDateRangeLabel = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 5);

  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });
  const year = endDate.getFullYear();

  return `${startMonth}-${endMonth} ${year}`;
};

// Function to calculate percentage change
const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export function Radarchart({ chartData }) {
  const chartConfig = {
    subscribers: {
      label: "Subscribers",
      color: "var(--primary)",
    },
  };

  // Calculate the percentage change
  let percentageChange = 0;
  if (chartData && chartData.length > 1) {
    const currentMonthData = chartData[chartData.length - 1].desktop;
    const previousMonthData = chartData[chartData.length - 2].desktop;
    percentageChange = calculatePercentageChange(
      currentMonthData,
      previousMonthData
    );
  }

  const isTrendingUp = percentageChange >= 0;

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle className="text-base">Subscribers Chart</CardTitle>
        <CardDescription className="text-center">
          {getDateRangeLabel()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {chartData && chartData.length === 0 ? (
          <div className="text-center text-sm mb-5">No data available</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[220px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                name="Subscribers"
                dataKey="desktop" // Updated to match the data structure
                stroke={chartConfig.subscribers.color}
                fill={chartConfig.subscribers.color}
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
