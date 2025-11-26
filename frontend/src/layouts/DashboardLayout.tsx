// // src/layouts/DashboardLayout.tsx
// import { useState } from "react";
// import FlexNavBar from "../components/ui/FlexNavBar";
// import FlexMainDiv from "../components/ui/FlexMainDiv";
// import Sidebar from "../components/ui/SideNavBar";
// import { Menu } from "lucide-react";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <FlexMainDiv className="bg-gray-100 md:flex-row min-h-screen md:overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} />

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar with hamburger */}
//         <div className="flex-shrink-0 border-b bg-gray-50">
//           <div className="flex items-center justify-between px-4 py-3 md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               <Menu className="w-6 h-6" />
//             </button>
//             <span className="font-semibold text-lg">Chippin</span>
//           </div>

//           {/* On larger screens, show your normal navbar */}
//           <div className="hidden md:block">
//             <FlexNavBar />
//           </div>
//         </div>

//         {/* Scrollable main content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {children}
//         </main>
//       </div>
//     </FlexMainDiv>
//   );
// }
