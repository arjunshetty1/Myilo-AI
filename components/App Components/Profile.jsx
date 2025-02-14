"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/UI/shadcn-ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/UI/shadcn-ui/avatar"
import { Button } from "@/components/UI/shadcn-ui/button"
import { Input } from "@/components/UI/shadcn-ui/input"
import { LogOut, Edit2, Check, Loader2, User } from "lucide-react"
import { GetProfile, Logout, updateUserName } from "@/services/Profile"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/UI/shadcn-ui/skeleton"

const Account = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    imgUrl: "",
    usage: { newslettersDelivered: 0, newslettersGenerated: 0 },
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedUserName, setEditedUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsInitialLoading(true);
      try {
        const res = await GetProfile();
        setUserData(res);
        setEditedUserName(res.userName);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };
  
    fetchProfileData();
  }, [])

  const handleEditClick = () => {
    if (isEditing) {
      handleSaveClick()
    } else {
      setIsEditing(true)
      setEditedUserName(userData.username)
    }
  }

const handleSaveClick = async () => {
  setIsLoading(true);
  try {
    await updateUserName(editedUserName);
    const updatedProfile = await GetProfile();
    setUserData(updatedProfile);
    setIsEditing(false);
  } catch (error) {
    console.error("Failed to update username:", error);
  } finally {
    setIsLoading(false);
  }
}

  const handleLogout = async () => {
    const error = await Logout()
    if (!error) {
      router.push("/Login")
    }
  }

  const plan = "Free Trial"

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 ring-2 ring-white dark:ring-gray-800">
            {isInitialLoading ? (
              <Skeleton className="h-full w-full rounded-full" />
            ) : userData.imgUrl ? (
              <AvatarImage src={userData.imgUrl} alt={userData.username} />
            ) : (
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-1">
            {isInitialLoading ? (
              <Skeleton className="h-8 w-40" />
            ) : isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button onClick={handleSaveClick} size="sm" variant="ghost" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl font-bold">
                  {userData.username || "Loading..."}
                </CardTitle>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Email" value={userData.email} isLoading={isInitialLoading} className="truncate overflow-hidden text-ellipsis whitespace-nowrap" />
          <InfoItem label="Current Plan" value={plan} isLoading={isInitialLoading} />
          <InfoItem
            label="Newsletters Delivered"
            value={userData.usage.newslettersDelivered}
            isLoading={isInitialLoading}
          />
          <InfoItem
            label="Newsletters Received"
            value={userData.usage.newslettersGenerated}
            isLoading={isInitialLoading}
          />
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center space-y-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full sm:w-auto flex items-center justify-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
        <p className="text-xs text-center text-muted-foreground max-w-sm">
          Your username will be used to send emails. Please ensure it's correct.
        </p>
      </CardFooter>
    </Card>
  )
}

const InfoItem = ({ label, value, isLoading, className = "" }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    {isLoading ? <Skeleton className="h-5 w-20" /> : <span className={`font-medium ${className}`}>{value}</span>}
  </div>
)

export default Account
