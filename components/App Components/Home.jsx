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
  <Card className="overflow-hidden rounded-xl border bg-opacity-50 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 bg-white/50 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-normal text-gray-600">{title}</CardTitle>
      <div className="p-2 rounded-lg bg-gray-100/50">
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-semibold text-gray-900 mb-1">{value}</div>
      <div className={`text-sm flex items-center ${change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
        {change >= 0 ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {Math.abs(change).toFixed(1)}%
      </div>
    </CardContent>
  </Card>
)

const LoadingSkeleton = () => (
  <div className="mx-auto px-4 md:px-44 py-8 animate-pulse">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-white/50 rounded-xl">
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
      <Card className="bg-white/50 rounded-xl">
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
    <div className="mx-auto px-4 md:px-32 pb-8 pt-6 bg-gray-50/50">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
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
        <Card className="rounded-xl border bg-white/50 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Newsletters</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Manage your latest content updates</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setactiveComponent("Posts")}
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-100/50"
                >
                  View All
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {newsletters.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-center">
                <div className="space-y-2">
                  <Mail className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-gray-500">No newsletters created yet</p>
                  <p className="text-sm text-gray-400">Start by creating your first newsletter</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200/50">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-sm font-medium text-gray-600">Title</th>
                      <th className="px-5 py-3.5 text-left text-sm font-medium text-gray-600 hidden md:table-cell">
                        Status
                      </th>
                      <th className="px-5 py-3.5 text-right text-sm font-medium text-gray-600">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/30">
                    {sortedNewsletters.map((item) => (
                      <tr
                        key={item.videoId}
                        onClick={() => handleRowClick(item)}
                        className="cursor-pointer hover:bg-gray-50/30 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              className="w-20 h-12 rounded-md object-cover mr-4 border"
                              alt="Thumbnail"
                            />
                            <span className="font-medium text-gray-800 text-sm md:text-base">
                              {item.newsletterData.title || "Untitled Newsletter"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            item.status === 'published' 
                              ? 'bg-emerald-100/50 text-emerald-700'
                              : 'bg-amber-100/50 text-amber-700'
                          }`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end">
                            <span className="text-gray-700 mr-2">{item.viewCount}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </td>
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