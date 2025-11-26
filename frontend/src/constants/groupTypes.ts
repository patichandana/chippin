export type GroupType = {
    group_type_id: number;
    group_type_name: string;
};

export const groupTypes: GroupType[] = [
    { group_type_id: 1, group_type_name: 'Home' },
    { group_type_id: 2, group_type_name: 'Trip' },
    { group_type_id: 3, group_type_name: 'Friends' },
    { group_type_id: 4, group_type_name: 'Other' }
]