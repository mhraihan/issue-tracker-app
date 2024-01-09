import { checkAuthorization } from "@/utils/authUtils";
import { findIssueById } from "@/utils/prismaUtils";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect ";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
interface Props {
  params: {
    id: string;
  };
}
const fetchIssue = cache((id: string) => findIssueById(id));
const IssueDetailsPage = async ({ params: { id } }: Props) => {
  try {
    const [session, issue] = await Promise.all([
      checkAuthorization(),
      fetchIssue(id),
    ]);

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
              <AssigneeSelect issue={issue} />
              <EditIssueButton issueId={id} />
              <DeleteIssueButton issueId={id} />
            </Flex>
          </Box>
        )}
      </Grid>
    );
  } catch (error) {
    notFound();
  }
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);
  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}
export default IssueDetailsPage;
