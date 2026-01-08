
//import this function in ,addgroup,add users to group, add expense, get expense, get group details, get user details apis.
export function parseObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj, (key, value) => typeof value == "bigint" ? Number(value) : value));
}
