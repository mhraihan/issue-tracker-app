import prisma from "@/prisma/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";
interface Props {
  params: {
    id: string;
  };
}
const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const session = await auth();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"3"}>
            <EditIssueButton issueId={id} />
            <DeleteIssueButton issueId={id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
