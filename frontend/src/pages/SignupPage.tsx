import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar"; 
import Card from "../components/ui/Card";
import { FormEvent } from "react";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

async function handleSubmit(e:FormEvent){
  e.preventDefault();
}


export default function SignupPage() {
  return (
    <FlexMainDiv>
      <FlexNavBar />

      <main className="flex flex-grow justify-center items-center">
        <Card>
          <p className="text-3xl font-light my-4">Sign Up</p>
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
            <TextInput
              className="my-4"
              type="password"
              id="password-confirm"
              name="password"
              placeholder="Enter your password Again"
              required
            />
            <Button className="my-4" type="submit">Login</Button>
          </form>
        </Card>
      </main>
    </FlexMainDiv>
  );
}