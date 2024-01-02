import prisma from "@/prisma/prisma";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./../../_components/IssueFormSkeleton";
interface Props {
  params: {
    id: string;
  };
}
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
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
