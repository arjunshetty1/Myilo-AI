import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/UI/shadcn-ui/card";
import { Input } from "@/components/UI/shadcn-ui/input";
import { Skeleton } from "@/components/UI/shadcn-ui/skeleton";
import { CreateContextWrapper } from "@/context/global/GlobalContext";
import { ChannelData } from "@/services/ChannelData";
import { Calendar, Search, Mail, Youtube } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
    />
  </motion.div>
);

export function  Create() {
  const { setSelectedVideoId, setSelectedVideoThumbnail } =
    useContext(CreateContextWrapper);
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRouting, setIsRouting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const responseData = await ChannelData();
      setVideos(responseData.videos || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const FuncSelectedVideo = async (video) => {
    setIsRouting(true);
    setSelectedVideoId(video.contentDetails.videoId);
    setSelectedVideoThumbnail(video.snippet.thumbnails.high.url);
    router.push("/select-template");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredVideos = videos.filter((video) =>
    video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className=" mx-auto px-4 md:px-20 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Select Your Video for Newsletter
          </h1>
          <p className="text-xl text-gray-600">
            Transform your content into engaging newsletters that captivate your
            audience
          </p>
        </div>

        <div className="mb-10 relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for your next newsletter content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full text-base text-gray-800 placeholder-gray-400 border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 rounded-full shadow-lg bg-white"
            />
          </div>
        </div>

        <AnimatePresence>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-white shadow-lg rounded-xl h-[360px]"
                >
                  <Skeleton className="h-48 w-full bg-gray-200" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer bg-white rounded-xl h-[360px] group relative transition-all duration-300 ease-in-out transform hover:shadow-2xl"
                    onClick={() => FuncSelectedVideo(video)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        width={500}
                        height={500}
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white text-red-500 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Youtube className="w-4 h-4 mr-1" />
                        YouTube
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 h-14 overflow-ellipsis">
                        {video.snippet.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(video.contentDetails.videoPublishedAt)}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo via-indigo-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-100 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <div className="bg-white/20 rounded-full p-4 inline-block mb-4 backdrop-blur-sm">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-bold text-xl">Generate Newsletter</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>{isRouting && <LoadingOverlay />}</AnimatePresence>
      </div>
    </div>
  );
}

export default Create;
