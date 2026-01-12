import { useEffect, useState } from "react";
import { ExpenseDetails } from "./ExpenseDetails";
import { fetchGroupDetails } from "../services/fetchGroupDetails";
import { GroupDataType } from "../types/group";
import Card from "../components/ui/Card";

type GroupProps = {
  groupId: number;
  children?: React.ReactNode;
};

export function GroupLandingPage({ groupId }: GroupProps) {
  //todo: fetch the groups expense details
  console.log(groupId);
  // const expense: ExpenseType = {
  //   expenseId: 1,
  //   description: "expense",
  //   expenseDate: "Jan 16,2020",
  //   name: "expense",
  //   paidBy: "chandu",
  //   currency: "$",
  //   amount: 100,
  //   expenseType: "summary",
  //   userSumAmount: 20
  // };
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [groupData, setGroupData] = useState<GroupDataType>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp: GroupDataType = await fetchGroupDetails(groupId);
        setGroupData(resp);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //add a group component showing group data. short form and full form.

  const gridStyle =
    "display-grid grid-cols-[100px_1fr_1fr_120px] gap-4 items-center";
  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {groupData && (
        <>
          <div className="w-full max-w-5xl mx-auto">
            <div
              className={`${gridStyle} px-6 mb-2 text-gray-500 text-sm font-semibold uppercase tracking-wider`}
            >
              <div className="hidden md:block">Date</div>
              <div>Expense</div>
              <div className="hidden md:block">Paid by</div>
              <div>Amount</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {groupData["expenses"].map((expense) => {
              expense.expenseType = "summary";
              return (
                <ExpenseDetails
                  expense={expense}
                  groupMembers={groupData.groupMembers}
                  layoutClass={gridStyle}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
