"use client";
import { useEffect, useState } from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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
import { Skeleton } from "@/components/UI/shadcn-ui/skeleton";
import { GetViewsDeatils } from "@/services/Analytics";

const chartConfig = {
  desktop: {
    label: "View Count",
    color: "var(--red)",
  },
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function LineChartComponent() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);

      const startDate = formatDate(oneMonthAgo);
      const endDate = formatDate(today);

      const response = await GetViewsDeatils("month", startDate, endDate);

      const formattedData = response.map((item) => ({
        month: formatMonth(item.period),
        desktop: item.count,
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatMonth = (period) => {
    const [year, month] = period.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const calculateTrend = () => {
    if (chartData.length < 2) return 0;
    const lastMonth = chartData[chartData.length - 1].desktop;
    const previousMonth = chartData[chartData.length - 2].desktop;
    if (previousMonth === 0) return 100; // Avoid division by zero
    return ((lastMonth - previousMonth) / previousMonth) * 100;
  };

  const trend = calculateTrend();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>View Count</CardTitle>
          <CardDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-24" /> // Skeleton placeholder for description
            ) : (
              `${chartData[0]?.month || ""} - ${
                chartData[chartData.length - 1]?.month || ""
              } ${new Date().getFullYear()}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full rounded-md" /> // Skeleton placeholder for chart
          ) : (
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke={chartConfig.desktop.color}
                  strokeWidth={2}
                  dot={{
                    fill: chartConfig.desktop.color,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    dataKey="desktop"
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
