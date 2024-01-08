import prisma from "@/prisma/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssueTable from "./LatestIssueTable";

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);
  return <IssueSummary open={open} inProgress={inProgress} closed={closed} />;
}
