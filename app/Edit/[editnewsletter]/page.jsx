"use client";
import PreviewMockupLaptop from "@/components/App Components/PreviewMockupLaptop";
import PreviewMockupMobile from "@/components/App Components/PreviewMockupMobile";
import PreviewMockupTab from "@/components/App Components/PreviewMockupTab";
import GeneralOne from "@/components/Newsletter Templates/GeneralOne";
import GeneralThree from "@/components/Newsletter Templates/GeneralThree";
import GeneralTwo from "@/components/Newsletter Templates/GeneralTwo";
import MinimalTwo from "@/components/Newsletter Templates/MiinimalTwo";
import MinimalFour from "@/components/Newsletter Templates/MinimalFour";
import MinimalOne from "@/components/Newsletter Templates/MinimalOne";
import MinimalThree from "@/components/Newsletter Templates/MinimalThree";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Input } from "@/components/UI/shadcn-ui/input";

import DeepDiveOne from "@/components/Newsletter Templates/DeepDiveOne";
import DeepDiveTwo from "@/components/Newsletter Templates/DeepDiveTwo";
import QuickReadOne from "@/components/Newsletter Templates/QuickReadOne";
import QuickReadTwo from "@/components/Newsletter Templates/QuickReadTwo";
import StoryDrivenOne from "@/components/Newsletter Templates/StoryDrivenOne";
import StoryDrivenTwo from "@/components/Newsletter Templates/StoryDrivenTwo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/shadcn-ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/UI/shadcn-ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/shadcn-ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  GetNewsletterByID,
  PublishNewsetter,
  SendTestMail,
  UpdateNewsletter,
} from "@/services/Newsletter";
import { AnimatePresence, motion } from "framer-motion";
import {
  EditIcon,
  EyeIcon,
  LaptopIcon,
  Loader2Icon,
  blueoIcon,
  RotateCcwIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  UndoIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  </motion.div>
);

