import { Button, Text } from "@radix-ui/themes";
import { AiFillDelete } from "react-icons/ai";

const DeleteIssueButton = ({ issueId }: { issueId: number | string }) => {
  return (
    <Button color="red">
      <AiFillDelete />
      <Text>Delete Issue</Text>
    </Button>
  );
};

export default DeleteIssueButton;
