// type GroupMember = {
//     userId : number,
// }

type Group = {
    groupName : string,
    groupType : number,
    // groupMembers ?: Array<GroupMember>
}

export async function createGroup (group: Group){
    const response = await fetch(import.meta.env.VITE_BACKEND_PATH + "groups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(group)
    });
    return response;
}