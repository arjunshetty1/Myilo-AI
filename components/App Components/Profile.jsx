"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/UI/shadcn-ui/card";
import { Avatar } from "@/components/UI/shadcn-ui/avatar";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Input } from "@/components/UI/shadcn-ui/input";
import { LogOut, Edit2, Check } from "lucide-react";
import { GetProfile, Logout, updateUserName } from "@/services/Profile";
import { useRouter } from "next/navigation";

const Account = (
  {
    // initialUserName = "Arjun Shetty",
    // avatarUrl,
    // memberSince = 23,
    // accountType,
    // plan = "Pro",
    // email = "arjun.shetty@example.com",
  }
) => {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const prifleData = async () => {
      const res = await GetProfile();
      setuserData(res);
      console.log("user info", res);
    };

    prifleData();
  }, []);
  const [userName, setUserName] = useState(userData.username);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = async () => {
    await updateUserName(userName);
  };
  const memberSince = 23;
  const plan = "Pro";
  // const getInitials = (name) => {
  //   const names = name.split(" ");
  //   const initials = names.reduce((acc, curr) => acc + curr[0], "");
  //   return initials.toUpperCase().slice(0, 2);
  // };

  // const initials = getInitials(userName);

  const router = useRouter();

  const handleLogout = async () => {
    const error = await Logout();
    if (!error) {
      router.push("/Login");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 ring-2 ring-white dark:ring-gray-800">
            {/* <AvatarImage src={avatarUrl} alt={userName} /> */}
            {/* <AvatarFallback className="text-lg">{initials}</AvatarFallback> */}
          </Avatar>
          <div className="space-y-1">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button onClick={handleSaveClick} size="sm" variant="ghost">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl font-bold">{userName}</CardTitle>
                <Button onClick={handleEditClick} size="sm" variant="ghost">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            {/* <p className="text-sm text-muted-foreground">
              {accountType} Account
            </p> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Member since" value={`${memberSince} days`} />
          <InfoItem label="Email" value={userData.email} />
          <InfoItem label="Current Plan" value={plan} />
          <InfoItem
            label="Newsletters Delivered"
            value={userData?.usage?.newslettersDelivered}
          />
          <InfoItem
            label="Newsletters Received"
            value={userData?.usage?.newslettersGenerated}
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
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default Account;
