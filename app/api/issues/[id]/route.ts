import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { issueSchema } from "@/app/validationSchemas";
export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const validate = issueSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 500 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });
  if (!issue) {
    return NextResponse.json({ error: `No such issue found ${id}` });
  }

  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateIssue, { status: 200 });
}
