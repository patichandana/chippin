import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import Card from "../components/ui/Card";
import { FormEvent } from "react";
import login from "../services/authService";

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formEntries = Object.fromEntries(formData.entries());
  console.log(formEntries);
  const response = await login(formEntries.email as string, formEntries.password as string);
  console.log(response);
}

export default function LoginPage() {
  return (
    <Card>
      <p className="text-3xl font-light my-4">Log in</p>
      <form onSubmit={handleSubmit}>
        <TextInput
          className="my-4"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />
        <TextInput
          className="my-4"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <Button className="my-4" type="submit">
          Login
        </Button>
      </form>
    </Card>
  );
}
