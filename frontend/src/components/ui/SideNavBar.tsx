// src/components/Sidebar.tsx
import { Home, Bell, List, Users, User, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export default function SideNavbar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const links = [
    { to: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
    { to: "/notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    {
      to: "/expenses",
      icon: <List className="w-5 h-5" />,
      label: "All Expenses",
      showPlus: true,
    },
    {
      to: "/groups",
      icon: <Users className="w-5 h-5" />,
      label: "Groups",
      showPlus: true,
    },
    {
      to: "/friends",
      icon: <User className="w-5 h-5" />,
      label: "Friends",
      showPlus: true,
    },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-20 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed md:static z-30 bg-gray-900 text-white h-full flex flex-col transition-all duration-300 
          ${isOpen ? "w-64" : "w-0 md:w-16"} overflow-hidden`}
      >
        <div className="flex items-center justify-center py-4 font-semibold text-xl border-b border-gray-800">
          {isOpen ? "Chippin" : "C"}
        </div>

        <nav className="flex flex-col gap-2 mt-6">
          {links.map(({ to, icon, label, showPlus }) => {
            const active = location.pathname === to;

            return (
              <div
                key={to}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${
                  active ? "bg-gray-800 font-semibold" : "text-gray-300"
                }`}
              >
                <Link to={to} className="flex items-center gap-3 flex-1">
                  {icon}
                  {isOpen && <span>{label}</span>}
                </Link>

                {/* Small + icon for create actions */}
                {showPlus && isOpen && (
                  <button
                    onClick={() => console.log(`Create new ${label}`)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition"
                  >
                    <Plus className="w-4 h-4 text-gray-300 hover:text-white" />
                  </button>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
