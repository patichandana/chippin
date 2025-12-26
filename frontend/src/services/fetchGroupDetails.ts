export async function fetchGroupDetails(groupId: number) {
   const response = await fetch(import.meta.env.VITE_BACKEND_PATH + `/groups/${groupId}}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response;
}