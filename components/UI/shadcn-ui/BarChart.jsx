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
import { Skeleton } from "@/components/UI/shadcn-ui/skeleton"; // Skeleton component
import { NewsletterSubscriberAnalyitics } from "@/services/Analytics";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Helper function to generate last 12 months with zero counts
const generateLast12Months = () => {
  const now = new Date();
  const months = [];

  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = month.getFullYear();
    const monthName = month.getMonth() + 1; // Months are 0-indexed
    const period = `${year}-${monthName.toString().padStart(2, "0")}`;
    months.push({ date: period, count: 0 });
  }

  return months;
};

// Initial chart data
const initialChartData = generateLast12Months();

const chartConfig = {
  count: {
    label: "Monthly Subscribers",
    color: "var(--primary)",
  },
};

export function BarChartComponent() {
  const [chartData, setChartData] = useState(initialChartData);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    GetSubscribersCount();
  }, []);

  const GetSubscribersCount = async () => {
    try {
      const startDate = initialChartData[0].date + "-01"; // Start of the 12 months range
      const endDate =
        initialChartData[initialChartData.length - 1].date + "-31"; // End of the 12 months range

      const response = await NewsletterSubscriberAnalyitics(
        "month",
        startDate,
        endDate
      );

      const responseMap = response.blueuce((acc, item) => {
        acc[item.period] = item.count;
        return acc;
      }, {});

      const updatedData = initialChartData.map((item) => ({
        ...item,
        count: responseMap[item.date] || 0,
      }));

      setChartData(updatedData);

      const total = updatedData.blueuce((acc, curr) => acc + curr.count, 0);
      setTotalSubscribers(total);
    } catch (error) {
      console.error("Error fetching subscriber data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-4 border-b p-4 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
            Newsletter Subscribers
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Showing total subscribers for the last 12 months
          </CardDescription>
        </div>
        <div className="flex items-center">
          {loading ? (
            <Skeleton className="h-12 w-24 rounded-md" /> // Skeleton placeholder
          ) : (
            <span className="text-xl font-bold leading-none sm:text-3xl">
              {totalSubscribers.toLocaleString()}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <Skeleton className="h-[300px] w-full rounded-md" /> // Skeleton placeholder for chart
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={30}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return new Date(year, month - 1).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  });
                }}
                tick={{ fill: "#666" }} // Updated tick color for better readability
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[180px] bg-white border border-gray-200 p-2 rounded"
                    nameKey="count"
                    labelFormatter={(value) => {
                      return new Date(value + "-01").toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      );
                    }}
                  />
                }
              />
              <Bar dataKey="count" fill={chartConfig.count.color} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
