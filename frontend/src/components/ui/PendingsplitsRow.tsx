import type { PendingSplit } from "../../types/pendingSplit";

type PendingsplitsRowProps = Omit<PendingSplit, "id">;


export default function PendingsplitsRow({name,date,amount,status}: PendingsplitsRowProps) {
    const isPay = status === "You Pay";
    const sign = isPay ? "-" : "+";
    const signColor = isPay ? "text-rose-500" : "text-green-600";
    const statusColor = isPay ? "bg-red-200 text-gray-700" : "bg-green-200 text-gray-700";

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
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>{status}</span>
                    </div>
                </div>
                {/* right side */}
                <div className="text-right">
                    <span className={`${signColor} text-xl`}>{sign}</span>
                    <span> </span>
                    <span className="text-lg font-semibold text-gray-800 tracking-tight">{amount}</span>
                </div>    
            </div>
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center">
                <div className="flex-1 font-medium">{name}</div>
                <div className="w-32 text-sm text-gray-500">{date}</div>
                <div className="w-32 text-right font-medium">{amount}</div>
                <div className="w-32 text-right"><span className={`px-3 py-1 text-xs rounded-full ${statusColor}`}>{status}</span></div>
            </div>               
        </div>
    );
}