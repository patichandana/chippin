import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import { LoV } from "../components/ui/LoV";
import Button from "../components/ui/Button";
import { currencies } from "../constants/currencies";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { createExpense } from "../services/createExpense";

/* component expectations
1. as we resize the component, say mobile, expense date, (currency, amount) should come verticially, instead of being horizantally like in larger screens.
2. pass default value to the lov component - in terms of currency lov, get the user preference (from the local storage say) and set it.
3. expense date - block selecting future dates.
4. default expense date to today's date.
*/

export function CreateExpense() {
  //fetch currency lov values
  // const [currencies, setCurrencies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currencyId, setCurrencyId] = useState();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());
    const response = await createExpense({
      expenseName: formEntries.expenseName as string,
      description: formEntries.description as string,
      expenseDate: formEntries.expenseDate as string,
      totalAmount: Number(formEntries.totalAmount),
      currencyId: Number(currencyId),
      //hardcoded expenseshares
      expenseShares: [
        {
          //need to get the user id
          userId: 1n,
          paidAmount: Number(formEntries.totalAmount),
          owedAmount: 0
        },
      ],
    });
    console.log(response);
    //navigate the user to dashboard, or throw error based on the req. response.
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    fetchData();
  });
  //fetch group members lov values
  if (loading) return <div>loading....</div>;
  return (
    <Card title="Add Expense" className="w-full h-full flex-grow-0 ">
      <form onSubmit={handleSubmit}>
        <TextInput
          className="w-full required"
          name="expenseName"
          label="Expense Name"
        ></TextInput>
        <TextInput
          className="w-full"
          name="description"
          label="Description"
          textInput="large"
        ></TextInput>
        <TextInput
          name="expenseDate"
          label="Expense Date"
          type="Date"
        ></TextInput>
        <div className="flex">
          <LoV
            label="Amount"
            options={currencies}
            className="inline-block w-fit mr-2"
            name="currencyId"
            lovId={[currencyId, setCurrencyId]}
            value={currencyId}
          ></LoV>
          <TextInput
            name="totalAmount"
            type="number"
            className="w-25 remove-arrow"
          ></TextInput>
        </div>
        <Button className="h-fit max-w-fit mt-4 " type="submit">
          Create
        </Button>
      </form>
    </Card>
  );
}
