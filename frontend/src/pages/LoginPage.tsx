import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import Card from "../components/ui/Card";
import { FormEvent, useState } from "react";
import login from "../services/authService";
import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar";
import { useNavigate } from "react-router-dom";
// import { set } from "zod";

async function handleSubmit(e: FormEvent, navigate: (path: string) => void, setMessage: (msg: string) => void) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formEntries = Object.fromEntries(formData.entries());
  try {
    const response = await login(formEntries.email as string, formEntries.password as string);
    console.log(response.json());
    //navigate the user to dashboard, or throw error based on the req. response.
    setMessage("Logging you in...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  } catch (err) {
    console.error("Login failed:", err);
  }
  
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  return (
    <FlexMainDiv>
      <FlexNavBar />
      {message && (
          <div className="bg-green-600 text-white p-3 text-center">
            {message}
          </div>
        )}
      <main className="flex flex-grow justify-center items-center">
        <Card className="w-full max-w-xl sm:w-full" title="Log in">
          {/* <p className="text-3xl font-light my-4">Log in</p> */}
          <form onSubmit={(e) => handleSubmit(e, navigate, setMessage)}>
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
            <Button className="max-w-fit mt-4 " type="submit">
              Login
            </Button>
          </form>
        </Card>
      </main>
    </FlexMainDiv>
  );
}
