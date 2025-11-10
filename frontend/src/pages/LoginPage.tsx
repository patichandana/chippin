import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import Card from "../components/ui/Card";
import { FormEvent } from "react";
import login from "../services/authService";
import { CreateExpense } from "./CreateExpense";

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formEntries = Object.fromEntries(formData.entries());
  const response = await login(
    formEntries.email as string,
    formEntries.password as string
  );
  console.log(response);
  //navigate the user to dashboard, or throw error based on the req. response.
}

export default function LoginPage() {
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <TextInput
          className="mb-4"
          type="email"
          id="email"
          name="email"
          label="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />
        <TextInput
          className="mb-4"
          type="password"
          id="password"
          name="password"
          label="password"
          placeholder="Enter your password"
          required
        />
        <Button className="my-4" type="submit">
          Login
        </Button>
      </form>
      <CreateExpense></CreateExpense>
    </Card>
  );
}
