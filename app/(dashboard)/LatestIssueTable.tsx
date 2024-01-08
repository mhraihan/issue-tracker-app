import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

const LatestIssueTable = async () => {
  const issues = await prisma.issue.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      assignedToUser: {
        select: {
          image: true,
        },
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc"
    },
  });
  console.log(issues[0]);

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      radius="full"
                      src={issue.assignedToUser.image!}
                      fallback="?"
                    ></Avatar>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssueTable;
