import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const NewIssuePage = () => {
  return <IssueForm />;
};
export const metadata: Metadata = {
  title: "Issue Tracker - Create New Issue",
  description:"Create new Issue"
}
export default NewIssuePage;
