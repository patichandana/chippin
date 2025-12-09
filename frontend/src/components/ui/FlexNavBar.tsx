import { Link } from "react-router-dom"
import Button from "../ui/Button"   
import { Menu } from "lucide-react";
import { useAuth } from "../../auth/useAuth";

export default function FlexNavBar({toggleSidebar}: {toggleSidebar?: () => void}) {
    const { isLoggedIn } = useAuth();
    console.log("FlexNavBar - isLoggedIn:", isLoggedIn);
    return (
        <header className="flex items-center p-2 h-14 bg-gray-700 flex-shrink-0">
            {isLoggedIn && (
                <button onClick={toggleSidebar} className="text-white"><Menu/></button>
            )}
            
            <div className="flex items-center space-x-2 text-2xl font-light italic cursor-pointer">
                <img src="/split.png" alt="Logo" className="h-6 w-6"/>
                <Link to="/" className="text-white">chippin</Link>
            </div>
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
                
        </header>
    )
}