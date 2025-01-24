"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/UI/shadcn-ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/shadcn-ui//avatar"
import { Button } from "@/components/UI/shadcn-ui/button"
import { LogOut } from "lucide-react"

const Account = ({ userName = "Arjun Shetty", avatarUrl, memberSince = 23, accountType }) => {
  const getInitials = (name) => {
    const names = name.split(" ")
    const initials = names.reduce((acc, curr) => acc + curr[0], "")
    return initials.toUpperCase().slice(0, 2)
  }

  const initials = getInitials(userName)

  // Dummy numbers for newsletters
  const newslettersGenerated = 15
  const newslettersReceived = 42

  return (
    <Card className="w-full min-w-[25rem] ml-auto h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-xl font-semibold">{userName}</CardTitle>
            <p className="text-sm text-muted-foreground">{accountType} Account</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Member since {memberSince} days</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Newsletters Generated</span>
              <span className="text-lg font-semibold">{newslettersGenerated}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Newsletters Received</span>
              <span className="text-lg font-semibold">{newslettersReceived}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Account

