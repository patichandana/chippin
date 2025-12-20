export async function addUsersToGroupByEmail(data: { groupId: number; emails: string[] }) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PATH}groups/${data.groupId}/emails`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails: data.emails })
    });
    return response.json();
}