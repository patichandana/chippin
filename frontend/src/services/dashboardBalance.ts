// export type CurrencyBalance = {
//   getsBack: number;
//   hasToPay: number;
// };
// export type DashboardBalance = {
  // balances: Record<number, CurrencyBalance>;
// };

export type DashboardBalance = {
  totalGetsBack: number;
  totalHasToPay: number;
}

export async function getDashboardBalance(): Promise<DashboardBalance> {
  const res = await fetch(import.meta.env.VITE_BACKEND_PATH + "dashboard/balance", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard balance");
  }

  return res.json();
}