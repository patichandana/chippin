import { Link } from "react-router-dom"
import Button from "../ui/Button"   
import { Menu, Split } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import Avatar from "./Avatar";

export default function FlexNavBar({toggleSidebar}: {toggleSidebar?: () => void}) {
    const { user, isLoggedIn, loading } = useAuth();
    console.log("FlexNavBar - isLoggedIn:", isLoggedIn);

    if (loading) {
        return null; // or a loading spinner
    }
    return (
        <header className="flex items-center p-2 h-14 bg-gray-700 flex-shrink-0">

            {/* LEFT SECTION */}
            {isLoggedIn && (
                <button onClick={toggleSidebar} className="text-white"><Menu/></button>
            )}
            
            <div className="flex mx-10 items-center space-x-2 text-2xl font-light italic cursor-pointer">
                <div className="bg-white rounded">
                    <Split/>
                </div>
                <Link to="/" className="text-white">chippin</Link>
            </div>

            {/* RIGHT SECTION */}
            <div className="ml-auto flex items-center space-x-4">
                {isLoggedIn && (
                    <button className="mx-8 "
                        onClick={() => console.log("Avatar clicked")}>
                        <Avatar seed={user.email} size={35} />
                    </button>
                )}
                {!isLoggedIn && (
                    <nav className="space-x-4 flex">
                    <Link to="/login" className="w-auto">
                        <Button className="w-auto px-6 py-2 bg-blue-500">Log In</Button>
                    </Link>
                    <Link to="/signup" className="w-auto">
                        <Button className="w-auto px-6 py-2 bg-green-600 hover:bg-green-700">Sign Up</Button>
                    </Link>
                </nav>
                )}
            </div>
            
                
        </header>
    )
}