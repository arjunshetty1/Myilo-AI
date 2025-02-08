"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/UI/shadcn-ui/button"
import { Input } from "@/components/UI/shadcn-ui/input"
import { InputWithButton } from "@/components/UI/shadcn-ui/InputWithButton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/shadcn-ui/pagination"
import { RiadialChartShape } from "@/components/UI/shadcn-ui/RadialChartShape"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/UI/shadcn-ui/tooltip"
import { GetSubscribers, PostSubscribers, DeleteSubscribers } from "@/services/Subscribers"
import TableComponent from "./TableComponent"
import { Radarchart } from "@/components/UI/shadcn-ui/RadarChart"
import { NewsletterSubscriberAnalyitics } from "@/services/Analytics"
import { GetProfile } from "@/services/Profile"
import Papa from "papaparse"
import { FileUp, FileDown, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/UI/shadcn-ui/card" // Import Card and CardContent
import { Share2 } from "lucide-react"

const SkeletonChart = () => <div className="animate-pulse bg-gray-200 h-32 w-full rounded-xl"></div>

const SkeletonTable = () => (
  <div className="animate-pulse space-y-2 h-full">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="h-12 bg-gray-200 rounded-lg w-full"></div>
    ))}
  </div>
)

const SkeletonInput = () => <div className="animate-pulse bg-gray-200 h-10 rounded-full w-64 mb-6"></div>

const SkeletonIcon = () => <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>

const SkeletonContainer = () => (
  <div className="animate-pulse flex space-x-4">
    <SkeletonIcon />
    <SkeletonIcon />
    <SkeletonIcon />
    <SkeletonIcon />
  </div>
)

