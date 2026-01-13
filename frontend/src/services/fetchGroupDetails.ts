import { GroupDataType } from "../types/group";

export async function fetchGroupDetails(groupId: number): Promise<GroupDataType> {
    const response = await fetch(import.meta.env.VITE_BACKEND_PATH + `groups/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const resp: GroupDataType = await  response.json()
    return resp;
}