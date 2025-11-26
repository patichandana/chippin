import { Link } from "react-router-dom";
// import { useState } from "react";

export default function MySideNavBar({ isOpen}:{ isOpen?: boolean}) {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleNavbar = () => setIsOpen(!isOpen);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/notifications", label: "Notifications" },
    { to: "/create-expense", label: "Expenses" },
    { to: "/create-group", label: "Groups" },
    { to: "/friends", label: "Friends" },
  ];

  return (
    <nav className={`flex flex-col bg-gray-700 transition-all duration-300 ease-in-out ${isOpen ? "w-64":"w-0"} flex-shrink-0`}>
      {/* <button onClick={toggleNavbar}><Menu color='white' /></button> */}
      {links.map(({ to, label }) => (
        <Link key={to} to={to} className="text-white hover:bg-gray-700 rounded text-center p-2" >
          {label}
        </Link>
      ))}
    </nav>
  );
}
