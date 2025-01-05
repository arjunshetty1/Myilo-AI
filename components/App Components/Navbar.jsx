"use client"

import { useState, useContext } from "react"
import { ActiveComponentWrapper } from "@/context/app/ActiveComponentContext"
// import AppTopBar from "@/components/Landing Page Components/AppTopBar"
import { Button } from "@/components/UI/shadcn-ui/button"

const tabs = [
  { name: "Create", component: "Create" },
  { name: "Dashboard", component: "Home" },
  { name: "Posts", component: "Posts" },
  { name: "Subscribers", component: "Subscribers" },
  { name: "More", component: "Stats" },
]

export default function Navbar() {
  const { setactiveComponent } = useContext(ActiveComponentWrapper)
  const [activeTab, setActiveTab] = useState("Create")

  const handleTabClick = (component) => {
    setactiveComponent(component)
    setActiveTab(component)
  }

  return (
    <div className="bg-background">
      {/* <AppTopBar /> */}
      <nav className="border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex justify-center">
            <div className="hidden sm:flex sm:space-x-8">
              {tabs.map((tab) => (
                <Button
                  key={tab.component}
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    activeTab === tab.component
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => handleTabClick(tab.component)}
                >
                  {tab.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden">
          <select
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
            value={activeTab}
            onChange={(e) => handleTabClick(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.component} value={tab.component}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </div>
  )
}