import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./../../_components/IssueFormSkeleton";
import { findIssueById } from "@/utils/prismaUtils";
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
  const issue = await findIssueById(id);

  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};
export async function generateMetadata({params: {id}}: Props){
  const issue = await findIssueById(id);
  return {
    title: `Edit: ${issue?.title} - Issue Tracker`,
    description: `Edit Issue ${issue?.id}`
  }
}
export default EditIssuePage;
