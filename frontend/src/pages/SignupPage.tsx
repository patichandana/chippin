import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar"; 
import Card from "../components/ui/Card";
import { FormEvent, useState } from "react";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { currencies } from "../constants/currencies";
import SvgRenderer from "../components/ui/SvgRenderer";
import { useNavigate } from "react-router-dom";
import signup from "../services/signupService";

/*todo
1. in mobile screens, first name, last name should be displayed vertically, instead of side wise like in bigger screens
*/

export default function SignupPage() {
  const navigate = useNavigate();

  // State for each field
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  
  // Set default currency to INR if available, otherwise use the first currency in the list
  const defaultCurrency = currencies.find(currency => currency.code === 'INR');
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
    
    try {
      const data = await signup(payload);
      console.log("Signup successful:", data);
      // after successful signup, navigate to login page
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup failed:", err);
    }

    
  }


  return (
    <FlexMainDiv>
      <FlexNavBar />
        {message && (
          <div className="bg-green-600 text-white p-3 text-center">
            {message}
          </div>
        )}

      <main className="flex flex-grow items-center justify-center px-4">
        {/* Responsive container */}
        <Card className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center p-0 overflow-hidden">

          {/* Left side SVG - visible only on md and above */}
          <div className="hidden md:flex flex-1 justify-center items-center p-8">
          <SvgRenderer name="welcome" className="w-full max-w-sm h-auto" />
        </div>

        {/* Right side form */}
        <div className="flex-1 w-full">
          <p className="text-3xl font-light mb-6">Sign Up</p>
          <form onSubmit={handleSubmit}>
            <TextInput
              className=" required w-full"
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              autoComplete="email"
              label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-4">
              <TextInput
                className="flex-1"
                type="text"
                id="firstname"
                name="firstname"
                label="First Name"
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
                label="Last Name"
                placeholder="last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <TextInput
              className="w-full"
              type="password"
              id="password"
              name="password"
              label="Password"
              placeholder="enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              className="w-full"
              type="password"
              id="password-confirm"
              name="password"
              label="Reenter Password"
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
            <div className="mb-4">
              <label htmlFor="currency" 
                className="block mb-1 text-gray-400">
                default currency (optional)</label>
              <select 
                id="currency" 
                name="currency" 
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(Number(e.target.value))} 
              className="block w-full p-2 border rounded text-gray-500 
              bg-white focus:outline-none ">
                {currencies.map(currency => (
                  <option key={currency.currency_id} value={currency.currency_id}>
                    {currency.currency_name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>

            <Button className="max-w-fit mt-4 " type="submit">Register</Button>
          </form>
        </div>  
        </Card>
      </main>
    </FlexMainDiv>
  );
}