export type PendingSplit = {
  id: number;
  name: string;
  date: string;
  amount: string;
  status: "You Pay" | "You Get";
};