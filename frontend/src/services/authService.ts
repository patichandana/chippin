export default async function login(email: string, password: string) {
    //will need to sanitize the values first
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    return response;
}
