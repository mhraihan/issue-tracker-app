import { auth } from "@/auth";
import IssueActions from "@/components/IssueActions";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <IssueActions />
    </div>
  );
}
