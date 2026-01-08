export default function Footer() {
  return (
    <footer className="w-full bg-slate-700 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left  */}
        <p className="text-sm">
          chippin @ {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Right links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}