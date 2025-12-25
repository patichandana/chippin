import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { Menu, Split } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import Avatar from "./Avatar";
import { useState, useRef, useEffect } from "react";

export default function FlexNavBar({ toggleSidebar }: { toggleSidebar?: () => void }) {
    const { user, isLoggedIn, loading, logout} = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return null;

    return (
        <header className="flex items-center p-2 h-14 bg-slate-700 flex-shrink-0">

            {/* LEFT SECTION */}
            {isLoggedIn && (
                <button onClick={toggleSidebar} className="text-white hover:bg-slate-600">
                    <Menu />
                </button>
            )}

            <div className="flex mx-10 items-center space-x-2 text-2xl font-light italic cursor-pointer">
                <div className="bg-white rounded">
                    <Split />
                </div>
                <Link to="/" className="text-white">chippin</Link>
            </div>

            {/* RIGHT SECTION */}
            <div className="ml-auto flex items-center space-x-4 relative" ref={dropdownRef}>
                {isLoggedIn && (
                    <>
                        <button
                            className="mx-8"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <Avatar seed={user.email} size={35} />
                        </button>

                        {/* DROPDOWN MENU */}
                        {open && (
                            <div className="absolute right-4 top-14 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                                <button
                                    onClick={()=> {
                                        console.log("Profile button clicked");
                                        setOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                    Profile
                                </button>

                                <button
                                    onClick={() => {
                                        logout();
                                        console.log("Log Out button clicked");
                                        setOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!isLoggedIn && (
                    <nav className="space-x-4 flex">
                        <Link to="/login" className="w-auto">
                            <Button className="w-auto px-6 py-2 bg-blue-500">
                                Log In
                            </Button>
                        </Link>
                        <Link to="/signup" className="w-auto">
                            <Button className="w-auto px-6 py-2 bg-green-600 hover:bg-green-700">
                                Sign Up
                            </Button>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
