export default async function login(email: string, password: string) {
    //will need to sanitize the values first
    const response = await fetch(import.meta.env.VITE_BACKEND_PATH + "login", {
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
