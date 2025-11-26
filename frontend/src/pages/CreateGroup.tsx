import { FormEvent } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
// import { LoV } from "../components/ui/LoV";
import { /*useEffect,*/ useState } from "react";
import { createGroup } from "../services/createGroup";
import { groupTypes } from "../constants/groupTypes";
import { GroupTypeLoV } from "../components/ui/GroupTypeLoV";

export function CreateGroup() {
  // const [loading, setLoading] = useState(true);
  const [groupType, setGroupType] = useState();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());

    const response = await createGroup({ 
      groupName: formEntries.groupName as string,
      groupType: Number(groupType),
    //   groupMembers: [
    //   { userId: 1 }, //hardcoded user id for now
    // ]
  });
  console.log(response);

  // const fileInput = document.getElementById("group-image") as HTMLInputElement;
  // const selectedFiles = fileInput?.files;

  // console.log(selectedFiles);
  // // x.append("file", selectedFiles[0]);

  // for (const [name, value] of x.entries()) {
  //   console.log(name + " " + value);
  // }

  // fetch(import.meta.env.VITE_BACKEND_PATH + "groups", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     groupName: x.get("groupName"),
  //     groupType: Number(x.get("groupType")),
  //     // file: x.get("file"),
  //   }),
  // });
}

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(false);
  //   };

  //   fetchData();
  // });
  // if (loading) return <div>loading....</div>;
  return (
    <Card title="Create Group" className="w-full h-full flex-grow-0">
      <form onSubmit={handleSubmit}>
        <TextInput
        className="w-full required"
          name="groupName"
          label="Group name"
          placeholder="enter group name"
        ></TextInput>
        {/* need to put group type lov here  */}
        <div className="mb-16">
          <GroupTypeLoV
          label="Group type"
          options={groupTypes}
          className="inline-block w-fit mr-2"
          name="groupType"
          lovId={[groupType, setGroupType]}
          value={groupType}></GroupTypeLoV>
        </div>
          
        
        
        {/* <TextInput
          className=""
          name="groupType"
          type="number"
          label="Group type"
          placeholder="enter group tame"
        ></TextInput> */}
        {/* <input type="file" id="group-image"></input> <br /> */}
        <Button className="my-4" type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
}
