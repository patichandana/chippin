export async function getCurrencies() {
    //will need to sanitize the values first
    const response = await fetch(import.meta.env.VITE_BACKEND_PATH + "currencies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.body?.getReader();;
}
