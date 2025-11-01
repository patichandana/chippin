export default async function signup(payload: {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  currencyId: number;
}) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Signup failed: ${text}`);
  }

  return await response.json();
}
