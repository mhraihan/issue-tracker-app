import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./../../_components/IssueFormSkeleton";
import { findIssueById } from "@/utils/prismaUtils";
import { cache } from "react";
interface Props {
  params: {
    id: string;
  };
}
const fetchIssue = cache((id: string) => findIssueById(id))
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(id);

  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};
export async function generateMetadata({params: {id}}: Props){
  const issue = await fetchIssue(id);
  return {
    title: `Edit: ${issue?.title} - Issue Tracker`,
    description: `Edit Issue ${issue?.id}`
  }
}
export default EditIssuePage;
