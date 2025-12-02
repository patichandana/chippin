export async function addUsersToGroup(data: { groupId: number; users: string[] }) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PATH}groups/${data.groupId}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ users: data.users })
    });
    return response.json();
}