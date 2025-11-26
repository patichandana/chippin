// import DashboardLayout from "../layouts/DashboardLayout";
// import SideNavbar from "../components/ui/SideNavBar";
import MySideNavBar from "../components/ui/MySideNavBar";
import FlexNavBar from "../components/ui/FlexNavBar";
import { useState } from "react";
import { CreateExpense } from "./CreateExpense";

export default function DashboardPage
() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col min-h-screen">
      <FlexNavBar toggleSidebar={() => setIsOpen(!isOpen)}/>
      
      <div className="flex flex-1">
        <MySideNavBar isOpen={isOpen}/>
        <main className="flex-1 bg-gray-50 p-4">
          <h1 className="text-2xl mb-4 text-white">Dashboard</h1>
          <CreateExpense />
        </main>
      </div>
    </div>
    // <FlexNavBar />
    // < MySideNavBar />
    
  );
}