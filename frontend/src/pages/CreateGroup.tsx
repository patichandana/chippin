import { FormEvent } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
// import { LoV } from "../components/ui/LoV";
import { /*useEffect,*/ useState } from "react";
import { createGroup } from "../services/createGroup";
import { groupTypes } from "../constants/groupTypes";
import { GroupTypeLoV } from "../components/ui/GroupTypeLoV";
import { addUsersToGroup } from "../services/addUsersToGroup";

export function CreateGroup() {
  // const [loading, setLoading] = useState(true);
  const [groupType, setGroupType] = useState();
  const [users, setUsers] = useState([""]);

  function addUserField() {
    setUsers([...users, ""]);
  }

  function updateUserField(index: number, value: string) {
    const updated = [...users];
    updated[index] = value;
    setUsers(updated);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());

    const group = await createGroup({ 
      groupName: formEntries.groupName as string,
      groupType: Number(groupType),
  });
  console.log(group);

  const users = Object.keys(formEntries)
    .filter(key => key.startsWith("user")) // only keys like user1, user2 etc.
    .map(key => formEntries[key])
    .filter(val => val !== ""); // ignore empty fields

  console.log("Collected users:", users);
  const groupId = group.group_id; 
  console.log("New Group ID:", groupId);

  const addUsersResponse = await addUsersToGroup({
    group_id: groupId,
    users: users
  });

  console.log(addUsersResponse);

  
}

  
  return (
    <Card title="Create Group" className="w-full h-full flex-grow-0">
      <form onSubmit={handleSubmit}>
        <TextInput
        className="required"
          name="groupName"
          label="Group name"
          placeholder="enter group name"
        ></TextInput>
        <h2 className="mt-8 mb-4 text-lg">Group Members</h2>
        {/* need to show the current user detils here */}
        {users.map((value, index) => (
          <div key={index} className="mb-2">
            <TextInput
              label={`User ${index + 1}`}
              name={`user${index + 1}`}   // IMPORTANT: user1, user2, user3
              placeholder="Enter email or username"
              value={value}
              onChange={(e) => updateUserField(index, e.target.value)}
            />
          </div>
      ))}
      <button
        type="button"
        onClick={addUserField}
        className="bg-white text-blue-600 p-0 text-sm hover:text-blue-800 hover:underline"
      >
        + Add another user
      </button>

        {/* need to put group type lov here  */}
        <div className="mb-16">
          <GroupTypeLoV
          defaultValue="Home"
          label="Group type"
          options={groupTypes}
          className="inline-block w-fit mr-2"
          name="groupType"
          lovId={[groupType, setGroupType]}
          value={groupType}></GroupTypeLoV>
        </div>

        <Button className="my-12" type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
}
