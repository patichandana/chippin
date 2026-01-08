import { Link } from "react-router-dom";
// import { useState } from "react";

export default function SideNavBar({ isOpen}:{ isOpen?: boolean}) {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleNavbar = () => setIsOpen(!isOpen);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/create-expense", label: "Expenses" },
    { to: "/create-group", label: "Groups" },
  ];

  return (
    <nav className={`text-base flex flex-col bg-slate-700 pt-8 transition-all duration-300 ease-in-out ${isOpen ? "w-64":"w-0"} flex-shrink-0`}>
      {/* <button onClick={toggleNavbar}><Menu color='white' /></button> */}
      {links.map(({ to, label }) => (
        <Link key={to} to={to} className="text-white hover:bg-slate-600 rounded text-center p-2 tracking-wide" >
          {label}
        </Link>
      ))}
    </nav>
  );
}
