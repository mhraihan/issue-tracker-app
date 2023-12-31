import { notFound } from "next/navigation";
import React from "react";
import prisma from "@/prisma/prisma";
import IssueForm from "../../_components/IssueForm";
interface Props {
  params: {
    id: string;
  };
}
const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
