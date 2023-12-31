import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
interface Props {
  params: {
    id: string;
  };
}
const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex my={"4"} className="space-x-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
