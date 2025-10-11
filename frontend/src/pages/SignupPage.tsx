import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar"; 
import Card from "../components/ui/Card";
import { FormEvent } from "react";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { useState } from "react";
import { currencies } from "../constants/currencies";




export default function SignupPage() {

  // State for each field
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Set default currency to USD if available, otherwise use the first currency in the list
  const defaultCurrency = currencies.find(currency => currency.code === 'USD');
  const [selectedCurrency, setSelectedCurrency] = useState(
    defaultCurrency ? defaultCurrency.currency_id : currencies[0].currency_id
  );
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e:FormEvent){
    e.preventDefault();
    if(password !== confirmPassword){
      setPasswordError("Passwords do not match");
      return;
    }
    if(password.length < 8){
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    // Clear any previous error
    setPasswordError("");

    // Prepare payload

    const payload = {
      email,
      firstname:firstName,
      lastname: lastName,
      password,
      currencyId: selectedCurrency
    };
    console.log(payload);
    const response = await fetch("http://localhost:3000/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log({data});
  }


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
              placeholder="enter your email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-4 my-4">
              <TextInput
                className="flex-1"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="first name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
              <TextInput
                className="flex-1"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <TextInput
              className="my-4"
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              className="my-4"
              type="password"
              id="password-confirm"
              name="password"
              placeholder="enter your password again"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if(passwordError && e.target.value === password){
                  setPasswordError("");
                }
              }}
            />
            {passwordError && 
              <p className="text-xs text-red-500 mb-2">{passwordError}</p>}
            <div>
              <label htmlFor="currency" 
                className="block mb-1 text-gray-400">
                default currency (optional)</label>
              <select 
                id="currency" 
                name="currency" 
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(Number(e.target.value))} 
              className="block w-full p-2 border rounded text-gray-500 
              bg-white focus:outline-none">
                {currencies.map(currency => (
                  <option key={currency.currency_id} value={currency.currency_id}>
                    {currency.currency_name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>

            <Button className="my-4" type="submit">Login</Button>
          </form>
        </Card>
      </main>
    </FlexMainDiv>
  );
}