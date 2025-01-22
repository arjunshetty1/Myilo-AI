"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/UI/shadcn-ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/shadcn-ui/pagination";
import { Badge } from "@/components/UI/shadcn-ui/badge";
import { GetNewsletterCount, GetNewsletterList } from "@/services/Newsletter";
import { CalendarIcon, FileTextIcon, PenIcon } from "lucide-react";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white p-4 rounded-lg shadow">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-20 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
);

export default function Posts() {
  const [selectedTab, setSelectedTab] = useState("published");
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(12);
  const [totalNewsletter, setTotalNewsletter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsletters(currentPage, itemsPerPage, selectedTab);
    fetchNewsletterCount();
  }, [selectedTab, currentPage, itemsPerPage]);

  const fetchNewsletters = async (page, items, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await GetNewsletterList(page, items, status);
      if (response && Array.isArray(response.items)) {
        setNewsletters(response.items);
        setTotalItems(response.totalItems || 0);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      setError("Failed to fetch newsletters. Please try again.");
      setNewsletters([]); // Ensure `newsletters` is an array even on error
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsletterCount = async () => {
    try {
      const response = await GetNewsletterCount();
      setTotalNewsletter(response);
    } catch (error) {
      console.error("Error fetching newsletter count:", error);
      setTotalNewsletter(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderNewsletters = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(itemsPerPage)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-blue-500 text-center py-8">{error}</div>;
    }

    if (!Array.isArray(newsletters) || newsletters.length === 0) {
      return (
        <div className="text-gray-500 text-center py-8">
          No newsletters available.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsletters.map((newsletter) => {
          if (!newsletter) return null;
          const title = newsletter.newsletterData.title || "Untitled"; // Access title from the parsed data

          const linkHref =
            newsletter.status === "published"
              ? `/postdetails/${newsletter._id}`
              : `/Edit/${newsletter._id}`;

          return (
            <Link href={linkHref} key={newsletter._id} className="group">
              <div className="bg-white p-4 rounded-lg transition-all border border-[#e1e1e1] hover:scale-105  duration-300 hover:shadow-xl max-h-[15rem] min-h-[15rem] overflow-ellipsis">
                <h3 className="font-medium text-base mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  {title}
                </h3>

                {newsletter.thumbnail && (
                  <img
                    src={newsletter.thumbnail}
                    alt={title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      newsletter.status === "published" ? "default" : "default"
                    }
                    className="text-[10px] bg-[var(--primary)]"
                  >
                    {newsletter.status === "published" ? (
                      <FileTextIcon className="w-3 h-3 mr-1" />
                    ) : (
                      <PenIcon className="w-3 h-3 mr-1" />
                    )}
                    {newsletter.status.charAt(0).toUpperCase() +
                      newsletter.status.slice(1)}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {formatDate(newsletter.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePaginationNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePaginationPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-10 md:px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
        Posts
      </h1>
      <Tabs
        defaultValue={selectedTab}
        onValueChange={handleTabChange}
        className="w-full mb-6"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="published" className="text-sm ">
            Published ({totalNewsletter?.publishedCount || 0})
          </TabsTrigger>
          <TabsTrigger value="draft" className="text-sm bg-primary">
            Drafts ({totalNewsletter?.draftCount || 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="published">{renderNewsletters()}</TabsContent>
        <TabsContent value="draft">{renderNewsletters()}</TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePaginationPrevious}
                className={`${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handlePaginationNext}
                className={`${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
