import IssueActions from "@/components/IssueActions";
import Pagination from "@/components/Pagination";
import prisma from "@/prisma/prisma";
import { checkAuthorization } from "@/utils/authUtils";
import { Status } from "@prisma/client";
import IssueTable, { IssueQuery, columnsName } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
interface Props {
  searchParams: IssueQuery;
}
const issuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "desc" }
    : undefined;
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const page = parseInt(searchParams.page ?? 1, 10);
  const pageSize = 10;
  const [authorize, issues, issueCount] = await Promise.all([
    checkAuthorization(),
    prisma.issue.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
      orderBy,
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.issue.count({ where }),
  ]);

  return (
    <Flex direction="column" gap="4">
      {authorize && <IssueActions />}
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker: Lists of all issues",
   description: 'View all project issues'
}
export const dynamic = "force-dynamic";
export default issuePage;
