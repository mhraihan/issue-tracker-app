import { IssueStatusBadge, Link } from "@/components";
import IssueActions from "@/components/IssueActions";
import prisma from "@/prisma/prisma";
import { checkAuthorization } from "@/utils/authUtils";
import { Table } from "@radix-ui/themes";
const issuePage = async () => {
  const [authorize,issues] = await Promise.all([
    checkAuthorization(),
    prisma.issue.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  ])
 

  return (
    <div>
      {authorize && <IssueActions />}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden text-xs mt-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = "force-dynamic";
export default issuePage;