export default function ImprovedNewsletteblueitor() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("laptop");
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [dataToTemplate, setDataToTemplate] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showTestMailModal, setShowTestMailModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("edit");
  const [previewScale, setPreviewScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);

  const pathname = usePathname();
  const { toast } = useToast();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (pathname == "/Edit/undefined") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to generate newsletter. Please try again",
      });

      router.push("/Application");
    }
  }, [pathname]);

  useEffect(() => {
    fetchNewsletter();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      updatePreviewScale();
    };

    window.addEventListener("resize", handleResize);
    updatePreviewScale();

    return () => window.removeEventListener("resize", handleResize);
  }, [previewDevice]);

  const updatePreviewScale = () => {
    const containerHeight = window.innerHeight - 200;
    let deviceHeight;

    switch (previewDevice) {
      case "mobile":
        deviceHeight = 667;
        break;
      case "tablet":
        deviceHeight = 1024;
        break;
      case "laptop":
        deviceHeight = 768;
        break;
      default:
        deviceHeight = 667;
    }

    const scale = Math.min(containerHeight / deviceHeight, 1);
    setPreviewScale(scale);
  };

  const fetchNewsletter = async () => {
    setIsLoading(true);
    try {
      const response = await GetNewsletterByID(id);
      setCurrentTemplate(response.templateId);
      setThumbnail(response.thumbnail);

      const Data = response.editedData;
      console.log("editData is here", Data);
      setDataToTemplate(Data);
      setHistory([Data]);
      setHistoryIndex(0);
    } catch (error) {
      console.error("Error fetching newsletter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await PublishNewsetter(id);
      setIsRouting(true);
      router.push(`/postdetails/${id}`);
      setTimeout(() => {
        toast({
          variant: "outline",
          title: "Published Successfully!",
          description: "Your newsletter has been published successfully.",
          className: "bg-[white]",
        });
      }, 3000);
    } catch (error) {
      console.error("Error publishing newsletter:", error);
    } finally {
      setIsPublishing(false);
      setShowPublishModal(false);
    }
  };

  const TestMail = async (email) => {
    setIsSendingTest(true);
    try {
      await SendTestMail(id, email);
      toast({
        variant: "outline",
        title: "Test email sent!",
        description: `A test newsletter has been sent to ${email}`,
        className: "bg-[white]",
      });
      setShowTestMailModal(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send test email",
        description: "Please try again later",
      });
      console.log(error);
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleTestEmailSubmit = (e) => {
    e.preventDefault();
    if (!testEmail) {
      toast({
        variant: "destructive",
        title: "Email requiblue",
        description: "Please enter an email address",
      });
      return;
    }
    TestMail(testEmail);
  };

  const addToHistory = useCallback(
    (data) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(data);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setDataToTemplate(history[historyIndex - 1]);
    }
  }, [historyIndex, history]);

  const blueo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setDataToTemplate(history[historyIndex + 1]);
    }
  }, [historyIndex, history]);

  const reset = useCallback(() => {
    setDataToTemplate(history[0]);
    setHistory([history[0]]);
    setHistoryIndex(0);
  }, [history]);

  const handleContentUpdate = (updatedData) => {
    setDataToTemplate(updatedData);
    addToHistory(updatedData);
  };

  const rendeblueitor = () => {
    if (!dataToTemplate) return null;

    const templateProps = {
      dataToTemplate,
      thumbnail,
      isEditing,
      onUpdate: handleContentUpdate,
    };

    switch (currentTemplate) {
      case 0:
        return <GeneralOne {...templateProps} />;
      case 1:
        return <GeneralTwo {...templateProps} />;
      case 2:
        return <GeneralThree {...templateProps} />;
      case 3:
        return <MinimalOne {...templateProps} />;
      case 4:
        return <MinimalTwo {...templateProps} />;
      case 5:
        return <MinimalThree {...templateProps} />;
      case 6:
        return <MinimalFour {...templateProps} />;
      case 7:
        return <StoryDrivenOne {...templateProps} />;
      case 8:
        return <StoryDrivenTwo {...templateProps} />;
      case 9:
        return <DeepDiveOne {...templateProps} />;
      case 10:
        return <DeepDiveTwo {...templateProps} />;
      case 11:
        return <QuickReadOne {...templateProps} />;
      case 12:
        return <QuickReadTwo {...templateProps} />;
      default:
        return <GeneralOne {...templateProps} />;
    }
  };

  const SaveEdited = async () => {
    try {
      const response = await UpdateNewsletter(dataToTemplate, id);
      // Validate response has requiblue structure
      if (!response || typeof response !== "object") {
        throw new Error("Invalid response format");
      }
      return response;
    } catch (error) {
      console.error("Error saving newsletter:", error);
      throw error;
    }
  };

  const toggleEditing = useCallback(async () => {
    if (isEditing) {
      try {
        setIsSaving(true);
        const response = await SaveEdited();
        fetchNewsletter();

        if (response) {
          setDataToTemplate((prev) => {
            const newData = {
              ...prev,
              ...response,
            };
            return newData;
          });

          await new Promise((resolve) => setTimeout(resolve, 0));

          toast({
            variant: "outline",
            title: "Newsletter saved to draft!",
            description:
              "You can always head to drafts section then edit and publish the newsletter.",
            className: "bg-[white]",
          });

          // Then toggle editing state
          setIsEditing(false);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error saving newsletter",
          description: "Failed to save changes. Please try again.",
        });
        return;
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(true);
    }
  }, [isEditing, dataToTemplate]);

  const renderPreview = () => {
    let PreviewComponent;
    let wrapperClass;

    switch (previewDevice) {
      case "tablet":
        PreviewComponent = PreviewMockupTab;
        wrapperClass = "w-[768px] h-[800px]";
        break;
      case "laptop":
        PreviewComponent = PreviewMockupLaptop;
        wrapperClass = "w-[1366px] h-[768px]";
        break;
      default:
        PreviewComponent = PreviewMockupMobile;
        wrapperClass = "w-full";
    }

    console.log("edit data", dataToTemplate);
    return (
      <div className="w-full flex justify-center items-center">
        <div
          className={`w-full overflow-hidden transform origin-top`}
          // style={{ transform: `scale(${previewScale})` }}
        >
          <PreviewComponent
            template={currentTemplate}
            thumbnail={thumbnail}
            dataToTemplate={dataToTemplate}
          />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <span className="text-gray-700 text-lg ml-3">
            {" "}
            Loading newsletter...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-2 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto space-y-6  rounded-xl p-4 sm:p-8">
        <Tabs
          defaultValue="edit"
          className="w-full"
          onValueChange={(value) => setCurrentTab(value)}
        >
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            {currentTab === "edit" && (
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={undo}
                        disabled={historyIndex === 0}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <UndoIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Undo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={blueo}
                        disabled={historyIndex === history.length - 1}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <blueoIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>blueo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={reset}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <RotateCcwIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPublishModal(true)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowTestMailModal(true);
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Send Test Mail
              </Button>
            </div>
          </div>

          <TabsContent value="edit" className="mt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleEditing}
                className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                  isEditing ? "bg-blue-500 text-white" : ""
                }`}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  <>
                    <SaveIcon className="w-4 h-4 mr-1" />
                    Save
                  </>
                ) : (
                  <>
                    <EditIcon className="w-4 h-4 mr-1" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            <div className="border rounded-lg lg:px-[21rem] md:px-[3rem] px-4  py-8 overflow-y-auto bg-white ">
              {rendeblueitor()}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                    previewDevice === "mobile" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <SmartphoneIcon className="w-4 h-4 mr-1" /> Mobile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewDevice("tablet")}
                  className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                    previewDevice === "tablet" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <TabletIcon className="w-4 h-4 mr-1" /> Tablet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewDevice("laptop")}
                  className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                    previewDevice === "laptop" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <LaptopIcon className="w-4 h-4 mr-1" /> Laptop
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" /> Full Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>Newsletter Preview</DialogTitle>
                    <DialogDescription>
                      Here's how your newsletter will appear.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 overflow-auto max-h-[calc(90vh-120px)]">
                    {renderPreview()}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="w-full min-h-[70dvh] border rounded-lg p-8 overflow-hidden flex justify-center items-center">
              {renderPreview()}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Publish Confirmation Modal */}
      <Dialog
        open={showPublishModal}
        onOpenChange={() => setShowPublishModal(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Newsletter</DialogTitle>
            <DialogDescription>
              Are you sure you want to publish this newsletter? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPublishModal(false)}
              disabled={isPublishing}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Mail Modal */}
      <Dialog
        open={showTestMailModal}
        onOpenChange={(open) => {
          setShowTestMailModal(open);
          if (!open) setTestEmail("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Test Mail</DialogTitle>
            <DialogDescription>
              Enter an email address to receive a preview of your newsletter.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTestEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="testEmail" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="testEmail"
                type="email"
                placeholder="Enter email address"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                requiblue
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="outline">
                {isSendingTest ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Test Mail"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowTestMailModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AnimatePresence>{isRouting && <LoadingOverlay />}</AnimatePresence>
    </div>
  );
}
