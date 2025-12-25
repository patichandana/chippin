// import DashboardLayout from "../layouts/DashboardLayout";
// import SideNavbar from "../components/ui/SideNavBar";
import MySideNavBar from "../components/ui/MySideNavBar";
import FlexNavBar from "../components/ui/FlexNavBar";
import { useState } from "react";
import Card from "../components/ui/Card";

export default function DashboardPage
() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col min-h-screen">
      <FlexNavBar toggleSidebar={() => setIsOpen(!isOpen)}/>
      
      <div className="flex flex-1">
        <MySideNavBar isOpen={isOpen}/>
        <main className="flex-1 bg-gray-50 p-4">
          <Card className="flex flex-col">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* You Owe */}
              <div className="flex flex-col 
                  lg:flex-row lg:gap-4
                  p-4 flex-1 rounded-xl bg-gray-600 shadow-lg">
                    <span className="text-sm md:text-base lg:text-2xl text-gray-100">You Owe</span>
                    <span className="text-3xl md:text-4xl 
                    lg:text-5xl lg:flex-1 lg:text-center
                   font-semibold text-gray-50 tracking-tight">₹1,250</span>
              </div>
              {/* You Are Owed */}
              <div className="flex flex-col
                  lg:flex-row lg:gap-4
                  p-4 flex-1 rounded-xl bg-gray-100 shadow">
                <span className="text-sm md:text-base lg:text-2xl text-gray-600">You Are Owed</span>
                <span className="text-3xl md:text-4xl lg:text-5xl lg:flex-1 lg:text-center
                    font-semibold text-gray-900 tracking-tight">₹3,400</span>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
    // <FlexNavBar />
    // < MySideNavBar />
    
  );
}