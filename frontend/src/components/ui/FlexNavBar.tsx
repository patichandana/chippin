import { Link } from "react-router-dom"
import Button from "../ui/Button"

export default function FlexNavBar() {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-50 flex-shrink-0">
            <div className="flex items-center space-x-2 text-2xl font-light italic cursor-pointer">
                <img src="/split.png" alt="Logo" className="h-6 w-6"/>
                <Link to="/" >chippin</Link>
            </div>
            <nav className="space-x-4 flex">
                <Link to="/login" className="w-auto">
                    <Button className="w-auto px-6 py-2 bg-blue-500">Log In</Button>
                </Link>
                <Link to="/signup" className="w-auto">
                    <Button className="w-auto px-6 py-2 bg-green-600 hover:bg-green-700">Sign Up</Button>
                </Link>
            </nav>    
        </header>
    )
}