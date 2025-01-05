"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/UI/shadcn-ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/shadcn-ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/shadcn-ui/table";
import {
  GetUsageDetails,
  GetViewsDeatils,
  NewsletterSubscriberAnalyitics,
} from "@/services/Analytics";
import { ChannelData } from "@/services/ChannelData";
import { GetNewsletterList } from "@/services/Newsletter";
import { GetProfile } from "@/services/Profile";
import { motion } from "framer-motion";
import { Clock, Mail, TrendingDown, TrendingUp, Users } from "lucide-react";

const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    return current === 0 ? 0 : 0;
  }
  const change = ((current - previous) / previous) * 100;
  return change;
};

const StatCard = ({ title, value, change, icon: Icon }) => (
  <Card className="overflow-hidden rounded-lg">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-semibold text-gray-800">
        {title}
      </CardTitle>
      <Icon className="h-5 w-5 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-gray-500 mt-1">
        <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
          {change >= 0 ? (
            <TrendingUp className="inline h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="inline h-3 w-3 mr-1" />
          )}
          {Math.abs(change).toFixed(1)}%
        </span>
        {change >= 0 ? " increase" : " decrease"} from last month
      </p>
    </CardContent>
  </Card>
);

const LoadingSkeleton = () => (
  <div className="mx-auto px-4 md:px-20 py-8 animate-pulse">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-gray-100 rounded-lg">
          <CardHeader className="space-y-0 pb-2">
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 bg-gray-100 rounded-lg">
        <CardHeader>
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-100 rounded-lg">
        <CardHeader>
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(2)].map((_, index) => (
              <div key={index}>
                <div className="h-40 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Home = ({ setactiveComponent }) => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [usageData, setUsageData] = useState({});
  const [openRate, setOpenRate] = useState(0);
  const [changePercentage, setChangePercentage] = useState(0);
  const [averageSubscribers, setAverageSubscribers] = useState(0);
  const [recentVideos, setRecentVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          profileResponse,
          usageResponse,
          newsletterResponse,
          openRateResponse,
          subscriberResponse,
          channelDataResponse,
        ] = await Promise.all([
          GetProfile(),
          GetUsageDetails(),
          GetNewsletterList(1, 7, "draft"),
          fetchOpenRateData(),
          fetchSubscriberData(),
          ChannelData(),
        ]);

        setProfileData(profileResponse);
        setUsageData(usageResponse);
        setNewsletters(newsletterResponse.items || []); // Use .items here
        setOpenRate(openRateResponse.openRate);
        setChangePercentage(openRateResponse.changePercentage);
        setAverageSubscribers(subscriberResponse);
        setRecentVideos(channelDataResponse.videos.slice(0, 2));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchOpenRateData = async () => {
    const today = new Date();
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const twoMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 2,
      today.getDate()
    );

    const formatDate = (date) => date.toISOString().split("T")[0];

    try {
      const [currentMonthData, prevMonthData] = await Promise.all([
        GetViewsDeatils("month", formatDate(oneMonthAgo), formatDate(today)),
        GetViewsDeatils(
          "month",
          formatDate(twoMonthsAgo),
          formatDate(oneMonthAgo)
        ),
      ]);

      const currentRate = currentMonthData[0]?.count || 0;
      const prevRate = prevMonthData[0]?.count || 0;

      const openRate = currentRate;
      const changePercentage = calculatePercentageChange(currentRate, prevRate);

      return { openRate, changePercentage };
    } catch (error) {
      console.error("Error fetching open rate data:", error);
      return { openRate: 0, changePercentage: 0 };
    }
  };

  const fetchSubscriberData = async () => {
    try {
      const today = new Date();
      const oneWeekAgo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );

      const startDate = oneWeekAgo.toISOString().split("T")[0];
      const endDate = today.toISOString().split("T")[0];

      const response = await NewsletterSubscriberAnalyitics(
        "month",
        startDate,
        endDate
      );

      if (response && response.length) {
        const totalSubscribers = response.reduce(
          (sum, item) => sum + item.count,
          0
        );
        return (totalSubscribers / 7).toFixed(1);
      }
      return 0;
    } catch (error) {
      console.error("Error fetching subscriber data:", error);
      return 0;
    }
  };

  if (loading) return <LoadingSkeleton />;

  const totalNewsletters = profileData?.usage?.newslettersGenerated || 0;
  const prevMonthNewsletters = usageData?.prevMonth?.count || 0;
  const newsletterChange = calculatePercentageChange(
    totalNewsletters,
    prevMonthNewsletters
  );

  const videoDuration = profileData?.usage?.totalVideoDurationProcessed || 0;
  const prevMonthDuration = usageData?.prevMonth?.totalProcessedDuration || 0;
  const durationChange = calculatePercentageChange(
    videoDuration,
    prevMonthDuration
  );

  const subscriberChange = calculatePercentageChange(
    averageSubscribers,
    usageData?.prevMonth?.averageSubscribers || 0
  );

  const handleRowClick = (item) => {
    const linkHref =
      item.status === "published"
        ? `/postdetails/${item._id}`
        : `/Edit/${item._id}`;
    router.push(linkHref);
  };
  return (
    <div className=" mx-auto px-4 md:px-24 py-8 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          title="Total Newsletters"
          value={totalNewsletters}
          change={newsletterChange}
          icon={Mail}
        />
        <StatCard
          title="Video Duration Processed"
          value={`${videoDuration.toFixed(2)} min`}
          change={durationChange}
          icon={Clock}
        />
        <StatCard
          title="Open Rate"
          value={`${openRate}%`}
          change={changePercentage}
          icon={Mail}
        />
        <StatCard
          title="Avg. New Subscribers"
          value={averageSubscribers}
          change={subscriberChange}
          icon={Users}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 grid gap-6 lg:grid-cols-3"
      >
        <Card className="lg:col-span-2 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Newsletters</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Recently generated and sent newsletters
              </CardDescription>
            </div>
            <Button
              onClick={() => setactiveComponent("Posts")}
              size="sm"
              className="bg-[var(--third)] hover:bg-[var(--third-hover)] text-white"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {newsletters.length === 0 ? (
              <div className="flex items-center justify-center h-[18rem] text-center text-gray-500">
                <div>
                  <p>No newsletters available.</p>
                  <p className="mt-1">Create your first newsletter!</p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Newsletter</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Title
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="text-right">Views</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {newsletters.map((item) => (
                    <TableRow
                      key={item.videoId}
                      onClick={() => handleRowClick(item)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <TableCell>
                        <img
                          src={item.thumbnail}
                          alt="Video Thumbnail"
                          style={{
                            width: "80px",
                            height: "auto",
                            borderRadius: "4px",
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.newsletterData.title || "Untitled"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.status}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.viewCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recent YouTube Videos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentVideos.map((video) => (
              <div key={video.id} className="space-y-2">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full rounded-lg object-cover"
                />
                <h3 className="font-semibold line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
                <Button
                  onClick={() => setactiveComponent("Create")}
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  <h1>Generate Newsletter</h1>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
