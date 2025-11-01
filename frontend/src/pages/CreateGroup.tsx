// import { FormEvent } from "react";
// import Card from "../components/ui/Card";
// import TextInput from "../components/ui/TextInput";
// import Button from "../components/ui/Button";

// function handleSubmit(e: FormEvent) {
//   e.preventDefault();
//   const x = new FormData(e.target as HTMLFormElement);

//   const fileInput = document.getElementById("group-image") as HTMLInputElement;
//   const selectedFiles = fileInput?.files;

//   console.log(selectedFiles);
//   // x.append("file", selectedFiles[0]);

//   for (const [name, value] of x.entries()) {
//     console.log(name + " " + value);
//   }

//   fetch(process.env.BACKEND_URL + "groups", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       groupName: x.get("groupName"),
//       groupType: Number(x.get("groupType"))
//       // file: x.get("file"),
//     }),
//   });
// }

// export function CreateGroup() {
//   return (
//     <Card>
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           className="my-4"
//           name="groupName"
//           placeholder="enter group name"
//         ></TextInput>
//         <TextInput
//           className="my-4"
//           name="groupType"
//           type="number"
//           placeholder="enter group name"
//         ></TextInput>
//         <input type="file" id="group-image"></input> <br />
//         <Button className="my-4" type="submit">
//           Submit
//         </Button>
//       </form>
//     </Card>
//   );
// }
