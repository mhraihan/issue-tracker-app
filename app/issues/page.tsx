import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/prisma";
import IssueStatusBadge from "@/components/IssueStatusBadge";

const issuePage = async () => {
  const issues = await prisma.issue.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href={"/issues/new"}>Create New Issue</Link>
        </Button>
      </div>
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
                {issue.title}
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

export default issuePage;
