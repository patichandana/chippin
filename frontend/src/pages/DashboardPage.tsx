// import DashboardLayout from "../layouts/DashboardLayout";
// import SideNavbar from "../components/ui/SideNavBar";
import MySideNavBar from "../components/ui/MySideNavBar";
import FlexNavBar from "../components/ui/FlexNavBar";
import { useState } from "react";
import Card from "../components/ui/Card";
import PendingSplitsRow  from "../components/ui/PendingsplitsRow"

export default function DashboardPage
() {
  const [isOpen, setIsOpen] = useState(true);

  // Sample data for pending splits, can be fetched from backend later
  // amount is being considered as string for simplicity. It should be a number once integrated with backend.
  // We should deal with currency formatting as well. We must internationalize later.
  const pendingSplits = [
    {
      id: 1,
      name: "Birthday House",
      date: "Mar 24",
      amount: "₹1,250.00",
      status: "You Pay",
    },
    {
      id: 2,
      name: "Shopping",
      date: "Mar 22",
      amount: "₹3,400.00",
      status: "You Get",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <FlexNavBar toggleSidebar={() => setIsOpen(!isOpen)}/>
      
      <div className="flex flex-1">
        <MySideNavBar isOpen={isOpen}/>
        <main className="flex-1 bg-gray-50 p-4">
          <Card className="flex flex-col">

            {/* Balance Summary */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* You Owe */}
              <div className="flex flex-col 
                  lg:flex-row lg:gap-4
                  p-4 flex-1 rounded-xl bg-slate-600 shadow-lg">
                    <span className="text-sm md:text-base lg:text-2xl text-gray-100">You Pay</span>
                    <span className="text-3xl md:text-4xl 
                    lg:text-5xl lg:flex-1 lg:text-center
                   font-semibold text-neutral-50 tracking-tight">₹1,250</span>
              </div>
              {/* You Are Owed */}
              <div className="flex flex-col
                  lg:flex-row lg:gap-4
                  p-4 flex-1 rounded-xl bg-gray-100 shadow">
                <span className="text-sm md:text-base lg:text-2xl text-gray-600">You Get</span>
                <span className="text-3xl md:text-4xl lg:text-5xl lg:flex-1 lg:text-center
                    font-semibold text-gray-900 tracking-tight">₹3,400</span>
              </div>
            </div>

            <h2 className="text-2xl text-gray-800 mt-6 mb-4 tracking-wide">Pending Splits</h2>
            {/* Pending Splits List */}
            <div className="bg-white rounded-xl shadow-sm p-0 sm:p-4">
              {/* Header */}
              <div className="hidden sm:flex items-center text-sm text-gray-500 font-medium pb-3 border-b">
                <div className="flex-1">Name</div>
                <div className="hidden sm:block sm:w-32">Date</div>
                <div className="w-32 text-right">Total</div>
                <div className="w-32 text-right">Status</div>
              </div>
              {/* Pending Split Items */}
              <div className="divide-y">

                {pendingSplits.map(split => (
                  <PendingSplitsRow
                    key={split.id}
                    name={split.name}
                    date={split.date}
                    amount={split.amount}
                    status={split.status}
                  />
                ))}
                

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