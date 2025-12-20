import { FormEvent } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
// import { LoV } from "../components/ui/LoV";
import { /*useEffect,*/ useState } from "react";
import { createGroup } from "../services/createGroup";
import { groupTypes } from "../constants/groupTypes";
import { GroupTypeLoV } from "../components/ui/GroupTypeLoV";
import { addUsersToGroupByEmail } from "../services/addUsersToGroupByEmail";

export function CreateGroup() {
  // const [loading, setLoading] = useState(true);
  const [groupType, setGroupType] = useState();
  const [emails, setEmails] = useState([""]);

  function addUserField() {
    setEmails([...emails, ""]);
  }

  function updateUserField(index: number, value: string) {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
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

  const emails = Object.keys(formEntries)
    .filter(key => key.startsWith("email")) // only keys like user1, user2 etc.
    .map(key => formEntries[key])
    .filter(val => val !== ""); // ignore empty fields

  console.log("Collected users:", emails);
  const groupId = group.groupId; 
  console.log("New Group ID:", groupId);

  const addUsersResponse = await addUsersToGroupByEmail({
    groupId: groupId,
    emails: emails as string[]
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
        <h2 className="mt-2 mb-4 text-lg">Group Members</h2>
        {/* need to show the current user detils here */}
        {emails.map((value, index) => (
          <div key={index} className="mb-2">
            <TextInput
              label={`Email ${index + 1}`}
              name={`email${index + 1}`}   // email1, email2, ...
              placeholder="Enter email of user"
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
