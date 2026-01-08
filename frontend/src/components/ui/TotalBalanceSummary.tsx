import { useState, useEffect } from "react";
import { getDashboardBalance, type DashboardBalance } from "../../services/dashboardBalance";
// import { currencies } from "../../constants/currencies";


export default function TotalBalanceSummary() {
    const [balances, setBalances] = useState<DashboardBalance | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchBalances = async () => {
      try {
        const data = await getDashboardBalance();
        setBalances(data);
      } catch (err) {
        setError("Unable to load balances");
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  if (loading) {
    return <div>Loading balance…</div>;
  }
  if (error || !balances) {
    return <div>{error ?? "Error loading balances"}</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* You Owe */}
      <div className="flex flex-col lg:flex-row lg:gap-4 p-4 flex-1 rounded-xl bg-slate-600 shadow-lg">
        <span className="text-sm md:text-base lg:text-2xl text-gray-100">You Pay</span>
        <span className="text-3xl md:text-4xl lg:text-5xl lg:flex-1 lg:text-center font-semibold text-neutral-50 tracking-tight">{balances.totalHasToPay}</span>
      </div>
      {/* You Are Owed */}
      <div className="flex flex-col lg:flex-row lg:gap-4 p-4 flex-1 rounded-xl bg-gray-100 shadow">
        <span className="text-sm md:text-base lg:text-2xl text-gray-600">You Get</span>
        <span className="text-3xl md:text-4xl lg:text-5xl lg:flex-1 lg:text-center font-semibold text-gray-900 tracking-tight">{balances.totalGetsBack}</span>
      </div>
    </div>
    );
//     return (
//     <div className="flex flex-col gap-4">
//       {Object.entries(balances.balances).map(([currencyId, balance]) => {
//         const currency = currencies.find(
//           c => c.currency_id === Number(currencyId)
//         );

//         return (
//           <div key={currencyId} className="flex flex-col sm:flex-row gap-4">
//             {/* You Pay */}
//             <div className="flex flex-col lg:flex-row lg:gap-4 p-4 flex-1 rounded-xl bg-slate-600 shadow-lg">
//               <span className="text-sm md:text-base lg:text-2xl text-gray-100">
//                 You Pay {currency ? `(${currency.code})` : ""}
//               </span>
//               <span className="text-3xl md:text-4xl lg:text-5xl lg:flex-1 lg:text-center font-semibold text-neutral-50 tracking-tight">
//                 {currency?.symbol}{balance.hasToPay}
//               </span>
//             </div>

//             {/* You Get */}
//             <div className="flex flex-col lg:flex-row lg:gap-4 p-4 flex-1 rounded-xl bg-gray-100 shadow">
//               <span className="text-sm md:text-base lg:text-2xl text-gray-600">
//                 You Get {currency ? `(${currency.code})` : ""}
//               </span>
//               <span className="text-3xl md:text-4xl lg:text-5xl lg:flex-1 lg:text-center font-semibold text-gray-900 tracking-tight">
//                 {currency?.symbol}{balance.getsBack}
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
}