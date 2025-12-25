type PendingsplitsRowProps = {
    name: string;
    date: string;
    amount: string;
    status: string;
};


export default function PendingsplitsRow({name,date,amount,status}: PendingsplitsRowProps) {
    return (
        <div className="py-3 text-gray-800">
            {/* Mobile Layout */}
            <div className="sm:hidden flex items-start justify-between gap-4">
                {/* left side */}
                <div>
                    <div className="font-medium text-gray-800">{name}</div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span>{date}</span>
                        <span>•</span>
                        <span className="px-2 py-0.95 text-xs rounded-full bg-red-200 text-gray-700">{status}</span>
                    </div>
                </div>
                {/* right side */}
                <div className="text-right">
                    <div className="text-lg font-semibold text-gray-800 tracking-tight">{amount}</div>
                </div>    
            </div>
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center">
                <div className="flex-1 font-medium">{name}</div>
                <div className="w-32 text-sm text-gray-500">{date}</div>
                <div className="w-32 text-right font-medium">{amount}</div>
                <div className="w-32 text-right"><span className="px-3 py-1 text-xs rounded-full bg-red-200 text-gray-700">{status}</span></div>
            </div>               
        </div>
    );
}