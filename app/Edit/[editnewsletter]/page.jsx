"use client";
import GeneralOne from "@/components/Newsletter Templates/GeneralOne";
import GeneralThree from "@/components/Newsletter Templates/GeneralThree";
import GeneralTwo from "@/components/Newsletter Templates/GeneralTwo";
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
  LaptopIcon,
  Loader2Icon,
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

export default function ImprovedNewsletterEditor() {
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

  const fetchNewsletter = async () => {
    setIsLoading(true);
    try {
      const response = await GetNewsletterByID(id);
      setCurrentTemplate(response.templateId);
      setThumbnail(response.thumbnail);
      const Data = response.editedData;
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
        title: "Email required",
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

  const redo = useCallback(() => {
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

  const renderEditor = () => {
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
        return <MinimalThree {...templateProps} />;
      case 5:
        return <MinimalFour {...templateProps} />;
      case 6:
        return <StoryDrivenOne {...templateProps} />;
      case 7:
        return <StoryDrivenTwo {...templateProps} />;
      case 8:
        return <DeepDiveOne {...templateProps} />;
      case 9:
        return <DeepDiveTwo {...templateProps} />;
      case 10:
        return <QuickReadOne {...templateProps} />;
      case 11:
        return <QuickReadTwo {...templateProps} />;
      default:
        return <GeneralOne {...templateProps} />;
    }
  };

  const SaveEdited = async () => {
    try {
      const response = await UpdateNewsletter(dataToTemplate, id);
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
          setDataToTemplate((prev) => ({ ...prev, ...response }));
          toast({
            variant: "outline",
            title: "Newsletter saved to draft!",
            description:
              "You can always head to drafts section then edit and publish the newsletter.",
            className: "bg-[white]",
          });
          setIsEditing(false);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error saving newsletter",
          description: "Failed to save changes. Please try again.",
        });
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(true);
    }
  }, [isEditing, dataToTemplate]);

  const renderPreview = () => (
    <div className="w-full h-full flex justify-center items-center p-2 sm:p-4">
      <div className="text-center p-8 max-w-md">
        <div className="mb-4 animate-bounce">
          <LaptopIcon className="w-12 h-12 text-gray-300 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Preview Unavailable
        </h3>
        <p className="text-gray-500 mb-4">
          We're working hard to bring you live previews! In the meantime, you
          can use the test email feature to see how your newsletter looks.
        </p>
        <Button
          onClick={() => setShowTestMailModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          ✉️ Send Test Email
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          <span className="text-gray-700 text-lg">Loading newsletter...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-2 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto space-y-6 rounded-xl p-4 sm:p-8 bg-white shadow-lg border border-gray-100">
        <Tabs defaultValue="edit" onValueChange={setCurrentTab}>
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <TabsList className="flex-nowrap bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="edit"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md"
              >
                Edit
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md"
              >
                Preview
              </TabsTrigger>
            </TabsList>

            {currentTab === "edit" && (
              <div className="flex gap-2">
                <TooltipProvider>
                  {/* Undo Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={undo}
                        disabled={!isEditing || historyIndex === 0}
                        className="rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <UndoIcon className="w-4 h-4 text-gray-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {!isEditing
                        ? "Enable editing to undo changes"
                        : historyIndex === 0
                        ? "No changes to undo"
                        : `Undo last change (${historyIndex} left)`}
                    </TooltipContent>
                  </Tooltip>

                  {/* Redo Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={redo}
                        disabled={
                          !isEditing || historyIndex === history.length - 1
                        }
                        className="rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <UndoIcon className="w-4 h-4 rotate-180 text-gray-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {!isEditing
                        ? "Enable editing to redo changes"
                        : historyIndex === history.length - 1
                        ? "No changes to redo"
                        : `Redo next change (${
                            history.length - historyIndex - 1
                          } left)`}
                    </TooltipContent>
                  </Tooltip>

                  {/* Reset Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={reset}
                        disabled={!isEditing}
                        className="rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <RotateCcwIcon className="w-4 h-4 text-gray-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {!isEditing
                        ? "Enable editing to reset changes"
                        : "Reset to last saved version"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                onClick={() => setShowPublishModal(true)}
                disabled={isPublishing}
                className="bg-gradient-to-b from-green-50 to-green-100 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                {isPublishing ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>Publish</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTestMailModal(true)}
                className="bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              >
                Send Test Mail
              </Button>
            </div>
          </div>

          <TabsContent value="edit">
            <div className="mb-4">
              <Button
                onClick={toggleEditing}
                disabled={isSaving}
                className={`w-full sm:w-auto transition-all ${
                  isEditing
                    ? "bg-gradient-to-b from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg"
                    : "bg-gradient-to-b from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  <>
                    <SaveIcon className="w-4 h-4 mr-1" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <EditIcon className="w-4 h-4 mr-1" />
                    Enable Editing
                  </>
                )}
              </Button>
              {!isEditing && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  {historyIndex > 0
                    ? `You have ${historyIndex} unsaved changes`
                    : "All changes saved"}
                </p>
              )}
            </div>

            <div className="border rounded-lg p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white overflow-y-auto shadow-inner">
              <div className="max-w-4xl mx-auto">{renderEditor()}</div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="flex gap-2 flex-wrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        disabled
                        className="bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        <SmartphoneIcon className="w-4 h-4 mr-1" /> Mobile
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview coming soon!</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        disabled
                        className="bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        <TabletIcon className="w-4 h-4 mr-1" /> Tablet
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview coming soon!</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        disabled
                        className="bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        <LaptopIcon className="w-4 h-4 mr-1" /> Laptop
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview coming soon!</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      disabled
                      className="bg-gray-100 text-gray-400 cursor-not-allowed"
                    >
                      Full Preview
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Full preview coming soon!</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="w-full h-[70dvh] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
              {renderPreview()}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
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
                  "Publish Now"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPublishModal(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showTestMailModal} onOpenChange={setShowTestMailModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Test Email</DialogTitle>
              <DialogDescription>
                Enter an email address to send a preview of your newsletter.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTestEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSendingTest}
                  variant="outline"
                >
                  {isSendingTest ? (
                    <>
                      <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Test Email"
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
      </div>

      <AnimatePresence>{isRouting && <LoadingOverlay />}</AnimatePresence>
    </div>
  );
}
