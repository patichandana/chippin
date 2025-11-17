import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import Card from "../components/ui/Card";
import { FormEvent } from "react";
import login from "../services/authService";
import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar";

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formEntries = Object.fromEntries(formData.entries());
  const response = await login(formEntries.email as string, formEntries.password as string);
  console.log(response)
  //navigate the user to dashboard, or throw error based on the req. response.
}

export default function LoginPage() {
  return (
    <FlexMainDiv>
      <FlexNavBar />
      <main className="flex flex-grow justify-center items-center">
        <Card className="w-full max-w-xl sm:w-full" title="Log in">
          {/* <p className="text-3xl font-light my-4">Log in</p> */}
          <form onSubmit={handleSubmit}>
            <TextInput
              className="w-full required"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              label="Email"
              required
            />
            <TextInput
              className="w-full required"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              label="Password"
              required
            />
            <Button className="max-w-fit" type="submit">
              Login
            </Button>
          </form>
        </Card>
      </main>
    </FlexMainDiv>
  );
}
