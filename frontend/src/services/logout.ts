export async function logout() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PATH}logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}