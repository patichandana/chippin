
export default function TotalBalanceSummary() {
    return (
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
    );
}