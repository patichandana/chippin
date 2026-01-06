// import DashboardLayout from "../layouts/DashboardLayout";
// import SideNavbar from "../components/ui/SideNavBar";
import MySideNavBar from "../components/ui/SideNavBar";
import FlexNavBar from "../components/ui/FlexNavBar";
import { useState } from "react";
import Card from "../components/ui/Card";
import TotalBalanceSummary from "../components/ui/TotalBalanceSummary";
import PendingSplitsSummary from "../components/ui/PendingSplitsSummary";

export default function DashboardPage
() {
  const [isOpen, setIsOpen] = useState(true);

  // Sample data for pending splits is defined within the component, can be fetched from backend later
  // amount is being considered as string for simplicity. It should be a number once integrated with backend.
  // We should deal with currency formatting as well. We must internationalize later.
  
  return (
    <div className="flex flex-col min-h-screen">
      <FlexNavBar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        <MySideNavBar isOpen={isOpen} />
        <main className="flex-1 bg-gray-50 p-4">
          <Card className="flex flex-col">

            {/* Balance Summary */}
            <TotalBalanceSummary />


            {/* Pending Splits Section */}
            <PendingSplitsSummary />

          </Card>
        </main>
      </div>
    </div>
    // <FlexNavBar />
    // < MySideNavBar />
  );
}