export default function Subscribers() {
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [limit] = useState(9)
  const [emailSearch, setEmailSearch] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalSubscribers, setTotalSubscribers] = useState(0)
  const [selectedSubscribers, setSelectedSubscribers] = useState([])
  const [chartData, setChartData] = useState([])
  const [chartLoading, setChartLoading] = useState(true)
  const [isLinkCopying, setIsLinkCopying] = useState(false)

  const { toast } = useToast()

  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchSubscribers(pageNumber)
    fetchChartData()
  }, [pageNumber])

  const fetchSubscribers = async (page) => {
    setLoading(true)
    try {
      const response = await GetSubscribers(page, limit)
      setData(response.items)
      setTotalPages(response.totalPages)
      setTotalSubscribers(response.totalItems)
    } catch (error) {
      console.error("Error fetching subscribers:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchChartData = async () => {
    setChartLoading(true)
    try {
      const { startDate, endDate } = getLastSixMonthsRange()
      const result = await NewsletterSubscriberAnalyitics("month", startDate, endDate)

      const transformedData = result.map((item) => ({
        month: getMonthName(item.period),
        desktop: item.count,
      }))

      setChartData(transformedData)
    } catch (error) {
      console.error("Error fetching chart data:", error)
    } finally {
      setChartLoading(false)
    }
  }

  const handleAddEmail = async () => {
    if (newEmail && newEmail.includes("@") && newEmail.includes(".")) {
      try {
        await PostSubscribers([newEmail])
        setNewEmail("")

        toast({
          variant: "outline",
          title: "Email added successfully!",
          className: "bg-[white]",
        })

        fetchSubscribers(1)
      } catch (error) {
        console.error("Error adding email:", error)

        toast({
          variant: "destructive",
          title: "Failed! Please try later.",
        })
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please add a valid E-mail ID.",
      })
    }
  }

  const handlePaginationNext = (e) => {
    e.preventDefault()
    if (pageNumber < totalPages) {
      setPageNumber((prevPage) => prevPage + 1)
    }
  }

  const handlePaginationPrevious = (e) => {
    e.preventDefault()
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1)
    }
  }

  const handleCopyLink = async () => {
    setIsLinkCopying(true)
    try {
      const profile = await GetProfile()
      const ID = profile.userId
      if (!ID) {
        throw new Error("Failed to get user ID")
      }
      const copyText = `https://clipmailo.com/s/${ID}`
      await navigator.clipboard.writeText(copyText)

      toast({
        variant: "outline",
        title: "Invite link copied to clipboard!",
        description: "Share it with others to grow your subscriber list.",
        className: "bg-[white]",
      })
    } catch (error) {
      console.error("Failed to copy link:", error)

      toast({
        variant: "destructive",
        title: "Failed to copy invite link",
        description: "Please try again later",
      })
    } finally {
      setIsLinkCopying(false)
    }
  }

  const exportSubscribersToCSV = () => {
    const csvRows = []
    const headers = ["Email"]
    csvRows.push(headers.join(","))

    data.forEach((subscriber) => {
      const row = [subscriber.email]
      csvRows.push(row.join(","))
    })

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "subscribers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          try {
            const emails = results.data.map((row) => row.Email).filter((email) => email)
            await PostSubscribers({ emails })

            toast({
              variant: "outline",
              title: "Subscribers imported successfully!",
              className: "bg-[white]",
            })

            fetchSubscribers(1)
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Failed to import subscribers. Please try again.",
              className: "bg-[white]",
            })
          }
        },
        error: (error) => {
          toast({
            variant: "destructive",
            title: "Failed to parse CSV file. Please ensure it is correctly formatted.",
          })
        },
      })
    } else {
      toast({
        variant: "destructive",
        title: "Please upload a valid CSV file.",
      })
    }
  }

  const handleDeleteSelected = async () => {
    try {
      await DeleteSubscribers(selectedSubscribers)
      setSelectedSubscribers([])
      fetchSubscribers(pageNumber)

      toast({
        variant: "outline",
        title: "Selected subscribers deleted successfully.",
        className: "bg-[white]",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete selected subscribers. Please try again.",
      })
    }
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex-grow flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-semibold">Subscribers</h2>
              <div className="flex flex-wrap items-center gap-2">
                {loading ? (
                  <SkeletonContainer />
                ) : (
                  <>
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            onClick={handleCopyLink}
                            disabled={isLinkCopying}
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            {isLinkCopying ? "Copying..." : "Share Invite Link"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-gray-800 text-white p-2 rounded-md">
                          <p>Click to copy your unique invite link and grow your audience!</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="outline" onClick={handleImportClick} className="rounded-full">
                            <FileDown className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Import Subscribers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={exportSubscribersToCSV}
                            className="rounded-full"
                          >
                            <FileUp className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Export Subscribers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {selectedSubscribers.length > 0 && (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={handleDeleteSelected}
                              className="rounded-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Selected ({selectedSubscribers.length})</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </>
                )}
              </div>
            </div>
            {loading ? (
              <SkeletonInput />
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <Input
                  type="email"
                  placeholder="Search by email"
                  className="w-full sm:w-auto flex-grow rounded-full"
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                />
                <InputWithButton
                  newEmail={newEmail}
                  setNewEmail={setNewEmail}
                  addEmailUser={handleAddEmail}
                  className="w-full sm:w-auto"
                />
              </div>
            )}
            <div className="flex-grow overflow-hidden rounded-xl ">
              {loading ? (
                <SkeletonTable />
              ) : data.length > 0 ? (
                <div className="h-full overflow-y-auto">
                  <TableComponent
                    key={`table-${pageNumber}`}
                    setEmailSearch={setEmailSearch}
                    emailSearch={emailSearch}
                    data={data}
                    selectedSubscribers={selectedSubscribers}
                    setSelectedSubscribers={setSelectedSubscribers}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No subscribers available</p>
                </div>
              )}
            </div>
            <Pagination className="mt-6 flex justify-center sm:justify-start">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePaginationPrevious}
                    className={`${pageNumber === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 py-2">
                    Page {pageNumber} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handlePaginationNext}
                    className={`${pageNumber === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <div className="space-y-8 flex flex-col">
          <Card className="w-full">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 pt-3">Subscriber Overview</h3>
              {chartLoading ? (
                <SkeletonChart />
              ) : (
                <div className="w-full max-w-xs mx-auto">
                  <RiadialChartShape totalSubscribers={totalSubscribers} />
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 pt-3">Growth Trend</h3>
              {chartLoading ? (
                <SkeletonChart />
              ) : (
                <div className="w-full h-64 sm:h-full">
                  <Radarchart chartData={chartData} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper function to calculate the last 6 months' date range
const getLastSixMonthsRange = () => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 5)
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  }
}

// Helper function to convert period to month name
const getMonthName = (period) => {
  const date = new Date(`${period}-01`)
  return date.toLocaleString("default", { month: "short" })
}

