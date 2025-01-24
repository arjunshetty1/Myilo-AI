"use client";
import { GetNewsletterByID } from "@/services/Newsletter";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/shadcn-ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/UI/shadcn-ui/chart";
import { Progress } from "@/components/UI/shadcn-ui/progress";
import { Skeleton } from "@/components/UI/shadcn-ui/skeleton";
import { GetIndividualNewsletterData } from "@/services/Analytics";
import { motion } from "framer-motion";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import TemplateOne from "@/components/Newsletter Templates/GeneralOne";
import TemplateTwo from "@/components/Newsletter Templates/GeneralTwo";
import TemplateThree from "@/components/Newsletter Templates/GeneralThree";
import MinimalOne from "@/components/Newsletter Templates/MinimalOne";
import MinimalTwo from "@/components/Newsletter Templates/MiinimalTwo";
import MinimalThree from "@/components/Newsletter Templates/MinimalThree";
import MinimalFour from "@/components/Newsletter Templates/MinimalFour";
import StoryDrivenOne from "@/components/Newsletter Templates/StoryDrivenOne";
import StoryDrivenTwo from "@/components/Newsletter Templates/StoryDrivenTwo";
import DeepDiveOne from "@/components/Newsletter Templates/DeepDiveOne";
import DeepDiveTwo from "@/components/Newsletter Templates/DeepDiveTwo";
import QuickReadOne from "@/components/Newsletter Templates/QuickReadOne";
import QuickReadTwo from "@/components/Newsletter Templates/QuickReadTwo";

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex gap-8">
      <Skeleton className="h-[600px] w-2/3" />
      <div className="w-1/3 space-y-6">
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, change }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

