"use client"

import { useState, useContext } from "react"
import { ActiveComponentWrapper } from "@/context/app/ActiveComponentContext"
import { Button } from "@/components/UI/shadcn-ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/UI/shadcn-ui/sheet"
import { Menu } from "lucide-react"

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
  const [isOpen, setIsOpen] = useState(false)

  const handleTabClick = (component) => {
    setactiveComponent(component)
    setActiveTab(component)
    setIsOpen(false)
  }

  return (
    <>
      <div className="bg-background">
        <nav className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
            <div className="flex justify-center">
              {/* Desktop Navigation - Exactly as original */}
              <div className="hidden md:flex md:space-x-1 lg:space-x-8">
                {tabs.map((tab) => (
                  <Button
                    key={tab.component}
                    variant="ghost"
                    className={`px-2 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                      activeTab === tab.component ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => handleTabClick(tab.component)}
                  >
                    {tab.name}
                  </Button>
                ))}
              </div>

              {/* Mobile Navigation - Improved */}
              <div className="md:hidden flex items-center justify-between w-full py-2 fixed top-0 left-0 right-0 bg-background z-50 px-4 border-b">
                <span className="text-lg font-semibold text-foreground">
                  {tabs.find(tab => tab.component === activeTab)?.name}
                </span>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-foreground hover:bg-accent"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                    <div className="flex flex-col gap-2 mt-4">
                      {tabs.map((tab) => (
                        <Button
                          key={tab.component}
                          variant={activeTab === tab.component ? "secondary" : "ghost"}
                          className={`w-full justify-start text-left ${
                            activeTab === tab.component 
                              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
                              : "text-foreground hover:bg-accent"
                          }`}
                          onClick={() => handleTabClick(tab.component)}
                        >
                          {tab.name}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Spacer for mobile to prevent content overlap */}
      <div className="md:hidden h-[64px]" /> {/* Adjust height as needed */}
    </>
  )
}