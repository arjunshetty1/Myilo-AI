"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Clock,
  Mail,
  TrendingDown,
  TrendingUp,
  Users,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react"
import { Button } from "@/components/UI/shadcn-ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/shadcn-ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/shadcn-ui/popover"
import { GetUsageDetails, GetViewsDeatils, NewsletterSubscriberAnalyitics } from "@/services/Analytics"
import { GetNewsletterList } from "@/services/Newsletter"
import { GetProfile } from "@/services/Profile"

const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

const StatCard = ({ title, value, change, icon: Icon }) => (
  <Card className="overflow-hidden rounded-lg border-none shadow-sm transition-all duration-300 hover:shadow-md bg-white">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <Icon className="h-5 w-5 text-gray-400" />
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <p className="text-xs text-gray-500 mt-1 flex items-center">
        <span className={`${change >= 0 ? "text-green-500" : "text-red-500"} font-medium flex items-center`}>
          {change >= 0 ? (
            <TrendingUp className="inline h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="inline h-3 w-3 mr-1" />
          )}
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="ml-1">from last month</span>
      </p>
    </CardContent>
  </Card>
)

const LoadingSkeleton = () => (
  <div className="mx-auto px-4 py-8 animate-pulse">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-white rounded-lg">
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
    <div className="mt-8">
      <Card className="bg-white rounded-lg">
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
    </div>
  </div>
)

const Home = ({ setactiveComponent }) => {
  const [newsletters, setNewsletters] = useState([])
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({})
  const [usageData, setUsageData] = useState({})
  const [openRate, setOpenRate] = useState(0)
  const [changePercentage, setChangePercentage] = useState(0)
  const [averageSubscribers, setAverageSubscribers] = useState(0)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "descending" })
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [profileResponse, usageResponse, newsletterResponse, openRateResponse, subscriberResponse] =
          await Promise.all([
            GetProfile(),
            GetUsageDetails(),
            GetNewsletterList(1, 7, "draft"),
            fetchOpenRateData(),
            fetchSubscriberData(),
          ])

        setProfileData(profileResponse)
        setUsageData(usageResponse)
        setNewsletters(newsletterResponse.items || [])
        setOpenRate(openRateResponse.openRate)
        setChangePercentage(openRateResponse.changePercentage)
        setAverageSubscribers(subscriberResponse)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const fetchOpenRateData = async () => {
    const today = new Date()
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate())

    const formatDate = (date) => date.toISOString().split("T")[0]

    try {
      const [currentMonthData, prevMonthData] = await Promise.all([
        GetViewsDeatils("month", formatDate(oneMonthAgo), formatDate(today)),
        GetViewsDeatils("month", formatDate(twoMonthsAgo), formatDate(oneMonthAgo)),
      ])

      const currentRate = currentMonthData[0]?.count || 0
      const prevRate = prevMonthData[0]?.count || 0

      const openRate = currentRate
      const changePercentage = calculatePercentageChange(currentRate, prevRate)

      return { openRate, changePercentage }
    } catch (error) {
      console.error("Error fetching open rate data:", error)
      return { openRate: 0, changePercentage: 0 }
    }
  }

  const fetchSubscriberData = async () => {
    try {
      const today = new Date()
      const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)

      const startDate = oneWeekAgo.toISOString().split("T")[0]
      const endDate = today.toISOString().split("T")[0]

      const response = await NewsletterSubscriberAnalyitics("month", startDate, endDate)

      if (response && response.length) {
        const totalSubscribers = response.reduce((sum, item) => sum + item.count, 0)
        return (totalSubscribers / 7).toFixed(1)
      }
      return 0
    } catch (error) {
      console.error("Error fetching subscriber data:", error)
      return 0
    }
  }

  const sortedNewsletters = [...newsletters]
    .filter((item) => statusFilter === "all" || item.status === statusFilter)
    .sort((a, b) => {
      if (!sortConfig.key) return 0
      let aValue, bValue

      switch (sortConfig.key) {
        case "title":
          aValue = a.newsletterData.title.toLowerCase()
          bValue = b.newsletterData.title.toLowerCase()
          break
        case "date":
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        case "views":
          aValue = a.viewCount
          bValue = b.viewCount
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1
      return 0
    })

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "ascending" ? "descending" : "ascending"
    }
    setSortConfig({ key, direction })
  }

  if (loading) return <LoadingSkeleton />

  const totalNewsletters = profileData?.usage?.newslettersGenerated || 0
  const prevMonthNewsletters = usageData?.prevMonth?.count || 0
  const newsletterChange = calculatePercentageChange(totalNewsletters, prevMonthNewsletters)

  const videoDuration = profileData?.usage?.totalVideoDurationProcessed || 0
  const prevMonthDuration = usageData?.prevMonth?.totalProcessedDuration || 0
  const durationChange = calculatePercentageChange(videoDuration, prevMonthDuration)

  const subscriberChange = calculatePercentageChange(averageSubscribers, usageData?.prevMonth?.averageSubscribers || 0)

  const handleRowClick = (item) => {
    const linkHref = item.status === "published" ? `/postdetails/${item._id}` : `/Edit/${item._id}`
    router.push(linkHref)
  }

  return (
    <div className="mx-auto px-4 md:px-6 pb-8 pt-4 bg-gray-50">
        <h1 className="text-2xl font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Dashboard</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Total Newsletters" value={totalNewsletters} change={newsletterChange} icon={Mail} />
        <StatCard
          title="Read time"
          value={`${videoDuration.toFixed(2)} min`}
          change={durationChange}
          icon={Clock}
        />
        <StatCard title="Open Rate" value={`${openRate}%`} change={changePercentage} icon={Mail} />
        <StatCard title="Avg. New Subscribers" value={averageSubscribers} change={subscriberChange} icon={Users} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <Card className="rounded-lg shadow-sm overflow-hidden border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div>
              <CardTitle className="text-lg font-medium text-gray-800">Recent Newsletters</CardTitle>
              <p className="text-sm text-gray-500">Recently generated and sent newsletters</p>
            </div>
            <Button
              onClick={() => setactiveComponent("Posts")}
              size="sm"
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {newsletters.length === 0 ? (
              <div className="flex items-center justify-center h-[18rem] text-center text-gray-500">
                <div>
                  <p>No newsletters available.</p>
                  <p className="mt-1">Create your first newsletter!</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thumbnail
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex items-center">
                              Title
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => requestSort("title")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Sort A-Z
                              </button>
                              <button
                                onClick={() => requestSort("title")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Sort Z-A
                              </button>
                              <button
                                onClick={() => requestSort("date")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Newest First
                              </button>
                              <button
                                onClick={() => requestSort("date")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Oldest First
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex items-center">
                              Status
                              <Filter className="ml-1 h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => setStatusFilter("all")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                All
                              </button>
                              <button
                                onClick={() => setStatusFilter("published")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Published
                              </button>
                              <button
                                onClick={() => setStatusFilter("draft")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Draft
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex items-center justify-end w-full">
                              Views
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => requestSort("views")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Highest to Lowest
                              </button>
                              <button
                                onClick={() => requestSort("views")}
                                className="text-left hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                Lowest to Highest
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedNewsletters.map((item) => (
                      <tr
                        key={item.videoId}
                        onClick={() => handleRowClick(item)}
                        className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt="Video Thumbnail"
                            className="w-16 h-9 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.newsletterData.title || "Untitled"}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">{item.viewCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Home