const Page = () => {
  const [editedData, setNewsletterData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [Analytics, setAnalytics] = useState(null);
  const [dataToTemplate, setdataToTemplate] = useState("");
  const [thumbnail, setthumbnail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchNewsletter(), NewsletterAnyaltics()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchNewsletter = async () => {
    try {
      const response = await GetNewsletterByID(id);
      setNewsletterData(response);
      setCurrentTemplate(response.templateId);
      setthumbnail(response.thumbnail);
      const str = response.editedData;
      setdataToTemplate(str);
    } catch (error) {
      console.error("Error fetching newsletter:", error);
    }
  };

  const NewsletterAnyaltics = async () => {
    try {
      const response = await GetIndividualNewsletterData(id);
      setAnalytics(response);
    } catch (error) {
      console.log(error);
    }
  };

  function getPercentageChange(currentCount, prevCount) {
    if (prevCount === 0) {
      if (currentCount === 0) {
        return "No data yet to show! Keep creating";  // Return this when there's no data
      }
      return "+100% from last month";
    }
  
    const percentageChange = ((currentCount - prevCount) / prevCount) * 100;
    if (isNaN(percentageChange)) {
      return "No data yet to show! Keep creating";  // Catch any unexpected NaN results
    }
  
    const sign = percentageChange >= 0 ? "+" : "";
    return `${sign}${percentageChange.toFixed(1)} percent from last month`;
  }
  
  

  const rendeblueitor = () => {
    if (dataToTemplate) {
      switch (currentTemplate) {
        case 0:
          return (
            <TemplateOne
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 1:
          return (
            <TemplateTwo
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 2:
          return (
            <TemplateThree
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 3:
          return (
            <MinimalOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
          );
        case 4:
          return (
            <MinimalTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
          );
        case 5:
          return (
            <MinimalThree
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 6:
          return (
            <MinimalFour
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 7:
          return (
            <StoryDrivenOne
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 8:
          return (
            <StoryDrivenTwo
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 9:
          return (
            <DeepDiveOne
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 10:
          return (
            <DeepDiveTwo
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 11:
          return (
            <QuickReadOne
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );
        case 12:
          return (
            <QuickReadTwo
              dataToTemplate={dataToTemplate}
              thumbnail={thumbnail}
            />
          );

        default:
          return null;
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <motion.div className="md:mx-[5%] mx-[5%]" variants={itemVariants}>
        <div className="flex md:gap-6 gap-4 items-center md:my-3 mt-3">
          <IoChevronBackCircle
            onClick={() => router.back()}
            size={35}
            color="#3b82f6"
            className="cursor-pointer mt-0"
          />
          <div className="flex flex-col text-sm">
            <p>Post Details</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-full bg-[#D8D8D8] h-[1px]"
        variants={itemVariants}
      ></motion.div>

      <motion.div className="lg:mx-[8%] mx-[0%] mt-12" variants={itemVariants}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-2">
                <Card className="xl:col-span-2">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                    <CardTitle>{editedData?.title || "Newsletter"}</CardTitle>


                      <CardDescription>
                        Posted on{" "}
                        {editedData?.createdAt
                          ? new Date(
                              editedData.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="w-full flex md:flex-row items-start gap-10 flex-col-reverse">
                    <motion.div
                      className="md:w-[70%] w-full"
                      variants={itemVariants}
                    >
                      {rendeblueitor()}
                    </motion.div>

                    <motion.div
                      className="grid md:w-[30%] w-full grid-cols-1 gap-[1.5rem] md:gap-[2rem] md:content-start"
                      variants={itemVariants}
                    >
                      <Card className="max-w-xs">
                        <CardHeader className="space-y-0 pb-0">
                          <CardDescription>Open Rate Over Time</CardDescription>
                          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                            {Analytics?.currentNewsletter?.viewCount ?? "N/A"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ChartContainer
                            config={{
                              openrate: {
                                label: "openrate",
                                color: "hsl(var(--chart-2))",
                              },
                            }}
                          >
                            <AreaChart
                              accessibilityLayer
                              data={[
                                {
                                  "Open Rate":
                                    Analytics?.previousNewsletterAverage
                                      ?.openRate ?? "N/A",
                                },
                                {
                                  "Open Rate":
                                    Analytics?.currentNewsletter?.openRate ??
                                    "N/A",
                                },
                              ]}
                              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                              <XAxis dataKey="date" hide />
                              <YAxis
                                domain={["dataMin - 5", "dataMax + 2"]}
                                hide
                              />
                              <defs>
                                <linearGradient
                                  id="fillTime"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="var(--color-openrate)"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="var(--color-openrate)"
                                    stopOpacity={0.1}
                                  />
                                </linearGradient>
                              </defs>
                              <Area
                                dataKey="Open Rate"
                                type="natural"
                                fill="url(#fillTime)"
                                fillOpacity={0.4}
                                stroke="var(--color-openrate)"
                              />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                                formatter={(value) => (
                                  <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                    Open Rate
                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                      {/* {value} */}
                                      {isNaN(value) ? value : value.toFixed(3)}
                                      <span className="font-normal text-muted-foreground"></span>
                                    </div>
                                  </div>
                                )}
                              />
                            </AreaChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                      <StatCard
                        title="Newsletter Views"
                        value={Analytics?.currentNewsletter?.viewCount ?? "N/A"}
                        change={getPercentageChange(
                          Analytics?.currentNewsletter?.viewCount,
                          Analytics?.previousNewsletterAverage?.viewCount
                        )}
                      />
                      {/* <StatCard
                        title="Video Duration Processed"
                        value={`${
                          Analytics?.currentNewsletter
                            ?.videoDurationProcessed ?? "N/A"
                        } minutes`}
                        change={getPercentageChange(
                          Analytics?.currentNewsletter?.videoDurationProcessed,
                          Analytics?.previousNewsletterAverage
                            ?.videoDurationProcessed
                        )}
                      /> */}
                      <StatCard
                        title="Open Rate"
                        value={
                          Analytics?.currentNewsletter?.openRate ?? "N/A"
                          +
                        isNaN(Analytics?.currentNewsletter?.openRate) ? "N/A" : Analytics?.currentNewsletter?.openRate
                      }
                        change={getPercentageChange(
                          Analytics?.currentNewsletter?.openRate,
                          Analytics?.previousNewsletterAverage?.openRate
                        )}
                      />
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Engagement Score</CardDescription>
                          <CardTitle className="text-4xl">
                            {Analytics?.currentNewsletter?.engagementScore.toFixed(
                              2
                            ) ?? "N/A"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-xs text-muted-foreground">
                            {getPercentageChange(
                              Analytics?.currentNewsletter?.engagementScore,
                              Analytics?.previousNewsletterAverage
                                ?.engagementScore
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Progress
                            value={
                              Analytics?.currentNewsletter?.engagementScore
                            }
                            aria-label={`${Analytics?.currentNewsletter?.engagementScore} engagement`}
                          />
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
