import prisma from "@/prisma/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssueTable from "./LatestIssueTable";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "view a summary of project issues"
}
export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);
  const commonProps = { open, inProgress, closed };
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary {...commonProps} />
        <IssueChart {...commonProps} />
      </Flex>
      <LatestIssueTable />
    </Grid>
  );
}
